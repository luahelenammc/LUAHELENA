# Chat–Work Routing Protocol V3

## Public Portable Edition · MSL-4.3

## Meta

- **canonical repository:** https://github.com/luahelenammc/Moon-Source
- **canonical path:** portables/chat-work/CHAT_WORK_ROUTING_PROTOCOL_V3.md
- **Moon Source public surface:** https://www.luahelena.com.br/moonsource/?lang=en
- **professional context:** https://www.luahelena.com.br/ia/?lang=en
- **public boundary:** standalone protocol; product/model calibration is date-sensitive; this document does not imply a native ChatGPT skill is installed
- **status:** public portable protocol
- **version:** 3.0-public
- **language:** English
- **protocol semantics as of:** 2026-09-02
- **last product calibration inherited from V2:** 2026-08-17; recheck before relying on volatile product facts
- **primary implementation:** ChatGPT Chat and Work modes
- **governed dimensions:** surface, model, reasoning effort, continuity, postflight, acceptance, re-entry, usage economy and verification
- **human author and editorial authority:** Lua Helena Moon Martins Cardoso (Moon)
- **AI-assisted development:** Moon + Áurion coauthoring dyad
- **method lineage:** Local Moon Source → public Moon Source projection
- **canonical attribution:** https://www.luahelena.com.br/ia/?lang=en
- **credits operations:** https://github.com/luahelenammc/Moon-Source/blob/main/docs/CREDITS_ATTRIBUTION_OPS.md
- **license:** CC-BY-4.0 · https://creativecommons.org/licenses/by/4.0/
- **licensing route:** https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md
- **adaptation expectation:** preserve creator and canonical origin, link the license, and indicate material changes without implying endorsement
- **portability:** ChatGPT-first; adaptable to systems with interactive and sustained agentic execution lanes
- **freshness rule:** recheck model names, prices, usage pools and product behavior before treating dated calibration as current fact

## Skeleton

- **What it is:** a closed-loop routing protocol for deciding where work should run, which capability/effort tier should run it, and how Chat must verify and close the cycle after sustained execution.
- **What it does:** separates interactive judgment from sustained execution, requires a bounded handoff before Work, requires evidence-bearing return after Work, and makes Chat Postflight responsible for acceptance, local repair, source reconciliation and re-entry decisions.
- **What changes after use:** Work completion is no longer treated as cycle completion. The cycle closes only after Chat verifies the real state and disposes of every material residual.
- **Loadbearing parts:** three-axis routing, Work Readiness Gate, Return Contract, Chat Postflight, residual-disposition taxonomy, route-by-remaining-work, completion states, next-step buckets and claim ceiling.
- **What it is not:** an official OpenAI policy, a native installed skill, a guaranteed pricing calculator, a universal benchmark, or a rule that every Work return requires another Work run.

## 1. Mother Law

> **Work completion != cycle completion.**  
> **Work executes; Chat closes the loop.**

The canonical lifecycle is:

```text
CHAT_INTAKE
→ WORK_HANDOFF
→ WORK_EXECUTION
→ CHAT_POSTFLIGHT
→ {
    ACCEPTED_CLOSED,
    CHAT_REPAIR,
    USER_DECISION,
    BLOCKED_EXTERNAL,
    WORK_REENTRY
  }
```

The return to Chat is not clerical. It is the acceptance, repair and governance layer of the operation.

## 2. Product Model

### Chat

Chat is the interactive, conversational and resumable lane. It is suited to:

- research, interpretation, comparison and judgment;
- architecture, planning and task shaping;
- writing, review and bounded edits;
- source reconciliation and claim correction;
- targeted connector reads and writes that remain bounded and verifiable;
- verification, acceptance, integration and preservation after Work.

Chat can do real work. It is not merely a waiting room for Work, and it is not merely Work's receptionist after execution.

### Work

Work is the sustained agentic lane. It is suited to:

- long multi-step operations;
- repeated tool use with dependent state;
- coordinated file or repository changes;
- edit–build–test–debug loops;
- multiple dependent deliverables;
- environment-specific execution where reconstruction materially increases risk.

Work is not “the better brain.” It is a different execution surface.

## 3. Three Independent Routing Decisions

Every substantial task separates three choices:

1. **Surface:** Chat or Work?
2. **Capability tier / model:** efficient, balanced or frontier?
3. **Reasoning effort:** standard, high or maximum?

These choices interact but are not synonyms.

