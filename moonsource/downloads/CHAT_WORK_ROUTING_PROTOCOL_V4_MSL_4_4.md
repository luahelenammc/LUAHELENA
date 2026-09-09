# Chat–Work Routing Protocol

*Cross-surface execution routing and closure across Chat, Work and Codex*

## Public Portable Edition · Version 4.4-public

## Meta

- **canonical repository:** https://github.com/luahelenammc/Moon-Source
- **canonical path:** portables/chat-work/CHAT_WORK_ROUTING_PROTOCOL_V4.md
- **Moon Source public surface:** https://www.luahelena.com.br/moonsource/?lang=en
- **professional context:** https://www.luahelena.com.br/ia/?lang=en
- **website mirror:** https://www.luahelena.com.br/moonsource/downloads/CHAT_WORK_ROUTING_PROTOCOL_V4_MSL_4_4.md
- **public boundary:** standalone protocol; product and model calibration is date-sensitive; this document does not imply that a native Chat–Work router skill is installed
- **status:** public portable protocol
- **version:** 4.4-public
- **language:** English
- **protocol semantics as of:** 2026-09-07
- **product/model calibration as of:** 2026-09-06; recheck official documentation before relying on volatile names, availability, limits or pricing
- **primary implementation:** ChatGPT Chat, Work and Codex surfaces, where available
- **Codex boundary:** optional execution capability; never assumed installed, enabled, available or desired
- **governed dimensions:** execution profile, object geometry, execution surface, capability tier, reasoning effort, continuity/locality, execution envelope, budget survival, distillation, return closure and claim ceiling
- **supersedes:** Chat–Work Routing Protocol V4, version 4.3-public, while retaining the V4 public generation and canonical filename
- **MSL dependency:** Moon Source Language 5.0; the protocol remains independently versioned at 4.4-public.
- **license:** CC BY 4.0; see [LICENSING.md](https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md)
- **license URL:** https://creativecommons.org/licenses/by/4.0/
- **creator:** Lua Helena Moon Martins Cardoso (Moon)
- **AI-assisted coauthorial development:** Áurion
- **adaptation policy:** share or adapt with appropriate credit, a license link and an indication of changes; do not imply endorsement

## Skeleton

1. Mother law and core sentence
2. Execution Profile Setup
3. The tri-surface model and workload-shaped object routing
4. Routing dimensions and precedence
5. Availability, capability floor and Budget Survivability
6. Context Diet and surface gates
7. Capability economics, effort, distillation and frontier control
8. Handoff, return and Chat Postflight
9. Phased execution, failure and salvage
10. Lifecycle, installation and claim ceiling

## First use

### What this is

Chat–Work is an instruction-level routing and closure protocol. It helps an AI read the task, separate surface, model, reasoning effort, capability and context, coordinate execution across Chat, Work and optional Codex, and return a decision-bearing result for acceptance.

### Do I install anything?

No. Loading or attaching this file does not install a native ChatGPT router, create privileged OpenAI access or switch a surface, model or reasoning setting. The protocol can only use capabilities that the current product surface actually exposes.

### Start here

Read this canonical file and say:

```text
Read and apply the Chat–Work Routing Protocol to this task.
Start in AUTO.
Before execution, tell me the recommended surface/model/reasoning route and clearly tell me if I need to make any manual switch in the UI.

Task: [describe what you want done]
```

You do not need a frontier model just to initialize the protocol. Start in Chat with a sufficiently capable, sustainable model and let the protocol escalate only when the task's capability floor or reasoning demand actually requires it.

### What happens next

The protocol should disclose the route that materially shaped the decision, prepare a bounded handoff when another surface is needed, distinguish a requested switch from a switch that actually occurred, let the executor produce the work and return the result to Chat for postflight, acceptance and closure.

### Manual / unavailable capability boundary

You may need to change the surface, model or reasoning setting manually, attach the canonical file, approve an external action or provide a connector/source. `AUTO` means “let the protocol route this task”; it does not mean the interface will switch itself. If a surface or model is unavailable, the protocol must say so and give the closest honest route rather than pretending that a switch happened.

### Tiny example

