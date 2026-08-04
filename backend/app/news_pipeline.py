import time
import uuid
import json
import feedparser
import asyncio
from datetime import datetime, timezone
from bs4 import BeautifulSoup
from typing import List, Dict, Any

from app.schemas import NewsArticle, ActionableInsight, NewsPulseResponse
from app.markdown_generator import client, GENERATOR_MODEL

# In-memory 캐시 (일반적으로는 Redis/DB를 사용하나 MVP로 메모리에 저장)
_news_cache: Dict[str, Any] = {
    "last_updated": 0,
    "articles": []
}

CACHE_TTL = 3600 * 24  # 하루에 1번 수집/갱신 (24시간)

RSS_FEEDS = [
    # 🏢 빅테크 공식 블로그
    {"url": "https://openai.com/blog/rss.xml", "name": "OpenAI Blog", "category": "빅테크 공식"},
    {"url": "https://www.anthropic.com/feed.xml", "name": "Anthropic News", "category": "빅테크 공식"},
    {"url": "https://deepmind.google/blog/rss.xml", "name": "Google DeepMind", "category": "빅테크 공식"},
    {"url": "https://ai.meta.com/blog/rss/", "name": "Meta AI Blog", "category": "빅테크 공식"},
    {"url": "https://www.microsoft.com/en-us/research/feed/", "name": "Microsoft Research", "category": "빅테크 공식"},

    # 📰 글로벌 IT/AI 전문 매체
    {"url": "https://techcrunch.com/category/artificial-intelligence/feed/", "name": "TechCrunch AI", "category": "IT 매체"},
    {"url": "https://venturebeat.com/category/ai/feed/", "name": "VentureBeat AI", "category": "IT 매체"},
    {"url": "https://arstechnica.com/tag/ai/feed/", "name": "Ars Technica AI", "category": "IT 매체"},
    {"url": "https://www.technologyreview.com/topic/artificial-intelligence/feed", "name": "MIT Tech Review", "category": "IT 매체"},

    # 🔬 연구 논문 & 벤치마크
    {"url": "https://huggingface.co/blog/feed.xml", "name": "Hugging Face Blog", "category": "연구/학계"},
    {"url": "https://arxiv.org/rss/cs.AI", "name": "ArXiv AI Papers", "category": "연구/학계"}
]

def clean_html(raw_html: str) -> str:
    soup = BeautifulSoup(raw_html, "html.parser")
    return soup.get_text(separator=" ", strip=True)

async def fetch_rss_feeds() -> List[Dict[str, Any]]:
    """비동기적이라기 보단 백그라운드 태스크로 여러 RSS를 동시에 파싱합니다."""
    loop = asyncio.get_event_loop()
    tasks = []
    for feed_info in RSS_FEEDS:
        # feedparser는 동기 I/O이므로 스레드풀에서 실행
        tasks.append(loop.run_in_executor(None, feedparser.parse, feed_info["url"]))
    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    raw_articles = []
    for feed_info, parsed in zip(RSS_FEEDS, results):
        if isinstance(parsed, Exception) or not hasattr(parsed, 'entries'):
            continue
            
        for entry in parsed.entries[:3]:  # 소스당 상위 3개 최신 기사만 수집
            raw_articles.append({
                "source_name": feed_info["name"],
                "category": feed_info["category"],
                "title": entry.get("title", ""),
                "link": entry.get("link", ""),
                "published": entry.get("published", str(datetime.now(timezone.utc))),
                "summary": clean_html(entry.get("summary", "") or entry.get("description", ""))[:2000] # LLM 컨텍스트 제한을 위해 2000자 슬라이싱
            })
    return raw_articles

