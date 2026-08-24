import io
import sys
import unittest
from contextlib import redirect_stdout
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parents[1] / "scripts"))

from generate_trend_reports import build_insert_sql, load_config, write_report


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


if __name__ == "__main__":
    unittest.main()
