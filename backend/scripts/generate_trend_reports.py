#!/usr/bin/env python3
"""
종합 트렌드 리포트 생성 스크립트
RSS 수집 → 클러스터링 → LiteLLM(gpt-4o-mini) → Cloudflare D1 저장
"""
import json, os, re, uuid, subprocess, urllib.request, urllib.parse
from dataclasses import dataclass
from typing import Mapping

RSS_FEEDS = [
    "https://feeds.feedburner.com/venturebeat/SZYF",
    "https://techcrunch.com/feed/",
    "https://www.technologyreview.com/feed/",
    "https://openai.com/news/rss.xml",
    "https://www.deepmind.com/blog/rss.xml",
    "https://huggingface.co/blog/feed.xml",
    "https://aws.amazon.com/blogs/machine-learning/feed/",
    "https://blogs.microsoft.com/ai/feed/",
    "https://blog.google/technology/ai/rss/",
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


@dataclass(frozen=True)
class BatchConfig:
    litellm_url: str
    litellm_key: str
    model: str


def load_config(environ: Mapping[str, str] | None = None) -> BatchConfig:
    source = os.environ if environ is None else environ
    key = source.get("LITELLM_API_KEY", "").strip()
    if not key:
        raise RuntimeError("LITELLM_API_KEY is required")
    return BatchConfig(
        litellm_url=source.get("LITELLM_URL", "https://ai-gateway.azclab.com/v1").rstrip("/"),
        litellm_key=key,
        model=source.get("LITELLM_MODEL", "personal-main"),
    )

def fetch_rss(feed_url):
    try:
        req = urllib.request.Request(feed_url, headers={"User-Agent": "curl/8.7.1"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            text = resp.read().decode("utf-8", errors="ignore")
        arts = []
        for item in re.finditer(r"<item[\s\S]*?</item>", text):
            t = item.group()
            title = (re.search(r"<title><!\[CDATA\[([\s\S]*?)\]\]></title>", t) or re.search(r"<title>([^<]*)</title>", t))
            link = (re.search(r"<link>([^<]*)</link>", t) or re.search(r'<link[^>]*href="([^"]+)"', t))
            desc = (re.search(r"<description><!\[CDATA\[([\s\S]*?)\]\]></description>", t) or re.search(r"<description>([^<]*)</description>", t))
            if title and link:
                clean = re.sub(r"<[^>]+>", "", desc.group(1) if desc else "").strip()[:500]
                arts.append({"title": title.group(1).strip(), "link": link.group(1).strip(), "summary": clean, "source": urllib.parse.urlparse(feed_url).hostname})
        return arts[:8]
    except Exception as e:
        print(f"  [RSS Skip] {feed_url}: {e}")
        return []

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

def call_llm(prompt, config):
    payload = json.dumps({
        "model": config.model,
        "messages": [
            {"role": "system", "content": "You are a senior AI tech journalist. Return ONLY valid JSON. Use formal Korean (합쇼체)."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3, "max_tokens": 8000,
    }).encode()
    req = urllib.request.Request(f"{config.litellm_url}/chat/completions", data=payload,
        headers={"Authorization": f"Bearer {config.litellm_key}", "Content-Type": "application/json", "User-Agent": "curl/8.7.1"}, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())
        raw = data["choices"][0]["message"]["content"]
        raw = re.sub(r"^```json\s*", "", raw).strip()
        raw = re.sub(r"```$", "", raw).strip()
        return json.loads(raw)

def build_prompt(cluster):
    combined = "\n\n---\n\n".join(f"Source: {a['source']}\nTitle: {a['title']}\nSummary: {a['summary']}" for a in cluster)
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

def build_insert_sql(report, cluster, report_id):
    sources = json.dumps([{"title": a["source"], "url": a["link"]} for a in cluster])
    tags = json.dumps(report.get("tags", ["#AI트렌드", "#종합리포트"]))
    tldr = report.get("tldr", "")
    key_takeaways = json.dumps([tldr, report.get("developer_tip",""), report.get("pm_tip",""), report.get("business_tip","")])
    matched_lenses = json.dumps(["developer","agent","pm","business","researcher","synthesized"])

    def esc(s):
        return (s or "").replace("'", "''")

    return (f"INSERT OR REPLACE INTO trend_news "
           f"(id, title, report_type, executive_summary, analytical_deep_dive, key_takeaways, original_sources, tags, matched_lenses) VALUES ("
           f"'{esc(report_id)}', '{esc(report.get('title','종합 AI 트렌드 리포트'))}', "
           f"'🔮 종합 트렌드 리포트', '{esc(tldr)}', '{esc(report.get('blog_body',''))}', "
           f"'{esc(key_takeaways)}', '{esc(sources)}', '{esc(tags)}', '{esc(matched_lenses)}')")


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

def main():
    config = load_config()
    print("=" * 60)
    print("🚀 종합 트렌드 리포트 생성 파이프라인")
    print("=" * 60)

    print("\n📡 RSS 수집 중...")
    raw = []
    for feed in RSS_FEEDS:
        arts = fetch_rss(feed)
        raw.extend(arts)
        print(f"  ✓ {urllib.parse.urlparse(feed).hostname}: {len(arts)}건")
    print(f"\n  총 수집: {len(raw)}건")

    print("\n🧩 클러스터링...")
    clusters = cluster_articles(raw)
    print(f"  {len(clusters)}개 클러스터 형성")

    print(f"\n🤖 LLM 종합 트렌드 리포트 생성...")
    saved = 0
    for i, cluster in enumerate(clusters, 1):
        print(f"\n  [{i}/{len(clusters)}] {len(cluster)}개 기사 → 리포트 생성")
        for a in cluster:
            print(f"    - {a['title'][:60]}")
        try:
            report = call_llm(build_prompt(cluster), config)
            print(f"    📝 제목: {report.get('title','N/A')}")
            if save_to_d1(report, cluster):
                saved += 1
                print(f"    ✅ D1 저장 완료")
        except Exception as e:
            print(f"    ❌ 오류: {e}")

    print(f"\n{'='*60}")
    print(f"✅ 완료! {saved}개 종합 트렌드 리포트가 D1에 저장되었습니다.")
    r = subprocess.run(["npx","wrangler","d1","execute","llm-compass-db","--remote","--command","SELECT COUNT(*) as total FROM trend_news"],
        capture_output=True, text=True)
    if r.returncode == 0:
        m = re.search(r'"total":\s*(\d+)', r.stdout)
        if m:
            print(f"📊 D1 최종 저장: {m.group(1)}건")

if __name__ == "__main__":
    main()
