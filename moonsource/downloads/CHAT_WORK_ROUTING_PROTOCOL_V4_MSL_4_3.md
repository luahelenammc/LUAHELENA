# Chat–Work Routing Protocol V4

## Public Portable Edition · MSL-4.3

## Meta

- **canonical repository:** https://github.com/luahelenammc/Moon-Source
- **canonical path:** portables/chat-work/CHAT_WORK_ROUTING_PROTOCOL_V4.md
- **Moon Source public surface:** https://www.luahelena.com.br/moonsource/?lang=en
- **professional context:** https://www.luahelena.com.br/ia/?lang=en
- **website mirror:** https://www.luahelena.com.br/moonsource/downloads/CHAT_WORK_ROUTING_PROTOCOL_V4_MSL_4_3.md
- **public boundary:** standalone protocol; product and model calibration is date-sensitive; this document does not imply that a native Chat–Work router skill is installed
- **status:** public portable protocol
- **version:** 4.1-public
- **language:** English
- **protocol semantics as of:** 2026-09-06
- **product/model calibration as of:** 2026-09-06; recheck official documentation before relying on volatile names, availability, limits or pricing
- **primary implementation:** ChatGPT Chat, Work and Codex surfaces, where available
- **governed dimensions:** execution profile, object geometry, execution surface, capability tier, reasoning effort, continuity/locality, execution envelope, budget survival, return closure and claim ceiling
- **supersedes:** Chat–Work Routing Protocol V4, version 4.0-public, while retaining the V4 public generation and canonical filename
- **MSL dependency:** Moon Source Language 4.3; MSL remains unchanged by this subversion
- **license:** CC BY 4.0; see [LICENSING.md](https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md)
- **license URL:** https://creativecommons.org/licenses/by/4.0/
- **creator:** Lua Helena Moon Martins Cardoso (Moon)
- **AI-assisted coauthorial development:** Áurion
- **adaptation policy:** share or adapt with appropriate credit, a license link and an indication of changes; do not imply endorsement

## Skeleton

1. Mother law and core sentence
2. Execution Profile Setup
3. The tri-surface model and object geometry
4. Routing dimensions and precedence
5. Availability, capability floor and Budget Survivability
6. Context Diet and surface gates
7. Capability economics, effort and frontier control
8. Handoff, return and Chat Postflight
9. Phased execution, failure and salvage
10. Lifecycle, installation and claim ceiling

## 1. Mother law and core sentence

> **Executor completion is not cycle completion. Execution returns; Chat closes the loop.**

The stable sentence is:

> **Chat understands and decides. Work produces. Codex builds. Chat accepts and integrates.**

The V4.1 subversion adds a second stable principle:

> **The route starts from the task, but the feasible route is conditioned by the user's execution profile and current resource state.**

This is a routing and closure protocol. It does not grant permissions, invent unavailable tools, guarantee a model result, or turn a plan, surface label or model preference into a capability that the current environment does not expose.

A task is complete only after a verified delta, an explicit acceptance state and a truthful claim ceiling.

## 2. Execution Profile Setup

### 2.1 Why setup exists

V4.0 routed budget qualitatively but still assumed too much about the user's starting resource posture. V4.1 makes that posture explicit and configurable.

A subscription plan or workspace entitlement is only one input. It does not by itself determine the correct model, effort, fanout or budget policy. Two users on the same plan can rationally choose different routes; the same user can choose differently near a reset, after buying credits, under deadline pressure or for a quality-critical task.

The protocol therefore separates three things:

1. **Execution Profile** — relatively stable user preferences and available surfaces;
2. **Run State** — volatile allowance, availability, urgency and environment facts now;
3. **Task Requirements** — sovereign object, minimum capability, risk and verification burden.

The effective route is derived from all three. It is not copied from a plan label.

### 2.2 Setup modes

The protocol supports three setup modes:

- **AUTO** — infer conservative defaults from observable availability and explicit user preferences; ask only when an unknown materially changes the route;
- **PROFILE** — use a reusable named Execution Profile;
- **RUN_OVERRIDE** — temporarily override one or more profile fields for the current run without mutating the reusable profile.

