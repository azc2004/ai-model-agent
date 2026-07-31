import math
from typing import Optional
from app.schemas import TCOInput, TCOComparisonResult, APICostResult, SelfHostedCostResult
from app.seed_data import MODELS, GPU_SPECS

def calculate_tco(tco_input: TCOInput) -> TCOComparisonResult:
    # 1. 모델 검색
    model = next((m for m in MODELS if m.id == tco_input.target_model_id), None)
    if not model:
        raise ValueError(f"Model ID '{tco_input.target_model_id}' not found")

    # 2. API 비용 계산
    input_m = tco_input.monthly_input_tokens_m
    output_m = tco_input.monthly_output_tokens_m

    if model.api_pricing:
        api_input_cost = input_m * model.api_pricing.input_price_per_1m
        api_output_cost = output_m * model.api_pricing.output_price_per_1m
        api_total = api_input_cost + api_output_cost
    else:
        api_input_cost = 0.0
        api_output_cost = 0.0
        api_total = 0.0

    api_result = APICostResult(
        input_cost=round(api_input_cost, 2),
        output_cost=round(api_output_cost, 2),
        total_monthly_cost=round(api_total, 2)
    )

    # 3. 셀프호스팅 비용 계산
    # 오픈웨이트 또는 하드웨어 사양이 지정되어 있는지 확인
    reqs = model.hardware_requirements
    target_quant = tco_input.target_quantization or "Q4"
    matched_req = next((r for r in reqs if target_quant in r.quantization), None)
    if not matched_req and reqs:
        matched_req = reqs[0]

    if matched_req:
        vram_needed = matched_req.recommended_vram_gb
        recommended_gpu_name = matched_req.recommended_gpu
        multi_gpu = matched_req.multi_gpu_count
    else:
        # 가상의 하드웨어 스펙 산정 (대형 상용 모델을 셀프호스팅한다고 가정할 때)
        vram_needed = 160.0
        recommended_gpu_name = "NVIDIA A100 SXM4 (80GB)"
        multi_gpu = 2

    # GPU 스펙 찾기
    gpu_spec = next((g for g in GPU_SPECS if g.name.lower() in recommended_gpu_name.lower() or recommended_gpu_name.lower() in g.name.lower()), GPU_SPECS[2]) # default A100

    # 월간 운용시간 = 24시간 * 30일 = 720시간
    monthly_hours = 720.0

    cloud_on_demand = gpu_spec.cloud_hourly_on_demand * multi_gpu * monthly_hours
    cloud_spot = gpu_spec.cloud_hourly_spot * multi_gpu * monthly_hours

    # 온프레미스 감가상각 및 전력 비용 계산
    total_hardware_purchase = gpu_spec.purchase_price_usd * multi_gpu
    lifecycle_months = max(1, tco_input.hardware_lifecycle_months)
    on_prem_amortized = total_hardware_purchase / lifecycle_months

    # 전력 소비: (GPU W * 개수 + 기본 서버 200W) / 1000 * 720시간 * kWh당 달러 단가
    total_power_watts = (gpu_spec.power_watts * multi_gpu) + 200
    monthly_kwh = (total_power_watts / 1000.0) * monthly_hours
    on_prem_power = monthly_kwh * tco_input.kwh_cost_usd

    on_prem_total_monthly = on_prem_amortized + on_prem_power

    # 손익분기점 (개월)
    # API 월 비용과 온프레미스 월 비용/초기투자비 대조
    if api_total > on_prem_power:
        net_monthly_savings = api_total - on_prem_power
        breakeven_months = total_hardware_purchase / net_monthly_savings if net_monthly_savings > 0 else 999.0
    else:
        breakeven_months = None

    self_hosted_result = SelfHostedCostResult(
        recommended_gpu=gpu_spec.name,
        gpu_count=multi_gpu,
        total_vram_gb=gpu_spec.vram_gb * multi_gpu,
        cloud_on_demand_monthly=round(cloud_on_demand, 2),
        cloud_spot_monthly=round(cloud_spot, 2),
        on_prem_hardware_cost=round(total_hardware_purchase, 2),
        on_prem_monthly_amortized=round(on_prem_amortized, 2),
        on_prem_monthly_power=round(on_prem_power, 2),
        on_prem_total_monthly=round(on_prem_total_monthly, 2),
        breakeven_months_vs_api=round(breakeven_months, 1) if breakeven_months is not None else None
    )

    # 추천 메시지 산출
    if not model.is_open_weight:
        rec = f"본 모델({model.name})은 상용 폐쇄형 API 전용 모델입니다. 셀프호스팅 수치는 동일 파라미터급 오픈웨이트 추정치 기반 비교입니다."
    elif api_total > on_prem_total_monthly:
        rec = f"현재 사용량(입력 {input_m}M / 출력 {output_m}M)에서는 셀프호스팅(온프레미스/클라우드 GPU)이 API 운영 대비 매월 약 ${round(api_total - on_prem_total_monthly, 2):,} 비용을 절감할 수 있어 유리합니다."
    else:
        rec = f"현재 사용량(입력 {input_m}M / 출력 {output_m}M)에서는 종량제 API를 활용하는 것이 GPU 서버 유지/감가상각 대비 매월 약 ${round(on_prem_total_monthly - api_total, 2):,} 저렴합니다."

    return TCOComparisonResult(
        model_id=model.id,
        model_name=model.name,
        monthly_input_tokens_m=input_m,
        monthly_output_tokens_m=output_m,
        api_cost=api_result,
        self_hosted=self_hosted_result,
        recommendation=rec
    )
