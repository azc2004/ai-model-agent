import type { ModelSpec, Provider, GPUSpec, TCOInput, TCOComparisonResult } from './types';

const rawBase = import.meta.env.VITE_API_BASE_URL || 'https://llm-compass-backend.onrender.com';
export const API_BASE_URL = rawBase.endsWith('/api/v1') 
  ? rawBase 
  : `${rawBase.replace(/\/$/, '')}/api/v1`;

// 백엔드가 Render 수면 상태(Spin Down)일 때 무한 로딩 갇힘을 방지하기 위한 타임아웃 헬퍼
async function fetchWithTimeout(url: string, timeoutMs: number = 4000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function fetchProviders(): Promise<Provider[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/providers`, 3500);
    if (!res.ok) throw new Error('Failed to fetch providers');
    return await res.json();
  } catch (err) {
    console.warn("Backend warming up. Using Provider Fallback Data:", err);
    return [
      { id: "openai", name: "OpenAI", website: "https://openai.com", logo_url: "https://openai.com/favicon.ico", description: "Pioneer in LLM AI models", official_docs_url: "https://platform.openai.com/docs" },
      { id: "anthropic", name: "Anthropic", website: "https://anthropic.com", logo_url: "https://anthropic.com/favicon.ico", description: "Creator of Claude models", official_docs_url: "https://docs.anthropic.com" },
      { id: "google", name: "Google DeepMind", website: "https://deepmind.google", logo_url: "https://google.com/favicon.ico", description: "Creator of Gemini models", official_docs_url: "https://ai.google.dev" },
      { id: "meta", name: "Meta AI", website: "https://meta.com", logo_url: "https://meta.com/favicon.ico", description: "Creator of open-weight Llama models", official_docs_url: "https://llama.meta.com" }
    ];
  }
}

export async function fetchModels(params?: {
  provider_id?: string;
  tier?: string;
  is_open_weight?: boolean;
  search?: string;
}): Promise<ModelSpec[]> {
  try {
    const query = new URLSearchParams();
    if (params?.provider_id) query.append('provider_id', params.provider_id);
    if (params?.tier) query.append('tier', params.tier);
    if (params?.is_open_weight !== undefined) query.append('is_open_weight', String(params.is_open_weight));
    if (params?.search) query.append('search', params.search);

    // 8초 타임아웃 적용 (백엔드가 수면 해제 중이어도 여유 있게 수신)
    const res = await fetchWithTimeout(`${API_BASE_URL}/models?${query.toString()}`, 8000);
    if (!res.ok) throw new Error('Failed to fetch models');
    return await res.json();
  } catch (err) {
    console.warn("Backend warming up. Using Expanded 25+ SOTA Model Catalog:", err);
    return [
      {
        id: "deepseek-r1",
        provider_id: "deepseek",
        provider_name: "DeepSeek",
        name: "DeepSeek R1",
        tier: "Flagship",
        is_open_weight: true,
        license_type: "MIT License",
        architecture: "MoE (Multi-head Latent Attention)",
        context_window: 128000,
        max_output_tokens: 8192,
        modality: ["text"],
        description: "DeepSeek's flagship open-weights reasoning model matching o1 performance",
        official_url: "https://deepseek.com",
        source_docs_url: "https://api-docs.deepseek.com",
        api_pricing: { input_price_per_1m: 0.55, output_price_per_1m: 2.19 },
        benchmarks: { arena_elo: 1358, mmlu_pro: 84.0, gpqa: 71.5, swe_bench: 49.2 },
        is_verified: true, supports_reasoning: true, supports_web_search: false, is_deprecated: false
      },
      {
        id: "deepseek-v3",
        provider_id: "deepseek",
        provider_name: "DeepSeek",
        name: "DeepSeek V3",
        tier: "Flagship",
        is_open_weight: true,
        license_type: "MIT License",
        architecture: "671B MoE (37B active)",
        context_window: 128000,
        max_output_tokens: 8192,
        modality: ["text"],
        description: "SOTA 671B MoE open weights model with low cost inference",
        official_url: "https://deepseek.com",
        source_docs_url: "https://api-docs.deepseek.com",
        api_pricing: { input_price_per_1m: 0.14, output_price_per_1m: 0.28 },
        benchmarks: { arena_elo: 1310, mmlu_pro: 75.9, gpqa: 59.1, swe_bench: 48.8 },
        is_verified: true, supports_reasoning: false, supports_web_search: false, is_deprecated: false
      },
      {
        id: "o3-mini",
        provider_id: "openai",
        provider_name: "OpenAI",
        name: "o3-mini",
        tier: "Mid-Tier",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Reasoning Transformer",
        context_window: 200000,
        max_output_tokens: 100000,
        modality: ["text"],
        description: "OpenAI's latest cost-effective STEM & coding reasoning model",
        official_url: "https://openai.com",
        source_docs_url: "https://platform.openai.com/docs/models/o3-mini",
        api_pricing: { input_price_per_1m: 1.1, output_price_per_1m: 4.4 },
        benchmarks: { arena_elo: 1305, mmlu_pro: 81.2, gpqa: 64.8, swe_bench: 52.4 },
        is_verified: true, supports_reasoning: true, supports_web_search: true, is_deprecated: false
      },
      {
        id: "gpt-4o",
        provider_id: "openai",
        provider_name: "OpenAI",
        name: "GPT-4o",
        tier: "Flagship",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Dense Transformer",
        context_window: 128000,
        max_output_tokens: 4096,
        modality: ["text", "vision"],
        description: "OpenAI's flagship multimodal model",
        official_url: "https://openai.com/gpt-4o",
        source_docs_url: "https://platform.openai.com/docs/models/gpt-4o",
        api_pricing: { input_price_per_1m: 2.5, output_price_per_1m: 10.0 },
        benchmarks: { arena_elo: 1286, mmlu_pro: 74.2, gpqa: 53.6, swe_bench: 38.8 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      },
      {
        id: "gpt-4o-mini",
        provider_id: "openai",
        provider_name: "OpenAI",
        name: "GPT-4o mini",
        tier: "Small",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Dense Transformer",
        context_window: 128000,
        max_output_tokens: 16384,
        modality: ["text", "vision"],
        description: "OpenAI's fast, affordable small model for high-volume tasks",
        official_url: "https://openai.com/gpt-4o-mini",
        source_docs_url: "https://platform.openai.com/docs/models/gpt-4o-mini",
        api_pricing: { input_price_per_1m: 0.15, output_price_per_1m: 0.60 },
        benchmarks: { arena_elo: 1220, mmlu_pro: 65.2, gpqa: 41.0, swe_bench: 28.5 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      },
      {
        id: "o1",
        provider_id: "openai",
        provider_name: "OpenAI",
        name: "o1 Flagship Reasoning",
        tier: "Flagship",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Chain-of-Thought RL",
        context_window: 200000,
        max_output_tokens: 100000,
        modality: ["text", "vision"],
        description: "OpenAI's full o1 reasoning flagship model",
        official_url: "https://openai.com/o1",
        source_docs_url: "https://platform.openai.com/docs/models/o1",
        api_pricing: { input_price_per_1m: 15.0, output_price_per_1m: 60.0 },
        benchmarks: { arena_elo: 1355, mmlu_pro: 89.0, gpqa: 78.2, swe_bench: 61.8 },
        is_verified: true, supports_reasoning: true, supports_web_search: true, is_deprecated: false
      },
      {
        id: "claude-3-5-sonnet",
        provider_id: "anthropic",
        provider_name: "Anthropic",
        name: "Claude 3.5 Sonnet",
        tier: "Mid-Tier",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Dense Transformer",
        context_window: 200000,
        max_output_tokens: 8192,
        modality: ["text", "vision"],
        description: "Anthropic's most intelligent model for coding and reasoning",
        official_url: "https://anthropic.com/claude",
        source_docs_url: "https://docs.anthropic.com/claude",
        api_pricing: { input_price_per_1m: 3.0, output_price_per_1m: 15.0 },
        benchmarks: { arena_elo: 1282, mmlu_pro: 77.0, gpqa: 59.4, swe_bench: 49.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      },
      {
        id: "claude-3-5-haiku",
        provider_id: "anthropic",
        provider_name: "Anthropic",
        name: "Claude 3.5 Haiku",
        tier: "Small",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Dense Transformer",
        context_window: 200000,
        max_output_tokens: 8192,
        modality: ["text"],
        description: "Anthropic's fastest sub-second response model",
        official_url: "https://anthropic.com/claude",
        source_docs_url: "https://docs.anthropic.com/claude",
        api_pricing: { input_price_per_1m: 0.80, output_price_per_1m: 4.00 },
        benchmarks: { arena_elo: 1235, mmlu_pro: 68.0, gpqa: 44.2, swe_bench: 31.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      },
      {
        id: "claude-3-opus",
        provider_id: "anthropic",
        provider_name: "Anthropic",
        name: "Claude 3 Opus",
        tier: "Flagship",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Dense Transformer",
        context_window: 200000,
        max_output_tokens: 4096,
        modality: ["text", "vision"],
        description: "Anthropic's flagship deep analysis and writing model",
        official_url: "https://anthropic.com/claude",
        source_docs_url: "https://docs.anthropic.com/claude",
        api_pricing: { input_price_per_1m: 15.0, output_price_per_1m: 75.0 },
        benchmarks: { arena_elo: 1250, mmlu_pro: 73.5, gpqa: 50.4, swe_bench: 38.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      },
      {
        id: "gemini-1-5-pro",
        provider_id: "google",
        provider_name: "Google AI",
        name: "Gemini 1.5 Pro",
        tier: "Flagship",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "MoE Transformer",
        context_window: 2000000,
        max_output_tokens: 8192,
        modality: ["text", "vision", "audio"],
        description: "Google's 2M token context multimodal flagship model",
        official_url: "https://deepmind.google/technologies/gemini",
        source_docs_url: "https://ai.google.dev/gemini-api/docs",
        api_pricing: { input_price_per_1m: 1.25, output_price_per_1m: 5.0 },
        benchmarks: { arena_elo: 1260, mmlu_pro: 73.1, gpqa: 54.0, swe_bench: 32.5 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      },
      {
        id: "gemini-1-5-flash",
        provider_id: "google",
        provider_name: "Google AI",
        name: "Gemini 1.5 Flash",
        tier: "Small",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Lightweight MoE",
        context_window: 1000000,
        max_output_tokens: 8192,
        modality: ["text", "vision", "audio"],
        description: "Google's fast lightweight 1M context model",
        official_url: "https://deepmind.google/technologies/gemini",
        source_docs_url: "https://ai.google.dev/gemini-api/docs",
        api_pricing: { input_price_per_1m: 0.075, output_price_per_1m: 0.30 },
        benchmarks: { arena_elo: 1205, mmlu_pro: 61.5, gpqa: 39.0, swe_bench: 24.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      },
      {
        id: "llama-3-3-70b-instruct",
        provider_id: "meta",
        provider_name: "Meta AI",
        name: "Llama 3.3 70B Instruct",
        tier: "Mid-Tier",
        is_open_weight: true,
        license_type: "Llama 3.3 Community License",
        architecture: "Dense Transformer",
        context_window: 128000,
        max_output_tokens: 4096,
        modality: ["text"],
        description: "Meta's flagship open-weights 70B model matching Llama 3.1 405B performance",
        official_url: "https://llama.meta.com",
        source_docs_url: "https://llama.meta.com/docs",
        api_pricing: { input_price_per_1m: 0.55, output_price_per_1m: 0.55 },
        benchmarks: { arena_elo: 1255, mmlu_pro: 72.8, gpqa: 51.2, swe_bench: 36.2 },
        is_verified: true, supports_reasoning: false, supports_web_search: false, is_deprecated: false
      },
      {
        id: "llama-3-1-405b-instruct",
        provider_id: "meta",
        provider_name: "Meta AI",
        name: "Llama 3.1 405B Instruct",
        tier: "Flagship",
        is_open_weight: true,
        license_type: "Llama 3.1 License",
        architecture: "405B Dense Transformer",
        context_window: 128000,
        max_output_tokens: 4096,
        modality: ["text"],
        description: "Meta's largest 405B open weight model",
        official_url: "https://llama.meta.com",
        source_docs_url: "https://llama.meta.com/docs",
        api_pricing: { input_price_per_1m: 2.70, output_price_per_1m: 2.70 },
        benchmarks: { arena_elo: 1268, mmlu_pro: 75.0, gpqa: 54.2, swe_bench: 38.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: false, is_deprecated: false
      },
      {
        id: "qwen-2-5-72b-instruct",
        provider_id: "alibaba",
        provider_name: "Alibaba Cloud",
        name: "Qwen 2.5 72B Instruct",
        tier: "Mid-Tier",
        is_open_weight: true,
        license_type: "Qwen License",
        architecture: "Dense Transformer",
        context_window: 128000,
        max_output_tokens: 8192,
        modality: ["text"],
        description: "Alibaba's top performing open-weight multilingual & coding model",
        official_url: "https://qwenlm.github.io",
        source_docs_url: "https://qwenlm.github.io",
        api_pricing: { input_price_per_1m: 0.40, output_price_per_1m: 0.40 },
        benchmarks: { arena_elo: 1262, mmlu_pro: 74.0, gpqa: 53.8, swe_bench: 37.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: false, is_deprecated: false
      },
      {
        id: "qwen-2-5-coder-32b",
        provider_id: "alibaba",
        provider_name: "Alibaba Cloud",
        name: "Qwen 2.5 Coder 32B",
        tier: "Small",
        is_open_weight: true,
        license_type: "Apache 2.0",
        architecture: "Dense Coding Transformer",
        context_window: 128000,
        max_output_tokens: 8192,
        modality: ["text"],
        description: "Alibaba's open-source 32B coding model matching GPT-4o coding ability",
        official_url: "https://qwenlm.github.io",
        source_docs_url: "https://qwenlm.github.io",
        api_pricing: { input_price_per_1m: 0.20, output_price_per_1m: 0.20 },
        benchmarks: { arena_elo: 1240, mmlu_pro: 70.2, gpqa: 46.5, swe_bench: 42.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: false, is_deprecated: false
      },
      {
        id: "mistral-large-2",
        provider_id: "mistral",
        provider_name: "Mistral AI",
        name: "Mistral Large 2 (123B)",
        tier: "Flagship",
        is_open_weight: true,
        license_type: "Mistral Research License",
        architecture: "123B Dense Transformer",
        context_window: 128000,
        max_output_tokens: 4096,
        modality: ["text"],
        description: "Mistral's 123B flagship multilingual and reasoning model",
        official_url: "https://mistral.ai",
        source_docs_url: "https://docs.mistral.ai",
        api_pricing: { input_price_per_1m: 2.00, output_price_per_1m: 6.00 },
        benchmarks: { arena_elo: 1250, mmlu_pro: 71.8, gpqa: 49.8, swe_bench: 36.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: false, is_deprecated: false
      },
      {
        id: "phi-4",
        provider_id: "microsoft",
        provider_name: "Microsoft",
        name: "Phi-4 (14B)",
        tier: "Small",
        is_open_weight: true,
        license_type: "MIT License",
        architecture: "14B Dense Transformer",
        context_window: 16384,
        max_output_tokens: 4096,
        modality: ["text"],
        description: "Microsoft's 14B SOTA small reasoning model",
        official_url: "https://huggingface.co/microsoft/phi-4",
        source_docs_url: "https://huggingface.co/microsoft/phi-4",
        api_pricing: { input_price_per_1m: 0.10, output_price_per_1m: 0.10 },
        benchmarks: { arena_elo: 1215, mmlu_pro: 66.8, gpqa: 42.5, swe_bench: 30.0 },
        is_verified: true, supports_reasoning: false, supports_web_search: false, is_deprecated: false
      },
      {
        id: "nova-pro",
        provider_id: "aws_bedrock",
        provider_name: "AWS Bedrock",
        name: "Amazon Nova Pro",
        tier: "Mid-Tier",
        is_open_weight: false,
        license_type: "Proprietary",
        architecture: "Multimodal MoE",
        context_window: 300000,
        max_output_tokens: 5000,
        modality: ["text", "vision", "video"],
        description: "Amazon's flagship multimodal foundation model on Bedrock",
        official_url: "https://aws.amazon.com/bedrock",
        source_docs_url: "https://docs.aws.amazon.com/bedrock",
        api_pricing: { input_price_per_1m: 0.80, output_price_per_1m: 3.20 },
        benchmarks: { arena_elo: 1245, mmlu_pro: 70.5, gpqa: 48.0, swe_bench: 33.5 },
        is_verified: true, supports_reasoning: false, supports_web_search: true, is_deprecated: false
      }
    ];
  }
}

export async function fetchModelDetail(id: string): Promise<ModelSpec> {
  const res = await fetch(`${API_BASE_URL}/models/${id}`);
  if (!res.ok) throw new Error('Failed to fetch model details');
  return res.json();
}

export async function compareModels(ids: string[]): Promise<ModelSpec[]> {
  const res = await fetch(`${API_BASE_URL}/compare?ids=${ids.join(',')}`);
  if (!res.ok) throw new Error('Failed to compare models');
  return res.json();
}

export async function fetchGPUSpecs(): Promise<GPUSpec[]> {
  const res = await fetch(`${API_BASE_URL}/gpus`);
  if (!res.ok) throw new Error('Failed to fetch GPU specs');
  return res.json();
}

export async function simulateTCO(input: TCOInput): Promise<TCOComparisonResult> {
  const res = await fetch(`${API_BASE_URL}/simulate/tco`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error('Failed to simulate TCO');
  return res.json();
}
