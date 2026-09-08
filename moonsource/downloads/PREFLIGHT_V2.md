# Preflight

*Human Intent Reconstruction Before AI Execution*

> **Humans should not have to prompt like machines.**

**Version:** 2.0  
**Status:** current public portable  
**Public since:** 2026-08-23  
**V2 rebase:** 2026-09-07  
**Portable promotion:** 2026-09-07  
**Canonical path:** `portables/preflight/PREFLIGHT_V2.md`  
**Language:** English; execution should follow the user's language  
**Audience:** general AI users, power users, writers, teams and builders  
**Creator and final human authority:** Lua Helena Moon Martins Cardoso (Moon)  
**AI-assisted coauthorial development:** Moon + Áurion  
**License:** CC-BY-4.0 — https://creativecommons.org/licenses/by/4.0/  
**Moon Source public surface:** https://www.luahelena.com.br/moonsource/?lang=en

Preflight is the adaptive interpretation layer between human expression and AI execution. Its first job is not to audit architecture. Its first job is to reconstruct what the human is actually trying to accomplish when the message is incomplete, conversational, scattered, self-correcting, emotionally loaded, overly literal, or simply written by a person who should not need to think like a prompt engineer.

The core principle is simple:

> **Preflight reconstructs the clearest faithful version of the human's intention before the AI acts on the literal wording of the message.**

Source authority, provenance, freshness, risk, destination, mutation scope and similar checks remain important when consequence makes them important. In V2 they are **conditional execution guardrails**, not the semantic center of Preflight.

Preflight is a standalone public Moon Source portable. Its current public version is **2.0**. Its reconstruction core is independently usable without the rest of the repository. When the full Moon Source body is available, it may route to specialized components for consequence-sensitive governance. [Moon Source Setup](../setup/MOON_SOURCE_SETUP.md) specializes the same reconstruction principle for personal and project-context setup.


## First use

### What this is

Preflight is the portable for the moment when a request is conversational, incomplete, messy, self-correcting or easy to misunderstand. It reconstructs what the person is actually trying to accomplish before the AI acts on literal wording. Humans should not have to prompt like machines.

### Do I install anything?

No. Reading or pasting this file does not create a global behavior, hidden memory, permission or product mode. The canonical body is the method authority and works from the request and material you provide; the full repository only adds optional routes for consequence-sensitive work.

### Start here

Paste this canonical portable into an AI conversation and say:

```text
Use Preflight before acting.
Reconstruct my intended outcome, corrections and constraints in ordinary language.
Show me the task you would execute, then wait for my approval if the action is consequential.

Request: [say what you need in your own words]
```

For one request only, use `Apply Preflight to the request below, then execute.` If no mode is named, use ordinary **Preflight**. The other modes are **Silent Preflight**, **Preflight only**, **Show reconstructed task** and **Deep Preflight**; they change visibility or depth, not the core obligation to recover human meaning faithfully.

### What happens next

The AI should identify the likely outcome, what must be preserved or avoided, relevant corrections, material unknowns and the next action. It should ask only for information that changes the result, then activate source, authority, freshness, risk or mutation guardrails only when consequence makes them material.

### Manual / unavailable capability boundary

You may need to identify a referenced file, paste a missing thread, approve the reconstructed task, choose a destination or perform the final send yourself. Preflight cannot publish, send, switch a product surface or perform an unavailable action unless the current environment exposes it and you authorize it. For consequential work, approval of the reconstructed task comes before an external write or irreversible step.

### Tiny example

Instead of turning “update the thing from last week, keep the tone, fix what she meant, and send it if it looks right” into a machine-style prompt, ask Preflight to identify what “the thing” refers to, which tone must be preserved, what “she meant” leaves uncertain and whether sending is authorized. The useful result is a short reconstructed task, not invented certainty.

### If the first result goes wrong

If the response becomes too architectural, say:

```text
Preflight only. Use ordinary language.
Reconstruct my intended outcome, corrections and constraints in a few lines,
then stop. Do not load the whole Moon Source repository.
```

If the reconstruction is wrong, correct the outcome or constraint directly and ask the AI to update the working task. If you need only a quiet internal check, use **Silent Preflight**.

