---
title: "ADR-0006: Merge coverage for the living architecture"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0006: Merge coverage for the living architecture

## Status

**Accepted** on November 27, 2026. The product owner chose to show architecture changes from both human and agent PRs. [Approved V1 coverage amendment](../requirements/v1-merge-coverage.md)

## Context

The pilot helps engineers keep up with architecture changes made by agents. The approved discovery calls for one selected area in one GitHub repository and uses known agent-led PRs to judge the experience. A GitHub webhook can signal merges without requiring attribution. The open scope question is whether architecture changes by people should also enter the living map. [Approved V1 scope](../requirements/product.md#8-release-scope) · [ADR-0005](adr-0005-merge-detection.md)

For example, a human-authored PR might rename a Checkout component before an agent moves payment retry logic out of it. The earlier merge is part of the context an engineer needs to understand the later change. A team can mark agent-led PRs with a repository label if it needs explicit attribution. GitHub documents labels as repository-defined metadata. Label coverage depends on what the team's workflow records. [GitHub labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)

## Decision

Keep the selected area's map current with architecture-changing merges regardless of who opened or implemented the PR. Show those merges in the area's recent changes. Evaluate the pilot using known agent-led PRs to test the intended cognitive-debt workflow. Evaluate scope and architecture impact from repository evidence independently of PR authorship.

## Consequences

### Positive

- **POS-001** Engineers can see the current relationships and responsibilities when a later agent change relies on a prior human change.
- **POS-002** Teams can try the living map within their existing merge process. The classification needed for the product workflow concerns changes to the selected area's architecture.

### Negative

- **NEG-001** The recent merges view can include changes by people as well as agents. Validate that engineers can still find the changes they care about.
- **NEG-002** A broader set of candidate merges can increase retrieval and analysis work. Measure the volume for one pilot area and the effectiveness of prefiltering before adding provider or attribution machinery.

## Alternatives Considered

### Follow only PRs explicitly marked as agent-led

- **ALT-001** Use a team-controlled signal such as an existing GitHub label. This gives the merge list a clear focus on explicitly recorded agent work. Unmarked agent PRs are missed, and intervening human changes either leave the map stale or need a separate path to refresh it.

## Implementation Notes

- **IMP-001** Check a sequence where a human-authored architecture change precedes an agent-led change in the same area. Include an unrelated merge and a behavior-only change to check the selected area and architecture boundary.
- **IMP-002** Use known agent-led examples for pilot evaluation. Compare map accuracy and the time and effort to locate and explain a change against the team's existing GitHub workflow.

## References

- **REF-001** [V1 requirements and domain rules](../requirements/product.md#6-domain-and-rules)
- **REF-002** [Canvas interaction for recent merges](../../EXPERIENCE.md#4-information-architecture)
- **REF-003** [Domain and data architecture](../../ARCHITECTURE.md#5-domain-and-data-architecture)
- **REF-004** [Approved V1 coverage amendment](../requirements/v1-merge-coverage.md)
