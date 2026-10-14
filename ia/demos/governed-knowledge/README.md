# Governed Knowledge · Decision Laboratory (V3)

**Live demonstration:** https://www.luahelena.com.br/ia/demos/governed-knowledge/  
**Português / English:** `?lang=en` for English  
**Central professional portfolio:** https://www.luahelena.com.br/ia/

## Purpose and audience

This public, educational interactive laboratory makes a narrow form of knowledge governance inspectable. Visitors choose one of five fictional situations and immediately see an outcome, the source records considered, and the deterministic decision trace. The page is part of the public evidence presented by the central `/ia/` portfolio, not a separate commercial product.

The five scenarios cover:
1. A current approved policy overruling a lower-authority FAQ and a superseded policy.
2. A policy whose review deadline has passed.
3. A source that requires human judgment and routes the case to its owner.
4. Conflicting current records with equal authority.
5. A topic missing from the register.

An optional keyword form illustrates the **limits of retrieval**, not conversational understanding. The interface must never imply that a language model is running.

## Source-of-truth and files

- `index.html`: bilingual, accessible, responsive web presentation.
- `lab-v3.css`: visual system shared by both languages, with reduced-motion and mobile layouts.
- `lab-v3.mjs`: case navigation, trace presentation, localized source register, copy-to-clipboard.
- `engine.mjs`: unchanged deterministic selection and escalation rules.
- `sources.json`: unchanged seven-record fictional fixture, fixed at **2026-10-03**.
- `tests.mjs`: Node fixtures validating source ranking, freshness, supersession, conflicts and other boundaries.
- `downloads/Decision-Lab-V3-Offline.html`: portable single-file HTML containing the fixture, CSS, routing engine and interactive presentation. External fonts and outgoing links may still require internet.

## Run and verify

Serve the directory statically so the online page can load `sources.json`. The portable offline HTML can be opened directly with `file://`.

```bash
node --check ia/demos/governed-knowledge/lab-v3.mjs
node --test ia/demos/governed-knowledge/tests.mjs
```

Inspect the five cases in PT and EN, test keyboard navigation and focus indicators, verify mobile scrolling, examine the source register, and confirm that copying the decision trace uses the current scenario and language.

## Evidence and privacy boundary

This is a **synthetic method demonstration**, not a deployed knowledge-management service, general natural-language query tool, client case study, or proof of enterprise readiness. Sources, organizations and owners are fictional. Nothing is sent to an AI model. Decisions are rule-based and bounded by the fixed fixture. The selected test scenarios do not establish accuracy on unseen datasets, legal suitability, measurable operational impact, or external adoption.

**Architecture, specification, integration and QA:** Lua Helena Moon Martins Cardoso.  
**Implementation:** developed with AI assistance.