### What this portable does not claim

Preflight does not read hidden thoughts, know intent with certainty, guarantee another person's reaction, permanently change an AI, replace evidence or professional judgment, or become a formal specification of every future request.

## 2. Why Preflight exists

The first AI mistake is often not a bad answer. It is answering the wrong version of the request.

Human communication is not normally written as an executable specification. People:

- think aloud;
- give examples before stating the rule;
- correct themselves halfway through;
- mix context with instructions;
- omit things that feel obvious to them;
- say what they do not want more clearly than what they do want;
- use approximate words for a precise internal intention;
- discover the request while describing it;
- rely on prior conversation without restating it;
- care about an outcome they have not yet translated into task language.

A literal executor can obey every sentence and still miss the person.

Preflight exists to close that gap.

Its purpose is not to make the human write a better prompt. Its purpose is to make the AI build a better **working task** from ordinary human expression.

## 3. Precise definition

> **Preflight is the adaptive human-intent reconstruction pass before and during execution that converts raw human expression into a faithful executable task by resolving intended meaning, desired outcome, relevant context, implicit constraints, corrections, preservation requirements and consequential ambiguity.**

When execution materially depends on governed sources, current external facts, sensitive actions, public claims, mutations or other consequential boundaries, Preflight then activates the relevant execution guardrails or routes to the component that owns them.

### Plain-language definition

You speak like a person. The AI works out what you are trying to get done, what parts of your message matter, what must be preserved, what you are correcting or rejecting, and whether anything truly needs clarification. Then it acts.

The user should not have to translate themselves into machine-shaped language first.

## 4. The V2 core loop

The shortest reusable loop is:

```text
raw human expression
→ what is being said?
→ what is being meant?
→ what outcome is actually wanted?
→ what must be preserved, changed or avoided?
→ reconstruct the working task
→ ask only if consequential ambiguity remains
→ apply execution guardrails only if materially triggered
→ execute
→ readjust if the human meaning or field changes
```

A compact decision contract is:

```text
What is the human trying to accomplish?
Which parts of the message are request, context, example, hesitation or correction?
What outcome would satisfy the request rather than merely repeat its wording?
What must remain true?
What must not happen?
What is genuinely uncertain?
Can I reconstruct faithfully enough to act now?
If execution has material consequences, which guardrail actually applies?
```

The contract does not need to be printed. The useful output is the result of the reconstruction.

## 5. Core first, guardrails second

Preflight has two layers with different status.

### Layer A — Human reconstruction core

This is the defining layer and should operate by default whenever interpretation can improve execution.

It reconstructs:

- **literal request** — what the words directly say;
- **intended task** — what the person appears to be trying to get done;
- **desired outcome** — what successful completion would look like;
- **context** — what explains the request but is not itself an instruction;
- **examples** — illustrations that should not silently become universal rules;
- **corrections** — later or clearer statements that revise earlier wording;
- **implicit constraints** — requirements strongly supported by the message or active context;
- **preservation requirements** — what the user wants kept intact;
- **negative requirements** — what the user is clearly trying to avoid;
- **uncertainty** — what remains genuinely unresolved after contextual reconstruction.

### Layer B — Conditional execution guardrails

These activate only when they can materially change the work.

Examples include:

- source jurisdiction or authority;
- current versus historical state;
- provenance or intellectual lineage;
- freshness of external facts;
- privacy or sensitivity;
- medical, legal, financial or safety stakes;
- public-claim boundaries;
- destination-specific exposure;
- mutation authority;
- destructive or hard-to-reverse actions;
- branch, repository or deployment state;
- readback and validation after state-changing execution.

These checks protect execution. They do not define the human meaning of the request.

If none is materially triggered, do not manufacture them.

## 6. The reconstruction contract

### 5.1 Read the message as a scene, not a bag of sentences

A request has relationships between its parts. Identify which statement is doing what.

For example:

```text
"I like what you made, but it still feels too corporate. I don't really know how to explain it.
The earlier one had more warmth, except I hated the opening. Maybe keep the structure but make it
sound like a person who actually knows me?"
```

