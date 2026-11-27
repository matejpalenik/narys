---
name: define-tickets
description: >-
  Decompose an approved epic and program design into the smallest set of executable vertical-slice issues. Interview the human on slice boundaries, show complete issue specifications with relevant program design, approve dependencies and publish only authorized issues.
---

# Ticket definition

## Intent

Make the issue the bounded implementation specification. The system specification remains the canonical behavioral contract. A fresh agent should know what to build, how it fits the approved design, what it must preserve and how to prove completion. Minimize the number of tickets and avoid creating a separate ticket for each technical layer.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md) and [issue template](references/spec.md). Read the approved epic, relevant specification and conformance cases, architecture, ADRs, program design and relevant code. Do not generate issues to resolve decisions that the planning phase has not made.

Use the adopted [standards contract](../software-factory/references/standards.md) and approved project design. Reference the baseline and material approved standards exceptions rather than copying general rules. Include required architecture and language checks in verification where applicable. Do not split a vertical slice into layer or tooling tickets unless independently necessary and approved.

For UI work, reference approved UX/DS IDs and relevant immutable prototype/story/token/component locations through the baseline, not a copy of the design system. Include observable integrated behavior, applicable accessibility, adverse states and story/browser evidence under the [UI verification reference](../software-factory/references/ui-verification.md). Group design-system foundation work around a real composition or journey; do not split into a ticket per button. Establish real component dependencies and block readiness when a necessary foundation is not approved or integrated unless the issue itself explicitly delivers it.

## Methodology

### 1. Determine the minimum vertical path

Map the epic journey and integrated acceptance to the necessary increments. Start with a tracer bullet that runs through the relevant end-to-end path and can be demonstrated. In a new path, a controlled stub may prove wiring if explicitly approved and clearly labeled. Prefer a real thin path when feasible. Do not claim stubbed behaviour satisfies real product acceptance. Then deliver the real happy path and meaningful variants or failure controls in testable increments. Do not defer necessary security or integrity controls past a usable release boundary.

### 2. Propose slices and question the boundaries

For each proposed slice, state what can be demonstrated when it lands, which specification obligation and conformance scenario it covers and why it needs a separate issue. Split only for meaningful behaviour, feedback, dependency, risk or review isolation. Merge slices that cannot be verified independently. Permit necessary enabling work with an observable engineering result, including compatible migrations. Do not use a line-count target or a ticket-count target. Do not create separate tests, cleanup, generic foundation or future-proofing issues without an approved reason.

Present a table of issue titles, demo paths, requirements and blockers. Use a Mermaid dependency graph when useful. Ask the human one material question at a time about boundaries and order. Resolve all material disagreements before publication. Plan coverage of the full epic, but draft only the batch the human wants to authorize when later details depend on earlier evidence.

Perform a consolidation pass before showing the plan. For each issue, answer: What result can be demonstrated? What independent check can distinguish success from failure? What breaks or becomes harder to review if this issue is combined with its neighbor? If no meaningful boundary remains, combine the issues. Use the [slicing example](references/vertical-slicing.md) to distinguish technical tasks from delivery slices. A separate prerequisite is valid only when it has a necessary measurable result and a justified dependency.

Example: for purchase approvals, do not propose separate tickets for database, repository, domain entity, service, API, UI, integration tests and documentation. Prefer **Submit a purchase request** and **Approve or reject a pending request** when each is small enough to review and can demonstrate a complete result. Include the necessary layers, tests and documentation in each. The full example and exceptions are in the slicing reference.

### 3. Write executable issue specifications

Use the issue template. Each issue describes the approved observable increment, acceptance cases, constraints and non-goals. Reference applicable REQ, SPEC, CONF, PROP, ADR and interface contracts at approved revisions. State partial coverage if a system obligation spans slices. Do not redefine the product contract or silently weaken it. Include the relevant Program design gate content: expected files, type and method signatures without bodies, call stack, named tests and assertions, and resolved least-confident decisions or blockers. Target 250–500 words of prose per issue. Keep the decisive code shape in the issue. Never remove a criterion or split a cohesive slice just to meet the target. Link long shared contracts to immutable accessible revisions rather than copying them. Preserve the approved design and do not invent new design in issue writing. For routine or non-code changes, record why a program-design item does not apply.

Acceptance criteria must be falsifiable and owned by this issue. Specify the initial state, action and observable result. Include a meaningful failure case or invariant where relevant. Identify test boundary and expected evidence. Check that new behaviour is absent at the base or that an independently justified verification can distinguish the broken implementation. Keep valid passing regression and characterization checks. Determine required verification from `REVIEW.md`, epic obligations and program design, not from a desire to minimize checks.

### 4. Verify the issue set and approve

Check coverage of epic acceptance and allocated specification cases, real dependencies, duplicate scope, cyclic blockers, safe sequencing, interface compatibility and testability. Review traceability and semantic consistency with the [consistency contract](../software-factory/references/consistency.md). Generate any coverage table from the references. Do not authorize work with orphan references, unknown material effects or unresolved contradictions. Show the consolidation results and justify each remaining split. Check exact baseline references with the [baseline contract](../software-factory/references/baseline.md). Do not rely on future issues to make an acceptance criterion true. Confirm each issue is understandable in a fresh context. Show exact draft issue bodies or accessible draft files, not only a table of titles. Request explicit Ticket plan approval. Record the approved bodies and dependency graph. An unresolved material program-design choice sends work back to design.

### 5. Publish and release only with authorization

When authorized, create child issues under the correct parent in dependency order. Use native parent and blocked-by relationships. Verify published bodies, relationships and IDs. Use existing tracker conventions and a trusted approval mechanism. A ready label alone is not authorization. Do not dispatch merely because an issue is published. If tracker access is unavailable, provide local per-issue drafts and explain the blocker.

## Response contract

Show the epic outcome, slice table, dependency diagram if useful, acceptance coverage and exact next decision. Present each complete issue using the template before approval. Keep prose concise and use signatures and diagrams rather than implementation narration. After publication, report issue links, blockers and approval/release status.

## Completion criteria

The approved issues and their graph are complete for the authorized batch. Each issue is a bounded, independently verifiable contribution to the epic, includes its approved program design, and has accessible references. Verify publication when requested. The factory starts only under separate execution authorization.
