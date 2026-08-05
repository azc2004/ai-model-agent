import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# .env 파일에서 DATABASE_URL 접속 정보를 로드
DATABASE_URL = os.getenv("DATABASE_URL")

# fallback용 기본 sqlite (만약 DATABASE_URL이 없을 경우)
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./local_news.db"

# Neon PostgreSQL의 경우 postgres:// 대신 postgresql:// 사용 보장
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# SQLAlchemy 엔진 생성
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # 커넥션 유효성 자동 핑 검사 (Neon 수면 해제 지원)
    pool_recycle=300,        # 5분 단위 커넥션 재사용
    connect_args={"sslmode": "require"} if "postgresql" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """FastAPI 및 백그라운드 태스크용 DB 세션 디펜던시 디스펜서"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
