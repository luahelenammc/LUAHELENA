"""Rendered, local, desktop/mobile smoke checks for the Beacon.

Runs against source files on a local HTTP server; no credentials or production
network access are required. Artifacts are screenshots for human review.
"""
from __future__ import annotations

import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "beacon-visual-artifacts"
PAGES = {
    "home": "beacon/",
    "guide": "beacon/guide/",
    "embassy": "beacon/embassy/",
    "passport": "beacon/embassy/passport.html",
    "archive": "beacon/archive.html",
    "fieldnotes": "beacon/fieldnotes/",
    "moon": "beacon/Moon/",
    "contact": "beacon/contact.html",
}
VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
    "small-mobile": {"width": 320, "height": 640},
}


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main() -> None:
    OUT.mkdir(exist_ok=True)
    handler = partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    server.daemon_threads = True
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f"http://127.0.0.1:{server.server_port}/"
    results = []
    problems = []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
            for key, path in PAGES.items():
                for display, viewport in VIEWPORTS.items():
                    page = browser.new_page(viewport=viewport, device_scale_factor=1)
                    response = page.goto(base + path, wait_until="networkidle")
                    if response is None or response.status != 200:
                        problems.append(f"{key}/{display}: HTTP failure")
                        page.close()
                        continue
                    data = page.evaluate("""() => {
                        const root = document.scrollingElement || document.documentElement;
                        const title = document.querySelector('h1');
                        const nav = document.querySelector('header nav');
                        const main = document.querySelector('main');
                        const box = title && title.getBoundingClientRect();
                        const width = document.documentElement.clientWidth;
                        const overflow = [...document.querySelectorAll('body *')].filter(e => {
                            const r = e.getBoundingClientRect();
                            const s = getComputedStyle(e);
                            return (r.right > width + 3 || r.left < -3) &&
                                s.position !== 'absolute' && s.position !== 'fixed';
                        }).slice(0, 8).map(e => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ').join('.') : ''));
                        return {
                            viewport: width, pageWidth: root.scrollWidth,
                            hasH1: !!title, hasMain: !!main, hasNavigation: !!nav,
                            h1WithinPage: !!box && box.left >= -2 && box.right <= width + 2,
                            overflowCandidates: overflow
                        };
                    }""")
                    dest = OUT / f"{key}-{display}.png"
                    page.screenshot(path=str(dest), full_page=True)
                    data.update({"page": key, "display": display, "screenshot": dest.name})
                    results.append(data)
                    if not data["hasH1"] or not data["hasMain"] or not data["hasNavigation"]:
                        problems.append(f"{key}/{display}: missing semantic landmark: {data}")
                    if not data["h1WithinPage"]:
                        problems.append(f"{key}/{display}: heading clipped: {data}")
                    if data["pageWidth"] > data["viewport"] + 2:
                        problems.append(f"{key}/{display}: horizontal overflow: {data}")
                    print(f"{'PASS' if not problems or not any(z.startswith(key + '/' + display) for z in problems) else 'FAIL'} {key}/{display}: viewport={data['viewport']} page={data['pageWidth']}")
                    page.close()
            browser.close()
    finally:
        server.shutdown()
    (OUT / "metrics.json").write_text(json.dumps({"results": results, "problems": problems}, indent=2), encoding="utf-8")
    if problems:
        print("\n".join(problems))
        raise SystemExit(1)
    print(f"PASS {len(results)} rendered viewport checks; screenshots in {OUT}")


if __name__ == "__main__":
    main()