Selecting Work does not automatically select the strongest model. Selecting maximum effort does not erase a model's capability boundary. Selecting the strongest model does not repair unclear scope, stale source, broken tools or uncontrolled workflow.

> **Surface determines how the work is sustained. Model determines the capability/cost profile. Effort determines how much reasoning that model may spend.**

## 4. Core Laws

1. **Choose surface, model and effort separately.**
2. **Chat is the default lane for understanding, judgment and bounded execution.**
3. **Work is justified by continuity burden, not prestige.**
4. **Use the most efficient capable model at high/max effort for well-specified sustained execution.**
5. **Repair the packet before upgrading the model.**
6. **Escalate from diagnosed cognitive insufficiency, not impatience.**
7. **Work returns evidence; Chat verifies the real state.**
8. **Work completion is not cycle completion.**
9. **Route residual work by what remains, not by the surface that produced it.**
10. **New Work requires an unresolved irreducible delta.**
11. **Interesting future ideas are not automatically blockers or mandatory roadmap.**
12. **Claims stop at the highest state actually verified.**

## 5. Canonical Default Chain

> **Chat to understand and design → Work only when continuity is necessary → Chat Postflight to verify, repair, integrate and close or re-enter.**

This is a default, not a ritual. A task that Chat can safely complete should remain in Chat. A task that needs Work may return to Chat and still be fully closed there.

## 6. Gate One — Choose the Surface

### Keep the task in Chat when

- the objective is still ambiguous;
- the main work is research, interpretation, comparison or judgment;
- the task is writing, review, planning or architecture;
- the mutation is bounded and independently verifiable;
- state can be reconstructed from thread, source, repository or receipts;
- the real blocker is missing clarity rather than missing continuity;
- the residual after Work is a bounded correction, source update, readback or claim repair.

### Route to Work when

- later steps materially depend on state created earlier;
- a long edit–test–repair sequence must remain coherent;
- setup reconstruction would be costly, risky or error-prone;
- several artifacts must be produced and validated as one delivery;
- repeated use of files, browser, repositories or connectors is required;
- interruption creates meaningful risk of partial or divergent completion;
- broad implementation, build/test/debug loops or environment-specific execution remain loadbearing.

Importance, technical vocabulary, file count, code presence or “seriousness” do not justify Work by themselves.

## 7. Failure Classification Before Model Escalation

Classify the first meaningful failure before changing models.

- **specification failure:** unclear objective, contradictory instruction, missing definition of done or scope drift → repair in Chat;
- **source failure:** stale baseline, competing authority, missing revision or unsupported assumption → resolve source authority;
- **tool failure:** unavailable connector, permission error, API/environment failure → repair or reroute tool path;
- **context failure:** oversized or distracting context, forgotten constraints → compress or repackage;
- **workflow failure:** uncontrolled retries, loops, redundant fan-out → add stop/iteration limits;
- **cognitive failure:** packet, source, tools and workflow are sound but the model still cannot reason reliably → escalate capability.

A costly model must not be used as makeup for a poorly designed task.

## 8. Evidence-Based Escalation Ladder

1. Understand and specify in Chat.
2. Start Work with the lowest capable sustained-execution route.
3. Observe the first meaningful failure or quality gate.
4. Classify the failure.
5. Repair specification, source, context, tool path or workflow first.
6. Escalate capability only when the remaining gap is genuinely cognitive.
7. Record previous route, failure point, failure class, escalation reason and observed effect.

## 9. Work Readiness Gate V3

A task is ready for Work only when the handoff makes the operation legible.

### Identity

- task ID;
- project;
- preparation date;
- preparer / responsible party.

### Objective

- one unique objective;
- testable definition of done;
- explicit non-goals.

### Baseline

- current state;
- governing source of truth;
- branch, revision, environment or workspace;
- relevant files/systems;
- evidence already collected;
- unresolved uncertainty.

### Scope and Authority

- allowed reads;
- allowed changes;
- prohibited changes;
- destructive-operation policy;
- publication, deployment, sending or deletion authority.

### Model Route

- initial model/capability tier;
- reasoning effort;
- sufficiency rationale;
- escalation triggers;
- permitted escalation;
- what must not trigger escalation.

### Delivery

- deliverables;
- tests and negative checks;
- receipts;
- acceptance gates;
- required return fields.

### Control

- stop conditions;
- rollback/recovery path;
- iteration/context/tool-loop limits when relevant;
- subagent/fan-out limits when relevant.

