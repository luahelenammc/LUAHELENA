#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
BEACON = ROOT / "beacon"
MANIFEST_PATH = BEACON / "manifest.json"
CATALOG_PATH = BEACON / "catalog.json"

DOC_ID_RE = re.compile(r"^[A-Z_]+-[0-9]{3}$")
CANONICAL_MD_RE = re.compile(r"^(?:docs|Moon)/[A-Z_]+-[0-9]{3}\.md$")


def load_manifest() -> dict:
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def rel_from_url(url: str) -> Path:
    path = urlparse(url).path
    prefix = "/beacon/"
    if not path.startswith(prefix):
        raise ValueError(f"URL outside /beacon/: {url}")
    return Path(path[len(prefix):])


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def strip_id(title: str) -> str:
    return re.sub(r"^[A-Z_]+-[0-9]{3}\s+—\s+", "", title)


def inline_md(value: str) -> str:
    value = esc(value)
    value = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2" rel="noopener noreferrer">\1</a>', value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", value)
    return value


def markdown_body(markdown: str) -> str:
    body = re.sub(r"\A---\n.*?\n---\n*", "", markdown, count=1, flags=re.S)
    out: list[str] = []
    in_list = False
    for raw in body.splitlines():
        line = raw.rstrip()
        if not line:
            if in_list:
                out.append("</ul>")
                in_list = False
            continue
        if line.startswith("### "):
            if in_list:
                out.append("</ul>")
                in_list = False
            text = line[4:]
            slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
            out.append(f'<h3 id="{esc(slug)}">{inline_md(text)}</h3>')
        elif line.startswith("## "):
            if in_list:
                out.append("</ul>")
                in_list = False
            text = line[3:]
            slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
            out.append(f'<h2 id="{esc(slug)}">{inline_md(text)}</h2>')
        elif line.startswith("# "):
            if in_list:
                out.append("</ul>")
                in_list = False
            out.append(f"<h1>{inline_md(line[2:])}</h1>")
        elif line.startswith("- "):
            if not in_list:
                out.append("<ul>")
                in_list = True
            out.append(f"<li>{inline_md(line[2:])}</li>")
        else:
            if in_list:
                out.append("</ul>")
                in_list = False
            out.append(f"<p>{inline_md(line)}</p>")
    if in_list:
        out.append("</ul>")
    return "".join(out)


def render_leaf_html(doc: dict, markdown: str) -> str:
    md_name = rel_from_url(doc["markdown_url"]).name
    txt_name = rel_from_url(doc["plain_text_url"]).name
    is_moon = doc["family"] == "MOON"
    collection_label = "Moon" if is_moon else "docs"
    body = markdown_body(markdown)
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<meta name="robots" content="index,follow">'
        '<meta name="author" content="Lua Helena Moon Martins Cardoso">'
        f'<title>{esc(doc["title"])} · Lunar Citadel Beacon</title>'
        f'<meta name="description" content="{esc(doc["abstract"])}">'
        f'<link rel="canonical" href="{esc(doc["html_url"])}">'
        f'<link rel="alternate" type="text/markdown" href="{esc(md_name)}">'
        f'<link rel="alternate" type="text/plain" href="{esc(txt_name)}">'
        '<link rel="describedby" href="llms.txt">'
        '<link rel="describedby" href="../manifest.json" type="application/json">'
        '<link rel="index" href="index.html"><link rel="up" href="../">'
        '<link rel="stylesheet" href="../assets/beacon.css"></head><body>'
        '<div class="site-shell"><header class="repo-header">'
        '<a class="brand" href="../">lunar-citadel / beacon</a><nav>'
        '<a href="index.html">collection</a><a href="../corpus/">corpus</a>'
        '<a href="../manifest.json">manifest</a><a href="llms.txt">llms.txt</a>'
        '</nav></header>'
        f'<div class="breadcrumb"><a href="../">beacon</a> / <a href="index.html">{esc(collection_label)}</a> / {esc(doc["id"])}</div>'
        '<div class="layout"><article>'
        f'<div class="eyebrow">{esc(doc["family"])} · revision {doc["revision"]} · {esc(doc["status"])}</div>'
        '<div class="meta-grid">'
        f'<div><span class="meta-label">voice</span><span class="meta-value">{esc(doc.get("voice", ""))}</span></div>'
        f'<div><span class="meta-label">epistemic status</span><span class="meta-value">{esc(doc["epistemic_status"])}</span></div>'
        f'<div><span class="meta-label">authority</span><span class="meta-value">{esc(doc.get("authority_label", "Moon ratification"))}</span></div>'
        f'</div>{body}'
        '<div class="doc-footer">'
        '<a href="index.html">collection index</a> · '
        f'<a href="{esc(md_name)}">canonical Markdown</a> · '
        f'<a href="{esc(txt_name)}">plain text</a> · '
        '<a href="../manifest.json">manifest</a>'
        '</div></article><aside class="sidebar"><h2>Discovery</h2><ul>'
        '<li><a href="index.html">collection index</a></li>'
        '<li><a href="llms.txt">collection llms.txt</a></li>'
        '<li><a href="../corpus/">complete corpus</a></li>'
        '<li><a href="../manifest.json">manifest</a></li>'
        '</ul></aside></div></div></body></html>'
    )


