#!/usr/bin/env python3
"""Regenerate the PR-007 downloadable PDF from the current public HTML source.

The PDF deliberately uses screen-media typography, color and card semantics plus
a distinct A4 composition stylesheet. It does NOT replace the HTML's design.
Fails closed on missing sections, clipped text, missing outreach cards or images.
"""
from __future__ import annotations

import argparse
import json
import re
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import fitz
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "papers" / "soberaniacognitiva.html"
CSS = ROOT / "papers" / "soberaniacognitiva-pdf.css"
OUTPUT = ROOT / "papers" / "soberaniacognitiva.pdf"
MANDATORY_SECTIONS = [
    "leitura", "pergunta", "geopolitica", "matriz", "aplicar",
    "camadas", "piloto", "autoria", "fontes", "circulacao",
]
MANDATORY_PEOPLE = [
    "Luisa Canziani", "Aguinaldo Ribeiro", "Adriana Ventura",
    "Reginaldo Lopes", "Camila Jara", "Lucas Ramos", "Jandira Feghali",
    "Fernanda Melchionna", "Jadyel Alencar", "Vitor Lippi",
    "Erika Hilton", "Sâmia Bomfim", "Mariana Conti", "Jones Manoel",
]


def serve_repo():
    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(ROOT), **kwargs)

        def log_message(self, fmt, *args):
            pass

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, f"http://127.0.0.1:{server.server_port}"


def inspect_pdf(path: Path) -> dict:
    doc = fitz.open(path)
    try:
        whole = "\n".join(page.get_text(sort=True) for page in doc)
        normalized = re.sub(r"\s+", " ", whole)
        required = [
            "Soberania Cognitiva Brasileira",
            "Lua Helena Moon Martins Cardoso",
            "Oito capacidades",
            "20 mensagens",
            "18 destinos",
            *MANDATORY_PEOPLE,
        ]
        missing = [piece for piece in required if piece not in normalized]
        if missing:
            raise RuntimeError(f"PDF missing text content: {missing}")
        if len(doc) < 8 or len(doc) > 100:
            raise RuntimeError(f"Unexpected PDF length: {len(doc)} pages")
        pages = []
        for index, page in enumerate(doc):
            w, h = page.rect.width, page.rect.height
            if not (590 < w < 600 and 838 < h < 846):
                raise RuntimeError(f"Not A4: page {index+1}, {w}x{h}")
            words = page.get_text("words")
            if len(words) < 2:
                raise RuntimeError(f"Blank or nearly empty PDF page: {index+1}")
            # Allow small tolerances for glyph bboxes and legitimate page numbers.
            stray = [
                (x0, y0, x1, y1, val)
                for x0, y0, x1, y1, val, *_ in words
                if x0 < -1 or x1 > w + 1 or y0 < -1 or y1 > h + 1
            ]
            if stray:
                raise RuntimeError(f"Clipped geometry on page {index+1}: {stray[:3]}")
            pages.append({"page": index + 1, "words": len(words)})
        if normalized.count("Pular para o conteúdo"):
            raise RuntimeError("HTML skip link leaked into PDF")
        if "20 mensagens" not in normalized or "18 destinos" not in normalized:
            raise RuntimeError("Circulation counter out of sync")
        return {
            "pages": len(doc),
            "bytes": path.stat().st_size,
            "extractable_characters": len(whole),
            "people_verified": len(MANDATORY_PEOPLE),
            "required_sections": len(MANDATORY_SECTIONS),
            "page_word_counts": pages,
        }
    finally:
        doc.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--qa-json", type=Path, default=ROOT / "papers" / "soberaniacognitiva-pdf-qa.json")
    parser.add_argument("--screenshots", action="store_true")
    args = parser.parse_args()
    if not HTML.is_file() or not CSS.is_file():
        raise SystemExit("HTML or PDF CSS source missing")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    server, origin = serve_repo()
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
            try:
                page = browser.new_page(viewport={"width": 696, "height": 1024}, device_scale_factor=1)
                page.emulate_media(media="screen", reduced_motion="reduce")
                errors = []
                page.on("pageerror", lambda e: errors.append(str(e)))
                response = page.goto(origin + "/papers/soberaniacognitiva.html",
                                     wait_until="domcontentloaded", timeout=60000)
                if not response or response.status != 200:
                    raise RuntimeError("Cannot load canonical local HTML")
                page.evaluate("""() => {
                    document.querySelectorAll('details').forEach(d => {
                        d.removeAttribute('name');
                        d.open = true;
                    });
                    // Disable decorative in-page widgets, never the article content.
                    window.scrollTo(0, 0);
                }""")
                ids = page.eval_on_selector_all("[id]", "els => els.map(e => e.id)")
                if any(section not in ids for section in MANDATORY_SECTIONS):
                    raise RuntimeError("Paper chapters absent from source")
                count = page.locator(".outreach-card").count()
                if count != 18:
                    raise RuntimeError(f"Expected 18 public outreach destinations, got {count}")
                if not page.locator("body").inner_text().count("20 mensagens"):
                    raise RuntimeError("HTML ledger counter changed")
                page.add_style_tag(path=str(CSS))
                page.evaluate("""async () => {
                  await document.fonts.ready;
                  await Promise.all(Array.from(document.images).map(async i => {
                    if (!i.complete) await new Promise(resolve => {
                      i.addEventListener('load', resolve, {once:true});
                      i.addEventListener('error', resolve, {once:true});
                      setTimeout(resolve, 8000);
                    });
                  }));
                }""")
                # External imagery: incomplete requests are not silently ignored.
                missing_images = page.eval_on_selector_all(
                    "img", "els => els.filter(i => !i.complete || i.naturalWidth < 1).map(i => i.src)"
                )
                if missing_images:
                    raise RuntimeError(f"Missing images: {missing_images[:5]}")
                if args.screenshots:
                    page.screenshot(path=str(args.output.with_suffix(".first-screen.png")))
                page.pdf(
                    path=str(args.output),
                    format="A4", prefer_css_page_size=True, print_background=True,
                    display_header_footer=True, header_template="<span></span>",
                    footer_template=(
                        '<div style="font:8px Arial,sans-serif;color:#456a83;'
                        'width:100%;text-align:center;letter-spacing:.07em">'
                        'SOBERANIA COGNITIVA BRASILEIRA'
                        ' &nbsp;•&nbsp; LUA HELENA MOON MARTINS CARDOSO'
                        ' &nbsp;•&nbsp; <span class="pageNumber"></span> / '
                        '<span class="totalPages"></span></div>'
                    ),
                    margin={"top": "12mm", "bottom": "15mm",
                            "left": "12.5mm", "right": "12.5mm"},
                    scale=1.0,
                )
                if errors:
                    raise RuntimeError(f"Browser JS errors: {errors[:3]}")
            finally:
                browser.close()
    finally:
        server.shutdown()
    report = inspect_pdf(args.output)
    args.qa_json.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n",
                            encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
