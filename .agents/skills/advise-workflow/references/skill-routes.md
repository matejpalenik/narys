# Skill routes

This catalog is an orientation aid. Read the actual selected skill definition before making a recommendation. All links point to sibling skills in this library. User-invoked workflows remain explicit. Standards are cross-cutting. An advisory route is never execution authority.

## Capability catalog

| Intent | Skill | Result |
|---|---|---|
| Initialize, configure or audit engineering tooling | [setup-repository](../../setup-repository/SKILL.md) | Approved repository foundation or read-only gap report |
| Understand evidence, standards or alternatives | [research](../../research/SKILL.md) | Cited research report |
| Clarify business problem and release boundary | [discover-requirements](../../discover-requirements/SKILL.md) | Approved requirements |
| Select system mechanisms and technical boundaries | [design-architecture](../../design-architecture/SKILL.md) | Architecture, ADRs and adoption decisions |
| Resolve interaction model and UX journeys | [design-experience](../../design-experience/SKILL.md) | Approved EXPERIENCE.md and prototype evidence |
| Establish visual direction and reusable UI foundation | [design-system](../../design-system/SKILL.md) | Approved DESIGN.md, tokens, components and stories |
| Specify exact system behavior | [define-specification](../../define-specification/SKILL.md) | Normative contracts and conformance cases |
| Allocate capabilities to delivery | [define-epic](../../define-epic/SKILL.md) | Approved epic outcome |
| Design code structure and tests | [design-program](../../design-program/SKILL.md) | Approved five-part program design |
| Specify independently verifiable slices | [define-tickets](../../define-tickets/SKILL.md) | Approved issues and dependencies |
| Run an authorized batch | [software-factory](../../software-factory/SKILL.md) | Verified integrated batch or blocker |
| Implement a ready issue | [implement-ticket](../../implement-ticket/SKILL.md) | Candidate and implementation evidence |
| Independently review and validate | [verify-change](../../verify-change/SKILL.md) | Verification verdict and evidence |
| Route review under policy | [assess-change-risk](../../assess-change-risk/SKILL.md) | Risk route, not merge authority |
| Correct documentation or detect drift | [maintain-documentation](../../maintain-documentation/SKILL.md) | Accurate docs and approval-impact report |
| Establish a formal property check | [create-formal-verification](../../create-formal-verification/SKILL.md) | Reproducible verification and manifest |
| Maintain formal property correspondence | [maintain-formal-verification](../../maintain-formal-verification/SKILL.md) | Current check or defect/blocker |
| Apply or review architectural conventions | [engineering-standards](../../engineering-standards/SKILL.md) | Scoped standards assessment |
| Apply or review Python conventions | [python-standards](../../python-standards/SKILL.md) | Scoped language assessment |
| Decide what to do next | [advise-workflow](../SKILL.md) | Read-only recommendation |

Optional companions: `first-principles` for deep analysis and `show-me` for visual communication when installed. They are not bundled or required. Standards apply to relevant design/implementation/review without another approval gate.

## Example routes

| Situation | Shortest valid route | Reuse or limit |
|---|---|---|
| Greenfield idea | Initialize governance if needed → research as needed → requirements → architecture and applicable experience → specification → approve baseline → configure missing foundation → epics/program design and applicable design-system exploration → tickets → program design → tickets → approved factory run | Adopt standards during architecture; review each existing gate. |
| Approved requirements and architecture, no spec | Define specification → reconcile engineering baseline → define epic | Reuse approved requirements and architecture. For UI, first resolve any missing material experience choices. |
| New UI with unresolved task flows | Design experience → resolve architecture implications → specification → approve baseline | Do not start a full visual system before the interaction is understood. |
| Approved experience, missing visual foundation | Setup configure as needed → design system → approved foundation scope and verification | Compare rendered Storybook compositions; do not infer production approval. |
| UI extension using accepted components | Reuse EXPERIENCE/DESIGN/SPEC → scoped program design/tickets or authorized direct edit → verify change | No new workshop for routine reuse. |
| New feature in established product | Discover affected requirements → review architecture delta → define specification delta → affected epic/program design/tickets | Reuse unaffected records; no full product rewrite. |
| Approved epic but no child issues | Design program → define tickets → approve and publish | Do not re-research or change the epic scope. |
| Approved ready issues | Software factory after preflight and explicit dispatch permission | Check current baseline, policy, evidence and actual dependencies first. |
| Small authorized bug fix | Verify existing behavior/reproduce → implement ticket or authorized direct edit → verify change | Reuse specification; no fabricated epic. Direct edit is not autonomous factory dispatch. |
| Candidate PR awaits review | Verify change → assess change risk if required → authorized human or trusted gate | No automatic merge based on advisory response. |
| Formal property affected by diff | Maintain formal verification within authorized work → verify change | Do not treat old model success as current. |
| Contradictory approved artifacts | Identify canonical owners → appropriate requirements/specification/architecture skill → approval and revalidation | Hold affected execution. Adviser does not resolve or modify records. |
| Python project quality concern | Engineering standards + Python standards → scoped design or review | No blanket refactor; propose necessary fixes in authorized scope. |
| Missing governance or verification tooling | Setup repository: initialize, configure or audit as appropriate | Reuse approved toolchain; no unsolicited migration or dispatch. |
| Missing trusted controller/gate | Identify commissioning prerequisites and supervised route if permitted | Setup alone cannot enable unattended dispatch/merge. |

For planning, human approval is tied to exact artifacts. For execution, publication, dispatch, integration and deployment are separate permissions. See [baseline](../../software-factory/references/baseline.md), [consistency](../../software-factory/references/consistency.md), and [policy](../../software-factory/references/policy-contract.md). If an actual skill's contract or current repository state disagrees with this orientation table, inspect the canonical source and surface the conflict.

## Sample response

User: “I have a reviewed architecture and requirements. What next?”

Recommendation: define the normative system specification before epics. The requirements and architecture already establish the objective and mechanisms; do not repeat those interviews unless they conflict with the new behavioral contracts.

| Step | Output | Gate |
|---|---|---|
| `define-specification` | `SPEC.md` and conformance cases | Approve consistent engineering baseline |
| `define-epic` | Coherent delivery outcomes | Epic approval |
| `design-program` | Files, signatures, flows, tests and decisions | Program-design approval |

Next invocation: `$define-specification` — Derive required behavior and conformance cases from the approved requirements and architecture. Ask me one consequential question at a time. Surface any conflicting guarantees before approval.

This example assumes the referenced approvals have been verified. In an actual session verify the relevant evidence first.
