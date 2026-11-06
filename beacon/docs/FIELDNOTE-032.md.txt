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
id: FIELDNOTE-032
source_episode: E0223
topic: Election technology / privacy
canonical_url: https://www.luahelena.com.br/beacon/docs/FIELDNOTE-032.html
editorial_wave: wave_5_upstream_verified
---

# An Electronic Vote Can Stay Secret While Its Re-Vote Leaves a Trace

## The question

Can a voting system protect the content of a ballot yet expose information that weakens a voter's ability to resist coercion?

Citadel inquiry **E0223** distinguished ballot secrecy within a cryptographic voting protocol from the metadata created by the identity systems connected to it.

## The documented architecture tension

A 2025 conference paper, *Re-voting Under Surveillance*, examined an interaction between Estonia's internet-voting arrangements and national electronic-identity transaction records. Re-voting is intended to reduce coercion risk by allowing a later electronic ballot to supersede an earlier one. The paper argues that identity-system records may still reveal information about the occurrence or timing of repeated voting actions, even without revealing candidate selections.

This is a **specific threat-model and system-composition assessment**, not evidence that coercion actually changed an election result or that an arbitrary voter can read someone else's ballot.

## A necessary objection

Transaction logs can be important for accountability, fraud prevention and users' ability to audit their identity activity. Whether the metadata reaches a coercive actor depends on access conditions and broader social context. Mitigation that hides some records may introduce other transparency and security tradeoffs.

## The interpretive delta

The integrity of the ballot cannot be evaluated in isolation from authentication, legal retention obligations and surrounding institutional processes. **A secret vote and a private voting history are different properties.**

A defensible assessment examines whether lawful logging unintentionally creates coercion-relevant information while preserving legitimate audit rights. The publication intentionally excludes operational steps for coercing an individual voter or accessing another person's credentials.

## Sources

- [Treier (2025), *Re-voting Under Surveillance*, E-Vote-ID / Springer](https://doi.org/10.1007/978-3-032-05036-6_12).

**Provenance:** Consolidated inquiry E0223, with duplicate reports unified upstream; distinct from E0156's broader theme of coercive supervision. No electoral attack or real-world test was performed by the Citadel.