For a multi-file documentation change, ask Chat–Work to recommend the execution route, make any UI change it identifies, let the available executor perform the bounded edit and return the result to Chat for verification and closure. The presence of a ZIP or a prestigious model label does not decide the route by itself.

### If the first result goes wrong

If the response only audits the session, provide a concrete task and explicitly ask it to apply the protocol operationally. If the route is too expensive or overbuilt, ask for the smallest sustainable route that still passes the task's capability floor and preserves the return/closure loop.

### What this portable does not claim

It does not guarantee access to Work, Codex or frontier models, automatic model or surface switching, entitlement or allowance changes, universal token savings or quality gains, or that model routing itself was invented here.

## 1. Mother law and core sentence

> **Executor completion is not cycle completion. Execution returns; Chat closes the loop.**

The stable sentence is:

> **Chat understands and decides. Work produces. Codex builds when available and enabled. Chat accepts and integrates.**

The V4.2 subversion added the profile-conditioned route principle. V4.3 added a distillation principle. V4.4 adds a connector-aware source transport contract:

> **Escalate only the irreducible delta; return only the decision-bearing delta.**

> **Transport source references with authority, freshness and fallback; a locator is not authority.**

This is a routing and closure protocol. It does not grant permissions, invent unavailable tools, guarantee a model result, or turn a plan, surface label or model preference into a capability that the current environment does not expose.

A task is complete only after a verified delta, an explicit acceptance state and a truthful claim ceiling.

## 2. Execution Profile Setup

### 2.1 Why setup exists

V4.0 routed budget qualitatively but still assumed too much about the user's starting resource posture. V4.1 made that posture explicit and configurable; V4.2 hardened first use, surface availability and handoff transport. V4.3 generalizes bounded capability escalation into a tier-neutral distillation loop.

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

### 2.2.1 First-use defaults and AUTO disclosure

A first use should be low-friction and conservative. The router may begin with this logical default without claiming that any field is stored or that an unknown surface is available:

```yaml
execution_profile:
  profile_id: default
  persistence: ephemeral
  entitlement_hint: unknown

  surfaces:
    chat:
      state: available
      enabled: true
    work:
      state: unknown
      enabled: auto
    codex:
      state: unknown
      enabled: false

  accessible_tiers: unknown
  resource_posture: adaptive
  optimization_priority: balanced
  burn_tolerance: medium

  reasoning_policy:
    preferred: adaptive
    ceiling: adaptive

  frontier_policy: gated
  native_parallelism: bounded
  checkpoint_policy: proportional
```

AUTO is low-friction, not invisible. For non-trivial work, disclose the minimum routing state that materially shaped the decision:

```text
Setup: AUTO
Observed: Chat available; Work unknown; Codex disabled
Resource posture: adaptive
Optimization: balanced
Unknowns affecting route: allowance state
```

The disclosure is a run-level observation, not a promise that the inferred settings persist.

A one-run override may request Codex without changing a reusable profile:

```yaml
run_override:
  surfaces:
    codex:
      enabled: true
```

Enabling does not prove availability; the router still probes the surface before routing work to it.



### 2.3 Portable profile schema

A reusable profile can be represented as:

```yaml
execution_profile:
  profile_id: balanced-default
  persistence: persistence_unknown
  entitlement_hint: unknown

  surfaces:
    chat:
      state: unknown
      enabled: auto
    work:
      state: unknown
      enabled: auto
    codex:
      state: unknown
      enabled: false

  accessible_tiers: unknown

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

For surfaces, `state` means observed availability and uses `available | unavailable | unknown`. `enabled` means activation intent and uses `true | false | auto`. Enabling a surface does not prove that it is available; availability does not imply consent to use it. The stable tier taxonomy is separate from the tiers actually accessible in the current environment. Until probed, `accessible_tiers` remains `unknown` or `auto`, never a list inferred from a plan label.

### Profile Persistence Law

A named Execution Profile is reusable only if it is actually stored in a persistent location available to the current environment, such as user instructions, a project source, a repository instruction file, a connected document, a native setting or explicitly re-supplied configuration. A profile named inside one prompt is `ephemeral_profile` unless persistence is evidenced. Use `persistent_profile` only when storage is verified; use `persistence_unknown` when the storage boundary cannot be established. The profile field may use `ephemeral | persistent | unknown`; the claim labels are `ephemeral_profile | persistent_profile | persistence_unknown`. Never claim that a profile was saved without evidence.

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
  resource_pools:
    agentic:
      state: unknown
      members: unknown
```

