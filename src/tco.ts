import type { TCOInput, TCOComparisonResult, ModelSpec } from '../frontend/src/types';
import { GPU_SPECS } from './data';

export function calculateTCO(tcoInput: TCOInput, models: ModelSpec[]): TCOComparisonResult {
  const model = models.find(m => m.id === tcoInput.target_model_id);
  if (!model) {
    throw new Error(`Model ID '${tcoInput.target_model_id}' not found`);
  }

  const input_m = tcoInput.monthly_input_tokens_m;
  const output_m = tcoInput.monthly_output_tokens_m;

  let api_input_cost = 0.0;
  let api_output_cost = 0.0;
  let api_total = 0.0;

  if (model.api_pricing) {
    api_input_cost = input_m * (model.api_pricing.input_price_per_1m || 0);
    api_output_cost = output_m * (model.api_pricing.output_price_per_1m || 0);
    api_total = api_input_cost + api_output_cost;
  }

  const api_result = {
    input_cost: Number(api_input_cost.toFixed(2)),
    output_cost: Number(api_output_cost.toFixed(2)),
    total_monthly_cost: Number(api_total.toFixed(2))
  };

  const reqs = model.hardware_requirements || [];
  const target_quant = tcoInput.target_quantization || "Q4";
  let matched_req = reqs.find((r: any) => r.quantization?.includes(target_quant));
  if (!matched_req && reqs.length > 0) {
    matched_req = reqs[0];
  }

  let vram_needed = 160.0;
  let recommended_gpu_name = "NVIDIA A100 SXM4 (80GB)";
  let multi_gpu = 2;

  if (matched_req) {
    vram_needed = matched_req.recommended_vram_gb || 160.0;
    recommended_gpu_name = matched_req.recommended_gpu || recommended_gpu_name;
    multi_gpu = matched_req.multi_gpu_count || 2;
  }

  let gpu_spec = GPU_SPECS.find(g => 
    g.name.toLowerCase().includes(recommended_gpu_name.toLowerCase()) || 
    recommended_gpu_name.toLowerCase().includes(g.name.toLowerCase())
  );
  if (!gpu_spec && GPU_SPECS.length > 2) {
    gpu_spec = GPU_SPECS[2];
  }
  if (!gpu_spec) {
    gpu_spec = GPU_SPECS[0]; 
  }

  const monthly_hours = 720.0;

  const cloud_on_demand = (gpu_spec.cloud_hourly_on_demand || 0) * multi_gpu * monthly_hours;
  const cloud_spot = (gpu_spec.cloud_hourly_spot || 0) * multi_gpu * monthly_hours;

  const total_hardware_purchase = (gpu_spec.purchase_price_usd || 0) * multi_gpu;
  const lifecycle_months = Math.max(1, tcoInput.hardware_lifecycle_months || 36);
  const on_prem_amortized = total_hardware_purchase / lifecycle_months;

  const total_power_watts = ((gpu_spec.power_watts || 0) * multi_gpu) + 200;
  const monthly_kwh = (total_power_watts / 1000.0) * monthly_hours;
  const kwh_cost = tcoInput.kwh_cost_usd || 0.12;
  const on_prem_power = monthly_kwh * kwh_cost;

  const on_prem_total_monthly = on_prem_amortized + on_prem_power;

  let breakeven_months: number | undefined = undefined;
  if (api_total > on_prem_power) {
    const net_monthly_savings = api_total - on_prem_power;
    breakeven_months = net_monthly_savings > 0 ? total_hardware_purchase / net_monthly_savings : 999.0;
  }

  const self_hosted_result = {
    recommended_gpu: gpu_spec.name,
    gpu_count: multi_gpu,
    total_vram_gb: (gpu_spec.vram_gb || 0) * multi_gpu,
    cloud_on_demand_monthly: Number(cloud_on_demand.toFixed(2)),
    cloud_spot_monthly: Number(cloud_spot.toFixed(2)),
    on_prem_hardware_cost: Number(total_hardware_purchase.toFixed(2)),
    on_prem_monthly_amortized: Number(on_prem_amortized.toFixed(2)),
    on_prem_monthly_power: Number(on_prem_power.toFixed(2)),
    on_prem_total_monthly: Number(on_prem_total_monthly.toFixed(2)),
    breakeven_months_vs_api: breakeven_months !== undefined ? Number(breakeven_months.toFixed(1)) : undefined
  };

  let rec = "";
  if (!model.is_open_weight) {
    rec = `본 모델(${model.name})은 상용 폐쇄형 API 전용 모델입니다. 셀프호스팅 수치는 동일 파라미터급 오픈웨이트 추정치 기반 비교입니다.`;
  } else if (api_total > on_prem_total_monthly) {
    rec = `현재 사용량(입력 ${input_m}M / 출력 ${output_m}M)에서는 셀프호스팅(온프레미스/클라우드 GPU)이 API 운영 대비 매월 약 $${(api_total - on_prem_total_monthly).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} 비용을 절감할 수 있어 유리합니다.`;
  } else {
    rec = `현재 사용량(입력 ${input_m}M / 출력 ${output_m}M)에서는 종량제 API를 활용하는 것이 GPU 서버 유지/감가상각 대비 매월 약 $${(on_prem_total_monthly - api_total).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} 저렴합니다.`;
  }

  return {
    model_id: model.id,
    model_name: model.name,
    monthly_input_tokens_m: input_m,
    monthly_output_tokens_m: output_m,
    api_cost: api_result,
    self_hosted: self_hosted_result,
    recommendation: rec
  };
}
