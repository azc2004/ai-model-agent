#!/usr/bin/env python3
"""
D1 뉴스 배치 수집 스크립트 (news_d1_batch.py)

CLI 옵션:
  --dry-run   : SQL 파일만 생성하고 wrangler 실행은 건너뜀 (GitHub Actions Step 분리 시 사용)

기존 news_pipeline.py의 RSS 수집 파이프라인을 Cloudflare D1 SQLite에 직접 저장하는 독립 배치 스크립트.
Neon DB 의존성 없이 feedparser + wrangler CLI를 통해 D1에 기사를 UPSERT합니다.

실행 방법:
  python3 backend/scripts/news_d1_batch.py

주의: wrangler가 설치되어 있어야 하며 Cloudflare 로그인 상태여야 합니다.
"""

import os
import re
import sys
import json
import uuid
import time
import subprocess
import urllib.parse
import argparse
import urllib.request
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional

# pip install feedparser beautifulsoup4
try:
    import feedparser
    from bs4 import BeautifulSoup
except ImportError:
    print("❌ 필요한 패키지가 없습니다. 설치 중...")
    subprocess.run([sys.executable, "-m", "pip", "install", "feedparser", "beautifulsoup4"], check=True)
    import feedparser
    from bs4 import BeautifulSoup

# ─────────────────────────────────────────────────────────
# 1. 설정값
# ─────────────────────────────────────────────────────────

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D1_DB_NAME = "llm-compass-db"
SQL_OUTPUT_PATH = os.path.join(REPO_ROOT, "seed_news_batch.sql")
MAX_ARTICLES_PER_FEED = 10          # 소스당 최대 수집 수
SUMMARY_MIN_LEN = 50                # 최소 본문 길이 (미달 시 웹 스크래핑)
MAX_TOTAL = 300                     # 최대 총 기사 수

RSS_FEEDS = [
    # 🏢 빅테크 공식 블로그 (9개)
    {"url": "https://openai.com/blog/rss.xml", "name": "OpenAI Blog", "category": "빅테크 공식"},
    {"url": "https://www.anthropic.com/feed.xml", "name": "Anthropic News", "category": "빅테크 공식"},
    {"url": "https://deepmind.google/blog/rss.xml", "name": "Google DeepMind", "category": "빅테크 공식"},
    {"url": "https://ai.meta.com/blog/rss/", "name": "Meta AI Blog", "category": "빅테크 공식"},
    {"url": "https://www.microsoft.com/en-us/research/feed/", "name": "Microsoft Research", "category": "빅테크 공식"},
    {"url": "https://aws.amazon.com/blogs/machine-learning/feed/", "name": "AWS Machine Learning", "category": "빅테크 공식"},
    {"url": "https://blogs.nvidia.com/feed/", "name": "NVIDIA AI Blog", "category": "빅테크 공식"},
    {"url": "https://machinelearning.apple.com/feed.xml", "name": "Apple Machine Learning", "category": "빅테크 공식"},
    {"url": "https://huggingface.co/blog/feed.xml", "name": "Hugging Face Blog", "category": "빅테크 공식"},

    # ⚡ 글로벌 AI 속보 & 매체 (10개)
    {"url": "https://news.ycombinator.com/rss", "name": "Hacker News AI", "category": "IT 매체"},
    {"url": "https://techcrunch.com/category/artificial-intelligence/feed/", "name": "TechCrunch AI", "category": "IT 매체"},
    {"url": "https://venturebeat.com/category/ai/feed/", "name": "VentureBeat AI", "category": "IT 매체"},
    {"url": "https://arstechnica.com/tag/ai/feed/", "name": "Ars Technica AI", "category": "IT 매체"},
    {"url": "https://www.technologyreview.com/topic/artificial-intelligence/feed", "name": "MIT Tech Review", "category": "IT 매체"},
    {"url": "https://www.wired.com/feed/tag/ai/latest/rss", "name": "Wired AI", "category": "IT 매체"},
    {"url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", "name": "The Verge AI", "category": "IT 매체"},
    {"url": "https://www.zdnet.com/topic/artificial-intelligence/rss.xml", "name": "ZDNet AI", "category": "IT 매체"},
    {"url": "https://spectrum.ieee.org/feeds/topic/artificial-intelligence.rss", "name": "IEEE Spectrum AI", "category": "IT 매체"},
    {"url": "https://www.marktechpost.com/feed/", "name": "MarkTechPost AI", "category": "IT 매체"},

    # 🔬 연구 논문 & 에이전트 프레임워크 (7개)
    {"url": "https://arxiv.org/rss/cs.AI", "name": "ArXiv AI Papers", "category": "연구/학계"},
    {"url": "https://arxiv.org/rss/cs.CL", "name": "ArXiv NLP Papers", "category": "연구/학계"},
    {"url": "https://arxiv.org/rss/cs.CV", "name": "ArXiv Vision Papers", "category": "연구/학계"},
    {"url": "https://arxiv.org/rss/cs.LG", "name": "ArXiv Machine Learning", "category": "연구/학계"},
    {"url": "https://blog.langchain.dev/rss/", "name": "LangChain Blog", "category": "연구/학계"},
    {"url": "https://blog.llamaindex.ai/feed", "name": "LlamaIndex Blog", "category": "연구/학계"},
    {"url": "https://microsoft.github.io/autogen/feed.xml", "name": "AutoGen Framework", "category": "연구/학계"},
]

