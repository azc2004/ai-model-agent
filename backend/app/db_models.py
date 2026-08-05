from sqlalchemy import Column, String, Integer, Text, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from app.database import Base

class NewsArticleDB(Base):
    """Neon PostgreSQL에 영구 적재되는 AI 트렌드 뉴스 및 기술 블로그 리포트 DB 모델"""
    __tablename__ = "news_articles"

    id = Column(String(255), primary_key=True, index=True)
    title = Column(String(500), nullable=False, index=True)
    source_name = Column(String(100), nullable=False, index=True)
    source_url = Column(Text, nullable=False, unique=True)
    published_at = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    image_url = Column(Text, nullable=True)
    summary_bullets = Column(JSON, nullable=False)      # 3줄 핵심 요약 (JSON)
    blog_summary = Column(Text, nullable=False)          # 1,900자+ 기술 블로그 마크다운 리포트
    actionable_insight = Column(JSON, nullable=True)    # 4대 직무별 팁 (JSON)
    impact_score = Column(Integer, default=85, index=True)
    tags = Column(JSON, nullable=True)                  # 태그 리스트 (JSON)
    matched_lenses = Column(JSON, nullable=True)        # 매칭 직무 렌즈 (JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class LLMModelDB(Base):
    """Neon PostgreSQL에 영구 저장되는 LLM 모델 스펙 DB 모델"""
    __tablename__ = "llm_models"

    id = Column(String(100), primary_key=True, index=True)
    provider_id = Column(String(50), nullable=False, index=True)
    provider_name = Column(String(100), nullable=False)
    name = Column(String(100), nullable=False)
    tier = Column(String(50), nullable=False)
    is_open_weight = Column(Boolean, default=False)
    architecture = Column(String(100), nullable=False)
    context_window = Column(Integer, nullable=False)
    max_output_tokens = Column(Integer, nullable=False)
    modality = Column(JSON, nullable=False)
    description = Column(Text, nullable=False)
    official_url = Column(Text, nullable=False)
    source_docs_url = Column(Text, nullable=False)
    api_pricing = Column(JSON, nullable=False)
    benchmarks = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ProviderDB(Base):
    """Neon PostgreSQL에 영구 저장되는 AI 모델 제공사 DB 모델"""
    __tablename__ = "providers"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    website = Column(Text, nullable=False)
    logo_url = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    official_docs_url = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
