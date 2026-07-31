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
