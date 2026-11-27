# Work contract

## Purpose and authority

Deliver the smallest approved product outcome as correct, maintainable software. The human owns objectives, release scope, business rules, consequential design decisions and the policy that authorizes integration. The agent owns investigation, proposals and reversible implementation decisions inside that baseline. A successful check is evidence, not authorization.

| Record | Authority | Default location |
|---|---|---|
| Research | Source-backed findings, not approved requirements | `docs/research/YYYY-MM-DD-<slug>.md` |
| Requirements | Business problem, terminology, requirements and release boundary | `docs/requirements/product.md`; feature or release documents under `docs/requirements/` |
| Specification | Normative system behavior and conformance criteria | `SPEC.md` and linked `docs/specifications/` as needed |
| Interface syntax | Canonical machine-readable schemas or protocol definitions | Existing OpenAPI, JSON Schema, event/protocol contracts |
| Architecture | Approved target design and explicit current-state status | `ARCHITECTURE.md` |
| Experience | Approved interaction design, task flows and rationale; normative behavior belongs in SPEC | `EXPERIENCE.md` when applicable |
| Visual design | Approved visual conventions and reference compositions | `DESIGN.md` when applicable |
| UI implementation/evidence | Exact token values, component contracts and rendered examples | Adopted token/component source and Storybook |
| Adopted standards | Applicable immutable standards snapshot and project-specific conventions | `AGENTS.md`; referenced standards skills; approved exceptions in ADRs or scoped design |
| ADR | Rationale and status of one durable architectural choice | `docs/adr/adr-NNNN-<slug>.md` |
| Epic | Approved delivery outcome and integrated acceptance | Issue tracker parent issue |
| Program design | Approved files, contracts, call stacks, test design and uncertainties | Ticket program-design section; pre-publication working design in a draft only |
| Issue | Authorized bounded implementation increment and acceptance, not independent product semantics | Tracker child issue or approved direct scope |
| Review and execution policy | Human rationale and binding machine-readable configuration | `REVIEW.md` and `.factory/policy.yaml` from trusted base |
| Formal verification | Property rationale and machine-readable coverage | `docs/verification/PROP-<number>-<slug>.md` and matching `.yaml` |
| Reader-facing documentation | Verified description or procedure, not authority for product scope | `docs/tutorials/`, `docs/how-to/`, `docs/reference/`, `docs/explanation/` as needed |
| Evidence | Observed check result for exact revisions | CI artifacts, PR and verification registry |

Keep one authoritative record for each kind of information. The specification owns normative guarantees. Architecture and ADRs own mechanisms and rationale. Do not redefine specification behavior in the delivery backlog. If authoritative records conflict, block affected work instead of choosing one silently. Do not create a duplicate live backlog. Link to an exact relevant section instead of copying long documents. Use stable identifiers for requirements and acceptance cases that need traceability. Preserve existing valid identifiers. Use the [traceability contract](traceability.md) for REQ, SPEC, CONF, ADR, PROP, applicable UX/DS and local AC identifiers. Generate reverse coverage from references instead of maintaining a duplicate matrix.

## Planning and scope

For a new product or major feature, use research as needed, requirements discovery, architecture and applicable experience design, and then specification. Iterate between them to resolve conflicts. Obtain approval of the jointly consistent engineering baseline before approving epics. For each substantive epic, confirm product scope, applicable architecture and specification approval, then approve Program design and Ticket plan. Initial product discovery, architecture, and specification may cover several epics. Reuse an approved applicable baseline rather than interviewing twice. Record which architecture decisions apply to an epic and any new delta. A feature with no material change can reuse an accepted design or explicitly record non-applicability. Do not skip a gate silently. A small feature needs a small record, not a full sequence of large documents. A bug fix uses its existing normative behavior. A behavior-preserving refactor reuses the specification. Document the relevant reuse or non-applicability. For an authorized trivial direct edit, do not invent an epic, ticket or new baseline solely to satisfy the process. Never waive binding guarantees, required checks or authority. Disposable experiments are permitted only to answer an agreed question. Do not confuse their results with production implementation.

Release scope is a human-approved boundary, not a backlog target. Each epic and ticket must trace to a required outcome, binding quality requirement or demonstrably necessary enabling change. Do not create extra tickets to accommodate invented requirements. Record out-of-scope observations separately. Requirements, specification, architecture, epics and ticket decomposition can be iterative, but implementation starts only after the relevant gates pass.

