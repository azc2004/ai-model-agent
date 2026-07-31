#!/usr/bin/env python3
"""
LiteLLM 모델 카탈로그 분석 + 필터링 스크립트
- LiteLLM JSON에서 실용적인 현행 모델만 추출
- 우리 서비스 현재 모델과 크로스체크
- 누락 모델 목록 출력
"""

import json
import re
import sys
from collections import defaultdict
from datetime import datetime

# ─── 필터링 설정 ────────────────────────────────────────────────
# 지원할 주요 프로바이더 (LiteLLM provider 키)
TARGET_PROVIDERS = {
    "openai": "OpenAI",
    "anthropic": "Anthropic",
    "google": "Google AI",
    "gemini": "Google AI",
    "vertex_ai-language-models": "Google Vertex AI",
    "bedrock": "AWS Bedrock",
    "deepseek": "DeepSeek",
    "meta_llama": "Meta AI",
    "together_ai": "Together AI",
    "mistral": "Mistral AI",
    "cohere_chat": "Cohere",
    "cohere": "Cohere",
    "perplexity": "Perplexity AI",
    "xai": "xAI (Grok)",
    "groq": "Groq",
    "fireworks_ai": "Fireworks AI",
    "replicate": "Replicate",
    "huggingface": "Hugging Face",
}

# 제외 패턴 (provider prefix 형태의 중복 항목)
EXCLUDE_PREFIXES = [
    "azure/", "bedrock/", "vertex_ai/", "vertex_ai_beta/",
    "sagemaker/", "together_ai/", "anyscale/", "replicate/",
    "deepinfra/", "fireworks_ai/", "ollama/", "ollama_chat/",
    "groq/", "cohere/", "anthropic/", "openai/", "gemini/",
    "huggingface/", "text-completion-openai/", "text-completion-codestral/",
    "openrouter/", "predibase/", "xinference/", "cloudflare/",
    "voyage/", "triton/", "friendliai/", "jina_ai/", "maritalk/",
    "palm/", "ai21/", "nlp_cloud/", "aleph_alpha/", "petals/",
]

# 이미지 해상도 prefix 패턴 제외
RESOLUTION_PATTERN = re.compile(r'^\d+-x-\d+/')

# 날짜 스냅샷 패턴 (연도-월-일 형태의 suffix는 별도 alias로 처리)
DATE_SUFFIX_PATTERN = re.compile(r'-\d{4}-\d{2}-\d{2}$|-\d{8}$')

# 모드별 포함 여부
INCLUDE_MODES = {"chat", "completion", "embedding", "audio_transcription", 
                 "audio_speech", "image_generation", "moderation"}

