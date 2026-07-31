from typing import List
from app.schemas import (
    RecommendationRequest,
    ModelComboItem,
    ModelCombo,
    HostingOption,
    ArchitectureRecommendationResult,
    TrendingTemplate
)
from app.seed_data import MODELS

# Helper to find model by id or fallback
def get_model(model_id: str):
    m = next((item for item in MODELS if item.id == model_id), None)
    if not m:
        # fallback search
        m = next((item for item in MODELS if model_id in item.id), MODELS[0])
    return m

# 5개 대표 인기 구현 서비스 템플릿
TRENDING_TEMPLATES: List[TrendingTemplate] = [
    TrendingTemplate(
        rank=1,
        id="code_agent",
        title="자율 코딩 에이전트 (Autonomous Coding Agent)",
        category="DevTools / Code Generation",
        description="복잡한 코드 리팩토링, 버그 수정 및 풀스택 기능 자동 생성을 수행하는 개발 코파일럿 에이전트",
        icon="code",
        typical_monthly_requests=50000,
        request=RecommendationRequest(
            service_type="code_agent",
            monthly_requests=50000,
            avg_input_tokens=3000,
            avg_output_tokens=1500,
            primary_priority="quality",
            requires_multimodal=False,
            requires_coding=True
        )
    ),
    TrendingTemplate(
        rank=2,
        id="rag_chatbot",
        title="기업용 사내 지식 RAG 챗봇 (Enterprise RAG)",
        category="Enterprise SaaS / Knowledge Base",
        description="사내 PDF, Confluence 문서, Notion을 하이브리드 임베딩으로 검색하여 완벽 출처와 함께 답변하는 챗봇",
        icon="database",
        typical_monthly_requests=200000,
        request=RecommendationRequest(
            service_type="rag",
            monthly_requests=200000,
            avg_input_tokens=2000,
            avg_output_tokens=600,
            primary_priority="balanced",
            requires_multimodal=False,
            requires_coding=False
        )
    ),
    TrendingTemplate(
        rank=3,
        id="multimodal_cs",
        title="멀티모달 24/7 고객지원 CS 봇 (Multimodal Support)",
        category="Customer Service / Support",
        description="고객이 캡처한 이미지, 영수증, 텍스트 질문을 동시에 분석하여 환불/장애 처리를 자동화하는 봇",
        icon="headset",
        typical_monthly_requests=150000,
        request=RecommendationRequest(
            service_type="multimodal",
            monthly_requests=150000,
            avg_input_tokens=1500,
            avg_output_tokens=400,
            primary_priority="balanced",
            requires_multimodal=True,
            requires_coding=False
        )
    ),
    TrendingTemplate(
        rank=4,
        id="translation_api",
        title="글로벌 실시간 다국어 번역엔진 (Global Translator)",
        category="Localization / API Service",
        description="100개 이상의 언어로 문맥과 뉘앙스를 보존하며 초고속으로 실시간 번역을 제공하는 엔터프라이즈 API",
        icon="globe",
        typical_monthly_requests=500000,
        request=RecommendationRequest(
            service_type="translation",
            monthly_requests=500000,
            avg_input_tokens=800,
            avg_output_tokens=800,
            primary_priority="cost",
            requires_multimodal=False,
            requires_coding=False
        )
    ),
    TrendingTemplate(
        rank=5,
        id="content_copilot",
        title="마케팅 콘텐츠 생성 코파일럿 (Content Copilot)",
        category="Marketing / Creative Writing",
        description="블로그 포스팅, SNS 카피, 이메일 마케팅 문구를 페르소나별로 자동 생성하는 생성형 인공지능 도구",
        icon="sparkles",
        typical_monthly_requests=80000,
        request=RecommendationRequest(
            service_type="content_creation",
            monthly_requests=80000,
            avg_input_tokens=1200,
            avg_output_tokens=1000,
            primary_priority="balanced",
            requires_multimodal=True,
            requires_coding=False
        )
    )
]