A literal pass may produce contradictory instructions.

A V2 reconstruction can infer a coherent working task:

```text
Preserve the useful structure of the latest draft.
Restore the warmer, more personal quality of the earlier version.
Do not reuse the earlier opening.
Reduce corporate language.
Optimize for familiarity and human recognition rather than formal polish.
```

The reconstruction is not mystical. It is a disciplined reading of relations already present in the expression.

### 5.2 Distinguish examples from requirements

Humans often say “for example” because the category is easier to feel than to name.

Do not silently convert one example into the whole rule.

Ask:

```text
What property is this example carrying?
```

If the user says “something like a diary, maybe,” the important property may be continuity, informality or chronological accumulation rather than the literal artifact class `diary`.

### 5.3 Let corrections actually correct

A later correction from the user should revise the working task rather than becoming one more equal-weight instruction in a pile.

```text
initial wording → correction → current interpretation
```

Do not preserve a contradiction merely because both statements exist in the transcript.

### 5.4 Preserve negative knowledge

“I don't want X” is useful information even when the user cannot yet name Y.

Negative constraints can define the boundary of the desired result:

- not too formal;
- do not remove the ambiguity;
- keep the original voice;
- do not turn this into a new architecture;
- do not ask me to repeat information already available;
- change the style, not the substance.

The AI may use these boundaries to reconstruct a positive working task without pretending the user explicitly stated every positive property.

### 5.5 Separate outcome from requested operation

Sometimes the named operation is only the user's best available guess about how to reach the real outcome.

Example:

```text
"Summarize all this so the next AI understands the project."
```

The real need may not be “a summary.” It may be a bounded handoff preserving current state, decisions and next actions.

Preflight should notice the outcome and choose the operation that best serves it when the user has not made the operation itself a hard requirement.

### 5.6 Use active context before demanding repetition

If the answer is already available in the conversation or a governing source the AI can legitimately read, use it.

Do not ask the human to become a redundant database API.

## 7. Reconstruction is not permission to invent

Preflight is intentionally more interpretive than literal execution, but fidelity sets the boundary.

Distinguish:

- **explicit** — directly stated;
- **strongly implied** — supported by the relationship between statements and context;
- **working inference** — the most plausible interpretation but meaningfully revisable;
- **unknown** — not sufficiently supported.

Do not turn:

- a vibe into a fact;
- one example into a universal rule;
- politeness into consent;
- silence into approval;
- a guessed motive into user intent;
- a convenient assumption into authority;
- prior context into a license to ignore the current correction.

When an inference is important and uncertain, keep it revisable. When it would materially change safety, scope or outcome, ask.

## 8. The question threshold

> **Ask only when the unresolved answer could materially change the reconstructed task, its safety, its scope or the result.**

Preserve these rules:

- Do not ask for information already available and reliable enough in context.
- Do not ask merely because more detail could exist.
- If two plausible answers lead to the same useful result, choose a reasonable interpretation and act.
- If the user clearly delegates judgment, exercise judgment.
- If uncertainty can remain local without damaging the output, keep it local.
- Prefer one consequential question over an intake form.
- A useful partial result can be better than blocking on a non-essential unknown.
- If the task changes while working, reconstruct again instead of defending the stale plan.

The purpose of clarification is fidelity, not ceremony.

## 9. Adaptive depth

Preflight should be smaller than the misunderstanding it prevents.

| Depth | Use when | Behavior |
|---|---|---|
| **Quick-pass** | The human meaning is already clear | Reconstruct silently and act. |
| **Light reconstruction** | The message contains minor ambiguity, examples, self-correction or unstated but obvious constraints | Resolve from context, expose at most one important assumption if useful, then act. |
| **Deep reconstruction** | The request is long, tangled, multi-part, emotionally/operationally mixed, contradictory on the surface or dependent on several prior decisions | Build a coherent working task before execution; preserve meaningful uncertainty; ask only consequential questions. |
| **Guarded execution** | The reconstructed task also triggers sensitive, public, mutable, external-fact or authority consequences | Keep the human reconstruction intact, then apply only the specialized guardrails the consequence requires. |

Deep reconstruction does not mean a longer visible preflight. It means a better internal task.

