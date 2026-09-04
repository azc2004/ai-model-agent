#!/usr/bin/env python3
"""
종합 트렌드 리포트 생성 스크립트
RSS 수집 → 클러스터링 → LiteLLM(gpt-4o-mini) → Cloudflare D1 저장
"""
import json, os, re, time, uuid, subprocess, urllib.error, urllib.request, urllib.parse
from collections import Counter
from dataclasses import dataclass, field
from typing import Mapping

from trend_report_validation import (
    deduplicate_sources,
    is_duplicate_report,
    validate_report,
)

# 원문 본문을 읽을 수 있는 피드만 남긴다. 스크래핑을 거부하는 곳(429/403)은
# 기사를 버리게 되므로 목록에 있어도 결과에 기여하지 못한다.
#   제거: blogs.microsoft.com  → 410 Gone. 피드 자체가 없어졌고 매일 0건이었다
#   유지: venturebeat(429) · openai.com(403) → 본문을 못 읽어 실제 기여는 없지만,
#         차단이 풀리면 자동으로 다시 잡히므로 남겨 둔다
# 신규는 RSS 파싱과 본문 추출이 모두 성공하는 것만 실측 후 추가했다.
RSS_FEEDS = [
    "https://feeds.feedburner.com/venturebeat/SZYF",
    "https://techcrunch.com/feed/",
    "https://www.technologyreview.com/feed/",
    "https://openai.com/news/rss.xml",
    "https://www.deepmind.com/blog/rss.xml",
    "https://huggingface.co/blog/feed.xml",
    "https://aws.amazon.com/blogs/machine-learning/feed/",
    "https://blog.google/technology/ai/rss/",
    # 실측 추가 (본문 평균 3,400~6,000자)
    "https://arstechnica.com/ai/feed/",
    "https://blogs.nvidia.com/feed/",
    "https://www.microsoft.com/en-us/research/feed/",
    "https://jack-clark.net/feed/",
    "https://magazine.sebastianraschka.com/feed",
    "https://simonwillison.net/atom/everything/",
]
TOPIC_PATTERNS = {
    "agent": ["agent","agentic","computer use","automation","autogen","workflow","multi-agent"],
    "reasoning": ["reasoning","r1","deepseek","mcts","chain-of-thought","thinking","o3","o4"],
    "multimodal": ["vision","multimodal","image","video","audio","gemini"],
    "security": ["security","safety","guardrail","jailbreak","alignment","red team"],
    "enterprise": ["enterprise","cost","tco","bedrock","on-prem","sagemaker","azure","aws"],
    "finetuning": ["fine-tuning","finetune","lora","rlhf","instruction tuning","training"],
    "research": ["arxiv","paper","benchmark","sota","evaluation","dataset","model release"],
}
TREND_REPORT_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "primary_topic": {"type": "string"},
        "tldr": {"type": "string"},
        "blog_body": {"type": "string"},
        "developer_tip": {"type": "string"},
        "pm_tip": {"type": "string"},
        "business_tip": {"type": "string"},
        "tags": {"type": "array", "items": {"type": "string"}},
        "impact_score": {"type": "integer"},
    },
    "required": [
        "title",
        "primary_topic",
        "tldr",
        "blog_body",
        "developer_tip",
        "pm_tip",
        "business_tip",
        "tags",
        "impact_score",
    ],
    "additionalProperties": False,
}


@dataclass(frozen=True)
class BatchConfig:
    litellm_url: str
    litellm_key: str
    model: str
    fallback_model: str = ""


@dataclass
class BatchSummary:
    collected: int = 0
    source_rejected: int = 0
    clusters: int = 0
    generated: int = 0
    report_rejected: int = 0
    saved: int = 0
    failed: int = 0
    reasons: Counter[str] = field(default_factory=Counter)


def load_config(environ: Mapping[str, str] | None = None) -> BatchConfig:
    source = os.environ if environ is None else environ
    key = source.get("LITELLM_API_KEY", "").strip()
    if not key:
        raise RuntimeError("LITELLM_API_KEY is required")
    return BatchConfig(
        litellm_url=source.get("LITELLM_URL", "https://ai-gateway.azclab.com/v1").rstrip("/"),
        litellm_key=key,
        model=source.get("LITELLM_MODEL", "gemini/gemini-3.7-flash"),
        fallback_model=source.get(
            "LITELLM_FALLBACK_MODEL", "groq/qwen/qwen3.6-27b"
        ),
    )

_IMG_PATTERNS = (
    r'<media:content[^>]+url="([^"]+)"',
    r'<media:thumbnail[^>]+url="([^"]+)"',
    r'<enclosure[^>]+type="image/[^"]*"[^>]+url="([^"]+)"',
    r'<enclosure[^>]+url="([^"]+)"[^>]+type="image/',
    r'<img[^>]+src="([^"]+)"',
)


