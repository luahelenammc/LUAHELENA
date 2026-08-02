# Current State Audit — Moonverse v0

## Baseline

- repository: `luahelenammc/LUAHELENA`
- main HEAD: `0b7882d05086b9c5acd464f5812bfaa99ef9a73b`
- public route: `https://www.luahelena.com.br/moonverse/`
- feature branch: `feat/moonverse-rebuild-v1`
- audit date: `2026-08-02`

## What existed

The public surface combined a palace metaphor, an Atlas index and a dark editorial card grid. Its data layer contained authored page records, rooms, memory seeds, themes, privacy/taxonomy vocabularies, image registries and a Notion staging snapshot.

## Structural failure

The old implementation had two competing products: a hidden palace runtime and a visible dark card index. The home and page wrappers also used language that described the development pipeline to visitors. Notion Markdown had been flattened in the browser, so headings and lists were lost.

## Inventory

The archived baseline contains the following known files:

```text
moonverse/README.md
moonverse/index.html
moonverse/styles.css
moonverse/editorial.css
moonverse/privacy.css
moonverse/app.js
moonverse/page.js
moonverse/stock-images.js
moonverse/package.json
moonverse/data/assets.json
moonverse/data/image-prompts.json
moonverse/data/image-sources.json
moonverse/data/manifest.json
moonverse/data/memories.json
moonverse/data/notion-imports.json
moonverse/data/notion/moonwiki-biography-full-pages.json
moonverse/data/notion/moonwiki-biography-index.json
moonverse/data/pages.json
moonverse/data/privacy-states.json
moonverse/data/rooms.json
moonverse/data/taxonomy.json
moonverse/data/themes.json
moonverse/scripts/build-pages.mjs
moonverse/scripts/create-page-wrapper.mjs
moonverse/scripts/validate-data.mjs
moonverse/pages/*.html
```

The current implementation is preserved under `moonverse/legacy-v0/`. No file was deleted before that archive was created. The new root artifact no longer links to the legacy wrappers or runtime.

## Baseline evidence limitation

The local build was validated by HTTP route checks and semantic/static inspection. The cloud browser's URL policy rejected direct access to the synchronized local file, so browser-produced before/after screenshots could not be captured in this environment. This is recorded as a QA exception, not presented as a visual pass.