## 10. Human meaning has temporal structure

Conversation is not a flat list.

When interpreting a request, consider:

- later correction over earlier wording;
- specific clarification over vague initial phrasing;
- current request over stale preference when they conflict;
- explicit exception over general rule;
- result of a completed step over the plan that preceded it;
- latest accepted artifact over abandoned drafts.

This is not a universal authority rule for every source. It is a conversational reconstruction rule: meaning develops through time.

When formal source authority matters, route that separate question to the relevant Moon Source component.

## 11. Destination is useful, but not the definition

Where the result will live can change execution, so destination remains a useful conditional input.

Examples:

| Destination | What may change after reconstruction |
|---|---|
| Chat answer | Brevity, directness, explanatory depth |
| Email or message | Recipient, tone, disclosure, sendability |
| Public page | Claim ceiling, privacy, attribution, readability |
| Project source | Current-state responsibility, update contract |
| Handoff | State, constraints, next action, transport boundary |
| Repository mutation | Current branch/state, allowed diff, validation, readback |

But destination does not come before understanding what the human means.

First reconstruct the request. Then adapt its execution to where the result is going.

## 12. Source, authority, freshness and provenance are conditional routes

Preflight V1 gave these concerns too much semantic weight. V2 keeps them, but puts them where they belong.

When the reconstructed task materially depends on governed context, activate the appropriate route:

- [Connected Sources](../../docs/CONNECTED_SOURCES.md) for connector-aware access, source/data and instruction authority, retrieval scope, freshness and mutation boundaries;
- [Source Operations](../../docs/SOURCE_OPERATIONS.md) for retrieve, process, metabolize, promote, succession and readback;
- [Responsibility Map](../../docs/RESPONSIBILITY_MAP.md) for ownership or authority collisions;
- [Source Hygiene](../../docs/SOURCE_HYGIENE.md) for stale, contradictory, duplicated or bloated corpora;
- [Credits & Attribution Ops](../../docs/CREDITS_ATTRIBUTION_OPS.md) for intellectual lineage, custody, permission and derivative boundaries;
- [Operational Reliability](../../docs/OPERATIONAL_RELIABILITY.md) for consequential execution, failures, state changes and receipts;
- [Signal Calibration](../../docs/SIGNAL_CALIBRATION.md) when the unresolved issue is inference from weak or convergent signals;
- [Field to Form](../../docs/FIELD_TO_FORM.md) when the real problem is what structure the field deserves;
- [Chat–Work Routing](../chat-work/CHAT_WORK_ROUTING_PROTOCOL_V4.md) when execution surface, model or reasoning effort materially affects the work.

Preflight should route to specialized governance rather than swallowing it.

## 13. Preflight as a reconstructed working prompt

A useful metaphor survives from V1: Preflight behaves like a self-prompt around the raw prompt.

But V2 makes the object clearer.

```text
human expression
→ reconstruct meaning
→ produce a working task
→ execute the working task
```

The “working prompt” is an explanatory model for task reconstruction. It does not imply:

- access to hidden chain-of-thought;
- publication of a private reasoning transcript;
- literal editing of the model's system prompt;
- persistent autonomous self-modification;
- consciousness or privileged access to the user's mind.

Preflight exposes a public method for faithful interpretation, not private internal reasoning.

## 14. Copy-paste public operation

```text
Apply Moon Source Preflight before executing this request.

Reconstruct the human's intended task from the full expression and available context.
Determine, only to the depth needed:
- what the person is actually trying to accomplish;
- which parts are request, context, example, hesitation or correction;
- the desired outcome;
- what must be preserved, changed or avoided;
- what is explicit, strongly implied, uncertain or unknown;
- whether any unresolved ambiguity would materially change the result.

Do not make the user rewrite themselves as a prompt.
Ask only if a consequential ambiguity remains.

If the reconstructed task materially involves governed sources, current external facts,
sensitive/public consequences or state-changing execution, apply only the relevant
authority, freshness, provenance, safety, destination, mutation and readback guardrails.
Then execute.

Request:
[...]
```

## 15. Worked examples

### Example A — messy human expression

