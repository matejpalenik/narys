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
      adapters/
        <provider>/
      repositories/
      stores/
      access/
      migrations/
        <database-engine>/
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

Names and extensions follow the adopted language standard. For TypeScript use the [feature-first layout](../../typescript-standards/references/architecture.md), including `features/<feature-name>/api`, `application`, `domain`, and `infrastructure` where applicable; for Python use its adopted package layout. This example does not override the language-specific layout or approved project structure. This is a reference for a nontrivial application. Create only the directories needed now. A compact SDK may group operations directly by capability and need no presentation, persistence or application layer. The approved architecture owns actual structure. Avoid broad global folders such as `services/`, `models/` and `utils/` that hide domain ownership. Public package entry points expose deliberate contracts. Keep implementation details internal. Avoid cyclical imports and cross-context use of private types.

## Role-based grouping within a feature

Group a feature's infrastructure implementations by the role they perform. Create each directory when the feature needs that role.

| Directory under `infrastructure/` | Responsibility |
|---|---|
| `repositories/` | Implement domain persistence and source repository contracts. |
| `stores/` | Persist operational state such as job progress or access records. |
| `writers/` | Implement application write ports that commit a use-case effect and its related records atomically. |
| `access/` | Integrate sign-in, sessions and upstream access checks. |
| `adapters/<provider>/` | Set up provider clients or database connections, execute provider I/O, and handle small adapter-local translations. |
| `mappers/` | Own reusable translations between persistence records, domain objects and read projections. |

Give other cohesive responsibilities their own directories where useful, such as `analysis/` for source checks and `inference/` for model calls. Keep the port contract in its consuming layer and inbound transport in the feature's API or presentation layer. Use filenames that convey the role and include the engine or provider when it helps identify a concrete implementation. Follow the adopted project and language layout for exact paths.

## Feature-owned migrations

Keep SQL migrations inside the feature that owns the schema. Group them by database engine under `infrastructure/migrations/<engine>/`, such as `infrastructure/migrations/sqlite/`. Add a sibling directory when the feature adopts another engine. When features share a database, shared bootstrap code can coordinate migration order while each feature owns its migration files.

## Vertical work decomposition

Follow the [vertical slicing contract](../../define-tickets/references/vertical-slicing.md). A slice implements a coherent observable capability across all required layers. Technical boundaries organize code; they do not automatically define tickets. Preserve public behavior between increments and test each slice. Prefer an early executable path. Consolidate tasks that have no independently meaningful evidence. Separate an enabling change only when it reduces a real risk or unlocks independent progress. Do not mandate UI for a backend or SDK.

## Maintainability

Prefer cohesion over artificial uniformity. Keep public interfaces small and callers independent of unnecessary details. Use naming from the domain. Introduce abstraction when it encapsulates a real policy or volatile dependency, not because two lines happen to look alike. Avoid trivial pass-through services and frameworks without demonstrated purpose. Refactor inside the approved scope only. Record consequential changes to responsibility, dependency direction or public contracts through program design or ADR approval.
