# Frontend engineering standards

Apply to adopted UI technologies and relevant changes. Use [experience and design-system ownership](../../software-factory/references/experience-contract.md), the approved architecture and applicable language profile. These are engineering conventions, not a mandatory new stack or complete TypeScript standard.

## Architecture and component contracts

- Keep presentation separate from domain invariants, authorization, orchestration and infrastructure. UI components display state and express user intent; authoritative business rules remain at their approved boundary. Do not rely on hidden buttons as access control.
- Keep feature-specific composition near its capability. Use a shared component only for demonstrated common behavior or an approved foundation. Prefer composition and explicit typed props to a large global variant matrix. Preserve public interfaces and framework constraints.
- Give state one clear owner. Separate transient interaction state, persisted business state and derived visual state. Do not treat cached status or animation progress as truth. Model loading, stale, empty, failed, partial and recoverable states as relevant.
- Use adopted shadcn/ui source-owned primitives and semantic theme tokens for new React frontends unless the approved design selects an alternative. Reuse the repository's existing aliases, CSS, variants and components. Never silently replace customized components or add a second component library. Do not add a package just for a trivial capability.
- Storybook is the component development and discovery environment when approved. Stories use production component imports and the actual theme; safe fixtures replace external services. Separate prototype-only source and styles from application imports.

## Quality and verification

Define the applicable accessibility target (default proposal for web: WCAG 2.2 AA), semantic structure, keyboard support, focus, reduced motion and responsive constraints. Use precise readable feedback and visible status, not decorative motion or color alone. Verify supported states and extreme data. Use measured performance requirements rather than arbitrary thresholds. Choose checks under the [UI verification reference](../../software-factory/references/ui-verification.md). Prefer actual rendered evidence over subjective claims. Use `design-experience` for material interaction decisions and `design-system` for new shared design rules. No wholesale redesign as part of implementation or verification.
