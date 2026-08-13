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
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_models_provider ON models(provider_id);
CREATE INDEX IF NOT EXISTS idx_models_tier ON models(tier);
CREATE INDEX IF NOT EXISTS idx_models_is_open ON models(is_open_weight);