# ─── 현재 우리 서비스 모델 ID ────────────────────────────────────
CURRENT_MODEL_IDS = {
    "gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna",
    "gpt-4o", "gpt-4o-2024-11-20", "gpt-4o-2024-08-06", "gpt-4o-2024-05-13",
    "gpt-4o-mini", "gpt-4o-mini-2024-07-18",
    "gpt-4o-realtime-preview", "gpt-4o-mini-realtime-preview", "gpt-4o-audio-preview",
    "o1", "o1-2024-12-17", "o1-preview", "o1-mini", "o1-mini-2024-09-12",
    "o3-mini", "o3-mini-2025-01-31", "o3", "o4-mini", "gpt-4-5-preview",
    "gpt-4-turbo", "gpt-4-turbo-2024-04-09", "gpt-4-0125-preview",
    "gpt-4-1106-preview", "gpt-4-vision-preview", "gpt-4-0613", "gpt-4-32k-0613",
    "gpt-3.5-turbo-0125", "gpt-3.5-turbo-1106", "gpt-3.5-turbo-instruct",
    "text-embedding-3-large", "text-embedding-3-small", "text-embedding-ada-002",
    "whisper-1", "dall-e-3", "dall-e-2", "tts-1", "tts-1-hd", "omni-moderation-latest",
    # Anthropic
    "claude-opus-5", "claude-sonnet-5", "claude-haiku-4.5",
    "claude-3-5-sonnet-20241022", "claude-3-5-sonnet-20240620",
    "claude-3-5-haiku-20241022", "claude-3-opus-20240229",
    "claude-3-sonnet-20240229", "claude-3-haiku-20240307",
    "claude-2.1", "claude-2.0", "claude-instant-1.2",
    "claude-sonnet-4-5", "claude-haiku-3-5",
    # Google
    "gemini-3.1-pro", "gemini-3.6-flash", "gemini-3.5-flash-lite",
    "gemini-2.0-flash-exp", "gemini-2.0-flash-thinking-exp",
    "gemini-1.5-pro-002", "gemini-1.5-pro-001",
    "gemini-1.5-flash-002", "gemini-1.5-flash-8b", "gemini-1.0-pro-001",
    "gemma-2-27b", "gemma-2-9b", "gemma-2-2b", "gemma-7b",
    # AWS Bedrock
    "amazon-nova-premier", "amazon-nova-pro", "amazon-nova-lite", "amazon-nova-micro",
    "amazon-titan-text-express", "amazon-titan-text-lite",
    "claude-3-5-sonnet-bedrock", "claude-3-opus-bedrock", "claude-3-haiku-bedrock",
    "llama-3-3-70b-bedrock", "llama-3-2-90b-vision-bedrock", "llama-3-1-405b-bedrock",
    "mistral-large-2-bedrock", "cohere-command-r-plus-bedrock",
    # DeepSeek
    "deepseek-v4-pro", "deepseek-r1", "deepseek-v3", "deepseek-coder-v2",
    "deepseek-math-7b", "deepseek-llm-67b", "deepseek-coder-33b", "deepseek-v2-5",
    # Meta
    "llama-4-70b", "llama-4-maverick", "llama-3-3-70b-instruct",
    "llama-3-2-90b-vision", "llama-3-2-11b-vision", "llama-3-2-3b", "llama-3-2-1b",
    "llama-3-1-405b-instruct", "llama-3-1-70b-instruct", "llama-3-1-8b-instruct",
    "llama-3-70b-instruct", "llama-3-8b-instruct", "llama-2-70b-chat", "code-llama-70b",
    # Others (already in our catalog)
    "qwen-3.6-72b", "mistral-large-3", "phi-4-14b",
    "cohere-command-r-plus", "cohere-command-r",
    "perplexity-sonar-pro", "perplexity-sonar-reasoning",
    "glm-5-2", "kimi-k2-7",
}


def is_date_snapshot(model_id: str) -> bool:
    """날짜 스냅샷 suffix 패턴 감지"""
    return bool(DATE_SUFFIX_PATTERN.search(model_id))


def should_exclude(model_id: str) -> bool:
    """제외 대상인지 확인"""
    # 해상도 prefix
    if RESOLUTION_PATTERN.match(model_id):
        return True
    # provider prefix
    for prefix in EXCLUDE_PREFIXES:
        if model_id.startswith(prefix):
            return True
    # 스텝/크기 prefix
    if re.match(r'^\d+-steps/', model_id):
        return True
    return False


def extract_provider(model_data: dict, model_id: str) -> str | None:
    """provider 추출"""
    return model_data.get("litellm_provider") or model_data.get("provider")