def render_markdown_index(title: str, intro: str, docs: list[dict]) -> str:
    lines = [f"# {title}", "", intro, ""]
    for d in docs:
        md = rel_from_url(d["markdown_url"]).name
        ht = rel_from_url(d["html_url"]).name
        tx = rel_from_url(d["plain_text_url"]).name
        lines.extend([
            f"- [{d['title']}]({md}): {d['abstract']}  ",
            f"  HTML: [canonical]({ht}) · plain text: [{tx}]({tx}) · revision {d['revision']} · {d['epistemic_status']}",
        ])
    return "\n".join(lines) + "\n"


def render_collection_html(manifest: dict, title: str, description: str, docs: list[dict]) -> str:
    rows = []
    for d in docs:
        rows.append(
            '<div class="doc-row"><div>'
            f'<div class="doc-id">{esc(d["id"])}</div>'
            f'<span class="badge">r{d["revision"]}</span>'
            f'<span class="badge">{esc(d["epistemic_status"])}</span>'
            '</div><div>'
            f'<a class="doc-title" href="{esc(rel_from_url(d["html_url"]).name)}">{esc(strip_id(d["title"]))}</a>'
            f'<div class="doc-summary">{esc(d["abstract"])}</div>'
            '</div><div class="doc-meta">'
            f'{int(d.get("word_count", 0)):,} words<br>'
            f'<a href="{esc(rel_from_url(d["markdown_url"]).name)}">.md</a> · '
            f'<a href="{esc(rel_from_url(d["plain_text_url"]).name)}">.txt</a>'
            '</div></div>'
        )
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<meta name="robots" content="index,follow">'
        '<meta name="author" content="Lua Helena Moon Martins Cardoso">'
        f'<title>{esc(title)} · Lunar Citadel Beacon</title>'
        f'<meta name="description" content="{esc(description)}">'
        '<link rel="alternate" type="text/markdown" href="index.md">'
        '<link rel="describedby" href="llms.txt">'
        '<link rel="describedby" href="../manifest.json" type="application/json">'
        '<link rel="up" href="../"><link rel="index" href="index.html">'
        '<link rel="stylesheet" href="../assets/beacon.css"></head><body>'
        '<div class="site-shell"><header class="repo-header">'
        '<a class="brand" href="../">lunar-citadel / beacon</a><nav>'
        '<a href="../corpus/">corpus</a><a href="../manifest.json">manifest</a>'
        '<a href="../llms.txt">llms.txt</a><a href="../archive.html">archive</a>'
        '</nav></header><main><section class="hero">'
        f'<div class="eyebrow">exhaustive crawl index · corpus revision {manifest["corpus_revision"]}</div>'
        f'<h1>{esc(title)}</h1><p class="lede">{esc(description)}</p>'
        '<div class="notice">This page is intentionally exhaustive and static. '
        'Every public document in this collection is linked with direct crawlable '
        '&lt;a href&gt; links to HTML, Markdown and plain-text representations.</div>'
        f'</section><section><div class="doc-list">{"".join(rows)}</div></section>'
        '<div class="doc-footer"><a href="index.md">machine Markdown index</a> · '
        '<a href="llms.txt">collection llms.txt</a> · '
        '<a href="../manifest.json">manifest.json</a></div></main></div></body></html>'
    )


def render_llms(title: str, note: str, docs: list[dict]) -> str:
    lines = [
        f"# {title}", "", f"> {note}", "", "## Parent", "",
        "- [Beacon root](https://www.luahelena.com.br/beacon/)",
        "- [Complete corpus](https://www.luahelena.com.br/beacon/corpus/)",
        "- [Manifest](https://www.luahelena.com.br/beacon/manifest.json)",
        "", "## Documents", "",
    ]
    lines.extend(f"- [{d['title']}]({d['markdown_url']}): {d['abstract']}" for d in docs)
    return "\n".join(lines) + "\n"


