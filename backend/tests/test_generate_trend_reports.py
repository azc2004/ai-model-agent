import io
import sys
import unittest
from contextlib import redirect_stdout
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parents[1] / "scripts"))

from generate_trend_reports import build_insert_sql, load_config, write_report
from generate_trend_reports import (
    BatchConfig,
    BatchSummary,
    exit_code_for,
    run_batch,
)


class ConfigTests(unittest.TestCase):
    def test_missing_litellm_key_fails_before_work_starts(self):
        with self.assertRaisesRegex(RuntimeError, "LITELLM_API_KEY"):
            load_config({})

    def test_environment_builds_config(self):
        config = load_config({"LITELLM_API_KEY": "test-key"})

        self.assertEqual(config.litellm_key, "test-key")
        self.assertEqual(config.model, "personal-main")
        self.assertEqual(config.litellm_url, "https://ai-gateway.azclab.com/v1")


class D1WriterTests(unittest.TestCase):
    def test_build_insert_sql_escapes_quotes_and_uses_persisted_fields(self):
        report = {
            "title": "모델의 '새 기능'",
            "primary_topic": "추론",
            "tldr": "기업의 '선택'입니다.",
            "blog_body": "한국어 AI 분석 본문 " * 100,
            "tags": ["#AI"],
            "impact_score": 92,
        }

        sql = build_insert_sql(
            report,
            [
                {
                    "source": "OpenAI",
                    "link": "https://example.com/a",
                }
            ],
            "synth-test",
        )

        self.assertIn("모델의 ''새 기능''", sql)
        self.assertIn("기업의 ''선택''입니다", sql)
        self.assertNotIn("primary_topic", sql)
        self.assertNotIn("impact_score", sql)

    def test_write_report_returns_false_without_leaking_stderr(self):
        class Result:
            returncode = 1
            stderr = "Authorization: Bearer secret-value"

        calls = []

        def runner(args, **kwargs):
            calls.append((args, kwargs))
            return Result()

        output = io.StringIO()
        with redirect_stdout(output):
            result = write_report("INSERT INTO trend_news VALUES ('x')", runner)

        self.assertFalse(result)
        self.assertNotIn("secret-value", output.getvalue())
        self.assertIn("report write failed", output.getvalue())
        self.assertEqual(calls[0][0][0:4], ["npx", "wrangler", "d1", "execute"])


def valid_generated_report():
    return {
        "title": "AI 에이전트 비용 최적화",
        "primary_topic": "AI 에이전트",
        "tldr": "새 추론 모델은 운영 비용을 낮춥니다. 실제 도입 전 품질 측정이 필요합니다.",
        "blog_body": "## 분석\n" + "AI 모델과 에이전트 추론 비용을 한국어로 상세히 분석합니다. " * 40,
        "tags": ["#AI", "#에이전트"],
    }


class OrchestratorTests(unittest.TestCase):
    def test_continues_after_llm_failure_and_saves_next_report(self):
        articles_by_feed = {
            "agent-feed": [
                {
                    "title": "AI agent model released",
                    "link": "https://example.com/agent",
                    "summary": "LLM agent inference",
                    "source": "example.com",
                }
            ],
            "research-feed": [
                {
                    "title": "GPU benchmark for AI",
                    "link": "https://example.org/gpu",
                    "summary": "AI model benchmark",
                    "source": "example.org",
                }
            ],
        }
        generated = iter([RuntimeError("gateway failed"), valid_generated_report()])
        written_sql = []

        def generator(_prompt, _config):
            value = next(generated)
            if isinstance(value, Exception):
                raise value
            return value

        summary = run_batch(
            BatchConfig("https://gateway.test/v1", "test", "model"),
            fetcher=lambda feed: articles_by_feed[feed],
            generator=generator,
            writer=lambda sql: written_sql.append(sql) is None,
            feeds=("agent-feed", "research-feed"),
        )

        self.assertEqual(summary.saved, 1)
        self.assertEqual(summary.failed, 1)
        self.assertEqual(summary.reasons["llm_failure"], 1)
        self.assertEqual(len(written_sql), 1)

    def test_rejects_invalid_sources_before_generation(self):
        generator_calls = []

        summary = run_batch(
            BatchConfig("https://gateway.test/v1", "test", "model"),
            fetcher=lambda _feed: [
                {
                    "title": "등산로 개방",
                    "link": "https://example.com/hike",
                    "summary": "주말 산행 안내",
                    "source": "example.com",
                }
            ],
            generator=lambda prompt, config: generator_calls.append((prompt, config)),
            writer=lambda _sql: True,
            feeds=("one-feed",),
        )

        self.assertEqual(summary.saved, 0)
        self.assertEqual(summary.source_rejected, 1)
        self.assertEqual(summary.reasons["irrelevant_source"], 1)
        self.assertEqual(generator_calls, [])

    def test_exit_code_is_nonzero_when_nothing_saved(self):
        self.assertEqual(exit_code_for(BatchSummary(saved=0, failed=1)), 1)
        self.assertEqual(exit_code_for(BatchSummary(saved=1, failed=3)), 0)


if __name__ == "__main__":
    unittest.main()
