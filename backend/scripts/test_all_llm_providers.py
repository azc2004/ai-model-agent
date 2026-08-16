#!/usr/bin/env python3
"""
Test all configured Free LLM API Providers (Google AI Studio, Groq Cloud, GitHub Models, OpenRouter)
by generating 3 deep analysis technical articles per provider.
"""

import os
import sys
import time
import json
from typing import Dict, List, Any
from openai import OpenAI
from dotenv import load_dotenv

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(os.path.join(REPO_ROOT, "backend", ".env"))

try:
    from json_repair import repair_json
except ImportError:
    def repair_json(x: str) -> str:
        return x

SAMPLE_ARTICLES = [
    {
        "title": "DeepSeek-V3 and R1 Architecture: MoE Routing and Multi-Head Latent Attention Scaling",
        "source": "ArXiv AI Papers",
        "category": "연구/학계",
        "content": "DeepSeek-V3 adopts an innovative Multi-Head Latent Attention (MLA) architecture and DeepSeekMoE with dynamic load balancing, achieving 671B total parameters with only 37B active parameters per token. Training on 14.8T high-quality tokens cost under $6M compute. DeepSeek-R1 reinforces multi-step reasoning capabilities with novel reinforcement learning (GRPO) without supervised fine-tuning warm-up, achieving SOTA on MATH-500 (97.3%) and AIME 2024 (79.8%)."
    },
    {
        "title": "Anthropic Claude 3.7 Sonnet with Hybrid Reasoning: Dynamic Token Budget Allocation",
        "source": "Anthropic News",
        "category": "빅테크 공식",
        "content": "Anthropic announces Claude 3.7 Sonnet, the industry's first hybrid reasoning model that seamlessly transitions between instantaneous standard inference and deep sequential thinking. Developers can specify a fine-grained reasoning token budget from 1 to 128k tokens. In SWE-bench Verified, Claude 3.7 Sonnet achieves 70.3% with extended thinking, outperforming specialized reasoning models while maintaining sub-second latency for lightweight queries."
    },
    {
        "title": "NVIDIA Blackwell B200 NVLink 5 Cluster Performance: 30x Inference Speedup for 1T Parameter Models",
        "source": "NVIDIA AI Blog",
        "category": "빅테크 공식",
        "content": "NVIDIA Blackwell architecture features 208 billion transistors manufactured via custom 4NP TSMC process. With second-generation Transformer Engine and 4-bit floating point (FP4) support, Blackwell B200 delivers up to 20 petaflops of compute. The NVLink 5 switch delivers 1.8TB/s bidirectional throughput per GPU across 576 GPUs in an NVL72 cluster, reducing trillion-parameter model inference cost and energy consumption by 25x."
    }
]

PROMPT_TEMPLATE = """다음은 최근 AI 관련 기사/논문의 원문 정보입니다.

Title: {title}
Source: {source}
Category: {category}
Content: {content}

[원문 분석 및 재구성 가이드라인]
독자가 원문을 찾아 읽을 필요가 전혀 없도록 원문의 세부 수치, 기술 명칭, 벤치마크 데이터, 배경 맥락을 100% 보존하여
'Senior AI Solution Architect의 체계적 기술 분석 리포트' 스타일로 깊이 있게 재구성하세요.

다음 JSON 스키마에 맞춰 자연스러운 한국어로 응답하세요 (마크다운 ```json 표기 제외하고 순수 JSON만 반환):
{{
    "title_kr": "원문의 핵심 기술 가치와 수치가 돋보이는 자연스러운 한국어 제목 (50자 이내)",
    "executive_summary": "핵심 내용을 2~3문장으로 압축한 임원 요약 (150자 이내)",
    "summary_bullets": [
        "📌 [개발 배경 & 과제] 원문의 개발 배경, 해결하고자 하는 핵심 과제 및 수치적 목표 (2~3문장)",
        "⚙️ [핵심 아키텍처 & 메커니즘] 원문 기사의 핵심 기술 작동 원리, 데이터 팩트, 알고리즘 및 성능 (2~3문장)",
        "💡 [실무 적용 & 파급력] 현업 엔지니어 및 기업 환경에서의 실무 이식 가치, TCO 영향 및 향후 전망 (2~3문장)"
    ],
    "analytical_deep_dive": "1,500자 이상의 프리미엄 심층 기술 분석 마크다운. 아래 5대 섹션 포함:\\n\\n### 1. 📌 개발 배경 및 해결 과제\\n### 2. ⚙️ 핵심 기술 아키텍처 및 작동 원리\\n### 3. 📊 성능 지표, 벤치마크 및 데이터 분석\\n### 4. 💡 실무 시스템 이식 가이드 & 코드 레시피\\n### 5. 🎯 직무별 맞춤 액션 플랜",
    "actionable_insight": {{
        "developer": "개발자 관점 실무 이식 팁",
        "pm": "PM 관점 UX 기획 팁",
        "business": "비즈니스 리더 관점 TCO 최적화 팁",
        "researcher": "연구자 관점 벤치마크 분석 팁"
    }},
    "impact_score": 92,
    "tags": ["#태그1", "#태그2", "#태그3"],
    "matched_lenses": ["developer", "agent"]
}}"""


def extract_json_safe(raw_text: str) -> Dict[str, Any]:
    """JSON 파싱 안전 처리"""
    try:
        repaired = repair_json(raw_text)
        d = json.loads(repaired)
        if isinstance(d, dict) and d.get("title_kr"):
            return d
    except Exception:
        pass

    start = raw_text.find('{')
    end = raw_text.rfind('}')
    if start != -1 and end > start:
        try:
            return json.loads(raw_text[start:end+1], strict=False)
        except Exception:
            pass
    return {}


