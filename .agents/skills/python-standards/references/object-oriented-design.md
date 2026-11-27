# Python object ownership and design

## Method and class selection

| Case | Use |
|---|---|
| Entity behavior or invariant | Instance method on the entity or aggregate. |
| Value normalization or validation | Named value object, validated construction, or a cohesive static method. |
| Alternative construction | `@classmethod` returning the appropriate type. |
| Pure operation that belongs to a named concept | `@staticmethod` when no instance state or collaborator is needed. |
| Use case or IO | Class with explicit injected dependencies. |
| Infrastructure integration | Adapter class implementing a consumer protocol. |
| Framework callback, test or entry point | A minimal function when the host contract or conventions require it. |

Do not add an instance or class method when it has no meaningful owner. First look for a domain operation, value object, factory or cohesive domain service. Avoid generic static utility classes. Do not create artificial class inheritance, shared mutable class state, global service locators or hidden dependency lookup. Prefer composition. Class methods are not a mechanism for global configuration. Keep constructors free of network and database effects. Explicit factories can acquire resources at the outer boundary.

Use immutable data classes for value objects and immutable message/command shapes when appropriate. A frozen dataclass prevents field assignment but does not make nested mutable objects immutable. Use appropriate nested representations. Entities have meaningful identity and encapsulated state, not blanket dataclass-generated value equality if that contradicts the domain. Protect mutations through methods. Reconstitution must validate or deliberately handle persisted invariants. Do not rely on underscore naming alone for security.

Use exceptions to represent well-defined failure conditions where consistent with the project contract. Do not use a generic exception for all domain decisions. Prefer concrete result types for expected alternate outcomes when the approved contract calls for them. Do not invent a universal Result wrapper. Keep external SDK and validation types outside domain models unless an approved project-specific constraint warrants them.

## Example — code shape only

A purchase request has an `approve()` instance method. `PurchaseRequestRepository` is a protocol owned by the consumer. `ApprovePurchaseRequestHandler` receives that protocol in its constructor. The SQL implementation resides outside the core. The domain does not invoke a repository. A stateless `PurchaseLimitPolicy` can expose a named static calculation when no configuration or dependency is required. If it needs a rate source or tenant policy, make it an injected instance instead.

```text
PurchaseRequest
  approve() -> None

PurchaseRequestRepository (Protocol)
  load(request_id) -> PurchaseRequest
  save(request, expected_version) -> None

ApprovePurchaseRequestHandler
  __init__(repository, transaction, authorization)
  execute(command) -> ApprovalResult
```

The diagram is not a prescribed implementation. Exact state, errors and concurrency semantics belong to the approved specification and program design.

## Function exception boundary

Tests and fixtures, integration callbacks, decorators required by a library, CLI entry points and thin composition functions may use module-level functions. Keep substantive production domain logic out of these functions. A public compatibility API may also require functions; document the reason and preserve its contract. Do not rewrite an existing public API merely to satisfy the preference. The official Google Python guide favors module-level functions over static methods. This project intentionally uses a different object-ownership convention while adopting Google's docstring format.
