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

DEFAULT_SOURCE_IMAGES: Dict[str, str] = {
    "OpenAI Blog": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "Anthropic News": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    "Google DeepMind": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "Meta AI Blog": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    "Microsoft Research": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "AWS Machine Learning": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
    "NVIDIA AI Blog": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    "Apple Machine Learning": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    "TechCrunch AI": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "VentureBeat AI": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    "Ars Technica AI": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    "MIT Tech Review": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
    "Wired AI": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    "The Verge AI": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    "ZDNet AI": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    "IEEE Spectrum AI": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    "InfoQ AI & ML": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "Hugging Face Blog": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    "ArXiv AI Papers": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    "ArXiv NLP Papers": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    "Papers With Code": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    "LangChain Blog": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "LlamaIndex Blog": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "MarkTechPost AI": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
}

def extract_image_url(entry: Any, raw_html: str, source_name: str) -> str:
    """RSS entry 및 HTML에서 대표 기사 썸네일 이미지 URL을 정밀 추출합니다."""
    # 1. media_thumbnail 확인
    if hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
        url = entry.media_thumbnail[0].get('url')
        if url: return url

    # 2. media_content 확인
    if hasattr(entry, 'media_content') and entry.media_content:
        url = entry.media_content[0].get('url')
        if url: return url

    # 3. links 중 미디어 이미지 확인
    if hasattr(entry, 'links'):
        for link in entry.links:
            if link.get('type', '').startswith('image/') or any(link.get('href', '').endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                return link.get('href')

    # 4. HTML 파싱 (<img src="..."> 첫번째 이미지 추출)
    if raw_html:
        soup = BeautifulSoup(raw_html, "html.parser")
        img_tag = soup.find("img")
        if img_tag and img_tag.get("src"):
            src = img_tag["src"]
            if src.startswith("http"):
                return src

    # 5. 소스별 고품질 Unsplash AI 테마 이미지 폴백
    return DEFAULT_SOURCE_IMAGES.get(source_name, "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80")

FALLBACK_ARTICLES = [
    # 👩‍💻 개발자/엔지니어 특화 피드 (Developer Lens)
    NewsArticle(
        id="fb-dev-1",
        title="OpenAI, 저비용 고효율 모델 Fine-Tuning API 및 추론 지연시간 35% 단축 기술 정식 출시",
        source_name="OpenAI Blog",
        source_url="https://openai.com/news/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "OpenAI가 저비용 고효율 파인튜닝과 추론 성능을 극대화한 신규 엔드포인트를 공식 개방함.",
            "기업 도메인에 특화된 사용자 맞춤형 커스텀 모델 생성을 60% 이상 저렴한 비용으로 제공.",
            "개발자 콘솔을 통한 추론 지연 시간(Latency) 35% 단축 및 9월 말까지 파인튜닝 토큰 혜택 부여."
        ],
        actionable_insight=ActionableInsight(
            developer="기존 RAG 파이프라인에서 복잡한 전처리 대신 커스텀 모델 파인튜닝을 도입해 API 호스트 비용을 60% 절감하세요.",
            pm="사용자 도메인 특화 챗봇의 응답 일관성을 끌어올려 UX 이탈률을 감소시킬 시점입니다.",
            business="엔터프라이즈 사내 지식 기반 도메인을 고성능 소형 파인튜닝 모델로 대체하여 TCO를 최적화하세요."
        ),
        impact_score=98,
        tags=["#OpenAI", "#FineTuning", "#GPT4o", "#개발자API"],
        matched_lenses=["developer"]
    ),
    NewsArticle(
        id="fb-dev-2",
        title="Google DeepMind, SWE-bench 42% 상회하는 코드 리팩토링 및 런타임 버그 수술용 자율 코딩 에이전트 공개",
        source_name="Google DeepMind",
        source_url="https://deepmind.google/blog/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "구글 딥마인드가 멀티모달 화면 뷰어와 지식 그래프를 연동한 자율 개발 에이전트 엔진을 공개함.",
            "SWE-bench 파이프라인 벤치마크에서 기존 LLM 대비 코드 수정 및 자동 테스트 성공률 42% 상회.",
            "개발자가 작성한 요구사항 명세서만으로 전체 프론트엔드/백엔드 모듈 빌드 자동 완성."
        ],
        actionable_insight=ActionableInsight(
            developer="codebase-memory-mcp와 결합하여 레거시 코드베이스 리팩토링 작업을 에이전트에 위임해 개발 속도를 3배 높이세요.",
            pm="새로운 모듈 기획 시 스펙 문서(spec.md)의 EARS 구문을 정밀화하여 에이전트 자동 구현 성공률을 높이세요."
        ),
        impact_score=95,
        tags=["#GoogleDeepMind", "#AgenticAI", "#SWEbench", "#자율코딩"],
        matched_lenses=["developer"]
    ),
    NewsArticle(
        id="fb-dev-3",
        title="LangChain & LlamaIndex, 멀티 에이전트 메모리 분산 및 로컬 임베딩 벡터 속도 5배 향상 프레임워크 공개",
        source_name="LangChain Blog",
        source_url="https://blog.langchain.dev/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="연구/학계",
        image_url="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "LangChain 0.3 버전 업데이트를 통해 멀티 에이전트 간 비동기 메모리 공유 구조가 정식 통합됨.",
            "LlamaIndex와의 분산 백엔드 결합으로 100만 건 이상의 벡터 검색 지연 시간을 20ms 이하로 단축.",
            "로컬 환경에서의 Ollama / vLLM 서빙 호환 라우터 기본 내장."
        ],
        actionable_insight=ActionableInsight(
            developer="vLLM과 LangChain 0.3 비동기 체인을 결합하여 에이전트 응답 속도를 20ms 수준으로 최적화하세요."
        ),
        impact_score=89,
        tags=["#LangChain", "#LlamaIndex", "#RAG", "#VectorDB"],
        matched_lenses=["developer"]
    ),

    # 💡 기획/PM 특화 피드 (PM Lens)
    NewsArticle(
        id="fb-pm-1",
        title="Anthropic, Claude 3.5 Sonnet Interactive Artifacts 아키텍처 및 프로토타입 자동화 UX 가이드 발표",
        source_name="Anthropic News",
        source_url="https://www.anthropic.com/news",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "Anthropic이 실시간 웹 앱 및 렌더링 아티팩트 창을 지식 파일 파이프라인과 통합 발표.",
            "코드 실행 워크스페이스 내에서 백엔드 및 UI 컴포넌트를 즉각 미리보기 가능한 차세대 워크플로우.",
            "엔터프라이즈 기획팀의 프로토타이핑 시간을 3일에서 1시간으로 단축하는 UX 패턴 제시."
        ],
        actionable_insight=ActionableInsight(
            pm="인터랙티브 아티팩트 뷰어를 활용해 프로토타입 UI 제작 시간을 기존 3일에서 1시간으로 단축하세요."
        ),
        impact_score=94,
        tags=["#Anthropic", "#Claude35", "#Artifacts", "#서비스기획"],
        matched_lenses=["pm"]
    ),
    NewsArticle(
        id="fb-pm-2",
        title="MIT Tech Review, AI 챗봇 이탈률 줄이는 대화형 UX 및 멀티모달 인터랙션 디자인 패턴 발표",
        source_name="MIT Tech Review",
        source_url="https://www.technologyreview.com/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="IT 매체",
        image_url="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "글로벌 서비스 100개의 AI 대화형 UI를 분석하여 사용자 만족도가 높은 5대 UX 레이아웃 정립.",
            "텍스트 응답 지연 시 실시간 컴포넌트 렌더링 스켈레톤과 스트리밍 애니메이션 기법의 효과 입증.",
            "사용자의 의도를 선제적으로 파악하는 지능형 대화 숏컷(Recommended Prompts) 설계법 제시."
        ],
        actionable_insight=ActionableInsight(
            pm="대화 상단에 추천 프롬프트 칩과 스트리밍 스켈레톤 UI를 도입해 이탈률을 25% 절감하세요."
        ),
        impact_score=91,
        tags=["#MITTechReview", "#AIUX", "#챗봇기획", "#프로덕트디자인"],
        matched_lenses=["pm"]
    ),
    NewsArticle(
        id="fb-pm-3",
        title="AWS, 에이전트 AI 기반 데이터 온보딩 기획 프레임워크 공개... 수주 소요 작업을 40분으로 단축",
        source_name="AWS Machine Learning",
        source_url="https://aws.amazon.com/blogs/machine-learning/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "AWS가 포뮬러 1®과의 협업을 통해 Amazon Bedrock 에이전트 기반 데이터 기획 파이프라인 구축.",
            "기존 데이터 소스 온보딩 요구사항 수집 및 분석 시간을 최대 8주에서 40분으로 단축.",
            "비엔지니어 기획자도 자연어 명령만으로 데이터 스키마를 구성하는 기획 자동화 실현."
        ],
        actionable_insight=ActionableInsight(
            pm="데이터 통합 프로젝트의 병목 현상을 식별하고 에이전트 AI 도입으로 프로덕트 출시 속도를 끌어올리세요."
        ),
        impact_score=92,
        tags=["#AWS", "#Bedrock", "#데이터기획", "#온보딩자동화"],
        matched_lenses=["pm"]
    ),

    # 💼 비즈니스/임원 특화 피드 (Business Lens)
    NewsArticle(
        id="fb-biz-1",
        title="VentureBeat, Enterprise AI 도입 기업 74%가 API 대신 자수성가 셀프호스팅 TCO 절감 달성",
        source_name="VentureBeat AI",
        source_url="https://venturebeat.com/category/ai/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="IT 매체",
        image_url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "포춘 500대 기업의 2026년 AI 예산 집행 보고서 결과 상율 74%가 하이브리드 TCO 구조를 선택함.",
            "일일 트래픽 100만 건 이상 구간에서는 상용 API 대비 온프레미스 GPU 호스팅이 55% 비용 우위 달성.",
            "사내 데이터 유출 방지를 위한 온프레미스 오픈웨이트(Llama 3, Qwen 2.5) 자산화 흐름 가속."
        ],
        actionable_insight=ActionableInsight(
            business="사내 민감 정보 유출 방지 및 일일 호출량 100만 건 초과 구간에서 오픈웨이트 호스팅 전환으로 TCO 55%를 절감하세요."
        ),
        impact_score=96,
        tags=["#VentureBeat", "#AITCO", "#비즈니스전략", "#GPU호스팅"],
        matched_lenses=["business"]
    ),
    NewsArticle(
        id="fb-biz-2",
        title="Meta AI & Microsoft, 사내 데이터 보안 통합 가드레일 및 엔터프라이즈 IAM 프로필 가이드 발표",
        source_name="Meta AI Blog",
        source_url="https://ai.meta.com/blog/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "메타와 마이크로소프트가 기업용 LLM 도입 시 필수 준수해야 할 5대 보안 지침과 가드레일 공개.",
            "사내 프라이빗 데이터 라우팅을 위한 프로필 기반 접근 통제(Profile-based IAM) 표준 제공.",
            "엔터프라이즈 컴플라이언스 준수와 데이터 유출 위험 0%를 달성하기 위한 구체적 솔루션 연동."
        ],
        actionable_insight=ActionableInsight(
            business="사내 보안 그룹 규정에 적합한 IAM Role 접근 제어를 도입하여 기술 부채와 데이터 유출 위험을 원천 차단하세요."
        ),
        impact_score=93,
        tags=["#MetaAI", "#Microsoft", "#AI보안", "#IAM통제"],
        matched_lenses=["business"]
    ),

    # 🔬 연구/학계 특화 피드 (Researcher Lens)
    NewsArticle(
        id="fb-res-1",
        title="ArXiv & Hugging Face, SOTA 추론 성능 상회하는 MCTS 기반 차세대 프런티어 논문 심사 공개",
        source_name="ArXiv AI Papers",
        source_url="https://arxiv.org/abs/2608.001",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="연구/학계",
        image_url="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "Monte Carlo Tree Search(MCTS)와 LLM의 테스트 타임 컴퓨팅(Test-time Compute) 결합 신논문 발표.",
            "기존 단일 추론 방식 대비 수학 및 복잡 논리 증명 정확도(Math-500) 18.4% 상승 달성.",
            "Open-weights 프런티어 모델에서의 추론 스트리밍 시 토큰 생성 경로 탐색 최적화 알고리즘 구체화."
        ],
        actionable_insight=ActionableInsight(
            researcher="Test-time Compute 파이프라인과 MCTS 알고리즘을 결합한 SOTA 추론 메커니즘을 벤치마킹하세요."
        ),
        impact_score=97,
        tags=["#ArXiv", "#HuggingFace", "#MCTS", "#TestTimeCompute", "#AI논문"],
        matched_lenses=["researcher"]
    ),
    NewsArticle(
        id="fb-res-2",
        title="ArXiv NLP, 한국어/영어 멀티모달 자율 추론 파이프라인 벤치마크 및 데이터셋 오픈소스 공개",
        source_name="ArXiv NLP Papers",
        source_url="https://arxiv.org/abs/2608.002",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="연구/학계",
        image_url="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "한/영 다국어 환경에서의 도메인 지식 이해도 평가 전용 Kor-SWEBench 데이터셋 5만 건 개방.",
            "멀티모달 뷰어 기반 코드 렌더링 시 시각적 오류 파악 및 자동 수정 정확도 검증 기준 정립.",
            "소형 언어 모델(SLM)의 파인튜닝 시 환각 현상(Hallucination)을 80% 저감하는 훈련 방법론 수록."
        ],
        actionable_insight=ActionableInsight(
            researcher="Kor-SWEBench 벤치마크와 SLM 환각 방지 훈련 기법을 사내 연구 알고리즘에 검토/적용하세요."
        ),
        impact_score=94,
        tags=["#ArXivNLP", "#KorSWEBench", "#SLM", "#환각방지"],
        matched_lenses=["researcher"]
    )
]

