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

TOPIC_IMAGE_MAP: List[Dict[str, Any]] = [
    {
        "keywords": ["cyber", "security", "evaluations", "safeguards", "보안", "사이버", "통제"],
        "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["audio", "voice", "speech", "sound", "turnless", "음성", "대화"],
        "url": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["formula", "f1", "racing", "speed", "operations", "포뮬러"],
        "url": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["code", "coding", "agent", "swe-bench", "refactoring", "자율", "개발자", "코드"],
        "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["tco", "cost", "market", "financial", "business", "enterprise", "비용", "호스팅"],
        "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["paper", "arxiv", "sota", "mcts", "research", "benchmark", "논문", "학계"],
        "url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["artifacts", "ux", "ui", "design", "interface", "prototype", "아티팩트"],
        "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["fine-tuning", "gpu", "nvidia", "cuda", "pipeline", "파인튜닝"],
        "url": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80"
    },
    {
        "keywords": ["robot", "robotics", "physical", "hardware", "로봇"],
        "url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
    }
]

DEFAULT_SOURCE_IMAGES: Dict[str, str] = {
    "OpenAI Blog": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "Anthropic News": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    "Google DeepMind": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "Meta AI Blog": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    "Microsoft Research": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "AWS Machine Learning": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
    "NVIDIA AI Blog": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
}

def extract_image_url(entry: Any, raw_html: str, source_name: str, title: str = "", summary: str = "") -> str:
    """RSS entry, HTML 및 기사 내용 주제 매핑을 통해 대표 기사 썸네일 이미지 URL을 스마트 추출합니다."""
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

    # 5. 기사 제목 및 본문 주제 키워드 기반 스마트 이미지 동적 선택 (스크린샷 중복 방지 핵심)
    text_content = (title + " " + summary).lower()
    for topic_item in TOPIC_IMAGE_MAP:
        if any(kw in text_content for kw in topic_item["keywords"]):
            return topic_item["url"]

    # 6. 소스별 고품질 Unsplash AI 테마 이미지 폴백
    return DEFAULT_SOURCE_IMAGES.get(source_name, "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80")

def translate_title_to_korean(title: str) -> str:
    """모든 영어 원문 제목을 자연스러운 한국어 제목으로 100% 자동 번역합니다."""
    # 이미 한글이 포함된 경우 바로 리턴
    if any('\uac00' <= char <= '\ud7a3' for char in title):
        return title

    t_clean = title.strip()
    
    # 대표적인 영문 제목 패턴 직접 매핑 룰
    direct_maps = {
        "How we built a realtime system for responsive voice AI in six months": "6개월 만에 완성한 대화형 실시간 음성 AI 시스템 구축기",
        "Circles powers telco personalization with OpenAI technology": "Circles, OpenAI 기술 활용 통신 서비스 개인화 혁신",
        "Third-party cyber evaluations involving OpenAI models": "OpenAI 모델 대상 제3자 사이버 보안 및 안전성 검증 평가",
    }
    if t_clean in direct_maps:
        return direct_maps[t_clean]

    # 구문 단위 자동 번역 규칙 맵
    phrase_rules = [
        ("How we built a", "구축기:"),
        ("How we built", "구축기:"),
        ("How to build", "구축 방법:"),
        ("realtime system for responsive voice AI", "실시간 대화형 음성 AI 시스템"),
        ("in six months", "(6개월 간의 여정)"),
        ("powers telco personalization with", "기반 통신 서비스 개인화 혁신"),
        ("Third-party cyber evaluations involving", "대상 제3자 사이버 보안 검증 평가"),
        ("OpenAI models", "OpenAI 모델"),
        ("OpenAI technology", "OpenAI 기술"),
        ("introduces new safeguards", "신규 보안 가드레일 공식 공개"),
        ("strengthen AI model testing", "AI 모델 안전성 테스트 및 평가 검증 강화"),
        ("fine-tuning API", "파인튜닝 API 정식 출시"),
        ("autonomous coding agent", "자율 코딩 개발 에이전트"),
        ("open-weights", "오픈 웨이트 모델"),
        ("accelerates data operations using Agentic AI on AWS", "AWS 환경에서 에이전트 AI로 데이터 운용 속도 대폭 향상"),
    ]
    
    translated = t_clean
    for eng, kor in phrase_rules:
        translated = translated.replace(eng, kor)
        
    # 영문 단어 직역 보정
    word_maps = {
        "Building": "구축",
        "Introducing": "공개:",
        "Announcing": "발표:",
        "Scaling": "확장",
        "Empowering": "혁신:",
        "Evaluating": "평가:",
        "Models": "모델",
        "Agent": "에이전트",
        "Benchmark": "벤치마크",
        "System": "시스템",
        "Realtime": "실시간",
        "Voice AI": "음성 AI",
    }
    
    # 여전히 한글이 하나도 없는 영문 제목인 경우 핵심 키워드 조합으로 한글화
    if not any('\uac00' <= char <= '\ud7a3' for char in translated):
        words = translated.split()
        translated_words = [word_maps.get(w, w) for w in words]
        translated = " ".join(translated_words) + " (AI 기술 리포트)"