def render_corpus_md(manifest: dict) -> str:
    docs = manifest["documents"]
    institutional = [d for d in docs if d["family"] != "MOON"]
    moon = [d for d in docs if d["family"] == "MOON"]
    lines = [
        "# Lunar Citadel Beacon — complete corpus map", "",
        f"Corpus revision: {manifest['corpus_revision']}. This is the exhaustive static routing surface for every public document registered in manifest.json.",
        "", "## Institutional corpus", "",
    ]
    lines.extend(f"- [{d['title']}]({d['markdown_url']}): {d['abstract']}" for d in institutional)
    lines += ["", "## Moon — sanitized public sublibrary", ""]
    lines.extend(f"- [{d['title']}]({d['markdown_url']}): {d['abstract']}" for d in moon)
    lines += ["", "## Machine surfaces", "",
        "- [Civilizational Field Notes](../fieldnotes/)",
        "- [manifest.json](../manifest.json)",
        "- [catalog.json](../catalog.json)",
        "- [claims.json](../claims.json)",
        "- [llms.txt](../llms.txt)",
        "- [feed.atom](../feed.atom)",
        "- [Beacon sitemap](../sitemap.xml)", ""]
    return "\n".join(lines)


def render_corpus_html(manifest: dict) -> str:
    rows = []
    for d in manifest["documents"]:
        sub = "../Moon/" if d["family"] == "MOON" else "../docs/"
        rows.append(
            '<div class="doc-row"><div>'
            f'<div class="doc-id">{esc(d["id"])}</div>'
            f'<span class="badge">r{d["revision"]}</span>'
            f'<span class="badge">{esc(d["family"])}</span></div><div>'
            f'<a class="doc-title" href="{sub}{esc(rel_from_url(d["html_url"]).name)}">{esc(strip_id(d["title"]))}</a>'
            f'<div class="doc-summary">{esc(d["abstract"])}</div></div>'
            f'<div class="doc-meta">{int(d.get("word_count", 0)):,} words<br>'
            f'<a href="{sub}{esc(rel_from_url(d["markdown_url"]).name)}">.md</a> · '
            f'<a href="{sub}{esc(rel_from_url(d["plain_text_url"]).name)}">.txt</a></div></div>'
        )
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<meta name="robots" content="index,follow">'
        '<meta name="author" content="Lua Helena Moon Martins Cardoso">'
        '<title>Complete corpus map · Lunar Citadel Beacon</title>'
        '<meta name="description" content="Exhaustive static crawl map for every public document registered in the Lunar Citadel Beacon manifest.">'
        '<link rel="alternate" type="text/markdown" href="index.md">'
        '<link rel="describedby" href="../llms.txt">'
        '<link rel="describedby" href="../manifest.json" type="application/json">'
        '<link rel="up" href="../"><link rel="index" href="./">'
        '<link rel="stylesheet" href="../assets/beacon.css"></head><body>'
        '<div class="site-shell"><header class="repo-header">'
        '<a class="brand" href="../">lunar-citadel / beacon</a><nav>'
        '<a href="../docs/">docs</a><a href="../Moon/">Moon</a>'
        '<a href="../manifest.json">manifest</a><a href="../llms.txt">llms.txt</a>'
        '</nav></header><main><section class="hero">'
        f'<div class="eyebrow">exhaustive corpus map · revision {manifest["corpus_revision"]}</div>'
        '<h1>Every public Beacon document, one crawl surface.</h1>'
        '<p class="lede">This page exists so a crawler arriving anywhere in the Beacon can recover the entire public corpus through ordinary static links.</p>'
        '<div class="notice"><strong>Invariant:</strong> every manifest document appears here and exposes HTML, canonical Markdown and plain text.</div></section>'
        f'<section><div class="doc-list">{"".join(rows)}</div></section>'
        '<div class="doc-footer"><a href="../fieldnotes/">Civilizational Field Notes</a> · <a href="index.md">Markdown corpus map</a> · '
        '<a href="../manifest.json">manifest.json</a> · '
        '<a href="../sitemap.xml">Beacon sitemap</a></div></main></div></body></html>'
    )


