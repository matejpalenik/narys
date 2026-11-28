---
title: "ADR-0004: Ownership of the maintainer-confirmed map"
status: "Superseded"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: "ADR-0018"
---

# ADR-0004: Ownership of the maintainer-confirmed map

## Status

**Superseded** by [ADR-0018](adr-0018-automated-map-publication.md) on November 27, 2026. The original decision chose Narys as the home of the confirmed map.

## Context

In V1 a maintainer corrects and confirms one starting map on the canvas while inspecting GitHub evidence. The workspace then shows supported architecture changes as PRs merge, with uncertainty visible where evidence is incomplete. The decision is which system holds the record of the confirmed map. Compare the effort of confirmation, the access Narys needs, the ability to recover maintainer decisions, and access to the map outside Narys. [V1 requirements](../requirements/product.md#6-domain-and-rules) · [V1 experience](../../EXPERIENCE.md)

GitHub can supply repository content at a commit, branch, or tag through its read API. A Narys workflow that writes a tracked map file directly through GitHub's contents API would require write permissions. The team could commit a file itself with a read-only Narys integration, with confirmation taking effect once the committed file is available. [GitHub repository contents API](https://docs.github.com/en/rest/repos/contents)

## Decision

The team's Narys installation is the canonical home of the maintainer-confirmed map. A canvas confirmation records the reviewed repository commit, the corrected map for that area, and its evidence references in durable Narys state. GitHub remains the source of code, PRs, and delivery evidence. Subsequent observations identify their own repository revision and evidence. They can update the displayed map while preserving the maintainer's confirmation at the reviewed revision. The database technology and revision comparison mechanism remain open.

## Consequences

### Positive

- **POS-001** The maintainer can confirm the map as part of the canvas review. The proposed GitHub integration can use repository read permissions for this workflow.
- **POS-002** The workspace can keep the confirmed starting map and later observations tied to their respective revisions. It can show the worker's new retry path alongside uncertainty about Checkout's current behavior.

### Negative

- **NEG-001** A Git clone contains the implementation and committed documentation. Recovering the Narys confirmation history also depends on the team's workspace backup.
- **NEG-002** The confirmed map is available from the Narys installation. Other tools that rely on an architecture file in the repository would need a way to consume it.

## Alternatives Considered

### Keep the confirmed map as a versioned repository file

- **ALT-001** Git history would carry the map with the code, and teams could use their usual PR review. The maintenance workflow would need to handle the gap between reviewing a correction on the canvas and committing the file. A write-back workflow adds repository permissions, while a team-managed commit adds a step to confirmation. Narys would still keep its merge processing progress separately.

## Implementation Notes

- **IMP-001** Confirm a corrected starting map with a read-only GitHub connection. Replace or restore the application instance and verify the corrected map, its commit, and its evidence references are available.
- **IMP-002** Compare the confirmed map with a later merge where only part of the architectural change is supported. Check that confirmation remains attributable to the original reviewed revision and that the latest canvas shows the evidence gap.

## References

- **REF-001** [Approved V1 requirements, REQ-001 through REQ-004](../requirements/product.md#6-domain-and-rules)
- **REF-002** [Starting map review and incomplete evidence](../../EXPERIENCE.md#4-information-architecture)
- **REF-003** [Domain and data architecture](../../ARCHITECTURE.md#5-domain-and-data-architecture)