If these elements cannot be defined, the task remains in Chat until it becomes legible.

## 10. Portable Work Handoff Template

```markdown
# Work Handoff

## Identity
- task ID:
- project:
- prepared by:
- date:

## Objective
- unique objective:
- definition of done:
- non-goals:

## Baseline
- current state:
- governing source of truth:
- branch / revision / environment:
- relevant files, systems or apps:
- evidence already collected:
- open uncertainty:

## Scope and Authority
- allowed reads:
- allowed changes:
- prohibited changes:
- destructive operations: allowed | prohibited | restricted
- external publication or sending: allowed | prohibited | restricted

## Model Route
- initial model / tier:
- reasoning effort:
- sufficiency rationale:
- escalate when:
- permitted escalation:
- do not escalate for:

## Required Delivery
- deliverables:
- tests:
- negative checks:
- receipts:
- acceptance gates:

## Control
- stop conditions:
- rollback path:
- iteration limit:
- context limit:
- tool-loop limit:
- subagent / fan-out limit:

## Return Contract
Return completion state, concise verdict, actual changes, affected surfaces, tests/checks, receipts, model route used, deviations, limitations, residual risks, rollback status and concrete next-step candidates.
```

## 11. Work Return Contract

Work should return enough evidence for Chat to independently decide what happened. At minimum:

- completion state claimed by Work;
- concise verdict;
- actual changes;
- affected files/systems/artifacts;
- tests and negative checks;
- receipts: diffs, revisions, hashes, logs, URLs, screenshots or equivalent evidence where material;
- route actually used and any escalation reason;
- deviations from handoff;
- limitations and residual risks;
- rollback state;
- candidate next actions.

The Work return is evidence for acceptance. It is not self-ratifying.

## 12. Chat Postflight — Mandatory Return Path

After Work returns, Chat must perform the smallest sufficient postflight.

### 12.1 Refresh the real state

When the task changed external state, refresh the governing surface instead of relying only on Work's prose. Depending on the task, this may mean:

- rereading changed files;
- reading the actual repository branch/commit/PR;
- checking CI and test results;
- inspecting deployed/public surfaces;
- rereading a connected source after mutation;
- verifying artifact existence and metadata.

### 12.2 Audit claim versus evidence

Compare:

- handoff objective and definition of done;
- scope and authority;
- Work return claims;
- actual source/repository/system state;
- tests, CI and receipts;
- required negative checks.

Distinguish **completed work** from **claimed work**.

### 12.3 Detect and classify residuals

Every material loose end should receive one disposition:

- `resolved_by_work`
- `chat_fixable`
- `source_patch_only`
- `user_decision_required`
- `new_work_required`
- `blocked_external_condition`
- `optional_future`
- `no_delta_with_reason`

Do not leave a material residual as vague “next steps”. Classification decides jurisdiction.

## 13. Ponytail Extension — Route by Remaining Work

> **Route by remaining work, not by previous mode.**

The previous surface has no hereditary right over the residual.

Chat should close a residual locally when it can safely and verifiably:

- correct stale bookkeeping;
- update a governing source;
- repair a claim or status;
- reconcile a PR, issue, registry or index;
- perform readback;
- apply a bounded patch;
- close a small documentation/reference gap.

A new Work cycle is justified only by an **`unresolved_irreducible_delta`**: remaining work whose continuity burden cannot be safely reduced to bounded Chat operations.

Typical irreducible deltas include:

- broad implementation across many dependent files;
- sustained build/test/debug loops;
- environment-specific mutation requiring persistent state;
- large coordinated artifact production;
- long dependent research/implementation sequences;
- repairs whose validation itself needs sustained agentic continuity.

“Work did the previous part” is not a reason to summon Work again. Modes are not feudal estates.

## 14. Chat Repair

When a residual is `chat_fixable` or `source_patch_only`, Chat should repair it in the same cycle when authority and tools allow it.

After repair, Chat must read back the changed state and include the repair in the final acceptance decision.

A bounded Chat repair does not downgrade the original Work delivery. It closes the loop around it.

## 15. User Decision and External Blocks

### `user_decision_required`

Use when more execution depends on a genuinely discretionary choice that cannot be safely inferred from existing authority.

The cycle state becomes `AWAITING_USER_DECISION`. Do not disguise the decision as a technical blocker.

### `blocked_external_condition`

Use when completion depends on an unavailable permission, third-party response, external system state, future event or other condition neither Chat nor Work can resolve now.

