# Privacy and Publication Gate

The portal is a public representation, not a dump of the Moon corpus.

## Production predicate

```text
status == published
AND privacy ∈ {public, sanitized_approved}
AND publication_approved == true
```

Anything else is excluded from generated HTML, search index, graph data, timeline and navigation.

## Current result

Only `maresia` satisfies the predicate in this rebuild. The remaining legacy pages, six memory seeds, 24 Notion index records, two full Notion snapshots and the uploaded historical blog export are recorded in the migration ledger and deliberately remain outside the public build.

This is not content loss. It is a reversible publication decision with a named reason and a preserved source reference.

## Prohibited leakage

The production surface must not expose: staging, imported, indexed-only, wrapper, physical page, prototype, internal version state, private source URLs, clinical/family details without sanitization, or a claim that an unpublished draft is a finished article.

The old implementation may contain historical workflow language because it is a rollback archive. It is not linked by the new public navigation and carries an archive warning.
