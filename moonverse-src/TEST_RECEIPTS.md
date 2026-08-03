# Test Receipts — Moonverse V2 / Batch A1

## Local static verification

Executed on `agent/moonverse-v2-a1` after a clean build:

```text
Moonverse build complete: 6 public entries, 6 wings, 27 generated files.
Moonverse validation passed: 6 public entries; 1 public paths; 12 evidenced relations; 32 ledger dispositions; no publication leakage detected.
Moonverse smoke tests passed: 45 checks.
```

The validator checks deterministic artifact presence, 17-record reconciliation, editorial fields, named source authority, sanitization notes, reviewed-by-Moon receipts, path cardinality, relation evidence, nonpublic endpoint rejection, private URL absence, legacy placeholder exclusion, search/graph parity, internal links, semantic article routes, responsive CSS and reduced-motion support.

## Browser review

The expanded review script is configured for 14 routes across desktop, tablet and mobile, including all five Batch A1 articles and three search proofs. It also captures a night-theme state and runs desktop axe audits for every route.

Local execution was attempted but could not start because this runtime had no system Chromium. Playwright's browser download returned a truncated archive after the configured retries. Therefore local screenshots, axe and console/overflow results are not represented as passing here.

The pull-request workflow remains the authoritative browser receipt. It installs Chromium in CI, uploads screenshots/axe/Lighthouse evidence and enforces the browser gates without mutating the PR.

## Deliberate exception

The Wikiwand visual annex was absent. No Wikiwand redesign was implemented; the V1 article layout was preserved.