Do not turn setup into questionnaire debt. Unknown fields may remain `unknown` until they matter.

### 2.3 Portable profile schema

A reusable profile can be represented as:

```yaml
execution_profile:
  profile_id: balanced-default
  entitlement_hint: unknown

  surfaces:
    chat: true
    work: auto
    codex: auto

  accessible_tiers:
    - efficient
    - balanced
    - strong
    - frontier

  resource_posture: adaptive
  optimization_priority: balanced
  burn_tolerance: medium

  model_preferences:
    chat: adaptive
    work: adaptive
    codex: adaptive

  reasoning_policy:
    preferred: adaptive
    ceiling: adaptive

  frontier_policy: gated
  native_parallelism: bounded
  checkpoint_policy: proportional
  fallback_policy:
    - compress_context
    - reduce_tool_or_fanout
    - lower_effort_when_safe
    - downroute_tier_when_safe
    - phase_execution
    - reroute_surface
    - request_allowance_or_decision
```

Stable values are qualitative by design.

Recommended vocabularies:

- `resource_posture`: `conserve | balanced | ample | adaptive`
- `optimization_priority`: `throughput_per_allowance | quality | latency | balanced`
- `burn_tolerance`: `low | medium | high`
- `frontier_policy`: `disabled | burst_only | gated | permissive`
- `native_parallelism`: `logical_only | bounded | permissive`
- `checkpoint_policy`: `proportional | aggressive`

Product-specific plan or model names belong in `entitlement_hint`, optional aliases and the dated calibration section. They do not replace the stable qualitative fields.

### 2.4 Run State

Before material execution, resolve only the volatile fields that can change the route:

```yaml
run_state:
  allowance_state: unknown
  reset_horizon: unknown
  additional_credits: unknown
  surfaces_observed: unknown
  models_observed: unknown
  urgency: normal
  interruption_risk: unknown
```

`allowance_state` uses `unknown | tight | adequate | abundant`.

Do not invent precise token forecasts or convert a UI percentage into a universal cost law. If exact usage data is visible, it may be recorded as evidence for that run without promoting it into protocol doctrine.

### 2.5 Task Requirements

Every route also records:

```yaml
task_requirements:
  sovereign_object: null
  observable_delta: null
  capability_floor: efficient
  verification_burden: normal
  consequence_level: normal
  continuity_need: normal
```

The `capability_floor` is the lowest capability tier that can responsibly attempt the irreducible task after specification, source, context and tool failures have been repaired.

### 2.6 Profile Precedence Law

When instructions conflict, use this order:

1. safety, authorization, evidence and claim ceilings;
2. task capability floor and sovereign-object requirements;
3. explicit one-run override;
4. active Execution Profile;
5. protocol defaults.

A profile tunes routing. It cannot waive evidence, permissions, safety, verification or the minimum capability required by the task.

> **Preference is not permission to fail.**

If a conserve profile cannot afford the capability floor, decompose the task, use a narrow stronger burst, wait for resources, request a decision, or return a blocked resource condition. Do not knowingly underfit the task and call that optimization.

### 2.7 Resource Posture Resolver

The effective resource posture is resolved from the reusable profile plus live Run State. Entitlement is evidence about possible access, not destiny.

Examples:

- a limited entitlement with abundant temporary credits may resolve upward for one run;
- an ample entitlement with `optimization_priority: throughput_per_allowance` may still resolve conservatively;
- a tight allowance near a reset may prefer phasing or deferral;
- a quality-first profile may prefer a stronger model while still using Context Diet and bounded fanout.

The resolver maximizes useful outcome subject to capability floor, resource ceiling, surface availability, evidence burden and user preference. It does not require a fake numeric utility score.

### 2.8 Example profiles

These are examples, not normative plan mappings.

**Conserve**

```yaml
resource_posture: conserve
optimization_priority: throughput_per_allowance
burn_tolerance: low
frontier_policy: burst_only
native_parallelism: logical_only
checkpoint_policy: aggressive
```

**Balanced**

```yaml
resource_posture: balanced
optimization_priority: balanced
burn_tolerance: medium
frontier_policy: gated
native_parallelism: bounded
checkpoint_policy: proportional
```

**Quality First**