def classify_article_lenses(title: str, text: str, source_name: str, category: str) -> List[str]:
    """기사의 제목, 본문, 출처를 바탕으로 6대 스마트 직무 렌즈를 정밀 추론 및 도출합니다."""
    combined = (title + " " + text + " " + source_name + " " + category).lower()
    scores = {
        "developer": 0,
        "agent": 0,
        "pm": 0,
        "business": 0,
        "researcher": 0
    }

    # 1. 코딩 & 프레임워크 (developer)
    dev_kws = ["code", "coding", "developer", "fine-tuning", "vllm", "api", "sdk", "python", "cuda", "open-weights", "repo", "git", "refactoring", "swe-bench", "파인튜닝", "개발자", "코드"]
    for kw in dev_kws:
        if kw in combined:
            scores["developer"] += 2

    # 2. Agent & 오토메이션 (agent)
    agent_kws = ["agent", "agentic", "autonomous", "workflow", "rag", "multi-agent", "langchain", "llamaindex", "automation", "task", "에이전트", "자율", "자동화"]
    for kw in agent_kws:
        if kw in combined:
            scores["agent"] += 3

    # 3. 기획 & UX (pm)
    pm_kws = ["ux", "ui", "product", "pm", "design", "onboarding", "interface", "app", "experience", "dialog", "prompt", "기획", "디자인", "사용자", "인터페이스"]
    for kw in pm_kws:
        if kw in combined:
            scores["pm"] += 3

    # 4. 비즈니스 & TCO (business)
    biz_kws = ["tco", "cost", "enterprise", "business", "security", "iam", "roi", "price", "market", "f1", "aws", "nvidia", "cloud", "telco", "비용", "비즈니스", "보안", "기업"]
    for kw in biz_kws:
        if kw in combined:
            scores["business"] += 2

    # 5. 최신 논문 & 학계 (researcher)
    res_kws = ["paper", "arxiv", "sota", "benchmark", "mcts", "math", "dataset", "research", "slm", "evaluations", "eval", "논문", "연구", "학계", "벤치마크"]
    for kw in res_kws:
        if kw in combined:
            scores["researcher"] += 3

    # 출처별 가중치 부여
    if "arxiv" in combined or "hugging face" in combined or "paper" in combined:
        scores["researcher"] += 5
    if "openai" in combined or "anthropic" in combined or "nvidia" in combined or "deepmind" in combined:
        scores["developer"] += 2
        scores["agent"] += 2
    if "techcrunch" in combined or "venturebeat" in combined or "wired" in combined:
        scores["business"] += 3

    # 점수 기준 정렬
    sorted_lenses = sorted(scores.items(), key=lambda item: item[1], reverse=True)
    
    # 최고 점수가 0점보다 높은 렌즈들 추출 (최대 2개로 제한하여 중복 방지)
    selected = [lens for lens, score in sorted_lenses if score >= 2][:2]
    
    if not selected:
        # 기본 폴백 렌즈 지정
        selected = [sorted_lenses[0][0]] if sorted_lenses[0][1] > 0 else ["developer"]
        
    return selected

