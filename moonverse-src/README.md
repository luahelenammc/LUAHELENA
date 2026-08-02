# Moonverse Public Surface — Rebuild V1

This is the source application for the static Portal Moonverse rebuild.

```bash
npm run check
npm run preview
```

The generator writes to `../moonverse/` and never removes `../moonverse/legacy-v0/`. The public output is intentionally conservative: only entries that pass the publication predicate are rendered.

The old surface is not the source of truth. It exists under `moonverse/legacy-v0/` for lineage and rollback.
