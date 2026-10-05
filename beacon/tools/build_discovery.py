#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import hashlib
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
BEACON = ROOT / "beacon"
MANIFEST_PATH = BEACON / "manifest.json"

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
        '<div class="doc-footer"><a href="index.md">Markdown corpus map</a> · '
        '<a href="../manifest.json">manifest.json</a> · '
        '<a href="../sitemap.xml">Beacon sitemap</a></div></main></div></body></html>'
    )


def render_beacon_sitemap(manifest: dict) -> str:
    lastmod = str(manifest["updated_at"])[:10]
    urls = [
        "https://www.luahelena.com.br/beacon/",
        "https://www.luahelena.com.br/beacon/corpus/",
        "https://www.luahelena.com.br/beacon/docs/",
        "https://www.luahelena.com.br/beacon/Moon/",
        "https://www.luahelena.com.br/beacon/archive.html",
        "https://www.luahelena.com.br/beacon/contact.html",
    ] + [d["html_url"] for d in manifest["documents"]]
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    lines.extend(f"  <url><loc>{esc(u)}</loc><lastmod>{lastmod}</lastmod></url>" for u in urls)
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def generated_files(manifest: dict) -> dict[Path, str]:
    docs = [d for d in manifest["documents"] if d["family"] != "MOON"]
    moon = [d for d in manifest["documents"] if d["family"] == "MOON"]
    return {
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
                txt_path.write_bytes(md_bytes)
                md_hash = hashlib.sha256(md_bytes).hexdigest()
                if d.get("markdown") != md_hash:
                    d["markdown"] = md_hash
                    manifest_changed = True
                d.setdefault("sha256", {})
                if d["sha256"].get("markdown") != md_hash:
                    d["sha256"]["markdown"] = md_hash
                    manifest_changed = True
            if html_path.exists():
                html_path.write_text(patch_leaf_head(html_path.read_text(encoding="utf-8")), encoding="utf-8")
                html_hash = hashlib.sha256(html_path.read_bytes()).hexdigest()
                if d.get("html") != html_hash:
                    d["html"] = html_hash
                    manifest_changed = True
                d.setdefault("sha256", {})
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
        for href in ('href="corpus/"', 'href="docs/"'):
            if href not in root_text:
                errors.append(f"Beacon root missing crawl entrypoint {href}")
    root_llms = BEACON / "llms.txt"
    if root_llms.exists():
        llms_text = root_llms.read_text(encoding="utf-8")
        for url in (
            "https://www.luahelena.com.br/beacon/corpus/",
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
