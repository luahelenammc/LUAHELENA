# Moonverse Content Schema — V2

## Entry

Every entry carries both visitor-facing content and an editorial receipt:

```json
{
  "id": "stable-id",
  "slug": "canonical-url-slug",
  "title": "Visitor-facing title",
  "type": "Memória evocativa",
  "wing": "biblioteca-lunar",
  "summary": "Short index description",
  "lead": "Article lead",
  "status": "published",
  "editorial_state": "published_batch_a1",
  "privacy": "public",
  "publication_approved": true,
  "source_kind": "authored",
  "source_authority": "Named governing source",
  "source_refs": [],
  "sensitivity": "public_low",
  "sanitization_required": false,
  "sanitization_notes": "Boundary note",
  "publication_rationale": "Why this belongs in the public surface",
  "reviewed_by_moon": true,
  "reviewed_at": "2026-08-02",
  "relation_review_state": "approved_batch_a1",
  "visual_state": "baseline_v1_preserved_wikiwand_annex_pending",
  "next_action": "Chat acceptance before merge",
  "tags": [],
  "body_markdown": "## Section\n\nText",
  "relations": []
}
```

Production eligibility is conjunctive:

```text
status == published
AND privacy ∈ {public, sanitized_approved}
AND publication_approved == true
AND source_authority is named
AND reviewed_by_moon == true
```

`sanitized_approved` additionally requires `sanitization_required == true` and a nonempty `sanitization_notes` value. Deferred, curated, draft, imported-only, restricted and placeholder records remain source/ledger states.

## Relations

Relations are stored once in `data/relations.json`. The same list feeds article context and Atlas data. A relation must have a stable endpoint, a type and evidence; it cannot exist only to make a diagram busier. Endpoints may be public entries, public wings or explicitly approved public concepts from `data/concepts.json`. A relation may never target a nonpublic entry.

## Paths

Public paths must contain at least two approved public entries. Empty or insufficient paths remain in the source registry with `public: false` and a next action; they are not rendered on the home page or Wiki.

## Markdown

The generator preserves headings, paragraphs, unordered lists, blockquotes, emphasis, links and inline code. Imported material is normalized at build time, not flattened in the browser.

## Images

No image is required when no approved asset exists. An asset entering production must have `alt`, `source`, `license`, `privacy` and `status`. The current batch uses authored geometry and inline marks instead of inventing documentary imagery.
