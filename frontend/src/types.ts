export interface Provider {
  id: string;
  name: string;
  website: string;
  logo_url: string;
  description: string;
  official_docs_url: string;
}

export interface APIPricing {
  input_price_per_1m: number;
  output_price_per_1m: number;
  cached_input_price_per_1m?: number;
  batch_discount_percent?: number;
  notes?: string;
}

export interface QuotaInfo {
  rpm: number;
  tpm: number;
  rpd?: number;
  concurrency_limit?: number;
  notes?: string;
}

export interface BenchmarkScores {
  arena_elo?: number;
  mmlu_pro?: number;
  gpqa?: number;
  swe_bench?: number;
}

export interface ModelSpec {
  id: string;
  provider_id: string;
  provider_name: string;
  name: string;
  tier: string;
  is_open_weight: boolean;
  license_type: string;
  parameter_count_b?: number;
  architecture: string;
  context_window: number;
  max_output_tokens: number;
  modality: string[];
  description: string;
  official_url: string;
  source_docs_url: string;
  api_pricing: APIPricing;
  quota?: QuotaInfo;
  benchmarks: BenchmarkScores;
}

export interface GPUSpec {
  id: string;
  name: string;
  vram_gb: number;
  memory_bandwidth_gbps: number;
  purchase_price_usd: number;
  cloud_hourly_on_demand: number;
  cloud_hourly_spot: number;
  power_watts: number;
}

export interface TCOInput {
  monthly_input_tokens_m: number;
  monthly_output_tokens_m: number;
  target_model_id: string;
  target_quantization?: string;
  kwh_cost_usd?: number;
  hardware_lifecycle_months?: number;
}

export interface APICostResult {
  input_cost: number;
  output_cost: number;
  total_monthly_cost: number;
}

export interface SelfHostedCostResult {
  recommended_gpu: string;
  gpu_count: number;
  total_vram_gb: number;
  cloud_on_demand_monthly: number;
  cloud_spot_monthly: number;
  on_prem_hardware_cost: number;
  on_prem_monthly_amortized: number;
  on_prem_monthly_power: number;
  on_prem_total_monthly: number;
  breakeven_months_vs_api?: number;
}

export interface TCOCalculationResult {
  model_id: string;
  model_name: string;
  monthly_input_tokens_m: number;
  monthly_output_tokens_m: number;
  api_cost: APICostResult;
  self_hosted: SelfHostedCostResult;
  recommendation: string;
}

export type TCOComparisonResult = TCOCalculationResult;
