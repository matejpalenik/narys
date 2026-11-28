---
title: "ADR-0007: Starting point for the first architecture map"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0007: Starting point for the first architecture map

## Status

**Accepted** on November 27, 2026. The product owner chose both a file or folder and a plain-language description as starting options.

The starting inputs apply to the automated setup in [ADR-0018](adr-0018-automated-map-publication.md). That decision replaces the confirmation step in the original workflow below.

## Context

V1 tracks one selected area of one GitHub repository. Narys proposes the starting map at a known revision, and a maintainer confirms or corrects it on the canvas. Setup needs a useful starting point at low effort, and the area must remain understandable as code moves. Compare how much repository knowledge the maintainer needs, how much code Narys must inspect, and how readily the maintainer can recognize and correct an unsuitable proposal. [V1 requirements](../requirements/product.md#6-domain-and-rules) · [Starting map review](../../EXPERIENCE.md#4-information-architecture)

In the Flask reference case, `src/flask/json/` is a useful starting directory. The app creates the provider in `src/flask/app.py`, outside that directory. GitHub supports reading a path at a specific commit. The exercise shows that a chosen path can anchor the analysis and that the map needs relevant source beyond it. It does not establish how reliably a model can find that source. [Flask reference case](../research/2026-11-27-flask-merge-reference-case.md#4-findings-and-expected-canvas) · [GitHub contents API](https://docs.github.com/en/rest/repos/contents#get-repository-content)

## Decision

Let the maintainer select a file or folder in the connected repository or describe the area in plain language. Pin the proposal to a repository revision. A description first resolves to candidate starting files, then uses the same evidence retrieval and map generation as a selected path. Narys follows directly relevant references to propose components, responsibilities, and relationships. Preserve uncertainty if the description points to several plausible areas. The maintainer confirms or corrects the proposed map and its working boundary in the existing canvas flow.

Use the confirmed map and its source relationships to inform later change analysis. A future merge can affect the area by changing source outside the original directory. The mechanism for recognizing relevant merges and tracking moved source remains open.

## Consequences

### Positive

- **POS-001** Maintainers can start from a familiar path or describe the capability using the team's terms. Both paths lead to the same review and confirmation task.
- **POS-002** Either route can start with a narrow read and gather context as the evidence requires. Starting files and source references explain how Narys arrived at the proposal.

### Negative

- **NEG-001** Plain-language input adds a discovery step. A description may match several places, and the maintainer may need to resolve the intended area.
- **NEG-002** Resolving indirect wiring can require source beyond the starting path. Verify retrieval quality and cost and make incomplete evidence visible during review.

## Alternatives Considered

### Offer one starting method

- **ALT-001** A path-only flow would be simpler to implement and require the maintainer to locate a starting file or folder. A description-only flow would let the maintainer start from familiar terms and make source discovery necessary for every proposal. The product owner chose to offer both.

## Implementation Notes

- **IMP-001** Begin the Flask reference case from `src/flask/json/` and from the description “How Flask builds JSON responses.” Check that both proposals find the provider configuration in `src/flask/app.py` and stay focused on JSON response construction.
- **IMP-002** Include an ambiguous description, a poorly chosen path, and a change outside the starting directory. Observe whether the maintainer can recover and whether the map captures the relevant change.

## References

- **REF-001** [V1 requirements, REQ-004](../requirements/product.md#6-domain-and-rules)
- **REF-002** [V1 experience, UX-002 and UX-004](../../EXPERIENCE.md)
- **REF-003** [Domain and data architecture](../../ARCHITECTURE.md#5-domain-and-data-architecture)