The cycle may be accepted as far as completed and end as `ACCEPTED_BLOCKED_EXTERNAL` when the verified work is otherwise sound.

## 16. Work Re-entry Gate

Create a new Work handoff only when postflight finds `new_work_required` and the residual is irreducible.

The new handoff must be **delta-only**:

- preserve what was already verified;
- name the remaining defect or objective;
- carry forward only necessary context;
- do not replay completed work;
- include the new evidence and failure class;
- define new acceptance gates.

Re-entry is a new bounded operation, not “continue doing whatever”.

## 17. Acceptance Completion States

Chat closes the cycle with exactly one operational completion state:

- `ACCEPTED_CLOSED` — objective verified; no material residual remains.
- `ACCEPTED_WITH_CHAT_REPAIRS` — Work delivery accepted after bounded Chat-side repairs and readback.
- `ACCEPTED_BLOCKED_EXTERNAL` — verified work accepted; remaining condition is external and explicitly named.
- `AWAITING_USER_DECISION` — a real user choice is required before further execution.
- `PARTIAL_NEW_WORK_REQUIRED` — verified partial result preserved; an irreducible delta requires a new Work handoff.
- `REJECTED_REPAIR_REQUIRED` — delivery cannot be accepted because material objective, authority, evidence or safety gates failed.

These postflight states are distinct from Work's own execution state (`complete`, `partial`, `blocked`, etc.). Work reports what it did; Chat decides whether the cycle is accepted.

## 18. Next-Step Buckets

Postflight must separate next actions into four buckets when they are material:

### `mandatory_next_steps`
Needed to finish, preserve or safely operate the accepted result.

### `optional_next_steps`
Useful extensions that are not required for acceptance.

### `do_not_do_yet`
Interesting actions that are premature, blocked, strategically deferred or would exceed current authority.

### `claim_ceiling`
The strongest statement the evidence currently permits.

This prevents a good idea discovered after execution from silently becoming a blocker or mandatory roadmap.

## 19. Chat Acceptance Template

```markdown
# Chat Postflight

## Verdict
- cycle state:
- objective met: yes | no | partial
- definition of done met: yes | no | partial
- scope / authority respected: yes | no | partial
- receipts sufficient: yes | no | partial

## Verified Delta
-

## Residual Dispositions
- resolved_by_work:
- chat_fixable:
- source_patch_only:
- user_decision_required:
- new_work_required:
- blocked_external_condition:
- optional_future:
- no_delta_with_reason:

## Chat Repairs Applied
-

## Readback
-

## Next Steps
- mandatory_next_steps:
- optional_next_steps:
- do_not_do_yet:
- claim_ceiling:

## Re-entry
- unresolved_irreducible_delta: yes | no
- new Work handoff required: yes | no
```

## 20. Checkpoint Fallback

When Work is unavailable, unnecessary or unjustified, Chat may continue through explicit checkpoints.

Each checkpoint should preserve current objective, completed operations, receipts, current baseline, unresolved risks, next bounded operation, stop condition and recovery path.

A checkpoint exists to make work safely resumable, not to perform progress-report theater.

## 21. Minimal Decision Matrix

| Situation | Surface | Route |
|---|---|---|
| Objective ambiguous | Chat | strongest suitable interactive reasoning |
| Research, judgment or architecture | Chat | proportionate reasoning |
| Bounded writing/review/patch | Chat | lowest sufficient capable model |
| Long well-specified execution | Work | efficient capable model at high/max effort |
| Tool/source/packet failure | Chat repair | do not model-escalate yet |
| Work returns with bounded source/index/claim repair | Chat Postflight | repair + readback locally |
| Work returns with user choice dependency | Chat | `AWAITING_USER_DECISION` |
| Work returns with third-party dependency | Chat | `ACCEPTED_BLOCKED_EXTERNAL` when otherwise sound |
| Remaining broad dependent implementation | Work re-entry | delta-only handoff |
| Final verification/integration | Chat | acceptance and preservation |

## 22. Anti-Patterns

