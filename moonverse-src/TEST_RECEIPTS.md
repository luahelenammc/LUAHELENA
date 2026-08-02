# Test Receipts — Moonverse Rebuild V1

Executed locally on 2026-08-02:

```text
node moonverse-src/scripts/build.mjs
Moonverse build complete: 1 public entries, 6 wings, 22 generated files.

node moonverse-src/scripts/validate.mjs
Moonverse validation passed: 1 public entries; 31 ledger dispositions; no publication leakage detected.

node moonverse-src/scripts/test.mjs
Moonverse smoke tests passed: 11 checks.
```

Additional route check:

```text
200 /moonverse/
200 /moonverse/wiki/
200 /moonverse/entry/o-cheiro-de-maresia/
200 /moonverse/wing/biblioteca-lunar/
200 /moonverse/timeline/
200 /moonverse/atlas/
200 /moonverse/about/
200 /moonverse/search/
```

The route check used a local static HTTP server. Browser screenshot capture was attempted through the review browser but rejected by its URL policy for the synchronized local file; no screenshot is claimed as captured.
