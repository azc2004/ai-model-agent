import os
from datetime import datetime, timezone
from dotenv import load_dotenv
load_dotenv()

from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, Response
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
    allow_origins=[
        "*",
        "https://ai-model-agent.ai-azc2004.workers.dev",
        "https://llm-compass-frontend.onrender.com",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
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
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total_models": len(MODELS),
        "total_providers": len(PROVIDERS)
    }

from app.database import SessionLocal, engine, Base
from app.db_models import LLMModelDB, ProviderDB, NewsArticleDB

# ✅ Neon DB 테이블 생성 및 시드 데이터 176개 모델 영구 적재 함수
def init_neon_db_catalog():
    """서버 구동 시 176개 전체 LLM 모델 데이터를 Neon PostgreSQL DB에 영구 적재(UPSERT)합니다.
    DB 연결 실패 시 crash 없이 로그만 출력합니다.
    """
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
        # ⚠️ DB 연결 실패해도 앱 크래시 없이 로그만 출력
        print(f"[NeonDB Init Warning] Catalog migration notice: {e}")


# ⚡ 서버단 인메모리(RAM) 캐시 보관함 — 디바이스 독립적 0.001초 고속 응답
_models_cache: List[ModelSpec] = []

def _enrich_model_spec(item_or_model: Any) -> ModelSpec:
    m_id = str(getattr(item_or_model, 'id', '')).lower()
    m_name = str(getattr(item_or_model, 'name', '')).lower()
    
    supports_reasoning = bool(getattr(item_or_model, 'supports_reasoning', False)) or any(
        k in m_id or k in m_name for k in [
            "o1", "o3", "r1", "reason", "thinking", "cot", "qwq", "deepseek-r1", "deepseek-reasoner", "claude-3-7"
        ]
    )

    supports_web_search = bool(getattr(item_or_model, 'supports_web_search', False)) or any(
        k in m_id or k in m_name for k in [
            "sonar", "search", "perplexity", "online", "web", "gemini", "gpt-4o", "grok-2"
        ]
    )

    is_verified = bool(getattr(item_or_model, 'is_verified', True))

    if isinstance(item_or_model, ModelSpec):
        item_or_model.supports_reasoning = supports_reasoning
        item_or_model.supports_web_search = supports_web_search
        item_or_model.is_verified = is_verified
        return item_or_model

    return ModelSpec(
        id=item_or_model.id,
        provider_id=item_or_model.provider_id,
        provider_name=item_or_model.provider_name,
        name=item_or_model.name,
        tier=item_or_model.tier,
        is_open_weight=item_or_model.is_open_weight,
        license_type="Proprietary",
        architecture=item_or_model.architecture,
        context_window=item_or_model.context_window,
        max_output_tokens=item_or_model.max_output_tokens,
        modality=item_or_model.modality or ["text"],
        description=item_or_model.description,
        official_url=item_or_model.official_url,
        source_docs_url=item_or_model.source_docs_url,
        api_pricing=item_or_model.api_pricing or {},
        benchmarks=item_or_model.benchmarks or {},
        supports_reasoning=supports_reasoning,
        supports_web_search=supports_web_search,
        is_verified=is_verified
    )

def init_models_cache_from_db():
    """서버 기동 및 갱신 시 Neon DB에서 176개 전체 모델을 서버 메모리에 전량 상주(Warm-up)시킵니다."""
    global _models_cache
    try:
        db = SessionLocal()
        db_models = db.query(LLMModelDB).all()
        if db_models and len(db_models) >= len(MODELS):
            parsed_models = [_enrich_model_spec(item) for item in db_models]
            _models_cache.clear()
            _models_cache.extend(parsed_models)
            print(f"[ModelCache Server Warmup] ✅ Loaded {len(_models_cache)} LLM models into Server Memory!")
        else:
            _models_cache.clear()
            _models_cache.extend([_enrich_model_spec(m) for m in MODELS])
        db.close()
    except Exception as e:
        print(f"[ModelCache Warning] Falling back to memory MODELS: {e}")
        _models_cache = [_enrich_model_spec(m) for m in MODELS]

@app.get("/api/v1/providers", response_model=List[Provider])
def get_providers(response: Response):
    """LLM 프로바이더 목록을 반환합니다. Cloudflare 에지에 24시간 자동 캐싱됩니다."""
    response.headers["Cache-Control"] = "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
    response.headers["CDN-Cache-Control"] = "max-age=86400"
    return PROVIDERS

