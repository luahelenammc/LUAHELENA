from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "moonverse-src"
DATA = SOURCE / "data"


def read_json(name: str):
    return json.loads((DATA / name).read_text(encoding="utf-8"))


def write_json(name: str, value) -> None:
    (DATA / name).write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


entries = read_json("entries.json")
relations = read_json("relations.json")
paths = read_json("paths.json")
ledger = read_json("migration-ledger.json")

entry_id = "escrita-magia"
entry = {
    "id": entry_id,
    "slug": "escrita-como-magia-da-vida-real",
    "title": "A escrita como magia da vida real",
    "type": "Ensaio autobiográfico / poética autoral",
    "wing": "atelie-de-lithia",
    "summary": "Desde a adolescência, criar mundos paralelos foi uma forma de testar possibilidades, preservar experiências e devolver arquitetura ao que parecia disperso.",
    "lead": "Antes de ser profissão, método ou obra publicada, a escrita foi uma tecnologia íntima: uma maneira de abrir passagens quando o mundo oferecia poucas.",
    "status": "published",
    "editorial_state": "published_batch_d1",
    "privacy": "sanitized_approved",
    "publication_approved": True,
    "source_kind": "authored",
    "source_authority": "Sobre a Moon — Me tornando eu mesma, 25 de Junho e núcleo autoral",
    "source_refs": [
        "Me tornando eu mesma — prólogo e identidade autoral",
        "25 de Junho — autobiografia e função de legado",
        "True_Moonverse.py — mundos autorais e portal público",
    ],
    "sensitivity": "public_sanitized",
    "sanitization_required": True,
    "sanitization_notes": "A síntese exclui nome morto, cenas familiares privadas, detalhes clínicos, terceiros identificáveis e qualquer lore de Líthia ainda não escolhido como cânone público.",
    "publication_rationale": "A página completa o Ateliê de Líthia com matéria autoral comprovada, sem inventar personagens, eventos ou cosmologia da obra.",
    "reviewed_by_moon": True,
    "reviewed_at": "2026-08-03",
    "relation_review_state": "approved_batch_d1",
    "visual_state": "wikiwand_v3",
    "next_action": "preservar; futuras páginas de Líthia exigem seleção explícita de cânone autoral",
    "tags": [
        "escrita",
        "worldbuilding",
        "Líthia",
        "autoria",
        "memória",
        "linguagem",
    ],
    "life_phase": "adolescência e vida adulta",
    "date_label": "escrita autoral desde a adolescência",
    "published": "2026-08-03",
    "updated": "2026-08-03",
    "body_markdown": "## Antes do livro\n\nA escrita começou antes de existir uma identidade profissional organizada ao redor dela. Desde a adolescência, criar mundos paralelos oferecia uma forma de deslocar a realidade, experimentar outras regras e devolver movimento ao que parecia fechado. A linguagem não era apenas descrição; era uma ferramenta capaz de abrir espaço.\n\nDizer que a linguagem é a magia da vida real não significa tratá-la como ornamento. Significa reconhecer que palavras reorganizam memória, nomeiam possibilidades e permitem que uma experiência deixe de existir apenas como sensação dispersa.\n\n## Escrever para preservar\n\nA autobiografia nasce de uma função dupla: assimilar o vivido e impedir que ele desapareça sem forma. O gesto de escrever transforma experiência em legado, mas não porque congela a vida. Ele preserva uma trilha para que versões futuras da própria autora — e leitores que ainda não existem — possam reencontrar aquilo que mudou.\n\nNesse sentido, um livro é menos um túmulo da memória do que um recipiente de continuidade. A escrita conserva sem prometer que a interpretação permanecerá igual para sempre.\n\n## Mundo paralelo não é ausência de mundo\n\nCriar um universo ficcional pode parecer fuga quando visto de fora. Por dentro, muitas vezes é laboratório. Um mundo inventado permite separar forças que na vida chegam misturadas: desejo, perigo, pertencimento, poder, corpo, natureza, família e transformação.\n\nA ficção não precisa reproduzir a biografia para metabolizá-la. Ela pode deslocar uma pergunta para outro território até que a pergunta se torne visível.\n\n## Da magia à arquitetura\n\nCom o tempo, a mesma pulsão que criava histórias também passou a criar sistemas: arquivos, mapas, fontes vivas, relações e interfaces. Isso não converte literatura em planilha. Mostra apenas que imaginação e estrutura nunca foram inimigas.\n\nO Moonverse nasce dessa continuidade. Ele organiza páginas como territórios; o Moon Source organiza contexto como fonte governada; a Citadela organiza ideias como cidade causal. Em cada caso, linguagem é usada para construir um lugar que pode ser percorrido.\n\n## Líthia como território autoral\n\nAs Crônicas de Líthia pertencem a esse eixo de mundos habitáveis. Esta página não resume seu enredo nem promove rascunho a cânone. Ela registra uma condição anterior ao lore: Líthia existe porque escrever mundos é uma das formas mais antigas de a autora pensar, sentir e continuar.\n\nO Ateliê permanece, portanto, um lugar de fabricação com fronteira. O que ainda não foi escolhido pela autora continua fora da enciclopédia pública.\n\n## O que chega ao público\n\nNem tudo que alimenta uma obra precisa ser exposto. A superfície pública pode mostrar método, linhagem e algumas portas sem publicar o arquivo íntimo, os rascunhos integrais ou decisões criativas ainda instáveis.\n\nEssa contenção não diminui a imaginação; protege o direito de a obra amadurecer antes de ser apresentada como verdade final.\n\n> A linguagem é a magia da vida real — e toda magia responsável também conhece seus limites.",
    "relations": [
        "escrita-magia-belongs-to-atelie",
        "escrita-magia-develops-me-tornando",
        "escrita-magia-prepares-lithia",
        "escrita-magia-influences-moonverse",
    ],
}