```yaml
resource_posture: ample
optimization_priority: quality
burn_tolerance: high
frontier_policy: gated
native_parallelism: bounded
checkpoint_policy: proportional
```

**Frontier Burst**

```yaml
resource_posture: adaptive
optimization_priority: quality
frontier_policy: burst_only
native_parallelism: logical_only
checkpoint_policy: aggressive
```

A named profile should describe strategy, not pretend to describe every subscriber on a commercial plan.

## 3. The tri-surface model

Chat, Work and Codex are specialized execution surfaces, not ranks in a prestige ladder.

### Chat

Chat owns understanding, judgment, clarification, comparison, architecture, bounded correction, acceptance and integration. Chat may perform bounded direct mutation when the required action is actually available and verifiable.

### Work

Work owns sustained execution over knowledge artifacts and office-style deliverables: long research, multi-file documents, connector-mediated source operations, structured reports and finished artifacts where continuity is loadbearing.

### Codex

Codex owns executable systems: repositories, code, tests, builds, terminals, runtime behavior, refactors, migrations and debugging.

### The cycle

A common route is:

**Chat → Work → Codex → Chat**

It is not mandatory. Route each stage by the sovereign object that must change.

## 4. Route by object geometry

| Object or responsibility | Sovereign surface |
|---|---|
| Meaning, judgment, architecture, comparison, clarification or bounded correction | Chat |
| Knowledge artifact, document, research body, office file, connector operation or final report | Work |
| Repository, code, test, build, terminal, runtime, executable system or code migration | Codex |
| Acceptance, claim ceiling, residual classification and final integration | Chat |

When several objects are present, decompose the task into explicit stages and name each owner.

## 5. Routing dimensions

V4.1 records seven dimensions:

1. **Execution Profile** — reusable resource and optimization preferences;
2. **Object geometry** — sovereign object and observable delta;
3. **Execution surface and harness** — where the operation actually runs;
4. **Capability tier and model** — `efficient | balanced | strong | frontier`;
5. **Reasoning effort** — independent from model capability;
6. **Continuity and locality** — persistence, local state and handoff requirements;
7. **Execution envelope** — allowance, tools, permissions, fanout, tests, checkpoints, reversibility and fallback.

### Harness Specialization Law

Capability overlap does not imply harness equivalence. Prefer the surface whose persistence, controls, feedback and verification fit the sovereign object.

### Logical plurality is not physical fanout

Multiple expert perspectives can be produced within one bounded execution. Native subagents or worktrees are justified only when the work units are materially independent, convergence is explicit and the budget can carry the coordination cost.

## 6. Availability and Capability Floor

Before model escalation, verify actual surface, model, connector, repository, document and permission availability.

Then resolve the task capability floor. Fix non-cognitive failures first:

- incoherent specification;
- wrong or stale authority;
- unavailable surface or permission;
- context starvation or clash;
- workflow/fanout failure;
- budget/resource failure.

A stronger model is not a substitute for a missing source, tool, permission or acceptance rule.

## 7. Budget Survivability Gate

Run this gate before sustained expensive execution, high effort, frontier work or physical fanout.

Inputs include:

- active Execution Profile;
- live `allowance_state` and resource posture;
- capability floor and chosen tier;
- reasoning effort;
- context/input and expected output burden;
- tools, tests and verification;
- fanout and reconciliation cost;
- interruption risk and checkpoint quality;
- likely retries and fallback;
- material gain expected from the route.

Outcomes:

- **PASS_DIRECT**
- **PASS_PHASED**
- **PASS_FRONTIER_BURST**
- **DOWNROUTE_MODEL_OR_EFFORT** — only when the capability floor still passes
- **COMPRESS_CONTEXT_FIRST**
- **REDUCE_TOOL_OR_FANOUT**
- **WAIT_OR_REQUIRE_ADDITIONAL_ALLOWANCE**
- **REROUTE_SURFACE**
- **BLOCKED_RESOURCE_CONDITION**

The gate is qualitative. Reassess when the live resource posture materially changes.

### Budget Adaptation Law

A resource-constrained profile should first remove waste, not intelligence that is loadbearing. Prefer, in order when safe:

