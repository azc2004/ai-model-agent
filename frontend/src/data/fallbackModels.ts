import type { ModelSpec } from '../types';

export const FALLBACK_MODELS: ModelSpec[] = [
  {
    "id": "claude-3-7-sonnet-thinking",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3.7 Sonnet (Thinking Mode)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 64000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 3.7 Sonnet 사고 과정(Extended Thinking) 최대 가동 추론 스펙",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1405,
      "mmlu_pro": 92.5,
      "gpqa": 86.2,
      "swe_bench": 70.3
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-7-sonnet-20250219",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3.7 Sonnet (20250219)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Hybrid Reasoning (Thinking Mode)",
    "context_window": 200000,
    "max_output_tokens": 64000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Anthropic 최초 하이브리드 추론 플래그십. 일반 응답 및 Extended Thinking 선택 가동. SWE-bench 및 코딩 SOTA",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1395,
      "mmlu_pro": 91.2,
      "gpqa": 84.8,
      "swe_bench": 70.3
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-7-sonnet",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3.7 Sonnet (Latest)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Hybrid Reasoning (Thinking Mode)",
    "context_window": 200000,
    "max_output_tokens": 64000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 3.7 Sonnet 공식 최신 엔드포인트 파이프라인",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1395,
      "mmlu_pro": 91.2,
      "gpqa": 84.8,
      "swe_bench": 70.3
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-opus-5",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Opus 5",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "최고 수준 지능 및 문서 분석 최상위 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 5.0,
      "output_price_per_1m": 25.0,
      "cached_input_price_per_1m": 1.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1392,
      "mmlu_pro": 90.1,
      "gpqa": 78.4,
      "swe_bench": 68.2
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o1-pro",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o1 Pro",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 100000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "o1 컴퓨팅 연산 자원 증대 버전. 고난도 수학·과학 연구 최상위",
    "official_url": "https://platform.openai.com/docs/models/o1",
    "source_docs_url": "https://platform.openai.com/docs/models/o1",
    "api_pricing": {
      "input_price_per_1m": 150.0,
      "output_price_per_1m": 600.0,
      "cached_input_price_per_1m": 75.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1390,
      "mmlu_pro": 91.5,
      "gpqa": 83.0,
      "swe_bench": 68.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-5.6-sol",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-5.6 Sol",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense/MoE",
    "context_window": 272000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "OpenAI 2026 플래그십 모델. 복잡한 시스템 추론 및 멀티 에이전트 오케스트레이션",
    "official_url": "https://platform.openai.com/docs/models",
    "source_docs_url": "https://platform.openai.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 5.0,
      "output_price_per_1m": 30.0,
      "cached_input_price_per_1m": 2.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1385,
      "mmlu_pro": 89.4,
      "gpqa": 76.8,
      "swe_bench": 62.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-5-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4.5 Preview",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "최대 규모의 GPT 계열 모델. 감성 지능 및 창의적 글쓰기 특화",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-5",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-5",
    "api_pricing": {
      "input_price_per_1m": 75.0,
      "output_price_per_1m": 150.0,
      "cached_input_price_per_1m": 37.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1380,
      "mmlu_pro": 90.5,
      "gpqa": 77.0,
      "swe_bench": 38.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-opus-4-1",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Opus 4.1",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 4세대 최고 성능. 복잡한 멀티스텝 추론 및 코딩 SOTA",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 15.0,
      "output_price_per_1m": 75.0,
      "cached_input_price_per_1m": 1.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1380,
      "mmlu_pro": 91.0,
      "gpqa": 84.0,
      "swe_bench": 72.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-reasoner",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek-R1 (reasoner alias)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "MIT",
    "architecture": "MoE CoT",
    "context_window": 131072,
    "max_output_tokens": 16384,
    "modality": [
      "text"
    ],
    "description": "DeepSeek 공식 추론 엔드포인트. 현행 R1 모델로 자동 라우팅",
    "official_url": "https://platform.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.28,
      "output_price_per_1m": 0.42,
      "cached_input_price_per_1m": 0.07,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1375,
      "mmlu_pro": 90.0,
      "gpqa": 82.0,
      "swe_bench": 70.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-v4-pro",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek V4 Pro",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 671.0,
    "architecture": "MoE (Active 37B)",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "글로벌 탑티어 오픈웨이트 MoE",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.55,
      "output_price_per_1m": 2.19,
      "cached_input_price_per_1m": 0.14,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1370,
      "mmlu_pro": 88.5,
      "gpqa": 75.2,
      "swe_bench": 64.1
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o3",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o3",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 100000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "o시리즈 최상위 추론 모델. 복잡한 수학·과학·코딩 작업에 특화",
    "official_url": "https://platform.openai.com/docs/models/o3",
    "source_docs_url": "https://platform.openai.com/docs/models/o3",
    "api_pricing": {
      "input_price_per_1m": 10.0,
      "output_price_per_1m": 40.0,
      "cached_input_price_per_1m": 2.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1370,
      "mmlu_pro": 91.0,
      "gpqa": 83.3,
      "swe_bench": 71.7
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "grok-4",
    "provider_id": "xai",
    "provider_name": "xAI (Grok)",
    "name": "Grok 4",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 256000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "xAI 플래그십. 실시간 X 데이터 접근 + 256k 컨텍스트 추론 모델",
    "official_url": "https://x.ai/api",
    "source_docs_url": "https://docs.x.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1370,
      "mmlu_pro": 88.0,
      "gpqa": 80.0,
      "swe_bench": 65.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-2-5-pro",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 2.5 Pro",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense (Thinking)",
    "context_window": 1048576,
    "max_output_tokens": 65536,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "Google 최상위 추론. 1M 컨텍스트 + Thinking 내장",
    "official_url": "https://ai.google.dev",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models",
    "api_pricing": {
      "input_price_per_1m": 1.25,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 0.31,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1370,
      "mmlu_pro": 90.0,
      "gpqa": 84.0,
      "swe_bench": 72.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "claude-opus-4-5",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Opus 4.5",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 4.5 Opus. 에이전트 툴 사용·복잡 추론 최상위",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 5.0,
      "output_price_per_1m": 25.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1370,
      "mmlu_pro": 89.0,
      "gpqa": 82.0,
      "swe_bench": 70.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-2-0-pro-exp",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 2.0 Pro (Experimental)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 2097152,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio",
      "video"
    ],
    "description": "Google 2.0 세대 200만 컨텍스트 플래그십 실험 모델. 복잡 코드 추론 및 옴니 분석",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1365,
      "mmlu_pro": 88.5,
      "gpqa": 76.2,
      "swe_bench": 59.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "glm-5-2",
    "provider_id": "zhipu",
    "provider_name": "Zhipu AI (GLM)",
    "name": "GLM-5.2",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "MIT",
    "architecture": "Dense/MoE",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "에이전트 및 코딩 특화 GLM 신작",
    "official_url": "https://open.bigmodel.cn/dev/howuse/model",
    "source_docs_url": "https://open.bigmodel.cn/dev/howuse/model",
    "api_pricing": {
      "input_price_per_1m": 0.6,
      "output_price_per_1m": 2.4,
      "cached_input_price_per_1m": 0.15,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1362,
      "mmlu_pro": 87.0,
      "gpqa": 73.5,
      "swe_bench": 61.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-3.1-pro",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 3.1 Pro",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 2000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio",
      "video"
    ],
    "description": "200만 컨텍스트 및 옴니 전 영역 통합 처리 플래그십",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 12.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1360,
      "mmlu_pro": 87.2,
      "gpqa": 73.1,
      "swe_bench": 56.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "perplexity-sonar-deep-research",
    "provider_id": "perplexity",
    "provider_name": "Perplexity AI",
    "name": "Sonar Deep Research",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "Web+Deep Reasoning",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "다단계 추론 + 실시간 딥 리서치. 복잡한 분석 리포트 자동 생성",
    "official_url": "https://docs.perplexity.ai/guides/model-cards",
    "source_docs_url": "https://docs.perplexity.ai/guides/model-cards",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 8.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1360,
      "mmlu_pro": 87.0,
      "gpqa": 76.0,
      "swe_bench": 60.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "fireworks-deepseek-r1",
    "provider_id": "fireworks_ai",
    "provider_name": "Fireworks AI",
    "name": "DeepSeek R1 (Fireworks)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "MIT",
    "architecture": "MoE CoT",
    "context_window": 65536,
    "max_output_tokens": 16384,
    "modality": [
      "text"
    ],
    "description": "Fireworks AI DeepSeek R1 서빙. SOTA 추론 모델 최적화 배포",
    "official_url": "https://fireworks.ai",
    "source_docs_url": "https://readme.fireworks.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 7.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1360,
      "mmlu_pro": 88.0,
      "gpqa": 79.0,
      "swe_bench": 67.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-r1",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek R1 (Reasoning)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 671.0,
    "architecture": "MoE RL Reasoning",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "o1 수준 강화학습 심층 추론 671B 오픈웨이트 모델",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.55,
      "output_price_per_1m": 2.19,
      "cached_input_price_per_1m": 0.14,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1358,
      "mmlu_pro": 87.9,
      "gpqa": 75.7,
      "swe_bench": 60.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o1",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o1 (Latest)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 100000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "강화학습 심층 추론 정식 플래그십",
    "official_url": "https://platform.openai.com/docs/models/o1",
    "source_docs_url": "https://platform.openai.com/docs/models/o1",
    "api_pricing": {
      "input_price_per_1m": 15.0,
      "output_price_per_1m": 60.0,
      "cached_input_price_per_1m": 7.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1355,
      "mmlu_pro": 89.0,
      "gpqa": 78.2,
      "swe_bench": 61.8
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o1-2024-12-17",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o1 (2024-12-17)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 100000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "o1 정식 릴리스 12월 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/o1",
    "source_docs_url": "https://platform.openai.com/docs/models/o1",
    "api_pricing": {
      "input_price_per_1m": 15.0,
      "output_price_per_1m": 60.0,
      "cached_input_price_per_1m": 7.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1355,
      "mmlu_pro": 89.0,
      "gpqa": 78.2,
      "swe_bench": 61.8
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "fireworks-qwen-3-235b",
    "provider_id": "fireworks_ai",
    "provider_name": "Fireworks AI",
    "name": "Qwen 3 235B A22B (Fireworks)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "Qwen License",
    "parameter_count_b": 235.0,
    "architecture": "MoE (A22B)",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Fireworks 서빙 Qwen 3 최대 MoE. 235B 전체/22B 활성 초효율",
    "official_url": "https://fireworks.ai",
    "source_docs_url": "https://readme.fireworks.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.22,
      "output_price_per_1m": 0.88,
      "cached_input_price_per_1m": 0.055,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1355,
      "mmlu_pro": 87.0,
      "gpqa": 78.0,
      "swe_bench": 65.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "amazon-nova-premier",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Amazon Nova Premier",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary (AWS)",
    "architecture": "Native Multimodal",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Amazon 최상위 프론티어 모델. VPC 통합",
    "official_url": "https://aws.amazon.com/bedrock/nova",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 8.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1352,
      "mmlu_pro": 85.2,
      "gpqa": 71.0,
      "swe_bench": 54.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "kimi-k2-7",
    "provider_id": "moonshot",
    "provider_name": "Moonshot AI (Kimi)",
    "name": "Kimi K2.7",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "Modified MIT",
    "parameter_count_b": 1000.0,
    "architecture": "MoE Ultra-Long Context",
    "context_window": 2000000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "200만 토큰 문서 이해 및 에이전트 코딩",
    "official_url": "https://platform.moonshot.cn/docs/intro",
    "source_docs_url": "https://platform.moonshot.cn/docs/intro",
    "api_pricing": {
      "input_price_per_1m": 1.0,
      "output_price_per_1m": 4.0,
      "cached_input_price_per_1m": 0.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1350,
      "mmlu_pro": 85.5,
      "gpqa": 71.0,
      "swe_bench": 57.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-4-maverick",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 4 Maverick",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 400.0,
    "architecture": "MoE (Early Fusion)",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "400B MoE 파라미터 멀티모달 플래그십. 128 전문가 혼합 구조",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.5,
      "output_price_per_1m": 1.5,
      "cached_input_price_per_1m": 0.12,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1350,
      "mmlu_pro": 86.0,
      "gpqa": 69.0,
      "swe_bench": 54.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-sonnet-4-5",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Sonnet 4.5",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "에이전트 작업 및 도구 사용에 최적화된 Sonnet 4.5",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.3,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1350,
      "mmlu_pro": 86.0,
      "gpqa": 71.0,
      "swe_bench": 56.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "perplexity-sonar-reasoning-pro",
    "provider_id": "perplexity",
    "provider_name": "Perplexity AI",
    "name": "Sonar Reasoning Pro",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "Web+CoT",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "웹 검색 통합 고급 추론 Pro 버전. 프리미엄 분석·추론 태스크",
    "official_url": "https://docs.perplexity.ai/guides/model-cards",
    "source_docs_url": "https://docs.perplexity.ai/guides/model-cards",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 8.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1350,
      "mmlu_pro": 86.0,
      "gpqa": 75.0,
      "swe_bench": 59.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "deepseek-chat",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek-V3 (chat alias)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "MIT",
    "architecture": "MoE",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "DeepSeek 공식 chat 엔드포인트. 현행 최신 V3 모델로 자동 라우팅",
    "official_url": "https://platform.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.28,
      "output_price_per_1m": 0.42,
      "cached_input_price_per_1m": 0.07,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1350,
      "mmlu_pro": 84.0,
      "gpqa": 68.0,
      "swe_bench": 52.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-sonnet-5",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Sonnet 5",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "성능과 속도 표준 주력 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1345,
      "mmlu_pro": 84.8,
      "gpqa": 69.5,
      "swe_bench": 54.8
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-3-flash-preview",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 3 Flash Preview",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense (Thinking)",
    "context_window": 1048576,
    "max_output_tokens": 65536,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "Gemini 3세대 Flash 프리뷰. Thinking 내장 차세대 멀티모달",
    "official_url": "https://ai.google.dev",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.5,
      "output_price_per_1m": 3.0,
      "cached_input_price_per_1m": 0.125,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1345,
      "mmlu_pro": 87.0,
      "gpqa": 77.0,
      "swe_bench": 62.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-max",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 Max",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "MoE",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Alibaba 플래그십 상용 API",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 1.6,
      "output_price_per_1m": 6.4,
      "cached_input_price_per_1m": 0.4,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1342,
      "mmlu_pro": 85.0,
      "gpqa": 68.5,
      "swe_bench": 52.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-5.6-terra",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-5.6 Terra",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 272000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "성능과 가격 밸런스가 뛰어난 OpenAI Mid-tier 주력 모델",
    "official_url": "https://platform.openai.com/docs/models",
    "source_docs_url": "https://platform.openai.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 2.5,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 1.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1340,
      "mmlu_pro": 83.5,
      "gpqa": 68.2,
      "swe_bench": 51.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "perplexity-sonar-reasoning",
    "provider_id": "perplexity",
    "provider_name": "Perplexity AI",
    "name": "Sonar Reasoning",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "DeepSeek R1 Web-Integrated",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "DeepSeek R1 웹 통합 심층 추론 API",
    "official_url": "https://docs.perplexity.ai/guides/model-cards",
    "source_docs_url": "https://docs.perplexity.ai/guides/model-cards",
    "api_pricing": {
      "input_price_per_1m": 1.0,
      "output_price_per_1m": 5.0,
      "cached_input_price_per_1m": 0.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1340,
      "mmlu_pro": 86.5,
      "gpqa": 74.0,
      "swe_bench": 58.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "o4-mini",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o4-mini",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 100000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "o시리즈 최신 소형 고속 추론 모델. 코딩·수학 태스크 최적화",
    "official_url": "https://platform.openai.com/docs/models/o4-mini",
    "source_docs_url": "https://platform.openai.com/docs/models/o4-mini",
    "api_pricing": {
      "input_price_per_1m": 1.1,
      "output_price_per_1m": 4.4,
      "cached_input_price_per_1m": 0.275,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1340,
      "mmlu_pro": 88.0,
      "gpqa": 79.6,
      "swe_bench": 68.1
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "grok-3",
    "provider_id": "xai",
    "provider_name": "xAI (Grok)",
    "name": "Grok 3",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "X 실시간 검색 통합 플래그십. 고성능 코딩·분석 특화",
    "official_url": "https://x.ai/api",
    "source_docs_url": "https://docs.x.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1340,
      "mmlu_pro": 85.0,
      "gpqa": 75.0,
      "swe_bench": 58.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-2-5-flash",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 2.5 Flash",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense (Thinking)",
    "context_window": 1048576,
    "max_output_tokens": 65536,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "1M 컨텍스트 Thinking 지원 고속 Flash. 가성비 최상위",
    "official_url": "https://ai.google.dev",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.3,
      "output_price_per_1m": 2.5,
      "cached_input_price_per_1m": 0.075,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1340,
      "mmlu_pro": 86.0,
      "gpqa": 75.0,
      "swe_bench": 60.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "together-deepseek-v3",
    "provider_id": "together_ai",
    "provider_name": "Together AI",
    "name": "DeepSeek-V3 (Together)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "MIT",
    "architecture": "MoE",
    "context_window": 65536,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Together AI DeepSeek V3 서빙. 오픈웨이트 최고 가성비 MoE",
    "official_url": "https://together.ai",
    "source_docs_url": "https://docs.together.ai/docs/serverless-models",
    "api_pricing": {
      "input_price_per_1m": 1.25,
      "output_price_per_1m": 1.25,
      "cached_input_price_per_1m": 0.31,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1340,
      "mmlu_pro": 84.0,
      "gpqa": 68.0,
      "swe_bench": 52.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-2.0-flash-thinking-exp",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 2.0 Flash Thinking",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal RL",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "생각 과정을 노출하는 추론 특화 실험 버전",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.6,
      "cached_input_price_per_1m": 0.035,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1335,
      "mmlu_pro": 84.0,
      "gpqa": 70.0,
      "swe_bench": 52.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "o1-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o1-preview",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 128000,
    "max_output_tokens": 32768,
    "modality": [
      "text"
    ],
    "description": "o1 초기 공개 프리뷰 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/o1",
    "source_docs_url": "https://platform.openai.com/docs/models/o1",
    "api_pricing": {
      "input_price_per_1m": 15.0,
      "output_price_per_1m": 60.0,
      "cached_input_price_per_1m": 7.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1330,
      "mmlu_pro": 85.0,
      "gpqa": 72.0,
      "swe_bench": 53.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-4-70b",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 4 Scout 70B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 10000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "1,000만 토큰 스캐닝 Llama 4 라인업",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.6,
      "output_price_per_1m": 1.8,
      "cached_input_price_per_1m": 0.15,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1330,
      "mmlu_pro": 83.0,
      "gpqa": 65.5,
      "swe_bench": 49.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-v4-flash",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek-V4 Flash",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MIT",
    "architecture": "MoE Ultra-Long",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "100만 토큰 초장문 컨텍스트 + 추론 지원 고속 MoE 모델",
    "official_url": "https://platform.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.14,
      "output_price_per_1m": 0.28,
      "cached_input_price_per_1m": 0.035,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1330,
      "mmlu_pro": 83.0,
      "gpqa": 72.0,
      "swe_bench": 58.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-3.6-72b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 3.6 72B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 72.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "다국어 및 코딩 탑티어 Apache 2.0 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.4,
      "output_price_per_1m": 1.2,
      "cached_input_price_per_1m": 0.1,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1325,
      "mmlu_pro": 82.1,
      "gpqa": 64.0,
      "swe_bench": 48.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "mistral-large-3",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Mistral Large 3",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 123.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "123B 다국어 플래그십",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 6.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1320,
      "mmlu_pro": 81.2,
      "gpqa": 61.5,
      "swe_bench": 46.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "grok-4-1-fast",
    "provider_id": "xai",
    "provider_name": "xAI (Grok)",
    "name": "Grok 4.1 Fast",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 2000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "200만 토큰 초장문 컨텍스트 고속 추론 버전",
    "official_url": "https://x.ai/api",
    "source_docs_url": "https://docs.x.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.2,
      "output_price_per_1m": 0.5,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1320,
      "mmlu_pro": 82.0,
      "gpqa": 70.0,
      "swe_bench": 52.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-3.6-flash",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 3.6 Flash",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "Google 메인 고속 서빙 모델",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 1.5,
      "output_price_per_1m": 7.5,
      "cached_input_price_per_1m": 0.38,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1315,
      "mmlu_pro": 80.5,
      "gpqa": 63.4,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "gemini-2-0-flash",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 2.0 Flash (GA)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 1048576,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio",
      "video"
    ],
    "description": "Google 2.0 세대 차세대 고속 옴니 멀티모달 정식 버전. 100만 컨텍스트",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.4,
      "cached_input_price_per_1m": 0.025,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1310,
      "mmlu_pro": 80.0,
      "gpqa": 62.5,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "deepseek-v3",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek V3",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 671.0,
    "architecture": "MoE (Active 37B)",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "671B 오픈소스 기준 표준 모델. GPT-4o급 성능",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.27,
      "output_price_per_1m": 1.1,
      "cached_input_price_per_1m": 0.07,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1310,
      "mmlu_pro": 80.1,
      "gpqa": 62.5,
      "swe_bench": 49.2
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwq-32b-preview",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "QwQ 32B Preview (Reasoning)",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 32.0,
    "architecture": "Chain-of-Thought RL",
    "context_window": 32000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "추론 특화 32B 오픈 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.25,
      "output_price_per_1m": 0.75,
      "cached_input_price_per_1m": 0.06,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1310,
      "mmlu_pro": 82.0,
      "gpqa": 67.0,
      "swe_bench": 48.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "pixtral-large",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Pixtral Large",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "parameter_count_b": 123.0,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "123B 최상위 멀티모달",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 6.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1310,
      "mmlu_pro": 80.0,
      "gpqa": 60.0,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "perplexity-sonar-pro",
    "provider_id": "perplexity",
    "provider_name": "Perplexity AI",
    "name": "Sonar Pro",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "Web Search Fine-Tuned",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "실시간 웹 검색 탐색형 LLM",
    "official_url": "https://docs.perplexity.ai/guides/model-cards",
    "source_docs_url": "https://docs.perplexity.ai/guides/model-cards",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1310,
      "mmlu_pro": 80.0,
      "gpqa": 62.0,
      "swe_bench": 42.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "grok-2-vision",
    "provider_id": "xai",
    "provider_name": "xAI (Grok)",
    "name": "Grok 2 Vision",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense Multimodal",
    "context_window": 32768,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "이미지 이해 + X 검색 통합 멀티모달 모델",
    "official_url": "https://x.ai/api",
    "source_docs_url": "https://docs.x.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1310,
      "mmlu_pro": 81.0,
      "gpqa": 68.0,
      "swe_bench": 50.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "together-llama-3-1-405b",
    "provider_id": "together_ai",
    "provider_name": "Together AI",
    "name": "Meta Llama 3.1 405B (Together)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 405.0,
    "architecture": "Dense",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Together AI에서 서빙하는 Llama 3.1 405B. 완전 오픈웨이트 최대 규모",
    "official_url": "https://together.ai",
    "source_docs_url": "https://docs.together.ai/docs/serverless-models",
    "api_pricing": {
      "input_price_per_1m": 3.5,
      "output_price_per_1m": 3.5,
      "cached_input_price_per_1m": 0.875,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1310,
      "mmlu_pro": 82.0,
      "gpqa": 65.0,
      "swe_bench": 50.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "amazon-nova-pro",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Amazon Nova Pro",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary (AWS)",
    "architecture": "Native Multimodal",
    "context_window": 300000,
    "max_output_tokens": 5000,
    "modality": [
      "text",
      "vision",
      "video"
    ],
    "description": "속도와 지능의 균형 멀티모달",
    "official_url": "https://aws.amazon.com/bedrock/nova",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.8,
      "output_price_per_1m": 3.2,
      "cached_input_price_per_1m": 0.2,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1308,
      "mmlu_pro": 79.4,
      "gpqa": 61.8,
      "swe_bench": 44.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o3-mini",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o3-mini (Latest)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 100000,
    "modality": [
      "text"
    ],
    "description": "2025 최신 o3 세대 논리/코딩 추론 모델",
    "official_url": "https://platform.openai.com/docs/models/o3-mini",
    "source_docs_url": "https://platform.openai.com/docs/models/o3-mini",
    "api_pricing": {
      "input_price_per_1m": 1.1,
      "output_price_per_1m": 4.4,
      "cached_input_price_per_1m": 0.55,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1305,
      "mmlu_pro": 79.5,
      "gpqa": 62.0,
      "swe_bench": 47.2
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o3-mini-2025-01-31",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o3-mini (2025-01-31)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 200000,
    "max_output_tokens": 100000,
    "modality": [
      "text"
    ],
    "description": "o3-mini 1월 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/o3-mini",
    "source_docs_url": "https://platform.openai.com/docs/models/o3-mini",
    "api_pricing": {
      "input_price_per_1m": 1.1,
      "output_price_per_1m": 4.4,
      "cached_input_price_per_1m": 0.55,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1305,
      "mmlu_pro": 79.5,
      "gpqa": 62.0,
      "swe_bench": 47.2
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "fireworks-llama-3-1-405b",
    "provider_id": "fireworks_ai",
    "provider_name": "Fireworks AI",
    "name": "Llama 3.1 405B (Fireworks)",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 405.0,
    "architecture": "Dense",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Fireworks AI 최적화 Llama 3.1 405B. 저비용 대형 모델 추론",
    "official_url": "https://fireworks.ai",
    "source_docs_url": "https://readme.fireworks.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 3.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1305,
      "mmlu_pro": 81.0,
      "gpqa": 63.0,
      "swe_bench": 49.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-2.0-flash-exp",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 2.0 Flash (Experimental)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "속도와 멀티모달 능력을 강화한 실험 버전",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.4,
      "cached_input_price_per_1m": 0.025,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1300,
      "mmlu_pro": 79.0,
      "gpqa": 61.0,
      "swe_bench": 42.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-vl-72b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 VL 72B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 72.0,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "video"
    ],
    "description": "72B 비디오 이해 멀티모달 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.45,
      "output_price_per_1m": 1.35,
      "cached_input_price_per_1m": 0.11,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1300,
      "mmlu_pro": 80.0,
      "gpqa": 62.0,
      "swe_bench": 44.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "cohere-command-a",
    "provider_id": "cohere",
    "provider_name": "Cohere",
    "name": "Command A",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 256000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "기업용 에이전트 워크플로 특화 256k 컨텍스트 플래그십",
    "official_url": "https://docs.cohere.com/docs/models",
    "source_docs_url": "https://docs.cohere.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 2.5,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 0.625,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1300,
      "mmlu_pro": 79.0,
      "gpqa": 60.0,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-3-1-flash-lite",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 3.1 Flash Lite",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 1048576,
    "max_output_tokens": 32768,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Gemini 3.1 초경량. 엣지·모바일 온디바이스 추론 최적화",
    "official_url": "https://ai.google.dev",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.25,
      "output_price_per_1m": 1.5,
      "cached_input_price_per_1m": 0.063,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1300,
      "mmlu_pro": 80.0,
      "gpqa": 62.0,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "claude-haiku-4.5",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Haiku 4.5",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "초고속 핑퐁 대화 특화 소형 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 1.0,
      "output_price_per_1m": 5.0,
      "cached_input_price_per_1m": 0.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1295,
      "mmlu_pro": 78.8,
      "gpqa": 59.4,
      "swe_bench": 42.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-r1-distill-llama-70b",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek R1 Distill Llama 70B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 70.0,
    "architecture": "Dense Distilled RL",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Llama 3.3 70B 기반 DeepSeek R1 추론 증류 모델. 온프레미스 단일 서버 호스팅",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.75,
      "output_price_per_1m": 0.99,
      "cached_input_price_per_1m": 0.18,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1295,
      "mmlu_pro": 78.2,
      "gpqa": 65.5,
      "swe_bench": 49.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-plus",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 Plus",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "상용 클라우드 주력 API",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.4,
      "output_price_per_1m": 1.2,
      "cached_input_price_per_1m": 0.1,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1295,
      "mmlu_pro": 78.5,
      "gpqa": 60.0,
      "swe_bench": 42.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-haiku-4-5",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Haiku 4.5",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 4.5 최고속 경량. 실시간 대화·분류 태스크 최적화",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 1.0,
      "output_price_per_1m": 5.0,
      "cached_input_price_per_1m": 0.1,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1295,
      "mmlu_pro": 76.0,
      "gpqa": 56.0,
      "swe_bench": 42.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-5.6-luna",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-5.6 Luna",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "대량 토큰 처리에 최적화된 저비용 초고속 소형 모델",
    "official_url": "https://platform.openai.com/docs/models",
    "source_docs_url": "https://platform.openai.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 1.0,
      "output_price_per_1m": 6.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1290,
      "mmlu_pro": 78.2,
      "gpqa": 59.1,
      "swe_bench": 41.2
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o1-mini",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o1-mini (Latest)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 128000,
    "max_output_tokens": 65536,
    "modality": [
      "text"
    ],
    "description": "o1 고속 경량 추론 전용 모델",
    "official_url": "https://platform.openai.com/docs/models/o1",
    "source_docs_url": "https://platform.openai.com/docs/models/o1",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 12.0,
      "cached_input_price_per_1m": 1.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1290,
      "mmlu_pro": 77.0,
      "gpqa": 60.0,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "o1-mini-2024-09-12",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "o1-mini (2024-09-12)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Chain-of-Thought RL",
    "context_window": 128000,
    "max_output_tokens": 65536,
    "modality": [
      "text"
    ],
    "description": "o1-mini 9월 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/o1",
    "source_docs_url": "https://platform.openai.com/docs/models/o1",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 12.0,
      "cached_input_price_per_1m": 1.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1290,
      "mmlu_pro": 77.0,
      "gpqa": 60.0,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "grok-3-mini",
    "provider_id": "xai",
    "provider_name": "xAI (Grok)",
    "name": "Grok 3 Mini",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Grok 3 경량 버전. 빠른 응답·저비용 추론 최적화",
    "official_url": "https://x.ai/api",
    "source_docs_url": "https://docs.x.ai/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.3,
      "output_price_per_1m": 0.5,
      "cached_input_price_per_1m": 0.07,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1290,
      "mmlu_pro": 78.0,
      "gpqa": 62.0,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "groq-deepseek-r1-distill-70b",
    "provider_id": "groq",
    "provider_name": "Groq",
    "name": "DeepSeek R1 Distill 70B (Groq)",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 70.0,
    "architecture": "Dense Distilled",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "DeepSeek R1 추론 증류 70B. Groq LPU 초고속 서빙",
    "official_url": "https://console.groq.com",
    "source_docs_url": "https://console.groq.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.75,
      "output_price_per_1m": 0.99,
      "cached_input_price_per_1m": 0.18,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1290,
      "mmlu_pro": 77.0,
      "gpqa": 65.0,
      "swe_bench": 48.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-2-5-flash-lite",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 2.5 Flash Lite",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 1048576,
    "max_output_tokens": 32768,
    "modality": [
      "text",
      "vision"
    ],
    "description": "1M 컨텍스트 초경량 Flash. 대량 처리 최저 비용",
    "official_url": "https://ai.google.dev",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.4,
      "cached_input_price_per_1m": 0.025,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1290,
      "mmlu_pro": 78.0,
      "gpqa": 58.0,
      "swe_bench": 42.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "together-qwen-2-5-72b",
    "provider_id": "together_ai",
    "provider_name": "Together AI",
    "name": "Qwen 2.5 72B Instruct (Together)",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Qwen License",
    "parameter_count_b": 72.0,
    "architecture": "Dense",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Together AI Qwen 2.5 72B 서빙. 다국어·코딩 우수 오픈웨이트",
    "official_url": "https://together.ai",
    "source_docs_url": "https://docs.together.ai/docs/serverless-models",
    "api_pricing": {
      "input_price_per_1m": 1.2,
      "output_price_per_1m": 1.2,
      "cached_input_price_per_1m": 0.3,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1290,
      "mmlu_pro": 79.0,
      "gpqa": 60.0,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o (Latest)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 128000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "범용 플래그십 옴니 모델 공식 최신 버전",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o",
    "api_pricing": {
      "input_price_per_1m": 2.5,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 1.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1286,
      "mmlu_pro": 77.0,
      "gpqa": 53.6,
      "swe_bench": 38.8
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-2024-11-20",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o (2024-11-20)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 128000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "2024-11-20 릴리스 안정화 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o",
    "api_pricing": {
      "input_price_per_1m": 2.5,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 1.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1286,
      "mmlu_pro": 77.0,
      "gpqa": 53.6,
      "swe_bench": 38.8
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "llama-3-1-405b-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Llama 3.1 405B (on Bedrock)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Llama Community (Hosted)",
    "parameter_count_b": 405.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "AWS 서버리스 호스팅 Llama 3.1 405B 초대형 모델",
    "official_url": "https://aws.amazon.com/bedrock/llama",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 2.4,
      "output_price_per_1m": 2.4,
      "cached_input_price_per_1m": 0.6,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1285,
      "mmlu_pro": 78.2,
      "gpqa": 55.0,
      "swe_bench": 39.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-1-405b-instruct",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.1 405B Instruct",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 405.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "405B 프론티어 오픈 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 6.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1285,
      "mmlu_pro": 78.2,
      "gpqa": 55.0,
      "swe_bench": 39.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-5-sonnet-20241022",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3.5 Sonnet (20241022)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Computer Use 및 코딩 기능 업그레이드 최신 릴리스",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1282,
      "mmlu_pro": 77.5,
      "gpqa": 59.4,
      "swe_bench": 49.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-5-sonnet-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Claude 3.5 Sonnet v2 (on Bedrock)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary (Hosted)",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "AWS 관리형 서버리스 호스팅 Claude 3.5 Sonnet v2",
    "official_url": "https://aws.amazon.com/bedrock/claude",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1282,
      "mmlu_pro": 77.5,
      "gpqa": 59.4,
      "swe_bench": 49.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-72b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 72B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 72.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "72B 오픈웨이트 표준",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.35,
      "output_price_per_1m": 1.05,
      "cached_input_price_per_1m": 0.08,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1282,
      "mmlu_pro": 77.0,
      "gpqa": 58.0,
      "swe_bench": 39.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-2024-08-06",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o (2024-08-06)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 128000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "구조화 출력(Structured Outputs) 최초 지원 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o",
    "api_pricing": {
      "input_price_per_1m": 2.5,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 1.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1280,
      "mmlu_pro": 76.5,
      "gpqa": 53.0,
      "swe_bench": 38.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "llama-3-3-70b-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Llama 3.3 70B (on Bedrock)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Llama Community (Hosted)",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "AWS 서버리스 관리형 Llama 3.3 70B",
    "official_url": "https://aws.amazon.com/bedrock/llama",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.72,
      "output_price_per_1m": 0.72,
      "cached_input_price_per_1m": 0.18,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1280,
      "mmlu_pro": 76.8,
      "gpqa": 52.5,
      "swe_bench": 38.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-3-70b-instruct",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.3 70B Instruct",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "405B급 지능을 70B 파라미터로 압축한 오픈 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.4,
      "output_price_per_1m": 1.2,
      "cached_input_price_per_1m": 0.1,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1280,
      "mmlu_pro": 76.8,
      "gpqa": 52.5,
      "swe_bench": 38.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "mistral-large-2407",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Mistral Large 2 (2407)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "parameter_count_b": 123.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "123B 코드/추론 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 6.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1280,
      "mmlu_pro": 77.0,
      "gpqa": 55.0,
      "swe_bench": 40.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-haiku-3-5",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Haiku 3.5",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Sonnet 3 수준의 지능을 가진 빠르고 경량 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 0.8,
      "output_price_per_1m": 4.0,
      "cached_input_price_per_1m": 0.08,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1280,
      "mmlu_pro": 75.0,
      "gpqa": 55.0,
      "swe_bench": 40.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-realtime-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o Realtime Preview",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal Realtime",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "audio"
    ],
    "description": "양방향 초저지연 음성 대화 API",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o-realtime",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o-realtime",
    "api_pricing": {
      "input_price_per_1m": 5.0,
      "output_price_per_1m": 20.0,
      "cached_input_price_per_1m": 2.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1275,
      "mmlu_pro": 74.0,
      "gpqa": 50.0,
      "swe_bench": 35.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "claude-3-5-sonnet-20240620",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3.5 Sonnet (20240620)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "3.5 Sonnet 오리지널 릴리스 스냅샷",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1275,
      "mmlu_pro": 76.8,
      "gpqa": 58.5,
      "swe_bench": 45.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-r1-distill-qwen-32b",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek R1 Distill Qwen 32B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 32.0,
    "architecture": "Dense Distilled RL",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Qwen 2.5 32B 기반 R1 추론 증류 모델. RTX 4090/A100 단일 GPU 호스팅 최적화",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.3,
      "output_price_per_1m": 0.6,
      "cached_input_price_per_1m": 0.075,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1275,
      "mmlu_pro": 75.0,
      "gpqa": 61.0,
      "swe_bench": 44.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-coder-32b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 Coder 32B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 32.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "32B GPT-4o급 코딩 오픈 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.2,
      "output_price_per_1m": 0.6,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1275,
      "mmlu_pro": 76.2,
      "gpqa": 54.0,
      "swe_bench": 45.2
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-2024-05-13",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o (2024-05-13)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "GPT-4o 최초 데뷔 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o",
    "api_pricing": {
      "input_price_per_1m": 5.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 2.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1270,
      "mmlu_pro": 75.0,
      "gpqa": 51.0,
      "swe_bench": 36.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-audio-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o Audio Preview",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Audio Native",
    "context_window": 128000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "audio"
    ],
    "description": "오디오 입력 및 음성 직접 생성 API",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o-audio",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o-audio",
    "api_pricing": {
      "input_price_per_1m": 2.5,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 1.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1270,
      "mmlu_pro": 74.0,
      "gpqa": 49.0,
      "swe_bench": 34.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "llama-3-2-90b-vision-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Llama 3.2 90B Vision (on Bedrock)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Llama Community (Hosted)",
    "parameter_count_b": 90.0,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "AWS 서버리스 호스팅 Llama 3.2 90B 비전 모델",
    "official_url": "https://aws.amazon.com/bedrock/llama",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.9,
      "output_price_per_1m": 0.9,
      "cached_input_price_per_1m": 0.22,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1270,
      "mmlu_pro": 75.0,
      "gpqa": 51.0,
      "swe_bench": 36.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "mistral-large-2-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Mistral Large 2 (on Bedrock)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary (Hosted)",
    "parameter_count_b": 123.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "AWS 서버리스 호스팅 Mistral Large 2",
    "official_url": "https://aws.amazon.com/bedrock/mistral",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 2.0,
      "output_price_per_1m": 6.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1270,
      "mmlu_pro": 75.5,
      "gpqa": 51.0,
      "swe_bench": 36.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-v2-5",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek V2.5",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 236.0,
    "architecture": "MoE",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Coder V2와 Chat 기능 통합 버전",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.14,
      "output_price_per_1m": 0.28,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1270,
      "mmlu_pro": 75.0,
      "gpqa": 53.0,
      "swe_bench": 41.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-2-90b-vision",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.2 90B Vision",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 90.0,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Meta 대표 90B 비전 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.9,
      "output_price_per_1m": 0.9,
      "cached_input_price_per_1m": 0.22,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1270,
      "mmlu_pro": 75.0,
      "gpqa": 51.0,
      "swe_bench": 36.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "groq-llama-3-3-70b",
    "provider_id": "groq",
    "provider_name": "Groq",
    "name": "Llama 3.3 70B (Groq LPU)",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Groq LPU 초고속 Llama 3.3 70B. 업계 최저 레이턴시 서빙",
    "official_url": "https://console.groq.com",
    "source_docs_url": "https://console.groq.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.59,
      "output_price_per_1m": 0.79,
      "cached_input_price_per_1m": 0.14,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1270,
      "mmlu_pro": 72.0,
      "gpqa": 50.0,
      "swe_bench": 38.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-coder-v2",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek Coder V2 (236B)",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 236.0,
    "architecture": "MoE (Active 21B)",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "338개 언어 지원 코딩 특화 모델",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.14,
      "output_price_per_1m": 0.28,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1268,
      "mmlu_pro": 74.8,
      "gpqa": 52.1,
      "swe_bench": 43.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "phi-4-14b",
    "provider_id": "microsoft",
    "provider_name": "Microsoft",
    "name": "Phi-4 14B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 14.0,
    "architecture": "Dense",
    "context_window": 64000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "수학/논리 추론 특화 14B 모델",
    "official_url": "https://huggingface.co/microsoft/phi-4",
    "source_docs_url": "https://huggingface.co/microsoft",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.45,
      "cached_input_price_per_1m": 0.04,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1265,
      "mmlu_pro": 76.0,
      "gpqa": 56.8,
      "swe_bench": 38.2
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-1.5-pro-002",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 1.5 Pro (002)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal MoE",
    "context_window": 2000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio",
      "video"
    ],
    "description": "200만 토큰 정식 안정화 스냅샷",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 3.5,
      "output_price_per_1m": 10.5,
      "cached_input_price_per_1m": 0.875,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1262,
      "mmlu_pro": 74.5,
      "gpqa": 50.0,
      "swe_bench": 35.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "mixtral-8x22b",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Mixtral 8x22B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 141.0,
    "architecture": "MoE (Active 39B)",
    "context_window": 64000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "오픈소스 MoE 대표 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 0.9,
      "output_price_per_1m": 2.7,
      "cached_input_price_per_1m": 0.22,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1262,
      "mmlu_pro": 73.5,
      "gpqa": 49.0,
      "swe_bench": 36.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-3.5-flash-lite",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 3.5 Flash-Lite",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "1M 토큰 당 단가 효율성 최상위 모델",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 0.3,
      "output_price_per_1m": 2.5,
      "cached_input_price_per_1m": 0.08,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1260,
      "mmlu_pro": 74.1,
      "gpqa": 52.0,
      "swe_bench": 34.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "llama-3-1-70b-instruct",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.1 70B Instruct",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "3.1 세대 70B 표준 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.45,
      "output_price_per_1m": 1.35,
      "cached_input_price_per_1m": 0.11,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1260,
      "mmlu_pro": 74.0,
      "gpqa": 49.0,
      "swe_bench": 33.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "cohere-command-r-plus-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Command R+ (on Bedrock)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "CC-BY-NC-4.0 (Hosted)",
    "parameter_count_b": 104.0,
    "architecture": "Dense RAG",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "AWS 서버리스 호스팅 Command R+ 104B",
    "official_url": "https://aws.amazon.com/bedrock/cohere",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1258,
      "mmlu_pro": 74.2,
      "gpqa": 48.0,
      "swe_bench": 35.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "cohere-command-r-plus",
    "provider_id": "cohere",
    "provider_name": "Cohere",
    "name": "Command R+",
    "tier": "Frontier",
    "is_open_weight": true,
    "license_type": "CC-BY-NC-4.0",
    "parameter_count_b": 104.0,
    "architecture": "Dense RAG",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "기업용 RAG 전용 104B 모델",
    "official_url": "https://docs.cohere.com/docs/models",
    "source_docs_url": "https://docs.cohere.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 2.5,
      "output_price_per_1m": 10.0,
      "cached_input_price_per_1m": 0.625,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1258,
      "mmlu_pro": 74.2,
      "gpqa": 48.0,
      "swe_bench": 35.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-opus-20240229",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3 Opus (20240229)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 3 세대 최상위 플래그십",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 15.0,
      "output_price_per_1m": 75.0,
      "cached_input_price_per_1m": 3.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1256,
      "mmlu_pro": 75.0,
      "gpqa": 50.4,
      "swe_bench": 38.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-opus-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Claude 3 Opus (on Bedrock)",
    "tier": "Frontier",
    "is_open_weight": false,
    "license_type": "Proprietary (Hosted)",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "AWS 관리형 서버리스 호스팅 Claude 3 Opus",
    "official_url": "https://aws.amazon.com/bedrock/claude",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 15.0,
      "output_price_per_1m": 75.0,
      "cached_input_price_per_1m": 3.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 10000,
      "tpm": 2000000,
      "rpd": 100000,
      "concurrency_limit": 500
    },
    "benchmarks": {
      "arena_elo": 1256,
      "mmlu_pro": 75.0,
      "gpqa": 50.4,
      "swe_bench": 38.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-1.5-pro-001",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 1.5 Pro (001)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal MoE",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "1.5 Pro 오리지널 릴리스 스냅샷",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 3.5,
      "output_price_per_1m": 10.5,
      "cached_input_price_per_1m": 0.875,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1255,
      "mmlu_pro": 73.5,
      "gpqa": 49.0,
      "swe_bench": 33.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "codestral-22b",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Codestral 22B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MNPL",
    "parameter_count_b": 22.0,
    "architecture": "Dense",
    "context_window": 32000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "코드 전용 22B 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 0.3,
      "output_price_per_1m": 0.9,
      "cached_input_price_per_1m": 0.08,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1255,
      "mmlu_pro": 72.0,
      "gpqa": 48.5,
      "swe_bench": 41.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-turbo",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4 Turbo (Latest)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "GPT-4 가속 버전 최신 릴리스",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "api_pricing": {
      "input_price_per_1m": 10.0,
      "output_price_per_1m": 30.0,
      "cached_input_price_per_1m": 5.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1250,
      "mmlu_pro": 73.2,
      "gpqa": 49.0,
      "swe_bench": 33.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-turbo-2024-04-09",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4 Turbo (2024-04-09)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "비전 통합 GPT-4 Turbo 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "api_pricing": {
      "input_price_per_1m": 10.0,
      "output_price_per_1m": 30.0,
      "cached_input_price_per_1m": 5.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1250,
      "mmlu_pro": 73.2,
      "gpqa": 49.0,
      "swe_bench": 33.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "groq-llama-3-1-70b",
    "provider_id": "groq",
    "provider_name": "Groq",
    "name": "Llama 3.1 70B (Groq LPU)",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 131072,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Groq LPU 서빙 Llama 3.1 70B. 실시간 레이턴시 최적화",
    "official_url": "https://console.groq.com",
    "source_docs_url": "https://console.groq.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.59,
      "output_price_per_1m": 0.79,
      "cached_input_price_per_1m": 0.14,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1250,
      "mmlu_pro": 70.0,
      "gpqa": 46.0,
      "swe_bench": 36.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-0125-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4 Turbo Preview (0125)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "코드 생성 수정을 거친 프리뷰",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "api_pricing": {
      "input_price_per_1m": 10.0,
      "output_price_per_1m": 30.0,
      "cached_input_price_per_1m": 5.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1245,
      "mmlu_pro": 72.5,
      "gpqa": 48.0,
      "swe_bench": 32.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-1106-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4 Turbo Preview (1106)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "DevDay 최초 공개 128k 프리뷰",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "api_pricing": {
      "input_price_per_1m": 10.0,
      "output_price_per_1m": 30.0,
      "cached_input_price_per_1m": 5.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1240,
      "mmlu_pro": 72.0,
      "gpqa": 47.0,
      "swe_bench": 31.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-5-haiku-20241022",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3.5 Haiku (20241022)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Opus급 지능을 가진 초고속 3.5 Haiku 스냅샷",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 0.8,
      "output_price_per_1m": 4.0,
      "cached_input_price_per_1m": 0.2,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1240,
      "mmlu_pro": 71.2,
      "gpqa": 48.0,
      "swe_bench": 33.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemma-2-27b",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemma 2 27B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Gemma Terms",
    "parameter_count_b": 27.0,
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "Google 오픈웨이트 27B 대표 모델",
    "official_url": "https://ai.google.dev/gemma",
    "source_docs_url": "https://ai.google.dev/gemma",
    "api_pricing": {
      "input_price_per_1m": 0.27,
      "output_price_per_1m": 0.27,
      "cached_input_price_per_1m": 0.06,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1240,
      "mmlu_pro": 71.0,
      "gpqa": 43.0,
      "swe_bench": 28.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-70b-instruct",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3 70B Instruct",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 2048,
    "modality": [
      "text"
    ],
    "description": "Llama 3 1세대 70B 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.5,
      "output_price_per_1m": 1.5,
      "cached_input_price_per_1m": 0.12,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1240,
      "mmlu_pro": 71.0,
      "gpqa": 44.0,
      "swe_bench": 28.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-turbo",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 Turbo",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "Dense",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "1M 장문 가성비 API",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.05,
      "output_price_per_1m": 0.2,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1240,
      "mmlu_pro": 70.0,
      "gpqa": 45.0,
      "swe_bench": 30.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-32b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 32B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 32.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "32B 표준 오픈 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.2,
      "output_price_per_1m": 0.6,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1240,
      "mmlu_pro": 71.0,
      "gpqa": 48.0,
      "swe_bench": 31.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "perplexity-sonar",
    "provider_id": "perplexity",
    "provider_name": "Perplexity AI",
    "name": "Sonar",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary API",
    "architecture": "Web Search Fine-Tuned",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "경량 실시간 웹 검색 통합 LLM. 저비용 검색 쿼리 최적화",
    "official_url": "https://docs.perplexity.ai/guides/model-cards",
    "source_docs_url": "https://docs.perplexity.ai/guides/model-cards",
    "api_pricing": {
      "input_price_per_1m": 1.0,
      "output_price_per_1m": 1.0,
      "cached_input_price_per_1m": 0.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1240,
      "mmlu_pro": 68.0,
      "gpqa": 45.0,
      "swe_bench": 28.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-vision-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4 Vision Preview (1106)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "초기 비전 지원 프리뷰 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "api_pricing": {
      "input_price_per_1m": 10.0,
      "output_price_per_1m": 30.0,
      "cached_input_price_per_1m": 5.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1235,
      "mmlu_pro": 71.0,
      "gpqa": 46.0,
      "swe_bench": 30.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "amazon-nova-lite",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Amazon Nova Lite",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary (AWS)",
    "architecture": "Native Multimodal",
    "context_window": 300000,
    "max_output_tokens": 5000,
    "modality": [
      "text",
      "vision"
    ],
    "description": "저렴한 이미지/비디오 분석 경량 모델",
    "official_url": "https://aws.amazon.com/bedrock/nova",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.06,
      "output_price_per_1m": 0.24,
      "cached_input_price_per_1m": 0.015,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1235,
      "mmlu_pro": 68.0,
      "gpqa": 43.5,
      "swe_bench": 29.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-r1-distill-qwen-14b",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek R1 Distill Qwen 14B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 14.0,
    "architecture": "Dense Distilled RL",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "Qwen 2.5 14B 기반 경량 R1 추론 증류 모델",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.3,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1235,
      "mmlu_pro": 70.0,
      "gpqa": 52.0,
      "swe_bench": 36.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": true,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "mistral-small-2409",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Mistral Small (2409)",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 24.0,
    "architecture": "Dense",
    "context_window": 32000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "24B 오픈 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 0.2,
      "output_price_per_1m": 0.6,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1230,
      "mmlu_pro": 69.0,
      "gpqa": 42.0,
      "swe_bench": 28.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "phi-3-5-moe",
    "provider_id": "microsoft",
    "provider_name": "Microsoft",
    "name": "Phi-3.5 MoE (16B)",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 16.0,
    "architecture": "MoE (Active 6.6B)",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "16B MoE 소형 모델",
    "official_url": "https://huggingface.co/microsoft",
    "source_docs_url": "https://huggingface.co/microsoft",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.45,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1230,
      "mmlu_pro": 69.0,
      "gpqa": 44.0,
      "swe_bench": 28.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-llm-67b",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek LLM 67B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 67.0,
    "architecture": "Dense",
    "context_window": 4096,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "초기 67B 오리지널 모델",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.2,
      "output_price_per_1m": 0.4,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1225,
      "mmlu_pro": 68.0,
      "gpqa": 41.0,
      "swe_bench": 26.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-mini",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o mini (Latest)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "가성비 소형 모델 공식 최신 버전",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o-mini",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o-mini",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.6,
      "cached_input_price_per_1m": 0.075,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1220,
      "mmlu_pro": 65.2,
      "gpqa": 41.0,
      "swe_bench": 28.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-mini-2024-07-18",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o mini (2024-07-18)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 16384,
    "modality": [
      "text",
      "vision"
    ],
    "description": "GPT-4o mini 공식 7월 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o-mini",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o-mini",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.6,
      "cached_input_price_per_1m": 0.075,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1220,
      "mmlu_pro": 65.2,
      "gpqa": 41.0,
      "swe_bench": 28.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-coder-14b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 Coder 14B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 14.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "14B 코딩 특화 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.3,
      "cached_input_price_per_1m": 0.02,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1220,
      "mmlu_pro": 68.0,
      "gpqa": 44.0,
      "swe_bench": 36.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "phi-4-multimodal-5.6b",
    "provider_id": "microsoft",
    "provider_name": "Microsoft",
    "name": "Phi-4 Multimodal (5.6B)",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 5.6,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "5.6B 옴니 멀티모달 모델",
    "official_url": "https://huggingface.co/microsoft",
    "source_docs_url": "https://huggingface.co/microsoft",
    "api_pricing": {
      "input_price_per_1m": 0.08,
      "output_price_per_1m": 0.24,
      "cached_input_price_per_1m": 0.02,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1220,
      "mmlu_pro": 67.0,
      "gpqa": 42.0,
      "swe_bench": 26.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "groq-gemma2-9b",
    "provider_id": "groq",
    "provider_name": "Groq",
    "name": "Gemma 2 9B (Groq LPU)",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Gemma License",
    "parameter_count_b": 9.0,
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "Groq LPU 서빙 Google Gemma 2 9B. 소형 고성능 모델",
    "official_url": "https://console.groq.com",
    "source_docs_url": "https://console.groq.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.2,
      "output_price_per_1m": 0.2,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1220,
      "mmlu_pro": 65.0,
      "gpqa": 40.0,
      "swe_bench": 30.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "mistral-nemo-12b",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Mistral NeMo 12B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 12.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "128K 컨텍스트 12B 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.45,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1215,
      "mmlu_pro": 66.5,
      "gpqa": 38.0,
      "swe_bench": 24.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4o-mini-realtime-preview",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4o mini Realtime Preview",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal Realtime",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "audio"
    ],
    "description": "소형 초저지연 음성 대화 API",
    "official_url": "https://platform.openai.com/docs/models/gpt-4o-realtime",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4o-realtime",
    "api_pricing": {
      "input_price_per_1m": 0.6,
      "output_price_per_1m": 2.4,
      "cached_input_price_per_1m": 0.3,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1210,
      "mmlu_pro": 63.0,
      "gpqa": 38.0,
      "swe_bench": 25.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "deepseek-math-7b",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek Math 7B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 7.0,
    "architecture": "Dense",
    "context_window": 4096,
    "max_output_tokens": 2048,
    "modality": [
      "text"
    ],
    "description": "수학 증명 7B 소형 오픈소스 모델",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.07,
      "output_price_per_1m": 0.14,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1210,
      "mmlu_pro": 65.0,
      "gpqa": 46.0,
      "swe_bench": 25.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-14b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 14B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 14.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "14B 가성비 오픈 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.3,
      "cached_input_price_per_1m": 0.02,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1210,
      "mmlu_pro": 65.0,
      "gpqa": 40.0,
      "swe_bench": 24.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "pixtral-12b",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Pixtral 12B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 12.0,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "12B 비전 오픈 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.45,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1210,
      "mmlu_pro": 65.0,
      "gpqa": 39.0,
      "swe_bench": 22.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "phi-4-mini-3.8b",
    "provider_id": "microsoft",
    "provider_name": "Microsoft",
    "name": "Phi-4 mini (3.8B)",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 3.8,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "3.8B 고속 추론 소형 모델",
    "official_url": "https://huggingface.co/microsoft",
    "source_docs_url": "https://huggingface.co/microsoft",
    "api_pricing": {
      "input_price_per_1m": 0.06,
      "output_price_per_1m": 0.18,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1210,
      "mmlu_pro": 65.0,
      "gpqa": 40.0,
      "swe_bench": 25.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-1.5-flash-002",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 1.5 Flash (002)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal MoE",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision",
      "audio"
    ],
    "description": "최신 1.5 Flash 002 스냅샷",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 0.075,
      "output_price_per_1m": 0.3,
      "cached_input_price_per_1m": 0.018,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1205,
      "mmlu_pro": 64.0,
      "gpqa": 37.5,
      "swe_bench": 22.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "cohere-command-r",
    "provider_id": "cohere",
    "provider_name": "Cohere",
    "name": "Command R",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "CC-BY-NC-4.0",
    "parameter_count_b": 35.0,
    "architecture": "Dense RAG",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "가성비 RAG 연동 35B 모델",
    "official_url": "https://docs.cohere.com/docs/models",
    "source_docs_url": "https://docs.cohere.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.5,
      "output_price_per_1m": 1.5,
      "cached_input_price_per_1m": 0.125,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1205,
      "mmlu_pro": 65.0,
      "gpqa": 38.0,
      "swe_bench": 22.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-sonnet-20240229",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3 Sonnet (20240229)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 3 세대 표준 주력 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 3.0,
      "output_price_per_1m": 15.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1200,
      "mmlu_pro": 65.0,
      "gpqa": 40.0,
      "swe_bench": 25.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "deepseek-coder-33b",
    "provider_id": "deepseek",
    "provider_name": "DeepSeek",
    "name": "DeepSeek Coder 33B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 33.0,
    "architecture": "Dense",
    "context_window": 16384,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "1세대 33B 코드 모델",
    "official_url": "https://api-docs.deepseek.com",
    "source_docs_url": "https://api-docs.deepseek.com",
    "api_pricing": {
      "input_price_per_1m": 0.12,
      "output_price_per_1m": 0.24,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1200,
      "mmlu_pro": 63.0,
      "gpqa": 36.0,
      "swe_bench": 30.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-2-11b-vision",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.2 11B Vision",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 11.0,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "경량화 11B 비전 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.16,
      "output_price_per_1m": 0.16,
      "cached_input_price_per_1m": 0.04,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1200,
      "mmlu_pro": 61.0,
      "gpqa": 36.0,
      "swe_bench": 21.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-vl-7b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 VL 7B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 7.0,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "7B 경량 비전 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.08,
      "output_price_per_1m": 0.24,
      "cached_input_price_per_1m": 0.02,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1200,
      "mmlu_pro": 63.0,
      "gpqa": 38.0,
      "swe_bench": 22.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-32k-0613",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4 32k (0613)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 32768,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "오리지널 32k 고장문 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "api_pricing": {
      "input_price_per_1m": 60.0,
      "output_price_per_1m": 120.0,
      "cached_input_price_per_1m": 30.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1190,
      "mmlu_pro": 65.0,
      "gpqa": 40.0,
      "swe_bench": 23.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-7b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 7B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 7.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "7B 초소형 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.05,
      "output_price_per_1m": 0.15,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1190,
      "mmlu_pro": 61.0,
      "gpqa": 35.0,
      "swe_bench": 22.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "codestral-mamba-7b",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Codestral Mamba 7B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 7.0,
    "architecture": "Mamba (SSM)",
    "context_window": 256000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "Mamba SSM 256k 코드 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.45,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1190,
      "mmlu_pro": 60.0,
      "gpqa": 35.0,
      "swe_bench": 25.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "groq-mixtral-8x7b",
    "provider_id": "groq",
    "provider_name": "Groq",
    "name": "Mixtral 8x7B (Groq LPU)",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 56.0,
    "architecture": "MoE",
    "context_window": 32768,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "Groq LPU 초고속 Mixtral MoE. 저비용 대량 처리 최적화",
    "official_url": "https://console.groq.com",
    "source_docs_url": "https://console.groq.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.24,
      "output_price_per_1m": 0.24,
      "cached_input_price_per_1m": 0.06,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1190,
      "mmlu_pro": 60.0,
      "gpqa": 35.0,
      "swe_bench": 26.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "cohere-command-r7b",
    "provider_id": "cohere",
    "provider_name": "Cohere",
    "name": "Command R7B",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "초경량 7B Command 모델. 엣지/저비용 RAG 파이프라인 최적화",
    "official_url": "https://docs.cohere.com/docs/models",
    "source_docs_url": "https://docs.cohere.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.0375,
      "output_price_per_1m": 0.15,
      "cached_input_price_per_1m": 0.009,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1190,
      "mmlu_pro": 58.0,
      "gpqa": 32.0,
      "swe_bench": 18.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-4-0613",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-4 (0613)",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "오리지널 8k 고정밀 텍스트 모델",
    "official_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo",
    "api_pricing": {
      "input_price_per_1m": 30.0,
      "output_price_per_1m": 60.0,
      "cached_input_price_per_1m": 15.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1185,
      "mmlu_pro": 64.8,
      "gpqa": 39.0,
      "swe_bench": 22.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-haiku-20240307",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 3 Haiku (20240307)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "Claude 3 세대 고속 경량 스냅샷",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 0.25,
      "output_price_per_1m": 1.25,
      "cached_input_price_per_1m": 0.06,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1180,
      "mmlu_pro": 59.0,
      "gpqa": 32.0,
      "swe_bench": 20.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemma-2-9b",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemma 2 9B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Gemma Terms",
    "parameter_count_b": 9.0,
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "단일 GPU 전용 9B 오픈 모델",
    "official_url": "https://ai.google.dev/gemma",
    "source_docs_url": "https://ai.google.dev/gemma",
    "api_pricing": {
      "input_price_per_1m": 0.08,
      "output_price_per_1m": 0.08,
      "cached_input_price_per_1m": 0.02,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1180,
      "mmlu_pro": 59.5,
      "gpqa": 33.0,
      "swe_bench": 18.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-3-haiku-bedrock",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Claude 3 Haiku (on Bedrock)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary (Hosted)",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "AWS 관리형 서버리스 호스팅 Claude 3 Haiku",
    "official_url": "https://aws.amazon.com/bedrock/claude",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.25,
      "output_price_per_1m": 1.25,
      "cached_input_price_per_1m": 0.06,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1180,
      "mmlu_pro": 59.0,
      "gpqa": 32.0,
      "swe_bench": 20.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-1-8b-instruct",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.1 8B Instruct",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 8.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "8B 경량 오픈 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.05,
      "output_price_per_1m": 0.15,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1180,
      "mmlu_pro": 58.2,
      "gpqa": 32.0,
      "swe_bench": 19.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "mixtral-8x7b",
    "provider_id": "mistral",
    "provider_name": "Mistral AI",
    "name": "Mixtral 8x7B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 47.0,
    "architecture": "MoE (Active 13B)",
    "context_window": 32000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "8x7B MoE 대표 모델",
    "official_url": "https://docs.mistral.ai",
    "source_docs_url": "https://docs.mistral.ai/getting-started/models/models_overview",
    "api_pricing": {
      "input_price_per_1m": 0.45,
      "output_price_per_1m": 0.45,
      "cached_input_price_per_1m": 0.1,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1180,
      "mmlu_pro": 60.0,
      "gpqa": 35.0,
      "swe_bench": 20.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "amazon-nova-micro",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Amazon Nova Micro",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary (AWS)",
    "architecture": "Text-only Dense",
    "context_window": 128000,
    "max_output_tokens": 5000,
    "modality": [
      "text"
    ],
    "description": "초저지연 대화 전용 초소형 모델",
    "official_url": "https://aws.amazon.com/bedrock/nova",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.035,
      "output_price_per_1m": 0.14,
      "cached_input_price_per_1m": 0.009,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1175,
      "mmlu_pro": 57.5,
      "gpqa": 31.0,
      "swe_bench": 18.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-1.5-flash-8b",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 1.5 Flash-8B",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 1000000,
    "max_output_tokens": 8192,
    "modality": [
      "text",
      "vision"
    ],
    "description": "8B 스케일 초저비용 대량 변환용 모델",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 0.0375,
      "output_price_per_1m": 0.15,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1170,
      "mmlu_pro": 56.0,
      "gpqa": 30.0,
      "swe_bench": 17.5
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-coder-7b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 Coder 7B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 7.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 8192,
    "modality": [
      "text"
    ],
    "description": "7B 경량 코드 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.05,
      "output_price_per_1m": 0.15,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1170,
      "mmlu_pro": 58.0,
      "gpqa": 32.0,
      "swe_bench": 28.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "phi-3-5-vision",
    "provider_id": "microsoft",
    "provider_name": "Microsoft",
    "name": "Phi-3.5 Vision (4.2B)",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 4.2,
    "architecture": "Multimodal",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text",
      "vision"
    ],
    "description": "경량 비전 멀티모달 모델",
    "official_url": "https://huggingface.co/microsoft",
    "source_docs_url": "https://huggingface.co/microsoft",
    "api_pricing": {
      "input_price_per_1m": 0.06,
      "output_price_per_1m": 0.18,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1170,
      "mmlu_pro": 56.0,
      "gpqa": 30.0,
      "swe_bench": 18.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "phi-3-5-mini",
    "provider_id": "microsoft",
    "provider_name": "Microsoft",
    "name": "Phi-3.5 mini (3.8B)",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "MIT",
    "parameter_count_b": 3.8,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "모바일 Edge 3.8B 초소형 모델",
    "official_url": "https://huggingface.co/microsoft",
    "source_docs_url": "https://huggingface.co/microsoft",
    "api_pricing": {
      "input_price_per_1m": 0.05,
      "output_price_per_1m": 0.15,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1160,
      "mmlu_pro": 54.0,
      "gpqa": 28.0,
      "swe_bench": 16.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-2.1",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 2.1",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 200000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "200k 컨텍스트 초기 지원 레거시 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 8.0,
      "output_price_per_1m": 24.0,
      "cached_input_price_per_1m": 2.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1150,
      "mmlu_pro": 55.0,
      "gpqa": 28.0,
      "swe_bench": 15.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-8b-instruct",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3 8B Instruct",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 8.0,
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 2048,
    "modality": [
      "text"
    ],
    "description": "Llama 3 1세대 8B 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.06,
      "output_price_per_1m": 0.06,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1150,
      "mmlu_pro": 53.0,
      "gpqa": 28.0,
      "swe_bench": 15.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "code-llama-70b",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Code Llama 70B",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama 2 License",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 16384,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "코드 전용 70B 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.7,
      "output_price_per_1m": 0.7,
      "cached_input_price_per_1m": 0.15,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1150,
      "mmlu_pro": 55.0,
      "gpqa": 30.0,
      "swe_bench": 28.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-2-3b",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.2 3B",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 3.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "모바일 디바이스 3B 경량 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.04,
      "output_price_per_1m": 0.04,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1140,
      "mmlu_pro": 50.0,
      "gpqa": 26.0,
      "swe_bench": 12.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-2.0",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude 2.0",
    "tier": "Mid",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 100000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "Claude 2세대 초기 대화 레거시 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 8.0,
      "output_price_per_1m": 24.0,
      "cached_input_price_per_1m": 2.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1130,
      "mmlu_pro": 52.0,
      "gpqa": 25.0,
      "swe_bench": 12.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "amazon-titan-text-express",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Amazon Titan Text Express",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary (AWS)",
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "AWS 자체 텍스트 생성 표준 모델",
    "official_url": "https://aws.amazon.com/bedrock/titan",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.2,
      "output_price_per_1m": 0.8,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1130,
      "mmlu_pro": 53.0,
      "gpqa": 25.0,
      "swe_bench": 12.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemini-1.0-pro-001",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemini 1.0 Pro (001)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Native Multimodal",
    "context_window": 32768,
    "max_output_tokens": 2048,
    "modality": [
      "text"
    ],
    "description": "초기 Gemini 1.0 세대 대화 스냅샷",
    "official_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "source_docs_url": "https://ai.google.dev/gemini-api/docs/models/gemini",
    "api_pricing": {
      "input_price_per_1m": 0.5,
      "output_price_per_1m": 1.5,
      "cached_input_price_per_1m": 0.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1120,
      "mmlu_pro": 53.0,
      "gpqa": 26.0,
      "swe_bench": 13.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": true,
    "is_deprecated": false
  },
  {
    "id": "gemma-7b",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemma 1.0 7B",
    "tier": "Small",
    "is_open_weight": true,
    "license_type": "Gemma Terms",
    "parameter_count_b": 7.0,
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 2048,
    "modality": [
      "text"
    ],
    "description": "1세대 7B 오픈 레거시 모델",
    "official_url": "https://ai.google.dev/gemma",
    "source_docs_url": "https://ai.google.dev/gemma",
    "api_pricing": {
      "input_price_per_1m": 0.07,
      "output_price_per_1m": 0.07,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1120,
      "mmlu_pro": 50.0,
      "gpqa": 24.0,
      "swe_bench": 12.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "qwen-2-5-3b",
    "provider_id": "alibaba",
    "provider_name": "Alibaba Cloud (Qwen)",
    "name": "Qwen 2.5 3B",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "Apache 2.0",
    "parameter_count_b": 3.0,
    "architecture": "Dense",
    "context_window": 32000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "3B 온디바이스 모델",
    "official_url": "https://qwenlm.github.io",
    "source_docs_url": "https://qwenlm.github.io",
    "api_pricing": {
      "input_price_per_1m": 0.03,
      "output_price_per_1m": 0.09,
      "cached_input_price_per_1m": 0.005,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1120,
      "mmlu_pro": 48.0,
      "gpqa": 24.0,
      "swe_bench": 12.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-3.5-turbo-0125",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-3.5 Turbo (0125)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 16385,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "16k 컨텍스트 및 이행 능력 향상 최신 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-3-5-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-3-5-turbo",
    "api_pricing": {
      "input_price_per_1m": 0.5,
      "output_price_per_1m": 1.5,
      "cached_input_price_per_1m": 0.25,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1115,
      "mmlu_pro": 52.0,
      "gpqa": 25.0,
      "swe_bench": 12.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-3.5-turbo-1106",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-3.5 Turbo (1106)",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 16385,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "16k 기본 탑재 11월 스냅샷",
    "official_url": "https://platform.openai.com/docs/models/gpt-3-5-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-3-5-turbo",
    "api_pricing": {
      "input_price_per_1m": 1.0,
      "output_price_per_1m": 2.0,
      "cached_input_price_per_1m": 0.5,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1110,
      "mmlu_pro": 51.0,
      "gpqa": 24.0,
      "swe_bench": 11.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "claude-instant-1.2",
    "provider_id": "anthropic",
    "provider_name": "Anthropic",
    "name": "Claude Instant 1.2",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 100000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "초저지연 레거시 대화 모델",
    "official_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "source_docs_url": "https://docs.anthropic.com/en/docs/about-claude/models",
    "api_pricing": {
      "input_price_per_1m": 0.8,
      "output_price_per_1m": 2.4,
      "cached_input_price_per_1m": 0.2,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1110,
      "mmlu_pro": 48.0,
      "gpqa": 22.0,
      "swe_bench": 10.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gpt-3.5-turbo-instruct",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "GPT-3.5 Turbo Instruct",
    "tier": "Small",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Dense",
    "context_window": 4096,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "Direct completion 전용 instruct 모델",
    "official_url": "https://platform.openai.com/docs/models/gpt-3-5-turbo",
    "source_docs_url": "https://platform.openai.com/docs/models/gpt-3-5-turbo",
    "api_pricing": {
      "input_price_per_1m": 1.5,
      "output_price_per_1m": 2.0,
      "cached_input_price_per_1m": 0.75,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 3000,
      "tpm": 400000,
      "rpd": 30000,
      "concurrency_limit": 100
    },
    "benchmarks": {
      "arena_elo": 1100,
      "mmlu_pro": 49.0,
      "gpqa": 22.0,
      "swe_bench": 10.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "gemma-2-2b",
    "provider_id": "google",
    "provider_name": "Google AI",
    "name": "Gemma 2 2B",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "Gemma Terms",
    "parameter_count_b": 2.0,
    "architecture": "Dense",
    "context_window": 8192,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "모바일 Edge 온디바이스 2B 오픈 모델",
    "official_url": "https://ai.google.dev/gemma",
    "source_docs_url": "https://ai.google.dev/gemma",
    "api_pricing": {
      "input_price_per_1m": 0.02,
      "output_price_per_1m": 0.02,
      "cached_input_price_per_1m": 0.005,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1100,
      "mmlu_pro": 45.0,
      "gpqa": 20.0,
      "swe_bench": 10.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-2-70b-chat",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 2 70B Chat",
    "tier": "Mid",
    "is_open_weight": true,
    "license_type": "Llama 2 License",
    "parameter_count_b": 70.0,
    "architecture": "Dense",
    "context_window": 4096,
    "max_output_tokens": 2048,
    "modality": [
      "text"
    ],
    "description": "Llama 2세대 레거시 70B 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.7,
      "output_price_per_1m": 0.7,
      "cached_input_price_per_1m": 0.15,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 5000,
      "tpm": 800000,
      "rpd": 50000,
      "concurrency_limit": 200
    },
    "benchmarks": {
      "arena_elo": 1100,
      "mmlu_pro": 49.0,
      "gpqa": 22.0,
      "swe_bench": 8.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "amazon-titan-text-lite",
    "provider_id": "aws_bedrock",
    "provider_name": "AWS Bedrock",
    "name": "Amazon Titan Text Lite",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary (AWS)",
    "architecture": "Dense",
    "context_window": 4096,
    "max_output_tokens": 2048,
    "modality": [
      "text"
    ],
    "description": "단순 요약 전용 AWS 초경량 모델",
    "official_url": "https://aws.amazon.com/bedrock/titan",
    "source_docs_url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    "api_pricing": {
      "input_price_per_1m": 0.15,
      "output_price_per_1m": 0.2,
      "cached_input_price_per_1m": 0.03,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1090,
      "mmlu_pro": 44.0,
      "gpqa": 20.0,
      "swe_bench": 8.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "llama-3-2-1b",
    "provider_id": "meta",
    "provider_name": "Meta AI",
    "name": "Llama 3.2 1B",
    "tier": "Micro",
    "is_open_weight": true,
    "license_type": "Llama Community",
    "parameter_count_b": 1.0,
    "architecture": "Dense",
    "context_window": 128000,
    "max_output_tokens": 4096,
    "modality": [
      "text"
    ],
    "description": "1B 온디바이스 초소형 모델",
    "official_url": "https://llama.meta.com",
    "source_docs_url": "https://llama.meta.com/docs/model-cards-and-prompt-formats",
    "api_pricing": {
      "input_price_per_1m": 0.02,
      "output_price_per_1m": 0.02,
      "cached_input_price_per_1m": 0.005,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {
      "arena_elo": 1080,
      "mmlu_pro": 40.0,
      "gpqa": 18.0,
      "swe_bench": 6.0
    },
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "text-embedding-3-large",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "Text Embedding 3 Large",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Embedding",
    "context_window": 8191,
    "max_output_tokens": 0,
    "modality": [
      "text"
    ],
    "description": "3072차원 최상위 벡터 임베딩",
    "official_url": "https://platform.openai.com/docs/models/embeddings",
    "source_docs_url": "https://platform.openai.com/docs/models/embeddings",
    "api_pricing": {
      "input_price_per_1m": 0.13,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.06,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "whisper-1",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "Whisper v2 Large",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Speech-to-Text",
    "context_window": 0,
    "max_output_tokens": 0,
    "modality": [
      "audio"
    ],
    "description": "다국어 음성 인식 및 번역. 99개 언어 지원 공식 STT API",
    "official_url": "https://platform.openai.com/docs/models/whisper",
    "source_docs_url": "https://platform.openai.com/docs/models/whisper",
    "api_pricing": {
      "input_price_per_1m": 0.006,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.006,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "dall-e-3",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "DALL-E 3",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Image Generation",
    "context_window": 0,
    "max_output_tokens": 0,
    "modality": [
      "image"
    ],
    "description": "텍스트 기반 고품질 이미지 생성. 1024x1024/1792x1024 지원",
    "official_url": "https://platform.openai.com/docs/models/dall-e",
    "source_docs_url": "https://platform.openai.com/docs/models/dall-e",
    "api_pricing": {
      "input_price_per_1m": 0.04,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.04,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "dall-e-2",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "DALL-E 2",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Image Generation",
    "context_window": 0,
    "max_output_tokens": 0,
    "modality": [
      "image"
    ],
    "description": "이미지 편집/변형(inpainting/outpainting) 지원 레거시 이미지 모델",
    "official_url": "https://platform.openai.com/docs/models/dall-e",
    "source_docs_url": "https://platform.openai.com/docs/models/dall-e",
    "api_pricing": {
      "input_price_per_1m": 0.02,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.02,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "tts-1",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "TTS-1",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Text-to-Speech",
    "context_window": 0,
    "max_output_tokens": 0,
    "modality": [
      "audio"
    ],
    "description": "저지연 실시간 음성 합성. 6개 음성(alloy, echo, fable, onyx, nova, shimmer)",
    "official_url": "https://platform.openai.com/docs/models/tts",
    "source_docs_url": "https://platform.openai.com/docs/models/tts",
    "api_pricing": {
      "input_price_per_1m": 15.0,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 15.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "tts-1-hd",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "TTS-1 HD",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Text-to-Speech HD",
    "context_window": 0,
    "max_output_tokens": 0,
    "modality": [
      "audio"
    ],
    "description": "고품질 오디오 음성 합성. 방송·미디어 수준 HD 음성 출력",
    "official_url": "https://platform.openai.com/docs/models/tts",
    "source_docs_url": "https://platform.openai.com/docs/models/tts",
    "api_pricing": {
      "input_price_per_1m": 30.0,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 30.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "text-embedding-3-small",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "Text Embedding 3 Small",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Embedding",
    "context_window": 8191,
    "max_output_tokens": 0,
    "modality": [
      "text"
    ],
    "description": "1536차원 고속 경량 벡터 임베딩. RAG 구축 최고 가성비",
    "official_url": "https://platform.openai.com/docs/models/embeddings",
    "source_docs_url": "https://platform.openai.com/docs/models/embeddings",
    "api_pricing": {
      "input_price_per_1m": 0.02,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.01,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "text-embedding-ada-002",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "Text Embedding Ada-002",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Embedding",
    "context_window": 8191,
    "max_output_tokens": 0,
    "modality": [
      "text"
    ],
    "description": "1536차원 2세대 임베딩. 기존 레거시 시스템 호환성 유지",
    "official_url": "https://platform.openai.com/docs/models/embeddings",
    "source_docs_url": "https://platform.openai.com/docs/models/embeddings",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.05,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "omni-moderation-latest",
    "provider_id": "openai",
    "provider_name": "OpenAI",
    "name": "Omni Moderation",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Classifier",
    "context_window": 0,
    "max_output_tokens": 0,
    "modality": [
      "text",
      "image"
    ],
    "description": "텍스트 및 이미지 콘텐츠 정책 위반 분류 무료 API",
    "official_url": "https://platform.openai.com/docs/models/moderation",
    "source_docs_url": "https://platform.openai.com/docs/models/moderation",
    "api_pricing": {
      "input_price_per_1m": 0.0,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.0,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "cohere-embed-v3-english",
    "provider_id": "cohere",
    "provider_name": "Cohere",
    "name": "Embed v3 English",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Embedding",
    "context_window": 512,
    "max_output_tokens": 0,
    "modality": [
      "text"
    ],
    "description": "1024차원 영어 특화 임베딩. 분류·검색·클러스터링 SOTA",
    "official_url": "https://docs.cohere.com/docs/models",
    "source_docs_url": "https://docs.cohere.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.025,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  },
  {
    "id": "cohere-embed-v3-multilingual",
    "provider_id": "cohere",
    "provider_name": "Cohere",
    "name": "Embed v3 Multilingual",
    "tier": "Micro",
    "is_open_weight": false,
    "license_type": "Proprietary",
    "architecture": "Embedding",
    "context_window": 512,
    "max_output_tokens": 0,
    "modality": [
      "text"
    ],
    "description": "1024차원 100+ 언어 멀티링구얼 임베딩. 글로벌 다국어 검색",
    "official_url": "https://docs.cohere.com/docs/models",
    "source_docs_url": "https://docs.cohere.com/docs/models",
    "api_pricing": {
      "input_price_per_1m": 0.1,
      "output_price_per_1m": 0.0,
      "cached_input_price_per_1m": 0.025,
      "batch_discount_percent": 0.0
    },
    "quota": {
      "rpm": 1000,
      "tpm": 150000,
      "rpd": 10000,
      "concurrency_limit": 50
    },
    "benchmarks": {},
    "hardware_requirements": [],
    "is_verified": true,
    "supports_reasoning": false,
    "supports_web_search": false,
    "is_deprecated": false
  }
];