`allowance_state` uses `unknown | tight | adequate | abundant`. Resource-pool state uses `unknown | independent | shared`; `members` may remain `unknown` until observed. If surfaces share a pool, record the observed members rather than inventing separate batteries.

> **Surface change does not imply budget reset.** A `REROUTE_SURFACE` outcome changes the executor, not the allowance source. Shared Work/Codex usage belongs in dated product calibration; the shared-pool concept is stable protocol law.

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

Chat, Work and Codex are specialized execution surfaces, not ranks in a prestige ladder. Codex is optional and its presence in the model does not establish installation, availability, enablement or user consent.

### Chat

Chat owns understanding, judgment, clarification, comparison, architecture, bounded correction, acceptance and integration. Chat may perform bounded direct mutation when the required action is actually available and verifiable.

### Bounded Direct Action Exception

Object geometry determines the default sovereign surface. Chat may directly execute a delta when the operation is atomic or tightly bounded, already authorized, supported by an actually available tool, independently verifiable, low in continuity and coordination burden, and not materially improved by handoff to Work or Codex. The exception changes the executor, not the evidence standard.

Examples that normally remain in Chat when directly executable include changing one README sentence, sending one authorized email, modifying one calendar event, updating one spreadsheet cell, rewriting one paragraph or performing one bounded connector action. Sustained implementation, multi-file production or a task whose coordination burden is load-bearing still routes to the surface that owns that workload.

### Work

Work owns sustained execution over knowledge artifacts and office-style deliverables: long research, multi-file documents, connector-mediated source operations, structured reports and finished artifacts where continuity is loadbearing.

### Codex

Codex owns executable systems: repositories, code, tests, builds, terminals, runtime behavior, refactors, migrations and debugging, when it is actually available and enabled.

### Codex Optionality Law

Codex is an optional execution capability, not a protocol prerequisite. Route to Codex only when it is observed as available, permitted by the active profile or a one-run override, and materially beneficial for the sovereign object. If Codex is unavailable or disabled, do not treat that as protocol failure: choose the best real fallback, preserve the claim ceiling and distinguish an unavailable ideal harness from an impossible task. AUTO must not silently assume Codex.

### The cycle

A common route is:

**Chat → Work → Codex (when enabled and available) → Chat**

It is not mandatory. Route each stage by the sovereign object that must change.

## 4. Route by object geometry and workload shape

**Sovereign object = the state that must actually change for the task to count as done.** Object labels are routing clues, not the completion criterion.

Examples:
- “Explain this code” → understanding → Chat.
- “Change this repo and pass tests” → repository/runtime state → Codex if enabled and available.
- “Produce a researched report” → artifact → Work when available and appropriate.
- “Send one email” → external message state; the Bounded Direct Action Exception may keep execution in Chat.

| Default task geometry | Default sovereign surface |
|---|---|
| Meaning, judgment, architecture, comparison, clarification, acceptance or bounded correction | Chat |
| Atomic text/document transformation or connector action with low continuity burden | Chat under the Bounded Direct Action Exception |
| Sustained knowledge-artifact production, multi-source research, office/document execution or coordination-heavy connector workflow | Work |
| Repository, code, test, build, terminal, runtime, executable system or code migration | Codex when available and enabled |
| Acceptance, claim ceiling, residual classification and final integration | Chat |

When several objects are present, decompose the task into explicit stages and name each owner. When object type and workload shape point to different surfaces, prefer the smallest available surface that can complete and verify the delta without losing material continuity, control, feedback or evidence.

## 5. Routing dimensions

The protocol records eight routing dimensions:

1. **Execution Profile** — reusable resource and optimization preferences;
2. **Object geometry** — sovereign object and observable delta;
3. **Execution surface and harness** — where the operation actually runs;
4. **Capability tier and model** — `efficient | balanced | strong | frontier`;
5. **Reasoning effort** — independent from model capability;
6. **Continuity and locality** — persistence, local state and handoff requirements;
7. **Execution envelope** — allowance, tools, permissions, fanout, tests, checkpoints, reversibility and fallback;
8. **Operation mode** — whether the run executes, only routes or audits a previous route.