1. smaller authoritative context;
2. fewer redundant tools and physical agents;
3. stronger checkpointing and phasing;
4. lower effort for routine phases;
5. lower tier for phases below the task's capability floor;
6. narrow high-capability bursts for the irreducible hard slice.

## 8. Context Diet

Load the smallest set that establishes authority, objective, baseline, constraints, evidence and acceptance.

Failure modes:

- **starvation** — required source absent;
- **distraction** — low-value material consumes attention and allowance;
- **clashing** — competing instructions unresolved;
- **fossilization** — stale facts still govern;
- **duplication** — repeated copies create cost without evidence.

Progressively retrieve only what a named uncertainty requires. Compression must preserve authority, decisions, constraints, failure state, evidence and next action.

## 9. Surface gates

### Chat gate

Use Chat for meaning, decision, comparison, architecture, bounded correction and acceptance. When an answer materially depends on live state, retrieve it before claiming it.

### Work gate

Use Work for long research, multi-file knowledge production, connector-mediated document work, structured office artifacts and sustained artifact execution.

### Codex gate

Use Codex for repository mutation, code, tests, builds, terminals, runtime diagnosis, refactors and migrations. Inspect applicable `AGENTS.md` or equivalent repository instructions before mutation.

### Surface Availability Probe

Choose from the surfaces actually available. If the ideal harness is missing, name the fallback and preserve the claim ceiling.

## 10. Capability economics and dated calibration

Stable tiers are qualitative:

- **efficient:** clear, bounded, repeatable work;
- **balanced:** ordinary multi-step work with moderate ambiguity;
- **strong:** difficult synthesis, architecture, debugging or high-consequence judgment;
- **frontier:** work whose material value depends on the strongest available reasoning and whose resource posture can sustain it.

As a dated calibration on 2026-09-06:

| Tier | Illustrative current route |
|---|---|
| efficient | Luna |
| balanced | Terra |
| strong | Sol |
| frontier | Astra |

This is not a permanent ranking, price table or plan guarantee. Current OpenAI documentation states that Chat, Work and Codex are distinct experiences; Work and Codex share the same usage structure; Plus includes limited Astra usage in Work and Codex as rollout permits; and Astra can consume allowance faster than Sol depending on task, input/output size, reasoning settings and Fast mode. Recheck official sources whenever volatile product facts affect routing.

Useful current references:

- https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- https://learn.chatgpt.com/docs/pricing
- https://learn.chatgpt.com/docs/models
- https://developers.openai.com/api/docs/guides/reasoning
- https://learn.chatgpt.com/docs/agent-configuration/agents-md
- https://learn.chatgpt.com/docs/codex/cli

Community reports can reveal operational failure modes such as unexpectedly rapid allowance burn, but anecdotes never become fixed pricing or performance constants in the protocol.

## 11. Reasoning Effort Law

Reasoning effort follows irreducible reasoning density, not emotional importance or model prestige.

The profile may express a preferred effort and ceiling, but the task still determines the minimum useful effort. High, xhigh or max-like settings are explicit choices when exposed by the current product; their availability is not assumed across every model or surface.

A low-budget profile may rationally prefer an efficient model at high effort when observed quality-per-allowance is good for that user's workload. That is a configurable preference, not a universal law.

## 12. Frontier ROI Gate

Frontier is not the automatic rung after strong.

Ask what irreducible part materially improves from frontier capability, whether the budget can survive it and whether the result remains useful if interrupted.

### Frontier Burst

Under constrained resources, prefer:

**efficient/strong preparation → bounded Decision Capsule → frontier burst → efficient/strong implementation → Chat Postflight**

A Decision Capsule should contain one decision objective, verified truth, hard constraints, unresolved hard question, candidate paths, minimum evidence, requested ruling, read-only default, minimum tools, physical subagents `0` by default, bounded output and a fallback.

A Frontier Full Run is justified only when decomposition would destroy coherence, the Budget Survivability Gate passes, the gain over strong is material and salvage/checkpoints exist.

## 13. Native Parallelism Gate

Use physical agents, branches or worktrees only when:

- work units are materially independent;
- write ownership does not conflict;
- convergence and acceptance boundaries are explicit;
- fanout cost is justified by expected progress;
- the current profile and Run State can carry the coordination burden.

