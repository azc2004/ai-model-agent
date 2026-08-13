import sys, os, json
sys.path.append(os.path.abspath('.'))
from app.database import SessionLocal
from app.db_models import LLMModelDB

db = SessionLocal()
db_models = db.query(LLMModelDB).all()
print(f"Loaded {len(db_models)} models from Neon DB.")

models_list = []
for m in db_models:
    raw_bm = m.benchmarks or {}
    clean_bm = {k: v for k, v in raw_bm.items() if v is not None}
    
    raw_pricing = m.api_pricing or {}
    clean_pricing = {k: v for k, v in raw_pricing.items() if v is not None}
    if "input_price_per_1m" not in clean_pricing:
        clean_pricing["input_price_per_1m"] = 0.0
    if "output_price_per_1m" not in clean_pricing:
        clean_pricing["output_price_per_1m"] = 0.0

    models_list.append({
        "id": m.id,
        "provider_id": m.provider_id,
        "provider_name": m.provider_name,
        "name": m.name,
        "tier": m.tier,
        "is_open_weight": bool(m.is_open_weight),
        "license_type": "Open-Weight" if m.is_open_weight else "Proprietary",
        "architecture": m.architecture or "Dense/MoE",
        "context_window": m.context_window or 128000,
        "max_output_tokens": m.max_output_tokens or 4096,
        "modality": m.modality if isinstance(m.modality, list) else ["text"],
        "description": m.description or f"{m.name} LLM model",
        "official_url": m.official_url or "https://openrouter.ai",
        "source_docs_url": m.source_docs_url or "https://openrouter.ai",
        "api_pricing": clean_pricing,
        "benchmarks": clean_bm,
        "hardware_requirements": [],
        "is_verified": True,
        "supports_reasoning": "reason" in m.id.lower() or "r1" in m.id.lower() or "o1" in m.id.lower() or "o3" in m.id.lower(),
        "supports_web_search": "search" in m.id.lower() or "sonar" in m.id.lower() or "perplexity" in m.id.lower(),
        "is_deprecated": False,
        "is_new": "3.7" in m.id.lower() or "4.5" in m.id.lower() or "2.5" in m.id.lower() or "r1" in m.id.lower() or "grok-3" in m.id.lower()
    })

db.close()

# Read seed_data.py prefix
with open('app/seed_data.py', 'r', encoding='utf-8') as f:
    code = f.read()

models_idx = code.find('MODELS: List[ModelSpec] = [')
if models_idx != -1:
    prefix = code[:models_idx]
    
    # Format models as Python list of ModelSpec objects
    specs_str = "MODELS: List[ModelSpec] = [\n"
    for m in models_list:
        specs_str += f"""    ModelSpec(
        id={json.dumps(m['id'])},
        provider_id={json.dumps(m['provider_id'])},
        provider_name={json.dumps(m['provider_name'])},
        name={json.dumps(m['name'])},
        tier={json.dumps(m['tier'])},
        is_open_weight={json.dumps(m['is_open_weight'])},
        license_type={json.dumps(m['license_type'])},
        architecture={json.dumps(m['architecture'])},
        context_window={m['context_window']},
        max_output_tokens={m['max_output_tokens']},
        modality={json.dumps(m['modality'])},
        description={json.dumps(m['description'])},
        official_url={json.dumps(m['official_url'])},
        source_docs_url={json.dumps(m['source_docs_url'])},
        api_pricing=APIPricing(**{json.dumps(m['api_pricing'])}),
        benchmarks=BenchmarkScores(**{json.dumps(m['benchmarks'])}),
        hardware_requirements=[],
        is_verified=True,
        supports_reasoning={json.dumps(m['supports_reasoning'])},
        supports_web_search={json.dumps(m['supports_web_search'])},
        is_deprecated=False,
        is_new={json.dumps(m['is_new'])}
    ),\n"""
    specs_str += "]\n"
    
    with open('app/seed_data.py', 'w', encoding='utf-8') as f:
        f.write(prefix + specs_str)
    
    print(f"✅ Successfully updated app/seed_data.py with all {len(models_list)} models!")
