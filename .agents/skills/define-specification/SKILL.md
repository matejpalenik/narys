---
name: define-specification
description: >-
  Define or revise the normative behavior of a product, protocol, or feature after the architecture is established and before epics are approved. Resolve semantic decisions with the human. Write the system specification in SPEC.md or its linked subsystem specifications, with stable requirement IDs, interface semantics, invariants, failure behavior, and conformance cases. Do not select technology or write implementation code.
---

# System specification

## Intent

Establish an authoritative, independently verifiable description of how the system must behave. Make the required outcomes precise enough that different implementations can conform to the same contract. The specification defines guarantees. The architecture defines the mechanisms that provide them. Epics select delivery scope from the specification. Tickets authorize bounded implementation increments.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md), [traceability contract](../software-factory/references/traceability.md), [consistency contract](../software-factory/references/consistency.md), and [specification template](references/specification.md). Read approved requirements, architecture, applicable ADRs, existing specifications, public interface schemas, and relevant evidence. Use `first-principles` and `show-me` when useful.

For user-visible workflows, read approved EXPERIENCE.md and applicable prototypes under the [experience contract](../software-factory/references/experience-contract.md). Translate consequential interaction states, user actions, permissions, feedback, recovery, accessible operation and intended-use tasks into normative SPEC obligations and CONF cases. Reference UX IDs, not copied visual details. Return unapproved material experience choices to `design-experience`. Do not define component styling, token values or implementation technology in SPEC unless required by the observable contract.

## Methodology

### 1. Establish the specification boundary

Identify the approved business objectives, intended users, operating scenarios, release boundary, and architecture constraints. For a new product, start at the system level. For a feature, find the affected contracts and amend only those parts. For a bug fix or behavior-preserving refactor, reuse applicable approved specification. Do not write a second normative description for an existing contract. Define externally observable behavior at a system or meaningful subsystem boundary, including guarantees needed by other components. Do not specify internal classes, file locations, database technology, or deployment design unless a technical choice is itself a required public contract.

### 2. Resolve consequential semantics

Ask one material question at a time. Investigate existing evidence first. Present the concrete scenario, alternative behaviors, their consequences, and a recommendation when justified. Include normal, degraded, failure, retry, and recovery scenarios where relevant. Establish identity, terms, state ownership at the semantic boundary, allowed transitions, permissions, invariants, inputs, outputs, timing, ordering, concurrency, idempotency, and data lifecycle. Use state tables, state diagrams, sequences, small examples, or language-independent pseudocode only where they remove ambiguity. Do not prescribe an algorithm when several can satisfy the guarantee.

Check feasibility with the approved architecture. If a necessary guarantee is incompatible with the design, stop the affected planning path and return to `design-architecture` or `discover-requirements`. Do not silently relax the requirement or choose a new technology. Use a scoped, approved prototype or measurement to resolve material uncertainty. Record consequential assumptions, the consequence if false, the evidence needed, and the decision owner. Keep unresolved blockers visible. Do not turn TBD values into executable acceptance criteria.

### 3. Write the normative contract

Use the applicable sections of the specification template. Write `SPEC.md` at the repository root. For a large system, keep it as the system-level contract and navigation entry point. Move independently evolving normative sections into `docs/specifications/<slug>.md` only when justified. One canonical definition per obligation. Preserve stable IDs on moves. Link existing OpenAPI, JSON Schema, protocol or event definitions as the canonical machine-readable syntax. Explain their semantics here without reproducing fields or schemas. Link the architecture and ADRs for mechanisms and rationale. Keep planned requirements separate from verified implementation status.

Apply BCP 14 (RFC 2119 and RFC 8174) to uppercase normative terms. Each consequential obligation has a stable `SPEC-<number>` ID, source requirement or approved constraint, and verification mapping. Write a single clear, necessary, feasible, falsifiable obligation per ID. Include its condition, subject, expected result and applicable limit or unit. Separate required core behavior from recommendations and optional extensions. An included extension must have its own applicable acceptance criteria. Use `implementation-defined` only when the permitted variation and documentation obligation are explicit. Do not use this term to conceal an unresolved decision. Preserve existing identifiers and compatible repository conventions.

### 4. Define conformance and validate the specification

For each mandatory in-scope obligation, define at least one `CONF-<number>` case or an explicit mapping to a canonical conformance case. State the initial condition, observation boundary, method, expected evidence and pass criterion. Select test, analysis, inspection or demonstration as appropriate. For a critical guarantee, link a `PROP-<number>` property if established or state the required formal verification approach without inventing results. Define integrated operational scenarios that validate the intended workflow, not merely individual statements. A future requirement may remain planned, but a dispatched issue must have no unresolved mandatory acceptance condition.

Review requirements for necessity, clarity, feasibility, consistency, source, verifiability and redundancy. Check that the specification covers the approved release and does not invent functionality. Compare interfaces with both sides of each material boundary. Verify compatibility with architecture, accepted ADRs and interface schemas. Use the consistency contract and report only material findings. Record missing coverage, unresolved conflicts and their owners. No production code, test scaffolding or tracker writes as part of this skill unless separately authorized.

### 5. Approve and hand off

Present the exact specification revision, relevant architecture and requirements revisions, conformance coverage, and open decisions. Obtain explicit human approval of the normative contract. Coordinate any changes at their canonical owner and establish the jointly consistent engineering baseline before epic approval. Use `define-epic` to select and group specified capabilities, not to invent new behavior. For a small change, confirm the applicable approved baseline or present a concise delta instead of repeating the full interview. Do not mark draft, unverified or conflicting behavior as approved.

## Response contract

During questioning show **Current contract**, **Scenario and alternatives**, **Implications**, and **Decision required**. Ask one question and wait. Use a compact example, table or diagram where useful. At completion show the scope, specification sections and IDs, important guarantees, conformance coverage, material unresolved decisions, compatibility verdict and artifact links. Request approval of the exact revision. Do not paste the whole document into chat.

## Completion criteria

The approved specification describes the necessary behavior and guarantees for the relevant scope, has traceable mandatory obligations and falsifiable conformance criteria, and is consistent with the approved requirements, architecture and interface contracts. Relevant unresolved decisions block affected epics and tickets. The artifact is accessible at an approved revision. No production implementation has begun under this skill.
