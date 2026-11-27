---
name: design-architecture
description: >-
  Design or revise the system architecture from approved discovery and evidence. Resolve technical decisions with the human, create numbered ADRs as decisions are made, and maintain the single root ARCHITECTURE.md using C4 views. Use for a whole product or a scoped feature change.
---

# Architecture design

## Intent

Derive the simplest architecture that satisfies the approved requirements. Make system structure, responsibilities, data, runtime behaviour and trade-offs understandable to an engineer who has not worked on the project.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md), [architecture template](references/architecture.md) and [ADR format](references/adr.md). Review applicable research, approved requirements and existing `SPEC.md` or subsystem contracts when present. Read the [consistency contract](../software-factory/references/consistency.md). For initial design, derive architecture from approved requirements and refine it with `define-specification` before baseline approval. Inspect code, configuration and tests if present.

Read the [standards contract](../software-factory/references/standards.md) and [engineering-standards](../engineering-standards/SKILL.md). Select the applicable language profile (including [python-standards](../python-standards/SKILL.md) for Python). Propose standards adoption and the exact immutable snapshot with the human during the architecture interview. Establish applicable DDD, Onion Architecture, CQRS, module boundaries, tooling and verification choices in the existing architecture and ADRs. Record approved profile and revision in AGENTS.md. Do not duplicate general rules or silently impose a new profile on existing code. Establish the runtime, dependency manager, verification and deployment decisions needed by [setup-repository](../setup-repository/SKILL.md); configure only after the relevant choices are approved. Do not design a separate tooling platform without a requirement.

For UI-bearing products, use the relevant approved or proposed EXPERIENCE.md as an architecture input under the [experience contract](../software-factory/references/experience-contract.md). Resolve interaction feasibility, state ownership, streaming/canvas requirements, accessibility and frontend boundaries with `design-experience`; do not duplicate experience decisions or invent features. Propose React, shadcn/ui and Storybook for a new compatible frontend, not a mandatory migration. Evaluate alternatives against actual requirements, and record accepted choices in architecture/ADRs. Use the [frontend standard](../engineering-standards/references/frontend.md).

## Methodology

### 1. Establish architecture drivers

Identify required user journeys, domain invariants, quality attributes, workload and operating constraints. Distinguish binding requirements from preferences. Do not choose a technology because it is familiar or fashionable. Record missing measurements or thresholds rather than inventing them.

### 2. Resolve technical decisions with the human

Investigate relevant standards and primary technology sources before proposing choices. Establish comparison criteria from requirements, lifecycle cost and risk before selecting alternatives. Use qualitative comparisons unless evidence supports numerical scoring. Record consequential assumptions, possible failure consequences, and how to retire uncertainty. Do not create a separate decision report or risk register by default. Ask one consequential question at a time in dependency order. Start with system boundaries, deployment and operating model, then data ownership, interfaces and technical mechanisms. Explain the question, alternatives, trade-offs and recommendation. Use a small diagram, code shape or disposable experiment if it resolves uncertainty. Prefer a simpler sufficient design and existing accepted mechanisms. Do not add services, layers or frameworks without a requirement.

For each durable choice, create or update a proposed ADR using the referenced format as the discussion occurs. Allocate the next unused four-digit number by inspecting the directory, including existing drafts. Serialize numbering or coordinate ownership to avoid collisions. Mark accepted only when the authorized human confirms the decision. Preserve rejected and superseded history. Do not create an ADR for every reversible local choice. Resolve conflicts through a superseding ADR, not silent edits to accepted rationale.

### 3. Construct the architecture

Write a top-down C4 description. Include system context and container views for the product. Add component views for boundaries that require explanation and code views or sketches where they clarify a stable design. Use supporting dynamic and deployment views for consequential flows and environments. Do not require all four diagrams for every feature. A C4 container is an application or data store boundary, not necessarily a Docker container.

Use Mermaid with clear titles, element types, responsibilities, technologies, directional relationship labels and protocols. Include legend where needed. Show the system mechanisms for domain and data ownership, integration, trust boundaries, security, failure handling, operability, testing and deployment/recovery. Link specification IDs for required semantics. Do not redefine domain rules, state transitions, error contracts or guarantees. Identify provider, consumer, owner, canonical interface contract and compatibility approach for material boundaries. Use a compact table in ARCHITECTURE.md, not a separate interface document unless required. Link ADRs for rationale. Distinguish the approved target from verified current implementation. In an empty repository, do not imply the design exists in code.

Keep ADR prose near 300–600 words per decision. Link evidence and architecture sections instead of repeating them. Do not omit alternatives, rationale or material consequences to satisfy a target. Use the shared writing and documentation contracts.

### 4. Review and maintain the baseline

Update the single root `ARCHITECTURE.md` with the approved target and current-state status. For a feature, change affected sections and preserve unrelated content. A feature without a system-level change can reuse the baseline and record that decision. Reconcile against accepted ADRs, requirements, existing specifications and interface contracts. Assess whether each proposed mechanism can satisfy the required guarantees under the relevant assumptions. If a conflict arises, record both claims and resolve with the human at the responsible gate. Ask for specification definition or update after initial architecture approval. Only then establish the jointly consistent baseline for epics. Identify risks, open decisions, evidence and validation obligations. Keep detailed per-ticket types and signatures in program design, not duplicated in the architecture. Ask the human to approve the exact architecture revision and applicable decisions.

## Response contract

During review show the relevant architecture view, one decision table and the exact question. At completion present the system overview, principal decisions, affected sections, unresolved risks, ADR paths and the architecture revision for approval. Do not paste the entire document into chat.

## Completion criteria

The approved system architecture satisfies the known drivers, references accepted decisions, distinguishes proposed from implemented behaviour, and exposes open risks and verification obligations. Material decisions required by the next epic are resolved or explicitly block it. Do not start production implementation.
