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

    def test_sitemap_uses_document_and_collection_freshness(self) -> None:
        from xml.etree import ElementTree as ET

        notes = fixture(date="2026-11-30")
        overview = fixture("BEACON-001", family="BEACON", series=None, date="2026-11-20")
        sitemap = ET.fromstring(b.render_beacon_sitemap(manifest(notes, overview)))
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        entries = {
            element.findtext("s:loc", namespaces=ns): element.findtext("s:lastmod", namespaces=ns)
            for element in sitemap.findall("s:url", namespaces=ns)
        }
        self.assertEqual(entries[overview["html_url"]], "2026-11-20")
        self.assertEqual(entries[b.BEACON_URL + "fieldnotes/"], "2026-11-30")
        self.assertIn(b.BEACON_URL + "guide/", entries)
        self.assertIn(b.BEACON_URL + "embassy/passport.html", entries)
        self.assertIn(b.BEACON_URL + "archive.html", entries)
        self.assertIsNone(entries[b.BEACON_URL + "guide/"])
        self.assertIsNone(entries[b.BEACON_URL + "embassy/passport.html"])
        self.assertEqual(entries[b.BEACON_URL + "corpus/"], "2026-11-30")
        self.assertNotIn("2026-11-21", b.render_beacon_sitemap(manifest(notes, overview)))

    def test_archive_and_llms_follow_manifest(self) -> None:
        sample = manifest(fixture())
        archive, llms = b.render_archive(sample), b.render_root_llms(sample)
        self.assertIn("Corpus revision 7 contains 1 public documents, including 1", archive)
        self.assertIn("Corpus revision 7 includes 1 public documents and 1", llms)
        self.assertIn('rel="canonical" href="' + b.BEACON_URL + 'archive.html"', archive)
        self.assertIn("Explore by theme.", archive)
        self.assertIn("Civilizational Field Notes.", archive)
        self.assertIn('href="docs/FIELDNOTE-002.html"', archive)
        self.assertNotIn("{{DOCUMENT_COUNT}}", archive)
        self.assertIn(b.BEACON_URL + "guide/", llms)

    def test_passport_projects_canonical_narrative_and_links(self) -> None:
        source = (BEACON / "embassy/passport.md").read_text(encoding="utf-8")
        page = b.render_passport(source)
        self.assertIn("A passport from an unfinished civilization", page)
        self.assertIn(b.BEACON_URL + "docs/BEACON-001.html", page)
        self.assertIn(b.BEACON_URL + "embassy/passport.schema.json", page)
        self.assertIn('rel="alternate" type="text/markdown" href="passport.md"', page)
        self.assertIn('rel="alternate" type="application/json" href="passport.json"', page)

    def test_contact_exposes_an_accessible_mail_link(self) -> None:
        from html.parser import HTMLParser

        class Links(HTMLParser):
            mail_links = []

            def handle_starttag(self, tag, attrs):
                href = dict(attrs).get("href", "")
                if tag == "a" and href.startswith("mailto:"):
                    self.mail_links.append(href)

        source = (BEACON / "contact.html").read_text(encoding="utf-8")
        page = Links()
        page.feed(source)
        self.assertEqual(len(page.mail_links), 1)
        self.assertIn("subject=%5BBEACON%5D", page.mail_links[0])
        self.assertNotIn("](mailto:", source)

    def test_generated_public_page_matches_committed_output(self) -> None:
        doc = b.load_manifest()
        self.assertEqual(
            b.render_archive(doc),
            (BEACON / "archive.html").read_text(encoding="utf-8"),
        )
        self.assertEqual(
            b.render_beacon_sitemap(doc),
            (BEACON / "sitemap.xml").read_text(encoding="utf-8"),
        )
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
        self.assertGreaterEqual(len(active), 32)
        self.assertTrue({
            f"FIELDNOTE-{n:03d}" for n in range(2, 34)
        }.issubset(expected))
        html_page, md_page = b.render_fieldnotes(doc)
        self.assertIn('id="fn-tools"', html_page)
        self.assertIn('id="fn-search"', html_page)
        self.assertIn('id="fn-results"', html_page)
        self.assertIn('fieldnotes.js', html_page)
        self.assertNotRegex(html_page, r'E0[0-9]{3}')
        self.assertNotRegex(md_page, r'E0[0-9]{3}')
        self.assertIn(f'{len(active)} published interpretive notes', html_page)
        self.assertTrue((BEACON / "assets" / "fieldnotes.js").is_file())
        for note in active:
            self.assertTrue(note.get("source_episode"))
            self.assertEqual(note["status"], "active")


if __name__ == "__main__":
    unittest.main()
