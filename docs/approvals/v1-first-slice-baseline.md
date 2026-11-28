# V1 first-slice engineering baseline approval

**Decision.** The product owner approved the engineering baseline for the first operational slice, including the pinned general and frontend engineering standards. The decision applies to planning one authorized, private workspace for a selected repository area, using Flask #4692 for source correspondence and live Narys merges for dogfooding. [First operational slice](../../ARCHITECTURE.md#first-operational-slice)

**Approval source.** Explicit product-owner approval in the Narys project conversation on November 28, 2026.

> Yes, I approve the first-slice engineering baseline in draft 4ee22e4e385c, including the general and frontend standards pinned at 585021a.

| Reviewed input | Exact identity and scope |
|---|---|
| Architecture and slice | SHA-256 `4ee22e4e385c8c66bc5fa627f2174b63ed63ed603dc8176c3f68a5b9b7ad7448`. [Approved snapshot](architecture-4ee22e4e385c.snapshot) |
| Requirements, specification, experience, and ADRs through ADR-0018 | Repository revision `61111d539ef99a54add32233229e1098528c0600`. Apply the approved amendments and the active specification obligations. [Pinned requirements](https://github.com/matejpalenik/narys/tree/61111d539ef99a54add32233229e1098528c0600/docs/requirements) · [Pinned specification and conformance cases](https://github.com/matejpalenik/narys/blob/61111d539ef99a54add32233229e1098528c0600/SPEC.md) · [Pinned experience](https://github.com/matejpalenik/narys/blob/61111d539ef99a54add32233229e1098528c0600/EXPERIENCE.md) |
| Visual and interaction baseline | Same repository revision, with the separately approved design and prototype scope. [Design approval](v1-design-baseline.md) |
| Revision-bound evidence | SHA-256 `8acc67b9c3dfed9c4502e855b5a84453228c446a0d3961634d21d9f5f1337fbb`. [ADR-0019](../adr/adr-0019-revision-bound-evidence.md) |
| First-slice source checks | SHA-256 `6543487bc0894c64dd7801a5347e9cb7837ef0a34190ae6c2c01c10ce7058915`. [ADR-0020](../adr/adr-0020-first-slice-source-checks.md) |
| Standards | Repository revision `585021a08441aa095cfb8352e48557591b516303`. General and frontend engineering standards and applicable referenced contracts for the TypeScript web and worker scope. [Adoption](../../AGENTS.md#engineering-standards) |

The private slice leaves the public release conditions in force. Epic approval, program design approval, issue publication, and execution follow the existing workflow. This record captures the owner's decision for planning. Factory preflight must establish the trusted approval and check identities before dispatch. [Approval and revision contract](../../.agents/skills/software-factory/references/work-contract.md#approval-and-revision)

## Scoped standards adoption update

On November 28, 2026, the product owner approved the updated standards proposed in the [approved program design](v1-first-slice-program-design.md).

> Yes, I approve the updated general and TypeScript standards for the first slice.

For the new TypeScript web and worker code in the first operational slice, this decision supersedes the original standards row above. The approved [general profile](../../.agents/skills/engineering-standards/SKILL.md) and [TypeScript profile](../../.agents/skills/typescript-standards/SKILL.md), including their reference files and the general profile's frontend rules, have a combined manifest SHA-256 of `2e02e07dae2a17600eb8fa6c934b905d23a16e95429a6ae876b09f2a0e6f0e29`. Reproduce the digest with the command in the [reviewed program design](https://github.com/matejpalenik/narys/blob/a37bb13fba46ff91d30d416bcf7713cfc22535b3/docs/epics/v1-first-slice-program-design.md). Applicable shared Software Factory and setup references match `585021a08441aa095cfb8352e48557591b516303`. The [adoption entry](../../AGENTS.md#engineering-standards) records scope and exceptions.

## Scoped stack update

The product owner selected Vitest, Playwright Test, TanStack Query and AI, Better Auth with Next.js, Drizzle ORM for SQLite, Zod, and nuqs on November 28, 2026. The owner also selected `better-sqlite3` and instructed that Drizzle Kit generate the checked-in SQL in the Architecture feature's `infrastructure/migrations/sqlite/` directory.

> Yes please, let's remove LiteLLM and route inference through TanStack AI - please update all relevant documentation in the repo.

[ADR-0021](../adr/adr-0021-direct-model-inference.md) records direct OpenAI, Anthropic, and local-only Ollama routes. SPEC-016 and CONF-011 keep their existing behavioral scope. The engineering standard manifest and pinned visual baseline above still apply.

The [revised epic](../epics/v1-first-operational-slice.md) and [program design](../epics/v1-first-slice-program-design.md) apply the new stack to the approved delivery outcome. Review the exact revised documents and GitHub ticket bodies before releasing work. The owner will bootstrap repository tooling before implementation.

### Revised artifacts for review

The following content identities describe the revisions for review. GitHub reports #2 and #3 as children of #1, with #3 blocked by #2.

| Artifact | SHA-256 |
|---|---|
| [Architecture](../../ARCHITECTURE.md) | `f1cbe327933e648c9c04c15afb1f033f211cce4454f23e7d10470753f0257c58` |
| [Epic](../epics/v1-first-operational-slice.md) | `83cc10299dc7bfb1fa965af21f0e15f4ba3e28321335bb20589fe021f08d1ee2` |
| [Program design](../epics/v1-first-slice-program-design.md) | `85f1b4b01a052a279b6a475f96214142b12d18d3eb45f7ffee9fbf197dfd567a` |
| [GitHub issue #1](https://github.com/matejpalenik/narys/issues/1) body | `7bc87de4b6ba3ade878e7e6fc37d7d83e491ed0af25512512b4d0abb4973d60a` |
| [GitHub issue #2](https://github.com/matejpalenik/narys/issues/2) body | `654cb3f0fc44b72f1e334ffff38ae5e2bb920d2972e42f255cf973a34da4b0a4` |
| [GitHub issue #3](https://github.com/matejpalenik/narys/issues/3) body | `0b540b1d8fdca3938aff5f32c38479f1c7f34ddb2b4be367ed2a866da27d3356` |
