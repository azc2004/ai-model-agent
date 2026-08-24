# 뉴스 파이프라인 단일화 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Python 배치를 유일한 뉴스 생성 경로로 만들고 비밀정보 및 품질 검증 없이 D1에 쓰이는 경로를 제거합니다.

**Architecture:** 외부 의존성 없는 검증 모듈과 주입 가능한 배치 오케스트레이터를 둡니다. GitHub Actions가 테스트 성공 후 환경변수로 인증정보를 전달하며, Worker는 뉴스 조회만 담당합니다.

**Tech Stack:** Python 3.11, unittest, urllib, Wrangler CLI, Cloudflare D1, GitHub Actions, TypeScript Cloudflare Worker

**Spec:** `docs/superpowers/specs/2026-08-25-news-pipeline-consolidation-design.md`

## Global Constraints

- `backend/scripts/generate_trend_reports.py`만 운영 뉴스 생성기로 사용합니다.
- API 키를 소스·테스트·로그에 기록하지 않습니다.
- 검증은 결정론적이며 추가 LLM 호출을 하지 않습니다.
- 개별 RSS·LLM·D1 실패는 격리하지만 저장 성공이 0건이면 실행은 실패합니다.
- Python 기본 `unittest`를 사용합니다.
- 운영 D1 쓰기와 GitHub Secret 변경은 명시적 외부 승인 없이는 실행하지 않습니다.
- 사용자의 기존 미커밋 변경을 보존합니다.

---

### Task 1: 비밀정보를 환경변수 설정으로 교체

**Files:**
- Modify: `backend/scripts/generate_trend_reports.py:1-20`
- Create: `backend/tests/test_generate_trend_reports.py`
- Modify: `.github/workflows/news_batch.yml:20-40`

**Interfaces:**
- Produces: `load_config(environ: Mapping[str, str]) -> BatchConfig`
- Produces: `BatchConfig(litellm_url: str, litellm_key: str, model: str)`

- [ ] **Step 1: 인증키 누락 실패 테스트 작성**

```python
import os
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "scripts"))
from generate_trend_reports import load_config


class ConfigTests(unittest.TestCase):
    def test_missing_litellm_key_fails_before_work_starts(self):
        with self.assertRaisesRegex(RuntimeError, "LITELLM_API_KEY"):
            load_config({})

    def test_environment_builds_config(self):
        config = load_config({"LITELLM_API_KEY": "test-key"})
        self.assertEqual(config.litellm_key, "test-key")
        self.assertEqual(config.model, "personal-main")
```

- [ ] **Step 2: 테스트가 기대한 이유로 실패하는지 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_generate_trend_reports.ConfigTests -v`

Expected: `ImportError` 또는 `load_config`가 없어서 FAIL.

- [ ] **Step 3: 최소 설정 구현 및 하드코딩 키 제거**

```python
from dataclasses import dataclass
from typing import Mapping
import os


@dataclass(frozen=True)
class BatchConfig:
    litellm_url: str
    litellm_key: str
    model: str


def load_config(environ: Mapping[str, str] | None = None) -> BatchConfig:
    source = os.environ if environ is None else environ
    key = source.get("LITELLM_API_KEY", "").strip()
    if not key:
        raise RuntimeError("LITELLM_API_KEY is required")
    return BatchConfig(
        litellm_url=source.get("LITELLM_URL", "https://ai-gateway.azclab.com/v1").rstrip("/"),
        litellm_key=key,
        model=source.get("LITELLM_MODEL", "personal-main"),
    )
```

`call_llm`은 전역 상수 대신 `BatchConfig`를 받도록 변경합니다. Workflow의 배치 단계에 아래 환경변수를 추가합니다.

```yaml
env:
  CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
  CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
  LITELLM_API_KEY: ${{ secrets.LITELLM_API_KEY }}
