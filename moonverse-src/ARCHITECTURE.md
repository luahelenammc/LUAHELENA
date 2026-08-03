# Moonverse V2 — Architecture

## Boundary

`Sobre a Moon` and the named project sources remain semantic authorities. Moon Wiki is the editorial registry. Portal Moonverse is only the public rendering of entries that pass the publication gate.

```text
authorized source → editorial adjudication → public gate → static Moonverse
```

The public build never fetches Notion at runtime and never reads the private corpus. The old implementation remains under `moonverse/legacy-v0/` for lineage and rollback.

## Source to artifact

```text
moonverse-src/site.json
moonverse-src/data/*.json
moonverse-src/scripts/*.mjs
moonverse-src/src/styles/site.css
                 ↓ node scripts/build.mjs
moonverse/index.html
moonverse/entry/<slug>/index.html
moonverse/wing/<slug>/index.html
moonverse/assets/search-index.json
moonverse/assets/graph.json
```

`entries.json`, `wings.json`, `paths.json`, `relations.json` and the approved `concepts.json` feed the same static artifact. Concepts are limited public graph anchors; they cannot expose deferred entries.

## Runtime layers

- **Reading layer:** pre-rendered semantic HTML; articles remain readable with JavaScript disabled.
- **Orientation layer:** global navigation, search, wing index, timeline and article relations.
- **Enhancement layer:** theme preference, search results and mobile navigation.
- **Spatial layer:** accessible SVG/list Atlas; direct 3D Cluster integration remains separately authorized.

## Generated-file rule

Never hand-edit `moonverse/` on the source branch. The generator deletes only its known generated paths and never touches `moonverse/legacy-v0/`.

## Visual boundary

No Wikiwand visual annex was present in V2 W1/A1. The static V1 article anatomy is preserved rather than replaced by a generic redesign.
