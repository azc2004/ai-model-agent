import type { ModelSpec, Provider, GPUSpec, TCOInput, TCOComparisonResult } from './types';
import { FALLBACK_MODELS } from './data/fallbackModels';

const rawBase = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8000' : 'https://llm-compass-backend.onrender.com');
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
  const query = new URLSearchParams();
  if (params?.provider_id) query.append('provider_id', params.provider_id);
  if (params?.tier) query.append('tier', params.tier);
  if (params?.is_open_weight !== undefined) query.append('is_open_weight', String(params.is_open_weight));
  if (params?.search) query.append('search', params.search);

  // 백엔드가 서버단 인메모리 캐시(RAM Warm-up)를 적용하였으므로 0.001초 만에 최신 176개 전량 반환
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/models?${query.toString()}`, 15000);
    if (!res.ok) throw new Error('Failed to fetch models');
    const data: ModelSpec[] = await res.json();
    return data;
  } catch (err) {
    console.warn("Backend warming up. Using Fallback Model Catalog:", err);
    return FALLBACK_MODELS;
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