```

- [ ] **Step 4: 테스트와 비밀정보 스캔 실행**

Run: `cd backend && venv/bin/python -m unittest tests.test_generate_trend_reports.ConfigTests -v`

Expected: 2 tests PASS.

Run: `git grep -nE 'LITELLM_KEY[[:space:]]*=|sk-[A-Za-z0-9_-]{16,}' -- ':!docs/superpowers/*'`

Expected: 출력 없음. 발견된 실제 키 값은 출력에 재인용하지 않고 제거합니다.

- [ ] **Step 5: 커밋**

```bash
git add backend/scripts/generate_trend_reports.py backend/tests/test_generate_trend_reports.py .github/workflows/news_batch.yml
git commit -m "security: load news batch credentials from environment"
```

### Task 2: 결정론적 기사 및 출처 검증

**Files:**
- Create: `backend/scripts/trend_report_validation.py`
- Create: `backend/tests/test_trend_report_validation.py`

**Interfaces:**
- Produces: `ValidationResult(valid: bool, reasons: tuple[str, ...])`
- Produces: `validate_source(article: Mapping[str, object]) -> ValidationResult`
- Produces: `deduplicate_sources(articles: Sequence[Mapping[str, object]]) -> tuple[list[dict], Counter[str]]`

- [ ] **Step 1: URL·AI 관련성·중복 실패 테스트 작성**

```python
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "scripts"))
from trend_report_validation import deduplicate_sources, validate_source


class SourceValidationTests(unittest.TestCase):
    def test_rejects_non_http_url(self):
        result = validate_source({"title": "LLM release", "link": "javascript:alert(1)", "summary": "AI model"})
        self.assertFalse(result.valid)
        self.assertIn("invalid_source_url", result.reasons)

    def test_rejects_irrelevant_article(self):
        result = validate_source({"title": "등산로 개방", "link": "https://example.com/hike", "summary": "주말 산행 안내"})
        self.assertIn("irrelevant_source", result.reasons)

    def test_deduplicates_normalized_urls(self):
        articles = [
            {"title": "AI model", "link": "https://example.com/a?utm_source=x", "summary": "LLM"},
            {"title": "AI model update", "link": "https://example.com/a", "summary": "inference"},
        ]
        accepted, reasons = deduplicate_sources(articles)
        self.assertEqual(len(accepted), 1)
        self.assertEqual(reasons["duplicate_source"], 1)
```

- [ ] **Step 2: 실패 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_trend_report_validation.SourceValidationTests -v`

Expected: 모듈이 없어 FAIL.

- [ ] **Step 3: 최소 검증 구현**

```python
from collections import Counter
from dataclasses import dataclass
from typing import Mapping, Sequence
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

AI_TERMS = ("ai", "llm", "model", "agent", "inference", "gpu", "benchmark", "openai", "anthropic", "gemini", "인공지능", "모델", "에이전트", "추론")


@dataclass(frozen=True)
class ValidationResult:
    valid: bool
    reasons: tuple[str, ...] = ()


def normalize_url(value: str) -> str:
    parts = urlsplit(value.strip())
    kept = [(k, v) for k, v in parse_qsl(parts.query) if not k.startswith("utm_")]
    return urlunsplit((parts.scheme.lower(), parts.netloc.lower(), parts.path.rstrip("/"), urlencode(kept), ""))


def validate_source(article: Mapping[str, object]) -> ValidationResult:
    title = str(article.get("title", "")).strip()
    summary = str(article.get("summary", "")).strip()
    link = str(article.get("link", "")).strip()
    parts = urlsplit(link)
    reasons = []
    if not title:
        reasons.append("missing_source_title")
    if parts.scheme not in {"http", "https"} or not parts.hostname:
        reasons.append("invalid_source_url")
    if not any(term in f"{title} {summary}".lower() for term in AI_TERMS):
        reasons.append("irrelevant_source")
    return ValidationResult(not reasons, tuple(reasons))
```

