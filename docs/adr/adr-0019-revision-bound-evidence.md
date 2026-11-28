---
title: "ADR-0019: Publish revision-bound evidence with architecture observations"
status: "Accepted"
date: "2026-11-28"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision", "evidence"]
supersedes: ""
superseded_by: ""
---

# ADR-0019: Publish revision-bound evidence with architecture observations

## Status

**Accepted** on November 28, 2026. The product owner chose to retain short checked excerpts in SQLite with their pinned GitHub links. The reviewed proposal had SHA-256 `8090c1742402dee563a0969e82e5b085491139c9fa18a030df72ace9be1597ea`.

## Context

The accepted persistence design uses SQLite for the worker and web process. An open canvas may show the last supported area map while the inspector compares a later integration whose change has independent support. The inspector needs exact evidence for the selected claim, and historical evidence must remain addressable. Compare the availability of source in the inspector, the amount of repository data retained, and the effect on access checks. [Persistence](adr-0011-v1-persistence.md) · [SPEC-007, SPEC-021, and SPEC-023](../../SPEC.md#3-observable-behavior)

## Decision

Retain the minimum decisive source excerpts in the installation's SQLite database with their repository, full commit, file path, and line range. Use the text Narys checked at publication. Each material claim points to its own source evidence, with separate before and after references where the claim describes a change. PR attribution, recorded intent, and deployment keep their own provenance. Analysis may read more source than it publishes. Retain the selected excerpts and references needed by published observations. [Source correspondence](adr-0008-map-update-evidence.md) · [Data boundary](adr-0002-repository-data-boundary.md)

The worker checks candidate claims against pinned source before publication. It writes the result, evidence, and work state together in the existing SQLite transaction. It advances the current area map only when the transition from the current map to the new revision is supported. An independently supported later comparison can publish with its own revisions while the area map stays on the last supported revision. [Automatic publication](adr-0018-automated-map-publication.md) · [SQLite isolation](https://www.sqlite.org/isolation.html)

The web process reads the selected map revision or comparison and observation within the authorized workspace. Each action resolves within that context. If its target is absent, return the existing unavailable state. The browser renders the records the server returns. Apply the same access and disclosure rules to retained excerpts as to every workspace response. A retained excerpt cannot establish public eligibility when a due GitHub visibility check fails. [Design baseline](../approvals/v1-design-baseline.md) · [Publication](adr-0017-workspace-publication.md) · [SPEC-014/015 and access timing](../../SPEC.md#5-access-timing)

## Consequences

- **POS-001** A permitted reader can inspect the lines Narys used without another GitHub source fetch. Published evidence remains available when later analysis fails.
- **NEG-001** SQLite and its backups contain copies of repository excerpts, including private source when analysis is authorized. Keep copies limited to the decisive lines and verify that guest responses exclude private claims and evidence.

## Alternatives Considered

- **ALT-001** Store pinned references and fetch excerpts on demand. This retains less source locally. Opening the inspector then depends on a GitHub source read at the selected revision. Access checks apply to both approaches.

## Implementation Notes

- **IMP-001** Use Flask #4692 to verify direct response construction before the merge and delegation, provider binding, and the built-in serializer after it. Check that the synthetic `orjson` default claim cites the contrary source and that performance motivation remains attributed to the PR. [Flask reference case](../research/2026-11-27-flask-merge-reference-case.md#4-findings-and-expected-canvas)
- **IMP-002** Exercise interrupted publication, replay, and two simultaneous revision contexts. A later comparison must read its own evidence while the canvas remains at the last supported revision. Verify public withdrawal, due-check failure, and recovery before guest access. Use the same worker and read paths for a qualifying live Narys merge. [CONF-008, CONF-010, and CONF-014](../../SPEC.md#4-conformance-cases)
