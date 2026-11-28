---
title: "ADR-0008: Check change claims against merged source"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0008: Check change claims against merged source

## Status

**Accepted** on November 27, 2026. The product owner chose to check what PR and commit descriptions claim changed against what changed in the source.

## Context

At merge, Narys needs to show supported architecture changes and make uncertainty visible. PR descriptions, commit messages, and related records can explain the intended change. A model can extract those claims and propose observations from the repository. The integrated source comparison establishes what changed. Revision-pinned links let an engineer inspect the correspondence. [V1 experience, UX-005](../../EXPERIENCE.md#4-information-architecture) · [GitHub permanent links](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files)

In the Flask reference case, a read-only Python syntax-tree check confirmed the PR's description of the `jsonify()` call-site change. A deliberately incorrect example claiming that Flask made `orjson` its default conflicts with the merged provider configuration and its call to Python's `json.dumps`. The real PR's discussion of faster serializers supplies rationale. [Flask reference case](../research/2026-11-27-flask-merge-reference-case.md#4-findings-and-expected-canvas)

## Decision

Compare concrete claims about the PR's changes with the source before and after integration. Use revision-pinned code and relevant relationships to check what changed. Start with observable facts, such as changed calls, configuration, and declared dependencies. Use the supported source change to update the map, including changes the PR description omits. When the comparison conflicts with a stated change, show the claim and source as a possible divergence. When the source evidence is incomplete, mark the claim unconfirmed.

Limit these checks to source correspondence. Record goals such as improved performance as attributed rationale. Keep deployment and test results tied to their own evidence. Define the observable conditions for a match, possible divergence, and insufficient evidence in the specification.

## Consequences

### Positive

- **POS-001** Engineers can compare what a PR says changed with the code that landed and see mismatches in context.
- **POS-002** The same source correspondence applies across hosted and local models, including when PR descriptions omit relevant changes.

### Negative

- **NEG-001** A small set of source checks covers direct relationships more readily than dynamically wired behavior. Some plausible changes will remain uncertain in V1.
- **NEG-002** Checks add work to the merge path. Measure their coverage and latency on real examples before expanding the set.

## Alternatives Considered

### Use descriptions and resolving citations as the explanation

- **ALT-001** This covers more claims with less checking. A description or a valid source link can still misstate what changed. Engineers would need to find mismatches themselves.

## Implementation Notes

- **IMP-001** Exercise the matching Flask claim, the synthetic wrong-default claim, and the partial-evidence retry case. Check that the direct change publishes, contradictory evidence is reported, and incomplete evidence remains visible as uncertainty.
- **IMP-002** Include a claim supported through a changed dependency while the named function's file is untouched. Check that the comparison can follow source relationships and avoids declaring a mismatch based only on a file name.

## References

- **REF-001** [V1 requirements, REQ-001 through REQ-004](../requirements/product.md#6-domain-and-rules)
- **REF-002** [Model routing and repository data boundary](adr-0002-repository-data-boundary.md)
- **REF-003** [Domain and data architecture](../../ARCHITECTURE.md#5-domain-and-data-architecture)
