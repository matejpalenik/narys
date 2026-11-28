---
name: engineering-standards
description: >-
  Apply or review the adopted engineering standards during system architecture, program design, implementation and code review. Use for domain-driven design (DDD), Onion Architecture, CQRS, capability-first organization, protocols, repositories, configuration, testing and CI/CD. Do not authorize work or migrate an existing project.
---

# Engineering standards

## Intent

Produce maintainable software with explicit domain semantics, narrow contracts, predictable dependency direction and independently verifiable behavior. Prefer the smallest design that meets the approved specification. Use these standards to make engineering decisions consistent, not to maximize the number of patterns or files.

Read the [standards contract](../software-factory/references/standards.md) and [work contract](../software-factory/references/work-contract.md). Read the applicable architecture, ADRs, specification, code and scoped repository instructions. Select the adopted language standards for the affected code. For Python, read [python-standards](../python-standards/SKILL.md). For TypeScript (`.ts` and `.tsx`), read [typescript-standards](../typescript-standards/SKILL.md). For mixed-language work apply each profile only to its own scope. If a profile is already loaded, do not reload it; the language skill specializes the general rules without replacing them. During architecture and program design, use the applicable language profile before approving code structure, interfaces and tooling. During implementation and review, use it before editing or evaluating affected code. For other languages follow the adopted project conventions. Load only relevant reference sections.

For UI work, use the [frontend engineering reference](references/frontend.md) and [experience contract](../software-factory/references/experience-contract.md). Apply the approved UI architecture, experience, design rules and real component contracts proportionately. Shadcn/ui and Storybook are defaults for compatible new React applications, not a mandatory technology stack. Do not use frontend conventions to bypass domain invariants, required checks or approved architecture.

## Methodology

### 1. Establish applicability

Identify the approved standards revision, language, application or library type, affected boundaries and existing exceptions. For greenfield work, propose adoption during architecture design. For an existing repository, preserve approved conventions until the human approves changes. Do not apply a new global skill revision as an unapproved migration. Resolve material conflicts before implementation. Apply requirements only where relevant. Do not fabricate a domain, persistence layer or service boundary for a small utility.

### 2. Establish domain and dependency boundaries

Use [domain design](references/domain-driven-design.md) for bounded contexts, ubiquitous language, rich entities, value objects, aggregate repositories and [atomic writes](references/domain-driven-design.md#persistence-and-consistency). Use [architecture and CQRS](references/architecture.md) for inward dependencies, consumer-owned protocols, composition, transaction boundaries and command/query separation. Use [code organization](references/code-organization.md) for capability-first layout, role-based grouping and vertical slices. Keep infrastructure, transports, persistence and vendor types outside domain logic. The application coordinates use cases. Domain objects enforce intrinsic rules. A write operation cannot bypass the aggregate to change protected state.

| Classification | Rule |
|---|---|
| Mandatory when applicable | Preserve approved invariants, clear ownership, inward dependencies, explicit boundary contracts, safe state changes and verifiable behavior. |
| Default | DDD for meaningful business domains, Onion Architecture for dependencies, logical CQRS for use cases, capability-first organization, aggregate repositories for persistent writes, constructor injection. |
| Conditional | Separate read stores, message buses, event sourcing, outbox, distributed transactions or advanced assurance only for an approved need. |

Use a protocol at a substitution, dependency or external contract boundary. Do not create a protocol and implementation pair for every class. Keep the application core independent of concrete infrastructure. Prefer cohesive code over wrapper layers. Keep read and write models logically distinct when their responsibilities differ. Use one deployment and one data store by default when they meet the requirements.

Prefer the Data Mapper pattern where persisted records and domain objects require meaningful translation. [Data Mapper guidance](references/domain-driven-design.md#data-mapper)

### 3. Establish operational and delivery standards

Apply [configuration and operations](references/configuration.md) for typed startup validation, secrets, resource ownership, failure behavior and observability. Apply [verification and CI/CD](references/ci-cd.md) for reproducible builds, test boundaries, architecture checks, protected integration and safe releases. Treat tooling, versions, deployment topology and quality gates as project decisions. Do not enable services, remote workflows or enforcement without authority.

### 4. Check the design or change

Compare the actual design or candidate with the approved profile. Identify only actionable violations in the affected scope. For each, cite the rule, affected code or design, consequence, and smallest corrective action. Distinguish a mandatory violation, a default with a justified exception, a legacy condition outside scope and an optional improvement. Run applicable executable checks when authorized. Never report a written rule as enforced or a linter result as proof of domain correctness. A material deviation returns to the responsible planning gate. Do not revise approved behavior or standards to make a review pass.

## Response contract

When invoked for advice or review, start with **Assessment**. Show a compact table of rule, finding, evidence and required action. Show the proposed module shape or dependency diagram only when useful. End with the unresolved decision or smallest next step. For implementation or architecture tasks, apply the standards within the requested deliverable rather than producing a separate audit. Use the shared [writing standard](../software-factory/references/writing.md).

## Completion criteria

The affected work follows the applicable adopted rules, or all conflicts and exceptions are explicitly recorded and routed to the authorized decision owner. Necessary checks and their actual results are known. No unnecessary migration, new abstraction, approval or artifact is implied by use of this skill.
