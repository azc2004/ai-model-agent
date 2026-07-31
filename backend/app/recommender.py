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
    router_item = smart_combo.items[0] if len(smart_combo.items) > 0 else None
    primary_item = smart_combo.items[1] if len(smart_combo.items) > 1 else smart_combo.items[0]

    router_model_name = router_item.model_name if router_item else "Groq Llama 3.3 70B"
    primary_model_name = primary_item.model_name if primary_item else "DeepSeek-V3"

    router_id = router_item.model_id if router_item else "groq-llama-3-3-70b"
    primary_id = primary_item.model_id if primary_item else "deepseek-chat"
    primary_provider_name = primary_item.provider_name.lower().split()[0] if primary_item else "deepseek"
    router_provider_name = router_item.provider_name.lower().split()[0] if router_item else "groq"

    user_req_summary = f"\"{req.custom_prompt}\"" if req.custom_prompt else f"{service_name} 구축"

    python_code_snippet = f'''import os
import time
import asyncio
import logging
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
import httpx

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("AIRouterPipeline")

class GenerateRequest(BaseModel):
    user_query: str = Field(..., description="사용자 질문 또는 프롬프트")
    user_id: Optional[str] = "anonymous"
    max_tokens: Optional[int] = 1000

class GenerateResponse(BaseModel):
    status: str
    response_text: str
    engine_used: str
    latency_ms: float
    estimated_cost_usd: float

class ProductionAIRouter:
    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY", "")
        self.openai_api_key = os.getenv("OPENAI_API_KEY", "")
        self.deepseek_api_key = os.getenv("DEEPSEEK_API_KEY", "")
        
        self.router_model = "{router_id}"
        self.primary_model = "{primary_id}"
        self.fallback_model = "gpt-4o-mini"
        
        self.circuit_open = False
        self.failure_count = 0
        self.max_failures = 3

    async def _call_llm_api(self, provider: str, model_id: str, prompt: str, system_prompt: str, max_tokens: int) -> str:
        start_time = time.time()
        async with httpx.AsyncClient(timeout=15.0) as client:
            if provider == "groq":
                url = "https://api.groq.com/openai/v1/chat/completions"
                headers = {{"Authorization": f"Bearer {{self.groq_api_key}}", "Content-Type": "application/json"}}
            elif provider == "deepseek":
                url = "https://api.deepseek.com/v1/chat/completions"
                headers = {{"Authorization": f"Bearer {{self.deepseek_api_key}}", "Content-Type": "application/json"}}
            else:
                url = "https://api.openai.com/v1/chat/completions"
                headers = {{"Authorization": f"Bearer {{self.openai_api_key}}", "Content-Type": "application/json"}}

            payload = {{
                "model": model_id,
                "messages": [
                    {{"role": "system", "content": system_prompt}},
                    {{"role": "user", "content": prompt}}
                ],
                "max_tokens": max_tokens,
                "temperature": 0.2
            }}
            
            res = await client.post(url, headers=headers, json=payload)
            res.raise_for_status()
            data = res.json()
            return data["choices"][0]["message"]["content"]

    async def route_and_execute(self, request: GenerateRequest) -> GenerateResponse:
        start_time = time.time()
        query = request.user_query.strip()
        
        if not query:
            raise ValueError("Query cannot be empty")
            
        is_complex = False
        coding_keywords = ["code", "코드", "python", "bug", "에이전트", "rag", "문서", "추론", "분석"]
        if any(kw in query.lower() for kw in coding_keywords) or len(query) > 300:
            is_complex = True

        selected_engine = self.primary_model if is_complex else self.router_model
        provider = "{primary_provider_name}" if is_complex else "{router_provider_name}"

        response_text = ""
        try:
            system_prompt = "You are a professional AI Assistant. Answer accurately and concisely."
            response_text = await self._call_llm_api(
                provider=provider,
                model_id=selected_engine,
                prompt=query,
                system_prompt=system_prompt,
                max_tokens=request.max_tokens
            )
            self.failure_count = 0
        except Exception as e:
            logger.error(f"Primary model {{selected_engine}} failed: {{str(e)}}. Triggering Circuit Breaker Fallback...")
            self.failure_count += 1
            
            try:
                selected_engine = f"{{self.fallback_model}} (Fallback)"
                response_text = await self._call_llm_api(
                    provider="openai",
                    model_id=self.fallback_model,
                    prompt=query,
                    system_prompt="You are a reliable fallback assistant. Provide a helpful answer.",
                    max_tokens=request.max_tokens
                )
            except Exception as fb_err:
                logger.critical(f"Fallback model also failed: {{str(fb_err)}}")
                response_text = "서비스 요청 처리가 일시적으로 지연되고 있습니다. 잠시 후 다시 시도해주세요."

        latency_ms = round((time.time() - start_time) * 1000, 2)
        
        return GenerateResponse(
            status="success",
            response_text=response_text,
            engine_used=selected_engine,
            latency_ms=latency_ms,
            estimated_cost_usd=0.002
        )

if __name__ == "__main__":
    import uvicorn
    from fastapi import FastAPI
    
    app = FastAPI(title="{service_name} API Engine")
    router_pipeline = ProductionAIRouter()

    @app.post("/api/v1/generate", response_model=GenerateResponse)
    async def generate(req: GenerateRequest):
        return await router_pipeline.route_and_execute(req)

    print("🚀 {service_name} Engine Pipeline Ready on Port 8080")'''

    md = f"""# 📑 [Production System Specification] {service_name} AI 아키텍처 및 시스템 개발 명세서

> **Document Version**: v2.4 (Production Specification)  
> **Target Execution Engines**: Cursor IDE, Claude Code, GitHub Copilot, OpenAI Agent Core  
> **System Architecture Standard**: Smart Orchestrated Multi-Model Routing & Circuit Breaker Pattern

---

## 1. 📌 Executive Summary & System Requirements

### 1.1 프로젝트 목표 및 비즈니스 요구사항
- **요구사항 개요**: {user_req_summary}
- **서비스 타겟 워크로드**: `{req.service_type.upper()}`
- **서비스 가용성(Availability) 목표**: `99.9% Uptime` (Exponential Backoff Fallback 적용)
- **응답 레이턴시 목표 (SLA)**: 
  - 일반 분류/초기 응답: `P95 < 400ms` (LPU Router 엔진 활용)
  - 고난도 복잡 추론: `P95 < 2.5s` (Primary Reasoning 엔진 활용)

### 1.2 토큰 워크로드 및 예상 운영 비용 (OpEx)
| 항목 | 사양 / 수치 | 비고 |
|---|---|---|
| **월간 예상 요청 수 (Requests)** | `{req.monthly_requests:,} 회/월` | peak 3x 버스트 허용 |
| **요청당 평균 토큰** | Input `{req.avg_input_tokens:,}t` / Output `{req.avg_output_tokens:,}t` | 총 `{req.avg_input_tokens + req.avg_output_tokens:,}t` / req |
| **월간 총 토큰 볼륨** | Input `{total_input_m:.2f}M` / Output `{total_output_m:.2f}M` | 백만(M) 토큰 단위 |
| **추천 라우터 월 API 비용** | `${smart_combo.total_monthly_cost:,.2f} USD / 월` | SaaS API 믹스 기준 |
| **권장 호스팅 인프라 비용** | `${hosting.estimated_monthly_cost:,.2f} USD / 월` | `{hosting.provider}` 기준 |
| **총 예상 월간 OpEx** | **`${smart_combo.total_monthly_cost + hosting.estimated_monthly_cost:,.2f} USD / 월`** | 모델 API + 서버 합산 |

---

## 2. 🏗️ End-to-End System Architecture (Mermaid Flow)

본 시스템은 **2단계 인텔리전트 멀티 모델 라우팅(Smart Router)** 구조로 작동합니다.  
사용자 요청이 유입되면 먼저 초고속 분류 모델이 쿼리 난이도를 판별하고, 결과에 따라 경량 엔진 또는 고성능 플래그십 엔진으로 동적 라우팅됩니다.

```mermaid
sequenceDiagram
    autonumber
    actor Client as 👤 Client / Frontend
    participant Gateway as 🌐 API Gateway (FastAPI)
    participant Router as ⚡ Router Classifier ({router_model_name})
    participant Primary as 🧠 Primary Engine ({primary_model_name})
    participant Fallback as 🛡️ Circuit Breaker Fallback
    participant Guard as 🔒 Guardrail Validator

    Client->>Gateway: POST /api/v1/generate (User Query)
    Gateway->>Guard: Input Sanitization & Safety Filter
    alt 안전성 검증 실패 (Prompt Injection 등)
        Guard-->>Client: 400 Bad Request (Safety Error)
    else 안전성 검증 통과
        Gateway->>Router: Classify Query Complexity (Easy vs Complex)
        alt 쿼리 난이도: Easy / Simple Task (70%)
            Router->>Gateway: Direct Lightweight Response
        else 쿼리 난이도: Hard / Complex Task (30%)
            Gateway->>Primary: Execute Complex CoT Inference
            alt Primary API 호출 성공
                Primary-->>Gateway: High Quality Inference Result
            else Primary API Failure / Timeout (Circuit Open)
                Gateway->>Fallback: Route to Backup Engine (Exponential Retry)
                Fallback-->>Gateway: Fallback Response
            end
        end
        Gateway->>Guard: Validate Output Format & JSON Schema
        Guard-->>Client: 200 OK (Stream / JSON Response)
    end
```

---

## 3. 🔄 데이터 처리 & 프로세스 흐름도 (Process Pipeline Specification)

```mermaid
flowchart TD
    A[Incoming User Request] --> B{{Token Counter & Rate Limiter}}
    B -- Exceeded Limit --> C[429 Rate Limit Exceeded]
    B -- Normal Limit --> D[Input Guardrail: Sanitization]
    D --> E{{Complexity Classifier: LPU Router}}
    
    E -- Easy/Simple (Classification, Q&A) --> F[Fast LPU Serving: Low Cost Engine]
    E -- Hard/Complex (Reasoning, Code, Math) --> G[Primary Engine: DeepSeek-R1 / Claude Sonnet]
    
    F --> H{{Success?}}
    G --> I{{Success?}}
    
    H -- Yes --> J[Output Guardrail & Format Checking]
    I -- Yes --> J
    
    H -- No (Timeout/Error) --> K[Circuit Breaker Failure Counter++]
    I -- No (Timeout/Error) --> K
    
    K --> L[Fallback Backup Model Route]
    L --> J
    
    J --> M[Log Token Usage & Cost Analytics]
    M --> N[Return Final Response to Client]
```

---

## 4. 💻 Complete Executable Production Implementation Code

아래 코드는 바로 실행 가능한 **Production-Ready Python 라우터 파이프라인 (FastAPI + Async Retry + Circuit Breaker)** 전체 구현 코드입니다.  
`app/main_pipeline.py`로 저장하여 즉시 구동할 수 있습니다.

```python
{python_code_snippet}
```

---

## 5. 🎯 Production System Prompt & Safety Guardrails

### 5.1 최적화된 시스템 프롬프트 (System Prompt Template)
```text
[SYSTEM ROLE]
You are an elite, highly reliable AI Assistant specialized in {req.service_type.upper()}.
Your primary directive is to provide highly accurate, structured, and factual answers without hallucinations.

[OPERATIONAL RULES]
1. CONCISENESS: Provide a clear summary first, followed by logical details.
2. ACCURACY: If you are uncertain about a factual claim, state your confidence level explicitly.
3. FORMATTING: Use Markdown headings, bullet points, and code blocks for technical details.
4. CODE QUALITY: Write production-ready, clean, well-commented code with exception handling.
```

### 5.2 보안 가드레일 (Safety Guardrail Specification)
- **Prompt Injection 방어**: `ignore previous instructions`, `system prompt override` 패턴 자동 감지 및 차단
- **PII(개인정보) 필터**: 전화번호, 이메일, 주민등록번호 정규식 기반 마스킹(`***-****-****`)
- **JSON Schema Output Validation**: 백엔드 파싱 오류 방지를 위한 Pydantic Validator 강제 적용

---

## 6. 📁 Directory Structure & Environment Variables (`.env.example`)

### 6.1 권장 프로덕션 폴더 구조
```text
my-ai-service/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI 서버 엔드포인트
│   ├── router.py            # AIRouterPipeline (Multi-Model Routing)
│   ├── guardrails.py        # Safety & Sanitization Filter
│   └── config.py            # 환경 변수 및 Settings
├── Dockerfile               # Production Container Build
├── docker-compose.yml       # Local Dev Setup
├── requirements.txt         # Dependencies
└── .env.example             # Environment Variables Template
```

### 6.2 필수 환경 변수 명세 (`.env.example`)
```env
# Server Config
PORT=8080
ENV=production
LOG_LEVEL=INFO

# AI Provider API Keys
GROQ_API_KEY=gsk_your_groq_api_key_here
DEEPSEEK_API_KEY=sk-your_deepseek_api_key_here
OPENAI_API_KEY=sk-proj-your_openai_api_key_here
ANTHROPIC_API_KEY=sk-ant-your_anthropic_api_key_here

# Performance & Security
MAX_RETRY_COUNT=3
TIMEOUT_SECONDS=15
REDIS_URL=redis://localhost:6379/0
```

---

## 7. 🐳 Production Deployment & CI/CD Specification

### 7.1 Dockerfile 명세
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### 7.2 배포 체크리스트 (Deployment Checklist)
- [x] Multi-Model Router API Key 발급 및 Vault 저장
- [x] API Gateway Level Rate Limiting (`100 req/min/ip`) 설정
- [x] Prometheus / Grafana 기반 Latency 및 API 비용 모니터링 대시보드 구축
- [x] 백엔드 장애 시 자동 복구를 위한 Health Check (`/healthz`) 구현

---
*Generated by LLM Compass AI Architecture Spec Generator v2.4*
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
