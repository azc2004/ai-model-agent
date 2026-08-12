from typing import List, Optional
from pydantic import BaseModel, Field

class Provider(BaseModel):
    id: str
    name: str
    website: str
    logo_url: str
    description: str
    official_docs_url: str

class APIPricing(BaseModel):
    input_price_per_1m: float
    output_price_per_1m: float
    cached_input_price_per_1m: Optional[float] = None
    batch_discount_percent: Optional[float] = 0.0
    notes: Optional[str] = None

class QuotaInfo(BaseModel):
    rpm: int = Field(..., description="Requests Per Minute")
    tpm: int = Field(..., description="Tokens Per Minute")
    rpd: Optional[int] = Field(None, description="Requests Per Day")
    concurrency_limit: Optional[int] = Field(None, description="Max concurrent requests")
    notes: Optional[str] = None

class BenchmarkScores(BaseModel):
    arena_elo: Optional[int] = None
    mmlu_pro: Optional[float] = None
    gpqa: Optional[float] = None
    swe_bench: Optional[float] = None

class HardwareRequirement(BaseModel):
    quantization: str
    min_vram_gb: float
    recommended_vram_gb: float
    min_ram_gb: float
    recommended_gpu: str
    multi_gpu_count: int
    tokens_per_sec_estimate: float

class ModelSpec(BaseModel):
    id: str
    provider_id: str
    provider_name: str
    name: str
    tier: str  # Frontier, Mid, Small, Micro
    is_open_weight: bool
    license_type: str
    parameter_count_b: Optional[float] = None
    architecture: str
    context_window: int
    max_output_tokens: int
    modality: List[str]
    description: str
    official_url: str
    source_docs_url: str
    api_pricing: Optional[APIPricing] = None
    quota: Optional[QuotaInfo] = None
    benchmarks: BenchmarkScores
    hardware_requirements: Optional[List[HardwareRequirement]] = []
    # LiteLLM 검증 필드
    is_verified: bool = True          # LiteLLM 기반 실제 사용 가능 검증 여부
    litellm_id: Optional[str] = None  # LiteLLM 모델 ID (호출용)
    supports_reasoning: bool = False  # 추론(CoT/thinking) 모드 지원
    supports_web_search: bool = False # 실시간 웹 검색 지원
    is_deprecated: bool = False       # 서비스 종료 예정/완료
    is_new: bool = False              # 신규 출시/업데이트 모델 여부

class GPUSpec(BaseModel):
    id: str
    name: str
    vram_gb: int
    memory_bandwidth_gbps: int
    purchase_price_usd: float
    cloud_hourly_on_demand: float
    cloud_hourly_spot: float
    power_watts: int

class TCOInput(BaseModel):
    monthly_input_tokens_m: float = Field(..., gt=0)
    monthly_output_tokens_m: float = Field(..., gt=0)
    target_model_id: str
    target_quantization: Optional[str] = "Q4_K_M"
    kwh_cost_usd: float = 0.15
    hardware_lifecycle_months: int = 36

class APICostResult(BaseModel):
    input_cost: float
    output_cost: float
    total_monthly_cost: float

class SelfHostedCostResult(BaseModel):
    recommended_gpu: str
    gpu_count: int
    total_vram_gb: float
    cloud_on_demand_monthly: float
    cloud_spot_monthly: float
    on_prem_hardware_cost: float
    on_prem_monthly_amortized: float
    on_prem_monthly_power: float
    on_prem_total_monthly: float
    breakeven_months_vs_api: Optional[float] = None

class TCOComparisonResult(BaseModel):
    model_id: str
    model_name: str
    monthly_input_tokens_m: float
    monthly_output_tokens_m: float
    api_cost: APICostResult
    self_hosted: SelfHostedCostResult
    recommendation: str

TCOCalculationResult = TCOComparisonResult


# --- AI 아키텍처 추천 & 랭킹 스키마 ---

class RecommendationRequest(BaseModel):
    service_type: str = Field("custom", description="서비스 유형 (e.g. chatbot, rag, code_agent, multimodal, translation, custom)")
    monthly_requests: int = Field(100000, description="월간 예상 요청 수")
    avg_input_tokens: int = Field(1000, description="요청 당 평균 입력 토큰 수")
    avg_output_tokens: int = Field(500, description="요청 당 평균 출력 토큰 수")
    primary_priority: Optional[str] = Field("balanced", description="최우선 목표 (quality, balanced, cost)")
    requires_multimodal: bool = Field(False, description="멀티모달(비전/음성) 지원 필요 여부")
    requires_coding: bool = Field(False, description="코드 생성 및 검증 능력 필요 여부")
    custom_prompt: Optional[str] = Field(None, description="고객이 직접 작성한 자연어 서비스 요구사항 텍스트")
    language: Optional[str] = Field("ko", description="마크다운 문서 생성 대상 언어 (ko, en, ja, zh, es, de, fr)")

