# Code organization and vertical slices

Organize around business capabilities first. Within a bounded context, use architectural layers only where they clarify ownership and dependency direction. Keep small related files together. Do not create empty packages, marker abstractions, generic helper modules or one-file-per-class ceremonies without benefit.

## Reference layout

```text
src/<product>/
  procurement/
    domain/
      purchase_request
      purchase_request_repository
    application/
      commands/
        submit_purchase_request
        decide_purchase_request
      queries/
        get_purchase_request
      ports/
    infrastructure/
      persistence/
      adapters/
    presentation/
      api/
  inventory/
    ...
  shared/           # only approved, cohesive cross-context contracts
  bootstrap/        # configuration, composition, lifecycle

tests/
  unit/
  integration/
  architecture/
  e2e/
```

Names and extensions follow the language standard. This is a reference for a nontrivial application. Create only the directories needed now. A compact SDK may group operations directly by capability and need no presentation, persistence or application layer. The approved architecture owns actual structure. Avoid broad global folders such as `services/`, `models/` and `utils/` that hide domain ownership. Public package entry points expose deliberate contracts. Keep implementation details internal. Avoid cyclical imports and cross-context use of private types.

## Vertical work decomposition

Follow the [vertical slicing contract](../../define-tickets/references/vertical-slicing.md). A slice implements a coherent observable capability across all required layers. Technical boundaries organize code; they do not automatically define tickets. Preserve public behavior between increments and test each slice. Prefer an early executable path. Consolidate tasks that have no independently meaningful evidence. Separate an enabling change only when it reduces a real risk or unlocks independent progress. Do not mandate UI for a backend or SDK.

## Maintainability

Prefer cohesion over artificial uniformity. Keep public interfaces small and callers independent of unnecessary details. Use naming from the domain. Introduce abstraction when it encapsulates a real policy or volatile dependency, not because two lines happen to look alike. Avoid trivial pass-through services and frameworks without demonstrated purpose. Refactor inside the approved scope only. Record consequential changes to responsibility, dependency direction or public contracts through program design or ADR approval.