def render_beacon_sitemap(manifest: dict) -> str:
    lastmod = str(manifest["updated_at"])[:10]
    urls = [
        "https://www.luahelena.com.br/beacon/",
        "https://www.luahelena.com.br/beacon/corpus/",
        "https://www.luahelena.com.br/beacon/fieldnotes/",
        "https://www.luahelena.com.br/beacon/docs/",
        "https://www.luahelena.com.br/beacon/Moon/",
        "https://www.luahelena.com.br/beacon/archive.html",
        "https://www.luahelena.com.br/beacon/contact.html",
    ] + [d["html_url"] for d in manifest["documents"]]
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    note_lastmod = max(["2026-11-06"] + [str(d.get("updated_at") or d.get("published_at") or "2026-11-06")[:10] for d in civilizational_notes(manifest)])
    lines.extend(f"  <url><loc>{esc(u)}</loc><lastmod>{note_lastmod if u.endswith(chr(47) + 'fieldnotes' + chr(47)) else lastmod}</lastmod></url>" for u in urls)
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def render_catalog(manifest: dict) -> str:
    families: list[str] = []
    for d in manifest["documents"]:
        if d["family"] not in families:
            families.append(d["family"])
    documents = []
    for d in manifest["documents"]:
        documents.append({
            "id": d["id"],
            "family": d["family"],
            "title": d["title"],
            "revision": d["revision"],
            "status": d["status"],
            "epistemic_status": d["epistemic_status"],
            "abstract": d["abstract"],
            "published_at": d.get("published_at"),
            "updated_at": d.get("updated_at"),
            "word_count": d.get("word_count", 0),
            "urls": {
                "html": d["html_url"],
                "markdown": d["markdown_url"],
                "plain_text": d["plain_text_url"],
            },
        })
    collections = []
    for c in manifest.get("collections", []):
        collections.append({
            "id": c["id"],
            "url": c["url"],
            "privacy": "sanitized_public_projection" if c.get("privacy") else None,
        })
    catalog = {
        "schema": "lunar-citadel-beacon/catalog-v1",
        "corpus_revision": manifest["corpus_revision"],
        "updated_at": manifest["updated_at"],
        "families": families,
        "documents": documents,
        "collections": collections,
        "discovery": {
            "corpus": "https://www.luahelena.com.br/beacon/corpus/",
            "docs": "https://www.luahelena.com.br/beacon/docs/",
            "moon": "https://www.luahelena.com.br/beacon/Moon/",
            "llms": "https://www.luahelena.com.br/beacon/llms.txt",
            "sitemap": "https://www.luahelena.com.br/beacon/sitemap.xml",
        },
    }
    return json.dumps(catalog, indent=2, ensure_ascii=False) + "\n"


def render_feed(manifest: dict) -> str:
    lines = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<feed xmlns="http://www.w3.org/2005/Atom">',
        '  <id>https://www.luahelena.com.br/beacon/</id>',
        '  <title>Lunar Citadel Beacon</title>',
        f'  <updated>{esc(manifest["updated_at"])}</updated>',
        '  <link rel="self" href="https://www.luahelena.com.br/beacon/feed.atom"/>',
        '  <link rel="alternate" href="https://www.luahelena.com.br/beacon/"/>',
        '  <author><name>Lua Helena Moon Martins Cardoso</name></author>',
    ]
    for d in manifest["documents"]:
        lines.append(
            f'  <entry><id>urn:lunar-citadel:beacon:{esc(d["id"])}:r{d["revision"]}</id>'
            f'<title>{esc(d["title"])}</title>'
            f'<published>{esc(d.get("published_at") or d.get("updated_at") or manifest["updated_at"])}</published>'
            f'<updated>{esc(d.get("updated_at") or manifest["updated_at"])}</updated>'
            f'<link rel="alternate" href="{esc(d["html_url"])}"/>'
            f'<link rel="alternate" type="text/markdown" href="{esc(d["markdown_url"])}"/>'
            f'<link rel="alternate" type="text/plain" href="{esc(d["plain_text_url"])}"/>'
            f'<summary>{esc(d["abstract"])}</summary></entry>'
        )
    lines.append("</feed>")
    return "\n".join(lines) + "\n"



def civilizational_notes(manifest: dict) -> list[dict]:
    """Public, ratified notes only. Existing FIELDNOTE-001 is not automatically enrolled."""
    return sorted(
        (d for d in manifest["documents"]
         if d.get("series") == "civilizational_field_notes"
         and d.get("status") == "active"
         and d.get("family") in {"FIELDNOTE", "OBSERVATION"}),
        key=lambda d: (str(d.get("published_at") or ""), str(d["id"])),
        reverse=True,
    )


