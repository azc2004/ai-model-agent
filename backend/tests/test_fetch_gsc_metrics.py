import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from fetch_gsc_metrics import build_sql, load_credentials, run


class LoadCredentialsTest(unittest.TestCase):
    def test_missing_secret_is_a_clear_error(self):
        with self.assertRaises(RuntimeError) as ctx:
            load_credentials({})
        self.assertIn("GSC_SERVICE_ACCOUNT", str(ctx.exception))

    def test_incomplete_json_names_the_missing_field(self):
        with self.assertRaises(RuntimeError) as ctx:
            load_credentials({"GSC_SERVICE_ACCOUNT": '{"client_email": "a@b.com"}'})
        self.assertIn("private_key", str(ctx.exception))


class BuildSqlTest(unittest.TestCase):
    def test_row_becomes_upsert(self):
        rows = [{"keys": ["2026-09-05", "llm 비교"], "clicks": 3,
                 "impressions": 40, "ctr": 0.075, "position": 12.4}]
        sql = build_sql("query", rows)[0]
        self.assertIn("INSERT OR REPLACE INTO gsc_metrics", sql)
        self.assertIn("'2026-09-05'", sql)
        self.assertIn("'llm 비교'", sql)
        self.assertIn("3, 40", sql)

    def test_quotes_are_escaped(self):
        rows = [{"keys": ["2026-09-05", "it's a test"], "clicks": 0,
                 "impressions": 1, "ctr": 0, "position": 1}]
        self.assertIn("'it''s a test'", build_sql("query", rows)[0])

    def test_row_without_both_keys_is_skipped(self):
        self.assertEqual(build_sql("query", [{"keys": ["2026-09-05"]}]), [])

    def test_empty_result_is_not_an_error(self):
        self.assertEqual(build_sql("query", []), [])


class RunTest(unittest.TestCase):
    def _run(self, querier):
        return run(
            credentials_loader=lambda: {"client_email": "x", "private_key": "y"},
            token_getter=lambda info: "token",
            querier=querier,
        )

    def test_collects_every_dimension(self):
        seen = []

        def querier(token, dim, start, end):
            seen.append(dim)
            return [{"keys": [end, f"{dim}-value"], "clicks": 1,
                     "impressions": 2, "ctr": 0.5, "position": 3}]

        statements, summary = self._run(querier)
        self.assertEqual(seen, ["query", "page", "country", "device"])
        self.assertEqual(len(statements), 4)
        self.assertEqual(set(summary.values()), {1})

    def test_one_dimension_failing_does_not_lose_the_others(self):
        def querier(token, dim, start, end):
            if dim == "page":
                raise RuntimeError("api down")
            return [{"keys": [end, "v"], "clicks": 0, "impressions": 0, "ctr": 0, "position": 0}]

        statements, summary = self._run(querier)
        self.assertEqual(summary["page"], 0)
        self.assertEqual(len(statements), 3)


if __name__ == "__main__":
    unittest.main()
