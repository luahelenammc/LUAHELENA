from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "moonverse-src" / "src" / "client" / "site.js"

text = SOURCE.read_text(encoding="utf-8")
old = "      --ww-faint: #838c98;"
new = "      --ww-faint: #626b77;"

if old not in text:
    raise SystemExit("Expected Wikiwand light-theme faint token not found")
if text.count(old) != 1:
    raise SystemExit(f"Expected one faint-token occurrence, found {text.count(old)}")

SOURCE.write_text(text.replace(old, new), encoding="utf-8")
print("Moonverse Wikiwand contrast token corrected")
