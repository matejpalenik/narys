---
name: typescript-standards
description: >-
  Apply or review adopted TypeScript standards for .ts and .tsx code, APIs, SDKs and React applications. Use during architecture, program design, implementation and verification for feature-first DDD, Onion Architecture, logical CQRS, rich domain models, interfaces, strict types, runtime validation and executable quality checks. Preserve approved conventions; do not authorize work or migrate the project.
---

# TypeScript engineering standards

## Intent

Produce maintainable, explicitly typed TypeScript that expresses domain intent and prevents invalid state transitions. Use the compiler to exclude invalid representations, validate external data at the boundary, and keep infrastructure replaceable. Prefer cohesive code and the smallest sufficient design over pattern ceremony.

Read the adopted [standards contract](../software-factory/references/standards.md) and [engineering-standards](../engineering-standards/SKILL.md) if not already loaded. Read the applicable specification, architecture, program design, `AGENTS.md`, `package.json`, TypeScript configuration, lockfile and relevant source. Apply only the adopted profile and affected scope. Do not load all references by default. These standards incorporate pstack's type-system and boundary disciplines; see [sources](references/sources.md).

## Methodology

### 1. Establish the language profile

Identify supported TypeScript version, runtime, framework, module system, package boundaries, tooling, approved snapshot and exceptions. For new TypeScript applications, propose strict typing, reproducible dependency resolution, type-aware linting, formatting, architecture checks and behavior tests. Preserve compatible existing tooling. Do not install dependencies, change versions or migrate unrelated code because this skill is loaded.

### 2. Organize by feature and protect the domain

Use [feature architecture](references/architecture.md) for the feature layout and placement of infrastructure files by role. For new nontrivial applications, organize each cohesive feature or bounded context under `features/<feature-name>/` with `api/`, `application/`, `domain/` and `infrastructure/` where needed. Create only useful directories. Keep framework routes thin. Keep the domain independent of HTTP, React, databases, ORM, SDKs and framework-specific types.

- Domain entities and aggregate roots own business behavior and intrinsic invariants. Use meaningful operations, private state and immutable value objects. No public setters or external mutation of protected state. Data-only DTOs and read models are not anemic domain models.
- Application classes coordinate use cases, authorization, transactions and ports. Prefer command and query separation in the same process and store. Do not add a bus, event store or second database without an approved need.
- Define small consumer-owned interfaces at dependency boundaries. Use constructor injection and a composition root. Keep aggregate loads simple and read-only decision context on read ports. Use a named application writer for use-case effects that must commit atomically. Do not create an interface for every class or a generic CRUD repository.
- Use classes for domain and application behavior and injected adapters. Keep stateless business operations on a meaningful owner; do not create utility-class namespaces. Pure framework components, hooks, adapters, tests and compatibility exports may be functions. Do not force React components into classes.

Prefer explicit [mapper classes](references/architecture.md#boundary-mappers) for meaningful or shared translations at persistence and other adapter boundaries.

### 3. Make the type system enforce meaning

Use [type-system discipline](references/type-system.md). The following rules are mandatory when applicable under the adopted profile.

| Concern | Rule |
|---|---|
| Invalid states | Prefer discriminated unions and constructive representations; avoid unrelated optional fields and contradictory flags. Exhaust variants using `never`. |
| Semantic primitives | Use validated branded types or value objects where accidental interchange matters. A brand is not a runtime check. |
| Closed value sets | Give owned domain and application choices a [named string value set](references/type-system.md#named-string-value-sets). Reference its members in construction, comparisons and tests. Preserve literal wire values and variant-specific payload types. |
| Totality | Use the simplest type that makes the operation total. Return explicit absence or strengthen the input; never hide a missing value with `!`. |
| Trust boundary | Treat external data as `unknown`; parse with the adopted schema/validator and map to domain types. Reuse validation; enforce domain invariants on construction and mutation. |
| Boundary decoders | Expose public [boundary decoders](references/type-system.md#parse-at-the-boundary) as static methods on a class named for the input contract. Keep standalone decoder helpers module-private. |
| Type escape hatches | No explicit `any`, unchecked assertions, double assertions, lying guards or blanket suppressions in owned code. Prefer narrowing and `satisfies`. |
| Contracts | Derive equivalent wire types from authoritative schemas. Use interfaces for named object/dependency contracts and aliases for unions, brands and mapped types. Keep independent domain semantics independent. |
| Signatures | Use explicit public input/output types and named interfaces for structured operation inputs on public or port methods. Pass simple identifiers or values directly. |

Use the repository's existing runtime schema library; do not add one for a single trivial guard. `as const` for literal inference is not a bypass. If an external or generated API genuinely needs an assertion, isolate it after validation at an adapter, justify the exact assertion and verify it. Do not spread an assertion across the application.

### 4. Implement and verify

Use [tooling and verification](references/tooling.md). Keep expected failures explicit and async ownership, cleanup, concurrency and transaction semantics clear. Use structured diagnostics through the adopted logger; no ad hoc `console.log` in shipped code. Validate configuration and preserve secret boundaries. Prefer real local dependencies and framework test primitives over mocks. Verify real UI behavior with the applicable [frontend standards](../engineering-standards/references/frontend.md) and [UI verification](../software-factory/references/ui-verification.md).

Use [TSDoc](references/tooling.md#tsdoc) for repository-owned TypeScript contracts. In program design, include comments for every type and interface shown and for other contract declarations. Carry the intended comments into source and verify their coverage and accuracy on changed contracts.

Run actual format, lint, type, architecture, build and test commands for the affected scope when authorized. Preserve required tests, controls and approved interfaces. Verify new enforcement with a safe failing witness where applicable. Do not mistake transpilation, a type assertion or a passing unit test for runtime conformance. Report unavailable checks and material deviations. Use `setup-repository` for separately authorized tooling changes.

## Response contract

For design advice or review, start with **Assessment**. Use a short table of applicable rule, finding, file or symbol, evidence and smallest corrective action. Show the feature layout, types or call flow only when they clarify a consequential choice. Separate mandatory violations, justified defaults, legacy findings outside scope and optional improvements. During implementation apply the rules directly rather than writing a separate audit. Use the shared [writing standard](../software-factory/references/writing.md).

## Completion criteria

The affected TypeScript design or implementation conforms to the adopted architecture, domain ownership, boundary, typing and verification rules, or conflicts and missing evidence are explicitly routed to the responsible decision owner. Actual check results and limitations are known. No unnecessary migration, abstraction, dependency, approval or artifact is implied by use of this skill.
