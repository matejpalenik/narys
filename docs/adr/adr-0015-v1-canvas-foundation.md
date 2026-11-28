---
title: "ADR-0015: V1 canvas foundation"
status: "Accepted"
date: "2026-11-27"
authors: "Narys product owner and architecture design"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0015: V1 canvas foundation

## Status

**Accepted.** On November 27, 2026, the product owner selected React Flow for V1. The component and verification tools follow the product owner's existing shadcn/ui and Storybook direction.

## Context

The approved React workspace uses a full-screen architecture map. Recent merges and PR details open over it. Engineers switch between revisions, inspect relationships and their evidence, and return to the map in context. The disposable retry prototype demonstrated these interactions on a small fixed graph. The production workspace needs to render a repository-derived graph and support the same tasks with keyboard navigation. The product owner prefers shadcn/ui components and Storybook for component development and verification. [V1 experience](../../EXPERIENCE.md#8-prototypes-and-decisions)

## Decision

Use React Flow as the V1 graph renderer. Use its viewport controls and focusable node and edge primitives. Render Narys-specific component, relationship, and uncertainty states with React. Use shadcn/ui for workspace controls and Storybook for rendered component verification. The Narys revision and evidence records drive the map and overlays. The browser owns viewport and selection state. The graph renderer consumes a projection of the Narys records and owns no persisted architecture or evidence. [React Flow accessibility](https://reactflow.dev/learn/advanced-use/accessibility) · [Custom nodes](https://reactflow.dev/learn/customization/custom-nodes) · [shadcn/ui](https://ui.shadcn.com/docs) · [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite)

## Consequences

- **POS-001** Built-in navigation and focus primitives reduce the interaction code Narys must maintain. Custom nodes can present evidence states in the workspace's visual language.
- **NEG-001** The renderer adds a client dependency. Narys still owns layout behavior across revisions, overlay focus, and understandable uncertainty labels. Documented primitives establish feasibility. The integrated journeys need rendered verification.

## Alternatives Considered

- **ALT-001** Adapt the graph from the disposable prototype. This would give Narys direct control over rendering and avoid the graph dependency. Narys would maintain viewport behavior, keyboard interaction, and relationship focus as graph shape varies. Reuse the prototype's task and expected observations as verification inputs whichever renderer is selected.

## Implementation Notes

- **IMP-001** Verify the retry example with both mouse and keyboard. Keep common map elements in place across revision comparisons and while overlays open. Check focus return and identify the unconfirmed Checkout retry behavior through text as well as visual styling.
- **IMP-002** Exercise the guest and maintainer variants with the same map fixture. Verify integrated access against server responses during application verification.

## References

- **REF-001** [V1 application runtime](adr-0010-v1-application-runtime.md)
- **REF-002** [Public Narys demo](adr-0014-public-narys-demo.md)