`deduplicate_sources`는 유효한 기사만 반환하고 정규화 URL 중복을 `duplicate_source`로 집계합니다.

- [ ] **Step 4: 전체 검증 테스트 통과 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_trend_report_validation -v`

Expected: 모든 source validation tests PASS.

- [ ] **Step 5: 커밋**

```bash
git add backend/scripts/trend_report_validation.py backend/tests/test_trend_report_validation.py
git commit -m "feat: validate news batch sources"
```

### Task 3: 생성 리포트 품질 및 중복 검증

**Files:**
- Modify: `backend/scripts/trend_report_validation.py`
- Modify: `backend/tests/test_trend_report_validation.py`

**Interfaces:**
- Produces: `validate_report(report: Mapping[str, object], sources: Sequence[Mapping[str, object]]) -> ValidationResult`
- Produces: `report_fingerprint(report, sources) -> tuple[str, str]`
- Produces: `is_duplicate_report(report, sources, seen_titles, seen_sources) -> bool`

- [ ] **Step 1: 필드·한국어·중복 테스트 작성**

```python
def valid_report():
    return {
        "title": "AI 에이전트 운영 비용 분석",
        "primary_topic": "AI 에이전트",
        "tldr": "새 모델은 추론 비용을 줄입니다. 기업 도입 시 품질 검증이 필요합니다.",
        "blog_body": "## 배경\n" + "AI 모델과 에이전트 운영 비용을 한국어로 상세히 분석합니다. " * 30,
        "tags": ["#AI", "#에이전트"],
    }


class ReportValidationTests(unittest.TestCase):
    def test_accepts_substantive_korean_report(self):
        result = validate_report(valid_report(), [{"title": "AI", "link": "https://example.com/ai", "summary": "model"}])
        self.assertTrue(result.valid, result.reasons)

    def test_rejects_missing_field_and_short_body(self):
        report = valid_report()
        del report["primary_topic"]
        report["blog_body"] = "짧음"
        result = validate_report(report, [{"title": "AI", "link": "https://example.com/ai", "summary": "model"}])
        self.assertIn("missing_primary_topic", result.reasons)
        self.assertIn("short_blog_body", result.reasons)

    def test_detects_normalized_duplicate(self):
        report = valid_report()
        seen_titles, seen_sources = set(), set()
        self.assertFalse(is_duplicate_report(report, [{"link": "https://example.com/ai"}], seen_titles, seen_sources))
        self.assertTrue(is_duplicate_report(report, [{"link": "https://example.com/ai"}], seen_titles, seen_sources))
```

- [ ] **Step 2: 실패 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_trend_report_validation.ReportValidationTests -v`

Expected: 새 함수가 없어 FAIL.

- [ ] **Step 3: 최소 리포트 검증 구현**

```python
import hashlib
import json
import re

REQUIRED_REPORT_FIELDS = ("title", "primary_topic", "tldr", "blog_body", "tags")


def validate_report(report, sources):
    reasons = []
    for field in REQUIRED_REPORT_FIELDS:
        if field not in report or not report[field]:
            reasons.append(f"missing_{field}")
    body = report.get("blog_body", "")
    if not isinstance(body, str) or len(body.strip()) < 600:
        reasons.append("short_blog_body")
    korean = len(re.findall(r"[가-힣]", body if isinstance(body, str) else ""))
    letters = len(re.findall(r"[A-Za-z가-힣]", body if isinstance(body, str) else ""))
    if letters == 0 or korean / letters < 0.25:
        reasons.append("insufficient_korean")
    tags = report.get("tags")
    if not isinstance(tags, list) or not tags or not all(isinstance(tag, str) and tag.strip() for tag in tags):
        reasons.append("invalid_tags")
    if not sources:
        reasons.append("missing_sources")
    return ValidationResult(not reasons, tuple(dict.fromkeys(reasons)))
```

지문은 정규화된 제목과 정렬된 출처 URL을 각각 SHA-256으로 계산하고, `is_duplicate_report`가 처음 본 지문은 집합에 등록합니다.

