---
name: define-epic
description: >-
  Convert approved business requirements, normative specification and architecture into a release scope and coherent epics. Resolve scope questions with the human, define integrated acceptance, and publish approved parent issues to the configured tracker only when authorized.
---

# Epic definition

## Intent

Define the smallest coherent groups of capabilities that together deliver the approved release. Give the implementation agent the product context and acceptance boundary for its issues. Do not define an epic by technology or organizational layer.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md) and [epic template](references/epic.md).

Read the [standards contract](../software-factory/references/standards.md) as applicable to the approved engineering baseline. Allocate only required product capabilities and demonstrated enabling work. Do not create a standards-migration epic unless explicitly authorized.

For UI scope, allocate approved user journeys from EXPERIENCE.md and the corresponding SPEC/CONF obligations. Reference the applicable experience/design baseline under the [experience contract](../software-factory/references/experience-contract.md), including real foundation prerequisites. Include a coherent design-system enabling increment only when needed by an approved journey; never create a catalog backlog for hypothetical components. Integrated acceptance tests the actual user task, not only individual stories.

## Methodology

### 1. Establish release scope

Read applicable research, approved requirements, `SPEC.md` or linked subsystem specifications, architecture, ADRs, existing epics and issues. Validate the relevant engineering baseline under the [consistency contract](../software-factory/references/consistency.md). Use specification as the primary source of required behavior. Do not invent new normative obligations. Send missing material behavior to `define-specification` and changed business intent to `discover-requirements`. Identify the release objective, its acceptance journey, binding requirements and exclusions. Verify which capabilities already exist. If scope is unclear, ask the human one decision at a time. Do not re-open settled decisions without new evidence.

### 2. Propose the minimum epic set

Group related requirements into coherent user or operational outcomes. An epic must describe an observable result that is meaningful in the product, not merely a component or a set of files. Compare each candidate with the release objective. Merge overlapping epics, remove speculative features and defer work not necessary to the approved release. For small changes, reuse an applicable epic or explicitly approve a single small epic. Do not force a hierarchy for a one-step task.

Show a derived coverage table linking in-scope SPEC and CONF IDs to proposed epics, shared guarantees and the integrated release scenario. Identify partial allocation, missing coverage and intentional deferrals. Do not maintain a second requirements matrix. Identify dependencies and release order, but do not invent child issues yet. Ask the human to approve the scope and epic boundaries.

### 3. Define each epic

Use the epic template. State the actor, problem, intended result, required journey and high-level capabilities. Link the approved business outcome, applicable specification IDs and conformance cases, architecture and ADRs. Use an integrated operational scenario to validate that the complete journey satisfies the intended use, separately from individual conformance checks. State non-goals and meaningful invariants. Include a small workflow or mockup when necessary to review the experience. Define integrated acceptance scenarios independent of future issue boundaries. Separate functional acceptance from market or product success metrics. Use no invented thresholds.

Resolve open decisions with the human. If the epic needs architectural changes, send those decisions to `design-architecture`. Record approval of the exact epic revision and the applicable requirements, architecture and specification baseline before program design. Approval of a list of titles does not approve detailed epic bodies.

Keep the epic near 400–800 words of prose. Reference canonical specification obligations, requirements, ADRs and approved shared program contracts rather than copying them. Use the epic for shared acceptance, not a detailed list of implementation files. Do not create separate epics solely for a word target.

### 4. Publish approved epics

Use the configured issue tracker. When authorized, check for duplicates, publish each approved epic as a parent issue, and set native dependency links if applicable. Reconcile existing items rather than creating duplicates. Keep epic acceptance and status in the tracker. If no tracker is available, write separate local drafts and report the missing publication step. Do not release the epic for execution merely because it exists. Do not create tickets without an approved breakdown.

## Response contract

For a release breakdown, present the release outcome, a compact epic table (outcome, requirements, acceptance, dependencies), a coverage gap if any, and the decision required. For an epic review, present the user journey, scope and non-goals, integrated acceptance cases, links to design and exact approval target. Ask one specific question at a time. Use a flow diagram where it improves review. Link complete drafts.

## Completion criteria

The human approves the release boundary and exact epic bodies. Each epic has a meaningful, testable outcome, traceable requirements, explicit exclusions and a valid compatible engineering baseline or a clearly recorded blocker. Do not approve an epic as executable with an unresolved material contradiction. When publication is authorized, verify parent issues exist with the approved content. Stop before program design or issue generation unless explicitly requested.
