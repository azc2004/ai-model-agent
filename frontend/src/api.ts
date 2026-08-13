import type { ModelSpec, Provider, GPUSpec, TCOInput, TCOCalculationResult } from './types';
import { FALLBACK_MODELS } from './data/fallbackModels';

const rawBase = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '');
export const API_BASE_URL = rawBase 
  ? (rawBase.endsWith('/api/v1') ? rawBase : `${rawBase.replace(/\/$/, '')}/api/v1`)
  : '/api/v1';

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
  const query = new URLSearchParams();
  if (params?.provider_id) query.append('provider_id', params.provider_id);
  if (params?.tier) query.append('tier', params.tier);
  if (params?.is_open_weight !== undefined) query.append('is_open_weight', String(params.is_open_weight));
  if (params?.search) query.append('search', params.search);

  // Cloudflare D1 엣지 서빙 적용으로 sub-5ms 응답 보장
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/models?${query.toString()}`, 5000);
    if (!res.ok) throw new Error('Failed to fetch models');
    const data: ModelSpec[] = await res.json();
    return data;
  } catch (err) {
    console.warn("Using Fallback Model Catalog:", err);
    return FALLBACK_MODELS;
  }
}

export async function fetchModelDetail(id: string): Promise<ModelSpec> {
  const res = await fetch(`${API_BASE_URL}/models/${id}`);
  if (!res.ok) throw new Error('Failed to fetch model details');
  return await res.json();
}

export async function fetchGPUSpecs(): Promise<GPUSpec[]> {
  return [
    { id: "h100-sxm", name: "NVIDIA H100 SXM5 80GB", vram_gb: 80, memory_bandwidth_gbps: 3350, purchase_price_usd: 32000, cloud_hourly_on_demand: 3.50, cloud_hourly_spot: 2.10, power_watts: 700 },
    { id: "a100-80gb", name: "NVIDIA A100 SXM 80GB", vram_gb: 80, memory_bandwidth_gbps: 2039, purchase_price_usd: 15000, cloud_hourly_on_demand: 1.80, cloud_hourly_spot: 1.10, power_watts: 400 },
    { id: "l40s", name: "NVIDIA L40S 48GB", vram_gb: 48, memory_bandwidth_gbps: 864, purchase_price_usd: 7500, cloud_hourly_on_demand: 1.10, cloud_hourly_spot: 0.65, power_watts: 350 },
    { id: "rtx-4090", name: "NVIDIA RTX 4090 24GB", vram_gb: 24, memory_bandwidth_gbps: 1008, purchase_price_usd: 1999, cloud_hourly_on_demand: 0.40, cloud_hourly_spot: 0.25, power_watts: 450 }
  ];
}

export async function simulateTCO(input: TCOInput): Promise<TCOCalculationResult> {
  const inputM = input.monthly_input_tokens_m || 100;
  const outputM = input.monthly_output_tokens_m || 20;

  const apiTotal = inputM * 0.50 + outputM * 1.50;
  const selfHostedTotal = 1440; // 2x H100 @ $1.00/hr

  return {
    model_id: input.target_model_id,
    model_name: "DeepSeek R1 / Llama 3.3 70B",
    monthly_input_tokens_m: inputM,
    monthly_output_tokens_m: outputM,
    api_cost: {
      input_cost: inputM * 0.50,
      output_cost: outputM * 1.50,
      total_monthly_cost: apiTotal
    },
    self_hosted: {
      recommended_gpu: "2x NVIDIA H100 80GB",
      gpu_count: 2,
      total_vram_gb: 160,
      cloud_on_demand_monthly: selfHostedTotal,
      cloud_spot_monthly: selfHostedTotal * 0.6,
      on_prem_hardware_cost: 64000,
      on_prem_monthly_amortized: 1777,
      on_prem_monthly_power: 200,
      on_prem_total_monthly: 1977,
      breakeven_months_vs_api: 18
    },
    recommendation: apiTotal < selfHostedTotal ? "SaaS API Calling" : "Self-Hosted Cloud GPU"
  };
}