- **Surface–model collapse:** treating every Work task as a frontier-model task.
- **Prestige escalation:** choosing the strongest model because the task feels important.
- **Packet laundering:** using model strength to hide missing objective, source or authority.
- **Raw-thread escalation:** sending Work a conversation dump instead of an operational packet.
- **Duplicate execution:** replaying already verified mutations in a new Work cycle.
- **Agent swarm inflation:** overlapping subagents without measurable benefit.
- **Unreceipted completion:** declaring success without evidence where evidence is material.
- **Work-return absolutism:** accepting “executed successfully” as proof without refreshing real state.
- **Mode inheritance:** sending every residual back to Work because Work produced it.
- **Roadmap inflation:** promoting every postflight idea to mandatory next step.
- **Claim overrun:** describing a protocol/source update as a native installed capability.
- **Protocol theater:** using elaborate routing for trivial work.

## 23. Native Skill Boundary

This public protocol may exist independently of any native/personal skill implementation.

If an installed routing skill has not been separately updated, tested and verified, the correct claim is:

> **Protocol V3 is current; native skill synchronization remains separate.**

Do not claim `chat-work-router V3 installed` merely because this file exists or because a source document has advanced.

## 24. Usage Observation Gate

Usage observations remain operational calibration, not scientific measurements. Record surface, model/effort, approximate context size, retries/tool loops and before/after observations when useful. Repeat comparable observations before promoting them into routing doctrine.

A usage jump is a diagnostic event, not automatic proof that the selected model or surface is intrinsically expensive.

## 25. Product Calibration Boundary

V3 preserves V2's structural separation between surface, model and effort. Product names, plan behavior, rates and usage pools are volatile and are not the protocol's semantic core.

The last product-specific calibration carried by the V2 lineage was dated **2026-08-17**. Recheck current official product documentation before making a time-sensitive routing decision from product names, rates or plan limits.

The stable fallback is:

> keep surface, capability and effort separate; use Chat to understand and close; use sustained execution only when continuity is loadbearing; escalate capability only from diagnosed need.

## 26. Public Installation

Attach or paste this file into ChatGPT and say:

> Use the Chat–Work Routing Protocol V3 as the operating policy for this project. Choose surface, capability and reasoning effort separately. Use Work only when continuity is loadbearing. After every Work return, perform Chat Postflight: refresh real state, audit evidence against the handoff, classify residuals, repair bounded issues locally, and create a new Work handoff only for an unresolved irreducible delta. Close with an explicit acceptance state and claim ceiling.

For a specific Work task, use the **Portable Work Handoff Template** rather than sending the raw conversation.

## 27. Attribution Ops

This portable carries a local attribution operation for reuse. The repository-wide contract for origin, adaptation, permission scope, mirrors, composite outputs and attribution QA is [Credits & Attribution Ops](https://github.com/luahelenammc/Moon-Source/blob/main/docs/CREDITS_ATTRIBUTION_OPS.md).

### Short attribution

> Chat–Work Routing Protocol V3 — created by Lua Helena Moon Martins Cardoso (Moon), with AI-assisted development by Áurion.  
> https://www.luahelena.com.br/ia/?lang=en

### Adaptation attribution

> Adapted from the **Chat–Work Routing Protocol V3** by Lua Helena Moon Martins Cardoso (Moon): https://www.luahelena.com.br/ia/?lang=en  
> Modifications by: [name / project], [date or version].

This portable is shared under CC-BY-4.0. Preserve attribution, a license link and an indication of material changes. Do not imply partnership, endorsement or access to private Moon Source materials.

### Product boundary

This is an independent operating protocol. It is not official OpenAI documentation and does not imply endorsement by OpenAI.

## 28. Supersession

V3 supersedes the current-routing status of V2 while preserving V2 as historical lineage.

Prior Chat–Work generations remain recoverable through Git history. The current repository tree intentionally exposes only the latest Chat–Work portable generation as an active file.

V2's key contribution was already the correct seed: Return Contract + Chat Re-entry and Acceptance. V3 makes that seed loadbearing by turning postflight, repair, acceptance and re-entry into a closed operational machine.

## Final Law

> **Chat designs the operation. Work sustains the procedure. Chat performs the post-op: checks the vital signs, closes the stitches it can, records what actually happened, and reopens the operating room only when a real surgery remains.**

<!-- MOON-SOURCE-PUBLIC-STAMP -->

---

> 🌙 **Moon Source** · created by **Lua Helena Moon Martins Cardoso (Moon)** with AI-assisted coauthorial development by **Áurion** · [Licensing](https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md) · [Use & attribution](https://github.com/luahelenammc/Moon-Source/blob/main/MOON_SOURCE_USE_AND_ATTRIBUTION.md) · [Full source (.zip)](https://github.com/luahelenammc/Moon-Source/archive/refs/heads/main.zip)