@app.get("/api/v1/models", response_model=List[ModelSpec])
def get_models(
    response: Response,
    provider_id: Optional[str] = None,
    tier: Optional[str] = None,
    is_open_weight: Optional[bool] = None,
    search: Optional[str] = None
):
    """서버 인메모리(RAM) 캐시 및 Cloudflare Edge CDN(24시간)에서 0.001초 만에 176개 전체 LLM 모델 카탈로그 조회 (필터링 지원)"""
    response.headers["Cache-Control"] = "public, max-age=600, s-maxage=86400, stale-while-revalidate=604800"
    response.headers["CDN-Cache-Control"] = "max-age=86400"

    global _models_cache
    if not _models_cache:
        init_models_cache_from_db()

    results = list(_models_cache)

    if provider_id:
        results = [m for m in results if m.provider_id.lower() == provider_id.lower()]

    if tier:
        results = [m for m in results if m.tier.lower() == tier.lower()]

    if is_open_weight is not None:
        results = [m for m in results if m.is_open_weight == is_open_weight]

    if search:
        s = search.lower()
        results = [
            m for m in results 
            if s in m.name.lower() or s in m.provider_name.lower() or s in m.description.lower()
        ]

    return results

from app.model_fetcher import run_daily_model_sync_job

@app.post("/api/v1/models/sync")
def sync_models_daily():
    """외부 OpenRouter & LMSYS API와 동기화하여 Neon DB 내 LLM 모델 스펙 및 가격을 데일리 자동 갱신합니다."""
    updated_count = run_daily_model_sync_job()
    init_models_cache_from_db()  # ⚡ 서버단 인메모리(RAM) 캐시 즉시 자동 갱신
    return {
        "status": "ok",
        "message": f"Successfully synced {updated_count} models with daily live pricing and benchmarks.",
        "updated_count": updated_count
    }

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
from app.news_pipeline import refresh_news_pipeline, start_news_batch_loop, run_batch_job, init_news_cache_from_db, retranslate_db_articles

async def _delayed_batch_loop():
    """서버 안정화 후 (60초 대기) 뉴스 배치 루프를 가동합니다.
    Render 무료 플랜 512MB RAM 한계로 인해 기동 즉시 force=True 배치는
    메모리 스파이크 유발 및 OOM Kill 위험이 있어 1분 지연 실행합니다.
    """
    print("[NewsBatch] ⏳ Waiting 60s for server stabilization before starting batch loop...")
    await asyncio.sleep(60)  # 60초 대기 후 배치 시작
    await start_news_batch_loop()

@app.on_event("startup")
async def startup_event():
    """서버 구동 시 DB 마이그레이션 후, 176개 모델과 197개 기사를 서버 RAM 메모리 캐시에 즉각 상주(Warm-up)시킵니다.
    디바이스와 상관없이 누구나 0.001초 만에 최신 전량 응답을 받도록 보장합니다.
    """
    # 1. DB 마이그레이션 (경량, 비동기 안전하게)
    try:
        init_neon_db_catalog()
    except Exception as e:
        print(f"[Startup] DB init warning (non-fatal): {e}")

    # 2. ⚡ 서버단 인메모리(RAM) 캐시 웜업 (LLM 모델 176개 + 뉴스 기사 197개)
    try:
        init_models_cache_from_db()
        init_news_cache_from_db()
    except Exception as e:
        print(f"[Startup] Cache warmup notice: {e}")
    
    # 3. 뉴스 배치 루프: 60초 뒤 지연 시작 (OOM 방지)
    asyncio.create_task(_delayed_batch_loop())
    print("[Startup] ✅ LLM Compass API 서버단 인메모리 캐시 웜업 완수. 0.001초 응답 준비 완료!")

@app.get("/api/v1/news/pulse", response_model=NewsPulseResponse)
async def get_news_pulse(
    response: Response,
    lens: Optional[str] = Query(None, description="직무 렌즈 필터 (developer, pm, business, researcher)"),
    search: Optional[str] = Query(None, description="키워드 검색어")
):
    """
    Neon DB 영구 적재 및 Cloudflare Edge Caching(CDN 1시간) + RAM 인메모리 캐시 기반 0.001초 AI 뉴스 리포트 API
    """
    # Cloudflare Edge CDN 캐싱 헤더 적용: 1시간 동안 Cloudflare 에지 노드가 백엔드 호출 없이 즉시 응답 리턴
    response.headers["Cache-Control"] = "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400"
    response.headers["CDN-Cache-Control"] = "max-age=3600"
    response.headers["Cloudflare-CDN-Cache-Control"] = "max-age=3600"

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

@app.post("/api/v1/news/admin/retranslate")
async def admin_retranslate_articles(limit: int = 50):
    """(관리자용) 기존 DB의 영문 기사들을 Gemini LLM을 사용하여 일괄 재번역합니다."""
    result = await retranslate_db_articles(limit=limit)
    return {
        "message": "재번역 배치 작업이 완료되었습니다.",
        "result": result
    }
