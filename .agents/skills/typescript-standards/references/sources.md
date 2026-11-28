# Sources and adaptation

The TypeScript profile is an original adaptation of the following sources and the adopted factory engineering standards. It does not install or require an upstream pstack skill. The source blobs were read through GitHub on 2026-11-28. The SHA column records the inspected Git blob identity, not a commit or release version.

| Source | Inspected blob SHA or reference | Use |
|---|---|---|
| [pstack TypeScript best practices](https://github.com/cursor/plugins/blob/main/pstack/skills/typescript-best-practices/SKILL.md) | `e1e5aa7c97ed39c425d60d933a96424a3f14539e` | Discriminated unions, brands, constructive modeling, totality, narrowing, schema reuse, signatures, real tests and telemetry. |
| [pstack patterns](https://github.com/cursor/plugins/blob/main/pstack/skills/typescript-best-practices/references/patterns.md) | `f8dd99b63ecb469a090b8fa0a7e235d3239cb9ec` | Concrete type examples and limitations of unsafe assertions. |
| [pstack type-system discipline](https://github.com/cursor/plugins/blob/main/pstack/skills/principle-type-system-discipline/SKILL.md) | `852aab0340246c0d0dfd59ea6be962ce40a31272` | Type-level representation and authoritative schemas. |
| [pstack boundary discipline](https://github.com/cursor/plugins/blob/main/pstack/skills/principle-boundary-discipline/SKILL.md) | `95b2209ce7d15ddbca7c2bf6ef3626ffdc8d595e` | Validation and errors at trust boundaries, framework independence. |
| [TypeScript TSConfig reference](https://www.typescriptlang.org/tsconfig/) | Official documentation | Compiler flags and indexed access/optional property semantics. |
| [typescript-eslint unsafe assignment](https://typescript-eslint.io/rules/no-unsafe-assignment/) | Official documentation | Type-aware lint and unsafe `any` propagation. |
| [Rules of React](https://react.dev/reference/rules) | Official documentation | Pure render and idiomatic components/hooks. |
| [dependency-cruiser rules](https://github.com/sverweij/dependency-cruiser/blob/main/doc/rules-reference.md) | Project documentation | Dependency constraints and graph checking. |
| [Factory engineering standards](../../engineering-standards/SKILL.md) | Adopted general profile | DDD, Onion, logical CQRS, repositories, vertical slices and scope control. |

## Deliberate adaptations

The general profile and user preferences specify object-oriented domain/application code, so pure business logic may live in pure methods on meaningful domain objects and services rather than exported standalone functions. React functions and hooks remain idiomatic. The `features/<feature-name>/api,application,domain,infrastructure` organization is a chosen project default, not an industry-mandated layout. Interfaces represent meaningful dependency contracts, not a requirement for every class. A nonnegative duration must actually be validated; a nonempty tuple does not validate an arbitrary index. Branded identifiers establish only the semantics their constructor or guard proves. Schema derivation applies to equivalent representations, not a mandate to couple domain models to transport or persistence. Compatibility exceptions are narrow and approved. These choices preserve the underlying pstack objectives while avoiding unsupported runtime guarantees. The toolchain defaults and compiler flags are proposals subject to the existing adoption and setup contracts.
