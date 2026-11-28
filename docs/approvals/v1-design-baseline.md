# Narys V1 design baseline approval

**Status:** Approved by the product owner on November 28, 2026 for the visual and interaction scope below.

**Approved revision:** [`61111d539ef99a54add32233229e1098528c0600`](https://github.com/matejpalenik/narys/tree/61111d539ef99a54add32233229e1098528c0600) in `matejpalenik/narys`. This revision contains the design record, Storybook source, and reviewed fixtures. Use it to reproduce the approved design. A running preview may show a different revision.

## Approval scope

Approve the Carbon light, canvas-first workspace and the reusable visual and interaction patterns in the pinned design. The scope includes the architectural node faces and illustrations, classic implementation cards, relationship notation, hierarchical exploration, contextual illustrative flows, revision and comparison controls, and shared inspector. Keep scope, revision, comparison, selection, and viewport distinct when following evidence or exploring a component. The TypeScript presentation contracts are design references. Production contract approval belongs to architecture and program design. [Pinned design record](https://github.com/matejpalenik/narys/blob/61111d539ef99a54add32233229e1098528c0600/DESIGN.md) · [Pinned Storybook workspace and source](https://github.com/matejpalenik/narys/tree/61111d539ef99a54add32233229e1098528c0600/docs/design/prototypes/canvas-storybook)

| Review surface | Story ID |
|---|---|
| Payments return after a merge, guided and direct source inspection | `narys-architecture-canvas--payments-overview` |
| Payments independent later change and dependent change withheld | `narys-architecture-canvas--payments-analysis-gap`, `narys-architecture-canvas--payments-dependent-gap` |
| Payments static retry view with a simulated motion preference | `narys-architecture-canvas--payments-reduced-motion` |
| Flask responsibility transfer and visible possible divergence | `narys-architecture-canvas-flask--json-provider-change`, `narys-architecture-canvas-flask--possible-divergence` |
| Shared inspector variants and the docked density inspector | `narys-canvas-specimen-inspector--multiple-related-observations`, `narys-canvas-specimen--density` |

## Applicable authority

The candidate commit pins the current requirements, specification, experience, architecture, and accepted ADRs. The four requirements files match the SHA-256 values in the specification inputs. The historical architecture and specification snapshots match their recorded digests. The current specification differs from its reviewed snapshot in approval wording and timing labels. The access limits and verification assertions are unchanged. [Requirements and reviewed inputs](../../SPEC.md#1-purpose-and-sources) · [Reviewed specification](spec-e0d259500691.snapshot) · [Reviewed architecture](architecture-34d1bf2b2481.snapshot)

Apply the automatic map generation in UX-008 and SPEC-020/021. These replace the earlier manual setup review in UX-002/004 and SPEC-002/003. ADR-0018 supersedes ADR-0004. Use the publication and access rules in ADR-0017, UX-010, and SPEC-014/015/017. The earlier architecture review backed specification work. The current architecture, standards adoption, and planned conformance cases still need the joint engineering baseline review. [Experience amendments](../../EXPERIENCE.md#14-automated-map-setup) · [Current architecture and accepted ADRs](../../ARCHITECTURE.md#8-decisions-and-evolution) · [Automated map decision](../adr/adr-0018-automated-map-publication.md) · [Publication decision](../adr/adr-0017-workspace-publication.md)

## Production design considerations

| Consideration | Carry into architecture, program design, and verification |
|---|---|
| Branching scope | Model explicit parent–child scope relationships. A parent may have multiple children. Derive navigation and breadcrumbs from the selected scope and its ancestors. The ordered Storybook array is a fixture composition. |
| Relationship endpoints | Identify the source and target architectural elements in each relationship. Derive graph links and inspector context from those endpoints. The linear scope drawings and fixed code-card positions illustrate the experience. |
| Stable identity | Separate element identity and layout from revision-specific names, responsibilities, technologies, relationships, and evidence. Where evidence supports continuity through a rename, keep the identity and canvas position where practical. Include a rename in program verification. |
| Revision-bound evidence | Associate each material claim with its decisive source at an identified revision. Resolve contextual actions from the revision and observation they describe. Test stale or inapplicable targets, including a later comparison that has its own evidence while the canvas still shows the last supported area map. Preserve both revision contexts and their distinct evidence. [SPEC-004, SPEC-007/008, SPEC-021/023](../../SPEC.md#3-observable-behavior) · [CONF-014](../../SPEC.md#4-conformance-cases) |
| Uncertain PR attribution | Compare the immediate integration revisions when attribution is established. When the branch change has source support and attribution to an individual PR is uncertain, show the change with its branch revisions and label PR attribution unconfirmed. Plan the multi-PR branch update case as part of CONF-004. [SPEC-007 and CONF-004](../../SPEC.md#4-conformance-cases) · [Revision attribution decision](../adr/adr-0009-merged-revision-attribution.md) |
| Guest workspace unavailability | When a due visibility check cannot establish eligibility, show temporary unavailability and withhold workspace data on anonymous page and data requests. Verify local withdrawal, known loss of visibility, recovery after a successful public recheck, and cached requests under the approved access timing. Apply these checks before enabling public access. [UX-010](../../EXPERIENCE.md#16-published-workspace-unavailable) · [SPEC-015 and CONF-010](../../SPEC.md#4-conformance-cases) · [Access timing](../../SPEC.md#5-access-timing) |

Reuse the approved canvas foundation and planned infrastructure. Use explicit data and composable components sized to the first operational journey.

## Validation carried forward

The TypeScript check and static Storybook build passed at the pinned revision. The generated index contains each story above. The pinned fixture walkthroughs cover revision selection, keyboard focus and viewport restoration, missing rationale, revision-specific evidence, simulated gap recovery, and a simulated reduced-motion preference. Browser accessibility-tree inspection covered inspector names and source disclosures. These observations establish the checked Storybook behavior. Operational conformance requires integrated evidence. [Pinned verification record](https://github.com/matejpalenik/narys/blob/61111d539ef99a54add32233229e1098528c0600/DESIGN.md#reusable-foundation-walkthrough)

- Walk through the essential comparison and evidence tasks with a spoken screen reader. Test the static retry path with reduced motion enabled at the OS level. Record the environment, tasks, observed result, and any limits. [Accessibility target](../../EXPERIENCE.md#7-accessibility-and-responsive-experience) · [UI verification profile](../../.agents/skills/software-factory/references/ui-verification.md)
- Compare the same real change in Narys and a normal GitHub handoff. Record how accurately engineers identify the responsibility change, affected behavior, rationale, and uncertainty. Record the time and effort to reach decisive evidence and return to context. Use real agent-assisted Narys changes as they become available. [Specification validation](../../SPEC.md#4-conformance-cases) · [Flask reference limits](../research/2026-11-27-flask-merge-reference-case.md#6-conclusions-and-limits)

## First operational slice after approval

Configure one selected area in one GitHub repository. Run the starting analysis in the background and publish a source-backed map at its exact revision. Process one real architecture-changing merge through the same application path and expose its supported consequences in Recent merges. From the canvas, an engineer can compare both revisions, follow decisive source, and read the recorded reason or see that it is missing. Keep deployment evidence and material uncertainty separately visible. [Approved map and change behavior](../../SPEC.md#3-observable-behavior)

Use Flask PR #4692 as the controlled source-correspondence check. Feed the real GitHub history or replay its integration through the normal processing path using the pinned before and after revisions. Check the transfer from `jsonify()` to the application JSON provider, the configuration in `src/flask/app.py`, the built-in default serializer, and the recorded rationale. Use Narys for live dogfooding as soon as it has a qualifying merge. A private, authorized workspace is sufficient for this slice. A public Narys release also requires the published-workspace conformance checks. [Flask expected results and revisions](../research/2026-11-27-flask-merge-reference-case.md#4-findings-and-expected-canvas) · [Public release scope](../requirements/v1-public-narys-demo.md)

Start `design-architecture` after design approval. Reuse the accepted ADRs and resolve the scoped production boundaries and proposed standards snapshot at `585021a08441aa095cfb8352e48557591b516303` as part of the joint engineering baseline. Then use `define-epic`, `design-program`, and `define-tickets` for the smallest integrated slice. Use `setup-repository` for the required tooling and checks once their scope is approved. Begin `software-factory` only after its preflight and explicit dispatch authorization. The repository has a draft review policy and the local Storybook checks. Establish and verify required engineering and CI controls before relying on them. [Baseline rules](../../.agents/skills/software-factory/references/baseline.md) · [Commissioning checklist](../../BOOTSTRAP.md)

## Product-owner decision

The product owner gave explicit approval in the Narys project conversation on November 28, 2026. The reviewed handoff had SHA-256 `8f7732f638574a02ad31c38ac718058e9628f888bc41ebb9129a952e0fa97bda`. Carry the production considerations and open validation into the next review. The joint engineering baseline and execution decisions require separate approval.

> Yes, I approve the V1 visual and interaction baseline at 61111d539ef99a54add32233229e1098528c0600 as described in the handoff.
