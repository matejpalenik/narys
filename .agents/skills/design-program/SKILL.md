---
name: design-program
description: >-
  Design the code-level implementation of an approved epic or feature before production code is written. Show exact intended file locations, types and method signatures without bodies, call stacks, test assertions and least-confident decisions. Obtain explicit human approval and pass the approved design to ticket definition.
---

# Program design

## Intent

Move consequential code-level decisions before implementation. Let the human examine the shape of the program, how it executes and how it will be tested while decisions are inexpensive to change.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md) and [program-design template](references/program-design.md). Use `show-me` if available for visual explanations. Follow the five-part Program Design gate from the supplied Horthy derivative.

Apply the adopted [standards contract](../software-factory/references/standards.md), [engineering-standards](../engineering-standards/SKILL.md) and applicable language profile (including [python-standards](../python-standards/SKILL.md) for Python). Check domain ownership, dependency direction, protocol contracts, aggregate persistence, transaction and testing boundaries in the existing five-part design. Do not introduce layers or interfaces just to satisfy a template. Surface material exceptions at the existing approval gate.

For UI work, read the approved EXPERIENCE.md, DESIGN.md, token/component contracts and relevant Storybook stories under the [experience contract](../software-factory/references/experience-contract.md). Include relevant component props/signatures, ownership of transient and persisted state, feature composition, actual file paths and story/browser test plan in the existing five sections. Reuse approved components and do not prescribe a wrapper or global state store without a need. Unresolved material interaction or shared visual rule returns to the responsible design skill.

## Methodology

### 1. Establish the design boundary

Read the approved epic, applicable normative specification and conformance cases, architecture and ADRs, domain requirements, code, tests and repository conventions. Determine the main flow, ownership of state, external boundaries and constraints. Do not design against an imagined existing codebase. In greenfield, clearly mark proposed paths and contracts.

### 2. Specify files

List every file expected to be created or changed for the proposed scope, with one line on why it belongs there. Identify existing interfaces to reuse and the module that owns each invariant. Avoid speculative abstractions and duplicate responsibilities. File locations are the approved design intent, not permission to change unrelated code. Small mechanical path corrections may be allowed by policy. Material responsibility or contract changes require reapproval.

### 3. Specify types and signatures

Show the relevant domain types, method signatures, interfaces, input/output shapes, errors and state transitions in the project's language. Do not provide production implementation bodies. Define who owns each operation and the public contract. Preserve canonical interface syntax, required semantics and invariants. Verify compatibility between provider and consumer, including error handling and migration sequence when relevant. Do not redefine product behavior. Compare meaningful alternatives if a choice affects callers, dependencies or safety. Use a prototype only with approval to resolve a specific unknown.

### 4. Specify the call stack

For each principal flow, show the call order from entry point to domain logic, persistence or external effect and response. Include important failure paths, transaction boundaries, retries, authorization and concurrency where material. Use a call tree for static execution shape and a Mermaid sequence or state diagram when order or state changes matter.

### 5. Specify tests and challenge decisions

List test names and what each must assert before implementation. Use the highest useful public test boundary. Identify fixtures, negative cases, invariants, integrated evidence and formal verification obligations. Link SPEC and CONF IDs, applicable PROP IDs and epic scenario IDs. Define the verification method and objective pass criterion before implementation. Keep requirements and conformance expectations distinct from code-level test design. List the decisions with the least evidence or confidence, in order of consequence. Ask the human one material question at a time. Resolve uncertainty through code inspection, research, examples or an approved experiment. Do not hide unresolved questions in tickets.

### 6. Review and hand off

Check the complete design against the applicable approved baseline and resolve conflicts using the [consistency contract](../software-factory/references/consistency.md). Present the complete five-part draft. Obtain explicit Program design gate approval of the exact revision. Record approved file plans, signatures, call stacks, assertions and decisions. Keep a temporary working draft outside canonical requirements (for example, in an explicitly agreed scratch directory) if needed for review; after ticket publication, the relevant approved design must be included in each issue or in an immutable linked artifact. Do not maintain two live program specifications. Keep any retained approved draft as a historical snapshot. Do not implement production code.

## Response contract

Use the exact five design headings: **Files**, **Types and signatures**, **Call stack**, **Test plan**, **Least confident decisions**. Show code shapes rather than long explanations. In each interview turn show only the relevant design and the next decision. For final review, link the complete draft and identify the exact version requiring approval.

## Completion criteria

The human approves all material code-level design decisions, including the five required sections. Test expectations are explicit and unresolved consequential decisions are marked as blockers. The design is sufficiently precise for ticket definition, not a production implementation.