def calculate_item_cost(model_id: str, input_m: float, output_m: float, alloc_ratio: float) -> float:
    m = get_model(model_id)
    if not m or not m.api_pricing:
        return 0.0
    in_cost = input_m * alloc_ratio * m.api_pricing.input_price_per_1m
    out_cost = output_m * alloc_ratio * m.api_pricing.output_price_per_1m
    return round(in_cost + out_cost, 2)

def generate_markdown_spec(
    service_name: str,
    req: RecommendationRequest,
    total_input_m: float,
    total_output_m: float,
    best_combo: ModelCombo,
    smart_combo: ModelCombo,
    hosting: HostingOption
) -> str:
    md = f"""# 🚀 {service_name} AI 시스템 아키텍처 및 개발 명세서

> 본 명세서는 **LLM Compass AI Architecture Advisor**에 의해 자동 생성된 실전 구현용 명세서입니다.  
> Cursor IDE, Claude Code, GitHub Copilot 또는 개발팀에 전달하여 즉시 개발에 착수할 수 있습니다.

---

## 1. 프로젝트 개요 & 트래픽 요구사항 (Project Requirements)

- **서비스 유형**: `{req.service_type.upper()}`
- **월간 예상 요청 수**: `{req.monthly_requests:,} 회/월`
- **평균 입력 토큰**: `{req.avg_input_tokens:,} tokens / request`
- **평균 출력 토큰**: `{req.avg_output_tokens:,} tokens / request`
- **월간 총 토큰 워크로드**:
  - 입력: `{total_input_m:.2f}M tokens`
  - 출력: `{total_output_m:.2f}M tokens`
- **특수 기능 요건**:
  - 멀티모달(비전/음성) 지원: `{'필수 ✅' if req.requires_multimodal else '미사용 ❌'}`
  - 코드 생성/검증 지원: `{'필수 ✅' if req.requires_coding else '미사용 ❌'}`

---

## 2. 추천 시스템 아키텍처 (Smart Routing Orchestration)

### 🌟 추천 1등 (스마트 최적 조합): `{smart_combo.name}`
- **예상 월간 API 비용**: `${smart_combo.total_monthly_cost:,.2f} USD`
- **평균 벤치마크 (Arena ELO)**: `{smart_combo.avg_arena_elo:.0f} pts`
- **핵심 장점**: {', '.join(smart_combo.key_advantages)}

#### 🔄 라우터 & 파이프라인 구성:
"""
    for item in smart_combo.items:
        md += f"""- **[{item.role}]** `{item.model_name}` (`{item.provider_name}`)
  - 트래픽 할당 비율: `{item.allocation_percent}%`
  - 예상 월 비용: `${item.monthly_estimated_cost:,.2f}`
"""

    md += f"""

### 👑 최고 성능 조합 (Best Performance Option): `{best_combo.name}`
- **예상 월간 API 비용**: `${best_combo.total_monthly_cost:,.2f} USD`
- **평균 Arena ELO**: `{best_combo.avg_arena_elo:.0f} pts`
- **사용 모델**: {', '.join([item.model_name for item in best_combo.items])}

---

## 3. 추천 호스팅 & 인프라 아키텍처 (Hosting & Cloud)

- **권장 호스팅 스택**: `{hosting.provider}` ({hosting.category})
- **월간 예상 인프라 비용**: `${hosting.estimated_monthly_cost:,.2f} USD`
- **추천 사유**: {hosting.description}
- **타겟 워크로드**: {hosting.recommended_for}

---

## 4. 환경 변수 및 파이프라인 구현 가이드 (Implementation Guide)

### 🔑 필요한 환경 변수 (Environment Variables)

```env
# AI Provider API Keys
"""
    providers_set = set(item.provider_name for item in smart_combo.items)
    for p in providers_set:
        key_name = p.upper().replace(" ", "_").replace("(", "").replace(")", "") + "_API_KEY"
        md += f"{key_name}=your_{key_name.lower()}_here\n"

    md += """
# System Configuration
MAX_RETRY_COUNT=3
TIMEOUT_SECONDS=30
LOG_LEVEL=INFO
```

### 💻 Python 파이프라인 의사코드 (Smart Router Pseudo-code)

```python
import os
from typing import Dict, Any

class AIRouterPipeline:
    def __init__(self):
        # 파이프라인 라우터 초기화
        pass

    async def route_request(self, user_prompt: str, is_complex: bool = False) -> Dict[str, Any]:
        try:
            if is_complex:
                # 고난도 추론/코드 생성용 메인 모델 호출
                return await self._call_primary_engine(user_prompt)
            else:
                # 초고속/저비용 분류 및 일반 응답 모델 호출
                return await self._call_router_engine(user_prompt)
        except Exception as e:
            # 폴백(Fallback) 라우팅 작동
            return await self._call_fallback_engine(user_prompt)
```

---

## 5. 배포 체크리스트 (Deployment Checklist)

- [ ] 선택한 AI 공급자 API Key 발급 및 사용량 쿼터(RPM/TPM) 설정
- [ ] API 호출 실패에 대비한 exponential backoff 재시도 로직 작성
- [ ] 캐시(Redis/InMemory) 도입을 통한 빈번한 쿼리 비용 30% 이상 절감 검토
- [ ] 호스팅 환경(Serverless / Docker) 배포 스크립트 구축

*생성 일시: LLM Compass AI Architecture Advisor*
"""
    return md