- [ ] **Step 4: 검증 테스트 전체 실행**

Run: `cd backend && venv/bin/python -m unittest tests.test_trend_report_validation -v`

Expected: source/report tests 모두 PASS.

- [ ] **Step 5: 커밋**

```bash
git add backend/scripts/trend_report_validation.py backend/tests/test_trend_report_validation.py
git commit -m "feat: gate generated trend report quality"
```

### Task 4: SQL 생성과 D1 쓰기 격리

**Files:**
- Modify: `backend/scripts/generate_trend_reports.py`
- Modify: `backend/tests/test_generate_trend_reports.py`

**Interfaces:**
- Produces: `build_insert_sql(report, cluster, report_id) -> str`
- Produces: `write_report(sql: str, runner=subprocess.run) -> bool`

- [ ] **Step 1: 작은따옴표와 스키마 필드 테스트 작성**

```python
class D1WriterTests(unittest.TestCase):
    def test_build_insert_sql_escapes_quotes(self):
        report = {
            "title": "모델의 '새 기능'",
            "tldr": "기업의 '선택'입니다.",
            "blog_body": "본문 " * 400,
            "tags": ["#AI"],
        }
        sql = build_insert_sql(report, [{"source": "OpenAI", "link": "https://example.com/a"}], "synth-test")
        self.assertIn("모델의 ''새 기능''", sql)
        self.assertNotIn("primary_topic", sql)
        self.assertNotIn("impact_score", sql)
```