Apply the [standards contract](standards.md) across architecture, program design, implementation and verification. Adopt or revise the profile in the existing baseline approval, not a new gate. Keep standards references in the baseline rather than duplicate rule text in epics and tickets. The [workflow adviser](../../advise-workflow/SKILL.md) offers read-only routing and does not authorize any lifecycle step.

For UI-bearing changes apply the [experience contract](experience-contract.md). Experience informs architecture and specification; visual direction and the minimum needed component foundation can be refined after the frontend stack and relevant UX are approved. Reuse accepted designs for routine changes. Authorize disposable exploration separately from production enabling work. Material experience/design changes use the existing baseline approval, not a duplicated gate for every component. No prototype selection is production or merge authorization.

## Approval and revision

Present each gate for explicit approval of its exact revision. Record artifact identity, immutable version or content digest, human approval source and any exceptions. Use a trusted human-controlled approval record. Do not fabricate approval or treat an agent-editable label, file or comment as proof. If planning artifacts or approved issue bodies change semantically, invalidate affected downstream approvals and stop affected execution. An administrative update such as adding a verified issue number is not a semantic change. Define the exact canonical payload that the approval covers, excluding the approval reference itself and explicitly permitted operational metadata. Verify the payload digest again at dispatch and merge. Retain history. Use immutable links to reviewed repository content where feasible. A draft in a private worktree or chat is not a usable factory input.

Publication, dispatch, merge and production deployment are separate permissions. A human can grant a bounded batch permission in one instruction. An agent cannot enlarge it. Explicitly identify whether the requested task permits remote writes. Read-only work must not change tracker state.

Read the [baseline contract](baseline.md), [traceability contract](traceability.md) and [consistency contract](consistency.md). Apply structural and semantic checks at baseline approval, epic/ticket approval, dispatch, candidate review and merge. Use one scoped review record and no new gate for routine unchanged material. Use scoped references, stable IDs and approved content snapshots. Check targeted documentation drift and affected downstream approvals before dispatch, verification and merge. Use `maintain-documentation` for descriptive updates and impact analysis. Requirements, specification, architecture, ADRs and the tracker keep their specialized formats. Coordinate related changes with a hold on affected work until compatible snapshots and approvals are restored. Follow the [writing standard](writing.md) for editorial budgets and Diátaxis/STE guidance.

## Repository policy

For execution and integration, read the [policy contract](policy-contract.md) and the approved `.factory/policy.yaml`. Planning can proceed before repository policy exists. Use root `REVIEW.md` for verification profiles and rationale. The YAML is the authority for configurable routing and execution limits. The trusted base revision is authoritative. A missing, invalid, conflicting or unapproved policy cannot authorize automated execution or merge. Offer setup before executing, and preserve existing policy unless the human explicitly approves a change. Record a policy snapshot for each run. Keep the policy evaluator and approval/gate identities outside worker control.

## Execution contract

| State | Condition |
|---|---|
| Draft | No valid execution approval |
| Approved | Exact issue and relevant design accepted; may have blockers |
| Ready | Approved, released for dispatch, all dependencies integrated, artifacts accessible, required tools available |
| In progress | Claimed by one executor with recorded owner and base |
| Review | Candidate PR with check evidence for current revision |
| Blocked | Missing decision, dependency, evidence, permission or retry budget |
| Integrated | Authorized merge exists in the designated branch; required integrated checks accounted for |
| Accepted | Epic or release acceptance policy satisfied |

Map states to existing tracker conventions. An issue being closed does not prove integration. Verify blocker merge and acceptance evidence. Use native parent and dependency relationships where available. For local-only planning, store drafts one file per issue and use stable local IDs. Publish blockers first. Reconcile partially completed publication idempotently; never recreate an existing issue just because a previous request timed out.

Before dispatch, verify the exact approved issue snapshot, parent, specification, architecture and dependency revisions, actual base, dependencies, required checks, remaining authorized scope and execution policy. The controller must reject changes to trusted approval, merge or verification rules from ordinary execution workers. On resume, reconcile tracker, git, PRs, CI and recorded state. Never infer success from stale chat or cached status.

## Communication

Use [writing guidance](writing.md). Lead with the conclusion or decision. Use compact tables, call trees and Mermaid diagrams for relationships or sequence. Use installed `first-principles` and `show-me` when relevant; do not require their availability for basic work. During interviews ask one material question per turn, with options, implications and recommendation where useful. Persist the confirmed result. Do not paste full reports into every chat response.
