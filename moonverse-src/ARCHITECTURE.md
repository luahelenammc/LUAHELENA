# Moonverse Rebuild V1 — Architecture

## Boundary

`Sobre a Moon` remains the authority source. Moon Wiki is the editorial registry. Portal Moonverse is only the public rendering of entries that pass the publication gate.

```text
authorized source → Moon Wiki/editorial review → public gate → static Moonverse
```

The public build never fetches Notion at runtime and never reads the private corpus. The branch preserves the old implementation under `moonverse/legacy-v0/` for lineage and rollback.

## Source to artifact

```text
moonverse-src/site.json
moonverse-src/data/*.json
moonverse-src/src/templates/*.mjs
moonverse-src/src/styles/site.css
                 ↓ node scripts/build.mjs
moonverse/index.html
moonverse/entry/<slug>/index.html
moonverse/wing/<slug>/index.html
moonverse/assets/search-index.json
moonverse/assets/graph.json
```

The generated artifact is plain HTML, CSS, JSON and a small progressive-enhancement script. It is compatible with the existing GitHub Pages path `/moonverse/` and does not require a server, database, framework runtime or external asset host.

## Runtime layers

- **Reading layer:** pre-rendered semantic HTML. It works with JavaScript disabled.
- **Orientation layer:** global navigation, search form, wing index, timeline and related routes.
- **Enhancement layer:** theme preference, search results, mobile navigation and optional Atlas filtering.
- **Spatial layer:** accessible SVG/list Atlas; a future 3D engine integration remains a separate authorized change.

## Generated-file rule

Never hand-edit `moonverse/` on the source branch. The generator deletes only its known generated paths and never touches `moonverse/legacy-v0/`. The generated warning in `moonverse/README.md` makes the authority visible to future maintainers.

## Why no Astro in this increment

The existing repository is a static GitHub Pages surface with no package installation contract. A small Node generator provides the same useful property—static rendering with typed JSON inputs—without adding a framework migration or a dependency lockfile solely for the portal. The source boundary remains framework-replaceable if the content volume later justifies Astro.