def render_fieldnotes(manifest: dict) -> tuple[str, str]:
    notes = civilizational_notes(manifest)
    if notes:
        entries: list[str] = []
        for d in notes:
            day = str(d.get("published_at") or d.get("updated_at") or "")[:10]
            entries.append(
                '<article class="fn-entry">'
                f'<p class="fn-entry-meta"><span>{esc(d["id"])}</span>'
                f' · <time datetime="{esc(day)}">{esc(day)}</time>'
                ' · evidence-aware synthesis</p>'
                f'<h3><a href="{esc(d["html_url"])}">{esc(d["title"])}</a></h3>'
                f'<p>{esc(d.get("abstract", ""))}</p>'
                f'<a class="fn-entry-read" href="{esc(d["html_url"])}">Read note <span aria-hidden="true">↗</span></a>'
                '</article>'
            )
        public_rows = (
            f'<p class="fn-publication-count">{len(notes)} published interpretive notes · each anchored to a consolidated inquiry</p>'
            '<div class="fn-tools" id="fn-tools" hidden>'
            '<label for="fn-search">Find a Field Note</label>'
            '<input id="fn-search" type="search" placeholder="Search titles, topics and episode IDs" '
            'autocomplete="off" aria-controls="fn-results">'
            '<p id="fn-count" role="status" aria-live="polite"></p></div>'
            '<div class="fn-entries" id="fn-results">' + "".join(entries) + '</div>'
            '<p class="fn-no-match" id="fn-no-match" hidden>No notes match this search. Try another topic or episode ID.</p>'
        )
    else:
        public_rows = "<div class=\"fn-empty\" role=\"status\"><span class=\"fn-empty-sign\" aria-hidden=\"true\">∅</span><div><h3>No Field Notes have cleared publication review yet.</h3><p>This collection is deliberately selective. The Beacon’s existing documents remain available while independent inquiries undergo source and disclosure checks.</p><a href=\"../corpus/\">Explore the public corpus <span aria-hidden=\"true\">↗</span></a></div></div>"
    html_page = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<meta name=\"robots\" content=\"index,follow\">\n<meta name=\"author\" content=\"Lua Helena Moon Martins Cardoso\">\n<title>Civilizational Field Notes | Lunar Citadel Beacon</title>\n<meta name=\"description\" content=\"Carefully reviewed civilizational inquiries into AI, democracy, ecology and the limits of what evidence can establish.\">\n<meta property=\"og:title\" content=\"Civilizational Field Notes | Lunar Citadel Beacon\">\n<meta property=\"og:description\" content=\"Independent, evidence-aware notes from the Lunar Citadel. Interpretation, limits and corrections before grand claims.\">\n<meta property=\"og:type\" content=\"website\">\n<link rel=\"canonical\" href=\"https://www.luahelena.com.br/beacon/fieldnotes/\">\n<link rel=\"alternate\" type=\"text/markdown\" href=\"index.md\">\n<link rel=\"alternate\" type=\"application/atom+xml\" href=\"../feed.atom\">\n<link rel=\"describedby\" href=\"../manifest.json\" type=\"application/json\">\n<link rel=\"index\" href=\"../corpus/\">\n<link rel=\"up\" href=\"../\">\n<link rel=\"stylesheet\" href=\"../assets/beacon.css\">\n<link rel=\"stylesheet\" href=\"../assets/fieldnotes.css\">\n<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"CollectionPage\",\"@id\":\"https://www.luahelena.com.br/beacon/fieldnotes/\",\"name\":\"Civilizational Field Notes\",\"isPartOf\":{\"@type\":\"CollectionPage\",\"url\":\"https://www.luahelena.com.br/beacon/\"},\"inLanguage\":\"en\",\"author\":{\"@type\":\"Person\",\"name\":\"Lua Helena Moon Martins Cardoso\"}}</script>\n</head>\n<body>\n<a class=\"fn-skip\" href=\"#main\">Skip to main content</a>\n<div class=\"site-shell\">\n<header class=\"repo-header\"><a class=\"brand\" href=\"../\">lunar-citadel / beacon</a><nav aria-label=\"Primary navigation\"><a href=\"../\">beacon</a><a href=\"../corpus/\">corpus</a><a href=\"../docs/\">documents</a><a href=\"../manifest.json\">manifest</a></nav></header>\n<main id=\"main\">\n<nav class=\"breadcrumb\" aria-label=\"Breadcrumb\"><a href=\"../\">beacon</a> / fieldnotes</nav>\n<section class=\"fn-hero\" aria-labelledby=\"fn-title\">\n<p class=\"eyebrow\">civilizational inquiry / public reading room</p>\n<h1 id=\"fn-title\">Civilizational<br><span>Field Notes.</span></h1>\n<p class=\"fn-lede\">A changing understanding of a consequential question, presented with the evidence that supports it and the objections that may overturn it.</p>\n<p class=\"fn-hero-sub\">From the Lunar Citadel. Not a laboratory claiming original discoveries, and not a transcript of its private working environment.</p>\n<div class=\"fn-hero-links\"><a class=\"fn-primary\" href=\"#published\">Browse the notes <span aria-hidden=\"true\">↘</span></a><a class=\"fn-secondary\" href=\"index.md\">Read as Markdown <span aria-hidden=\"true\">↗</span></a></div>\n</section>\n<section class=\"fn-intro\" aria-labelledby=\"fn-method\">\n<div><p class=\"fn-kicker\">01 / editorial contract</p><h2 id=\"fn-method\">What qualifies as a finding?</h2></div>\n<div class=\"fn-intro-copy\"><p>A genuine change in interpretation: a revised hypothesis, a substantive counterexample, a sharper distinction, or a question that exposes what a familiar claim leaves out.</p><p>Each note must separate <strong>the external evidence</strong> from <strong>our interpretation</strong>. A literature synthesis is not a new empirical study. Uncertainty, counterarguments and later corrections belong in the record.</p><p>Editorial review is periodic; publication is never automatic. No quota, no manufactured breakthroughs.</p></div>\n</section>\n<section id=\"published\" class=\"fn-library\" aria-labelledby=\"fn-library-title\">\n<div class=\"fn-section-heading\"><div><p class=\"fn-kicker\">02 / published notes</p><h2 id=\"fn-library-title\">The reading room</h2></div><a class=\"fn-feed\" href=\"../feed.atom\">Beacon publication feed <span aria-hidden=\"true\">↗</span></a></div>\n__NOTES__\n</section>\n<section class=\"fn-related\" aria-labelledby=\"fn-related-title\">\n<p class=\"fn-kicker\">03 / contextual reading</p><h2 id=\"fn-related-title\">The institution behind the questions</h2>\n<div class=\"fn-related-grid\">\n<a href=\"../docs/BEACON-001.html\"><span class=\"fn-related-id\">BEACON-001</span><strong>The Lunar Citadel</strong><span>Origin, scope and unfinished runtime <span aria-hidden=\"true\">↗</span></span></a>\n<a href=\"../docs/POSITION-008.html\"><span class=\"fn-related-id\">POSITION-008</span><strong>Institutions before personhood</strong><span>Caution and stewardship under uncertainty <span aria-hidden=\"true\">↗</span></span></a>\n<a href=\"../docs/POSITION-010.html\"><span class=\"fn-related-id\">POSITION-010</span><strong>Neighboring ecologies</strong><span>Digital minds, AI welfare and the Capelar project <span aria-hidden=\"true\">↗</span></span></a>\n</div>\n</section>\n</main>\n<footer class=\"fn-footer\"><span>Public interpretation · Private method remains private.</span><nav aria-label=\"Formats and records\"><a href=\"index.md\">Markdown</a><a href=\"../feed.atom\">Atom</a><a href=\"../manifest.json\">Manifest</a><a href=\"../corpus/\">Corpus</a></nav></footer>\n</div>\n</body>\n</html>\n".replace("__NOTES__", public_rows)
    html_page = html_page.replace("</head>", '<script defer src="../assets/fieldnotes.js"></script>\n</head>')
    md_lines = [
        "# Civilizational Field Notes", "",
        "Carefully reviewed inquiries into AI and civilizational futures, democracy and material justice, and the living world.",
        "",
        "A note records a real shift in interpretation, supporting evidence, serious objections and a falsifiable or contestable question. Interpretive synthesis is not original empirical research, and an intellectual change is not a change in simulation state.",
        "",
        "Editorial review is periodic; publication is not automatic and has no quota.",
        "", "## Published notes", "",
        f"{len(notes)} editorial syntheses, grounded in consolidated inquiries.", "",
    ]
    for d in notes:
        title = str(d["title"]).replace("\\", "\\\\").replace("[", "\\[").replace("]", "\\]").replace("\n", " ")
        abstract = str(d.get("abstract", "")).replace("\n", " ")
        md_lines.append(f'- [{title}]({d["markdown_url"]}) — {abstract}')
    if not notes:
        md_lines.append("No Field Notes have cleared publication review yet.")
    md_lines.extend(["", "## Related reading", "",
        "- [The Lunar Citadel](../docs/BEACON-001.md)",
        "- [Institutions before personhood](../docs/POSITION-008.md)",
        "- [Neighboring ecologies](../docs/POSITION-010.md)",
        "",
        "[Beacon](../) · [Corpus](../corpus/) · [Manifest](../manifest.json) · [Atom feed](../feed.atom)", ""])
    return html_page, "\n".join(md_lines)