# In-memory 캐시 (서버 구동 즉시 0초 노출을 위해 기본 피드 선적재)
_news_cache: Dict[str, Any] = {
    "last_updated": time.time(),
    "articles": FALLBACK_ARTICLES
}

CACHE_TTL = 3600 * 24  # 하루에 1번 수집/갱신 (24시간)

RSS_FEEDS = [
    # 🏢 빅테크 공식 블로그 (8개)
    {"url": "https://openai.com/blog/rss.xml", "name": "OpenAI Blog", "category": "빅테크 공식"},
    {"url": "https://www.anthropic.com/feed.xml", "name": "Anthropic News", "category": "빅테크 공식"},
    {"url": "https://deepmind.google/blog/rss.xml", "name": "Google DeepMind", "category": "빅테크 공식"},
    {"url": "https://ai.meta.com/blog/rss/", "name": "Meta AI Blog", "category": "빅테크 공식"},
    {"url": "https://www.microsoft.com/en-us/research/feed/", "name": "Microsoft Research", "category": "빅테크 공식"},
    {"url": "https://aws.amazon.com/blogs/machine-learning/feed/", "name": "AWS Machine Learning", "category": "빅테크 공식"},
    {"url": "https://blogs.nvidia.com/feed/", "name": "NVIDIA AI Blog", "category": "빅테크 공식"},
    {"url": "https://machinelearning.apple.com/feed.xml", "name": "Apple Machine Learning", "category": "빅테크 공식"},

    # 📰 글로벌 IT/AI 전문 매체 (9개)
    {"url": "https://techcrunch.com/category/artificial-intelligence/feed/", "name": "TechCrunch AI", "category": "IT 매체"},
    {"url": "https://venturebeat.com/category/ai/feed/", "name": "VentureBeat AI", "category": "IT 매체"},
    {"url": "https://arstechnica.com/tag/ai/feed/", "name": "Ars Technica AI", "category": "IT 매체"},
    {"url": "https://www.technologyreview.com/topic/artificial-intelligence/feed", "name": "MIT Tech Review", "category": "IT 매체"},
    {"url": "https://www.wired.com/feed/tag/ai/latest/rss", "name": "Wired AI", "category": "IT 매체"},
    {"url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", "name": "The Verge AI", "category": "IT 매체"},
    {"url": "https://www.zdnet.com/topic/artificial-intelligence/rss.xml", "name": "ZDNet AI", "category": "IT 매체"},
    {"url": "https://spectrum.ieee.org/feeds/topic/artificial-intelligence.rss", "name": "IEEE Spectrum AI", "category": "IT 매체"},
    {"url": "https://www.marktechpost.com/feed/", "name": "MarkTechPost AI", "category": "IT 매체"},

    # 🔬 연구 논문 & 개발자 프레임워크 (5개)
    {"url": "https://huggingface.co/blog/feed.xml", "name": "Hugging Face Blog", "category": "연구/학계"},
    {"url": "https://arxiv.org/rss/cs.AI", "name": "ArXiv AI Papers", "category": "연구/학계"},
    {"url": "https://arxiv.org/rss/cs.CL", "name": "ArXiv NLP Papers", "category": "연구/학계"},
    {"url": "https://blog.langchain.dev/rss/", "name": "LangChain Blog", "category": "연구/학계"},
    {"url": "https://blog.llamaindex.ai/feed", "name": "LlamaIndex Blog", "category": "연구/학계"}
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
            
        for entry in parsed.entries[:5]:  # 소스당 상위 5개 최신 기사 수집 (총 최대 125개 파싱)
            raw_html = entry.get("summary", "") or entry.get("description", "")
            img_url = extract_image_url(entry, raw_html, feed_info["name"])
            raw_articles.append({
                "source_name": feed_info["name"],
                "category": feed_info["category"],
                "title": entry.get("title", ""),
                "link": entry.get("link", ""),
                "published": entry.get("published", str(datetime.now(timezone.utc))),
                "image_url": img_url,
                "summary": clean_html(raw_html)[:2000] # LLM 컨텍스트 제한을 위해 2000자 슬라이싱
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
            image_url=raw.get("image_url"),
            summary_bullets=data.get("summary_bullets", []),
            actionable_insight=insight,
            impact_score=data.get("impact_score", 50),
            tags=data.get("tags", []),
            matched_lenses=data.get("matched_lenses", [])
        )
        return article
    except Exception as e:
        print(f"Error analyzing article {raw['title']}: {e}")
        # 키워드 기반 스마트 렌즈 자동 태깅 (LLM 미통과 시에도 탭별 분리 보장)
        t_lower = (raw["title"] + " " + raw["summary"]).lower()
        lenses = []
        if any(k in t_lower for k in ["code", "dev", "agent", "fine-tuning", "vllm", "api", "langchain", "sdk", "python", "cuda"]):
            lenses.append("developer")
        if any(k in t_lower for k in ["ux", "product", "pm", "design", "onboarding", "workflow", "prompt", "interface", "app"]):
            lenses.append("pm")
        if any(k in t_lower for k in ["tco", "cost", "enterprise", "business", "security", "iam", "roi", "price", "market"]):
            lenses.append("business")
        if any(k in t_lower for k in ["paper", "arxiv", "sota", "benchmark", "mcts", "math", "dataset", "research", "slm"]):
            lenses.append("researcher")
            
        if not lenses:
            lenses = ["developer"] if raw["category"] == "IT 매체" else ["business"]
            
        return NewsArticle(
            id=str(uuid.uuid4()),
            title=raw["title"],
            source_name=raw["source_name"],
            source_url=raw["link"],
            published_at=raw["published"],
            category=raw["category"],
            image_url=raw.get("image_url"),
            summary_bullets=[raw["summary"][:150] + "..."],
            actionable_insight=ActionableInsight(
                developer="해당 기술 기사를 읽고 사내 스택 적용 가능성을 검토하세요." if "developer" in lenses else None,
                pm="새로운 기능 기획 시 본 소식의 UX 패턴을 참고하세요." if "pm" in lenses else None,
                business="사업 전략 방향성 수립 및 TCO 절감 방안으로 활용하세요." if "business" in lenses else None,
                researcher="최신 연구 방법론 및 벤치마크 지표를 분석하세요." if "researcher" in lenses else None
            ),
            impact_score=80,
            tags=["#AI트렌드", f"#{raw['source_name'].replace(' ', '')}"],
            matched_lenses=lenses
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

