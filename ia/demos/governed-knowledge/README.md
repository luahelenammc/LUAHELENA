# Moon Source · Animated Source Flow (V4)

**Live:** https://www.luahelena.com.br/ia/demos/governed-knowledge/  
**English:** https://www.luahelena.com.br/ia/demos/governed-knowledge/?lang=en  
**Central professional portfolio:** https://www.luahelena.com.br/ia/

## Purpose

A small animated HTML5 illustration of one Moon Source idea: **a plausible answer is not enough; an answer needs a governing source**. Five buttons replay the same transparent sequence: document cards enter, a rule-based filter checks them, and the outcome appears. The interaction is intentionally visual, not an analytics dashboard.

The five fictional cases show:
1. The approved and current policy outranking a conflicting FAQ and a superseded version.
2. A source overdue for review.
3. A case that requires a responsible human decision.
4. Two current, equally authoritative sources in conflict.
5. No source matching a topic, therefore no invented answer.

A compact optional disclosure preserves the **full source answer**, trace and seven-record register for technical inspection. Nothing is precomputed to fake the algorithmic outcomes: the five case questions are evaluated by the same existing `routeQuery` engine used in the tests.

## Files and authority

- `index.html` is the bilingual HTML5 player with accessible scenario buttons and an expandable inspection view.
- `motion-v4.css` provides the staged document, moving filter and outcome animations (desktop horizontal, mobile vertical), focus styles and a reduced-motion fallback.
- `motion-v4.mjs` coordinates visual playback and renders the real deterministic engine output.
- `engine.mjs` is the canonical unchanged routing implementation.
- `sources.json` is the original unchanged seven-record **fictional snapshot of 2026-10-03**.
- `tests.mjs` is the canonical routing-fixture suite.
- `downloads/Moon-Source-Animated-Demo-V4.html` is a **single-file offline HTML** with embedded styles, scripts, routing engine and source fixture, for testing without a local server. Google Fonts are optional and outgoing links need network access.

The V3 laboratory files remain as a historical iteration, but V4 is the active page and distribution surface.

## Running and verification

Serve the folder with a local static server for the web source files, or open the V4 single-file HTML directly from disk.

```sh
node --check ia/demos/governed-knowledge/motion-v4.mjs
node --test ia/demos/governed-knowledge/tests.mjs
```

Review all five cases in PT and EN, autoplay/replay, interruption when rapidly switching cases, mobile portrait layout, keyboard focus, expanded provenance and `prefers-reduced-motion`. Keep the interface as short as practical; technical detail should not return to the main animation.

## Limitations and authorship

**Cenário ficcional e didático. Nenhum modelo de IA gera respostas.** Matching uses registered keywords, source metadata and deterministic rules. It does not assess real policies, claim client deployment, prove enterprise readiness, or generalize to natural-language understanding. The examples and source owners are synthetic.

Architecture, specification, integration and QA: Lua Helena Moon Martins Cardoso. Implementation developed with AI assistance.