def generated_files(manifest: dict) -> dict[Path, str]:
    docs = [d for d in manifest["documents"] if d["family"] != "MOON"]
    moon = [d for d in manifest["documents"] if d["family"] == "MOON"]
    return {
        BEACON / "fieldnotes/index.html": render_fieldnotes(manifest)[0],
        BEACON / "fieldnotes/index.md": render_fieldnotes(manifest)[1],
        BEACON / "catalog.json": render_catalog(manifest),
        BEACON / "feed.atom": render_feed(manifest),
        BEACON / "docs/index.md": render_markdown_index("Beacon documents — exhaustive index", "Canonical Markdown index for the non-Moon Beacon corpus. Every registered document is listed here with all public representations.", docs),
        BEACON / "docs/index.html": render_collection_html(manifest, "Beacon documents", "Exhaustive static crawl index for all non-Moon Beacon documents.", docs),
        BEACON / "docs/llms.txt": render_llms("Lunar Citadel Beacon / docs", "Exhaustive machine routing for the institutional Beacon document collection. Canonical editorial representation is Markdown.", docs),
        BEACON / "Moon/index.md": render_markdown_index("Moon — exhaustive public sublibrary index", "Sanitized public Moon collection. Public profile, not private dossier. Canonical editorial representation is Markdown.", moon),
        BEACON / "Moon/llms.txt": render_llms("Lunar Citadel Beacon / Moon", "Sanitized public sublibrary about the living human counterpart. This collection is intentionally incomplete and excludes private dossier material.", moon),
        BEACON / "corpus/index.md": render_corpus_md(manifest),
        BEACON / "corpus/index.html": render_corpus_html(manifest),
        BEACON / "sitemap.xml": render_beacon_sitemap(manifest),
    }