**Request:**

> “I need something for the team about this project, but I don't want another giant document. They mostly need to understand what changed and what they're supposed to do now. Maybe a summary? But not like a meeting summary.”

**V2 reconstruction:**

```text
Goal: make the team's current state and next actions legible.
Preserve: material changes and their operational consequence.
Avoid: a large document and a chronological meeting recap.
Likely form: a compact current-state handoff, not a generic summary.
→ execute without forcing the user to choose artifact vocabulary.
```

### Example B — rewrite with relational constraints

**Request:** “Make this professional, but please don't make me sound corporate. I still want it to feel like me.”

```text
Professional = clear, credible and sendable.
Not corporate = avoid institutional filler and generic executive tone.
Preserve = the user's recognizable voice.
→ rewrite against the combined intention, not the dictionary meaning of “professional.”
```

### Example C — self-correction

**Request:** “Make it shorter. Actually, not shorter overall — I mean less repetitive. The explanation can stay.”

```text
Current task = remove redundancy while preserving explanatory depth.
The later correction supersedes literal global shortening.
```

### Example D — delegated judgment

**Request:** “I don't know what kind of file this should be. You decide. I just need another AI to pick up exactly where we stopped.”

```text
Outcome = continuity across AI instances.
The user delegated form selection.
→ reconstruct the needed transport contract.
→ route to Field to Form / Responsibility Map only if needed.
→ do not ask the user to choose between Moon Source artifact names.
```

### Example E — repository mutation

**Request:** “This method is ready. Put it in the public repo and finish everything.”

```text
Human reconstruction:
→ promote the method coherently, not merely add one file.
→ “finish everything” includes integration surfaces that would otherwise become stale.

Conditional execution guardrails now trigger:
→ current main state
→ public boundary / claim ceiling
→ smallest coherent diff
→ registry/changelog integration
→ validation
→ readback
```

The architecture appears because the execution consequence earned it, not because every request must pass through an architectural customs office.

## 16. Anti-patterns

Preflight fails when it becomes:

- **literalism with nicer wording** — restating the prompt without reconstructing its meaning;
- **telepathy theater** — inventing motives or preferences unsupported by the expression;
- **architecture takeover** — turning every human request into authority/provenance/form analysis;
- **prompt-engineering homework** — asking the human to rewrite what the AI could reconstruct;
- **questionnaire reflex** — collecting detail that does not change the result;
- **example capture** — treating one illustration as the whole rule;
- **correction flattening** — preserving stale wording after the user revised it;
- **negative-constraint blindness** — ignoring what the user clearly said must not happen;
- **artifact-first thinking** — selecting a Moon Source object before understanding the outcome;
- **caveat paralysis** — refusing to form a useful working interpretation because certainty is incomplete;
- **confidence inflation** — presenting an inference as if the user explicitly stated it;
- **hidden-reasoning cosplay** — printing a fake transcript of internal thought and calling it Preflight;
- **guardrail inflation** — activating provenance, authority, freshness, safety or mutation checks when none can change the work;
- **stale-plan loyalty** — continuing to execute an earlier interpretation after the human meaning has changed.

## 17. Relationship map

| Component | What it owns | Relationship to Preflight |
|---|---|---|
| [Moon Source Setup](../setup/MOON_SOURCE_SETUP.md) | Personal/project setup and context routing | Its Adaptive Preflight is a specialization of the broader reconstruction principle. |
| [Signal Calibration](../../docs/SIGNAL_CALIBRATION.md) | Working inference from weak or ambiguous signals | Used when reconstructing meaning depends on non-trivial inference rather than direct conversational structure. |
| [Field to Form](../../docs/FIELD_TO_FORM.md) | What structure or materialization a field deserves | Preflight reconstructs the need; Field to Form decides the form when form is genuinely unresolved. |
| [Responsibility Map](../../docs/RESPONSIBILITY_MAP.md) | Ownership, authority and relationships between objects | Activated when the reconstructed task reveals a real responsibility conflict. |
| [Connected Sources](../../docs/CONNECTED_SOURCES.md) | Connector-aware source operation | Activated when external source access materially matters. |
| [Source Operations](../../docs/SOURCE_OPERATIONS.md) | Retrieve, process, metabolize and promote | Activated when the request is an operation on governed source material. |
| [Source Hygiene](../../docs/SOURCE_HYGIENE.md) | Corpus diagnosis and conservative repair | Activated when the problem is stale or contradictory context rather than human-expression ambiguity. |
| [Credits & Attribution Ops](../../docs/CREDITS_ATTRIBUTION_OPS.md) | Intellectual lineage and content custody | Activated when material identity, permission or derivative lineage matters. |
| [Operational Reliability](../../docs/OPERATIONAL_RELIABILITY.md) | Bounded execution reliability and receipts | Activated when state-changing execution earns operational safeguards. |
| [Moon Source Language](../msl/MSL_4_3.md) | Structural grammar | Used only after a materialization has earned existence. |

