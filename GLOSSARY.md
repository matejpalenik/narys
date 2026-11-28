# Narys glossary

Terminology for the V1 program design. The product owner chose **Architecture Workspace** for the overall experience and **Canvas** for its interactive surface. Use them in product discussions, interface copy and code when they refer to the same concept. The specification defines required behavior. The experience and architecture documents describe the design. [Specification terms](SPEC.md#2-domain-terms) · [Workspace experience](EXPERIENCE.md#4-information-architecture) · [Domain architecture](ARCHITECTURE.md#5-domain-and-data-architecture)

## Workspace, map and canvas

| Term | Meaning |
|---|---|
| **Architecture Workspace** | A Narys workspace connected to a repository. It holds the area configuration and gives authorized readers access to the map, changes and evidence. **Workspace** is the short form. |
| **Area** | The part of the repository selected for analysis. Related source can extend beyond the starting path. |
| **Scope** | The part of the map a reader is exploring. For example, the selected area is Payments and the current scope is inside Payments Worker. |
| **Source revision** | The exact repository commit that a map, observation or excerpt describes. |
| **Architecture map** | Narys's representation of the area's elements and relationships at a source revision. The **starting map** is the first one Narys publishes. The **current map** is the latest map Narys has published as the workspace default. |
| **Architectural element** | A named part of the system, such as a container or component. Its identity can persist across a rename when source supports continuity. |
| **Relationship** | A connection from one element or implementation symbol to another, such as a call or dependency. Its meaning applies at a source revision. |
| **Implementation symbol** | A source-level declaration relevant to the question being inspected, such as a function, class or interface. |
| **Canvas** | The interactive surface that renders the architecture map. A **node** is the visual representation of an element or symbol on the canvas. |
| **Evidence inspector** | The panel that shows the selected element, relationship or change and the evidence associated with it. **Inspector** is the short form. |
| **Recent merges** | The workspace control and list for inspecting recent architecture changes from the tracked branch. An entry may show a supported branch comparison with unconfirmed PR attribution. |

[Area and map definitions](SPEC.md#2-domain-terms) · [Canvas and overlays](EXPERIENCE.md#4-information-architecture) · [Stable identity and revision context](docs/approvals/v1-design-baseline.md#production-design-considerations)

## Changes, claims and evidence

| Term | Meaning |
|---|---|
| **Architecture change** | A difference in architectural structure, responsibility or relationships across revisions. The **affected behavior** explains what that difference means for how the software works. |
| **Integration comparison** | The before and after revisions that bound a change on the tracked branch. Use **Before** and **After** for the revision controls. |
| **PR attribution** | The association between an integration comparison and the pull request that produced it. A supported branch comparison can have unconfirmed PR attribution. |
| **Architecture observation** | A revision-specific account of an element, responsibility, relationship or flow. A **claim** is an individual statement in that account or about what changed. |
| **Source evidence** | Pinned source used to assess a claim. A **source excerpt** is the short passage Narys checked, identified by repository, commit, file path and line range. |
| **Supported by source** | The checked source establishes the stated claim within its scope. Use this label for that claim and its revision. |
| **Unconfirmed** | Available evidence leaves the stated claim or association unresolved. Apply the label to the specific item, such as a behavior, PR attribution or deployment. |
| **Possible divergence** | Checked source conflicts with a concrete claim from a PR, commit or related record. |
| **Recorded rationale** | A reason for a change found in an existing record. **Missing rationale** means the available records supply no reason. A stated performance goal is rationale for a change. A measured performance result requires its own evidence. |
| **Deployment evidence** | A record showing that a revision containing the change reached an identified environment. Merge status identifies integration into the tracked branch. |
| **Analysis gap** | An unresolved interval where Narys could not complete analysis. A later comparison can have its own support while the current map stays at the earlier supported revision. |

[Source correspondence and conformance](SPEC.md#evidence-for-a-change-claim) · [Revision-bound evidence](docs/adr/adr-0019-revision-bound-evidence.md) · [Analysis gaps](EXPERIENCE.md#15-gaps-in-merge-analysis)

## Examples

> In the Flask architecture workspace, the canvas shows the JSON area. The #4692 integration comparison shows how responsibility for constructing JSON responses moved from `jsonify()` to the configurable JSON provider. The inspector shows the pinned source and the rationale from the PR. Deployment is unconfirmed.

[Flask reference case](docs/research/2026-11-27-flask-merge-reference-case.md#4-findings-and-expected-canvas)

> The current map is at revision A. An analysis gap remains between A and B. Recent merges shows an independently supported comparison from B to C. Its inspector opens evidence from B and C.

[Analysis gap case, CONF-014](SPEC.md#4-conformance-cases)

## Program design names

| Term | Name in the program design |
|---|---|
| Architecture Workspace | `ArchitectureWorkspace` aggregate in `src/feature/architecture/domain/architecture-workspace.ts`. Owns area configuration and the current map lifecycle. |
| Architecture map | `ArchitectureMap`. Represents the area at a source revision. |
| Canvas | `Canvas` component in `src/feature/architecture/ui/canvas.tsx`. Renders the map and supports inspection. |
| Integration comparison | `IntegrationComparison`. Carries the before and after revisions and the architectural changes. |
| Recorded rationale | `RecordedRationale`. Preserves the reason and its source or the missing state. |

Use **publish a map** for making revisioned results available to authorized readers. Use **publish a workspace** for the opt-in setting that enables eligible public reads. [Automatic map publication](docs/adr/adr-0018-automated-map-publication.md) · [Workspace publication](docs/adr/adr-0017-workspace-publication.md)

“Living architecture” can describe the product experience. The domain, data and interface names identify the specific thing an engineer works with.
