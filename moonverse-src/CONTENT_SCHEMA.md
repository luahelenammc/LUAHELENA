# Moonverse Content Schema

## Entry

Required fields:

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
  "privacy": "public",
  "publication_approved": true,
  "source_kind": "authored",
  "source_refs": [],
  "tags": [],
  "body_markdown": "## Section\n\nText",
  "relations": []
}
```

Production eligibility is conjunctive:

```text
status == published
AND privacy == public OR privacy == sanitized_approved
AND publication_approved == true
```

The current source uses `public` for the approved authored entry. `sanitized`, `curated`, `draft`, imported-only and placeholder records remain source/ledger states, not public-build states.

## Relations

Relations are stored once in `data/relations.json`. The same list feeds article context, wing links and Atlas data. A relation must have a stable target and a meaning; it cannot exist just to make a diagram busier.

## Markdown

The generator preserves headings, paragraphs, unordered lists, blockquotes, emphasis, links and inline code. Imported Markdown is normalized at build time, not flattened in the browser.

## Images

No image is required when no approved asset exists. An asset entering production must have `alt`, `source`, `license`, `privacy` and `status`. The rebuild therefore uses authored geometry and inline marks instead of inventing documentary imagery.
