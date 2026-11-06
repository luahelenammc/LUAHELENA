"""Regression gates for the public, zero-quota Civilizational Field Notes series."""
from __future__ import annotations

import sys
import unittest
from pathlib import Path

BEACON = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BEACON / "tools"))
import build_discovery as b  # noqa: E402


def fixture(
    ident: str = "FIELDNOTE-002",
    *,
    status: str = "active",
    family: str = "FIELDNOTE",
    series: str | None = "civilizational_field_notes",
    title: str = "A testable disagreement",
    abstract: str = "What changed and what might falsify it.",
    date: str = "2026-11-06",
) -> dict:
    return {
        "id": ident,
        "title": title,
        "abstract": abstract,
        "status": status,
        "family": family,
        "series": series,
        "published_at": date,
        "updated_at": date,
        "html_url": f"https://www.luahelena.com.br/beacon/docs/{ident}.html",
        "markdown_url": f"https://www.luahelena.com.br/beacon/docs/{ident}.md",
        "plain_text_url": f"https://www.luahelena.com.br/beacon/docs/{ident}.md.txt",
    }


def manifest(*documents: dict) -> dict:
    return {"corpus_revision": 7, "updated_at": "2026-10-05T00:00:00Z", "documents": list(documents)}


class FieldNotesTests(unittest.TestCase):
    def test_zero_publications_is_valid(self) -> None:
        page, md = b.render_fieldnotes(manifest())
        self.assertIn("No Field Notes have cleared publication review yet.", page)
        self.assertIn("No Field Notes have cleared publication review yet.", md)
        self.assertIn('lang="en"', page)
        self.assertIn('href="#main"', page)
        self.assertIn('rel="canonical"', page)
        self.assertIn('href="../feed.atom"', page)
        self.assertIn('href="../manifest.json"', page)

    def test_existing_fieldnote_is_not_auto_enrolled(self) -> None:
        docs = manifest(fixture("FIELDNOTE-001", series=None))
        self.assertEqual(b.civilizational_notes(docs), [])

    def test_only_active_explicitly_qualified_notes_appear(self) -> None:
        docs = manifest(
            fixture("FIELDNOTE-002"),
            fixture("FIELDNOTE-003", status="draft"),
            fixture("OBSERVATION-001", family="OBSERVATION"),
            fixture("POSITION-050", family="POSITION"),
            fixture("FIELDNOTE-001", series=None),
        )
        page, md = b.render_fieldnotes(docs)
        self.assertIn("FIELDNOTE-002", page)
        self.assertIn("OBSERVATION-001", page)
        self.assertNotIn("FIELDNOTE-003", page)
        self.assertNotIn("POSITION-050", page)
        self.assertNotIn("FIELDNOTE-001", page)
        self.assertIn("FIELDNOTE-002", md)

    def test_escaping_of_untrusted_manifest_text(self) -> None:
        doc = fixture(title='<img src=x onerror=alert(1)>', abstract='<script>bad()</script>')
        page, _ = b.render_fieldnotes(manifest(doc))
        self.assertNotIn('<img src=x', page)
        self.assertNotIn("<script>bad()", page)
        self.assertIn("&lt;img", page)
        self.assertIn("&lt;script&gt;", page)

    def test_public_notes_sorted_most_recent_first(self) -> None:
        docs = manifest(
            fixture("FIELDNOTE-002", date="2026-11-06"),
            fixture("FIELDNOTE-003", date="2026-11-09"),
        )
        page, _ = b.render_fieldnotes(docs)
        self.assertLess(page.index("FIELDNOTE-003"), page.index("FIELDNOTE-002"))

    def test_fieldnotes_sitemap_date_is_not_prelaunch(self) -> None:
        xml = b.render_beacon_sitemap(manifest())
        self.assertIn("<loc>https://www.luahelena.com.br/beacon/fieldnotes/</loc><lastmod>2026-11-06</lastmod>", xml)
        later = b.render_beacon_sitemap(manifest(fixture(date="2026-11-09")))
        self.assertIn("<loc>https://www.luahelena.com.br/beacon/fieldnotes/</loc><lastmod>2026-11-09</lastmod>", later)

    def test_generated_public_page_matches_committed_output(self) -> None:
        doc = b.load_manifest()
        self.assertEqual(
            b.render_fieldnotes(doc)[0],
            (BEACON / "fieldnotes" / "index.html").read_text(encoding="utf-8"),
        )
        self.assertEqual(
            b.render_fieldnotes(doc)[1],
            (BEACON / "fieldnotes" / "index.md").read_text(encoding="utf-8"),
        )
        active = b.civilizational_notes(doc)
        expected = {
            d["id"] for d in doc["documents"]
            if d.get("series") == "civilizational_field_notes"
            and d.get("family") in {"FIELDNOTE", "OBSERVATION"}
            and d.get("status") == "active"
        }
        self.assertEqual({d["id"] for d in active}, expected)
        self.assertGreaterEqual(len(active), 16)
        self.assertTrue({
            f"FIELDNOTE-{n:03d}" for n in range(2, 18)
        }.issubset(expected))
        html_page = b.render_fieldnotes(doc)[0]
        self.assertIn('id="fn-tools"', html_page)
        self.assertIn('id="fn-search"', html_page)
        self.assertIn('id="fn-results"', html_page)
        self.assertIn('fieldnotes.js', html_page)
        self.assertIn(f'{len(active)} published interpretive notes', html_page)
        self.assertTrue((BEACON / "assets" / "fieldnotes.js").is_file())
        for note in active:
            self.assertTrue(note.get("source_episode"))
            self.assertEqual(note["status"], "active")


if __name__ == "__main__":
    unittest.main()