def analyze_article_with_llm(raw: Dict[str, Any]) -> NewsArticle:
    """원문을 LLM에 넘겨 3줄 요약, 실무 팁, 태그, 렌즈를 추출합니다."""
    prompt = f"""
다음은 최근 AI 관련 기사의 원문(또는 일부)입니다.
Title: {raw['title']}
Source: {raw['source_name']}
Content: {raw['summary']}

이 기사를 바탕으로 다음 JSON 스키마에 정확히 맞게 분석 결과를 한국어로 응답하세요. (마크다운 ```json 등은 제외하고 순수 JSON 문자열만 반환할 것)
{{
    "title_kr": "기사 제목의 자연스러운 한국어 번역",
    "summary_bullets": [
        "핵심 요약 1",
        "핵심 요약 2",
        "핵심 요약 3"
    ],
    "actionable_insight": {{
        "developer": "개발자/엔지니어 입장에서의 실무 적용 팁 1~2문장 (관련없으면 null)",
        "pm": "서비스 기획자/PM 입장에서의 팁 1~2문장 (관련없으면 null)",
        "business": "비즈니스 리더/임원 입장에서의 팁 1~2문장 (관련없으면 null)",
        "researcher": "연구자/학계 입장에서의 팁 1~2문장 (관련없으면 null)"
    }},
    "impact_score": 85, // 1~100 사이의 산업적 영향력 점수 정수
    "tags": ["#태그1", "#태그2"],
    "matched_lenses": ["developer", "business"] // 이 기사가 유용한 직군 배열 ('developer', 'pm', 'business', 'researcher' 중 해당되는 것만)
}}
"""
    
    try:
        response = client.chat.completions.create(
            model=GENERATOR_MODEL,
            messages=[
                {"role": "system", "content": "You are a senior AI technical analyst. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1024,
        )
        content = response.choices[0].message.content.strip()
        # Remove JSON markdown if present
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        data = json.loads(content)
        
        insight_data = data.get("actionable_insight", {})
        insight = ActionableInsight(
            developer=insight_data.get("developer"),
            pm=insight_data.get("pm"),
            business=insight_data.get("business"),
            researcher=insight_data.get("researcher")
        )
        
        article = NewsArticle(
            id=str(uuid.uuid5(uuid.NAMESPACE_URL, raw["link"])),
            title=data.get("title_kr", raw["title"]),
            source_name=raw["source_name"],
            source_url=raw["link"],
            published_at=raw["published"],
            category=raw["category"],
            summary_bullets=data.get("summary_bullets", []),
            actionable_insight=insight,
            impact_score=data.get("impact_score", 50),
            tags=data.get("tags", []),
            matched_lenses=data.get("matched_lenses", [])
        )
        return article
    except Exception as e:
        print(f"Error analyzing article {raw['title']}: {e}")
        # 실패 시 기본값 폴백
        return NewsArticle(
            id=str(uuid.uuid4()),
            title=raw["title"],
            source_name=raw["source_name"],
            source_url=raw["link"],
            published_at=raw["published"],
            category=raw["category"],
            summary_bullets=[raw["summary"][:100] + "..."],
            actionable_insight=ActionableInsight(),
            impact_score=0,
            tags=[],
            matched_lenses=[]
        )

async def run_batch_job(force: bool = False) -> List[NewsArticle]:
    """정기 배치 또는 수동 강제 실행 시 RSS 수집 및 AI 요약 파이프라인을 실행합니다."""
    global _news_cache
    now = time.time()
    
    if not force and _news_cache["articles"] and (now - _news_cache["last_updated"]) < CACHE_TTL:
        print(f"[NewsBatch] Cache is still valid. Using cached articles ({len(_news_cache['articles'])} items).")
        return _news_cache["articles"]
    
    print("[NewsBatch] 🚀 Starting Scheduled AI News Pipeline Batch Job...")
    raw_articles = await fetch_rss_feeds()
    print(f"[NewsBatch] Fetched {len(raw_articles)} raw entries from RSS feeds.")
    
    articles = []
    for raw in raw_articles:
        article = analyze_article_with_llm(raw)
        if article.impact_score > 0:
            articles.append(article)
    
    # Impact Score 내림차순 정렬
    articles.sort(key=lambda x: x.impact_score, reverse=True)
    
    _news_cache["articles"] = articles
    _news_cache["last_updated"] = now
    print(f"[NewsBatch] ✅ Batch Job Completed! Cached {len(articles)} processed articles.")
    return articles

async def refresh_news_pipeline() -> List[NewsArticle]:
    return await run_batch_job(force=False)

async def start_news_batch_loop():
    """서버 구동 시 실행되는 24시간 단위 정기 배치 루프"""
    print("[NewsBatch] Initializing 24-hour Periodic News Batch Scheduler...")
    while True:
        try:
            await run_batch_job(force=True)
        except Exception as e:
            print(f"[NewsBatch Error] Exception during scheduled batch execution: {e}")
        
        # 24시간(86400초) 대기 후 다음 배치 실행
        await asyncio.sleep(CACHE_TTL)