def test_provider(provider_name: str, client: OpenAI, model: str) -> List[Dict[str, Any]]:
    """단일 공급자에 대해 3개 테스트 기사 생성 및 검증"""
    print(f"\n{'='*70}")
    print(f"🚀 [{provider_name}] 테스트 시작 (모델: {model})")
    print(f"{'='*70}")

    results = []

    for i, article in enumerate(SAMPLE_ARTICLES, 1):
        prompt = PROMPT_TEMPLATE.format(
            title=article["title"],
            source=article["source"],
            category=article["category"],
            content=article["content"]
        )

        print(f"\n  [기사 {i}/3] 원문: {article['title'][:55]}...")
        start_time = time.time()

        try:
            kwargs: Dict[str, Any] = {
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 3000,
                "temperature": 0.3,
                "timeout": 45.0
            }
            if any(x in model.lower() for x in ["gemini", "gpt", "llama", "deepseek"]):
                kwargs["response_format"] = {"type": "json_object"}

            resp = client.chat.completions.create(**kwargs)
            elapsed = time.time() - start_time
            raw_text = resp.choices[0].message.content.strip()
            parsed = extract_json_safe(raw_text)

            if parsed and parsed.get("title_kr") and parsed.get("analytical_deep_dive"):
                deep_dive_len = len(parsed["analytical_deep_dive"])
                print(f"    ✅ 성공! 소요 시간: {elapsed:.2f}초 | 리포트 길이: {deep_dive_len}자")
                print(f"    📌 생성 제목: {parsed['title_kr']}")
                print(f"    🎯 직무 렌즈: {parsed.get('matched_lenses', [])} | 태그: {parsed.get('tags', [])[:3]}")
                results.append({
                    "article_index": i,
                    "status": "SUCCESS",
                    "elapsed": elapsed,
                    "title_kr": parsed["title_kr"],
                    "deep_dive_len": deep_dive_len,
                    "executive_summary": parsed.get("executive_summary", "")[:80] + "..."
                })
            else:
                print(f"    ⚠️ JSON 파싱 미흡: 응답 길이 {len(raw_text)}자")
                results.append({
                    "article_index": i,
                    "status": "PARSE_WARNING",
                    "elapsed": elapsed,
                    "title_kr": parsed.get("title_kr", "N/A"),
                    "deep_dive_len": len(raw_text),
                    "executive_summary": raw_text[:80] + "..."
                })
        except Exception as e:
            elapsed = time.time() - start_time
            print(f"    ❌ 오류 발생 ({elapsed:.2f}초): {e}")
            results.append({
                "article_index": i,
                "status": f"ERROR: {e}",
                "elapsed": elapsed,
                "title_kr": "N/A",
                "deep_dive_len": 0,
                "executive_summary": "N/A"
            })

    return results


def main():
    print("=" * 70)
    print("🧪 무료 LLM API 공급자별 3개 기사 생성 및 실전 벤치마크 테스트")
    print("=" * 70)

    gemini_key = os.getenv("GEMINI_API_KEY", "").strip()
    groq_key = os.getenv("GROQ_API_KEY", "").strip()
    github_token = (os.getenv("GITHUB_TOKEN") or os.getenv("GITHUB_MODELS_TOKEN", "")).strip()
    openrouter_key = os.getenv("OPENROUTER_API_KEY", "").strip()

    test_targets = []

    # 1. Google AI Studio
    if gemini_key:
        test_targets.append({
            "name": "Google AI Studio",
            "client": OpenAI(base_url="https://generativelanguage.googleapis.com/v1beta/openai/", api_key=gemini_key),
            "model": "gemini-3.6-flash"
        })

    # 2. Groq Cloud
    if groq_key:
        test_targets.append({
            "name": "Groq Cloud (LPU)",
            "client": OpenAI(base_url="https://api.groq.com/openai/v1", api_key=groq_key),
            "model": "llama-3.3-70b-versatile"
        })

    # 3. GitHub Models
    if github_token:
        test_targets.append({
            "name": "GitHub Models (Azure)",
            "client": OpenAI(base_url="https://models.inference.ai.azure.com", api_key=github_token),
            "model": "gpt-4o-mini"
        })

    # 4. OpenRouter
    if openrouter_key:
        test_targets.append({
            "name": "OpenRouter (Free)",
            "client": OpenAI(base_url="https://openrouter.ai/api/v1", api_key=openrouter_key),
            "model": "google/gemma-4-26b-a4b-it:free"
        })

    if not test_targets:
        print("❌ 설정된 API 키가 없습니다. backend/.env 파일을 확인하세요.")
        return

    all_summary = {}

    for target in test_targets:
        res = test_provider(target["name"], target["client"], target["model"])
        all_summary[target["name"]] = res

    # ── 최종 요약 테이블 출력 ──
    print("\n" + "=" * 70)
    print("📊 최종 테스트 결과 요약 (각 3개 기사 분석)")
    print("=" * 70)
    print(f"{'공급자':<24} | {'모델':<26} | {'성공률':<8} | {'평균 응답속도'}")
    print("-" * 70)

    for target in test_targets:
        name = target["name"]
        model = target["model"]
        res = all_summary.get(name, [])
        success_count = sum(1 for r in res if r["status"] == "SUCCESS")
        avg_time = sum(r["elapsed"] for r in res) / len(res) if res else 0
        rate_str = f"{success_count}/3"
        print(f"{name:<24} | {model:<26} | {rate_str:<8} | {avg_time:.2f}초/건")

    print("=" * 70)


if __name__ == "__main__":
    main()
