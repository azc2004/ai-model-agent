import json
import sys
import unittest
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from regenerate_articles import build_update_sql, fetch_targets, rebuild_cluster, regenerate


class FetchTargetsTest(unittest.TestCase):
    def test_parses_wrangler_json(self):
        payload = json.dumps([{"results": [{"id": "a", "title": "t", "original_sources": "[]"}]}])
        rows = fetch_targets("2026-09-04", "2026-09-06",
                             runner=lambda *a, **k: SimpleNamespace(stdout=f"noise {payload}"))
        self.assertEqual([r["id"] for r in rows], ["a"])


class RebuildClusterTest(unittest.TestCase):
    def test_drops_sources_whose_body_cannot_be_read(self):
        art = {"original_sources": json.dumps([
            {"title": "ok.com", "url": "https://ok.com/1"},
            {"title": "dead.com", "url": "https://dead.com/2"},
        ])}
        cluster = rebuild_cluster(art, fetcher=lambda u: "본문" if "ok.com" in u else "")
        self.assertEqual([c["link"] for c in cluster], ["https://ok.com/1"])

    def test_source_without_url_is_ignored(self):
        art = {"original_sources": json.dumps([{"title": "no url"}])}
        self.assertEqual(rebuild_cluster(art, fetcher=lambda u: "본문"), [])


class BuildUpdateSqlTest(unittest.TestCase):
    def _sql(self, report, cluster):
        return build_update_sql("id-1", report, cluster)

    def setUp(self):
        self.cluster = [{"source": "a.com", "link": "https://a.com/1"},
                        {"source": "b.com", "link": "https://b.com/2"}]
        self.report = {"title": "제목", "tldr": "요약", "blog_body": "본문",
                       "our_take": "의견", "open_questions": ["질문"],
                       "key_numbers": [{"label": "지표", "value": "10", "source_url": "https://a.com/1"}]}

    def test_preserves_identity_columns(self):
        sql = self._sql(self.report, self.cluster)
        set_clause = sql.split(" WHERE ")[0]
        for col in ("id =", "created_at", "image_url"):
            self.assertNotIn(col, set_clause)   # SET 절에 없어야 한다
        self.assertIn("WHERE id = 'id-1'", sql)

    def test_drops_numbers_whose_source_is_not_in_the_cluster(self):
        report = dict(self.report, key_numbers=[
            {"label": "정상", "value": "1", "source_url": "https://a.com/1"},
            {"label": "남의출처", "value": "2", "source_url": "https://other.com/9"},
            {"label": "출처없음", "value": "3", "source_url": ""},
        ])
        sql = self._sql(report, self.cluster)
        self.assertIn("정상", sql)
        self.assertNotIn("남의출처", sql)
        self.assertNotIn("출처없음", sql)

    def test_label_matches_surviving_cluster_size(self):
        self.assertIn("종합 트렌드 리포트", self._sql(self.report, self.cluster))
        self.assertIn("심층 리포트", self._sql(self.report, self.cluster[:1]))

    def test_quotes_are_escaped(self):
        sql = self._sql(dict(self.report, title="it's"), self.cluster)
        self.assertIn("'it''s'", sql)


FAKE_SOURCE = {"title": "원문 제목", "summary": "", "source": "s.com",
               "link": "https://s.com/1", "body": "원문 본문"}


class RegenerateTest(unittest.TestCase):
    ARTICLE = {"id": "a1", "title": "t", "original_sources": "[]"}
    FULL = {"title": "제목", "tldr": "요약", "blog_body": "본문", "our_take": "의견",
            "open_questions": ["q"], "developer_tip": "d", "pm_tip": "p",
            "business_tip": "b", "impact_score": 80, "primary_topic": "주제",
            "tags": ["#t"], "key_numbers": []}

    def test_article_with_no_readable_source_is_left_alone(self):
        sql, skipped, failed = regenerate([self.ARTICLE], None, (),
                                          generator=lambda *a: self.FULL,
                                          cluster_builder=lambda art: [])
        self.assertEqual((sql, skipped, failed), ([], ["a1"], []))

    def test_llm_failure_leaves_the_original(self):
        def boom(*a):
            raise RuntimeError("gateway")
        sql, skipped, failed = regenerate([self.ARTICLE], None, (), generator=boom,
                                          cluster_builder=lambda art: [FAKE_SOURCE])
        self.assertEqual((sql, skipped, failed), ([], [], ["a1"]))

    def test_successful_article_produces_one_update(self):
        sql, skipped, failed = regenerate([self.ARTICLE], None, (),
                                          generator=lambda *a: self.FULL,
                                          cluster_builder=lambda art: [FAKE_SOURCE])
        self.assertEqual(len(sql), 1)
        self.assertIn("WHERE id = 'a1'", sql[0])
        self.assertEqual((skipped, failed), ([], []))


if __name__ == "__main__":
    unittest.main()