### Harness Specialization Law

Capability overlap does not imply harness equivalence. Prefer the surface whose persistence, controls, feedback and verification fit the sovereign object.

### Logical plurality is not physical fanout

Multiple expert perspectives can be produced within one bounded execution. Native subagents or worktrees are justified only when the work units are materially independent, convergence is explicit and the budget can carry the coordination cost.

### Operation modes

Record one stable operation mode in the Route Card and Execution Handoff:

- `ROUTE_AND_EXECUTE` — default when tools or surfaces exist, authority exists and no user decision is required;
- `ROUTE_ONLY` — use when the user asks only for routing or handoff, the executor is unavailable or execution authority is absent;
- `AUDIT_ROUTE` — use when reviewing a previous route, handoff, model/surface decision or Chat Postflight route audit.

### Route Card

For non-trivial tasks, manifest routing in a compact form:

```text
Route Card
Surface: Work
Why: sustained multi-source report production
Mode: ROUTE_AND_EXECUTE
Tier: efficient
Effort: high
Budget: PASS_PHASED
Codex: disabled / not needed
Next boundary: return receipt → Chat Postflight
```

The card must state the selected surface, why it fits, operation mode, capability tier, reasoning effort, Budget Survivability outcome, any material unavailable or disabled surface and the next boundary. Tiny tasks may suppress the card, but not the underlying route decision or evidence standard.

## 6. Availability and Capability Floor

Before model escalation, verify actual surface, model, connector, repository, document and permission availability.

Then resolve the task capability floor. Fix non-cognitive failures first:

- incoherent specification;
- wrong or stale authority;
- unavailable surface or permission;
- context starvation or clash;
- workflow/fanout failure;
- budget/resource failure.

A stronger model is not a substitute for a missing source, tool, permission or acceptance rule. A missing or disabled Codex surface is a routing condition, not a user failure; use the best real fallback or report a truthful blocked condition when the requested verification cannot be performed elsewhere.

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

### Observable burden signals

Low burden usually means a bounded task, small authoritative context, no physical fanout, short output, one verification pass and a reversible mutation.

Elevated burden usually means many sources or files, large context, long expected output, multiple tools, repeated tests, physical agents, frontier tier, max/xhigh reasoning, an uncertain environment or a likely retry loop.

Guidance remains qualitative:
- mostly low signals → `PASS_DIRECT`;
- multiple elevated signals → prefer `PASS_PHASED`;
- frontier plus elevated burden under constrained resources → `PASS_FRONTIER_BURST` or downroute/phase;
- tight or unknown resource state with high interruption risk → checkpoint before sustained work.

The Route Card should expose the selected outcome and the shortest reason it survived this gate.

### Budget Adaptation Law

A resource-constrained profile should first remove waste, not intelligence that is loadbearing. Prefer, in order when safe:

1. smaller authoritative context;
2. fewer redundant tools and physical agents;
3. stronger checkpointing and phasing;
4. lower effort for routine phases;
5. lower tier for phases below the task's capability floor;
6. narrow high-capability bursts for the irreducible hard slice.

The final item is governed by the Intelligence Distillation Ladder below. It is not a frontier-only instruction and does not authorize sending the whole task to a stronger tier.

## 8. Context Diet

Load the smallest set that establishes authority, objective, baseline, constraints, evidence and acceptance.

Failure modes:

- **starvation** — required source absent;
- **distraction** — low-value material consumes attention and allowance;
- **clashing** — competing instructions unresolved;
- **fossilization** — stale facts still govern;
- **duplication** — repeated copies create cost without evidence.

Progressively retrieve only what a named uncertainty requires. Compression must preserve authority, decisions, constraints, failure state, evidence and next action.

For IDL escalation, the context capsule should be decision-relevant rather than merely short: preserve load-bearing authority, hard constraints, verified evidence and material uncertainty, while excluding recoverable history and settled implementation bulk.

## 9. Surface gates

### Chat gate

Use Chat for meaning, decision, comparison, architecture, bounded correction, atomic connector actions and acceptance. When an answer materially depends on live state, retrieve it before claiming it.