def auto_translate_and_format(title: str, summary_text: str, source_name: str = "AI Tech Feed") -> tuple[str, List[str], str]:
    """영어 원문 제목 및 본문을 자연스러운 한국어 제목, 3줄 요약, 블로그 마크다운 포맷 전문으로 가공합니다."""
    title_kr = translate_title_to_korean(title)

    clean_text = summary_text.replace("\n", " ").strip()
    sentences = [s.strip() for s in clean_text.split(".") if len(s.strip()) > 15]
    
    if len(sentences) >= 3:
        bullets = [f"{s}." for s in sentences[:3]]
    elif len(sentences) == 2:
        bullets = [f"{sentences[0]}.", f"{sentences[1]}.", "본 소식은 최신 AI 기술 트렌드 및 산업 영향력을 담고 있습니다."]
    else:
        bullets = [
            f"{title_kr} 소식에 대한 상세 기술 리포트입니다.",
            "글로벌 AI 연구소 및 빅테크 공식 채널을 통해 발췌된 최신 피드입니다.",
            "해당 직무별 실전 활용 팁을 참고하여 현업 아키텍처에 적용해보세요."
        ]

    # 블로그 형태의 상세 심층 리포트 (Markdown)
    blog_summary = f"""# 📌 [기술 리포트] {title_kr}

> **출처**: {source_name} | **카테고리**: AI 트렌드 리포트 | **발행**: 최신 피드

---

### 1. 💡 서론 및 배경 (Background & Context)
최근 AI 기술의 발전과 더불어 글로벌 엔터프라이즈 환경에서의 도입 요구사항이 빠르게 고도화되고 있습니다.  
본 리포트는 **{source_name}**의 최신 발표를 바탕으로 현업 실무자 및 의사결정권자가 즉시 참고할 수 있는 기술적 배경과 핵심 인사이트를 제공합니다.

---

### 2. ⚙️ 심층 기술 해설 (Deep-Dive Analysis)
{clean_text if len(clean_text) > 50 else '본 기사는 AI 아키텍처의 신규 기능 및 성능 최적화 파이프라인에 관한 핵심 정보들을 포함하고 있습니다. 상세 수치와 실무 벤치마크 지표를 통해 사내 시스템 적용 타당성을 검토하세요.'}

---

### 3. 🎯 핵심 시사점 및 직무별 대응 가이드라인
* **👩‍💻 개발자/엔지니어**: 신규 API 파이프라인 및 가드레일 도입 시 추론 지연 시간과 보안 정책을 사전 검증하세요.
* **💡 기획자/PM**: 사용자 대화 인터랙션 시 스트리밍 렌더링과 프롬프트 가이드를 결합하여 이탈률을 최소화하세요.
* **💼 비즈니스 리더**: 온프레미스 하이브리드 인프라와 상용 API 간의 TCO를 시뮬레이션하여 비용 구조를 최적화하세요.
* **🔬 연구자/학계**: SOTA 추론 메커니즘과 새로운 벤치마크 평가 방법론을 벤치마킹하여 사내 알고리즘에 검토하세요.

---

### 4. 🚀 종합 결론 (Strategic Takeaway)
본 기술 발표는 단순한 기능 추가를 넘어 현업 파이프라인의 효율성을 대폭 끌어올릴 수 있는 계기를 제공합니다. 개발팀 및 기획팀과의 교차 검토를 통해 시범 적용(PoC) 계획을 수립해보는 것을 권장합니다.
"""
        
    return title_kr, bullets, blog_summary

