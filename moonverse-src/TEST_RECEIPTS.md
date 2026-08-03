# Test Receipts — Moonverse Rebuild V1

## Final reviewed state

- **reviewed branch:** `feat/moonverse-rebuild-v1`
- **reviewed SHA:** `7f1fd04a6e50ce94d5a87688c836b632b63d499d`
- **workflow:** `Moonverse Review`
- **workflow run:** `30734890221` (`#9`)
- **workflow conclusion:** `success`
- **review date:** `2026-08-02`

The review workflow is pull-request scoped and read-only. It rebuilds the public artifact, verifies that generated files are committed, runs structural tests, serves the repository locally, captures browser screenshots, executes axe audits and enforces Lighthouse thresholds.

## Build and publication gate

```text
Moonverse build complete: 1 public entries, 6 wings, 22 generated files.
Moonverse validation passed: 1 public entries; 31 ledger dispositions; no publication leakage detected.
Moonverse smoke tests passed: 19 checks.
```

The generated `moonverse/` artifact matched `moonverse-src/` exactly after a clean build.

Only `O cheiro de maresia` passed the production gate. Draft, imported-only, restricted, placeholder and non-approved records remained outside HTML routes, search data and the public graph.

## Browser review

```text
21 route/viewport screenshots
1 additional night-theme screenshot
22 screenshots total
7 desktop axe audits
0 serious or critical axe violations
0 browser console errors
0 uncaught page errors
0 horizontal-overflow failures
```

Reviewed routes:

```text
200 /moonverse/
200 /moonverse/wiki/
200 /moonverse/entry/o-cheiro-de-maresia/
200 /moonverse/timeline/
200 /moonverse/atlas/
200 /moonverse/about/
200 /moonverse/search/?q=maresia
```

Each route was reviewed at desktop, tablet and mobile viewport sizes. The browser review also verified document language, page titles, one visible `h1`, theme switching and absence of horizontal overflow.

## Lighthouse

| Surface | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home | 100 | 100 | 96 | 100 |
| Article | 100 | 100 | 96 | 100 |

Required thresholds were met:

- performance: `>= 90`;
- accessibility: `>= 95`;
- best practices: `>= 95`;
- SEO: `>= 95`.

## Corrections discovered by QA

The first observable browser pass correctly rejected the implementation. The following issues were fixed before the successful final run:

- low-contrast small editorial text;
- low-contrast numbered wing markers;
- an interactive SVG incorrectly exposed as a static image role;
- a theme-toggle test that began in dark mode and then expected a click to remain dark;
- invalid or absent curated-path targets;
- duplicated home title;
- visitor-facing leakage of implementation vocabulary;
- publication-gate inconsistency between `public` and `sanitized_approved` states.

## Evidence artifact

The successful workflow uploaded the artifact:

```text
moonverse-review-7f1fd04a6e50ce94d5a87688c836b632b63d499d
artifact ID: 8829222139
SHA-256: 8f0c4c2b6233d1358eed18113f18bee6fbf76b6693bf55304ddd330610616268
retention: 30 days
```

It contains screenshots, axe results, browser measurements, Lighthouse reports and the machine-readable QA receipt.

## Remaining deliberate deferrals

- Direct 3D Cluster Engine integration remains outside this PR. V1 uses an accessible deterministic SVG/list Atlas.
- Content breadth remains intentionally small until further entries receive explicit editorial and privacy approval.
- No production deployment, merge or root-site change was performed.
