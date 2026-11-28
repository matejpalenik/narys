# TypeScript tooling and verification

Use the approved runtime, framework, package manager, lockfile and actual repository commands. These are preferred greenfield defaults, not automatic installations. Select compatible versions using official documentation and configure through [setup-repository](../../setup-repository/SKILL.md). For React, also apply [frontend standards](../../engineering-standards/references/frontend.md) and [frontend foundation](../../setup-repository/references/frontend-foundation.md).

## Compiler and language settings

For newly adopted projects, propose the following strict type-checking fragment. Merge it with the actual configuration. Select `target`, `lib`, `module`, `moduleResolution`, JSX, emission and project references according to the supported runtime and framework; no universal Node or bundler settings are assumed.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

Use a real type-checking command (`tsc --noEmit` for suitable projects or the approved project/framework equivalent). Transpiling via a bundler does not prove that types check. Do not disable strict flags, broaden types, alter exclusions or suppress errors as an implementation shortcut. Distinguish absence from `undefined` where required. Keep application and published library build settings appropriate to their different contracts. No dependency or compiler upgrade without review.

| Concern | Preferred tool or approach |
|---|---|
| Package management | One approved package manager; committed lockfile and locked/frozen CI install |
| Formatting and naming | Existing formatter (Prettier, Biome or approved equivalent); consistent kebab-case files, PascalCase types/classes, camelCase members unless project specifies otherwise |
| Type-aware lint | ESLint with `typescript-eslint` typed rules, or demonstrably equivalent controls; use supported configuration for the chosen version |
| Import boundaries | dependency-cruiser, ESLint boundary rules or equivalent resolved import graph checks |
| Unit/integration tests | Vitest or established project runner; real adapters/dependencies where feasible |
| Browser and components | Playwright or approved browser runner; Storybook for adopted React UI foundation |
| Runtime input/config | Existing schema/validator and named domain construction; no mandatory new dependency |
| Documentation | [TSDoc](#tsdoc) for TypeScript contracts |

Configure typed lint to catch unsafe assignments/access/calls/returns, explicit `any`, non-null assertions, unhandled promises and non-exhaustive switches where applicable. An assertion rule may require a narrow explicit exemption for safe literal inference or a verified adapter. Do not require multiple overlapping formatters or linters. Verify rule support and syntax with actual installed tool documentation. Use formatter/lint checks without fixing unrelated files. Type-aware lint has a cost; apply it to owned code and use appropriate incremental/scoped checks while preserving the required CI coverage.

## TSDoc

Use official TSDoc syntax for doc comments in repository-owned `.ts` and `.tsx` files. Document exported types, interfaces, classes, functions, and values with a concise summary of their purpose. Give public members and internal declarations their own comments where a caller or maintainer needs a guarantee, precondition, unit, side effect, or failure outcome. Apply the rule to new and changed contracts in the authorized scope. [TSDoc specification](https://tsdoc.org/pages/spec/overview/)

- Attach the `/** ... */` comment to the declaration it describes. Lead with a short summary. Use `@remarks` for details that callers need, such as transaction boundaries or the scope of a guarantee.
- Use `@param name - Description` and `@typeParam Name - Description` for parameter meaning or constraints. Use `@returns` to explain significant values and failure results. Let the signature supply the types.
- Use `@throws` for documented exceptions, with a separate block per exception type. Describe typed failure results under `@returns`. Use an `@example` when a call demonstrates a contract that prose would leave unclear.

In program design, attach the intended TSDoc directly above every type and interface shown, including supporting aliases, and each class, function or named value set that defines a contract. Explain what each declaration represents, such as the revisions an integration comparison covers. Keep member comments focused on semantics callers need. Carry the intended comments into source and keep them accurate against the approved behavior. Keep architecture-wide rationale in the design prose.

Review coverage and accuracy against the signature, implementation, and approved behavior. Run the configured TSDoc syntax check when available. An ESLint setup can use `eslint-plugin-tsdoc` for syntax validation. Report syntax results separately from the review of coverage and meaning. [TSDoc ESLint plugin](https://tsdoc.org/pages/packages/eslint-plugin-tsdoc/)

## Runtime safety and observability

Validate configuration once at startup and inject typed settings. Read environment variables at the configuration boundary, not throughout domain code. Keep credentials and server-only data out of client bundles, log messages and fixtures. Use structured logger events with operation, relevant identifiers, outcome and diagnostic context. No ad hoc `console.log` in shipped code; an approved CLI output contract is not a diagnostic logger. Record failures without exposing sensitive data. Use the existing telemetry system rather than adding one for a trivial capability.

Handle promise rejections explicitly; do not leave unowned background work or use `void` only to silence lint. Use cancellation/timeouts where required and clean up timers, connections, streams and subscriptions. Propagate cancellation when supported. Map expected domain failures to typed results or documented domain errors, following the approved contract. Catch `unknown`, narrow actual errors, preserve causes and avoid silent catches. Define transaction ownership and verify rollback, conflict and recovery where applicable. Do not assume TypeScript typing proves concurrency safety.

## Verification matrix

| Property | Evidence |
|---|---|
| Correct type representation | Compiler checks, including negative compile-time fixtures where useful |
| Trust boundary | Real schema/decoder tests for malformed and valid inputs |
| Domain invariants | Tests through public domain operations, applicable property tests |
| Authorization and use case | Application and integration tests against approved actors, state and failures |
| Repository behavior | Real persistence/adapter contract tests for writes, conflicts and rollback |
| Dependency direction | Resolved dependency checks, including type-only edges, cross-feature imports, cycles and framework/vendor restrictions |
| UI behavior | Actual rendered application or production-component stories; interaction, accessibility and applicable integrated task evidence |
| Resource safety | Leak/disposable/cleanup and async failure tests where applicable |

Use real dependency implementations, temporary isolated test resources and framework primitives when practical. Mock only where a real dependency is unavailable, nondeterministic, costly, unsafe or outside the test boundary, and state what the mock cannot prove. Do not use a mock repository to claim real transaction or concurrency guarantees. Do not replace an integration test with an interaction assertion on a mock. Test behaviors through meaningful public interfaces rather than private methods. Keep test doubles faithful to their contracts; do not bypass the type system for test fixtures. For existing failures, reproduce and distinguish legacy conditions from the candidate's introduced defects.

Configure architecture checks from the actual feature layout and module resolver. Test direct and transitive paths where relevant, including forbidden domain-to-infrastructure/transport imports, cycles, private cross-feature imports, unresolved aliases and client-to-server imports. Demonstrate that a safe intentionally invalid import is rejected. Do not equate the presence of a config file or a passing check with full architectural conformance. Rules that require semantic judgment (for example an anemic aggregate) still need review and behavioral evidence.

Use one canonical verification command set for local work, the factory and CI, with locked dependencies and the applicable build, formatting, lint, type, architecture and test checks. Keep policy and exact candidate evidence under the existing [CI/CD standards](../../engineering-standards/references/ci-cd.md), `REVIEW.md` and factory approval contract. Report executed commands, outcomes, and skipped or unavailable checks; do not grant integration authority based on this skill.
