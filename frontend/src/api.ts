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

    const res = await fetchWithTimeout(`${API_BASE_URL}/models?${query.toString()}`, 3500);
    if (!res.ok) throw new Error('Failed to fetch models');
    return await res.json();
  } catch (err) {
    console.warn("Backend warming up. Using Model Fallback Data:", err);
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
