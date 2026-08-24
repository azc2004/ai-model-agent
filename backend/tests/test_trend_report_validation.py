import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parents[1] / "scripts"))

from trend_report_validation import deduplicate_sources, validate_source


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


if __name__ == "__main__":
    unittest.main()