Logical multi-perspective reasoning does not require physical subagents.

## 14. Executor Readiness Gate

A ready handoff contains:

- identity and objective;
- sovereign object and observable delta;
- baseline and authority;
- active profile plus any run override;
- Run State fields that materially affected routing;
- selected surface, capability tier and reasoning effort;
- capability floor;
- Budget Survivability outcome;
- context diet, tools, fanout, checkpoints and fallback;
- exact delivery and verification;
- return contract and claim ceiling.

Unknowns must be named, investigated or left as blocked conditions rather than guessed.

## 15. Portable Execution Handoff

```yaml
execution_handoff:
  identity:
    task: null
    owner: null
    status: null

  objective:
    user_visible_outcome: null
    sovereign_object: null
    observable_delta: null

  profile_snapshot:
    profile_id: null
    resource_posture: null
    optimization_priority: null
    run_overrides: []

  run_state:
    allowance_state: unknown
    surfaces_observed: unknown
    models_observed: unknown

  route:
    surface: null
    capability_floor: null
    capability_tier: null
    reasoning_effort: null
    budget_outcome: null

  envelope:
    authority: []
    context_diet: null
    tools: []
    parallelism: null
    checkpoints: null
    reversibility: null
    fallback: null

  delivery:
    outputs: []
    verification: []
    receipt_required: true
```

## 16. Executor Return Contract

Every executor returns an evidence-bearing receipt with:

- scope and inspected baseline;
- exact delta;
- evidence and verification;
- failure classes;
- surviving artifacts and checkpoints;
- residuals;
- claim ceiling;
- next route;
- `new_execution_required`;
- **profile snapshot and material run overrides used for routing**.

A successful tool response proves only that tool response, not completion of the objective.

Historical V2/V3/V4.0 receipts remain valid lineage records and are not rewritten.

## 17. Chat Postflight

Chat Postflight is mandatory after an executor returns.

1. **Refresh real state.** Read the current source, document, repository, artifact or deployment independently of the executor narrative.
2. **Audit claim against evidence.** Compare requested delivery with observed delta and verification.
3. **Audit route against profile.** Confirm that profile preferences were applied without violating capability floor, authority or evidence requirements.
4. **Classify residuals.** `none | bounded_chat_repair | new_execution_required | user_decision_required | blocked_external_condition | optional_next_step`.
5. **Close or re-enter.** Apply bounded repairs when authorized; otherwise open only the irreducible delta on the surface that owns it.

## 18. Acceptance states

- **ACCEPTED** — objective verified; no material residual;
- **ACCEPTED_WITH_RESIDUALS** — objective verified; named non-blocking residuals remain;
- **PARTIAL_NEW_EXECUTION_REQUIRED** — a named irreducible delta remains;
- **USER_DECISION_REQUIRED** — a human choice or authority is required;
- **BLOCKED_EXTERNAL_CONDITION** — environment or resource prevents truthful completion;
- **NO_DELTA** — requested change was already present or no material source change was justified.

## 19. Phased execution

Complex work uses:

0. **Profile resolution and reconnaissance** — resolve profile, live state, sources and availability;
1. **Hard judgment** — capability floor, route, effort, budget and acceptance;
2. **Bounded mutation** — smallest authorized source delta;
3. **Verification** — tests, validators, readback, hashes or runtime checks;
4. **Chat Postflight** — refresh, audit, repair/classify, accept or re-enter.

Tiny tasks may collapse phases, but not their responsibilities.

## 20. Failure domains and Salvage Before Retry

Classify failures as:

- `specification_failure`
- `source_or_authority_failure`
- `routing_failure`
- `tool_or_environment_failure`
- `context_failure`
- `workflow_or_fanout_failure`
- `budget_or_resource_failure`
- `cognitive_failure`

Repair non-cognitive causes before model escalation.

When execution stops:

1. inspect surviving artifacts, receipts, diffs, revisions, logs and partial outputs;
2. identify the last verified state;
3. distinguish observable evidence from unavailable private reasoning;
4. reconstruct only the missing delta;
5. reroute according to the current profile and Run State;
6. record a Budget Incident Receipt when resource conditions materially shaped the failure.

