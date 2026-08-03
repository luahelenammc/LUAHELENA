# Privacy and Publication Gate — V2

The portal is a public representation, not a dump of the Moon corpus.

## Production predicate

```text
status == published
AND privacy ∈ {public, sanitized_approved}
AND publication_approved == true
AND source_authority is named
AND reviewed_by_moon == true
```

Anything else is excluded from generated HTML, search index, graph data, timeline and navigation.

## Current result

Six entries pass the gate:

- `maresia`;
- `moon-source`;
- `sims`;
- `orkut-msn`;
- `infancia-digital`;
- `ecologia-espiritual`.

The remaining legacy pages, memory seeds, Notion records and historical source remain ledger-governed and outside the build.

## Sanitized records

`sanitized_approved` entries must carry a nonempty sanitization note. Batch A1 removes names, contacts, chats, old URLs, clinical material, private runtime/IP detail and unsupported chronology where those details are not necessary to the public argument.

## Prohibited leakage

The production surface must not expose staging/import language, private Notion/Drive/Blogger URLs, raw Blogger content, copied academic paragraphs, deadname or clinical detail, named adolescent contacts, unpublished article IDs, internal workflow fields or claims about private collaborators.

The old implementation may contain historical material because it is a rollback archive. It is not linked by the new public navigation and is excluded from validation scans.
