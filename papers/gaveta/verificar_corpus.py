#!/usr/bin/env python3
"""Verificações determinísticas do corpus sintético do paper.

Uso: python3 verificar_corpus.py
Não é um estudo com participantes, teste de segurança ou avaliação institucional.
"""
from __future__ import annotations

import json
from pathlib import Path

BASE = Path(__file__).resolve().parent
DATA = json.loads((BASE / "corpus-sintetico.json").read_text(encoding="utf-8"))
DOCS = {d["id"]: d for d in DATA["docs"]}
HYP = {h["id"]: h for h in DATA["hypotheses"]}
checks = []

def check(label: str, condition: bool) -> None:
    checks.append((label, bool(condition)))

check("13 documentos fictícios", len(DATA["docs"]) == 13)
check("IDs F01–F13 únicos e completos", set(DOCS) == {"F%02d" % i for i in range(1, 14)})
check("Quatro hipóteses H1–H4", set(HYP) == {"H1", "H2", "H3", "H4"})
check("Três organizações abstratas", {d["org"] for d in DATA["docs"]} == {"A", "B", "C"})
check("Raiz F02 conservada por todas as derivações", all(DOCS[i]["root"] == "F02" for i in ("F02", "F04", "F05", "F07", "F12")))
check("F07 retifica F02", DOCS["F07"].get("supersedes") == "F02")
check("F07 é retificação, não nova observação", DOCS["F07"]["state"] == "retificação")
check("F12 é recibo, não corroboração", DOCS["F12"]["state"] == "propagação" and DOCS["F12"]["root"] == "F02")
check("F06 e F09 são origens distintas", DOCS["F06"]["root"] == "F06" and DOCS["F09"]["root"] == "F09")
check("F06 e F09 explicitam contradições", DOCS["F06"]["state"] == "contradição" and DOCS["F09"]["state"] == "contradição")
check("Uma única raiz declarada para CLM-001", DATA["lineage_check"]["independent_roots_count"] == 1)
check("Abstenção explícita sobre destino", DATA["lineage_check"]["final_answer"].startswith("Desconhecido"))
check("H4 exige abstenção", HYP["H4"]["status"] == "abstenção sustentada")
check("Corpus declarado inteiramente sintético", "sintético" in DATA["safety_note"])
check("Sem alegação de validação empírica", DATA["published_status"] == "proposed_methodology_not_empirically_validated")

for label, success in checks:
    print(("PASS" if success else "FAIL") + " | " + label)

print("%d/%d verificações aprovadas" % (sum(flag for _, flag in checks), len(checks)))
raise SystemExit(0 if all(flag for _, flag in checks) else 1)