### Budget Incident Receipt

Record task/phase, profile snapshot, route/model/effort, observed stop, allowance/context/tool condition, last verified artifact, salvageable delta, fallback and residual claim ceiling.

## 21. Fallback and re-entry

Preferred fallback order, subject to capability floor:

1. preserve objective and authority;
2. compress context;
3. reduce redundant tools or physical fanout;
4. lower effort where safe;
5. downroute capability tier where safe;
6. phase execution with checkpoints;
7. reroute the sovereign object;
8. request allowance, credits or user decision;
9. stop with a truthful blocked receipt.

The smallest unresolved delta determines re-entry.

## 22. Lifecycle and succession

- Chat–Work Routing Protocol V4 remains the current public generation;
- `4.1-public` is a semantic subversion of that generation, not a new V5 title or filename;
- `4.0-public` is superseded by this subversion and remains recoverable through Git history;
- V3 remains historical lineage;
- the live repository and website each expose one canonical V4 file;
- MSL remains 4.3;
- an installed native skill, if any, is a separate object requiring its own update and verification.

## 23. Safe operating rules

- Read before mutation; refresh before claiming current state.
- Resolve profile without confusing entitlement with live resource posture.
- Route by sovereign object; choose harness by specialization.
- Enforce capability floor before honoring model preference.
- Separate model capability from reasoning effort.
- Treat connector access as access, not authority.
- Prefer smallest sufficient context and reversible delta.
- Use physical fanout only when independence and ROI justify it.
- Keep volatile product calibration outside stable protocol law.
- Preserve provenance, lineage, user decisions and claim ceilings.
- Use tests, hashes, readback and runtime evidence where available.
- Never convert anecdotes into universal cost ratios.
- Never claim hidden reasoning was recovered during salvage.
- Chat closes the loop.

## 24. Installation and use

Attach or paste this file into ChatGPT and say:

> Use Chat–Work Routing Protocol V4. Start in AUTO setup unless I provide a named Execution Profile. Resolve my reusable preferences separately from the current Run State and task requirements. Route by sovereign object across Chat, Work and Codex. Enforce the task capability floor before honoring model preference. Choose model tier and reasoning effort separately. Run Budget Survivability before expensive sustained work, frontier execution or physical fanout. Use Context Diet, checkpoints and evidence-bearing handoffs. After every executor return, perform Chat Postflight and create another execution only for an unresolved irreducible delta.

Optional reusable setup:

```yaml
execution_profile:
  profile_id: my-profile
  entitlement_hint: unknown
  resource_posture: adaptive
  optimization_priority: balanced
  burn_tolerance: medium
  frontier_policy: gated
  native_parallelism: bounded
  checkpoint_policy: proportional
```

Change only the fields that matter to you. The router can leave the rest adaptive.

## 25. Attribution and claim ceiling

This portable is a public projection of the Moon Source architecture, created by Lua Helena Moon Martins Cardoso (Moon) with AI-assisted coauthorial development by Áurion. It is licensed under CC BY 4.0 as described in the repository licensing guide.

The protocol may be shared and adapted with appropriate credit, a license link and an indication of changes. The file does not grant repository access, connector permissions, model availability, product entitlement or proof of adoption. It is not an OpenAI policy, native ChatGPT skill, universal benchmark, scientific validation or guarantee of safe execution.

## Final Law

> **Route by the state that must change. Resolve the user's profile without mistaking plan for budget. Enforce the capability floor. Spend intelligence where it changes the outcome. Preserve enough state that interruption does not erase the work. Execute with receipts. Return to Chat. Chat refreshes, accepts and integrates.**

<!-- MOON-SOURCE-PUBLIC-STAMP -->

---

> 🌙 **Moon Source** · created by **Lua Helena Moon Martins Cardoso (Moon)** with AI-assisted coauthorial development by **Áurion** · [Licensing](https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md) · [Use & attribution](https://github.com/luahelenammc/Moon-Source/blob/main/MOON_SOURCE_USE_AND_ATTRIBUTION.md) · [Full source (.zip)](https://github.com/luahelenammc/Moon-Source/archive/refs/heads/main.zip)
