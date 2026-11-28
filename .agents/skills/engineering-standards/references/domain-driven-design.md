# Domain-driven design

Use the language of the approved domain. These rules apply to meaningful business behavior, not every data record or utility. See the [standards contract](../../software-factory/references/standards.md) for adoption and exceptions.

## Strategic design

- Identify the business capability, actors, domain vocabulary and responsibility boundaries before creating types. Reuse the canonical definitions in requirements and SPEC. Clarify a term with conflicting meanings rather than sharing a misleading model.
- Define bounded contexts where meanings, rules or ownership differ. A bounded context is a modeling boundary, not a deployment decision. Default to modules in a single process when sufficient. Cross a context boundary through its supported interface, events or explicit translation. Never reach into another context's internals or write its private tables.
- Keep shared kernel small and consciously owned. Do not collect unrelated utilities, DTOs or domain types in a common package merely to remove imports.

## Tactical design

| Element | Responsibility | Rule |
|---|---|---|
| Entity | Identity and lifecycle | Express meaningful operations and preserve invariants. Equality follows domain identity when required. |
| Value object | Domain value without identity | Validate construction, prefer immutability and compare by value. |
| Aggregate | Consistency boundary | Root governs mutations within the boundary. Choose the smallest boundary that preserves invariants. |
| Domain service | Domain operation without a natural entity owner | Give it a domain-specific name. Use only when the rule genuinely spans concepts or cannot belong to one object. Keep it independent of IO. |
| Application use case | Orchestrate actors, transactions and ports | Load state, authorize as specified, invoke domain behavior, persist results and return outcomes. Do not duplicate intrinsic business rules. |
| Domain event | Meaningful fact that occurred | Introduce when another responsibility needs the fact. Do not emit events for every assignment. |
| Repository | Reconstitute and persist aggregates | Write-side contract follows aggregate identity and concurrency semantics, not tables. |

Rich domain models encapsulate behavior, not just fields. Enforce intrinsic invariants on every valid construction and state-changing path. Do not expose public setters for protected state. Express intent using operations such as `approve`, `reject` or `submit`, not a generic state setter. Keep external policy and actor authorization at the appropriate application or domain boundary as specified. Do not assume possession of an identifier grants permission.

A data-only projection, message, transport DTO or simple read result is not an anemic domain model. Do not add pretend business behavior to those types. For a genuinely simple domain, use a small model and record why additional tactical patterns add no value.

## Persistence and consistency

- Define a write repository only for aggregates that need persistence. Prefer narrowly scoped operations. Do not build a generic CRUD repository, a repository per table or an ORM pass-through that leaks sessions/query builders across the boundary.
- Load aggregates by identity. Use a simple aggregate save when the use case only persists aggregate state. Include the expected version when optimistic concurrency requires it.
- When an aggregate decision and related records must commit together, expose a narrow application-owned writer named for the atomic effect. State what commits together and which authorization, version or work-ownership guards are checked in the transaction. Return explicit conflict and failure outcomes. Introduce a general unit of work when use cases need to compose transactions themselves.
- Place the repository contract in the consuming inner layer. Use domain ownership when it expresses a domain collection, or application ownership when it expresses use-case access. Do not define it in infrastructure. Implement the contract in infrastructure with explicit mappings between persistent representation and domain representation. A simple implementation may reuse data shapes if it preserves dependency direction and semantics.
- Use explicit transaction ownership. Default to the application use case for unit-of-work control and one consistent write transaction where appropriate. Define isolation, conditional writes, retries and conflict semantics from the specification. An in-memory domain check alone cannot protect concurrent updates. Avoid persistence calls from entities and partial writes that leave invalid state.
- Use read ports for query models and read-only decision context. Queries do not change business state and must respect authorization and tenant scope. Read-side access need not reconstruct aggregates. Keep ORM-specific APIs in adapters.
- When an external effect cannot share the same transaction, specify the consistency and recovery model. Use idempotency, compensation or transactional outbox only if needed. Do not claim exactly-once delivery from at-least-once transport.

## Data Mapper

Prefer explicit, reusable Data Mappers when persistence and domain representations differ materially or multiple callers need the same conversion. Keep the mapper in the feature's infrastructure and keep the domain independent of storage schemas and ORM types. Use focused boundary mappers for comparable translations from provider records or selected read projections. Direct field assignments can stay in the owning adapter. [Data Mapper pattern](https://martinfowler.com/eaaCatalog/dataMapper.html)

- Translate the representation and preserve identity, scope and provenance. Validate untrusted record shape once at its boundary and use the domain's constructors or restore operation to enforce invariants.
- Keep policy and side effects with their owners. Application services and protected adapters enforce authorization. Repositories, writers and read adapters select records, execute I/O and control transactions. Mappers translate the data they receive.
- Protect material mappings with boundary tests. Check round trips where both directions are supported, invalid records and context mismatches where applicable. Preserve the distinction between absent and invalid data.

## Example

A purchase request can move from Draft to Pending, then to Approved or Rejected. Its `approve` and `reject` operations enforce the allowed state transitions. The application handler checks actor authority, loads the aggregate, invokes its operation and persists a conditional update in the approved transaction. A read query returns a purchase-request view through a read port. It does not expose a writable aggregate to the UI.

| Incorrect | Correct |
|---|---|
| Service sets `request.status = approved` after repeating transition checks | `PurchaseRequest.approve()` owns the transition. |
| One `Repository<T>` exposes save/delete/find for every table | Write port exposes only needed aggregate operations. |
| API returns tracked ORM entities | API returns explicit transport/read contracts. |
| One global `models` package mixes procurement and inventory rules | Each context owns its model and publishes a narrow contract. |

## Verification

Test invariant-preserving and rejected operations at the public domain boundary. Test authorization, transaction and persistence semantics with appropriate application and integration tests. Use architecture checks for dependencies and model checking when a critical property requires it. Distinguish an actual domain violation from a data-only type that has no business invariant.
