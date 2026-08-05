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
@app.head("/")
@app.get("/health")
@app.head("/health")
@app.get("/api/v1/health")
@app.head("/api/v1/health")
def health_check():
    """UptimeRobot 및 외부 헬스체크(HEAD/GET) 핑 지원 엔드포인트"""
    return {
        "status": "ok",
        "service": "LLM Compass API",
        "version": "1.0.0",
        "total_models": len(MODELS),
        "total_providers": len(PROVIDERS)
    }

from app.database import SessionLocal, engine, Base
from app.db_models import LLMModelDB, ProviderDB, NewsArticleDB

# Neon DB 테이블 생성 및 시드 데이터 176개 모델 영구 적재 함수
def init_neon_db_catalog():
    """서버 구동 시 176개 전체 LLM 모델 데이터를 Neon PostgreSQL DB에 영구 적재(UPSERT)합니다."""
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        count = db.query(LLMModelDB).count()
        if count < len(MODELS):
            print(f"[NeonDB Init] Migrating {len(MODELS)} full LLM models to Neon DB...")
            for m in MODELS:
                existing = db.query(LLMModelDB).filter(LLMModelDB.id == m.id).first()
                if not existing:
                    db_m = LLMModelDB(
                        id=m.id,
                        provider_id=m.provider_id,
                        provider_name=m.provider_name,
                        name=m.name,
                        tier=m.tier,
                        is_open_weight=m.is_open_weight,
                        architecture=m.architecture or "Transformer",
                        context_window=m.context_window,
                        max_output_tokens=m.max_output_tokens,
                        modality=m.modality or ["text"],
                        description=m.description or "",
                        official_url=m.official_url or "",
                        source_docs_url=m.source_docs_url or "",
                        api_pricing=m.api_pricing.dict() if m.api_pricing else {},
                        benchmarks=m.benchmarks.dict() if m.benchmarks else {}
                    )
                    db.add(db_m)
            db.commit()
            print(f"[NeonDB Init] ✅ Successfully migrated full LLM catalog to Neon PostgreSQL!")
        db.close()
    except Exception as e:
        print(f"[NeonDB Init Warning] Catalog migration notice: {e}")

# 서버 시작 시 Neon DB 마이그레이션 자동 실행
init_neon_db_catalog()

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
    """Neon PostgreSQL DB에서 176개 전체 LLM 모델 카탈로그 목록 조회 (필터링 지원)"""
    results = MODELS

    # DB에 적재된 최신 176개 모델 우선 로드 시도
    try:
        db = SessionLocal()
        db_models = db.query(LLMModelDB).all()
        if db_models and len(db_models) >= len(MODELS):
            parsed_models = []
            for item in db_models:
                parsed_models.append(ModelSpec(
                    id=item.id,
                    provider_id=item.provider_id,
                    provider_name=item.provider_name,
                    name=item.name,
                    tier=item.tier,
                    is_open_weight=item.is_open_weight,
                    license_type="Proprietary",
                    architecture=item.architecture,
                    context_window=item.context_window,
                    max_output_tokens=item.max_output_tokens,
                    modality=item.modality or ["text"],
                    description=item.description,
                    official_url=item.official_url,
                    source_docs_url=item.source_docs_url,
                    api_pricing=item.api_pricing or {},
                    benchmarks=item.benchmarks or {}
                ))
            results = parsed_models
        db.close()
    except Exception as e:
        print(f"[DB Models Warning] Falling back to memory MODELS: {e}")

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
    """서버 구동 시 최신 기사 즉각 파라렐 수집 및 24시간 뉴스 배치 루프를 구동합니다."""
    asyncio.create_task(run_batch_job(force=True))
    asyncio.create_task(start_news_batch_loop())

@app.get("/api/v1/news/pulse", response_model=NewsPulseResponse)
async def get_news_pulse(
    response: Response,
    lens: Optional[str] = Query(None, description="직무 렌즈 필터 (developer, pm, business, researcher)"),
    search: Optional[str] = Query(None, description="키워드 검색어")
):
    """
    Neon DB 영구 적재 및 3계층 다층 캐싱(RAM Caching + HTTP Browser Caching) 기반 AI 뉴스 리포트 API
    """
    # 1. 30분 간 브라우저 & Edge CDN 캐싱 헤더 적용
    response.headers["Cache-Control"] = "public, max-age=1800, s-maxage=3600"

    articles = await refresh_news_pipeline()
    
    if lens:
        articles = [a for a in articles if lens in a.matched_lenses]
        
    if search:
        s = search.lower()
        filtered = []
        for a in articles:
            in_title = s in a.title.lower()
            in_bullets = any(s in b.lower() for b in a.summary_bullets)
            in_tags = any(s in t.lower() for t in a.tags)
            in_source = s in a.source_name.lower()
            if in_title or in_bullets or in_tags or in_source:
                filtered.append(a)
        articles = filtered
        
    return {
        "articles": articles,
        "total_count": len(articles),
        "last_updated": datetime.now(timezone.utc).isoformat()
    }

@app.post("/api/v1/news/pulse/refresh", response_model=NewsPulseResponse)
async def force_refresh_news_pulse():
    """관리자/개발자 수동 강제 수집 배치 및 DB 동기화 엔드포인트"""
    articles = await run_batch_job(force=True)
    return {
        "articles": articles,
        "total_count": len(articles),
        "last_updated": datetime.now(timezone.utc).isoformat()
    }