### Work gate

Use Work for long research, multi-file knowledge production, connector-mediated document work, structured office artifacts and sustained artifact execution.

### Codex gate

Use Codex for repository mutation, code, tests, builds, terminals, runtime diagnosis, refactors and migrations only when it is actually available and enabled. Inspect applicable `AGENTS.md` or equivalent repository instructions before mutation.

### Surface Availability Probe

Choose from surfaces whose `state` is observed as `available` and whose `enabled` value permits use. `auto` may trigger a bounded probe; it must not silently turn an unknown surface into an assumed capability. If the ideal harness is missing, disabled or declined, name the fallback and preserve the claim ceiling. A surface transition never proves a budget reset.

## 10. Capability economics and dated calibration

Stable tiers are qualitative:

`accessible_tiers` is an observed Run State field, not a plan-derived entitlement list. The stable taxonomy below can remain known while current access remains `unknown` until a probe or explicit evidence establishes availability.

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

### Intelligence Distillation Ladder (IDL)

The **Intelligence Distillation Ladder** generalizes bounded capability escalation across the qualitative tiers `efficient | balanced | strong | frontier`. It is an operational routing heuristic, not a benchmark, model ranking, product policy or promise of savings or quality.

The IDL gives operational form to the mother law above:

> **Escalate only the irreducible delta; return only the decision-bearing delta.**

Do bulk work on the cheapest sufficient tier. When a named unresolved question survives specification repair, evidence gathering, tool checks and an appropriate reasoning-effort adjustment, isolate that question, purchase only the capability needed to resolve it, then return to the lowest sufficient tier for implementation and verification.

#### Irreducible Delta

An **irreducible delta** is the smallest unresolved question whose answer could materially change the route, architecture, judgment or correctness of the task after non-cognitive failures have been excluded.

```yaml
irreducible_delta:
  delta_id: null
  unresolved_question: null

  blocked_by:
    one_of:
      - reasoning_effort
      - capability
      - evidence
      - tool
      - authority
      - workflow
      - unknown

  current_tier: null
  current_effort: null

  evidence_of_insufficiency: null
  consequence_if_wrong: null
  verification_after_ruling: null
```

Use these distinctions:

- missing source, permission, tool, authority or factual evidence is not automatically a capability problem;
- ambiguity caused by a bad specification should be repaired before escalation;
- an important task is not automatically a high-tier task;
- a large task is not automatically a frontier task;
- escalation is justified by the unresolved reasoning density of a named delta, not by the emotional importance of the request.

#### Effort versus Capability

Before changing capability tier, ask:

1. Is the current tier below the capability floor for this delta?
2. Is the failure instead insufficient reasoning effort within a tier that should be capable?
3. Is the failure non-cognitive and therefore not repairable by a stronger model?
4. Would one bounded higher-tier ruling unblock lower-tier execution?

When the current tier remains plausibly sufficient, increasing reasoning effort may be more coherent than changing models. When the delta genuinely exceeds the current tier, escalate the delta rather than the whole task. The protocol remains qualitative; it does not prescribe universal numeric thresholds.

#### Decision Capsule

A **Decision Capsule** is smaller than an Execution Handoff. It carries only what the target tier needs to make one bounded ruling while preserving authority, hard constraints, verified truth, material uncertainty and enough provenance to avoid reconstruction by guesswork.

```yaml
decision_capsule:
  delta_id: null
  decision_objective: null
  unresolved_question: null

  verified_facts: []
  hard_constraints: []
  live_uncertainties: []
  candidate_paths: []

  current_route:
    surface: null
    capability_tier: null
    reasoning_effort: null

  why_current_route_is_insufficient: null
  requested_capability: null

  requested_return:
    - ruling
    - decisive_reason
    - uncertainty_or_failure_condition
    - next_action

  output_boundary: bounded
  default_mode: read_only_judgment
```

Do not carry the full conversation or repository merely because it is available. Exclude duplicated history, settled implementation bulk, raw tool logs, already-closed questions and speculative context without a named role. Compression is invalid if it removes load-bearing authority, constraints, evidence, uncertainty or provenance.

#### Tier ROI and No Mandatory Staircase