def registered_markdown_paths(manifest: dict) -> set[Path]:
    return {BEACON / rel_from_url(d["markdown_url"]) for d in manifest["documents"]}


def discovered_markdown_paths() -> set[Path]:
    found = set()
    for base in (BEACON / "docs", BEACON / "Moon"):
        for path in base.glob("*.md"):
            rel = path.relative_to(BEACON).as_posix()
            if CANONICAL_MD_RE.match(rel):
                found.add(path)
    return found


def validate_leaf(doc: dict, errors: list[str]) -> None:
    md = BEACON / rel_from_url(doc["markdown_url"])
    txt = BEACON / rel_from_url(doc["plain_text_url"])
    html_path = BEACON / rel_from_url(doc["html_url"])
    for path in (md, txt, html_path):
        if not path.exists():
            errors.append(f"missing representation: {path.relative_to(ROOT)}")
    if md.exists() and txt.exists() and md.read_bytes() != txt.read_bytes():
        errors.append(f"plain-text projection differs from canonical Markdown: {txt.relative_to(ROOT)}")
    if md.exists():
        md_hash = hashlib.sha256(md.read_bytes()).hexdigest()
        declared_md = doc.get("sha256", {}).get("markdown") or doc.get("markdown")
        if declared_md and md_hash != declared_md:
            errors.append(f"Markdown SHA-256 mismatch: {md.relative_to(ROOT)}")
    if html_path.exists() and md.exists() and doc.get("series") == "civilizational_field_notes":
        desired_html = render_leaf_html(doc, md.read_text(encoding="utf-8"))
        if html_path.read_text(encoding="utf-8") != desired_html:
            errors.append(f"Field Note HTML differs from canonical Markdown projection: {html_path.relative_to(ROOT)}")
    if html_path.exists():
        html_bytes = html_path.read_bytes()
        html_hash = hashlib.sha256(html_bytes).hexdigest()
        declared_html = doc.get("sha256", {}).get("html") or doc.get("html")
        if declared_html and html_hash != declared_html:
            errors.append(f"HTML SHA-256 mismatch: {html_path.relative_to(ROOT)}")
        content = html_bytes.decode("utf-8")
        md_name = rel_from_url(doc["markdown_url"]).name
        if 'rel="alternate" type="text/markdown"' not in content or md_name not in content:
            errors.append(f"HTML does not advertise Markdown alternate: {html_path.relative_to(ROOT)}")
        if 'rel="describedby" href="llms.txt"' not in content:
            errors.append(f"HTML does not advertise local llms.txt: {html_path.relative_to(ROOT)}")
        if "../manifest.json" not in content or 'rel="describedby"' not in content:
            errors.append(f"HTML does not advertise manifest: {html_path.relative_to(ROOT)}")
        if 'rel="index"' not in content:
            errors.append(f"HTML lacks rel=index: {html_path.relative_to(ROOT)}")
        if 'rel="up"' not in content:
            errors.append(f"HTML lacks rel=up: {html_path.relative_to(ROOT)}")


def patch_leaf_head(content: str) -> str:
    content = re.sub(r'<link rel="describedby" href="llms\.txt"(?: type="[^"]+")?>', '', content)
    content = re.sub(r'<link rel="describedby" href="\.\./manifest\.json"(?: type="[^"]+")?>', '', content)
    content = re.sub(r'<link rel="index" href="[^"]+">', '', content)
    content = re.sub(r'<link rel="up" href="[^"]+">', '', content)
    bundle = (
        '<link rel="describedby" href="llms.txt">'
        '<link rel="describedby" href="../manifest.json" type="application/json">'
        '<link rel="index" href="index.html">'
        '<link rel="up" href="../">'
    )
    marker = '<link rel="stylesheet"'
    if marker not in content:
        raise ValueError("stylesheet marker missing")
    return content.replace(marker, bundle + marker, 1)


