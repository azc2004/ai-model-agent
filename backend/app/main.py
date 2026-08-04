import os
from datetime import datetime, timezone
from dotenv import load_dotenv
load_dotenv()

from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import (
    Provider, ModelSpec, GPUSpec, TCOInput, TCOComparisonResult,
    RecommendationRequest, ArchitectureRecommendationResult, TrendingTemplate,
    CustomMarkdownRequest, CustomMarkdownResponse, NewsPulseResponse
)
from app.seed_data import PROVIDERS, MODELS, GPU_SPECS
from app.tco_calculator import calculate_tco
from app.recommender import TRENDING_TEMPLATES, recommend_architecture
from app.markdown_generator import create_markdown

app = FastAPI(
    title="LLM Compass API",
    description="전세계 AI LLM 모델 비용, 스펙, 벤치마크 비교 및 API vs 셀프호스팅 TCO 시뮬레이터 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "service": "LLM Compass API",
        "version": "1.0.0",
        "status": "online",
        "total_models": len(MODELS),
        "total_providers": len(PROVIDERS)
    }

@app.get("/api/v1/providers", response_model=List[Provider])
def get_providers():
    """LLM 프로바이더 목록을 반환합니다."""
    return PROVIDERS

@app.get("/api/v1/models", response_model=List[ModelSpec])
def get_models(
    provider_id: Optional[str] = None,
    tier: Optional[str] = None,
    is_open_weight: Optional[bool] = None,
    search: Optional[str] = None
):
    """LLM 모델 목록 조회 (필터링 지원)"""
    results = MODELS

    if provider_id:
        results = [m for m in results if m.provider_id.lower() == provider_id.lower()]

    if tier:
        results = [m for m in results if m.tier.lower() == tier.lower()]

    if is_open_weight is not None:
        results = [m for m in results if m.is_open_weight == is_open_weight]

    if search:
        query = search.lower()
        results = [
            m for m in results 
            if query in m.name.lower() or query in m.provider_name.lower() or query in m.description.lower()
        ]

    return results

@app.get("/api/v1/models/{model_id}", response_model=ModelSpec)
def get_model_detail(model_id: str):
    """특정 모델의 상세 정보를 반환합니다."""
    model = next((m for m in MODELS if m.id.lower() == model_id.lower()), None)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return model

@app.get("/api/v1/compare", response_model=List[ModelSpec])
def compare_models(ids: str = Query(..., description="콤마로 구분된 모델 ID 목록 (예: gpt-5.6-sol,claude-opus-5)")):
    """여러 모델을 나란히 비교하기 위한 모델 상세 목록 반환"""
    id_list = [i.strip().lower() for i in ids.split(",") if i.strip()]
    results = [m for m in MODELS if m.id.lower() in id_list]
    return results

@app.get("/api/v1/gpus", response_model=List[GPUSpec])
def get_gpu_specs():
    """GPU 하드웨어 스펙 및 클라우드/온프레미스 단가 목록 조회"""
    return GPU_SPECS

@app.post("/api/v1/simulate/tco", response_model=TCOComparisonResult)
def simulate_tco(tco_input: TCOInput):
    """API 이용 비용 vs 셀프호스팅 (클라우드/온프레미스 GPU) TCO 손익분기점 계산"""
    try:
        return calculate_tco(tco_input)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/v1/recommend/trending", response_model=List[TrendingTemplate])
def get_trending_templates():
    """사람들이 가장 많이 구현하는 인기 AI 서비스 Top 5 템플릿 반환"""
    return TRENDING_TEMPLATES

@app.post("/api/v1/recommend/architecture", response_model=ArchitectureRecommendationResult)
def get_recommended_architecture(req: RecommendationRequest):
    """사용자의 서비스 조건에 최적화된 3가지 AI 모델 조합, 호스팅 추천, Markdown 개발 명세서 반환"""
    return recommend_architecture(req)

@app.post("/api/v1/generate/markdown", response_model=CustomMarkdownResponse)
def generate_custom_markdown(req: CustomMarkdownRequest):
    """
    Router → Generator → Critique → Deterministic Validator 5단계 파이프라인으로 
    검증 통과 및 환각 방지 마크다운 명세서(AGENTS.md, SKILL.md, spec.md, tasks.md, planning.md) 생성
    """
    try:
        res = create_markdown(
            user_request=req.user_request,
            context=req.context,
            ask_when_missing=req.ask_when_missing,
            run_critique=req.run_critique
        )
        return CustomMarkdownResponse(
            case=res.case.value,
            markdown=res.markdown,
            passed=res.validation.passed,
            retries_used=res.retries_used,
            issues=[{"rule": i.rule, "detail": i.detail} for i in res.validation.issues],
            needs_user_input=res.needs_user_input
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"마크다운 생성 중 오류가 발생했습니다: {str(e)}")

import asyncio
from app.news_pipeline import refresh_news_pipeline, start_news_batch_loop, run_batch_job

@app.on_event("startup")
async def startup_event():
    """서버 구동 시 백그라운드 24시간 뉴스 수집 정기 배치를 시작합니다."""
    asyncio.create_task(start_news_batch_loop())

@app.get("/api/v1/news/pulse", response_model=NewsPulseResponse)
async def get_news_pulse(lens: Optional[str] = Query(None, description="직무 렌즈 (예: developer, pm, business, researcher)")):
    """최신 AI 뉴스와 실전 활용 팁(Actionable Insight)을 가져옵니다."""
    articles = await refresh_news_pipeline()
    
    # 렌즈 필터링이 있다면 적용
    if lens and lens != "all":
        filtered = []
        for a in articles:
            if lens in a.matched_lenses:
                filtered.append(a)
            elif a.actionable_insight and getattr(a.actionable_insight, lens, None):
                filtered.append(a)
        articles = filtered
        
    return {
        "articles": articles,
        "total_count": len(articles),
        "last_updated": datetime.now(timezone.utc).isoformat()
    }

@app.post("/api/v1/news/pulse/refresh", response_model=NewsPulseResponse)
async def force_refresh_news_pulse():
    """관리자/개발자 수동 강제 수집 배치 실행 엔드포인트"""
    articles = await run_batch_job(force=True)
    return {
        "articles": articles,
        "total_count": len(articles),
        "last_updated": datetime.now(timezone.utc).isoformat()
    }
