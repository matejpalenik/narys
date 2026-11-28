---
title: "ADR-0018: Automatically publish revision-backed architecture maps"
status: "Accepted"
date: "2026-11-27"
authors: "Narys product owner and architecture design"
tags: ["architecture", "decision"]
supersedes: "ADR-0004"
superseded_by: ""
---

# ADR-0018: Automatically publish revision-backed architecture maps

## Status

**Accepted.** On November 27, 2026, the product owner directed that Narys build and maintain the map automatically and distinguish claims by the evidence from automated source analysis. [Approved V1 change](../requirements/v1-automated-map.md)

## Context

The product helps engineers follow merged changes without reconstructing what happened. The earlier starting-map design required a maintainer to review the first map. The new workflow needs to become useful after workspace setup and remain useful when nobody is signed in. [Earlier ownership decision](adr-0004-confirmed-map-ownership.md) · [Starting area selection](adr-0007-starting-map-scope.md)

## Decision

Narys owns the persisted map. Once the repository and area are configured, the analysis worker creates and publishes the first map and updates it as qualifying merges land. Each map revision keeps its source references. Preserve earlier revision observations for comparison. Apply the same source correspondence checks to the first map and later observations. Publish supported claims and expose material evidence gaps in context. [Source correspondence](adr-0008-map-update-evidence.md) · [Revision attribution](adr-0009-merged-revision-attribution.md)

The maintainer's workspace role governs setup and protected access. The worker publishes independently of user sessions. The publication setting governs anonymous reads. Identify gaps in repository source or configuration without requiring a maintainer to resolve them before the map can advance. [Workspace access](adr-0013-workspace-access.md) · [Public workspace access](adr-0017-workspace-publication.md)

## Consequences

- **POS-001** Engineers can return to a populated workspace after configuration and follow new architecture changes without a map review task.
- **NEG-001** The initial map depends on the quality and coverage of automated source analysis. Narrow claims, source links, and visible gaps give readers a way to judge its usefulness.

## Alternatives Considered

- **ALT-001** Require an initial review before publishing the first map. This lets a maintainer catch mistakes before anyone uses the map. It makes the experience depend on a person doing review work and delays use after setup.

## Implementation Notes

- **IMP-001** Exercise initial setup with the browser closed. Verify initial publication, evidence status, recovery, and map history through later merges without a maintainer action.
- **IMP-002** Distinguish an ambiguous area description from an unsupported architecture claim. Let workspace setup supply a narrower area if the description cannot establish the intended scope. Define failed-analysis feedback in the specification.
