import os
import json
import urllib.request
import asyncio
from typing import List, Dict, Any
from app.schemas import ModelSpec, APIPricing, QuotaInfo, BenchmarkScores
from app.database import SessionLocal
from app.db_models import LLMModelDB
from app.seed_data import MODELS

# OpenRouter / Hugging Face / LMSYS 최신 모델 정보 자동 동기화 모듈
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/models"

def fetch_external_openrouter_models() -> List[Dict[str, Any]]:
    """OpenRouter 공식 API를 통해 글로벌 200+ LLM 모델의 실시간 API 가격 및 스펙 데이터를 수집합니다."""
    try:
        req = urllib.request.Request(OPENROUTER_API_URL, headers={"User-Agent": "LLM-Compass-Agent/2.0"})
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                return data.get("data", [])
    except Exception as e:
        print(f"[Model Fetcher Warning] OpenRouter API sync notice: {e}")
    return []

def classify_tier(context_len: int, prompt_price: float) -> str:
    if context_len >= 200000 or prompt_price >= 5.0:
        return "Frontier"
    elif context_len >= 64000 or prompt_price >= 1.0:
        return "Mid"
    elif context_len >= 16000 or prompt_price >= 0.2:
        return "Small"
    return "Micro"

def run_daily_model_sync_job() -> Dict[str, int]:
    """매일 자정 데일리 배치: 외부 OpenRouter API로부터 신규 LLM 모델 자동 발견/적재 및 기존 모델 가격/스펙 동기화를 수행합니다."""
    print("🚀 [Daily Model Sync] LLM 모델 데일리 자동 갱신 및 신규 모델 파이프라인 가동...")
    db = SessionLocal()
    updated_count = 0
    added_count = 0

    try:
        ext_models = fetch_external_openrouter_models()
        if not ext_models:
            print("[Daily Model Sync Warning] OpenRouter API에서 모델 데이터를 가져오지 못했습니다.")
            total_count = db.query(LLMModelDB).count()
            return {"updated_existing": 0, "added_new": 0, "total_models": total_count}

        db_models = db.query(LLMModelDB).all()
        existing_map = {m.id: m for m in db_models}

        for ext in ext_models:
            raw_id = ext.get("id", "")
            if not raw_id:
                continue

            sanitized_id = raw_id.replace("/", "-").lower()

            pricing = ext.get("pricing", {})
            prompt_price = float(pricing.get("prompt", 0)) * 1_000_000
            completion_price = float(pricing.get("completion", 0)) * 1_000_000

            # 이미 존재하는 모델인 경우 가격 정보 갱신
            target_model = existing_map.get(sanitized_id) or existing_map.get(raw_id)
            if target_model:
                if prompt_price > 0 and completion_price > 0:
                    current_pricing = target_model.api_pricing or {}
                    current_pricing["input_price_per_1m"] = round(prompt_price, 3)
                    current_pricing["output_price_per_1m"] = round(completion_price, 3)
                    target_model.api_pricing = current_pricing
                    updated_count += 1
            else:
                # 신규 모델 발견! Neon DB에 자동 변환/적재
                provider_parts = raw_id.split("/")
                provider_id = provider_parts[0].lower() if len(provider_parts) > 1 else "other"
                provider_name = provider_parts[0].capitalize() if len(provider_parts) > 1 else "Other"

                name = ext.get("name") or raw_id
                context_window = ext.get("context_length", 128000)
                tier = classify_tier(context_window, prompt_price)

                is_open = any(k in raw_id.lower() for k in ["llama", "mistral", "qwen", "deepseek", "gemma", "phi", "yi", "open"])
                license_type = "Open-Weights" if is_open else "Proprietary"
                description = ext.get("description") or f"{name} 글로벌 신규 LLM 모델"
                if len(description) > 500:
                    description = description[:497] + "..."

                top_prov = ext.get("top_provider", {})
                max_out = top_prov.get("max_completion_tokens") if isinstance(top_prov, dict) else None
                if not max_out:
                    max_out = 16384

                new_model_db = LLMModelDB(
                    id=sanitized_id,
                    provider_id=provider_id,
                    provider_name=provider_name,
                    name=name,
                    tier=tier,
                    is_open_weight=is_open,
                    architecture="Dense/MoE",
                    context_window=context_window,
                    max_output_tokens=max_out,
                    modality=["text", "vision"] if "image" in str(ext) else ["text"],
                    description=description,
                    official_url=f"https://openrouter.ai/models/{raw_id}",
                    source_docs_url=f"https://openrouter.ai/playground?model={raw_id}",
                    api_pricing={
                        "input_price_per_1m": round(prompt_price, 3),
                        "output_price_per_1m": round(completion_price, 3)
                    },
                    benchmarks={
                        "arena_elo": None,
                        "mmlu_pro": None,
                        "gpqa": None,
                        "swe_bench": None
                    }
                )
                db.add(new_model_db)
                added_count += 1

        db.commit()
        total_count = db.query(LLMModelDB).count()
        print(f"✅ [Daily Model Sync] Neon DB 갱신 완료! (기존 업데이트: {updated_count}개, 신규 수집 적재: {added_count}개, 총 모델 수: {total_count}개)")
        return {"updated_existing": updated_count, "added_new": added_count, "total_models": total_count}

    except Exception as e:
        db.rollback()
        print(f"[Daily Model Sync Error] {e}")
        return {"updated_existing": 0, "added_new": 0, "total_models": db.query(LLMModelDB).count()}
    finally:
        db.close()