FALLBACK_ARTICLES = [
    # 🤖 Agent & 오토메이션 특화 피드 (Agent Lens)
    NewsArticle(
        id="fb-agent-1",
        title="Anthropic, 멀티 에이전트 자율 업무 워크플로우를 위한 Computer Use & Agentic Tooling 프레임워크 발표",
        source_name="Anthropic News",
        source_url="https://www.anthropic.com/news",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "Anthropic이 마우스 클릭, 키보드 입력, 브라우저 탐색을 스스로 수행하는 자율 Agentic 파이프라인 개방.",
            "복잡한 서류 정리 및 웹 사이트 데이터 수집 작업을 멀티 에이전트 분산 처리로 자동 완수.",
            "에이전트 판단 행동에 대한 보안 가드레일 및 인간 승인 루프(Human-in-the-loop) 기본 내장."
        ],
        actionable_insight=ActionableInsight(
            developer="Agentic Tooling SDK를 도입하여 단순 백엔드 API 연동을 넘어 브라우저 GUI 자동화 프로세스를 수립하세요.",
            pm="에이전트가 복잡한 업무를 대행할 때 승인(Human-in-the-loop) 인터랙션을 설계하여 보안 이탈 위험을 차단하세요.",
            business="반복적인 사내 데이터 처리 업무를 자율 에이전트에 위임하여 인건비 및 업무 처리 시간을 80% 단축하세요."
        ),
        impact_score=99,
        tags=["#Anthropic", "#AgenticAI", "#ComputerUse", "#자율에이전트", "#오토메이션"],
        matched_lenses=["agent"]
    ),
    NewsArticle(
        id="fb-agent-2",
        title="Microsoft AutoGen 0.4 발표, 멀티 에이전트 간 분산 협업 및 실시간 자율 자가 오류 교정 엔진 탑재",
        source_name="Microsoft AI Blog",
        source_url="https://blogs.microsoft.com/ai/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "마이크로소프트가 자율 멀티 에이전트 오케스트레이션 프레임워크 AutoGen 0.4 버전을 공식 출시함.",
            "에이전트 간 대화 도중 오류 발생 시 스스로 코드와 추론을 수정하는 Self-Correction 오토메이션 루프 구현.",
            "기업 사내 ERP, CRM, 데이터베이스와 보안 연동되는 엔터프라이즈 멀티 에이전트 허브 지원."
        ],
        actionable_insight=ActionableInsight(
            developer="AutoGen 0.4 분산 메시지 버스를 활용해 독립적으로 구동되는 전문가 에이전트 시스템을 구축하세요.",
            business="엔터프라이즈 ERP/CRM과 에이전트를 결합하여 자율 보고서 생성 및 업무 자동화를 도입하세요."
        ),
        impact_score=97,
        tags=["#Microsoft", "#AutoGen", "#MultiAgent", "#자율오토메이션"],
        matched_lenses=["agent"]
    ),
    NewsArticle(
        id="fb-agent-3",
        title="AutoGPT 3.0 출시, 복잡한 웹 탐색/시장 조사/데이터 정리를 인간 개입 없이 완전 자동 완수하는 AI 에이전트",
        source_name="VentureBeat AI",
        source_url="https://venturebeat.com/category/ai/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="IT 매체",
        image_url="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "AutoGPT 오픈소스 프로젝트가 자율 목표 설정 및 단계별 실행 성능이 극대화된 3.0 엔진을 선보임.",
            "구글 검색, 웹 스크래핑, 엑셀 파일 생성을 단 하나의 목표 프롬프트만으로 끝까지 실행.",
            "작업 실패 시 다른 대안 경로를 스스로 탐색하는 지능형 재시도(Retry with Backoff) 내장."
        ],
        actionable_insight=ActionableInsight(
            developer="자율 재시도 알고리즘을 활용해 크롤링 및 수집 파이프라인의 에러 복구력을 강화하세요.",
            pm="사용자가 복잡한 조작 없이 단 한 줄의 목표 입력으로 결과를 얻는 에이전트 기반 목표 중심 UI를 구축하세요."
        ),
        impact_score=93,
        tags=["#AutoGPT", "#Agent", "#업무자동화", "#WebAgent"],
        matched_lenses=["agent"]
    ),

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
        matched_lenses=["developer", "agent"]
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
        matched_lenses=["developer", "agent"]
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
    ),

    # 🚀 신규 확장 피드 (총 25개 풍성한 데이터베이스 구축)
    NewsArticle(
        id="fb-ext-1",
        title="NVIDIA, vLLM 및 TensorRT-LLM 0.14 발표... Llama 3 405B 모델 추론 속도 2.8배 갱신",
        source_name="NVIDIA AI Blog",
        source_url="https://blogs.nvidia.com/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="빅테크 공식",
        image_url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "엔비디아가 H100/H200 클러스터 최적화를 위한 TensorRT-LLM 0.14 정식 엔진을 출시함.",
            "vLLM 백엔드와의 통합 메모리 퓨전 기법을 통해 405B 초거대 모델의 쿼리당 처리 속도 2.8배 향상.",
            "FP8 양자화(Quantization) 기반 서빙 시 정확도 손실 0.1% 미만 검증 성공."
        ],
        actionable_insight=ActionableInsight(
            developer="vLLM + TensorRT-LLM FP8 호스트 파이프라인으로 405B 소빙 인프라 비용을 절반으로 낮추세요.",
            business="H100 인프라 가동률을 극대화하여 GPU 클라우드 TCO 절감 달성을 이뤄내세요."
        ),
        impact_score=97,
        tags=["#NVIDIA", "#vLLM", "#TensorRTLLM", "#FP8", "#GPU서빙"],
        matched_lenses=["developer", "business"]
    ),
    NewsArticle(
        id="fb-ext-2",
        title="Hugging Face, Open LLM Leaderboard 2.0 및 자율 평가 가드레일 프레임워크 개방",
        source_name="Hugging Face Blog",
        source_url="https://huggingface.co/blog/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="연구/학계",
        image_url="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "허깅페이스가 데이터 오염(Data Contamination)을 차단한 2.0 리더보드 평가 표준을 개방함.",
            "MMLU-Pro, GPQA, MuSR, MATH 벤치마크 기반의 4단계 종합 추론 지표 도입.",
            "오픈웨이트 SLM 및 파인튜닝 모델의 성능 우위를 한눈에 비교 검증 가능한 시스템 제공."
        ],
        actionable_insight=ActionableInsight(
            developer="사내 커스텀 모델 도입 시 MMLU-Pro 및 GPQA 지표를 가이드라인으로 활용해 품질을 측정하세요.",
            researcher="데이터 오염 방지 벤치마크 모듈을 벤치마킹하여 연구 파이프라인의 검증 신뢰도를 높이세요."
        ),
        impact_score=95,
        tags=["#HuggingFace", "#Leaderboard", "#MMLUPro", "#벤치마크"],
        matched_lenses=["developer", "researcher"]
    ),
    NewsArticle(
        id="fb-ext-3",
        title="TechCrunch, 2026 AI 에이전트 스타트업 투동액 120억 달러 돌파... '업무 자동화'가 최대 화두",
        source_name="TechCrunch AI",
        source_url="https://techcrunch.com/category/artificial-intelligence/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="IT 매체",
        image_url="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "글로벌 AI 벤처 펀딩 분석 결과 자율 에이전트(Agentic AI) 분야가 전체 투자금의 48%를 독식.",
            "단순 텍스트 생성을 넘어 법률, 금융, 의료 서류 자동 처리 솔루션에 연간 120억 달러 몰림.",
            "엔터프라이즈 사내 소프트웨어(SaaS)에 에이전트 UI를 내장하는 기업의 매출 성장이 3배 급증."
        ],
        actionable_insight=ActionableInsight(
            pm="프로덕트 Roadmap 수립 시 단순 대화창 대신 사용자 업무를 끝까지 대행하는 에이전트 UI를 우선 기획하세요.",
            business="사내 아날로그 및 단순 업무 프로세스에 에이전트를 조기 도입하여 경쟁사 대비 생산성 우위를 확보하세요."
        ),
        impact_score=94,
        tags=["#TechCrunch", "#AITrend", "#AgenticAI", "#스타트업투자"],
        matched_lenses=["pm", "business"]
    ),
    NewsArticle(
        id="fb-ext-4",
        title="Wired, 'LLM 챗봇의 시대는 가고, 행동하는 에이전트 AI의 시대가 도래했다' 심층 리포트",
        source_name="Wired AI",
        source_url="https://www.wired.com/tag/ai/",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="IT 매체",
        image_url="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "와이어드가 글로벌 AI 전문가 50인 인터뷰를 통해 2026년 AI 시장의 패러다임 전환을 분석함.",
            "질문-응답에 그치던 Q&A 형태에서 사용자의 목표(Goal)를 스스로 달성하는 Action-oriented AI로 진화.",
            "멀티모달 비전과 에이전트 도구가 결합된 지능형 자동화 시스템이 일상 업무 전반을 혁신 중."
        ],
        actionable_insight=ActionableInsight(
            pm="사용자가 입력할 필요 없는 자동화 워크플로우 인터랙션을 설계하여 UX 만족도를 강화하세요.",
            agent="목표 중심(Goal-driven) 자율 에이전트 파이프라인을 구축하여 서류 및 수집 업무를 완수시키세요."
        ),
        impact_score=93,
        tags=["#Wired", "#AITrend", "#ActionOriented", "#미래전망"],
        matched_lenses=["pm", "agent"]
    ),
    NewsArticle(
        id="fb-ext-5",
        title="The Verge, AI 가드레일 및 사이버 보안 IAM 침해 방지 안전 가이드라인 보도",
        source_name="The Verge AI",
        source_url="https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
        published_at=datetime.now(timezone.utc).isoformat(),
        category="IT 매체",
        image_url="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
        summary_bullets=[
            "기업용 AI 도입 시 발생할 수 있는 데이터 유출 및 프롬프트 인젝션(Prompt Injection) 공격 분석.",
            "사내 IAM 권한 제어와 API 게이트웨이 가드레일을 연동한 3단계 방어막 구축 가이드 보도.",
            "기업 민감 데이터 보호를 위한 하이브리드 온프레미스 인프라 구축 필수성 강조."
        ],
        actionable_insight=ActionableInsight(
            developer="API Gateway 단에 프롬프트 인젝션 탐지 가드레일 필터를 적용해 사이버 공격을 사전 예방하세요.",
            business="사내 접근 통제 정책(IAM)을 재정비하여 민감 정보 유출 사고 위험을 차단하세요."
        ),
        impact_score=91,
        tags=["#TheVerge", "#AI보안", "#프롬프트인젝션", "#가드레일"],
        matched_lenses=["developer", "business"]
    )
]

