# Experience and design-system contract

## Scope and ownership

Apply only to user interfaces and changes that affect their contracts. Headless products and unrelated changes need no design artifacts. Use approved equivalents in existing projects; migrate only by authorization. See the [work contract](work-contract.md), [baseline](baseline.md), [consistency](consistency.md), [traceability](traceability.md) and [standards](standards.md).

| Record | Canonical responsibility |
|---|---|
| `docs/requirements/` | User needs and intended outcomes |
| `EXPERIENCE.md` | Approved task flows, interaction design, information architecture, design rationale and prototype evidence |
| `SPEC.md` | Normative observable behavior, permissions, states, errors, guarantees and conformance criteria |
| `ARCHITECTURE.md` and ADRs | Frontend technical construction, integration and decisions |
| `DESIGN.md` | Visual intent, design-system rules and approved reference compositions |
| Semantic token source | Exact visual values and supported themes |
| Component source | Implemented component contracts |
| Storybook | Executable examples, component evidence and approved visual references; not separate production code |
| Epics, issues and review policy | Delivery authorization, acceptance, verification and integration authority |

A proposed UX decision can precede the specification. Once normative behavior is approved, refer to its canonical SPEC ID. Do not copy a second independent normative obligation into EXPERIENCE or DESIGN. Reconcile changes to interaction, product behavior and technical feasibility together. A visual preference cannot override a required guarantee. An implementation or specialist recommendation is evidence/advice, not authority to change intent.

## Timing and authorization

1. Use [design-experience](../../design-experience/SKILL.md) with requirements and architecture to explore material user journeys. Establish the applicable approved experience before the related normative specification and epic. Iterate with architecture when feasibility changes the experience. Use prototype permissions for disposable experiments only.
2. Use [setup-repository](../../setup-repository/SKILL.md) to configure approved frontend tools. Use [design-system](../../design-system/SKILL.md) once the frontend stack and relevant experience are agreed. It can run in parallel with approved planning. Do not require a complete visual catalog before epics or the whole application before UI work. Approve visual direction against rendered compositions.
3. Authorize a bounded foundation ticket or supervised direct enabling scope for reusable tokens/components/stories; apply relevant program design and verification. Visual approval alone is not code, publication, integration or deployment authority. Draft variants remain isolated from production. Foundation is ordinary governed engineering work, not an exemption from policy. Reuse integrated foundation or include the missing approved component work in the vertical slice. Never dispatch dependent UI work on an unapproved or inaccessible design baseline.
4. Extend only the parts of the design system needed for an approved journey. A feature using established components and visual conventions need not repeat the interview. A new component conforming to approved rules may be implemented within approved program design and scope. New material experience or shared visual rules require the responsible skill and exact human approval. A routine component defect is repaired against the existing contract.

## Revisions and change impact

Reference UX IDs and consequential DS rules when they justify scope, decisions or checks. Record canonical locators and exact approved UX/design revisions, relevant token and component contracts, and approved story IDs/visual baselines where needed. Bind approvals to immutable snapshots through the existing baseline mechanism, not a new manually maintained catalog. Capture actual rendered review evidence and explicit approval separately. Evidence is valid only for the checked candidate and its applicable inputs, including theme, fixture, viewport and environment. Do not interpret a visual review as full conformance or accessibility certification.

Detect changed design tokens, shared components, stories, UX decisions, interaction semantics and approved visual baselines by both scope and semantic impact. A change to an unrelated story need not invalidate an issue. A changed shared semantic token or component contract can affect many stories; inspect downstream consumers, not just paths. Unapproved material changes or unknown compatibility hold affected work. Use the existing exact-payload reapproval and trusted compatibility rules. Protect `EXPERIENCE.md`, `DESIGN.md`, adopted third-party skills, verification controls and project-specific shared token/baseline paths according to the approved policy. Propose policy additions, never self-approve them. Normal in-scope feature composition is not automatically a material design-system change.

## Verification

Use the [UI verification profile](ui-verification.md) within existing V0–V4 profiles. A passing Storybook build, snapshot or automated accessibility check alone is insufficient. Verify integrated user tasks when required. Reuse approved fixtures, inspect rendered evidence and report limitations. Keep visual regression baseline changes under approved review. No placeholder progress estimates or invented runtime statuses; use real state and evidence.

## Specialist guidance

Use the [specialist catalog](../../design-system/references/specialist-skills.md) and adopt exact reviewed revisions only with human authorization. Keep existing project conventions and approved design sources authoritative. Do not require third-party skills for non-UI work, nor allow one to override factory constraints or write another independent design rulebook. Do not load all specialists by default. Optional preview/MCP tooling is not a requirement for correctness. Default shadcn/ui and React Storybook are conditional on the approved frontend architecture, not mandatory migrations.
