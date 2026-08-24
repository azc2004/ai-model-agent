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
        self.assertEqual(config.litellm_url, "https://ai-gateway.azclab.com/v1")


if __name__ == "__main__":
    unittest.main()