def extract_image(item_xml):
    """RSS 항목에서 대표 이미지 URL을 뽑는다. 없으면 None."""
    for pattern in _IMG_PATTERNS:
        match = re.search(pattern, item_xml, re.IGNORECASE)
        if not match:
            continue
        url = match.group(1).strip().replace("&amp;", "&")
        if url.startswith("http") and not url.endswith(".svg"):
            return url[:500]
    return None


def fetch_rss(feed_url):
    try:
        req = urllib.request.Request(feed_url, headers={"User-Agent": "curl/8.7.1"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            text = resp.read().decode("utf-8", errors="ignore")
        arts = []
        # RSS 2.0 은 <item>, Atom 은 <entry> 를 쓴다. <item> 만 보면 Atom 피드가
        # 조용히 0건으로 잡혀 좋은 출처를 놓친다.
        for item in re.finditer(r"<(?:item|entry)[\s\S]*?</(?:item|entry)>", text):
            t = item.group()
            title = (re.search(r"<title><!\[CDATA\[([\s\S]*?)\]\]></title>", t) or re.search(r"<title>([^<]*)</title>", t))
            link = (re.search(r"<link>([^<]*)</link>", t) or re.search(r'<link[^>]*href="([^"]+)"', t))
            desc = (re.search(r"<description><!\[CDATA\[([\s\S]*?)\]\]></description>", t)
                    or re.search(r"<description>([^<]*)</description>", t)
                    or re.search(r"<summary[^>]*>([\s\S]*?)</summary>", t)
                    or re.search(r"<content[^>]*>([\s\S]*?)</content>", t))
            if title and link:
                clean = re.sub(r"<[^>]+>", "", desc.group(1) if desc else "").strip()[:500]
                arts.append({"title": title.group(1).strip(), "link": link.group(1).strip(), "summary": clean, "source": urllib.parse.urlparse(feed_url).hostname, "image": extract_image(t)})
        return arts[:8]
    except Exception as e:
        print(f"  [RSS Skip] {feed_url}: {e}")
        return []

# 원문을 읽지 않고 RSS 요약 500자만 보고 쓰면, 모델이 빈칸을 채우는 것이 곧 환각이
# 된다. "개발 생산성 80% 향상" 같은 문장이 그렇게 나왔다. 링크를 따라가 본문을
# 가져오고, 못 가져온 기사는 아예 쓰지 않는다.
MIN_BODY_CHARS = 600      # 이보다 짧으면 추출 실패로 본다
MAX_BODY_CHARS = 6000     # LLM 입력 상한

_SKIP_EXT = (".pdf", ".zip", ".mp3", ".mp4")


def fetch_article_body(url):
    """원문 본문을 추출한다. 실패하면 빈 문자열 — 호출부가 그 기사를 버린다."""
    if not url or not url.startswith("http") or url.lower().endswith(_SKIP_EXT):
        return ""
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("  [본문추출] beautifulsoup4 없음 — 원문 없이 진행하지 않는다")
        return ""
    try:
        res = subprocess.run(
            ["curl", "-sL", "--max-time", "10", "-A",
             "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36", url],
            capture_output=True, timeout=13,
        )
        html = res.stdout.decode("utf-8", errors="ignore")
        if len(html) < 200:
            return ""
        soup = BeautifulSoup(html, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside", "form", "svg", "button", "noscript"]):
            tag.extract()
        main = (soup.find("article") or soup.find("main")
                or soup.find(class_=re.compile(r"content|post|entry|article|body", re.I)))
        target = main or soup
        parts = [el.get_text(separator=" ", strip=True)
                 for el in target.find_all(["p", "h2", "h3", "li"])
                 if len(el.get_text(strip=True)) > 20]
        text = " ".join(parts).strip()
        return text[:MAX_BODY_CHARS] if len(text) >= MIN_BODY_CHARS else ""
    except Exception as e:
        print(f"  [본문추출 실패] {url[:60]}: {e}")
        return ""


def attach_bodies(articles):
    """각 기사에 body 를 채우고, 실패한 것은 버린다."""
    kept, dropped = [], 0
    for a in articles:
        body = fetch_article_body(a.get("link", ""))
        if body:
            a["body"] = body
            kept.append(a)
        else:
            dropped += 1
        time.sleep(0.4)   # 같은 도메인을 연달아 때리지 않는다
    print(f"  본문 확보 {len(kept)}건 / 제외 {dropped}건")
    return kept


def cluster_articles(raw):
    groups = {}
    for art in raw:
        text = (art["title"] + " " + art["summary"]).lower()
        topic = "general"
        for t, kws in TOPIC_PATTERNS.items():
            if any(kw in text for kw in kws):
                topic = t; break
        groups.setdefault(topic, []).append(art)
    return [arts[:5] for arts in groups.values() if len(arts) >= 1][:8]

def _is_qwen_model(model):
    return "qwen" in model.lower()


def _request_llm(prompt, config, model):
    request_body = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a senior AI tech journalist. Return ONLY valid JSON. Use formal Korean (합쇼체)."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3,
        "max_tokens": 3500,
    }
    if _is_qwen_model(model):
        request_body.update({
            "reasoning_effort": "none",
            "response_format": {"type": "json_object"},
        })
    else:
        request_body["response_format"] = {
            "type": "json_schema",
            "json_schema": {
                "name": "trend_report",
                "strict": True,
                "schema": TREND_REPORT_SCHEMA,
            },
        }

    payload = json.dumps(request_body).encode()
    req = urllib.request.Request(f"{config.litellm_url}/chat/completions", data=payload,
        headers={"Authorization": f"Bearer {config.litellm_key}", "Content-Type": "application/json", "User-Agent": "curl/8.7.1"}, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())
        raw = data["choices"][0]["message"]["content"]
        raw = re.sub(r"^```json\s*", "", raw).strip()
        raw = re.sub(r"```$", "", raw).strip()
        report = json.loads(raw)
        return _normalize_qwen_report(report) if _is_qwen_model(model) else report


def _normalize_qwen_report(report):
    normalized = dict(report)
    aliases = {
        "primary_topic": ("theme", "core_theme"),
        "developer_tip": ("dev_tip",),
        "business_tip": ("biz_tip",),
        "impact_score": ("confidence", "score"),
    }
    for canonical, alternatives in aliases.items():
        if normalized.get(canonical) in (None, "", []):
            for alternative in alternatives:
                value = normalized.get(alternative)
                if value not in (None, "", []):
                    normalized[canonical] = value
                    break
        for alternative in alternatives:
            normalized.pop(alternative, None)
    return normalized


def _is_transient_llm_error(error):
    if isinstance(error, (TimeoutError, urllib.error.URLError)):
        return True
    return isinstance(error, urllib.error.HTTPError) and (
        error.code == 429 or error.code >= 500
    )


def _has_required_report_fields(report):
    return all(report.get(field) not in (None, "", []) for field in TREND_REPORT_SCHEMA["required"])


def call_llm(prompt, config):
    try:
        return _request_llm(prompt, config, config.model)
    except Exception as error:
        if not config.fallback_model or not _is_transient_llm_error(error):
            raise

    report = _request_llm(prompt, config, config.fallback_model)
    if not _has_required_report_fields(report):
        report = _request_llm(prompt, config, config.fallback_model)
    return report

def build_prompt(cluster):
    combined = "\n\n---\n\n".join(
        f"Source: {a['source']}\nURL: {a.get('link', '')}\nTitle: {a['title']}\n"
        f"Full text:\n{a.get('body') or a['summary']}"
        for a in cluster
    )
    return f"""다음 {len(cluster)}개의 AI 관련 최신 기사를 종합 분석하여 깊이 있는 '종합 트렌드 리포트'를 작성하세요.

[요구사항]
1. 단순 요약이 아닌 맥락(Context) 기반 심층 조사보도 형태여야 합니다.
2. 글의 흐름에 맞게 동적으로 섹션(##)을 구성하세요. 고정 템플릿 금지.
3. 말투는 반드시 한국 기술 미디어 표준인 합쇼체(~습니다, ~입니다)를 사용하세요.
4. "So What?" — 이 내용이 개발자·기업·산업에 미치는 구체적 의미를 반드시 분석하세요.
5. 실제 수치, 기술 용어, 비교 분석을 포함하여 전문성을 높이세요.

[원문 정보]
{combined}

JSON으로만 응답하세요:
{{
  "title": "종합 리포트 한국어 제목 (30자 이내, 키워드 포함)",
  "primary_topic": "대표 핵심 테마 (10자 이내)",
  "tldr": "TL;DR 3~4문장 핵심 요약 (합쇼체)",
  "blog_body": "마크다운 본문 전문 (1000자 이상, 섹션 제목 ## 자유 구성, 표/인용구 포함 가능, 합쇼체)",
  "developer_tip": "개발자 대상 실무 활용 팁 1문장",
  "pm_tip": "기획자/PM 대상 실전 팁 1문장",
  "business_tip": "비즈니스 리더 대상 TCO/보안/ROI 팁 1문장",
  "tags": ["#태그1", "#태그2", "#태그3", "#태그4"],
  "impact_score": 92
}}"""

def pick_image(cluster):
    """클러스터에서 첫 번째 실제 썸네일을 대표 이미지로 쓴다. 없으면 None."""
    for article in cluster:
        if article.get("image"):
            return article["image"]
    return None


def build_insert_sql(report, cluster, report_id):
    sources = json.dumps([{"title": a["source"], "url": a["link"]} for a in cluster])
    tags = json.dumps(report.get("tags", ["#AI트렌드", "#종합리포트"]))
    tldr = report.get("tldr", "")
    key_takeaways = json.dumps([tldr, report.get("developer_tip",""), report.get("pm_tip",""), report.get("business_tip","")])
    matched_lenses = json.dumps(["developer","agent","pm","business","researcher","synthesized"])

    def esc(s):
        return (s or "").replace("'", "''")

    image = pick_image(cluster)
    image_sql = f"'{esc(image)}'" if image else "NULL"

    return (f"INSERT OR REPLACE INTO trend_news "
           f"(id, title, report_type, executive_summary, analytical_deep_dive, key_takeaways, original_sources, tags, matched_lenses, image_url) VALUES ("
           f"'{esc(report_id)}', '{esc(report.get('title','종합 AI 트렌드 리포트'))}', "
           f"'🔮 종합 트렌드 리포트', '{esc(tldr)}', '{esc(report.get('blog_body',''))}', "
           f"'{esc(key_takeaways)}', '{esc(sources)}', '{esc(tags)}', '{esc(matched_lenses)}', {image_sql})")


def write_report(sql, runner=subprocess.run):
    result = runner(["npx","wrangler","d1","execute","llm-compass-db","--remote","--command", sql],
        capture_output=True, text=True)
    if result.returncode != 0:
        print("    [D1 Error] report write failed")
        return False
    return True


def save_to_d1(report, cluster):
    report_id = f"synth-{uuid.uuid4().hex[:12]}"
    return write_report(build_insert_sql(report, cluster, report_id))


def run_batch(
    config,
    fetcher=fetch_rss,
    generator=call_llm,
    writer=write_report,
    feeds=RSS_FEEDS,
    body_attacher=attach_bodies,
):
    summary = BatchSummary()
    raw_articles = []

    for feed_url in feeds:
        try:
            articles = fetcher(feed_url)
        except Exception:
            summary.failed += 1
            summary.reasons["rss_failure"] += 1
            continue
        raw_articles.extend(articles)

    summary.collected = len(raw_articles)
    accepted_articles, source_reasons = deduplicate_sources(raw_articles)
    summary.reasons.update(source_reasons)
    summary.source_rejected = sum(source_reasons.values())

    # 원문 본문을 확보하고 실패한 기사는 버린다. 요약만으로 쓰면 환각이 된다.
    before_body = len(accepted_articles)
    accepted_articles = body_attacher(accepted_articles)
    dropped_no_body = before_body - len(accepted_articles)
    if dropped_no_body:
        summary.reasons["no_body"] += dropped_no_body

    clusters = cluster_articles(accepted_articles)
    summary.clusters = len(clusters)
    seen_titles: set[str] = set()
    seen_sources: set[str] = set()

    for cluster in clusters:
        try:
            report = generator(build_prompt(cluster), config)
            summary.generated += 1
        except Exception:
            summary.failed += 1
            summary.reasons["llm_failure"] += 1
            continue

        validation = validate_report(report, cluster)
        if not validation.valid:
            summary.report_rejected += 1
            summary.reasons.update(validation.reasons)
            continue
        if is_duplicate_report(report, cluster, seen_titles, seen_sources):
            summary.report_rejected += 1
            summary.reasons["duplicate_report"] += 1
            continue

        report_id = f"synth-{uuid.uuid4().hex[:12]}"
        if writer(build_insert_sql(report, cluster, report_id)):
            summary.saved += 1
        else:
            summary.failed += 1
            summary.reasons["d1_failure"] += 1

    return summary


def exit_code_for(summary):
    return 0 if summary.saved > 0 else 1


def _print_summary(summary):
    print("\n" + "=" * 60)
    print(
        "📊 배치 요약: "
        f"수집 {summary.collected}, 출처 제외 {summary.source_rejected}, "
        f"클러스터 {summary.clusters}, 생성 {summary.generated}, "
        f"리포트 제외 {summary.report_rejected}, 저장 {summary.saved}, 실패 {summary.failed}"
    )
    for reason, count in sorted(summary.reasons.items()):
        print(f"  - {reason}: {count}")


def main():
    try:
        config = load_config()
    except RuntimeError as error:
        print(f"❌ 설정 오류: {error}")
        return 1

    print("=" * 60)
    print("🚀 종합 트렌드 리포트 생성 파이프라인")
    print("=" * 60)
    summary = run_batch(config)
    _print_summary(summary)
    return exit_code_for(summary)

if __name__ == "__main__":
    raise SystemExit(main())
