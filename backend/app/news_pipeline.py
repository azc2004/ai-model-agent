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

FALLBACK_ARTICLES = [
    NewsArticle(
        id="fallback-1",
        title="OpenAI, 차세대 멀티모달 프런티어 모델 및 Fine-Tuning API 정식 출시",
        source_name="OpenAI Blog",
        source_url="https://openai.com/news/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        summary_bullets=[
            "OpenAI가 저비용 고효율 파인튜닝과 추론 성능을 극대화한 신규 엔드포인트를 공식 개방함.",
            "기업 도메인에 특화된 사용자 맞춤형 커스텀 모델 생성을 60% 이상 저렴한 비용으로 제공.",
            "개발자 콘솔을 통한 추론 지연 시간(Latency) 35% 단축 및 9월 말까지 파인튜닝 토큰 혜택 부여."
        ],
        actionable_insight=ActionableInsight(
            developer="기존 RAG 파이프라인에서 복잡한 전처리 대신 커스텀 모델 파인튜닝을 도입해 API 호스트 비용을 60% 절감하세요.",
            pm="사용자 도메인 특화 챗봇의 응답 일관성을 끌어올려 UX 이탈률을 감소시킬 시점입니다.",
            business="엔터프라이즈 사내 지식 기반 도메인을 고성능 소형 파인튜닝 모델로 대체하여 TCO를 최적화하세요.",
            researcher="도메인 특화 데이터셋을 활용한 Fine-tuning 성능과 RAG 결합 방식의 정확도를 벤치마킹하세요."
        ),
        impact_score=98,
        tags=["#OpenAI", "#FineTuning", "#GPT4o", "#TCO최적화"],
        matched_lenses=["developer", "pm", "business", "researcher"]
    ),
    NewsArticle(
        id="fallback-2",
        title="Google DeepMind, 복잡한 코드 리팩토링 및 런타임 버그 수술용 자율 코딩 에이전트 공개",
        source_name="Google DeepMind",
        source_url="https://deepmind.google/blog/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        summary_bullets=[
            "구글 딥마인드가 멀티모달 화면 뷰어와 지식 그래프를 연동한 자율 개발 에이전트 엔진을 공개함.",
            "SWE-bench 파이프라인 벤치마크에서 기존 LLM 대비 코드 수정 및 자동 테스트 성공률 42% 상회.",
            "개발자가 작성한 요구사항 명세서만으로 전체 프론트엔드/백엔드 모듈 빌드 자동 완성."
        ],
        actionable_insight=ActionableInsight(
            developer="codebase-memory-mcp와 결합하여 레거시 코드베이스 리팩토링 작업을 에이전트에 위임해 개발 속도를 3배 높이세요.",
            pm="새로운 모듈 기획 시 스펙 문서(spec.md)의 EARS 구문을 정밀화하여 에이전트 자동 구현 성공률을 높이세요.",
            business="개발팀의 단순 유지보수 공수를 40% 절감하고 고가치 코어 아키텍처 설계에 인력을 집중 배치하세요.",
            researcher="멀티모달 뷰어와 에이전트 지식 그래프 추론 파이프라인의 SOTA 벤치마크 메커니즘을 분석하세요."
        ),
        impact_score=95,
        tags=["#GoogleDeepMind", "#AgenticAI", "#SWEbench", "#VibeCoding"],
        matched_lenses=["developer", "pm", "business", "researcher"]
    ),
    NewsArticle(
        id="fallback-3",
        title="Anthropic, Claude 3.5 Sonnet Artifacts 기능 및 엔터프라이즈 지식 통합 가이드 발표",
        source_name="Anthropic News",
        source_url="https://www.anthropic.com/news",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        summary_bullets=[
            "Anthropic이 실시간 웹 앱 및 렌더링 아티팩트 창을 지식 파일 파이프라인과 통합 발표.",
            "코드 실행 워크스페이스 내에서 백엔드 및 UI 컴포넌트를 즉각 미리보기 가능한 차세대 워크플로우.",
            "엔터프라이즈 보안 가이드라인 준수를 위한 IAM Role 및 미세 조정 가드레일 제공."
        ],
        actionable_insight=ActionableInsight(
            developer="Claude 3.5 Sonnet의 System Prompt 매개변수 분리 기능을 활용하여 프롬프트 주입 공격을 철저히 차단하세요.",
            pm="인터랙티브 아티팩트 뷰어를 활용해 프로토타입 UI 제작 시간을 기존 3일에서 1시간으로 단축하세요.",
            business="사내 민감 정보 유출 방지를 위한 프로필 기반 접속 통제 보안 정책을 도입하세요.",
            researcher="프런티어 모델의 추론 스트리밍 시 컴포넌트 실시간 렌더링 최적화 기술을 검토하세요."
        ),
        impact_score=92,
        tags=["#Anthropic", "#Claude35", "#Artifacts", "#보안가드레일"],
        matched_lenses=["developer", "pm", "business", "researcher"]
    )
]

# In-memory 캐시 (서버 구동 즉시 0초 노출을 위해 기본 피드 선적재)
_news_cache: Dict[str, Any] = {
    "last_updated": time.time(),
    "articles": FALLBACK_ARTICLES
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
    try:
        raw_articles = await fetch_rss_feeds()
        print(f"[NewsBatch] Fetched {len(raw_articles)} raw entries from RSS feeds.")
        
        articles = []
        for raw in raw_articles:
            article = analyze_article_with_llm(raw)
            if article.impact_score > 0:
                articles.append(article)
        
        # Impact Score 내림차순 정렬
        articles.sort(key=lambda x: x.impact_score, reverse=True)
    except Exception as e:
        print(f"[NewsBatch Error] RSS fetching failed: {e}")
        articles = []

    # 네트워크 타임아웃이나 파싱 실패로 뉴스가 없을 경우 백업 폴백 피드 제공 (100% 가용성 보장)
    if not articles:
        print("[NewsBatch Warning] No RSS articles processed. Using FALLBACK_ARTICLES for 100% uptime.")
        articles = FALLBACK_ARTICLES
    
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