def main():
    print("=" * 70)
    print("LiteLLM 모델 카탈로그 분석 리포트")
    print(f"분석 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    with open("/tmp/litellm_models.json", "r") as f:
        raw_data = json.load(f)

    # sample_spec 제거
    raw_data.pop("sample_spec", None)
    total_raw = len(raw_data)
    print(f"\n총 LiteLLM 원시 항목 수: {total_raw:,}")

    # ─── 필터링 ────────────────────────────────────────────────
    filtered = {}
    stats = defaultdict(int)

    for model_id, model_data in raw_data.items():
        provider = extract_provider(model_data, model_id)

        # 1. Provider 필터
        if provider not in TARGET_PROVIDERS:
            stats["excluded_provider"] += 1
            continue

        # 2. prefix 제외
        if should_exclude(model_id):
            stats["excluded_prefix"] += 1
            continue

        # 3. 모드 필터
        mode = model_data.get("mode", "chat")
        if mode not in INCLUDE_MODES:
            stats["excluded_mode"] += 1
            continue

        # 4. deprecated 제외
        dep_date = model_data.get("deprecation_date")
        if dep_date:
            try:
                if datetime.strptime(dep_date, "%Y-%m-%d") < datetime.now():
                    stats["excluded_deprecated"] += 1
                    continue
            except:
                pass

        filtered[model_id] = {
            "provider": provider,
            "provider_label": TARGET_PROVIDERS[provider],
            "mode": mode,
            "max_tokens": model_data.get("max_tokens") or model_data.get("max_input_tokens", 0),
            "max_input_tokens": model_data.get("max_input_tokens", 0),
            "max_output_tokens": model_data.get("max_output_tokens", 0),
            "input_cost_per_token": model_data.get("input_cost_per_token", 0),
            "output_cost_per_token": model_data.get("output_cost_per_token", 0),
            "supports_vision": model_data.get("supports_vision", False),
            "supports_function_calling": model_data.get("supports_function_calling", False),
            "supports_reasoning": model_data.get("supports_reasoning", False),
            "supports_audio_input": model_data.get("supports_audio_input", False),
            "supports_prompt_caching": model_data.get("supports_prompt_caching", False),
            "is_date_snapshot": is_date_snapshot(model_id),
        }
        stats["included"] += 1

    print(f"\n필터링 결과:")
    print(f"  포함: {stats['included']:,}")
    print(f"  제외 (타 프로바이더): {stats['excluded_provider']:,}")
    print(f"  제외 (provider prefix): {stats['excluded_prefix']:,}")
    print(f"  제외 (지원 안되는 mode): {stats['excluded_mode']:,}")
    print(f"  제외 (deprecated): {stats['excluded_deprecated']:,}")

    # ─── 프로바이더별 집계 ──────────────────────────────────────
    print("\n\n프로바이더별 필터링된 모델 수:")
    by_provider = defaultdict(list)
    for mid, mdata in filtered.items():
        by_provider[mdata["provider_label"]].append(mid)

    for pname, mids in sorted(by_provider.items(), key=lambda x: -len(x[1])):
        snapshots = sum(1 for m in mids if is_date_snapshot(m))
        print(f"  {pname}: {len(mids)} 총 (날짜 스냅샷 {snapshots}개 포함)")

    # ─── 우리 서비스 누락 모델 (stable/latest 위주) ────────────
    print("\n\n우리 서비스에 없는 모델 (날짜 스냅샷 제외, 안정 버전 위주):")
    missing_by_provider = defaultdict(list)

    for mid, mdata in filtered.items():
        # 이미 있는 모델 건너뜀
        if mid in CURRENT_MODEL_IDS:
            continue
        # 날짜 스냅샷은 별도 섹션에서 처리
        if mdata["is_date_snapshot"]:
            continue

        input_per_1m = round(mdata["input_cost_per_token"] * 1_000_000, 4) if mdata["input_cost_per_token"] else 0
        output_per_1m = round(mdata["output_cost_per_token"] * 1_000_000, 4) if mdata["output_cost_per_token"] else 0
        ctx = mdata["max_input_tokens"] or mdata["max_tokens"]

        missing_by_provider[mdata["provider_label"]].append({
            "id": mid,
            "mode": mdata["mode"],
            "ctx": ctx,
            "input_1m": input_per_1m,
            "output_1m": output_per_1m,
            "vision": mdata["supports_vision"],
            "reasoning": mdata["supports_reasoning"],
        })

    total_missing = 0
    for pname, models in sorted(missing_by_provider.items(), key=lambda x: -len(x[1])):
        print(f"\n  [{pname}] ({len(models)}개 누락)")
        for m in sorted(models, key=lambda x: x["id"])[:20]:  # 프로바이더당 최대 20개
            flags = []
            if m["vision"]: flags.append("👁")
            if m["reasoning"]: flags.append("🧠")
            ctx_k = f"{m['ctx']//1000}k" if m["ctx"] else "?"
            print(f"    - {m['id']} [{m['mode']}] ctx={ctx_k} "
                  f"in=${m['input_1m']}/out=${m['output_1m']} {''.join(flags)}")
        if len(models) > 20:
            print(f"    ... 외 {len(models)-20}개")
        total_missing += len(models)

    print(f"\n\n총 누락 모델 (안정 버전): {total_missing}개")

    # ─── 새로운 프로바이더 (우리가 미지원) ─────────────────────
    our_providers = {"OpenAI", "Anthropic", "Google AI", "AWS Bedrock",
                     "DeepSeek", "Meta AI", "Mistral AI", "Cohere",
                     "Perplexity AI", "Alibaba Cloud (Qwen)", "Microsoft",
                     "Zhipu AI (GLM)", "Moonshot AI (Kimi)"}
    new_providers = set(by_provider.keys()) - our_providers
    if new_providers:
        print(f"\n신규 추가 가능 프로바이더: {', '.join(sorted(new_providers))}")

    # JSON 저장
    output = {
        "filtered_models": filtered,
        "missing_stable": {
            p: [m["id"] for m in models]
            for p, models in missing_by_provider.items()
        }
    }
    with open("/tmp/litellm_filtered.json", "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"\n분석 결과 저장: /tmp/litellm_filtered.json")


if __name__ == "__main__":
    main()