- [ ] **Step 2: 실패 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_generate_trend_reports.D1WriterTests -v`

Expected: `build_insert_sql`이 없어 FAIL.

- [ ] **Step 3: SQL 생성과 실행 분리**

기존 `save_to_d1` 안의 SQL 조립을 `build_insert_sql`로 옮기고, subprocess 실행은 다음 인터페이스로 제한합니다.

```python
def write_report(sql, runner=subprocess.run):
    result = runner(
        ["npx", "wrangler", "d1", "execute", "llm-compass-db", "--remote", "--command", sql],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print("    [D1 Error] report write failed")
        return False
    return True
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_generate_trend_reports.D1WriterTests -v`

Expected: PASS이며 테스트 출력에 subprocess 실행 없음.

- [ ] **Step 5: 커밋**

```bash
git add backend/scripts/generate_trend_reports.py backend/tests/test_generate_trend_reports.py
git commit -m "refactor: isolate trend report D1 writer"
```

### Task 5: 부분 실패를 격리하는 배치 오케스트레이터

**Files:**
- Modify: `backend/scripts/generate_trend_reports.py`
- Modify: `backend/tests/test_generate_trend_reports.py`

**Interfaces:**
- Produces: `BatchSummary(collected, source_rejected, clusters, generated, report_rejected, saved, failed, reasons)`
- Produces: `run_batch(config, fetcher, generator, writer) -> BatchSummary`
- Produces: `main() -> int`

- [ ] **Step 1: 부분 실패와 저장 0건 테스트 작성**

```python
def valid_generated_report():
    return {
        "title": "AI 에이전트 비용 최적화",
        "primary_topic": "AI 에이전트",
        "tldr": "새 추론 모델은 운영 비용을 낮춥니다. 실제 도입 전 품질 측정이 필요합니다.",
        "blog_body": "## 분석\n" + "AI 모델과 에이전트 추론 비용을 한국어로 상세히 분석합니다. " * 40,
        "tags": ["#AI", "#에이전트"],
    }


def valid_articles_for_two_clusters():
    return [
        {"title": "AI agent model released", "link": "https://example.com/agent", "summary": "LLM agent inference", "source": "example.com"},
        {"title": "GPU benchmark for AI", "link": "https://example.org/gpu", "summary": "AI model GPU benchmark", "source": "example.org"},
    ]


class OrchestratorTests(unittest.TestCase):
    def test_continues_after_llm_failure_and_saves_next_report(self):
        calls = iter([RuntimeError("gateway failed"), valid_generated_report()])
        def generator(_prompt, _config):
            value = next(calls)
            if isinstance(value, Exception):
                raise value
            return value
        summary = run_batch(
            BatchConfig("https://gateway.test/v1", "test", "model"),
            fetcher=lambda _feed: valid_articles_for_two_clusters(),
            generator=generator,
            writer=lambda _sql: True,
        )
        self.assertEqual(summary.saved, 1)
        self.assertEqual(summary.failed, 1)

    def test_main_returns_nonzero_when_nothing_saved(self):
        summary = BatchSummary(saved=0, failed=1)
        self.assertEqual(exit_code_for(summary), 1)
```

- [ ] **Step 2: 실패 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_generate_trend_reports.OrchestratorTests -v`

Expected: 새 인터페이스가 없어 FAIL.

- [ ] **Step 3: 오케스트레이터 최소 구현**

`run_batch`는 설정 → 수집 → `deduplicate_sources` → 클러스터 → 생성 → `validate_report` → 중복 확인 → SQL 생성 → 쓰기 순서로 처리합니다. 각 실패를 `Counter`에 안정적인 사유 코드로 기록합니다. 예외 메시지 전체나 키는 출력하지 않습니다.

```python
@dataclass
class BatchSummary:
    collected: int = 0
    source_rejected: int = 0
    clusters: int = 0
    generated: int = 0
    report_rejected: int = 0
    saved: int = 0
    failed: int = 0
    reasons: Counter = field(default_factory=Counter)


def exit_code_for(summary):
    return 0 if summary.saved > 0 else 1
```

`if __name__ == "__main__": raise SystemExit(main())`으로 종료 상태를 전달합니다.

- [ ] **Step 4: 전체 Python 테스트 실행**

Run: `cd backend && venv/bin/python -m unittest discover -s tests -p 'test*.py' -v`

Expected: 기존 API 3개와 신규 배치 테스트 모두 PASS, 외부 네트워크·D1 호출 없음.

- [ ] **Step 5: 커밋**

```bash
git add backend/scripts/generate_trend_reports.py backend/tests/test_generate_trend_reports.py
git commit -m "feat: make news batch failures observable"
```

### Task 6: Worker 생성 경로와 중복 스크립트 제거

**Files:**
- Modify: `src/worker.ts:4-10,219-353`
- Delete: `scripts/generate_trend_reports.py`
- Create: `backend/tests/test_news_pipeline_ownership.py`

**Interfaces:**
- Consumes: canonical path `backend/scripts/generate_trend_reports.py`
- Produces: Worker에 뉴스 생성 POST 경로가 없는 단일 소유 구조

- [ ] **Step 1: 단일 소유 구조 테스트 작성**

```python
class PipelineOwnershipTests(unittest.TestCase):
    def test_only_backend_batch_contains_news_generation_entrypoint(self):
        root = Path(__file__).parents[2]
        worker = (root / "src/worker.ts").read_text()
        self.assertNotIn("/api/v1/news/pulse/batch", worker)
        self.assertFalse((root / "scripts/generate_trend_reports.py").exists())
        self.assertTrue((root / "backend/scripts/generate_trend_reports.py").exists())
```

- [ ] **Step 2: 현재 중복 구조에서 실패 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_news_pipeline_ownership -v`

Expected: Worker 경로와 루트 중복 파일 때문에 FAIL.

- [ ] **Step 3: Worker 배치 블록과 루트 중복 파일 제거**

`src/worker.ts`에서 `/api/v1/news/pulse/batch` 조건문 전체를 제거합니다. 해당 블록에서만 쓰는 `OPENAI_API_KEY`, `GEMINI_API_KEY`, `LITELLM_API_KEY`, `LITELLM_URL` Env 필드도 다른 Worker 기능의 참조 여부를 `rg`로 확인한 후 사용되지 않는 항목만 제거합니다. 루트 중복 파일은 tracked backend 파일과 내용이 동일함을 `diff -u`로 확인하고 제거합니다.

- [ ] **Step 4: 소유 구조와 프론트엔드 빌드 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_news_pipeline_ownership -v`

Expected: PASS.

Run: `cd frontend && npm run build`

Expected: exit 0.

- [ ] **Step 5: 커밋**

```bash
git add src/worker.ts backend/tests/test_news_pipeline_ownership.py
git add -u scripts/generate_trend_reports.py
git commit -m "refactor: keep news generation in Python batch"
```

### Task 7: Workflow 품질 게이트와 전체 검증

**Files:**
- Modify: `.github/workflows/news_batch.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: Python unittest suite and `LITELLM_API_KEY`
- Produces: 테스트 성공 후에만 실행되는 예약·수동 배치

- [ ] **Step 1: Workflow 계약 테스트 추가**

`backend/tests/test_news_pipeline_ownership.py`에 다음 검증을 추가합니다.

```python
def test_workflow_runs_tests_and_passes_secret(self):
    root = Path(__file__).parents[2]
    workflow = (root / ".github/workflows/news_batch.yml").read_text()
    self.assertIn("python -m unittest discover", workflow)
    self.assertIn("LITELLM_API_KEY: ${{ secrets.LITELLM_API_KEY }}", workflow)
    self.assertLess(workflow.index("python -m unittest discover"), workflow.index("generate_trend_reports.py"))
```

- [ ] **Step 2: 실패 확인**

Run: `cd backend && venv/bin/python -m unittest tests.test_news_pipeline_ownership -v`

Expected: Workflow에 테스트 단계가 없어 FAIL.

- [ ] **Step 3: 테스트 단계를 배치 앞에 추가하고 README 갱신**

```yaml
- name: 🧪 4. 뉴스 파이프라인 단위 테스트
  run: python -m unittest discover -s backend/tests -p 'test*.py' -v

- name: 🗞️ 5. 종합 트렌드 리포트 생성 및 D1 적재
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    LITELLM_API_KEY: ${{ secrets.LITELLM_API_KEY }}
  run: |
    npm install -g wrangler
    python3 backend/scripts/generate_trend_reports.py
```

README에는 운영 뉴스 생성 경로, 필요한 Secret 이름, 로컬 테스트 명령, 운영 D1을 변경하지 않는 테스트 원칙을 기록합니다.

- [ ] **Step 4: 최종 검증**

Run: `cd backend && venv/bin/python -m unittest discover -s tests -p 'test*.py' -v`

Expected: 모든 테스트 PASS.

Run: `cd frontend && npm run lint && npm run build`

Expected: lint 오류 0개, build exit 0. 기존 경고는 별도 UI 계획에서 처리합니다.

Run: `git diff --check`

Expected: 출력 없음.

Run: `git grep -nE 'sk-[A-Za-z0-9_-]{16,}' -- ':!docs/superpowers/*'`

Expected: 출력 없음.

- [ ] **Step 5: 커밋**

```bash
git add .github/workflows/news_batch.yml README.md backend/tests/test_news_pipeline_ownership.py
git commit -m "ci: gate scheduled news batch on tests"
```

## 외부 운영 체크리스트

- [ ] 노출된 기존 LLM 키를 제공자 콘솔에서 폐기합니다.
- [ ] 새 키를 GitHub Actions Secret `LITELLM_API_KEY`로 등록합니다.
- [ ] 로컬 검증 완료 후 사용자가 승인한 경우에만 `workflow_dispatch`를 실행합니다.
- [ ] 첫 운영 실행에서 저장·제외·실패 건수와 사유 코드를 검토합니다.
- [ ] Git 이력 정리가 필요하면 별도의 파괴적 작업으로 승인받습니다.
