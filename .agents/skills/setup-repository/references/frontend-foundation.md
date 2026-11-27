# Frontend and Storybook foundation

Use configure mode only after explicit approval of the frontend stack and setup scope. Initialize mode does not install React or a UI toolkit. Audit mode does not execute project code, installers or remote scripts. Preserve an existing compatible toolchain and design system. The following defaults are proposals for greenfield React projects, not a mandatory migration.

| Concern | Default proposal / action |
|---|---|
| Framework and package manager | Approved React or Next.js, chosen package manager and committed lockfile |
| Type checking and lint | Adopted strict TypeScript and existing approved lint/format tooling; do not introduce a second incompatible toolchain |
| Component foundation | shadcn/ui; inspect actual registry, base implementation, aliases and generated dependencies |
| Styling | Approved Tailwind configuration and semantic CSS variables; reuse actual theme source |
| Component preview | Storybook with framework-compatible adapter and browser environment |
| Component tests | Supported Storybook interaction/accessibility testing; choose actual commands for installed version |
| Visual testing | Approved local or hosted mechanism when required; no paid/cloud service by default |
| Integrated UI checks | Project-approved browser/e2e runner, fixtures and acceptance cases |
| CI | Same canonical commands, locked dependencies, least privilege and trusted check identities |

Inspect [shadcn installation](https://ui.shadcn.com/docs/installation), [theming](https://ui.shadcn.com/docs/theming), [Storybook installation](https://storybook.js.org/docs/get-started/install) and [Next.js with Vite](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite) before selecting compatible versions. Do not use `latest` in reproducible setup or unreviewed remote registries. Prefer reviewed pinned tool/registry versions, inspect generated diffs, and commit the resolved lockfile when applicable. Do not require a separate package or application for the design system. Adapt the setup to the actual framework and repository layout. There is deliberately no static package.json or version-specific Storybook config in this library.

## Configure and verify

1. Inspect existing frontend, package.json, lockfile, component aliases, theme, test configuration and CI. Propose exact additions/reuse, dependencies, versions, preview security, command names and remote changes. Review with the human before mutation.
2. Initialize only the approved component and Storybook foundation. Use the actual application theme and source, not a duplicated sample component library. Add one meaningful approved example story or the first required composition when scope permits; if product/component source is not yet authorized, record that obligation for the design-foundation slice. Do not introduce fake functionality or a no-op test to claim readiness.
3. Configure local/build commands, type/lint checks and applicable Storybook/browser tests. Use official supported integration for the chosen version. Verify a relevant actual preview and test result if authorized and available. Use a disposable failing witness for new mandatory enforcement when safe. Do not publish a preview to the internet by default; ensure synthetic data and no credentials. Configure MCP only if separately approved after reviewing compatibility, permissions and lifecycle.
4. Record actual project commands and checked scope in AGENTS.md/REVIEW.md. Verify CI identities and remote protections separately. Include required UI checks for the selected scope and protect shared design/baseline paths through a human-approved policy change. If no required story, browser or visual review ran, report the gap; do not claim UI readiness.

For third-party skills use the [specialist catalog](../../design-system/references/specialist-skills.md). Ask before installing or updating them; inspect scripts, hooks, license, pinned revisions and execution permissions. Adoption is a reviewed dependency change, not automatic setup. Do not overwrite an existing DESIGN.md or EXPERIENCE.md. See [Storybook workflow](../../design-system/references/storybook-workflow.md) for the next design activity. No Carbon or Carbon MCP is installed as a default.