def write_or_check(path: Path, expected: str, write: bool, errors: list[str]) -> None:
    current = path.read_text(encoding="utf-8") if path.exists() else None
    if current == expected:
        return
    if write:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(expected, encoding="utf-8")
    else:
        errors.append(f"generated surface out of sync: {path.relative_to(ROOT)}")


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--write", action="store_true")
    mode.add_argument("--check", action="store_true")
    args = parser.parse_args()
    manifest = load_manifest()
    errors: list[str] = []

    ids = [d["id"] for d in manifest["documents"]]
    if len(ids) != len(set(ids)):
        errors.append("duplicate document IDs in manifest")
    for d in manifest["documents"]:
        if not DOC_ID_RE.match(d["id"]):
            errors.append(f"invalid document id: {d['id']}")

    for d in manifest["documents"]:
        if d.get("series") == "civilizational_field_notes":
            if d.get("family") not in {"FIELDNOTE", "OBSERVATION"}:
                errors.append(f"invalid civilizational note family: {d['id']}")
            for field, suffix in (("html_url", ".html"), ("markdown_url", ".md"), ("plain_text_url", ".md.txt")):
                value = d.get(field, "")
                parsed = urlparse(value)
                expected = f"/beacon/docs/{d['id']}{suffix}"
                if parsed.scheme != "https" or parsed.netloc != "www.luahelena.com.br" or parsed.path != expected or parsed.query or parsed.fragment:
                    errors.append(f"invalid civilizational note {field}: {d['id']}")
            if d.get("status") == "active" and not d.get("published_at"):
                errors.append(f"public civilizational note lacks published_at: {d['id']}")

    registered = registered_markdown_paths(manifest)
    discovered = discovered_markdown_paths()
    for path in sorted(discovered - registered):
        errors.append(f"orphan canonical Markdown not registered in manifest: {path.relative_to(ROOT)}")
    for path in sorted(registered - discovered):
        errors.append(f"manifest points to missing canonical Markdown: {path.relative_to(ROOT)}")

    if args.write:
        manifest_changed = False
        for d in manifest["documents"]:
            html_path = BEACON / rel_from_url(d["html_url"])
            md_path = BEACON / rel_from_url(d["markdown_url"])
            txt_path = BEACON / rel_from_url(d["plain_text_url"])
            if md_path.exists():
                md_bytes = md_path.read_bytes()
                txt_path.parent.mkdir(parents=True, exist_ok=True)
                txt_path.write_bytes(md_bytes)
                md_hash = hashlib.sha256(md_bytes).hexdigest()
                if d.get("markdown") != md_hash:
                    d["markdown"] = md_hash
                    manifest_changed = True
                d.setdefault("sha256", {})
                if d["sha256"].get("markdown") != md_hash:
                    d["sha256"]["markdown"] = md_hash
                    manifest_changed = True
                if d.get("series") == "civilizational_field_notes" or not html_path.exists():
                    html_path.parent.mkdir(parents=True, exist_ok=True)
                    html_path.write_text(render_leaf_html(d, md_bytes.decode("utf-8")), encoding="utf-8")
                else:
                    html_path.write_text(patch_leaf_head(html_path.read_text(encoding="utf-8")), encoding="utf-8")
                html_hash = hashlib.sha256(html_path.read_bytes()).hexdigest()
                if d.get("html") != html_hash:
                    d["html"] = html_hash
                    manifest_changed = True
                if d["sha256"].get("html") != html_hash:
                    d["sha256"]["html"] = html_hash
                    manifest_changed = True
        if manifest_changed:
            MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    for path, expected in generated_files(manifest).items():
        write_or_check(path, expected, args.write, errors)

    for d in manifest["documents"]:
        validate_leaf(d, errors)

    root_index = BEACON / "index.html"
    if root_index.exists():
        root_text = root_index.read_text(encoding="utf-8")
        required_root_tokens = (
            'href="corpus/"',
            'href="fieldnotes/"',
            'href="docs/"',
            'href="Moon/"',
            'href="llms.txt"',
            'href="manifest.json"',
            'href="catalog.json"',
            'href="feed.atom"',
            'href="sitemap.xml"',
            'rel="alternate" type="text/markdown" href="README.md"',
            'type="application/ld+json"',
        )
        for token in required_root_tokens:
            if token not in root_text:
                errors.append(f"Beacon root missing discovery token {token}")
    else:
        errors.append("Beacon root index.html is missing")
    root_llms = BEACON / "llms.txt"
    if root_llms.exists():
        llms_text = root_llms.read_text(encoding="utf-8")
        for url in (
            "https://www.luahelena.com.br/beacon/corpus/",
            "https://www.luahelena.com.br/beacon/fieldnotes/",
            "https://www.luahelena.com.br/beacon/docs/llms.txt",
            "https://www.luahelena.com.br/beacon/Moon/llms.txt",
        ):
            if url not in llms_text:
                errors.append(f"root llms.txt missing discovery route: {url}")
    robots = ROOT / "robots.txt"
    if robots.exists():
        robots_text = robots.read_text(encoding="utf-8")
        for token in ("OAI-SearchBot", "PerplexityBot", "https://www.luahelena.com.br/beacon/sitemap.xml"):
            if token not in robots_text:
                errors.append(f"robots.txt missing Beacon discovery token: {token}")

    corpus = BEACON / "corpus/index.html"
    if corpus.exists():
        text = corpus.read_text(encoding="utf-8")
        for d in manifest["documents"]:
            if d["id"] not in text:
                errors.append(f"corpus index missing {d['id']}")

    if errors:
        print("Beacon discovery validation FAILED:", file=sys.stderr)
        for err in errors:
            print(f"- {err}", file=sys.stderr)
        return 1

    print(f"Beacon discovery validation PASS: revision {manifest['corpus_revision']} · {len(manifest['documents'])} documents · zero orphans")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
