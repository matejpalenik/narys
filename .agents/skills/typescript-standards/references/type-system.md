# Type system and boundary discipline

Apply pstack's principles within the adopted TypeScript and DDD profile. Make illegal representations impossible where the type system can express the constraint. Prove runtime facts at the boundary. Do not claim that compile-time constraints enforce business authorization, storage atomicity or semantic correctness at runtime.

## Representation

| Problem | Preferred representation |
|---|---|
| Multiple exclusive states | Discriminated union with one stable discriminant, normally `kind` |
| Confusable identifiers and quantities | Separate branded primitives or immutable value objects with validating constructors |
| Operations requiring at least one value | `readonly [T, ...T[]]` or explicit absent result |
| Pairs | `readonly (readonly [T, T])[]`, not a flat list with an undocumented even-length requirement |
| Time range | Start plus validated nonnegative duration, not two unconstrained numbers |
| Simple collection total over empty input | Plain `readonly T[]`, not a stronger type without a need |

Use `interface` for object contracts and substitution boundaries. Use `type` for unions, intersections, branded primitives, derived types and aliases. Do not duplicate the same shape only to make every type an interface. Use `readonly` and readonly collections where callers must not mutate values. `readonly`, branded types and `as const` do not freeze runtime data; encapsulate mutable objects and use runtime protection when required. Do not introduce advanced generic machinery unless it improves a concrete contract.

## Named string value sets

Define a named value set for closed domain and application choices such as element kinds, workflow states and operation outcomes. Prefer a frozen object of string literals with `as const`. Derive the value union from the object and use its members when constructing values, matching cases and writing fixtures. A regular string enum is suitable when code needs distinct enum member types or follows an adopted enum convention. [TypeScript Handbook on objects and enums](https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums)

```ts
/** Names the supported element kinds and their serialized values. */
export const ElementFactKind = Object.freeze({
  system: "system",
  container: "container",
  component: "component",
} as const);

/** A supported element kind. */
export type ElementFactKind = (typeof ElementFactKind)[keyof typeof ElementFactKind];

/** The architecture element shape used by this example. */
export interface ElementFact {
  readonly kind: ElementFactKind;
}

const element = { kind: ElementFactKind.container } satisfies ElementFact;
```

