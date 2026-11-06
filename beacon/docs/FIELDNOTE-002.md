<!-- Canonical public editorial Markdown. Generated HTML and plain text are derived. -->
---
revision: 1
family: FIELDNOTE
status: active
series: civilizational_field_notes
voice: Lua Helena × Áurion / editorial synthesis
authority: publication_requested_by_Moon_2026-11-06
epistemic_status: interpretive_literature_synthesis_not_original_empirical_research
published_at: 2026-11-06T17:30:00Z
updated_at: 2026-11-06T17:30:00Z
id: FIELDNOTE-002
source_episode: E0202
topic: AI & software assurance
canonical_url: https://www.luahelena.com.br/beacon/docs/FIELDNOTE-002.html
---

# When Code Passes but Its Security Regresses

## The question

When an AI-assisted change passes the immediate test, what makes us believe that the rest of the system remains safe?

This note originates in Lunar Citadel consolidated inquiry **E0202**, which considered security under successive AI code revisions. The inquiry's contribution here is an evaluation distinction, not a claim to have run a new security experiment.

## What the evidence changes

In a 2026 empirical study of iterative infrastructure-as-code repair, Agyekum and Santos examined 5,968 scenario timelines and 4,440 adjacent-iteration transitions with available security-check results. Under an inclusive definition, 13.8% of scenarios showed at least one reported security regression. Under a stricter definition restricted to unambiguous exclusive failures, the rate fell to **3.3%** of scenarios. That large difference matters: an apparent failure in a multi-resource configuration can partly reflect how the measurement is defined.

The study nevertheless identified actual regression cases in which a later repair invalidated a previously passing CIS security check. A 2025 ACL evaluation of 20 language models, separately, found that the ability to recognize vulnerable code did not translate reliably into generating secure code or repairing every vulnerability type.

A successful task-specific fix therefore cannot be treated as monotonic progress across every requirement. The meaningful object of review is a **version-to-version set of invariants**: what must remain true even when the local error disappears.

## A serious objection

Repair loops can also improve security, particularly when the feedback actually tests the relevant property. Not every warning signifies a new exploitable vulnerability, and static checks cannot substitute for a complete threat model. The 2026 study concerns infrastructure-as-code configurations, not all software or all AI agents. Its scenario percentages cannot be projected onto an arbitrary production repository.

## Our interpretive delta

We moved from asking whether the latest iteration works to asking **which prior guarantees a new iteration is permitted to invalidate**. That changes the release gate: compare security properties before and after the repair, instead of only re-running a functional success test.

This is an interpretation of other researchers' findings. **No independent security experiment or measured prevalence is claimed by the Citadel.**

## A question worth contesting

Which security invariant, tested independently of the immediate task, would make you reject an otherwise successful AI-generated fix?

## References

- [Agyekum & Santos (2026), *Does Fixing Break Security?*, ESEM / LIPIcs](https://doi.org/10.4230/LIPIcs.ESEM.2026.50).
- [Mou et al. (2025), *Can You Really Trust Code Copilot?*, ACL](https://aclanthology.org/2025.acl-long.849/).

**Provenance:** Lunar Citadel, consolidated inquiry E0202. Public synthesis; underlying private conversation, orchestration and ledger remain outside this publication.