**Capability tiers are not toll booths.** The router need not attempt every intermediate tier. All of these are legal when the selected target is the least-expensive available tier reasonably expected to resolve the specific delta and Budget Survivability passes:

`efficient → balanced`, `efficient → strong`, `efficient → frontier`, `balanced → strong`, `balanced → frontier` and `strong → frontier`.

The target decision considers the delta's capability floor, expected marginal value, live resource posture, output and verification burden, interruption risk and whether a bounded ruling is sufficient. It does not derive a universal conversion ratio from model names, plan labels or token counts.

#### Micro-burst Gate

A **micro-burst** is a bounded higher-tier reasoning call whose purpose is to resolve a named irreducible delta, not to inherit the whole execution.

Use a micro-burst only when:

- the delta is explicit;
- the Decision Capsule is sufficient;
- the target tier is expected to materially improve the ruling;
- the output can be bounded;
- lower-tier execution can resume afterward;
- downstream verification exists.

Reject or postpone it when the real blocker is evidence, authority, tool access, workflow or specification; when the capsule omits load-bearing facts; when the tier is being selected for prestige; when the task is already resolved; or when no justified route survives Budget Survivability.

#### Return Capsule and Lower-tier Re-entry

The higher-tier return is a **Return Capsule**: a compact ruling that the lower-tier executor can implement and verify.

```yaml
return_capsule:
  delta_id: null
  ruling: null
  decisive_reason: null
  uncertainty_or_failure_condition: null
  assumptions_changed: []
  next_action: null
  re_escalate_if: null
```

The receiving executor must:

1. integrate the ruling;
2. restore only the additional context needed for implementation;
3. perform the mutation or work;
4. verify the observable delta;
5. re-escalate only if a **new** irreducible delta appears.

A higher-tier ruling is not task completion. Executor completion and cycle completion remain distinct; Chat Postflight still refreshes state, audits evidence and closes or re-enters the route.

#### Optional Distillation Receipt

For non-trivial cycles, the following qualitative observables may be recorded. They are optional for tiny tasks and must not become fake precision:

```yaml
distillation_receipt:
  delta_id: null
  escalation_needed: true
  escalation_avoided_by_effort_change: false
  source_tier: null
  target_tier: null
  direct_jump_used: false

  capsule:
    context_class: minimal | bounded | expanded
    missing_loadbearing_context_detected: false

  return:
    ruling_resolved_delta: unknown
    underfit_after_burst: false
    overkill_suspected: false
    returned_to_lower_tier: true

  verification:
    downstream_verification_passed: unknown
    re_escalation_required: false
    re_escalation_reason: null
```

Track underfit, overkill, capsule loss, effort changes that avoided escalation, direct jumps and re-escalation qualitatively where evidence exists. Do not turn anecdotal observations into fixed cost, savings or performance claims.

## 12. Frontier ROI Gate

Frontier is not the automatic rung after strong.

Ask what irreducible part materially improves from frontier capability, whether the budget can survive it and whether the result remains useful if interrupted.

### Frontier Burst

Frontier Burst is the frontier-tier specialization of the general IDL micro-burst pattern. It is not a competing doctrine and frontier is not the default destination.

Under constrained resources, prefer:

**lowest sufficient preparation → bounded Decision Capsule → frontier micro-burst → lowest sufficient implementation → verification → Chat Postflight**

Use the IDL Decision Capsule and Return Capsule contracts. The frontier call should make one bounded ruling; retrieval, file mutation, formatting and routine verification remain with the cheaper adequate route.

A Frontier Full Run is justified only when decomposition would destroy coherence, the Budget Survivability Gate passes, sustained frontier capability is materially load-bearing and salvage/checkpoints exist.

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
- operation mode and Route Card;
- baseline and authority;
- active profile plus any run override;
- Run State fields that materially affected routing;
- selected surface, capability tier and reasoning effort;
- capability floor;
- Budget Survivability outcome;
- context diet, tools, fanout, checkpoints and fallback;
- when sources are involved, a source transport contract with governing source or family, locator, facet, requested operation, coverage, freshness, mutation authorization and readback;
- exact delivery and verification;
- return contract and claim ceiling;
- transport capsule sufficient for the next surface to continue without hidden context.

