from typing import List
from app.schemas import Provider, ModelSpec, APIPricing, BenchmarkScores, HardwareRequirement, GPUSpec, QuotaInfo

PROVIDERS: List[Provider] = [
    Provider(
        id="openai",
        name="OpenAI",
        website="https://openai.com",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
        description="최첨단 GPT 시리즈, o1/o3 추론, Realtime, Audio, Moderation 및 Embedding 전 모델 라인업",
        official_docs_url="https://platform.openai.com/docs/models"
    ),
    Provider(
        id="anthropic",
        name="Anthropic",
        website="https://anthropic.com",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
        description="코딩, 복잡한 추론 및 문서 분석 특화 Claude 3/3.5/4/5 시리즈 전체 라인업",
        official_docs_url="https://docs.anthropic.com/en/docs/about-claude/models"
    ),
    Provider(
        id="google",
        name="Google AI",
        website="https://deepmind.google",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        description="초대형 200만 컨텍스트 및 네이티브 멀티모달 Gemini / Gemma 전체 라인업",
        official_docs_url="https://ai.google.dev/gemini-api/docs/models/gemini"
    ),
    Provider(
        id="aws_bedrock",
        name="AWS Bedrock",
        website="https://aws.amazon.com/bedrock",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        description="Amazon Nova, Titan 및 Bedrock 관리형 Claude, Llama, Mistral, Command 전체 라인업",
        official_docs_url="https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
    ),
    Provider(
        id="deepseek",
        name="DeepSeek",
        website="https://deepseek.com",
        logo_url="https://chat.deepseek.com/favicon.ico",
        description="초고성능 오픈웨이트 MoE 및 추론 모델 (DeepSeek R1, V4, V3, Coder, Math, V2.5)",
        official_docs_url="https://api-docs.deepseek.com"
    ),
    Provider(
        id="meta",
        name="Meta AI",
        website="https://ai.meta.com",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
        description="글로벌 오픈웨이트 생태계를 주도하는 Llama 4 / 3.3 / 3.2 / 3.1 / 3 / 2 및 Code Llama 전시리즈",
        official_docs_url="https://llama.meta.com/docs/model-cards-and-prompt-formats"
    ),
    Provider(
        id="alibaba",
        name="Alibaba Cloud (Qwen)",
        website="https://qwenlm.github.io",
        logo_url="https://qwenlm.github.io/assets/logo.png",
        description="다국어, 코딩, VL 및 에이전트에 강력한 Qwen 3.6 / 2.5 / Coder / VL 전 시리즈",
        official_docs_url="https://qwenlm.github.io"
    ),
    Provider(
        id="mistral",
        name="Mistral AI",
        website="https://mistral.ai",
        logo_url="https://mistral.ai/images/logo-mistral-ai.svg",
        description="유럽 대표 오픈소스 Mistral Large/Small, Codestral, Mixtral 8x22B/8x7B, Pixtral 전 라인업",
        official_docs_url="https://docs.mistral.ai/getting-started/models/models_overview"
    ),
    Provider(
        id="microsoft",
        name="Microsoft",
        website="https://azure.microsoft.com",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        description="엣지 및 소형 하드웨어 최적화 Phi-4 / Phi-3.5 / Phi-3 전 시리즈",
        official_docs_url="https://huggingface.co/microsoft"
    ),
    Provider(
        id="cohere",
        name="Cohere",
        website="https://cohere.com",
        logo_url="https://cohere.com/favicon.ico",
        description="기업용 검색/RAG 및 다국어 텍스트 처리에 특화된 Command R+ / R / Light / Embed",
        official_docs_url="https://docs.cohere.com/docs/models"
    ),
    Provider(
        id="perplexity",
        name="Perplexity AI",
        website="https://perplexity.ai",
        logo_url="https://perplexity.ai/favicon.ico",
        description="실시간 웹 검색 통합 및 논리 추론 특화 Sonar Pro / Reasoning / Small",
        official_docs_url="https://docs.perplexity.ai/guides/model-cards"
    ),
    Provider(
        id="zhipu",
        name="Zhipu AI (GLM)",
        website="https://zhipuai.cn",
        logo_url="https://zhipuai.cn/logo.png",
        description="에이전트 코딩 및 중국어/영어 특화 GLM-5.2 / GLM-4 Plus / Air / Flash / Long",
        official_docs_url="https://open.bigmodel.cn/dev/howuse/model"
    ),
    Provider(
        id="moonshot",
        name="Moonshot AI (Kimi)",
        website="https://moonshot.cn",
        logo_url="https://moonshot.cn/favicon.ico",
        description="초장문 200만 컨텍스트 및 MoE 추론 특화 Kimi K2.7 / K1.5 / v1-128k",
        official_docs_url="https://platform.moonshot.cn/docs/intro"
    )
]

GPU_SPECS: List[GPUSpec] = [
    GPUSpec(
        id="rtx_3090",
        name="NVIDIA RTX 3090",
        vram_gb=24,
        memory_bandwidth_gbps=936,
        purchase_price_usd=950.0,
        cloud_hourly_on_demand=0.45,
        cloud_hourly_spot=0.22,
        power_watts=350
    ),
    GPUSpec(
        id="rtx_4090",
        name="NVIDIA RTX 4090",
        vram_gb=24,
        memory_bandwidth_gbps=1008,
        purchase_price_usd=1800.0,
        cloud_hourly_on_demand=0.75,
        cloud_hourly_spot=0.38,
        power_watts=450
    ),
    GPUSpec(
        id="a100_80gb",
        name="NVIDIA A100 SXM4 (80GB)",
        vram_gb=80,
        memory_bandwidth_gbps=2039,
        purchase_price_usd=12000.0,
        cloud_hourly_on_demand=1.60,
        cloud_hourly_spot=0.85,
        power_watts=400
    ),
    GPUSpec(
        id="h100_80gb",
        name="NVIDIA H100 SXM5 (80GB)",
        vram_gb=80,
        memory_bandwidth_gbps=3350,
        purchase_price_usd=28000.0,
        cloud_hourly_on_demand=2.80,
        cloud_hourly_spot=1.50,
        power_watts=700
    ),
    GPUSpec(
        id="b200_192gb",
        name="NVIDIA B200 (192GB)",
        vram_gb=192,
        memory_bandwidth_gbps=8000,
        purchase_price_usd=38000.0,
        cloud_hourly_on_demand=5.20,
        cloud_hourly_spot=2.80,
        power_watts=1000
    )
]

def default_quota(tier: str) -> QuotaInfo:
    if tier == "Frontier":
        return QuotaInfo(rpm=10000, tpm=2000000, rpd=100000, concurrency_limit=500)
    elif tier == "Mid":
        return QuotaInfo(rpm=5000, tpm=800000, rpd=50000, concurrency_limit=200)
    elif tier == "Small":
        return QuotaInfo(rpm=3000, tpm=400000, rpd=30000, concurrency_limit=100)
    else:
        return QuotaInfo(rpm=1000, tpm=150000, rpd=10000, concurrency_limit=50)