class ModelComboItem(BaseModel):
    role: str                       # e.g., "Router/Classifier", "Primary Engine", "Fallback"
    model_id: str
    model_name: str
    provider_name: str
    allocation_percent: float       # 트래픽 비중 %
    monthly_estimated_cost: float   # 해당 모델 할당 월간 비용 ($)

class ModelCombo(BaseModel):
    id: str                         # "best_quality", "smart_balanced", "ultra_budget"
    name: str
    tag: str                        # "Frontier Quality", "Smart Balanced (Recommended)", "Ultra Budget"
    description: str
    items: List[ModelComboItem]
    total_monthly_cost: float
    avg_arena_elo: float
    key_advantages: List[str]

class HostingOption(BaseModel):
    provider: str                   # e.g., "Vercel + Railway", "AWS (ECS + Bedrock)", "RunPod / Modal"
    category: str                   # "Serverless / PaaS", "Cloud Native (AWS/GCP)", "GPU Self-Hosting"
    estimated_monthly_cost: float
    description: str
    recommended_for: str

class SpecBundle(BaseModel):
    agents_md: str           # AGENTS.md (AI 에이전트 전용 시스템 코딩 규칙 및 보안 프롬프트)
    architecture_md: str     # ARCHITECTURE.md (전체 시스템 구조 및 Mermaid 다이어그램)
    database_schema_md: str  # DATABASE_SCHEMA.md (데이터베이스 ERD, 테이블 DDL & Redis 캐시 구조)
    tasks_md: str            # TASKS.md (AI 에이전트용 단계별 구현 체크리스트 WBS)
    deployment_md: str       # DEPLOYMENT.md (.env, Dockerfile 및 CI/CD 인프라 명세)

class ArchitectureRecommendationResult(BaseModel):
    service_name: str
    monthly_requests: int
    total_monthly_input_tokens_m: float
    total_monthly_output_tokens_m: float
    combos: List[ModelCombo]
    hosting_options: List[HostingOption]
    markdown_spec: str
    spec_bundle: Optional[SpecBundle] = None

class TrendingTemplate(BaseModel):
    rank: int
    id: str
    title: str
    category: str
    description: str
    icon: str
    typical_monthly_requests: int
    request: RecommendationRequest

class CustomMarkdownRequest(BaseModel):
    user_request: str
    context: Optional[dict[str, str]] = None
    ask_when_missing: bool = True
    run_critique: bool = True

class CustomMarkdownResponse(BaseModel):
    case: str
    markdown: str
    passed: bool
    retries_used: int
    issues: List[dict[str, str]] = Field(default_factory=list)
    needs_user_input: List[str] = Field(default_factory=list)

# ---------------------------------------------------------------------------
# AI News Pulse 2.0 Models
# ---------------------------------------------------------------------------
class ActionableInsight(BaseModel):
    developer: Optional[str] = Field(None, description="개발자 대상 실전 활용 팁")
    pm: Optional[str] = Field(None, description="기획자/PM 대상 실전 활용 팁")
    business: Optional[str] = Field(None, description="비즈니스 리더 대상 실전 활용 팁")
    researcher: Optional[str] = Field(None, description="연구자 대상 실전 활용 팁")

class NewsArticle(BaseModel):
    id: str = Field(..., description="기사 고유 ID (URL 해시 등)")
    title: str = Field(..., description="기사 원문 제목 (또는 번역된 제목)")
    source_name: str = Field(..., description="매체명 (예: TechCrunch, OpenAI Blog)")
    source_url: str = Field(..., description="기사 원문 URL")
    published_at: str = Field(..., description="발행 시간 (ISO 포맷 또는 상대 시간)")
    category: str = Field(..., description="수집 채널 카테고리 (빅테크 공식, IT 매체 등)")
    image_url: Optional[str] = Field(None, description="기사 대표 썸네일 이미지 URL")
    
    # AI Processed Fields
    summary_bullets: List[str] = Field(default_factory=list, description="3줄 핵심 요약")
    blog_summary: Optional[str] = Field(None, description="블로그 형태의 상세 기술 리포트 전문 (Markdown)")
    actionable_insight: Optional[ActionableInsight] = Field(None, description="직무별 실무 적용 팁")
    impact_score: int = Field(0, description="산업적 영향도 점수 (1~100)")
    tags: List[str] = Field(default_factory=list, description="핵심 트렌딩 키워드 태그")
    matched_lenses: List[str] = Field(default_factory=list, description="연관된 직무 렌즈 ['developer', 'pm', 'business', 'researcher']")
    is_new: bool = Field(False, description="신규 수집 기사 여부 (48시간 이내)")
    is_synthesized: bool = Field(False, description="2~5개 다중 소스 융합 블로그 여부")
    multi_sources: Optional[List[Dict[str, str]]] = Field(None, description="참조된 다중 소스 정보 ([{'name': '...', 'url': '...'}])")
    primary_topic: Optional[str] = Field(None, description="클러스터 대표 테마")

class NewsPulseResponse(BaseModel):
    articles: List[NewsArticle]
    total_count: int
    last_updated: str
