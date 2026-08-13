import os
import json
import re
import subprocess

def parse_ts_fallback_models(ts_file_path):
    with open(ts_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract JSON-like array text from `export const FALLBACK_MODELS: ModelSpec[] = [...]`
    match = re.search(r'export const FALLBACK_MODELS: ModelSpec\[\] = (\[\s*\{.*\}\s*\]);', content, re.DOTALL)
    if not match:
        raise ValueError("Could not find FALLBACK_MODELS array in TS file")

    raw_json = match.group(1)
    
    # Clean trailing commas if any
    raw_json_clean = re.sub(r',\s*([\]}])', r'\1', raw_json)
    
    models = json.loads(raw_json_clean)
    return models

def generate_sqlite_statements(models):
    statements = []
    
    # 1. Insert Providers
    providers_set = set()
    for m in models:
        pid = m.get('provider_id') or m.get('provider_name', '').lower()
        pname = m.get('provider_name', pid)
        if pid and pid not in providers_set:
            providers_set.add(pid)
            safe_pid = pid.replace("'", "''")
            safe_pname = pname.replace("'", "''")
            statements.append(f"INSERT OR REPLACE INTO providers (id, name) VALUES ('{safe_pid}', '{safe_pname}');")

    # 2. Insert Models
    for m in models:
        mid = m['id'].replace("'", "''")
        pid = (m.get('provider_id') or m.get('provider_name', '')).replace("'", "''")
        pname = m.get('provider_name', '').replace("'", "''")
        name = m.get('name', '').replace("'", "''")
        tier = m.get('tier', 'Mid').replace("'", "''")
        is_open = 1 if m.get('is_open_weight') else 0
        license_type = (m.get('license_type') or '').replace("'", "''")
        param_b = m.get('parameter_count_b') or 0
        arch = (m.get('architecture') or '').replace("'", "''")
        ctx = m.get('context_window') or 128000
        max_out = m.get('max_output_tokens') or 4096
        modality_json = json.dumps(m.get('modality', ['text'])).replace("'", "''")
        desc = (m.get('description') or '').replace("'", "''")
        official_url = (m.get('official_url') or '').replace("'", "''")
        source_docs = (m.get('source_docs_url') or '').replace("'", "''")
        pricing_json = json.dumps(m.get('api_pricing', {})).replace("'", "''")
        quota_json = json.dumps(m.get('quota', {})).replace("'", "''")
        bench_json = json.dumps(m.get('benchmarks', {})).replace("'", "''")
        is_verified = 1 if m.get('is_verified', True) else 0
        litellm_id = (m.get('litellm_id') or '').replace("'", "''")
        supports_reasoning = 1 if m.get('supports_reasoning') else 0
        supports_web_search = 1 if m.get('supports_web_search') else 0
        is_deprecated = 1 if m.get('is_deprecated') else 0
        is_new = 1 if m.get('is_new') else 0
        hw_reqs = json.dumps(m.get('hardware_requirements', {})).replace("'", "''")

        sql = f"""INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '{mid}', '{pid}', '{pname}', '{name}', '{tier}', {is_open}, '{license_type}',
          {param_b}, '{arch}', {ctx}, {max_out}, '{modality_json}',
          '{desc}', '{official_url}', '{source_docs}', '{pricing_json}', '{quota_json}', '{bench_json}',
          {is_verified}, '{litellm_id}', {supports_reasoning}, {supports_web_search}, {is_deprecated},
          {is_new}, '{hw_reqs}'
        );"""
        statements.append(sql)

    return statements

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    ts_file = os.path.join(repo_root, 'frontend', 'src', 'data', 'fallbackModels.ts')
    sql_file = os.path.join(repo_root, 'seed_d1.sql')

    print(f"Reading fallback models from {ts_file}...")
    models = parse_ts_fallback_models(ts_file)
    print(f"Parsed {len(models)} models successfully!")

    statements = generate_sqlite_statements(models)
    
    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(statements))

    print(f"Generated {len(statements)} SQL statements in {sql_file}")

if __name__ == '__main__':
    main()
