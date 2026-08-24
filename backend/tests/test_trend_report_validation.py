import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parents[1] / "scripts"))

from trend_report_validation import (
    deduplicate_sources,
    is_duplicate_report,
    validate_report,
    validate_source,
)


def valid_report():
    return {
        "title": "AI 에이전트 운영 비용 분석",
        "primary_topic": "AI 에이전트",
        "tldr": "새 모델은 추론 비용을 줄입니다. 기업 도입 시 품질 검증이 필요합니다.",
        "blog_body": "## 배경\n" + "AI 모델과 에이전트 운영 비용을 한국어로 상세히 분석합니다. " * 30,
        "tags": ["#AI", "#에이전트"],
    }


VALID_SOURCES = [
    {
        "title": "AI agent update",
        "link": "https://example.com/ai",
        "summary": "New model inference",
    }
]


class SourceValidationTests(unittest.TestCase):
    def test_rejects_non_http_url(self):
        result = validate_source(
            {
                "title": "LLM release",
                "link": "javascript:alert(1)",
                "summary": "AI model",
            }
        )

        self.assertFalse(result.valid)
        self.assertIn("invalid_source_url", result.reasons)

    def test_rejects_irrelevant_article(self):
        result = validate_source(
            {
                "title": "등산로 개방",
                "link": "https://example.com/hike",
                "summary": "주말 산행 안내",
            }
        )

        self.assertFalse(result.valid)
        self.assertIn("irrelevant_source", result.reasons)

    def test_deduplicates_normalized_urls(self):
        articles = [
            {
                "title": "AI model",
                "link": "https://example.com/a?utm_source=x",
                "summary": "LLM",
            },
            {
                "title": "AI model update",
                "link": "https://example.com/a/",
                "summary": "inference",
            },
        ]

        accepted, reasons = deduplicate_sources(articles)

        self.assertEqual(len(accepted), 1)
        self.assertEqual(reasons["duplicate_source"], 1)

    def test_keeps_distinct_valid_sources(self):
        articles = [
            {
                "title": "OpenAI model update",
                "link": "https://example.com/a",
                "summary": "New inference model",
            },
            {
                "title": "GPU benchmark",
                "link": "https://example.org/gpu",
                "summary": "AI model benchmark",
            },
        ]

        accepted, reasons = deduplicate_sources(articles)

        self.assertEqual(len(accepted), 2)
        self.assertEqual(reasons, {})


class ReportValidationTests(unittest.TestCase):
    def test_accepts_substantive_korean_report(self):
        result = validate_report(valid_report(), VALID_SOURCES)

        self.assertTrue(result.valid, result.reasons)

    def test_rejects_missing_field_and_short_body(self):
        report = valid_report()
        del report["primary_topic"]
        report["blog_body"] = "짧음"

        result = validate_report(report, VALID_SOURCES)

        self.assertIn("missing_primary_topic", result.reasons)
        self.assertIn("short_blog_body", result.reasons)

    def test_rejects_non_korean_body_and_invalid_tags(self):
        report = valid_report()
        report["blog_body"] = "Artificial intelligence model analysis. " * 40
        report["tags"] = "#AI"

        result = validate_report(report, VALID_SOURCES)

        self.assertIn("insufficient_korean", result.reasons)
        self.assertIn("invalid_tags", result.reasons)

    def test_detects_normalized_duplicate(self):
        report = valid_report()
        seen_titles: set[str] = set()
        seen_sources: set[str] = set()

        first = is_duplicate_report(
            report,
            VALID_SOURCES,
            seen_titles,
            seen_sources,
        )
        second = is_duplicate_report(
            {**report, "title": " AI  에이전트 운영 비용 분석 "},
            [{**VALID_SOURCES[0], "link": "https://example.com/ai?utm_source=x"}],
            seen_titles,
            seen_sources,
        )

        self.assertFalse(first)
        self.assertTrue(second)


if __name__ == "__main__":
    unittest.main()