Keep discriminated unions when alternatives have different payloads. Type each discriminant with its specific member, such as `kind: typeof ComponentLoadKind.ready`, and check exhaustiveness with `never`. [TypeScript Handbook on narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

Keep serialized values stable and validate incoming strings at the boundary. Reuse the existing authoritative schema for wire types and map into domain values when the wire and domain concepts differ. Place the set with its owning contract and share it only where the choices have the same meaning.

## Example: validated identity and explicit UI state

```ts
type ComponentId = string & { readonly __brand: "ComponentId" };
type SessionId = string & { readonly __brand: "SessionId" };

class ComponentIdentity {
  private constructor() {}

  static isComponentId(input: unknown): input is ComponentId {
    return typeof input === "string" && /^cmp_[a-z0-9]+$/.test(input);
  }

  static parse(input: unknown): ComponentId {
    if (!ComponentIdentity.isComponentId(input)) {
      throw new Error("Invalid component identifier");
    }
    return input;
  }
}

interface ComponentView {
  readonly id: ComponentId;
  readonly name: string;
}

const ComponentLoadKind = Object.freeze({ loading: "loading", ready: "ready", failed: "failed" } as const);

type ComponentLoadState =
  | { readonly kind: typeof ComponentLoadKind.loading }
  | { readonly kind: typeof ComponentLoadKind.ready; readonly component: ComponentView }
  | { readonly kind: typeof ComponentLoadKind.failed; readonly message: string };

class ComponentStatus {
  static label(state: ComponentLoadState): string {
    switch (state.kind) {
      case ComponentLoadKind.loading: return "Loading";
      case ComponentLoadKind.ready: return state.component.name;
      case ComponentLoadKind.failed: return state.message;
      default: {
        const exhaustive: never = state;
        return exhaustive;
      }
    }
  }
}
```

The prefix rule here is an illustrative identity format; use the actual approved format. A predicate must check every representation constraint it claims. It cannot establish that an ID exists, belongs to an actor or denotes a particular entity merely by validating its shape. Do not rebrand an already typed ID to a different semantic type. Where provenance or cross-field invariants matter, enforce them in the appropriate boundary or domain operation. Prefer a repository's schema-derived brand or a validated value object when it provides a better contract. No unchecked `as ComponentId`.

## Narrowing and totality

1. Narrow first with the discriminant of a union.
2. Use property presence where it genuinely distinguishes variants, then primitive or class checks (`typeof`, `instanceof`).
3. Prefer a runtime schema over a hand-written deep shape guard. Write small honest guards when needed; name them `isX` or `hasX` and test negative inputs.
4. Check exhaustiveness with `never` or an equivalent compiler-checked exhaustive mapping. Avoid a default branch that silently ignores a new variant.
5. Prefer `satisfies` to assertions for checking a literal against a contract without discarding useful inference. It is not a runtime validator.

For an operation that needs a first element, return `T | undefined` or require a validated nonempty tuple. Do not replace `array[0]!` with a cast. `noUncheckedIndexedAccess` also applies to computed indexes on a nonempty tuple; nonempty does not establish that every arbitrary index is valid. For ranges, construct a validated duration that cannot be negative, nonfinite or outside the supported bound. A type alias for a plain number alone cannot prove this.

## Parse at the boundary

Treat network data, request parameters, IPC, JSON, files, environment variables, storage results and external tool outputs as untrusted until their applicable contract is validated. An SDK or generated type alone is not runtime validation. For database rows, rely on actual trusted schema/adapter guarantees where established and decode stored JSON or other untrusted representations explicitly. Validate at the appropriate boundary; do not reparse the same established value at each call.

Group related decoding methods under their input contract. For example, call `SourceReferenceDecoder.decodeCommitSha(raw)` and `SourceReferenceDecoder.decodeRepositoryPath(raw)` for the inputs that identify a source reference. Give a static-only decoder a private constructor. Use `Decoder` for one-way conversion and `Codec` when the class also exposes encoding.

Reuse existing schemas and generated types. For a Zod-based project, derive transport types from the schema (`z.infer`, with input/output distinctions for transformations where relevant); otherwise use the adopted equivalent. Do not add Zod only for a simple guard. Map validated wire values into domain objects through their named constructors. Enforce domain rules and authorization at their owners even after shape validation. Distinguish invalid inputs, expected business conflicts and unexpected infrastructure failures. Do not pass an open `Record<string, unknown>` around the application as a substitute for a named contract. Define unknown-field behavior and versioning deliberately; rejecting unknown keys may be correct for a security-sensitive command, while compatibility protocols may permit them.

Derive **equivalent** types from authoritative contracts using `Pick`, `Omit`, `Parameters`, `ReturnType`, `Awaited`, `typeof`, or generated types where they preserve the intended ownership. Do not use an ORM or wire type as the domain model just to avoid writing an independent domain type. Map different semantics explicitly. Keep schema, DTO and domain constraints independently traceable when they own different information.

## Signatures and escape hatches

Use explicit parameter and return types on public contracts. Let the compiler infer simple locals. Define a named interface for a structured operation input on a public method or port. Name it for the operation and document material fields. For example, use `load(workspaceId: WorkspaceId)` and `commitPublication(input: CommitWorkspacePublication)`. Reuse an input interface when the operations share its meaning. Use `import type` for type-only dependencies where compatible with the selected module system. Preserve the actual dependency direction regardless of whether an import is erased at runtime.

Do not use explicit `any`, non-null assertions, broad `@ts-ignore`, `@ts-nocheck`, double casts, unchecked `as`, or fabricated type predicates to make code compile. `as const` is permitted for literal inference. If a necessary third-party compatibility assertion cannot be represented, isolate it behind an adapter with runtime validation and a narrow, documented exception; do not assert raw data directly. An expected negative compile-time test may use a narrowly scoped `@ts-expect-error` with a reason and a test that fails if the error disappears. Generated code is managed through its source/generator and scoped configuration, not hand-edited to imitate these rules.