TOPIC_IMAGE_MAP = [
    {"keywords": ["cyber", "security", "safeguards", "보안", "사이버"],
     "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"},
    {"keywords": ["audio", "voice", "speech", "sound", "음성"],
     "url": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"},
    {"keywords": ["code", "coding", "agent", "swe-bench", "refactoring", "개발자", "코드"],
     "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"},
    {"keywords": ["tco", "cost", "market", "business", "enterprise", "비용"],
     "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"},
    {"keywords": ["paper", "arxiv", "sota", "benchmark", "research", "논문"],
     "url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"},
    {"keywords": ["ux", "ui", "design", "interface", "artifacts", "기획"],
     "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"},
    {"keywords": ["gpu", "nvidia", "cuda", "fine-tuning", "파인튜닝"],
     "url": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"},
]

DEFAULT_IMAGES = {
    "OpenAI Blog": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "Anthropic News": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    "Google DeepMind": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "Meta AI Blog": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    "Microsoft Research": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "AWS Machine Learning": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
    "NVIDIA AI Blog": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
}

# ─────────────────────────────────────────────────────────
# 2. 유틸리티 함수
# ─────────────────────────────────────────────────────────

def clean_html(raw_html: str) -> str:
    """HTML 태그 제거 후 순수 텍스트 반환"""
    if not raw_html:
        return ""
    soup = BeautifulSoup(raw_html, "html.parser")
    return soup.get_text(separator=" ", strip=True)


def get_image_url(entry, raw_html: str, source_name: str, title: str, summary: str) -> str:
    """RSS entry에서 대표 썸네일 이미지 URL 추출"""
    # 1. media_thumbnail
    if hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
        url = entry.media_thumbnail[0].get('url')
        if url:
            return url
    # 2. media_content
    if hasattr(entry, 'media_content') and entry.media_content:
        url = entry.media_content[0].get('url')
        if url:
            return url
    # 3. img src in HTML
    if raw_html:
        soup = BeautifulSoup(raw_html, "html.parser")
        img = soup.find("img")
        if img and img.get("src", "").startswith("http"):
            return img["src"]
    # 4. Topic keyword 매핑
    combined = (title + " " + summary).lower()
    for item in TOPIC_IMAGE_MAP:
        if any(kw in combined for kw in item["keywords"]):
            return item["url"]
    # 5. 소스별 기본 이미지
    return DEFAULT_IMAGES.get(
        source_name,
        "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80"
    )


def free_translate(text: str) -> str:
    """Google 무료 번역 API (폴백)"""
    if not text or len(text) < 5:
        return text
    try:
        encoded = urllib.parse.quote(text[:800])
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ko&dt=t&q={encoded}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            translated = "".join([item[0] for item in data[0] if item and item[0]])
            return translated.strip() if translated else text
    except Exception as e:
        print(f"[번역 폴백] {e}")
        return text


def is_mostly_korean(text: str) -> bool:
    """텍스트의 25% 이상이 한글이면 True"""
    if not text:
        return False
    korean = sum(1 for c in text if '\uac00' <= c <= '\ud7a3')
    return korean >= len(text) * 0.25


def translate_title(title: str) -> str:
    """기사 제목 한국어 번역"""
    if not title:
        return "최신 AI 기술 리포트"
    clean = title.replace(" 소식 및 기술 리포트", "").strip()
    if is_mostly_korean(clean):
        return clean
    translated = free_translate(clean)
    if translated and is_mostly_korean(translated):
        return translated
    return clean


def translate_summary(text: str) -> str:
    """기사 본문 요약 한국어 번역 (최대 600자)"""
    if not text:
        return ""
    clean = text.strip()[:600]
    clean = re.sub(r'Announce Type:\s*(new|cross)\s*Abstract:\s*', '', clean).strip()
    if is_mostly_korean(clean):
        return clean
    return free_translate(clean)


def classify_lenses(title: str, summary: str, source: str, category: str) -> List[str]:
    """기사 내용을 분석하여 직무 렌즈 분류 (developer, agent, pm, business, researcher)"""
    combined = (title + " " + summary + " " + source + " " + category).lower()
    scores = {"developer": 0, "agent": 0, "pm": 0, "business": 0, "researcher": 0}

    for kw in ["code", "coding", "developer", "fine-tuning", "api", "sdk", "python", "swe-bench", "파인튜닝", "개발자", "코드"]:
        if kw in combined: scores["developer"] += 2
    for kw in ["agent", "agentic", "autonomous", "workflow", "rag", "multi-agent", "langchain", "autogen", "에이전트", "자동화"]:
        if kw in combined: scores["agent"] += 3
    for kw in ["ux", "ui", "product", "pm", "design", "onboarding", "기획", "디자인", "사용자"]:
        if kw in combined: scores["pm"] += 3
    for kw in ["tco", "cost", "enterprise", "business", "roi", "market", "aws", "nvidia", "비용", "기업", "보안"]:
        if kw in combined: scores["business"] += 2
    for kw in ["paper", "arxiv", "sota", "benchmark", "research", "dataset", "eval", "논문", "연구", "학계"]:
        if kw in combined: scores["researcher"] += 3

    if "arxiv" in combined or "hugging face" in combined:
        scores["researcher"] += 5
    if any(x in combined for x in ["openai", "anthropic", "deepmind"]):
        scores["developer"] += 2
        scores["agent"] += 2
    if any(x in combined for x in ["techcrunch", "venturebeat", "wired"]):
        scores["business"] += 3

    sorted_lenses = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    selected = [lens for lens, score in sorted_lenses if score >= 2][:2]
    if not selected:
        selected = [sorted_lenses[0][0]]
    return selected


def make_bullets_and_summary(title_kr: str, summary_text: str, source_name: str, category: str) -> tuple:
    """번역된 요약문으로 3줄 핵심 요약과 블로그 본문 생성"""
    sentences = [s.strip() for s in re.split(r'[.!?]\s+', summary_text) if len(s.strip()) > 15]

    if len(sentences) >= 3:
        bullets = [f"{s}." for s in sentences[:3]]
    elif len(sentences) == 2:
        bullets = [f"{sentences[0]}.", f"{sentences[1]}.", f"본 소식은 {source_name}을 통해 발표된 최신 AI 기술 트렌드를 담고 있습니다."]
    else:
        bullets = [
            f"'{title_kr}' 주제에 관한 핵심 기술 발표 리포트입니다.",
            f"글로벌 AI 채널({source_name})을 통해 발췌된 최신 피드 소식입니다.",
            "해당 직무별 실전 활용 팁을 참고하여 현업 시스템 아키텍처에 적용해 보세요."
        ]

    blog_summary = f"""# 📌 [Technical Report] {title_kr}

> **주요 출처**: {source_name} | **카테고리**: {category} | **검증**: ✅ AI Trend News

---

### 1. 📌 핵심 요약

{bullets[0]}

{bullets[1] if len(bullets) > 1 else ''}

{bullets[2] if len(bullets) > 2 else ''}

---

### 2. 🔍 배경 및 의미

{summary_text[:500] if len(summary_text) > 30 else f'{source_name}을 통해 발표된 최신 AI 기술 소식입니다.'}

---

### 3. 🎯 직무별 실전 활용 팁

* **👩‍💻 개발자**: 최신 AI 모델 아키텍처 및 API 연동 방식을 현재 개발 스택에 적용해 보세요.
* **💡 기획자/PM**: 서비스 로드맵에 AI 기술 트렌드를 반영한 사용자 경험을 기획하세요.
* **💼 비즈니스**: 고비용 상용 API를 오픈소스 모델로 대체하여 TCO를 최적화하세요.
* **🔬 연구자**: 관련 벤치마크 데이터 및 논문 원문을 교차 검증하세요.
"""
    return bullets, blog_summary


def escape_sql(s: str) -> str:
    """SQL 단일 인용부호 이스케이프"""
    if not s:
        return ""
    return s.replace("'", "''")


def normalize_title(title: str) -> str:
    """제목 정규화 (중복 탐지용)"""
    if not title:
        return ""
    t = re.sub(r'\s*소식\s*및\s*기술\s*리포트\s*', '', title)
    return re.sub(r'[\s\W_]+', '', t).lower()


# ─────────────────────────────────────────────────────────
# 3. RSS 수집 로직
# ─────────────────────────────────────────────────────────

def fetch_rss_feeds() -> List[Dict]:
    """모든 RSS 피드에서 최신 기사 수집"""
    raw_articles = []
    for feed_info in RSS_FEEDS:
        print(f"  📡 수집 중: {feed_info['name']} ({feed_info['url'][:50]}...)")
        try:
            parsed = feedparser.parse(feed_info["url"])
            if not hasattr(parsed, 'entries'):
                print(f"  ⚠️  파싱 실패: {feed_info['name']}")
                continue

            count = 0
            for entry in parsed.entries[:MAX_ARTICLES_PER_FEED]:
                content_val = ""
                if "content" in entry and isinstance(entry.content, list) and len(entry.content) > 0:
                    content_val = entry.content[0].get("value", "")
                raw_html = content_val or entry.get("summary", "") or entry.get("description", "")
                raw_title = (entry.get("title") or "").strip()
                if not raw_title:
                    raw_title = f"{feed_info['name']} 최신 AI 기술 발표 피드"

                link_url = entry.get("link", "") or ""
                summary_text = clean_html(raw_html)
                img_url = get_image_url(entry, raw_html, feed_info["name"], raw_title, summary_text)

                raw_articles.append({
                    "source_name": feed_info["name"],
                    "category": feed_info["category"],
                    "title": raw_title,
                    "link": link_url or f"https://ai-compass.org/{uuid.uuid4().hex[:8]}",
                    "published": entry.get("published", datetime.now(timezone.utc).isoformat()),
                    "image_url": img_url,
                    "summary": summary_text[:2000],
                })
                count += 1

            print(f"  ✅ {feed_info['name']}: {count}개 수집")
        except Exception as e:
            print(f"  ❌ 수집 오류 [{feed_info['name']}]: {e}")
        time.sleep(0.3)  # 요청 간격 확보

    return raw_articles[:MAX_TOTAL]


# ─────────────────────────────────────────────────────────
# 4. 기사 처리 및 SQL 생성
# ─────────────────────────────────────────────────────────

def process_articles(raw_articles: List[Dict]) -> List[str]:
    """수집된 원문 기사를 번역/분류하여 D1 UPSERT SQL 문으로 변환"""
    sql_statements = []
    seen_titles = set()
    seen_urls = set()
    processed = 0

    for raw in raw_articles:
        # 중복 탐지
        norm_t = normalize_title(raw.get("title", ""))
        clean_url = raw.get("link", "").split("?")[0].rstrip("/")
        if norm_t in seen_titles or (clean_url and clean_url in seen_urls):
            continue
        if norm_t:
            seen_titles.add(norm_t)
        if clean_url:
            seen_urls.add(clean_url)

        print(f"  🔄 처리 중 [{processed+1}]: {raw['title'][:60]}...")

        # 한국어 번역
        title_kr = translate_title(raw["title"])
        summary_kr = translate_summary(raw["summary"])

        # 핵심 요약 및 블로그 생성
        bullets, blog_summary = make_bullets_and_summary(
            title_kr, summary_kr, raw["source_name"], raw["category"]
        )

        # 직무 렌즈 분류
        lenses = classify_lenses(title_kr, summary_kr, raw["source_name"], raw["category"])

        # ID 생성 (URL 기반 UUID)
        article_id = str(uuid.uuid5(uuid.NAMESPACE_URL, raw["link"]))

        # Actionable Insight
        actionable = {
            "developer": "최신 AI 모델 아키텍처를 현재 개발 스택에 적용하여 성능을 최적화하세요.",
            "pm": "AI 기술 트렌드를 서비스 로드맵에 반영하여 경쟁 우위를 확보하세요.",
            "business": "고비용 상용 API를 오픈 모델로 대체하여 인프라 TCO를 절감하세요.",
            "researcher": "관련 벤치마크 및 논문 원문을 교차 검증하여 연구 방향을 설정하세요."
        }

        # SQL 생성
        sql = f"""INSERT OR REPLACE INTO trend_news (
  id, title, report_type, executive_summary, analytical_deep_dive,
  key_takeaways, original_sources, tags, matched_lenses
) VALUES (
  '{escape_sql(article_id)}',
  '{escape_sql(title_kr)}',
  '{escape_sql(raw["category"])}',
  '{escape_sql(summary_kr[:500] if summary_kr else bullets[0])}',
  '{escape_sql(blog_summary)}',
  '{escape_sql(json.dumps(bullets, ensure_ascii=False))}',
  '{escape_sql(json.dumps([{"title": raw["source_name"], "url": raw["link"]}], ensure_ascii=False))}',
  '{escape_sql(json.dumps(["#AI트렌드", f"#{raw['source_name'].replace(' ', '')}"], ensure_ascii=False))}',
  '{escape_sql(json.dumps(lenses, ensure_ascii=False))}'
);"""
        sql_statements.append(sql)
        processed += 1

        if processed % 10 == 0:
            print(f"  📊 진행률: {processed}개 처리 완료")

    return sql_statements


# ─────────────────────────────────────────────────────────
# 5. D1 실행
# ─────────────────────────────────────────────────────────

def run_wrangler_execute(sql_file: str) -> bool:
    """wrangler d1 execute로 SQL 파일을 D1에 적재"""
    print(f"\n🚀 D1에 적재 중: {sql_file}")
    try:
        result = subprocess.run(
            ["npx", "wrangler", "d1", "execute", D1_DB_NAME, "--remote", f"--file={sql_file}"],
            capture_output=True, text=True, cwd=REPO_ROOT, timeout=120
        )
        if result.returncode == 0:
            print("✅ D1 적재 성공!")
            print(result.stdout[-500:] if len(result.stdout) > 500 else result.stdout)
            return True
        else:
            print(f"❌ D1 적재 실패:\n{result.stderr[-500:]}")
            return False
    except Exception as e:
        print(f"❌ wrangler 실행 오류: {e}")
        return False


def check_current_count() -> int:
    """현재 D1 trend_news 기사 수 확인"""
    try:
        result = subprocess.run(
            ["curl", "-s", "https://ai-model-agent.ai-azc2004.workers.dev/api/v1/news/pulse"],
            capture_output=True, text=True, timeout=10
        )
        data = json.loads(result.stdout)
        return data.get("total_count", 0)
    except Exception:
        return 0


# ─────────────────────────────────────────────────────────
# 6. 메인 실행
# ─────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="AI 트렌드 뉴스 Cloudflare D1 배치 수집")
    parser.add_argument("--dry-run", action="store_true", help="SQL 파일만 생성하고 wrangler 실행 건너뜀")
    args = parser.parse_args()

    print("=" * 60)
    print("🗞️  AI 트렌드 뉴스 Cloudflare D1 배치 수집 스크립트")
    print("=" * 60)
    if not args.dry_run:
        print(f"\n📊 현재 D1 기사 수: {check_current_count()}개")
    print(f"📡 {len(RSS_FEEDS)}개 RSS 소스에서 최대 {MAX_TOTAL}개 기사 수집 시작...\n")

    # 1. RSS 수집
    raw_articles = fetch_rss_feeds()
    print(f"\n✅ RSS 수집 완료: 총 {len(raw_articles)}개 원문 기사\n")

    if not raw_articles:
        print("❌ 수집된 기사가 없습니다. 네트워크 연결을 확인하세요.")
        return

    # 2. 번역 + SQL 변환
    print("🔄 기사 번역 및 SQL 변환 중...\n")
    sql_statements = process_articles(raw_articles)
    print(f"\n✅ 번역 완료: {len(sql_statements)}개 기사 처리 완료\n")

    if not sql_statements:
        print("❌ 처리된 기사가 없습니다.")
        return

    # 3. SQL 파일 저장
    with open(SQL_OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write("\n".join(sql_statements))
    print(f"💾 SQL 파일 저장 완료: {SQL_OUTPUT_PATH}")
    print(f"   총 {len(sql_statements)}개 UPSERT 구문\n")

    # 4. D1 적재 (--dry-run 시 건너뜀)
    if args.dry_run:
        print(f"\n⏭️  --dry-run 모드: wrangler 실행 건너뜀.")
        print(f"   SQL 파일 위치: {SQL_OUTPUT_PATH}")
        print("   적재하려면:")
        print(f"   npx wrangler d1 execute {D1_DB_NAME} --remote --file={SQL_OUTPUT_PATH}")
        return

    success = run_wrangler_execute(SQL_OUTPUT_PATH)

    if success:
        time.sleep(2)
        new_count = check_current_count()
        print(f"\n🎉 완료! D1 기사 수: {new_count}개")
    else:
        print(f"\n⚠️  D1 적재 실패. SQL 파일은 {SQL_OUTPUT_PATH}에 저장되었습니다.")
        print("   수동으로 실행하려면:")
        print(f"   npx wrangler d1 execute {D1_DB_NAME} --remote --file={SQL_OUTPUT_PATH}")


if __name__ == "__main__":
    main()
