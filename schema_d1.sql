-- Cloudflare D1 (SQLite Edge) Schema for LLM COMPASS 3.0

CREATE TABLE IF NOT EXISTS providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  official_docs_url TEXT
);

CREATE TABLE IF NOT EXISTS models (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  name TEXT NOT NULL,
  tier TEXT NOT NULL,
  is_open_weight INTEGER DEFAULT 0,
  license_type TEXT,
  parameter_count_b REAL,
  architecture TEXT,
  context_window INTEGER,
  max_output_tokens INTEGER,
  modality TEXT, -- JSON array string
  description TEXT,
  -- 언어별 설명. {"en": "...", "ja": "..."} 형태의 JSON 이며 없는 언어는 description 으로
  -- 폴백한다. benchmarks/quota 와 같은 방식으로 컬럼 하나에 담는다.
  description_i18n TEXT,
  official_url TEXT,
  source_docs_url TEXT,
  api_pricing TEXT, -- JSON object string
  quota TEXT, -- JSON object string
  benchmarks TEXT, -- JSON object string
  is_verified INTEGER DEFAULT 1,
  litellm_id TEXT,
  supports_reasoning INTEGER DEFAULT 0,
  supports_web_search INTEGER DEFAULT 0,
  is_deprecated INTEGER DEFAULT 0,
  is_new INTEGER DEFAULT 0,
  hardware_requirements TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT,
  source TEXT,
  published_at TEXT,
  is_new INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS trend_news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  report_type TEXT,
  executive_summary TEXT,
  analytical_deep_dive TEXT,
  key_takeaways TEXT,
  original_sources TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT,
  -- 뉴스 배치가 채우는 컬럼. 원격 DB에는 ALTER TABLE 로 뒤늦게 붙어 이 파일과 어긋나
  -- 있었고, 이 스키마로 DB를 새로 만들면 배치가 깨졌다.
  tags TEXT,
  matched_lenses TEXT
);

CREATE INDEX IF NOT EXISTS idx_models_provider ON models(provider_id);
CREATE INDEX IF NOT EXISTS idx_models_tier ON models(tier);
CREATE INDEX IF NOT EXISTS idx_models_is_open ON models(is_open_weight);

-- 익명 사용 로그. 개인 식별 정보 없이 세션 단위 행동만 기록한다.
CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- page_view | search | compare_add | compare_remove | external_link_click | news_open
  tab TEXT,
  label TEXT,
  device TEXT, -- mobile | desktop
  country TEXT, -- Cloudflare edge에서 제공 (request.cf.country)
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 주간 제품 업데이트. 커밋 메시지를 그대로 싣지 않는다 — 개발자용 문장이고
-- 과거 보안·장애 이력이 그대로 드러난다. LLM 이 사용자 관점 문장으로 다시 쓴다.
CREATE TABLE IF NOT EXISTS changelog (
  id TEXT PRIMARY KEY,            -- changelog-YYYY-MM-DD
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  items TEXT NOT NULL,            -- JSON: [{category, text}]
  commit_count INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_changelog_end ON changelog(period_end);

-- 카탈로그 주간 스냅샷. model_d1_batch 가 INSERT OR REPLACE 로 덮어쓰기 때문에
-- 이전 가격·스펙이 소실된다. 동기화 직전에 현재 상태를 남겨 두 시점을 비교할 수
-- 있게 한다 — "이번 주 GPT-4o 단가 인하" 같은 변경 리포트의 재료다.
-- 631행 × 주 1회 = 연 33,000행. 180일 지난 것은 배치가 정리한다.
CREATE TABLE IF NOT EXISTS model_snapshots (
  captured_at TEXT NOT NULL,      -- date('now')
  model_id TEXT NOT NULL,
  name TEXT,
  provider_name TEXT,
  api_pricing TEXT,               -- JSON
  context_window INTEGER,
  benchmarks TEXT,                -- JSON
  is_deprecated INTEGER,
  PRIMARY KEY (captured_at, model_id)
);

CREATE INDEX IF NOT EXISTS idx_snapshot_captured ON model_snapshots(captured_at);

-- 크롤러 방문 기록. analytics_events 에 섞으면 사람 세션 수가 오염되므로 분리한다.
-- 워커가 자산보다 먼저 실행되므로 SPA 셸이 아니라 실제 요청 시점에 기록된다.
CREATE TABLE IF NOT EXISTS crawler_hits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bot TEXT NOT NULL,        -- GPTBot | ClaudeBot | PerplexityBot | Googlebot | ...
  path TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_crawler_created ON crawler_hits(created_at);
CREATE INDEX IF NOT EXISTS idx_crawler_bot ON crawler_hits(bot);

CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id);