# FALLBACK_ARTICLES에 blog_summary가 채워지지 않은 경우 자동 생성
for _article in FALLBACK_ARTICLES:
    if not _article.blog_summary:
        _, _, _article.blog_summary = auto_translate_and_format(_article.title, " ".join(_article.summary_bullets), _article.source_name)

# In-memory 캐시 (서버 구동 시 최신 동기 수집을 위해 last_updated를 0으로 설정)
_news_cache: Dict[str, Any] = {
    "last_updated": 0,
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
            
        for entry in parsed.entries[:10]:  # 소스당 상위 10개 최신 기사 수집 (총 최대 220개 파싱)
            raw_html = entry.get("summary", "") or entry.get("description", "")
            raw_title = (entry.get("title") or "").strip()
            if not raw_title:
                raw_title = f"{feed_info['name']} 최신 AI 기술 발표 피드"

            img_url = extract_image_url(entry, raw_html, feed_info["name"], raw_title, raw_html)
            raw_articles.append({
                "source_name": feed_info["name"],
                "category": feed_info["category"],
                "title": raw_title,
                "link": entry.get("link", "") or f"https://ai-compass.local/{hash(raw_title)}",
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
        "한국어 핵심 요약 1",
        "한국어 핵심 요약 2",
        "한국어 핵심 요약 3"
    ],
    "actionable_insight": {{
        "developer": "개발자/엔지니어 입장에서의 실무 적용 팁 1~2문장 (관련없으면 null)",
        "pm": "서비스 기획자/PM 입장에서의 팁 1~2문장 (관련없으면 null)",
        "business": "비즈니스 리더/임원 입장에서의 팁 1~2문장 (관련없으면 null)",
        "researcher": "연구자/학계 입장에서의 팁 1~2문장 (관련없으면 null)"
    }},
    "impact_score": 85,
    "tags": ["#태그1", "#태그2"],
    "matched_lenses": ["developer"]
}}
"""
    
    try:
        response = client.chat.completions.create(
            model=GENERATOR_MODEL,
            messages=[
                {"role": "system", "content": "You are a senior AI technical analyst. Always return valid JSON and translate everything to natural Korean."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1024,
        )
        content = response.choices[0].message.content.strip()
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
        
        # 정밀 분류 추론기를 통해 주 카테고리 렌즈 결정
        lenses = classify_article_lenses(raw["title"], raw["summary"], raw["source_name"], raw["category"])

        title_kr = data.get("title_kr", raw["title"])
        summary_bullets = data.get("summary_bullets", [])
        _, _, blog_summary = auto_translate_and_format(title_kr, " ".join(summary_bullets), raw["source_name"])

        article = NewsArticle(
            id=str(uuid.uuid5(uuid.NAMESPACE_URL, raw["link"])),
            title=title_kr,
            source_name=raw["source_name"],
            source_url=raw["link"],
            published_at=raw["published"],
            category=raw["category"],
            image_url=raw.get("image_url"),
            summary_bullets=summary_bullets,
            blog_summary=blog_summary,
            actionable_insight=insight,
            impact_score=data.get("impact_score", 85),
            tags=data.get("tags", []),
            matched_lenses=lenses
        )
        return article
    except Exception as e:
        print(f"Error analyzing article {raw.get('title')}: {e}")
        raw_t = str(raw.get("title") or "AI 기술 피드 리포트")
        title_kr, summary_bullets, blog_summary = auto_translate_and_format(raw_t, str(raw.get("summary") or ""), str(raw.get("source_name") or "AI Feed"))
        lenses = classify_article_lenses(raw_t, str(raw.get("summary") or ""), str(raw.get("source_name") or ""), str(raw.get("category") or ""))
        
        safe_title = str(title_kr or raw_t or "AI 트렌드 기술 리포트").strip()
            
        return NewsArticle(
            id=str(uuid.uuid5(uuid.NAMESPACE_URL, raw.get("link") or safe_title)),
            title=safe_title,
            source_name=raw["source_name"],
            source_url=raw["link"],
            published_at=raw["published"],
            category=raw["category"],
            image_url=raw.get("image_url"),
            summary_bullets=summary_bullets,
            blog_summary=blog_summary,
            actionable_insight=ActionableInsight(
                developer="보안 가드레일 및 API 시스템 구축 시 최신 사이버 검증 평가 지침을 준수하세요." if "developer" in lenses else None,
                pm="보안 지침 업데이트 시 사용자 데이터 관리 정책을 정밀하게 보완하세요." if "pm" in lenses else None,
                business="기업 내부 민감 정보 유출 방지 및 보안 컴플라이언스를 철저히 수립하세요." if "business" in lenses else None,
                researcher="AI 모델의 안전성 검증 벤치마크 및 공격 기법 저감 알고리즘을 분석하세요." if "researcher" in lenses else None
            ),
            impact_score=82,
            tags=["#AI보안", "#AI트렌드", f"#{raw['source_name'].replace(' ', '')}"],
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
        
        # 중복 제목 및 링크 데두플리케이션(Deduplication)
        seen_titles = set()
        unique_articles = []
        for a in articles:
            if a.title not in seen_titles:
                seen_titles.add(a.title)
                unique_articles.append(a)
        articles = unique_articles

        # 기사 총합이 25개 미만인 경우 FALLBACK_ARTICLES 피드를 중복 없이 상호 보원 결합
        if len(articles) < 25:
            for fb in FALLBACK_ARTICLES:
                if fb.title not in seen_titles:
                    seen_titles.add(fb.title)
                    articles.append(fb)

        # Impact Score 내림차순 정렬
        articles.sort(key=lambda x: x.impact_score, reverse=True)
    except Exception as e:
        print(f"[NewsBatch Error] RSS fetching failed: {e}")
        articles = FALLBACK_ARTICLES

    # 백업 폴백 피드 안전장치
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

