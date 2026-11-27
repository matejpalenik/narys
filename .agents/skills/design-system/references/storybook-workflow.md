# Component-driven design with Storybook

Use the official [shadcn skill](https://ui.shadcn.com/docs/skills), [theming guidance](https://ui.shadcn.com/docs/theming), [Storybook documentation](https://storybook.js.org/docs), [Next.js with Vite integration](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite) and [testing guidance](https://storybook.js.org/docs/writing-tests). Confirm compatibility with the actual versions in the repository. Storybook's [AI integration](https://storybook.js.org/docs/ai) is optional and may be preview or version-dependent. Do not require MCP, a paid visual testing service or cloud publishing.

## 1. Foundation

Use `setup-repository` configure after approval of the frontend stack. Reuse existing package manager, lockfile, component aliases, styling entry point, font/icon choices and framework adapter. For a new React frontend, propose shadcn/ui as source-owned component primitives and Storybook as the component environment. Adopt the appropriate React or Next.js adapter, approved CSS configuration and browser test runner. Inspect actual official registry metadata and reviewed dependency changes before installing. Do not run installers or remote scripts until approved. Record real commands in project instructions. Do not create a second app merely for Storybook.

Example logical layout, adapt to the approved repository instead of duplicating existing folders:

```text
.storybook/
src/
  design-system/
    tokens/                 # or existing global theme CSS
    components/
      agent-status.tsx
      agent-status.stories.tsx
    patterns/
  features/
    architecture/
    factory/
    assurance/
  ...
docs/design/
  references/               # approved reference notes, if needed
  prototypes/               # selected prototype pointers, if needed
DESIGN.md
```

Existing shadcn `components/ui` can be the canonical component root. Do not create another layer of wrappers just to match this example. Storybook must import the actual application component source and the same theme/configuration. Mock external dependencies through public boundaries. Avoid production credentials and private data in stories or preview artifacts.

## 2. Visual exploration and promotion

| Stage | Allowed result | Approval boundary |
|---|---|---|
| Exploration | Isolated stories or prototypes for a bounded question | Authorized disposable scope; no production imports or deployment |
| Selection | Human chooses a rendered composition and confirms rules | Exact prototype/visual direction revision; not merge permission |
| Foundation | Approved token and component source, supported stories and checks | Authorized ticket or direct enabling scope; approved program design as applicable |
| Integration | Verified component source used by the product | Existing trusted review/merge policy; separate release authority |

Choose one representative task and fixture. Render alternatives with consistent data and viewport. Inspect layout, typography, grouping, hierarchy, interaction and adverse states. Use source-backed specialist guidance when choosing. Prefer minimal meaningful revisions after a direction is selected. Record links, story IDs, candidate revisions, and which alternatives were accepted/rejected. When unavailable, use a clearly provisional wireframe and require later rendered approval for material visual choices. Do not claim an arbitrary URL is accessible to the human. Provide a local command if necessary.

## 3. Catalog and reusable contracts

Build needed foundations, primitives, components, patterns, product components and representative compositions. Start with compositions; extract shared patterns only when justified. The catalog is not a required checklist of components. A single initial foundation can be a coherent enabling slice. Component APIs are typed, with meaningful props and variants rather than a flag for every screen. Keep state near its owner. Reuse composition over global variants. Theme through semantic roles in the canonical token source, not per-screen hard-coded values. Avoid duplicating generated registry code or styles across features. Do not reinitialize or overwrite customized shadcn files without an approved diff.

| Applicable story | Evidence |
|---|---|
| Default and supported variants | Real source renders in the approved theme |
| Empty/loading/error/disabled/partial | Meaningful feedback and actions |
| Keyboard and interactions | User-observable assertions and focus behavior |
| Extreme data | Long labels, missing optional data, large counts, localization and overflow |
| Supported viewport/theme | Layout, contrast and motion behavior |
| Representative composition | Consistency among components and task flow |

Use stable story identifiers and meaningful story names. Do not invent variants or themes for coverage. Verify essential controls without pointer-only interaction. Record exact approved visual evidence and test scope; do not update a screenshot baseline merely because a candidate differs. Rendered approval establishes visual intent, not functional correctness. Review actual browser and app behavior for interactions that depend on routing, real integration or runtime data.

## 4. Agent discovery and CI

Use Storybook's component docs, source and typed contracts as the discovery interface. If the installed version supports a reviewed MCP/manifest integration, approve tool scope and use it to inspect stories/components and run applicable checks. Keep the local source and story index as fallback. No external service or privileged connection is required. A missing optional specialist or MCP is not a defect if the relevant evidence can be obtained another way. Never substitute AI advice for the required checks.

Configure canonical scripts for Storybook build, applicable component interaction and accessibility tests, and visual comparison when required. Use the same commands in local verification and CI. Pin the approved dependencies. Check actual exit status, browser environment and fixtures. Retain evidence against exact candidate/base, including story IDs, viewport/theme and artifact links. Protect required verification and visual baselines from automatic weakening. See [UI verification](../../software-factory/references/ui-verification.md) and [frontend setup](../../setup-repository/references/frontend-foundation.md).