def recommend_architecture(req: RecommendationRequest) -> ArchitectureRecommendationResult:
    # 0. 고객이 직접 입력한 자연어 요구사항(custom_prompt)이 있는 경우 의도(Intent) 자동 분석
    service_title = {
        "code_agent": "자율 코딩 에이전트 서비스",
        "rag": "기업용 RAG 챗봇 시스템",
        "multimodal": "멀티모달 고객지원 CS 봇",
        "translation": "글로벌 실시간 번역 API",
        "content_creation": "마케팅 콘텐츠 생성 코파일럿"
    }.get(req.service_type, "고객 맞춤형 AI 서비스")

    if req.custom_prompt and req.custom_prompt.strip():
        prompt = req.custom_prompt.lower()
        if any(w in prompt for w in ["코드", "코딩", "리팩토링", "개발", "에이전트", "python", "javascript", "bug"]):
            req.requires_coding = True
            if req.service_type in ["custom", "chatbot"]:
                req.service_type = "code_agent"
        if any(w in prompt for w in ["이미지", "비전", "캡처", "영수증", "사진", "pdf 이미지", "음성", "multimodal"]):
            req.requires_multimodal = True
            if req.service_type in ["custom", "chatbot"]:
                req.service_type = "multimodal"
        if any(w in prompt for w in ["rag", "문서", "지식", "검색", "pdf", "confluence", "notion", "사내"]):
            if req.service_type in ["custom", "chatbot"]:
                req.service_type = "rag"
        if any(w in prompt for w in ["번역", "다국어", "영한", "한영", "translate"]):
            if req.service_type in ["custom", "chatbot"]:
                req.service_type = "translation"
        
        display_text = req.custom_prompt[:30] + ("..." if len(req.custom_prompt) > 30 else "")
        service_title = f"맞춤 분석: \"{display_text}\""

    # 1. 월간 총 토큰 계산
    total_input_m = (req.monthly_requests * req.avg_input_tokens) / 1_000_000
    total_output_m = (req.monthly_requests * req.avg_output_tokens) / 1_000_000

    # --- 1) Best Performance Combo ---
    if req.requires_coding:
        p_router = get_model("claude-sonnet-4-5")
        p_primary = get_model("deepseek-reasoner")
    elif req.requires_multimodal:
        p_router = get_model("gemini-2-5-flash")
        p_primary = get_model("gpt-4o")
    else:
        p_router = get_model("claude-sonnet-4-5")
        p_primary = get_model("gpt-4o")

    best_items = [
        ModelComboItem(
            role="분류 및 사전 가공 (Router)",
            model_id=p_router.id,
            model_name=p_router.name,
            provider_name=p_router.provider_name,
            allocation_percent=30.0,
            monthly_estimated_cost=calculate_item_cost(p_router.id, total_input_m, total_output_m, 0.30)
        ),
        ModelComboItem(
            role="메인 워크로드 추론 (Primary Engine)",
            model_id=p_primary.id,
            model_name=p_primary.name,
            provider_name=p_primary.provider_name,
            allocation_percent=70.0,
            monthly_estimated_cost=calculate_item_cost(p_primary.id, total_input_m, total_output_m, 0.70)
        )
    ]
    best_cost = sum(item.monthly_estimated_cost for item in best_items)
    best_elo = ((p_router.benchmarks.arena_elo or 1300) * 0.3) + ((p_primary.benchmarks.arena_elo or 1350) * 0.7)

    best_combo = ModelCombo(
        id="best_quality",
        name="Frontier Premier Quality (최고 품질)",
        tag="Frontier Quality",
        description="복잡한 추론과 정확도가 최우선인 미션 크리티컬 서비스용 최상위 플래그십 조합",
        items=best_items,
        total_monthly_cost=best_cost,
        avg_arena_elo=best_elo,
        key_advantages=["업계 최고 수준의 지능 및 코딩 능력", "오류 없는 정교한 멀티스텝 추론", "높은 벤치마크 ELO"]
    )

    # --- 2) Smart Balanced Combo (Recommended) ---
    if req.requires_multimodal:
        s_router = get_model("gemini-2-5-flash-lite")
        s_primary = get_model("gemini-2-5-flash")
    elif req.requires_coding:
        s_router = get_model("groq-llama-3-3-70b")
        s_primary = get_model("deepseek-chat")
    else:
        s_router = get_model("groq-llama-3-3-70b")
        s_primary = get_model("deepseek-chat")

    smart_items = [
        ModelComboItem(
            role="초고속 분류기 (LPU Router)",
            model_id=s_router.id,
            model_name=s_router.name,
            provider_name=s_router.provider_name,
            allocation_percent=40.0,
            monthly_estimated_cost=calculate_item_cost(s_router.id, total_input_m, total_output_m, 0.40)
        ),
        ModelComboItem(
            role="고성능 답변 생성 (Main Engine)",
            model_id=s_primary.id,
            model_name=s_primary.name,
            provider_name=s_primary.provider_name,
            allocation_percent=60.0,
            monthly_estimated_cost=calculate_item_cost(s_primary.id, total_input_m, total_output_m, 0.60)
        )
    ]
    smart_cost = sum(item.monthly_estimated_cost for item in smart_items)
    smart_elo = ((s_router.benchmarks.arena_elo or 1250) * 0.4) + ((s_primary.benchmarks.arena_elo or 1340) * 0.6)

    smart_combo = ModelCombo(
        id="smart_balanced",
        name="Smart Orchestrated Router (스마트 최적 추천)",
        tag="Smart Balanced (Recommended)",
        description="Groq/Flash 초고속 분류기 + DeepSeek/Gemini 메인 엔진 조합으로 비용을 60% 절감하면서도 플래그십 95% 성능 보장",
        items=smart_items,
        total_monthly_cost=smart_cost,
        avg_arena_elo=smart_elo,
        key_advantages=["최적의 비용 대비 성능 비율 (Best ROI)", "초고속 응답 서빙 (Groq LPU 활용)", "안정적인 폴백 라우팅"]
    )

    # --- 3) Ultra Budget Combo ---
    b_router = get_model("groq-mixtral-8x7b")
    b_primary = get_model("together-qwen-2-5-72b") if not req.requires_multimodal else get_model("gemini-2-5-flash-lite")

    budget_items = [
        ModelComboItem(
            role="저비용 분류기 (Micro Router)",
            model_id=b_router.id,
            model_name=b_router.name,
            provider_name=b_router.provider_name,
            allocation_percent=50.0,
            monthly_estimated_cost=calculate_item_cost(b_router.id, total_input_m, total_output_m, 0.50)
        ),
        ModelComboItem(
            role="오픈웨이트 메인 서빙 (Open-Weight Engine)",
            model_id=b_primary.id,
            model_name=b_primary.name,
            provider_name=b_primary.provider_name,
            allocation_percent=50.0,
            monthly_estimated_cost=calculate_item_cost(b_primary.id, total_input_m, total_output_m, 0.50)
        )
    ]
    budget_cost = sum(item.monthly_estimated_cost for item in budget_items)
    budget_elo = ((b_router.benchmarks.arena_elo or 1190) * 0.5) + ((b_primary.benchmarks.arena_elo or 1290) * 0.5)

    budget_combo = ModelCombo(
        id="ultra_budget",
        name="Open-Weight Ultra Budget (극가성비)",
        tag="Ultra Budget",
        description="오픈웨이트 모델 및 저비용 서버리스 API 위주의 구성으로 대량 쿼리 처리 시 극단의 비용 절감 달성",
        items=budget_items,
        total_monthly_cost=budget_cost,
        avg_arena_elo=budget_elo,
        key_advantages=["극단적인 비용 효율성", "대용량 쿼리 배치 처리에 적합", "오픈소스 커뮤니티 호환성"]
    )

    # --- 호스팅 옵션 생성 ---
    hosting_options = [
        HostingOption(
            provider="Vercel + Railway App Services",
            category="Serverless / PaaS",
            estimated_monthly_cost=20.0 if req.monthly_requests < 200000 else 50.0,
            description="프론트엔드는 Vercel Edge, 백엔드 API는 Railway 인스턴스로 자동 스케일링 배포. 인프라 관리 부담 제로.",
            recommended_for="빠른 프로토타이핑 및 초중규모 SaaS 서비스"
        ),
        HostingOption(
            provider="AWS ECS Fargate + Amazon Bedrock",
            category="Cloud Native (Enterprise)",
            estimated_monthly_cost=80.0 if req.monthly_requests < 200000 else 250.0,
            description="보안 및 프라이빗 VPC 내에 백엔드 컨테이너 구축. 엔터프라이즈 IAM 권한 및 오토스케일링 적용.",
            recommended_for="보안 규정이 엄격한 기업 및 대규모 프로덕션"
        ),
        HostingOption(
            provider="RunPod / Modal GPU Instance (Self-Hosted)",
            category="GPU Serverless / Self-Hosted",
            estimated_monthly_cost=120.0 if req.monthly_requests < 200000 else 450.0,
            description="Llama/Qwen 등 오픈웨이트 모델을 독립 GPU(NVIDIA A10G/L40S) 서버리스로 직접 서빙.",
            recommended_for="자체 데이터 보안 및 오픈웨이트 직접 파인튜닝 서비스"
        )
    ]

    # 선택된 추천 호스팅 (스마트 파스)
    selected_hosting = hosting_options[0]

    # Markdown 개발명세서 자동 생성
    md_spec = generate_markdown_spec(
        service_name=service_title,
        req=req,
        total_input_m=total_input_m,
        total_output_m=total_output_m,
        best_combo=best_combo,
        smart_combo=smart_combo,
        hosting=selected_hosting
    )

    return ArchitectureRecommendationResult(
        service_name=service_title,
        monthly_requests=req.monthly_requests,
        total_monthly_input_tokens_m=round(total_input_m, 2),
        total_monthly_output_tokens_m=round(total_output_m, 2),
        combos=[smart_combo, best_combo, budget_combo],
        hosting_options=hosting_options,
        markdown_spec=md_spec
    )