Unknowns must be named, investigated or left as blocked conditions rather than guessed.

When an IDL cycle is active, the handoff additionally names the irreducible delta, the Decision Capsule, the selected target tier and the Return Capsule boundary. These fields are conditional; tiny tasks do not need an empty distillation ceremony.

```yaml
distillation:
  active: false
  delta_id: null
  unresolved_question: null
  target_tier: null
  decision_capsule: null
  return_capsule_required: false
```

## 15. Portable Execution Handoff

### Transport Law

A route is not transferred until the next surface receives the minimum execution capsule required to preserve the objective, authority, baseline, constraints, profile snapshot, Run State, selected route, evidence, acceptance criteria and claim ceiling. If surfaces do not share context, emit a copyable capsule, name the destination, include required files or refs and never assume hidden context follows the user.

Typical transports:
- Chat → Work: handoff, required sources and profile/Run State snapshot;
- Chat → Codex: repository, path, branch, delta, tests, repository instructions and the Codex-enabled/available condition;
- executor → Chat: evidence-bearing receipt, after which Chat independently refreshes state.

```yaml
execution_handoff:
  operation_mode: ROUTE_AND_EXECUTE

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
    persistence: persistence_unknown
    resource_posture: null
    optimization_priority: null
    run_overrides: []

  run_state:
    allowance_state: unknown
    surfaces_observed: unknown
    models_observed: unknown
    resource_pools:
      agentic:
        state: unknown
        members: unknown

  route_card:
    surface: null
    why: null
    operation_mode: null
    capability_tier: null
    reasoning_effort: null
    budget_outcome: null
    unavailable_or_disabled_surfaces: []
    next_boundary: null

  route:
    surface: null
    capability_floor: null
    capability_tier: null
    reasoning_effort: null
    budget_outcome: null

  distillation:
    active: false
    delta_id: null
    target_tier: null
    decision_capsule: null
    return_capsule: null
    reentry_owner: null

  sources:
    mode: standalone | connected_read | living_source | federated
    governing_source_or_family: null
    locator: null
    facet: null
    requested_operation: retrieve | process | metabolize | promote
    coverage: targeted | inventory_exhaustive_where_supported
    freshness_or_revision: null
    mutation_authorization: unknown
    readback_required: true
    fallback: bounded_context | standalone | blocked_external_condition

  transport:
    destination: null
    context_shared: unknown
    capsule:
      - objective
      - authority
      - baseline
      - constraints
      - profile_snapshot
      - run_state
      - selected_route
      - sources
      - source_reference
      - evidence
      - acceptance_criteria
      - claim_ceiling

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
- **profile snapshot, persistence status, operation mode, Route Card and material run overrides used for routing**;
- when a source transport was used, the governing source or family, locator/facet, requested operation, coverage, freshness or revision, mutation authorization, readback result and fallback state;
- when an IDL cycle was active, the Return Capsule, ruling boundary and downstream re-entry state.

A successful tool response proves only that tool response, not completion of the objective.

Historical V2/V3/V4.0 receipts remain valid lineage records and are not rewritten.

## 17. Chat Postflight

Chat Postflight is mandatory after an executor returns.

1. **Refresh real state.** Read the current source, document, repository, artifact or deployment independently of the executor narrative.
2. **Audit claim against evidence.** Compare requested delivery with observed delta and verification.
3. **Audit route against profile.** Confirm that profile preferences and surface enablement were applied without violating capability floor, authority or evidence requirements; do not infer persistence from a named profile.
4. **Classify residuals.** `none | bounded_chat_repair | new_execution_required | user_decision_required | blocked_external_condition | optional_next_step`.
5. **If an IDL ruling returned, integrate and verify it.** A ruling does not replace implementation, mutation checks or downstream verification.
6. **Close or re-enter.** Apply bounded repairs when authorized; otherwise open only a new irreducible delta on the surface that owns it.

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

- Chat–Work Routing Protocol remains the current public generation;
- `4.4-public` is the current semantic subversion of that generation, not a new V5 title or filename;
- `4.3-public` is superseded by this subversion and remains recoverable through Git history;
- `4.2-public`, `4.1-public` and earlier 4.x subversions remain historical lineage recoverable through Git history;
- `4.0-public` and V3 remain historical lineage;
- the live repository and website each expose one canonical V4 file;
- MSL is currently 5.0; this protocol remains independently versioned at 4.4-public;
- an installed native skill, if any, is a separate object requiring its own update and verification.

## 23. Safe operating rules

- Read before mutation; refresh before claiming current state.
- Resolve profile without confusing entitlement with live resource posture; never claim persistence without evidence.
- Route by sovereign object and workload shape; choose the smallest available harness that can verify the delta.
- Treat Codex as optional and surface enablement as distinct from observed availability.
- Treat a surface change as an executor change, not a budget reset.
- Transport the minimum execution capsule; hidden context does not follow by default.
- Enforce capability floor before honoring model preference.
- Separate model capability from reasoning effort; change effort before tier when effort is the real insufficiency.
- Apply IDL: isolate the irreducible delta, choose the least-expensive sufficient target, allow justified direct tier jumps and return only the decision-bearing ruling.
- Treat capability tiers as non-ritual; do not force a mandatory staircase.
- Treat connector access as access, not authority.
- When source-backed work is routed, transport governing source/family, locator, facet, operation, coverage, freshness, mutation authorization, readback and an explicit fallback; never treat a locator as authority.
- Probe source reach and capability before promising connected continuity; use bounded context when the source cannot be resolved.
- Prefer smallest sufficient context and reversible delta.
- Use physical fanout only when independence and ROI justify it.
- Keep volatile product calibration outside stable protocol law.
- Preserve provenance, lineage, user decisions and claim ceilings.
- Use tests, hashes, readback and runtime evidence where available.
- Never convert anecdotes into universal cost ratios.
- Never claim hidden reasoning was recovered during salvage.
- Apply the IDL mother law: escalate only the irreducible delta and return only the decision-bearing delta.
- Chat closes the loop.

## 24. Installation and use

Attach or paste this file into ChatGPT and say:

> Use Chat–Work Routing Protocol. Start in AUTO setup unless I provide a named Execution Profile. Observe Chat, Work and Codex availability separately from enablement; Codex is optional and must not be assumed. Resolve reusable preferences separately from current Run State and task requirements. Define the sovereign object in plain language, route by object and workload shape, and use the smallest available surface that can complete and verify the delta. Show a compact Route Card for non-trivial work. Choose an operation mode, model tier and reasoning effort separately. Run Budget Survivability before expensive sustained work, frontier execution or physical fanout. Use Context Diet, checkpoints and transport capsules. When a named irreducible delta exceeds the current route, compile a Decision Capsule, choose the least-expensive sufficient target without forcing intermediate tiers, request a bounded ruling, return to the lowest sufficient tier and verify. When source-backed work is involved, include the governing source or family, locator, facet, operation, coverage, freshness, mutation authorization, readback and fallback in the handoff. After every executor return, perform Chat Postflight and independently refresh source-backed state before accepting or re-entering the route.

Optional reusable setup:

```yaml
execution_profile:
  profile_id: my-profile
  persistence: persistence_unknown
  entitlement_hint: unknown
  surfaces:
    chat:
      state: unknown
      enabled: auto
    work:
      state: unknown
      enabled: auto
    codex:
      state: unknown
      enabled: false
  accessible_tiers: unknown
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

> **Route by the state that must change. Use the smallest available surface that can complete and verify it. Resolve the user's profile without mistaking plan for budget, and never mistake enablement for availability. Codex is optional. Spend intelligence where it changes the outcome. Escalate only the irreducible delta and return only the decision-bearing delta. Preserve enough state that interruption does not erase the work. Transport the minimum capsule, execute with receipts, return to Chat. Chat refreshes, accepts and integrates.**

<!-- MOON-SOURCE-PUBLIC-STAMP -->

---

> 🌙 **Moon Source** · created by **Lua Helena Moon Martins Cardoso (Moon)** with AI-assisted coauthorial development by **Áurion** · [Licensing](https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md) · [Use & attribution](https://github.com/luahelenammc/Moon-Source/blob/main/MOON_SOURCE_USE_AND_ATTRIBUTION.md) · [Full source (.zip)](https://github.com/luahelenammc/Moon-Source/archive/refs/heads/main.zip)
