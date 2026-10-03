# Governed Knowledge Routing Demonstrator

This public-facing prototype uses fictional sources to show a small, inspectable knowledge-routing pattern. Each source carries an identifier, owner, authority level, version, effective date, review date, status, update path, and supersession links. The deterministic engine selects the highest-authority current source, flags stale authoritative material, ignores superseded versions, exposes lower-authority disagreements, and escalates unsupported or conflicting questions.

## What is included

- `index.html` is a bilingual, keyboard-accessible browser interface.
- `sources.json` is the synthetic source register.
- `engine.mjs` contains the routing rules. It does not call an AI model or generate answers.
- `tests.mjs` is a Node test suite for conflicts, staleness, missing support, authority ranking, supersession, update propagation, and required escalation.

## Run and test

Open `index.html` through a local static server so the browser can fetch `sources.json`. Run the tests from this directory with `node --test tests.mjs`.

## Authorship and evidence boundary

Architecture, specification, integration and QA: Lua Helena Moon Martins Cardoso. Implementation developed with AI assistance.

This is a synthetic method demonstration. It does not represent a real employer, client, policy, deployment, external use, measured impact, legal assessment, or enterprise readiness. The test count describes only this fixture suite; it is not a general accuracy claim.