if not any(item.get("id") == entry_id for item in entries):
    entries.append(entry)

new_relations = [
    {
        "id": "escrita-magia-belongs-to-atelie",
        "source": entry_id,
        "target": "atelie-de-lithia",
        "type": "belongs_to",
        "label": "pertence ao Ateliê de Líthia",
        "evidence": "A página trata da escrita, do worldbuilding e da fabricação de mundos autorais como prática de longa duração.",
        "review_state": "approved_batch_d1",
    },
    {
        "id": "escrita-magia-develops-me-tornando",
        "source": entry_id,
        "target": "me-tornando",
        "type": "develops_from",
        "label": "desdobra a continuidade autobiográfica em autoria",
        "evidence": "Me tornando eu mesma apresenta a escritora e a continuidade identitária; esta página desenvolve a função da escrita nessa continuidade.",
        "review_state": "approved_batch_d1",
    },
    {
        "id": "escrita-magia-prepares-lithia",
        "source": entry_id,
        "target": "lithia",
        "type": "prepares",
        "label": "prepara a entrada pública de Líthia sem inventar seu cânone",
        "evidence": "A página descreve a prática de criar mundos; a entrada de Líthia apresenta um território autoral específico sob gate canônico.",
        "review_state": "approved_batch_d1",
    },
    {
        "id": "escrita-magia-influences-moonverse",
        "source": entry_id,
        "target": "moonverse",
        "type": "influences",
        "label": "influencia a organização narrativa do Moonverse",
        "evidence": "O portal transforma páginas, relações e alas em territórios legíveis, continuidade formal da escrita como construção de mundos.",
        "review_state": "approved_batch_d1",
    },
]
relation_ids = {item.get("id") for item in relations}
for relation in new_relations:
    if relation["id"] not in relation_ids:
        relations.append(relation)

path_id = "escrita-mundos-e-arquitetura"
if not any(item.get("id") == path_id for item in paths):
    paths.append({
        "id": path_id,
        "title": "Escrita, mundos e arquitetura",
        "description": "Um percurso da escrita como tecnologia íntima à criação de Líthia e à organização pública de contextos e territórios.",
        "entry_ids": ["escrita-magia", "lithia", "moon-source"],
        "public": True,
        "editorial_state": "published_batch_d1",
        "next_action": "preservar; ampliações ficcionais dependem de cânone explicitamente escolhido por Moon",
    })

if not any(item.get("kind") == "new_public_entry" and item.get("id") == entry_id for item in ledger.get("dispositions", [])):
    ledger.setdefault("dispositions", []).append({
        "kind": "new_public_entry",
        "id": entry_id,
        "title": entry["title"],
        "disposition": "published",
        "reason": "Síntese autoral sanitizada criada para completar o Ateliê de Líthia sem inventar lore ou promover rascunhos a cânone.",
        "next_action": "preservar; futuras páginas literárias exigem seleção explícita de fonte e cânone",
    })

summary = ledger.setdefault("summary", {})
summary["public_entries_built"] = sum(
    1 for item in entries
    if item.get("status") == "published"
    and item.get("privacy") in {"public", "sanitized_approved"}
    and item.get("publication_approved") is True
)
summary["public_paths_built"] = sum(1 for item in paths if item.get("public") is True)
summary["dispositions_total"] = len(ledger.get("dispositions", []))
summary["disposition_counts"] = dict(Counter(item.get("kind") for item in ledger.get("dispositions", [])))
safe = {"published", "published_batch_a1", "published_batch_a1_annotated", "migrated", "absorbed_published", "superseded_structural"}
summary["deferred_or_review_required"] = sum(
    1 for item in ledger.get("dispositions", []) if item.get("disposition") not in safe
)
summary["failed_uploads_not_used"] = [
    item for item in summary.get("failed_uploads_not_used", [])
    if not item.startswith("25 de Jun")
]
ledger["task_id"] = "MOONVERSE_V3_COMPLETE_WIKIWAND_D1"
ledger["policy"] = "Nenhum item sem autoridade de fonte, fronteira de privacidade e aprovação explícita entra no build público; todas as alas públicas devem ter densidade editorial real, não conteúdo inventado."

site_path = SOURCE / "site.json"
site = json.loads(site_path.read_text(encoding="utf-8"))
site["build_date"] = "2026-08-03"
site_path.write_text(json.dumps(site, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

write_json("entries.json", entries)
write_json("relations.json", relations)
write_json("paths.json", paths)
write_json("migration-ledger.json", ledger)

audit_path = SOURCE / "CURRENT_STATE_AUDIT.md"
audit = audit_path.read_text(encoding="utf-8")
marker = "## V3 Complete / Wikiwand D1 — 2026-08-03"
if marker not in audit:
    audit += f"\n\n{marker}\n\nA última exceção de densidade editorial foi encerrada com `escrita-magia`, uma síntese autoral sobre escrita, preservação, worldbuilding e arquitetura de linguagem. O Ateliê de Líthia passa a ter duas entradas públicas sem invenção de lore.\n\nO corpus público passa a ter 14 entradas, 6 caminhos guiados e 32 relações evidenciadas. Todas as seis alas possuem pelo menos duas entradas públicas.\n\nA interface recebeu uma camada Wikiwand-native: cabeçalho compacto com busca global, superfícies claras, artigo central de leitura profunda, sumário persistente, ficha lateral, indicador de progresso e controle tipográfico. Não foram importados código, marca, anúncios, analytics, fontes ou componentes proprietários do Wikiwand.\n"
    audit_path.write_text(audit, encoding="utf-8")

print("Moonverse V3 D1 source mutation complete")
