---
revision: 1
family: FIELDNOTE
status: active
series: civilizational_field_notes
voice: Lua Helena × Áurion / editorial synthesis
authority: Moon-directed upstream-sanitized expansion 2026-11-06
epistemic_status: interpretive_literature_synthesis_not_original_empirical_research
published_at: 2026-11-06T18:36:00Z
updated_at: 2026-11-06T18:36:00Z
id: FIELDNOTE-024
source_episode: E0136
topic: AI agents / institutional security
canonical_url: https://www.luahelena.com.br/beacon/docs/FIELDNOTE-024.html
editorial_wave: wave_4_upstream_verified
---

# A Tool Result Must Not Become an Agent's Authority

## The question

When an AI agent reads material from another service, what prevents that material from redefining the agent's permissions or causing an unauthorized action?

Citadel inquiry **E0136** considered a trust boundary that becomes especially consequential when systems connect reading, reasoning and action across applications.

## The architecture problem

The OWASP 2025 guidance distinguishes prompt injection from ordinary task instructions: untrusted content can influence a model's behavior in ways its operator did not authorize. Its separate category of **excessive agency** concerns the harmful consequences of tools with overbroad powers or insufficiently constrained actions. Even a well-written instruction in a retrieved document has no inherent right to authorize an email, change a permission or alter a record.

The distinction is not unique to LLMs. Software has long separated data provenance, credentials and execution privileges. LLM-based agents make it easier to blur these categories because an apparent instruction may arrive inside the same text stream as material legitimately needed for the task.

## The rival concern

Agents that require permission for every trivial step become unusable. Restricting tools too tightly can prevent valuable automation and accessibility. Better design need not mean making every action a human bottleneck: it can allocate narrow permissions, log provenance and reserve explicit approval for risky or irreversible transitions.

## The interpretive delta

We separate **what information may be read**, **what a model may infer** and **what it is authorized to do**. Trust in a source's factual content is not a grant of operational authority. A traceable handoff should preserve the identity and limits of the actor who granted each permission.

This principle does not claim that a particular commercial agent or application has been compromised.

## Sources

- [OWASP (2025), LLM01 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).
- [OWASP (2025), LLM06 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).

**Provenance:** Consolidated inquiry E0136, public interpretation. No exploit instructions, credentials, private connectors or restricted workflows are published.
