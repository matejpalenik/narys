# Repository bootstrap

Use [setup-repository](.agents/skills/setup-repository/SKILL.md) for authorized initialization before architecture, configuration after approved technical decisions, or a read-only audit. Use its [setup contract](.agents/skills/setup-repository/references/setup-contract.md) to distinguish verified local tooling, remote CI evidence and factory preflight. The commissioning checklist below remains necessary for autonomous integration; setup does not implement a controller or trusted merge gate.

During architecture approval, select the general and applicable language standards. Record the exact adopted snapshot and scoped exceptions in AGENTS.md. Keep the reviewed library accessible to workers. Establish actual local and CI commands and architecture/language checks. Existing repositories require approved adoption or migration. Do not assume new tooling is installed. See the [standards contract](.agents/skills/software-factory/references/standards.md).

Use this checklist with the human after the initial architecture is known. It is not an instruction to configure remote repositories without authorization.

## 1. Install templates

Copy the proposed files from this directory into the corresponding repository locations after adapting them to existing conventions. Use the supplied AGENTS.md and the `define-specification` template for root SPEC.md when applicable. Do not copy template placeholders as approved requirements. Establish the jointly approved requirements, specification, architecture and ADR baseline before epic approval. Offer to install `.factory/policy.yaml` and `.factory/policy.schema.json` and establish root `REVIEW.md` after explicit human approval. If existing policy is present, reuse it or propose a diff and wait for approval. Do not overwrite automatically. Validate the approved policy from the trusted base. Configure check identities and actual protected paths. Remove template placeholders. Do not overwrite existing approved instructions or templates silently. For GitHub, the `.github/ISSUE_TEMPLATE/` Markdown files are issue creation templates. Native parent/dependency relationships must still be set by the publisher.

## 2. Establish the minimum executable foundation

Identify the first tracer bullet and necessary enabling work. Ensure there is a real way to run the application and its required tests from a clean checkout. Establish the CI workflow and integration checks before relying on automated completion. If the repository is empty and those checks do not exist, either create them as separately approved enabling work or include the minimal setup in the first human-reviewed slice. Do not require a fully developed production platform before the first path can run.

## 3. Configure trusted state and authorization

Approve exact epic, issue and dependency snapshots, applicable requirements/specification/architecture/design revisions and permitted batches using a human-controlled record. A mutable issue label is insufficient. The controller must detect semantic edits, stale evidence, duplicate dispatches and conflicting claims. Implement structural validation of canonical IDs, references, coverage and approval records. Bind a scoped semantic review to the actual revision. Establish trusted holds for coordinated repository and tracker updates. A human-approved compatibility attestation is needed for changed referenced content unless a trusted deterministic rule can establish it. Do not permit a worker to self-clear a hold. The tracker holds progress and the controller may keep operational leases, retry counters and idempotency keys. Do not make those a second product specification.

## 4. Configure independent enforcement

- Use protected branches or rulesets, required checks with known issuers, and a trusted review-policy status. Workers must not have bypass authority or write access to the trusted policy source. Protect specification, requirements, architecture, AGENTS.md, verification and CI configuration changes with human review. Configure actual interface schema paths and any additional skill discovery directories under the approved policy.
- Define how a current authorized human approval satisfies the gate. If repository settings require a human review for every PR, ordinary auto-merge cannot waive that requirement. Do not remove protection to make the factory work. Use an independently controlled conditional gate if supported and verified.
- Use isolated worker worktrees and fresh contexts. Keep secrets and privileged credentials out of untrusted builds and classifier inputs. Keep trusted merge-gate execution separate from PR code.
- Specify how required checks run for an up-to-date base or merge candidate. If a merge queue is available, configure the required checks for its events. Otherwise serialize integration and recheck affected evidence.
- Set actual repair, time, cost and concurrency limits and a notification destination. A local agent run is not a durable unattended controller. For unattended operation, configure a persistent controller that handles PR and CI events, claims, retries, notifications and restart reconciliation.

## 5. Commission the factory

First run the workflow with every PR human-reviewed. Confirm that missing checks, altered approvals, stale revisions, protected path changes, unresolved baseline conflicts, untrusted hold release and classifier failure stop integration or require review under policy. Exercise one real integrated journey and applicable transition/recovery before relying on automation. Run model-based risk routing in shadow mode, compare with human decisions and record unsafe false auto-eligibility. Approve narrow automatic classes only after the controls pass their own regression tests. Keep high-risk and unknown changes human-reviewed.

## 6. Authorize the run

Record the exact batch, mode, integration branch, review policy revision, required checks and limits. Approve the first-slice and final-acceptance checkpoint choices. Do not infer deployment authorization from merge authorization. If any mandatory control cannot be configured, use a manual review path and report the gap.

## 7. Documentation and verification maintenance

Use `docs/requirements/` for new projects. For existing `docs/discovery/`, propose a migration with link and approval impact before moving files. Add Diátaxis pages only where needed. Preserve accepted ADRs and historical approvals. Establish formal property manifests and required reruns using the create/maintain skills. Configure CI to verify manifest structure and changed coverage; semantic correspondence needs review. Enforce execution budgets in a trusted runtime. If the runtime or gate is unavailable, use supervised human review. This library does not deploy a controller.

## UI-bearing repositories (when applicable)

- Use [design-experience](.agents/skills/design-experience/SKILL.md) for material user journeys and [design-system](.agents/skills/design-system/SKILL.md) for visual direction and component foundation. Adopt the frontend stack in architecture and configure actual tooling through [frontend foundation](.agents/skills/setup-repository/references/frontend-foundation.md).
- Approve `EXPERIENCE.md` with the relevant engineering baseline. Approve visual rules and actual component contracts before dependent implementation, or authorize an explicit foundation slice. Use the [experience contract](.agents/skills/software-factory/references/experience-contract.md). Non-UI repositories need neither record.
- Verify local and required remote UI checks using the [UI verification profile](.agents/skills/software-factory/references/ui-verification.md). Add real check identities and protect actual shared token/visual-baseline paths in trusted policy. The V7 policy template includes design document paths and a human-required change class. Review changes to existing policy before applying them. Do not enable unattended execution based solely on a successful Storybook build.
- Use [specialist catalog](.agents/skills/design-system/references/specialist-skills.md) to review and adopt pinned third-party skills if useful. No specialist, installer or MCP server is automatically installed or executed by this library.