# Full Official Catalog Models with Official Source Documentation URLs
RAW_MODELS_DATA = [
    # ==================== OpenAI Official Full Catalog (30개) ====================
    # Source: https://platform.openai.com/docs/models & https://developers.openai.com/api/docs/models/all
    ("gpt-5.6-sol", "openai", "OpenAI", "GPT-5.6 Sol", "Frontier", False, "Proprietary", None, "Dense/MoE", 272000, 16384, ["text", "vision", "audio"], "OpenAI 2026 플래그십 모델. 복잡한 시스템 추론 및 멀티 에이전트 오케스트레이션", "https://platform.openai.com/docs/models", "https://platform.openai.com/docs/models", APIPricing(input_price_per_1m=5.00, output_price_per_1m=30.00, cached_input_price_per_1m=2.50), BenchmarkScores(arena_elo=1385, mmlu_pro=89.4, gpqa=76.8, swe_bench=62.5)),
    ("gpt-5.6-terra", "openai", "OpenAI", "GPT-5.6 Terra", "Mid", False, "Proprietary", None, "Dense", 272000, 16384, ["text", "vision"], "성능과 가격 밸런스가 뛰어난 OpenAI Mid-tier 주력 모델", "https://platform.openai.com/docs/models", "https://platform.openai.com/docs/models", APIPricing(input_price_per_1m=2.50, output_price_per_1m=15.00, cached_input_price_per_1m=1.25), BenchmarkScores(arena_elo=1340, mmlu_pro=83.5, gpqa=68.2, swe_bench=51.0)),
    ("gpt-5.6-luna", "openai", "OpenAI", "GPT-5.6 Luna", "Small", False, "Proprietary", None, "Dense", 128000, 8192, ["text", "vision"], "대량 토큰 처리에 최적화된 저비용 초고속 소형 모델", "https://platform.openai.com/docs/models", "https://platform.openai.com/docs/models", APIPricing(input_price_per_1m=1.00, output_price_per_1m=6.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1290, mmlu_pro=78.2, gpqa=59.1, swe_bench=41.2)),
    ("gpt-4o", "openai", "OpenAI", "GPT-4o (Latest)", "Mid", False, "Proprietary", None, "Native Multimodal", 128000, 16384, ["text", "vision", "audio"], "범용 플래그십 옴니 모델 공식 최신 버전", "https://platform.openai.com/docs/models/gpt-4o", "https://platform.openai.com/docs/models/gpt-4o", APIPricing(input_price_per_1m=2.50, output_price_per_1m=10.00, cached_input_price_per_1m=1.25), BenchmarkScores(arena_elo=1286, mmlu_pro=77.0, gpqa=53.6, swe_bench=38.8)),
    ("gpt-4o-2024-11-20", "openai", "OpenAI", "GPT-4o (2024-11-20)", "Mid", False, "Proprietary", None, "Native Multimodal", 128000, 16384, ["text", "vision", "audio"], "2024-11-20 릴리스 안정화 스냅샷", "https://platform.openai.com/docs/models/gpt-4o", "https://platform.openai.com/docs/models/gpt-4o", APIPricing(input_price_per_1m=2.50, output_price_per_1m=10.00, cached_input_price_per_1m=1.25), BenchmarkScores(arena_elo=1286, mmlu_pro=77.0, gpqa=53.6, swe_bench=38.8)),
    ("gpt-4o-2024-08-06", "openai", "OpenAI", "GPT-4o (2024-08-06)", "Mid", False, "Proprietary", None, "Native Multimodal", 128000, 16384, ["text", "vision"], "구조화 출력(Structured Outputs) 최초 지원 스냅샷", "https://platform.openai.com/docs/models/gpt-4o", "https://platform.openai.com/docs/models/gpt-4o", APIPricing(input_price_per_1m=2.50, output_price_per_1m=10.00, cached_input_price_per_1m=1.25), BenchmarkScores(arena_elo=1280, mmlu_pro=76.5, gpqa=53.0, swe_bench=38.0)),
    ("gpt-4o-2024-05-13", "openai", "OpenAI", "GPT-4o (2024-05-13)", "Mid", False, "Proprietary", None, "Native Multimodal", 128000, 4096, ["text", "vision"], "GPT-4o 최초 데뷔 스냅샷", "https://platform.openai.com/docs/models/gpt-4o", "https://platform.openai.com/docs/models/gpt-4o", APIPricing(input_price_per_1m=5.00, output_price_per_1m=15.00, cached_input_price_per_1m=2.50), BenchmarkScores(arena_elo=1270, mmlu_pro=75.0, gpqa=51.0, swe_bench=36.0)),
    ("gpt-4o-mini", "openai", "OpenAI", "GPT-4o mini (Latest)", "Small", False, "Proprietary", None, "Dense", 128000, 16384, ["text", "vision"], "가성비 소형 모델 공식 최신 버전", "https://platform.openai.com/docs/models/gpt-4o-mini", "https://platform.openai.com/docs/models/gpt-4o-mini", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.60, cached_input_price_per_1m=0.075), BenchmarkScores(arena_elo=1220, mmlu_pro=65.2, gpqa=41.0, swe_bench=28.5)),
    ("gpt-4o-mini-2024-07-18", "openai", "OpenAI", "GPT-4o mini (2024-07-18)", "Small", False, "Proprietary", None, "Dense", 128000, 16384, ["text", "vision"], "GPT-4o mini 공식 7월 스냅샷", "https://platform.openai.com/docs/models/gpt-4o-mini", "https://platform.openai.com/docs/models/gpt-4o-mini", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.60, cached_input_price_per_1m=0.075), BenchmarkScores(arena_elo=1220, mmlu_pro=65.2, gpqa=41.0, swe_bench=28.5)),
    ("gpt-4o-realtime-preview", "openai", "OpenAI", "GPT-4o Realtime Preview", "Mid", False, "Proprietary", None, "Native Multimodal Realtime", 128000, 4096, ["text", "audio"], "양방향 초저지연 음성 대화 API", "https://platform.openai.com/docs/models/gpt-4o-realtime", "https://platform.openai.com/docs/models/gpt-4o-realtime", APIPricing(input_price_per_1m=5.00, output_price_per_1m=20.00, cached_input_price_per_1m=2.50), BenchmarkScores(arena_elo=1275, mmlu_pro=74.0, gpqa=50.0, swe_bench=35.0)),
    ("gpt-4o-mini-realtime-preview", "openai", "OpenAI", "GPT-4o mini Realtime Preview", "Small", False, "Proprietary", None, "Native Multimodal Realtime", 128000, 4096, ["text", "audio"], "소형 초저지연 음성 대화 API", "https://platform.openai.com/docs/models/gpt-4o-realtime", "https://platform.openai.com/docs/models/gpt-4o-realtime", APIPricing(input_price_per_1m=0.60, output_price_per_1m=2.40, cached_input_price_per_1m=0.30), BenchmarkScores(arena_elo=1210, mmlu_pro=63.0, gpqa=38.0, swe_bench=25.0)),
    ("gpt-4o-audio-preview", "openai", "OpenAI", "GPT-4o Audio Preview", "Mid", False, "Proprietary", None, "Audio Native", 128000, 16384, ["text", "audio"], "오디오 입력 및 음성 직접 생성 API", "https://platform.openai.com/docs/models/gpt-4o-audio", "https://platform.openai.com/docs/models/gpt-4o-audio", APIPricing(input_price_per_1m=2.50, output_price_per_1m=10.00, cached_input_price_per_1m=1.25), BenchmarkScores(arena_elo=1270, mmlu_pro=74.0, gpqa=49.0, swe_bench=34.0)),
    ("o1", "openai", "OpenAI", "o1 (Latest)", "Frontier", False, "Proprietary", None, "Chain-of-Thought RL", 200000, 100000, ["text", "vision"], "강화학습 심층 추론 정식 플래그십", "https://platform.openai.com/docs/models/o1", "https://platform.openai.com/docs/models/o1", APIPricing(input_price_per_1m=15.00, output_price_per_1m=60.00, cached_input_price_per_1m=7.50), BenchmarkScores(arena_elo=1355, mmlu_pro=89.0, gpqa=78.2, swe_bench=61.8)),
    ("o1-2024-12-17", "openai", "OpenAI", "o1 (2024-12-17)", "Frontier", False, "Proprietary", None, "Chain-of-Thought RL", 200000, 100000, ["text", "vision"], "o1 정식 릴리스 12월 스냅샷", "https://platform.openai.com/docs/models/o1", "https://platform.openai.com/docs/models/o1", APIPricing(input_price_per_1m=15.00, output_price_per_1m=60.00, cached_input_price_per_1m=7.50), BenchmarkScores(arena_elo=1355, mmlu_pro=89.0, gpqa=78.2, swe_bench=61.8)),
    ("o1-preview", "openai", "OpenAI", "o1-preview", "Frontier", False, "Proprietary", None, "Chain-of-Thought RL", 128000, 32768, ["text"], "o1 초기 공개 프리뷰 스냅샷", "https://platform.openai.com/docs/models/o1", "https://platform.openai.com/docs/models/o1", APIPricing(input_price_per_1m=15.00, output_price_per_1m=60.00, cached_input_price_per_1m=7.50), BenchmarkScores(arena_elo=1330, mmlu_pro=85.0, gpqa=72.0, swe_bench=53.0)),
    ("o1-mini", "openai", "OpenAI", "o1-mini (Latest)", "Small", False, "Proprietary", None, "Chain-of-Thought RL", 128000, 65536, ["text"], "o1 고속 경량 추론 전용 모델", "https://platform.openai.com/docs/models/o1", "https://platform.openai.com/docs/models/o1", APIPricing(input_price_per_1m=3.00, output_price_per_1m=12.00, cached_input_price_per_1m=1.50), BenchmarkScores(arena_elo=1290, mmlu_pro=77.0, gpqa=60.0, swe_bench=45.0)),
    ("o1-mini-2024-09-12", "openai", "OpenAI", "o1-mini (2024-09-12)", "Small", False, "Proprietary", None, "Chain-of-Thought RL", 128000, 65536, ["text"], "o1-mini 9월 스냅샷", "https://platform.openai.com/docs/models/o1", "https://platform.openai.com/docs/models/o1", APIPricing(input_price_per_1m=3.00, output_price_per_1m=12.00, cached_input_price_per_1m=1.50), BenchmarkScores(arena_elo=1290, mmlu_pro=77.0, gpqa=60.0, swe_bench=45.0)),
    ("o3-mini", "openai", "OpenAI", "o3-mini (Latest)", "Small", False, "Proprietary", None, "Chain-of-Thought RL", 200000, 100000, ["text"], "2025 최신 o3 세대 논리/코딩 추론 모델", "https://platform.openai.com/docs/models/o3-mini", "https://platform.openai.com/docs/models/o3-mini", APIPricing(input_price_per_1m=1.10, output_price_per_1m=4.40, cached_input_price_per_1m=0.55), BenchmarkScores(arena_elo=1305, mmlu_pro=79.5, gpqa=62.0, swe_bench=47.2)),
    ("o3-mini-2025-01-31", "openai", "OpenAI", "o3-mini (2025-01-31)", "Small", False, "Proprietary", None, "Chain-of-Thought RL", 200000, 100000, ["text"], "o3-mini 1월 스냅샷", "https://platform.openai.com/docs/models/o3-mini", "https://platform.openai.com/docs/models/o3-mini", APIPricing(input_price_per_1m=1.10, output_price_per_1m=4.40, cached_input_price_per_1m=0.55), BenchmarkScores(arena_elo=1305, mmlu_pro=79.5, gpqa=62.0, swe_bench=47.2)),
    ("gpt-4-turbo", "openai", "OpenAI", "GPT-4 Turbo (Latest)", "Mid", False, "Proprietary", None, "Dense", 128000, 4096, ["text", "vision"], "GPT-4 가속 버전 최신 릴리스", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", APIPricing(input_price_per_1m=10.00, output_price_per_1m=30.00, cached_input_price_per_1m=5.00), BenchmarkScores(arena_elo=1250, mmlu_pro=73.2, gpqa=49.0, swe_bench=33.0)),
    ("gpt-4-turbo-2024-04-09", "openai", "OpenAI", "GPT-4 Turbo (2024-04-09)", "Mid", False, "Proprietary", None, "Dense", 128000, 4096, ["text", "vision"], "비전 통합 GPT-4 Turbo 스냅샷", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", APIPricing(input_price_per_1m=10.00, output_price_per_1m=30.00, cached_input_price_per_1m=5.00), BenchmarkScores(arena_elo=1250, mmlu_pro=73.2, gpqa=49.0, swe_bench=33.0)),
    ("gpt-4-0125-preview", "openai", "OpenAI", "GPT-4 Turbo Preview (0125)", "Mid", False, "Proprietary", None, "Dense", 128000, 4096, ["text"], "코드 생성 수정을 거친 프리뷰", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", APIPricing(input_price_per_1m=10.00, output_price_per_1m=30.00, cached_input_price_per_1m=5.00), BenchmarkScores(arena_elo=1245, mmlu_pro=72.5, gpqa=48.0, swe_bench=32.0)),
    ("gpt-4-1106-preview", "openai", "OpenAI", "GPT-4 Turbo Preview (1106)", "Mid", False, "Proprietary", None, "Dense", 128000, 4096, ["text"], "DevDay 최초 공개 128k 프리뷰", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", APIPricing(input_price_per_1m=10.00, output_price_per_1m=30.00, cached_input_price_per_1m=5.00), BenchmarkScores(arena_elo=1240, mmlu_pro=72.0, gpqa=47.0, swe_bench=31.0)),
    ("gpt-4-vision-preview", "openai", "OpenAI", "GPT-4 Vision Preview (1106)", "Mid", False, "Proprietary", None, "Dense", 128000, 4096, ["text", "vision"], "초기 비전 지원 프리뷰 스냅샷", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", APIPricing(input_price_per_1m=10.00, output_price_per_1m=30.00, cached_input_price_per_1m=5.00), BenchmarkScores(arena_elo=1235, mmlu_pro=71.0, gpqa=46.0, swe_bench=30.0)),
    ("gpt-4-0613", "openai", "OpenAI", "GPT-4 (0613)", "Mid", False, "Proprietary", None, "Dense", 8192, 4096, ["text"], "오리지널 8k 고정밀 텍스트 모델", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", APIPricing(input_price_per_1m=30.00, output_price_per_1m=60.00, cached_input_price_per_1m=15.00), BenchmarkScores(arena_elo=1185, mmlu_pro=64.8, gpqa=39.0, swe_bench=22.0)),
    ("gpt-4-32k-0613", "openai", "OpenAI", "GPT-4 32k (0613)", "Mid", False, "Proprietary", None, "Dense", 32768, 8192, ["text"], "오리지널 32k 고장문 스냅샷", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo", APIPricing(input_price_per_1m=60.00, output_price_per_1m=120.00, cached_input_price_per_1m=30.00), BenchmarkScores(arena_elo=1190, mmlu_pro=65.0, gpqa=40.0, swe_bench=23.0)),
    ("gpt-3.5-turbo-0125", "openai", "OpenAI", "GPT-3.5 Turbo (0125)", "Small", False, "Proprietary", None, "Dense", 16385, 4096, ["text"], "16k 컨텍스트 및 이행 능력 향상 최신 스냅샷", "https://platform.openai.com/docs/models/gpt-3-5-turbo", "https://platform.openai.com/docs/models/gpt-3-5-turbo", APIPricing(input_price_per_1m=0.50, output_price_per_1m=1.50, cached_input_price_per_1m=0.25), BenchmarkScores(arena_elo=1115, mmlu_pro=52.0, gpqa=25.0, swe_bench=12.0)),
    ("gpt-3.5-turbo-1106", "openai", "OpenAI", "GPT-3.5 Turbo (1106)", "Small", False, "Proprietary", None, "Dense", 16385, 4096, ["text"], "16k 기본 탑재 11월 스냅샷", "https://platform.openai.com/docs/models/gpt-3-5-turbo", "https://platform.openai.com/docs/models/gpt-3-5-turbo", APIPricing(input_price_per_1m=1.00, output_price_per_1m=2.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1110, mmlu_pro=51.0, gpqa=24.0, swe_bench=11.0)),
    ("gpt-3.5-turbo-instruct", "openai", "OpenAI", "GPT-3.5 Turbo Instruct", "Small", False, "Proprietary", None, "Dense", 4096, 4096, ["text"], "Direct completion 전용 instruct 모델", "https://platform.openai.com/docs/models/gpt-3-5-turbo", "https://platform.openai.com/docs/models/gpt-3-5-turbo", APIPricing(input_price_per_1m=1.50, output_price_per_1m=2.00, cached_input_price_per_1m=0.75), BenchmarkScores(arena_elo=1100, mmlu_pro=49.0, gpqa=22.0, swe_bench=10.0)),
    ("text-embedding-3-large", "openai", "OpenAI", "Text Embedding 3 Large", "Micro", False, "Proprietary", None, "Embedding", 8191, 0, ["text"], "3072차원 최상위 벡터 임베딩", "https://platform.openai.com/docs/models/embeddings", "https://platform.openai.com/docs/models/embeddings", APIPricing(input_price_per_1m=0.13, output_price_per_1m=0.00, cached_input_price_per_1m=0.06), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),

    # ==================== Anthropic Official Catalog (12개) ====================
    # Source: https://docs.anthropic.com/en/docs/about-claude/models
    ("claude-opus-5", "anthropic", "Anthropic", "Claude Opus 5", "Frontier", False, "Proprietary", None, "Dense", 200000, 16384, ["text", "vision"], "최고 수준 지능 및 문서 분석 최상위 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=5.00, output_price_per_1m=25.00, cached_input_price_per_1m=1.25), BenchmarkScores(arena_elo=1392, mmlu_pro=90.1, gpqa=78.4, swe_bench=68.2)),
    ("claude-sonnet-5", "anthropic", "Anthropic", "Claude Sonnet 5", "Mid", False, "Proprietary", None, "Dense", 200000, 8192, ["text", "vision"], "성능과 속도 표준 주력 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=2.00, output_price_per_1m=10.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1345, mmlu_pro=84.8, gpqa=69.5, swe_bench=54.8)),
    ("claude-haiku-4.5", "anthropic", "Anthropic", "Claude Haiku 4.5", "Small", False, "Proprietary", None, "Dense", 200000, 8192, ["text", "vision"], "초고속 핑퐁 대화 특화 소형 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=1.00, output_price_per_1m=5.00, cached_input_price_per_1m=0.25), BenchmarkScores(arena_elo=1295, mmlu_pro=78.8, gpqa=59.4, swe_bench=42.0)),
    ("claude-3-5-sonnet-20241022", "anthropic", "Anthropic", "Claude 3.5 Sonnet (20241022)", "Mid", False, "Proprietary", None, "Dense", 200000, 8192, ["text", "vision"], "Computer Use 및 코딩 기능 업그레이드 최신 릴리스", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=3.00, output_price_per_1m=15.00, cached_input_price_per_1m=0.75), BenchmarkScores(arena_elo=1282, mmlu_pro=77.5, gpqa=59.4, swe_bench=49.0)),
    ("claude-3-5-sonnet-20240620", "anthropic", "Anthropic", "Claude 3.5 Sonnet (20240620)", "Mid", False, "Proprietary", None, "Dense", 200000, 8192, ["text", "vision"], "3.5 Sonnet 오리지널 릴리스 스냅샷", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=3.00, output_price_per_1m=15.00, cached_input_price_per_1m=0.75), BenchmarkScores(arena_elo=1275, mmlu_pro=76.8, gpqa=58.5, swe_bench=45.0)),
    ("claude-3-5-haiku-20241022", "anthropic", "Anthropic", "Claude 3.5 Haiku (20241022)", "Small", False, "Proprietary", None, "Dense", 200000, 8192, ["text"], "Opus급 지능을 가진 초고속 3.5 Haiku 스냅샷", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=0.80, output_price_per_1m=4.00, cached_input_price_per_1m=0.20), BenchmarkScores(arena_elo=1240, mmlu_pro=71.2, gpqa=48.0, swe_bench=33.5)),
    ("claude-3-opus-20240229", "anthropic", "Anthropic", "Claude 3 Opus (20240229)", "Frontier", False, "Proprietary", None, "Dense", 200000, 4096, ["text", "vision"], "Claude 3 세대 최상위 플래그십", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=15.00, output_price_per_1m=75.00, cached_input_price_per_1m=3.75), BenchmarkScores(arena_elo=1256, mmlu_pro=75.0, gpqa=50.4, swe_bench=38.0)),
    ("claude-3-sonnet-20240229", "anthropic", "Anthropic", "Claude 3 Sonnet (20240229)", "Mid", False, "Proprietary", None, "Dense", 200000, 4096, ["text", "vision"], "Claude 3 세대 표준 주력 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=3.00, output_price_per_1m=15.00, cached_input_price_per_1m=0.75), BenchmarkScores(arena_elo=1200, mmlu_pro=65.0, gpqa=40.0, swe_bench=25.0)),
    ("claude-3-haiku-20240307", "anthropic", "Anthropic", "Claude 3 Haiku (20240307)", "Small", False, "Proprietary", None, "Dense", 200000, 4096, ["text", "vision"], "Claude 3 세대 고속 경량 스냅샷", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=0.25, output_price_per_1m=1.25, cached_input_price_per_1m=0.06), BenchmarkScores(arena_elo=1180, mmlu_pro=59.0, gpqa=32.0, swe_bench=20.0)),
    ("claude-2.1", "anthropic", "Anthropic", "Claude 2.1", "Mid", False, "Proprietary", None, "Dense", 200000, 4096, ["text"], "200k 컨텍스트 초기 지원 레거시 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=8.00, output_price_per_1m=24.00, cached_input_price_per_1m=2.00), BenchmarkScores(arena_elo=1150, mmlu_pro=55.0, gpqa=28.0, swe_bench=15.0)),
    ("claude-2.0", "anthropic", "Anthropic", "Claude 2.0", "Mid", False, "Proprietary", None, "Dense", 100000, 4096, ["text"], "Claude 2세대 초기 대화 레거시 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=8.00, output_price_per_1m=24.00, cached_input_price_per_1m=2.00), BenchmarkScores(arena_elo=1130, mmlu_pro=52.0, gpqa=25.0, swe_bench=12.0)),
    ("claude-instant-1.2", "anthropic", "Anthropic", "Claude Instant 1.2", "Micro", False, "Proprietary", None, "Dense", 100000, 4096, ["text"], "초저지연 레거시 대화 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=0.80, output_price_per_1m=2.40, cached_input_price_per_1m=0.20), BenchmarkScores(arena_elo=1110, mmlu_pro=48.0, gpqa=22.0, swe_bench=10.0)),

    # ==================== Google AI Official Catalog (14개) ====================
    # Source: https://ai.google.dev/gemini-api/docs/models/gemini
    ("gemini-3.1-pro", "google", "Google AI", "Gemini 3.1 Pro", "Frontier", False, "Proprietary", None, "Native Multimodal", 2000000, 8192, ["text", "vision", "audio", "video"], "200만 컨텍스트 및 옴니 전 영역 통합 처리 플래그십", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=2.00, output_price_per_1m=12.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1360, mmlu_pro=87.2, gpqa=73.1, swe_bench=56.0)),
    ("gemini-3.6-flash", "google", "Google AI", "Gemini 3.6 Flash", "Mid", False, "Proprietary", None, "Native Multimodal", 1000000, 8192, ["text", "vision", "audio"], "Google 메인 고속 서빙 모델", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=1.50, output_price_per_1m=7.50, cached_input_price_per_1m=0.38), BenchmarkScores(arena_elo=1315, mmlu_pro=80.5, gpqa=63.4, swe_bench=45.0)),
    ("gemini-3.5-flash-lite", "google", "Google AI", "Gemini 3.5 Flash-Lite", "Small", False, "Proprietary", None, "Native Multimodal", 1000000, 8192, ["text", "vision"], "1M 토큰 당 단가 효율성 최상위 모델", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=0.30, output_price_per_1m=2.50, cached_input_price_per_1m=0.08), BenchmarkScores(arena_elo=1260, mmlu_pro=74.1, gpqa=52.0, swe_bench=34.0)),
    ("gemini-2.0-flash-exp", "google", "Google AI", "Gemini 2.0 Flash (Experimental)", "Mid", False, "Proprietary", None, "Native Multimodal", 1000000, 8192, ["text", "vision", "audio"], "속도와 멀티모달 능력을 강화한 실험 버전", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=0.10, output_price_per_1m=0.40, cached_input_price_per_1m=0.025), BenchmarkScores(arena_elo=1300, mmlu_pro=79.0, gpqa=61.0, swe_bench=42.0)),
    ("gemini-2.0-flash-thinking-exp", "google", "Google AI", "Gemini 2.0 Flash Thinking", "Frontier", False, "Proprietary", None, "Native Multimodal RL", 1000000, 8192, ["text", "vision"], "생각 과정을 노출하는 추론 특화 실험 버전", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.60, cached_input_price_per_1m=0.035), BenchmarkScores(arena_elo=1335, mmlu_pro=84.0, gpqa=70.0, swe_bench=52.0)),
    ("gemini-1.5-pro-002", "google", "Google AI", "Gemini 1.5 Pro (002)", "Mid", False, "Proprietary", None, "Native Multimodal MoE", 2000000, 8192, ["text", "vision", "audio", "video"], "200만 토큰 정식 안정화 스냅샷", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=3.50, output_price_per_1m=10.50, cached_input_price_per_1m=0.875), BenchmarkScores(arena_elo=1262, mmlu_pro=74.5, gpqa=50.0, swe_bench=35.0)),
    ("gemini-1.5-pro-001", "google", "Google AI", "Gemini 1.5 Pro (001)", "Mid", False, "Proprietary", None, "Native Multimodal MoE", 1000000, 8192, ["text", "vision", "audio"], "1.5 Pro 오리지널 릴리스 스냅샷", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=3.50, output_price_per_1m=10.50, cached_input_price_per_1m=0.875), BenchmarkScores(arena_elo=1255, mmlu_pro=73.5, gpqa=49.0, swe_bench=33.0)),
    ("gemini-1.5-flash-002", "google", "Google AI", "Gemini 1.5 Flash (002)", "Small", False, "Proprietary", None, "Native Multimodal MoE", 1000000, 8192, ["text", "vision", "audio"], "최신 1.5 Flash 002 스냅샷", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=0.075, output_price_per_1m=0.30, cached_input_price_per_1m=0.018), BenchmarkScores(arena_elo=1205, mmlu_pro=64.0, gpqa=37.5, swe_bench=22.0)),
    ("gemini-1.5-flash-8b", "google", "Google AI", "Gemini 1.5 Flash-8B", "Micro", False, "Proprietary", None, "Native Multimodal", 1000000, 8192, ["text", "vision"], "8B 스케일 초저비용 대량 변환용 모델", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=0.0375, output_price_per_1m=0.15, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1170, mmlu_pro=56.0, gpqa=30.0, swe_bench=17.5)),
    ("gemini-1.0-pro-001", "google", "Google AI", "Gemini 1.0 Pro (001)", "Small", False, "Proprietary", None, "Native Multimodal", 32768, 2048, ["text"], "초기 Gemini 1.0 세대 대화 스냅샷", "https://ai.google.dev/gemini-api/docs/models/gemini", "https://ai.google.dev/gemini-api/docs/models/gemini", APIPricing(input_price_per_1m=0.50, output_price_per_1m=1.50, cached_input_price_per_1m=0.25), BenchmarkScores(arena_elo=1120, mmlu_pro=53.0, gpqa=26.0, swe_bench=13.0)),
    ("gemma-2-27b", "google", "Google AI", "Gemma 2 27B", "Mid", True, "Gemma Terms", 27.0, "Dense", 8192, 4096, ["text"], "Google 오픈웨이트 27B 대표 모델", "https://ai.google.dev/gemma", "https://ai.google.dev/gemma", APIPricing(input_price_per_1m=0.27, output_price_per_1m=0.27, cached_input_price_per_1m=0.06), BenchmarkScores(arena_elo=1240, mmlu_pro=71.0, gpqa=43.0, swe_bench=28.0)),
    ("gemma-2-9b", "google", "Google AI", "Gemma 2 9B", "Small", True, "Gemma Terms", 9.0, "Dense", 8192, 4096, ["text"], "단일 GPU 전용 9B 오픈 모델", "https://ai.google.dev/gemma", "https://ai.google.dev/gemma", APIPricing(input_price_per_1m=0.08, output_price_per_1m=0.08, cached_input_price_per_1m=0.02), BenchmarkScores(arena_elo=1180, mmlu_pro=59.5, gpqa=33.0, swe_bench=18.0)),
    ("gemma-2-2b", "google", "Google AI", "Gemma 2 2B", "Micro", True, "Gemma Terms", 2.0, "Dense", 8192, 4096, ["text"], "모바일 Edge 온디바이스 2B 오픈 모델", "https://ai.google.dev/gemma", "https://ai.google.dev/gemma", APIPricing(input_price_per_1m=0.02, output_price_per_1m=0.02, cached_input_price_per_1m=0.005), BenchmarkScores(arena_elo=1100, mmlu_pro=45.0, gpqa=20.0, swe_bench=10.0)),
    ("gemma-7b", "google", "Google AI", "Gemma 1.0 7B", "Small", True, "Gemma Terms", 7.0, "Dense", 8192, 2048, ["text"], "1세대 7B 오픈 레거시 모델", "https://ai.google.dev/gemma", "https://ai.google.dev/gemma", APIPricing(input_price_per_1m=0.07, output_price_per_1m=0.07, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1120, mmlu_pro=50.0, gpqa=24.0, swe_bench=12.0)),

    # ==================== AWS Bedrock Official Catalog (14개) ====================
    # Source: https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html
    ("amazon-nova-premier", "aws_bedrock", "AWS Bedrock", "Amazon Nova Premier", "Frontier", False, "Proprietary (AWS)", None, "Native Multimodal", 1000000, 8192, ["text", "vision"], "Amazon 최상위 프론티어 모델. VPC 통합", "https://aws.amazon.com/bedrock/nova", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=2.00, output_price_per_1m=8.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1352, mmlu_pro=85.2, gpqa=71.0, swe_bench=54.5)),
    ("amazon-nova-pro", "aws_bedrock", "AWS Bedrock", "Amazon Nova Pro", "Mid", False, "Proprietary (AWS)", None, "Native Multimodal", 300000, 5000, ["text", "vision", "video"], "속도와 지능의 균형 멀티모달", "https://aws.amazon.com/bedrock/nova", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.80, output_price_per_1m=3.20, cached_input_price_per_1m=0.20), BenchmarkScores(arena_elo=1308, mmlu_pro=79.4, gpqa=61.8, swe_bench=44.0)),
    ("amazon-nova-lite", "aws_bedrock", "AWS Bedrock", "Amazon Nova Lite", "Small", False, "Proprietary (AWS)", None, "Native Multimodal", 300000, 5000, ["text", "vision"], "저렴한 이미지/비디오 분석 경량 모델", "https://aws.amazon.com/bedrock/nova", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.06, output_price_per_1m=0.24, cached_input_price_per_1m=0.015), BenchmarkScores(arena_elo=1235, mmlu_pro=68.0, gpqa=43.5, swe_bench=29.0)),
    ("amazon-nova-micro", "aws_bedrock", "AWS Bedrock", "Amazon Nova Micro", "Micro", False, "Proprietary (AWS)", None, "Text-only Dense", 128000, 5000, ["text"], "초저지연 대화 전용 초소형 모델", "https://aws.amazon.com/bedrock/nova", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.035, output_price_per_1m=0.14, cached_input_price_per_1m=0.009), BenchmarkScores(arena_elo=1175, mmlu_pro=57.5, gpqa=31.0, swe_bench=18.0)),
    ("amazon-titan-text-express", "aws_bedrock", "AWS Bedrock", "Amazon Titan Text Express", "Small", False, "Proprietary (AWS)", None, "Dense", 8192, 4096, ["text"], "AWS 자체 텍스트 생성 표준 모델", "https://aws.amazon.com/bedrock/titan", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.20, output_price_per_1m=0.80, cached_input_price_per_1m=0.05), BenchmarkScores(arena_elo=1130, mmlu_pro=53.0, gpqa=25.0, swe_bench=12.0)),
    ("amazon-titan-text-lite", "aws_bedrock", "AWS Bedrock", "Amazon Titan Text Lite", "Micro", False, "Proprietary (AWS)", None, "Dense", 4096, 2048, ["text"], "단순 요약 전용 AWS 초경량 모델", "https://aws.amazon.com/bedrock/titan", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.20, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1090, mmlu_pro=44.0, gpqa=20.0, swe_bench=8.0)),
    ("claude-3-5-sonnet-bedrock", "aws_bedrock", "AWS Bedrock", "Claude 3.5 Sonnet v2 (on Bedrock)", "Mid", False, "Proprietary (Hosted)", None, "Dense", 200000, 8192, ["text", "vision"], "AWS 관리형 서버리스 호스팅 Claude 3.5 Sonnet v2", "https://aws.amazon.com/bedrock/claude", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=3.00, output_price_per_1m=15.00, cached_input_price_per_1m=0.75), BenchmarkScores(arena_elo=1282, mmlu_pro=77.5, gpqa=59.4, swe_bench=49.0)),
    ("claude-3-opus-bedrock", "aws_bedrock", "AWS Bedrock", "Claude 3 Opus (on Bedrock)", "Frontier", False, "Proprietary (Hosted)", None, "Dense", 200000, 4096, ["text", "vision"], "AWS 관리형 서버리스 호스팅 Claude 3 Opus", "https://aws.amazon.com/bedrock/claude", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=15.00, output_price_per_1m=75.00, cached_input_price_per_1m=3.75), BenchmarkScores(arena_elo=1256, mmlu_pro=75.0, gpqa=50.4, swe_bench=38.0)),
    ("claude-3-haiku-bedrock", "aws_bedrock", "AWS Bedrock", "Claude 3 Haiku (on Bedrock)", "Small", False, "Proprietary (Hosted)", None, "Dense", 200000, 4096, ["text", "vision"], "AWS 관리형 서버리스 호스팅 Claude 3 Haiku", "https://aws.amazon.com/bedrock/claude", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.25, output_price_per_1m=1.25, cached_input_price_per_1m=0.06), BenchmarkScores(arena_elo=1180, mmlu_pro=59.0, gpqa=32.0, swe_bench=20.0)),
    ("llama-3-3-70b-bedrock", "aws_bedrock", "AWS Bedrock", "Llama 3.3 70B (on Bedrock)", "Mid", False, "Llama Community (Hosted)", 70.0, "Dense", 128000, 4096, ["text"], "AWS 서버리스 관리형 Llama 3.3 70B", "https://aws.amazon.com/bedrock/llama", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.72, output_price_per_1m=0.72, cached_input_price_per_1m=0.18), BenchmarkScores(arena_elo=1280, mmlu_pro=76.8, gpqa=52.5, swe_bench=38.0)),
    ("llama-3-2-90b-vision-bedrock", "aws_bedrock", "AWS Bedrock", "Llama 3.2 90B Vision (on Bedrock)", "Mid", False, "Llama Community (Hosted)", 90.0, "Multimodal", 128000, 4096, ["text", "vision"], "AWS 서버리스 호스팅 Llama 3.2 90B 비전 모델", "https://aws.amazon.com/bedrock/llama", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=0.90, output_price_per_1m=0.90, cached_input_price_per_1m=0.22), BenchmarkScores(arena_elo=1270, mmlu_pro=75.0, gpqa=51.0, swe_bench=36.0)),
    ("llama-3-1-405b-bedrock", "aws_bedrock", "AWS Bedrock", "Llama 3.1 405B (on Bedrock)", "Frontier", False, "Llama Community (Hosted)", 405.0, "Dense", 128000, 4096, ["text"], "AWS 서버리스 호스팅 Llama 3.1 405B 초대형 모델", "https://aws.amazon.com/bedrock/llama", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=2.40, output_price_per_1m=2.40, cached_input_price_per_1m=0.60), BenchmarkScores(arena_elo=1285, mmlu_pro=78.2, gpqa=55.0, swe_bench=39.5)),
    ("mistral-large-2-bedrock", "aws_bedrock", "AWS Bedrock", "Mistral Large 2 (on Bedrock)", "Frontier", False, "Proprietary (Hosted)", 123.0, "Dense", 128000, 4096, ["text"], "AWS 서버리스 호스팅 Mistral Large 2", "https://aws.amazon.com/bedrock/mistral", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=2.00, output_price_per_1m=6.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1270, mmlu_pro=75.5, gpqa=51.0, swe_bench=36.0)),
    ("cohere-command-r-plus-bedrock", "aws_bedrock", "AWS Bedrock", "Command R+ (on Bedrock)", "Frontier", False, "CC-BY-NC-4.0 (Hosted)", 104.0, "Dense RAG", 128000, 4096, ["text"], "AWS 서버리스 호스팅 Command R+ 104B", "https://aws.amazon.com/bedrock/cohere", "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html", APIPricing(input_price_per_1m=3.00, output_price_per_1m=15.00, cached_input_price_per_1m=0.75), BenchmarkScores(arena_elo=1258, mmlu_pro=74.2, gpqa=48.0, swe_bench=35.0)),

    # ==================== DeepSeek Official Catalog (8개) ====================
    # Source: https://api-docs.deepseek.com
    ("deepseek-v4-pro", "deepseek", "DeepSeek", "DeepSeek V4 Pro", "Frontier", True, "MIT", 671.0, "MoE (Active 37B)", 128000, 8192, ["text"], "글로벌 탑티어 오픈웨이트 MoE", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.55, output_price_per_1m=2.19, cached_input_price_per_1m=0.14), BenchmarkScores(arena_elo=1370, mmlu_pro=88.5, gpqa=75.2, swe_bench=64.1)),
    ("deepseek-r1", "deepseek", "DeepSeek", "DeepSeek R1 (Reasoning)", "Frontier", True, "MIT", 671.0, "MoE RL Reasoning", 128000, 8192, ["text"], "o1 수준 강화학습 심층 추론 모델", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.55, output_price_per_1m=2.19, cached_input_price_per_1m=0.14), BenchmarkScores(arena_elo=1358, mmlu_pro=87.9, gpqa=75.7, swe_bench=60.5)),
    ("deepseek-v3", "deepseek", "DeepSeek", "DeepSeek V3", "Mid", True, "MIT", 671.0, "MoE (Active 37B)", 128000, 8192, ["text"], "671B 오픈소스 기준 표준 모델", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.27, output_price_per_1m=1.10, cached_input_price_per_1m=0.07), BenchmarkScores(arena_elo=1310, mmlu_pro=80.1, gpqa=62.5, swe_bench=49.2)),
    ("deepseek-coder-v2", "deepseek", "DeepSeek", "DeepSeek Coder V2 (236B)", "Mid", True, "MIT", 236.0, "MoE (Active 21B)", 128000, 8192, ["text"], "338개 언어 지원 코딩 특화 모델", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.14, output_price_per_1m=0.28, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1268, mmlu_pro=74.8, gpqa=52.1, swe_bench=43.5)),
    ("deepseek-math-7b", "deepseek", "DeepSeek", "DeepSeek Math 7B", "Small", True, "MIT", 7.0, "Dense", 4096, 2048, ["text"], "수학 증명 7B 소형 오픈소스 모델", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.07, output_price_per_1m=0.14, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1210, mmlu_pro=65.0, gpqa=46.0, swe_bench=25.0)),
    ("deepseek-llm-67b", "deepseek", "DeepSeek", "DeepSeek LLM 67B", "Mid", True, "MIT", 67.0, "Dense", 4096, 4096, ["text"], "초기 67B 오리지널 모델", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.20, output_price_per_1m=0.40, cached_input_price_per_1m=0.05), BenchmarkScores(arena_elo=1225, mmlu_pro=68.0, gpqa=41.0, swe_bench=26.0)),
    ("deepseek-coder-33b", "deepseek", "DeepSeek", "DeepSeek Coder 33B", "Small", True, "MIT", 33.0, "Dense", 16384, 4096, ["text"], "1세대 33B 코드 모델", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.12, output_price_per_1m=0.24, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1200, mmlu_pro=63.0, gpqa=36.0, swe_bench=30.0)),
    ("deepseek-v2-5", "deepseek", "DeepSeek", "DeepSeek V2.5", "Mid", True, "MIT", 236.0, "MoE", 128000, 8192, ["text"], "Coder V2와 Chat 기능 통합 버전", "https://api-docs.deepseek.com", "https://api-docs.deepseek.com", APIPricing(input_price_per_1m=0.14, output_price_per_1m=0.28, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1270, mmlu_pro=75.0, gpqa=53.0, swe_bench=41.0)),

    # ==================== Meta AI Official Catalog (15개) ====================
    # Source: https://llama.meta.com/docs/model-cards-and-prompt-formats
    ("llama-4-70b", "meta", "Meta AI", "Llama 4 Scout 70B", "Mid", True, "Llama Community", 70.0, "Dense", 10000000, 8192, ["text", "vision"], "1,000만 토큰 스캐닝 Llama 4 라인업", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.60, output_price_per_1m=1.80, cached_input_price_per_1m=0.15), BenchmarkScores(arena_elo=1330, mmlu_pro=83.0, gpqa=65.5, swe_bench=49.0)),
    ("llama-3-3-70b-instruct", "meta", "Meta AI", "Llama 3.3 70B Instruct", "Mid", True, "Llama Community", 70.0, "Dense", 128000, 8192, ["text"], "405B급 지능을 70B 파라미터로 압축한 오픈 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.40, output_price_per_1m=1.20, cached_input_price_per_1m=0.10), BenchmarkScores(arena_elo=1280, mmlu_pro=76.8, gpqa=52.5, swe_bench=38.0)),
    ("llama-3-2-90b-vision", "meta", "Meta AI", "Llama 3.2 90B Vision", "Mid", True, "Llama Community", 90.0, "Multimodal", 128000, 4096, ["text", "vision"], "Meta 대표 90B 비전 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.90, output_price_per_1m=0.90, cached_input_price_per_1m=0.22), BenchmarkScores(arena_elo=1270, mmlu_pro=75.0, gpqa=51.0, swe_bench=36.0)),
    ("llama-3-2-11b-vision", "meta", "Meta AI", "Llama 3.2 11B Vision", "Small", True, "Llama Community", 11.0, "Multimodal", 128000, 4096, ["text", "vision"], "경량화 11B 비전 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.16, output_price_per_1m=0.16, cached_input_price_per_1m=0.04), BenchmarkScores(arena_elo=1200, mmlu_pro=61.0, gpqa=36.0, swe_bench=21.0)),
    ("llama-3-2-3b", "meta", "Meta AI", "Llama 3.2 3B", "Micro", True, "Llama Community", 3.0, "Dense", 128000, 4096, ["text"], "모바일 디바이스 3B 경량 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.04, output_price_per_1m=0.04, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1140, mmlu_pro=50.0, gpqa=26.0, swe_bench=12.0)),
    ("llama-3-2-1b", "meta", "Meta AI", "Llama 3.2 1B", "Micro", True, "Llama Community", 1.0, "Dense", 128000, 4096, ["text"], "1B 온디바이스 초소형 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.02, output_price_per_1m=0.02, cached_input_price_per_1m=0.005), BenchmarkScores(arena_elo=1080, mmlu_pro=40.0, gpqa=18.0, swe_bench=6.0)),
    ("llama-3-1-405b-instruct", "meta", "Meta AI", "Llama 3.1 405B Instruct", "Frontier", True, "Llama Community", 405.0, "Dense", 128000, 4096, ["text"], "405B 프론티어 오픈 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=2.00, output_price_per_1m=6.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1285, mmlu_pro=78.2, gpqa=55.0, swe_bench=39.5)),
    ("llama-3-1-70b-instruct", "meta", "Meta AI", "Llama 3.1 70B Instruct", "Mid", True, "Llama Community", 70.0, "Dense", 128000, 4096, ["text"], "3.1 세대 70B 표준 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.45, output_price_per_1m=1.35, cached_input_price_per_1m=0.11), BenchmarkScores(arena_elo=1260, mmlu_pro=74.0, gpqa=49.0, swe_bench=33.0)),
    ("llama-3-1-8b-instruct", "meta", "Meta AI", "Llama 3.1 8B Instruct", "Small", True, "Llama Community", 8.0, "Dense", 128000, 4096, ["text"], "8B 경량 오픈 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.05, output_price_per_1m=0.15, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1180, mmlu_pro=58.2, gpqa=32.0, swe_bench=19.5)),
    ("llama-3-70b-instruct", "meta", "Meta AI", "Llama 3 70B Instruct", "Mid", True, "Llama Community", 70.0, "Dense", 8192, 2048, ["text"], "Llama 3 1세대 70B 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.50, output_price_per_1m=1.50, cached_input_price_per_1m=0.12), BenchmarkScores(arena_elo=1240, mmlu_pro=71.0, gpqa=44.0, swe_bench=28.0)),
    ("llama-3-8b-instruct", "meta", "Meta AI", "Llama 3 8B Instruct", "Small", True, "Llama Community", 8.0, "Dense", 8192, 2048, ["text"], "Llama 3 1세대 8B 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.06, output_price_per_1m=0.06, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1150, mmlu_pro=53.0, gpqa=28.0, swe_bench=15.0)),
    ("llama-2-70b-chat", "meta", "Meta AI", "Llama 2 70B Chat", "Mid", True, "Llama 2 License", 70.0, "Dense", 4096, 2048, ["text"], "Llama 2세대 레거시 70B 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.70, output_price_per_1m=0.70, cached_input_price_per_1m=0.15), BenchmarkScores(arena_elo=1100, mmlu_pro=49.0, gpqa=22.0, swe_bench=8.0)),
    ("code-llama-70b", "meta", "Meta AI", "Code Llama 70B", "Mid", True, "Llama 2 License", 70.0, "Dense", 16384, 4096, ["text"], "코드 전용 70B 모델", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.70, output_price_per_1m=0.70, cached_input_price_per_1m=0.15), BenchmarkScores(arena_elo=1150, mmlu_pro=55.0, gpqa=30.0, swe_bench=28.0)),

    # ==================== Alibaba Qwen Official Catalog (16개) ====================
    # Source: https://qwenlm.github.io
    ("qwen-3.6-72b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 3.6 72B", "Mid", True, "Apache 2.0", 72.0, "Dense", 128000, 8192, ["text", "vision"], "다국어 및 코딩 탑티어 Apache 2.0 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.40, output_price_per_1m=1.20, cached_input_price_per_1m=0.10), BenchmarkScores(arena_elo=1325, mmlu_pro=82.1, gpqa=64.0, swe_bench=48.5)),
    ("qwen-2-5-max", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 Max", "Frontier", False, "Proprietary API", None, "MoE", 128000, 8192, ["text", "vision"], "Alibaba 플래그십 상용 API", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=1.60, output_price_per_1m=6.40, cached_input_price_per_1m=0.40), BenchmarkScores(arena_elo=1342, mmlu_pro=85.0, gpqa=68.5, swe_bench=52.0)),
    ("qwen-2-5-plus", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 Plus", "Mid", False, "Proprietary API", None, "Dense", 128000, 8192, ["text"], "상용 클라우드 주력 API", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.40, output_price_per_1m=1.20, cached_input_price_per_1m=0.10), BenchmarkScores(arena_elo=1295, mmlu_pro=78.5, gpqa=60.0, swe_bench=42.0)),
    ("qwen-2-5-turbo", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 Turbo", "Small", False, "Proprietary API", None, "Dense", 1000000, 8192, ["text"], "1M 장문 가성비 API", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.05, output_price_per_1m=0.20, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1240, mmlu_pro=70.0, gpqa=45.0, swe_bench=30.0)),
    ("qwen-2-5-coder-32b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 Coder 32B", "Mid", True, "Apache 2.0", 32.0, "Dense", 128000, 8192, ["text"], "32B GPT-4o급 코딩 오픈 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.20, output_price_per_1m=0.60, cached_input_price_per_1m=0.05), BenchmarkScores(arena_elo=1275, mmlu_pro=76.2, gpqa=54.0, swe_bench=45.2)),
    ("qwen-2-5-coder-14b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 Coder 14B", "Small", True, "Apache 2.0", 14.0, "Dense", 128000, 8192, ["text"], "14B 코딩 특화 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.10, output_price_per_1m=0.30, cached_input_price_per_1m=0.02), BenchmarkScores(arena_elo=1220, mmlu_pro=68.0, gpqa=44.0, swe_bench=36.0)),
    ("qwen-2-5-coder-7b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 Coder 7B", "Small", True, "Apache 2.0", 7.0, "Dense", 128000, 8192, ["text"], "7B 경량 코드 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.05, output_price_per_1m=0.15, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1170, mmlu_pro=58.0, gpqa=32.0, swe_bench=28.0)),
    ("qwen-2-5-72b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 72B", "Mid", True, "Apache 2.0", 72.0, "Dense", 128000, 8192, ["text"], "72B 오픈웨이트 표준", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.35, output_price_per_1m=1.05, cached_input_price_per_1m=0.08), BenchmarkScores(arena_elo=1282, mmlu_pro=77.0, gpqa=58.0, swe_bench=39.0)),
    ("qwen-2-5-32b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 32B", "Mid", True, "Apache 2.0", 32.0, "Dense", 128000, 8192, ["text"], "32B 표준 오픈 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.20, output_price_per_1m=0.60, cached_input_price_per_1m=0.05), BenchmarkScores(arena_elo=1240, mmlu_pro=71.0, gpqa=48.0, swe_bench=31.0)),
    ("qwen-2-5-14b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 14B", "Small", True, "Apache 2.0", 14.0, "Dense", 128000, 8192, ["text"], "14B 가성비 오픈 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.10, output_price_per_1m=0.30, cached_input_price_per_1m=0.02), BenchmarkScores(arena_elo=1210, mmlu_pro=65.0, gpqa=40.0, swe_bench=24.0)),
    ("qwen-2-5-7b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 7B", "Small", True, "Apache 2.0", 7.0, "Dense", 128000, 8192, ["text"], "7B 초소형 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.05, output_price_per_1m=0.15, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1190, mmlu_pro=61.0, gpqa=35.0, swe_bench=22.5)),
    ("qwen-2-5-3b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 3B", "Micro", True, "Apache 2.0", 3.0, "Dense", 32000, 4096, ["text"], "3B 온디바이스 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.03, output_price_per_1m=0.09, cached_input_price_per_1m=0.005), BenchmarkScores(arena_elo=1120, mmlu_pro=48.0, gpqa=24.0, swe_bench=12.0)),
    ("qwen-2-5-vl-72b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 VL 72B", "Mid", True, "Apache 2.0", 72.0, "Multimodal", 128000, 8192, ["text", "vision", "video"], "72B 비디오 이해 멀티모달 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.45, output_price_per_1m=1.35, cached_input_price_per_1m=0.11), BenchmarkScores(arena_elo=1300, mmlu_pro=80.0, gpqa=62.0, swe_bench=44.0)),
    ("qwen-2-5-vl-7b", "alibaba", "Alibaba Cloud (Qwen)", "Qwen 2.5 VL 7B", "Small", True, "Apache 2.0", 7.0, "Multimodal", 128000, 8192, ["text", "vision"], "7B 경량 비전 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.08, output_price_per_1m=0.24, cached_input_price_per_1m=0.02), BenchmarkScores(arena_elo=1200, mmlu_pro=63.0, gpqa=38.0, swe_bench=22.0)),
    ("qwq-32b-preview", "alibaba", "Alibaba Cloud (Qwen)", "QwQ 32B Preview (Reasoning)", "Mid", True, "Apache 2.0", 32.0, "Chain-of-Thought RL", 32000, 8192, ["text"], "추론 특화 32B 오픈 모델", "https://qwenlm.github.io", "https://qwenlm.github.io", APIPricing(input_price_per_1m=0.25, output_price_per_1m=0.75, cached_input_price_per_1m=0.06), BenchmarkScores(arena_elo=1310, mmlu_pro=82.0, gpqa=67.0, swe_bench=48.0)),

    # ==================== Mistral AI Official Catalog (12개) ====================
    # Source: https://docs.mistral.ai/getting-started/models/models_overview
    ("mistral-large-3", "mistral", "Mistral AI", "Mistral Large 3", "Frontier", True, "Apache 2.0", 123.0, "Dense", 128000, 8192, ["text", "vision"], "123B 다국어 플래그십", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=2.00, output_price_per_1m=6.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1320, mmlu_pro=81.2, gpqa=61.5, swe_bench=46.0)),
    ("mistral-large-2407", "mistral", "Mistral AI", "Mistral Large 2 (2407)", "Frontier", False, "Proprietary", 123.0, "Dense", 128000, 4096, ["text"], "123B 코드/추론 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=2.00, output_price_per_1m=6.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1280, mmlu_pro=77.0, gpqa=55.0, swe_bench=40.0)),
    ("codestral-22b", "mistral", "Mistral AI", "Codestral 22B", "Mid", True, "MNPL", 22.0, "Dense", 32000, 4096, ["text"], "코드 전용 22B 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=0.30, output_price_per_1m=0.90, cached_input_price_per_1m=0.08), BenchmarkScores(arena_elo=1255, mmlu_pro=72.0, gpqa=48.5, swe_bench=41.0)),
    ("codestral-mamba-7b", "mistral", "Mistral AI", "Codestral Mamba 7B", "Small", True, "Apache 2.0", 7.0, "Mamba (SSM)", 256000, 4096, ["text"], "Mamba SSM 256k 코드 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.45, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1190, mmlu_pro=60.0, gpqa=35.0, swe_bench=25.0)),
    ("mistral-small-2409", "mistral", "Mistral AI", "Mistral Small (2409)", "Small", True, "Apache 2.0", 24.0, "Dense", 32000, 4096, ["text"], "24B 오픈 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=0.20, output_price_per_1m=0.60, cached_input_price_per_1m=0.05), BenchmarkScores(arena_elo=1230, mmlu_pro=69.0, gpqa=42.0, swe_bench=28.0)),
    ("mistral-nemo-12b", "mistral", "Mistral AI", "Mistral NeMo 12B", "Small", True, "Apache 2.0", 12.0, "Dense", 128000, 4096, ["text"], "128K 컨텍스트 12B 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.45, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1215, mmlu_pro=66.5, gpqa=38.0, swe_bench=24.0)),
    ("mixtral-8x22b", "mistral", "Mistral AI", "Mixtral 8x22B", "Mid", True, "Apache 2.0", 141.0, "MoE (Active 39B)", 64000, 4096, ["text"], "오픈소스 MoE 대표 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=0.90, output_price_per_1m=2.70, cached_input_price_per_1m=0.22), BenchmarkScores(arena_elo=1262, mmlu_pro=73.5, gpqa=49.0, swe_bench=36.5)),
    ("mixtral-8x7b", "mistral", "Mistral AI", "Mixtral 8x7B", "Small", True, "Apache 2.0", 47.0, "MoE (Active 13B)", 32000, 4096, ["text"], "8x7B MoE 대표 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=0.45, output_price_per_1m=0.45, cached_input_price_per_1m=0.10), BenchmarkScores(arena_elo=1180, mmlu_pro=60.0, gpqa=35.0, swe_bench=20.0)),
    ("pixtral-12b", "mistral", "Mistral AI", "Pixtral 12B", "Small", True, "Apache 2.0", 12.0, "Multimodal", 128000, 4096, ["text", "vision"], "12B 비전 오픈 모델", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.45, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1210, mmlu_pro=65.0, gpqa=39.0, swe_bench=22.0)),
    ("pixtral-large", "mistral", "Mistral AI", "Pixtral Large", "Frontier", False, "Proprietary", 123.0, "Multimodal", 128000, 8192, ["text", "vision"], "123B 최상위 멀티모달", "https://docs.mistral.ai", "https://docs.mistral.ai/getting-started/models/models_overview", APIPricing(input_price_per_1m=2.00, output_price_per_1m=6.00, cached_input_price_per_1m=0.50), BenchmarkScores(arena_elo=1310, mmlu_pro=80.0, gpqa=60.0, swe_bench=45.0)),

    # ==================== Microsoft Official Catalog (8개) ====================
    # Source: https://huggingface.co/microsoft
    ("phi-4-14b", "microsoft", "Microsoft", "Phi-4 14B", "Small", True, "MIT", 14.0, "Dense", 64000, 4096, ["text"], "수학/논리 추론 특화 14B 모델", "https://huggingface.co/microsoft/phi-4", "https://huggingface.co/microsoft", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.45, cached_input_price_per_1m=0.04), BenchmarkScores(arena_elo=1265, mmlu_pro=76.0, gpqa=56.8, swe_bench=38.2)),
    ("phi-4-mini-3.8b", "microsoft", "Microsoft", "Phi-4 mini (3.8B)", "Micro", True, "MIT", 3.8, "Dense", 128000, 4096, ["text"], "3.8B 고속 추론 소형 모델", "https://huggingface.co/microsoft", "https://huggingface.co/microsoft", APIPricing(input_price_per_1m=0.06, output_price_per_1m=0.18, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1210, mmlu_pro=65.0, gpqa=40.0, swe_bench=25.0)),
    ("phi-4-multimodal-5.6b", "microsoft", "Microsoft", "Phi-4 Multimodal (5.6B)", "Micro", True, "MIT", 5.6, "Multimodal", 128000, 4096, ["text", "vision", "audio"], "5.6B 옴니 멀티모달 모델", "https://huggingface.co/microsoft", "https://huggingface.co/microsoft", APIPricing(input_price_per_1m=0.08, output_price_per_1m=0.24, cached_input_price_per_1m=0.02), BenchmarkScores(arena_elo=1220, mmlu_pro=67.0, gpqa=42.0, swe_bench=26.0)),
    ("phi-3-5-mini", "microsoft", "Microsoft", "Phi-3.5 mini (3.8B)", "Micro", True, "MIT", 3.8, "Dense", 128000, 4096, ["text"], "모바일 Edge 3.8B 초소형 모델", "https://huggingface.co/microsoft", "https://huggingface.co/microsoft", APIPricing(input_price_per_1m=0.05, output_price_per_1m=0.15, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1160, mmlu_pro=54.0, gpqa=28.0, swe_bench=16.0)),
    ("phi-3-5-vision", "microsoft", "Microsoft", "Phi-3.5 Vision (4.2B)", "Micro", True, "MIT", 4.2, "Multimodal", 128000, 4096, ["text", "vision"], "경량 비전 멀티모달 모델", "https://huggingface.co/microsoft", "https://huggingface.co/microsoft", APIPricing(input_price_per_1m=0.06, output_price_per_1m=0.18, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=1170, mmlu_pro=56.0, gpqa=30.0, swe_bench=18.0)),
    ("phi-3-5-moe", "microsoft", "Microsoft", "Phi-3.5 MoE (16B)", "Small", True, "MIT", 16.0, "MoE (Active 6.6B)", 128000, 4096, ["text"], "16B MoE 소형 모델", "https://huggingface.co/microsoft", "https://huggingface.co/microsoft", APIPricing(input_price_per_1m=0.15, output_price_per_1m=0.45, cached_input_price_per_1m=0.03), BenchmarkScores(arena_elo=1230, mmlu_pro=69.0, gpqa=44.0, swe_bench=28.0)),

    # ==================== Cohere & Perplexity & Zhipu & Moonshot (15개) ====================
    # Source: https://docs.cohere.com/docs/models & https://docs.perplexity.ai/guides/model-cards
    ("cohere-command-r-plus", "cohere", "Cohere", "Command R+", "Frontier", True, "CC-BY-NC-4.0", 104.0, "Dense RAG", 128000, 4096, ["text"], "기업용 RAG 전용 104B 모델", "https://docs.cohere.com/docs/models", "https://docs.cohere.com/docs/models", APIPricing(input_price_per_1m=2.50, output_price_per_1m=10.00, cached_input_price_per_1m=0.625), BenchmarkScores(arena_elo=1258, mmlu_pro=74.2, gpqa=48.0, swe_bench=35.0)),
    ("cohere-command-r", "cohere", "Cohere", "Command R", "Mid", True, "CC-BY-NC-4.0", 35.0, "Dense RAG", 128000, 4096, ["text"], "가성비 RAG 연동 35B 모델", "https://docs.cohere.com/docs/models", "https://docs.cohere.com/docs/models", APIPricing(input_price_per_1m=0.50, output_price_per_1m=1.50, cached_input_price_per_1m=0.125), BenchmarkScores(arena_elo=1205, mmlu_pro=65.0, gpqa=38.0, swe_bench=22.0)),
    ("perplexity-sonar-pro", "perplexity", "Perplexity AI", "Sonar Pro", "Mid", False, "Proprietary API", None, "Web Search Fine-Tuned", 200000, 8192, ["text", "vision"], "실시간 웹 검색 탐색형 LLM", "https://docs.perplexity.ai/guides/model-cards", "https://docs.perplexity.ai/guides/model-cards", APIPricing(input_price_per_1m=3.00, output_price_per_1m=15.00, cached_input_price_per_1m=0.75), BenchmarkScores(arena_elo=1310, mmlu_pro=80.0, gpqa=62.0, swe_bench=42.0)),
    ("perplexity-sonar-reasoning", "perplexity", "Perplexity AI", "Sonar Reasoning", "Frontier", False, "Proprietary API", None, "DeepSeek R1 Web-Integrated", 128000, 8192, ["text"], "DeepSeek R1 웹 통합 심층 추론 API", "https://docs.perplexity.ai/guides/model-cards", "https://docs.perplexity.ai/guides/model-cards", APIPricing(input_price_per_1m=1.00, output_price_per_1m=5.00, cached_input_price_per_1m=0.25), BenchmarkScores(arena_elo=1340, mmlu_pro=86.5, gpqa=74.0, swe_bench=58.0)),
    ("glm-5-2", "zhipu", "Zhipu AI (GLM)", "GLM-5.2", "Frontier", True, "MIT", None, "Dense/MoE", 128000, 8192, ["text", "vision"], "에이전트 및 코딩 특화 GLM 신작", "https://open.bigmodel.cn/dev/howuse/model", "https://open.bigmodel.cn/dev/howuse/model", APIPricing(input_price_per_1m=0.60, output_price_per_1m=2.40, cached_input_price_per_1m=0.15), BenchmarkScores(arena_elo=1362, mmlu_pro=87.0, gpqa=73.5, swe_bench=61.0)),
    ("kimi-k2-7", "moonshot", "Moonshot AI (Kimi)", "Kimi K2.7", "Frontier", True, "Modified MIT", 1000.0, "MoE Ultra-Long Context", 2000000, 16384, ["text", "vision"], "200만 토큰 문서 이해 및 에이전트 코딩", "https://platform.moonshot.cn/docs/intro", "https://platform.moonshot.cn/docs/intro", APIPricing(input_price_per_1m=1.00, output_price_per_1m=4.00, cached_input_price_per_1m=0.25), BenchmarkScores(arena_elo=1350, mmlu_pro=85.5, gpqa=71.0, swe_bench=57.5)),
    # ==================== OpenAI 추가 공식 모델 (누락분 보완) ====================
    # Source: https://platform.openai.com/docs/models
    ("o3", "openai", "OpenAI", "o3", "Frontier", False, "Proprietary", None, "Chain-of-Thought RL", 200000, 100000, ["text", "vision"], "o시리즈 최상위 추론 모델. 복잡한 수학·과학·코딩 작업에 특화", "https://platform.openai.com/docs/models/o3", "https://platform.openai.com/docs/models/o3", APIPricing(input_price_per_1m=10.00, output_price_per_1m=40.00, cached_input_price_per_1m=2.50), BenchmarkScores(arena_elo=1370, mmlu_pro=91.0, gpqa=83.3, swe_bench=71.7)),
    ("o4-mini", "openai", "OpenAI", "o4-mini", "Small", False, "Proprietary", None, "Chain-of-Thought RL", 200000, 100000, ["text", "vision"], "o시리즈 최신 소형 고속 추론 모델. 코딩·수학 태스크 최적화", "https://platform.openai.com/docs/models/o4-mini", "https://platform.openai.com/docs/models/o4-mini", APIPricing(input_price_per_1m=1.10, output_price_per_1m=4.40, cached_input_price_per_1m=0.275), BenchmarkScores(arena_elo=1340, mmlu_pro=88.0, gpqa=79.6, swe_bench=68.1)),
    ("gpt-4-5-preview", "openai", "OpenAI", "GPT-4.5 Preview", "Frontier", False, "Proprietary", None, "Dense", 128000, 16384, ["text", "vision"], "최대 규모의 GPT 계열 모델. 감성 지능 및 창의적 글쓰기 특화", "https://platform.openai.com/docs/models/gpt-4-5", "https://platform.openai.com/docs/models/gpt-4-5", APIPricing(input_price_per_1m=75.00, output_price_per_1m=150.00, cached_input_price_per_1m=37.50), BenchmarkScores(arena_elo=1380, mmlu_pro=90.5, gpqa=77.0, swe_bench=38.0)),
    ("whisper-1", "openai", "OpenAI", "Whisper v2 Large", "Micro", False, "Proprietary", None, "Speech-to-Text", 0, 0, ["audio"], "다국어 음성 인식 및 번역. 99개 언어 지원 공식 STT API", "https://platform.openai.com/docs/models/whisper", "https://platform.openai.com/docs/models/whisper", APIPricing(input_price_per_1m=0.006, output_price_per_1m=0.00, cached_input_price_per_1m=0.006), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    ("dall-e-3", "openai", "OpenAI", "DALL-E 3", "Micro", False, "Proprietary", None, "Image Generation", 0, 0, ["image"], "텍스트 기반 고품질 이미지 생성. 1024x1024/1792x1024 지원", "https://platform.openai.com/docs/models/dall-e", "https://platform.openai.com/docs/models/dall-e", APIPricing(input_price_per_1m=0.04, output_price_per_1m=0.00, cached_input_price_per_1m=0.04), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    ("dall-e-2", "openai", "OpenAI", "DALL-E 2", "Micro", False, "Proprietary", None, "Image Generation", 0, 0, ["image"], "이미지 편집/변형(inpainting/outpainting) 지원 레거시 이미지 모델", "https://platform.openai.com/docs/models/dall-e", "https://platform.openai.com/docs/models/dall-e", APIPricing(input_price_per_1m=0.02, output_price_per_1m=0.00, cached_input_price_per_1m=0.02), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    ("tts-1", "openai", "OpenAI", "TTS-1", "Micro", False, "Proprietary", None, "Text-to-Speech", 0, 0, ["audio"], "저지연 실시간 음성 합성. 6개 음성(alloy, echo, fable, onyx, nova, shimmer)", "https://platform.openai.com/docs/models/tts", "https://platform.openai.com/docs/models/tts", APIPricing(input_price_per_1m=15.00, output_price_per_1m=0.00, cached_input_price_per_1m=15.00), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    ("tts-1-hd", "openai", "OpenAI", "TTS-1 HD", "Micro", False, "Proprietary", None, "Text-to-Speech HD", 0, 0, ["audio"], "고품질 오디오 음성 합성. 방송·미디어 수준 HD 음성 출력", "https://platform.openai.com/docs/models/tts", "https://platform.openai.com/docs/models/tts", APIPricing(input_price_per_1m=30.00, output_price_per_1m=0.00, cached_input_price_per_1m=30.00), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    ("text-embedding-3-small", "openai", "OpenAI", "Text Embedding 3 Small", "Micro", False, "Proprietary", None, "Embedding", 8191, 0, ["text"], "1536차원 고속 경량 벡터 임베딩. RAG 구축 최고 가성비", "https://platform.openai.com/docs/models/embeddings", "https://platform.openai.com/docs/models/embeddings", APIPricing(input_price_per_1m=0.02, output_price_per_1m=0.00, cached_input_price_per_1m=0.01), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    ("text-embedding-ada-002", "openai", "OpenAI", "Text Embedding Ada-002", "Micro", False, "Proprietary", None, "Embedding", 8191, 0, ["text"], "1536차원 2세대 임베딩. 기존 레거시 시스템 호환성 유지", "https://platform.openai.com/docs/models/embeddings", "https://platform.openai.com/docs/models/embeddings", APIPricing(input_price_per_1m=0.10, output_price_per_1m=0.00, cached_input_price_per_1m=0.05), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    ("omni-moderation-latest", "openai", "OpenAI", "Omni Moderation", "Micro", False, "Proprietary", None, "Classifier", 0, 0, ["text", "image"], "텍스트 및 이미지 콘텐츠 정책 위반 분류 무료 API", "https://platform.openai.com/docs/models/moderation", "https://platform.openai.com/docs/models/moderation", APIPricing(input_price_per_1m=0.00, output_price_per_1m=0.00, cached_input_price_per_1m=0.00), BenchmarkScores(arena_elo=None, mmlu_pro=None, gpqa=None, swe_bench=None)),
    # ==================== Meta Llama 추가 누락 모델 ====================
    # Source: https://llama.meta.com/docs/model-cards-and-prompt-formats
    ("llama-4-maverick", "meta", "Meta AI", "Llama 4 Maverick", "Frontier", True, "Llama Community", 400.0, "MoE (Early Fusion)", 1000000, 8192, ["text", "vision"], "400B MoE 파라미터 멀티모달 플래그십. 128 전문가 혼합 구조", "https://llama.meta.com", "https://llama.meta.com/docs/model-cards-and-prompt-formats", APIPricing(input_price_per_1m=0.50, output_price_per_1m=1.50, cached_input_price_per_1m=0.12), BenchmarkScores(arena_elo=1350, mmlu_pro=86.0, gpqa=69.0, swe_bench=54.0)),
    # ==================== Anthropic Claude 추가 누락 모델 ====================
    # Source: https://docs.anthropic.com/en/docs/about-claude/models
    ("claude-sonnet-4-5", "anthropic", "Anthropic", "Claude Sonnet 4.5", "Mid", False, "Proprietary", None, "Dense", 200000, 8192, ["text", "vision"], "에이전트 작업 및 도구 사용에 최적화된 Sonnet 4.5", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=3.00, output_price_per_1m=15.00, cached_input_price_per_1m=0.30), BenchmarkScores(arena_elo=1350, mmlu_pro=86.0, gpqa=71.0, swe_bench=56.0)),
    ("claude-haiku-3-5", "anthropic", "Anthropic", "Claude Haiku 3.5", "Small", False, "Proprietary", None, "Dense", 200000, 8192, ["text", "vision"], "Sonnet 3 수준의 지능을 가진 빠르고 경량 모델", "https://docs.anthropic.com/en/docs/about-claude/models", "https://docs.anthropic.com/en/docs/about-claude/models", APIPricing(input_price_per_1m=0.80, output_price_per_1m=4.00, cached_input_price_per_1m=0.08), BenchmarkScores(arena_elo=1280, mmlu_pro=75.0, gpqa=55.0, swe_bench=40.0))
]

MODELS: List[ModelSpec] = []
for model_def in RAW_MODELS_DATA:
    tier = model_def[4]
    MODELS.append(
        ModelSpec(
            id=model_def[0],
            provider_id=model_def[1],
            provider_name=model_def[2],
            name=model_def[3],
            tier=tier,
            is_open_weight=model_def[5],
            license_type=model_def[6],
            parameter_count_b=model_def[7],
            architecture=model_def[8],
            context_window=model_def[9],
            max_output_tokens=model_def[10],
            modality=model_def[11],
            description=model_def[12],
            official_url=model_def[13],
            source_docs_url=model_def[14],
            api_pricing=model_def[15],
            quota=default_quota(tier),
            benchmarks=model_def[16]
        )
    )