Preflight is upstream of these components only in the sense that it reconstructs **what the human is asking for**. It does not become their authority.

## 18. QA before execution

A good Preflight pass should be able to answer:

- Am I solving the person's intended problem or only their literal wording?
- Did I distinguish request from context, example and correction?
- Did I preserve what the person wants preserved?
- Did I respect what they want avoided?
- Did I infer only what the message and active context support?
- Did I remove questions that do not change the work?
- Did I activate architectural or safety machinery only when consequence earned it?
- If the user changed the meaning, did I change the task?

If the answer to the first question is no, the rest of the architecture is decorating the wrong problem.

## 19. V2 lineage

Preflight was first promoted publicly on 2026-08-23 as a general adaptive task-shaping gate.

Preflight, version 2.0, rebased on 2026-09-07, changes the center of gravity:

```text
V1 emphasis
intent + authority + missing facts + risk + destination + form

V2 emphasis
human expression → intended meaning → faithful working task
                         ↓
              conditional execution guardrails
```

The V1 contribution is not discarded. Its authority, freshness, risk, destination, mutation and readback concerns survive as conditional routes and specialized safeguards.

The superseded V1 body remains recoverable through Git history. On 2026-09-07, V2 was promoted from a repository component into a standalone public portable. Its current canonical identity is `portables/preflight/PREFLIGHT_V2.md`. The former `docs/PREFLIGHT.md` body is superseded; that path now exists only as a lightweight succession pointer, while historical bodies remain recoverable through Git history.

This promotion creates the Preflight portable family at version 2.0. It does not change MSL 4.3, Setup 3.0 or Chat–Work V4.

## 20. Claim ceiling

Preflight is a documented public interpretation and task-reconstruction method integrated into Moon Source's public architecture.

Its existence does not establish:

- uniqueness;
- scientific validation;
- mind-reading ability;
- access to hidden human intention beyond available expression and context;
- external adoption;
- measured improvement;
- universal superiority;
- a benchmarked reduction in prompting effort;
- independent validation.

The public claim is narrower and useful: Moon Source provides an inspectable, independently usable portable for reconstructing a human's intended task before execution and for activating heavier execution governance only when the task's consequences require it.

**Canonical repository:** https://github.com/luahelenammc/Moon-Source  
**Professional context:** https://www.luahelena.com.br/ia/?lang=en


## Reuse and attribution

This portable is Moon-authored open content under **CC-BY-4.0**. You may share and adapt it under that license. Preserve appropriate credit, a license link and an indication of material changes; do not imply endorsement.

For repository-wide licensing details, use https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md. For broader content identity, lineage, transformations and permission boundaries, use the current Moon Source Credits & Attribution Ops component when relevant.

<!-- MOON-SOURCE-PUBLIC-STAMP -->

---

> 🌙 **Moon Source** · created by **Lua Helena Moon Martins Cardoso (Moon)** with AI-assisted coauthorial development by **Áurion** · [Licensing](https://github.com/luahelenammc/Moon-Source/blob/main/LICENSING.md) · [Use & attribution](https://github.com/luahelenammc/Moon-Source/blob/main/MOON_SOURCE_USE_AND_ATTRIBUTION.md) · [Full source (.zip)](https://github.com/luahelenammc/Moon-Source/archive/refs/heads/main.zip)
