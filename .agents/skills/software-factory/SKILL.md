---
name: software-factory
description: >-
  Execute a bounded batch of explicitly authorized, approved issues in dependency order. Coordinate fresh implementation, independent verification, risk routing, CI repair, authorized integration and epic acceptance. Support human-review, risk-based and autonomous modes without bypassing project policy.
---

# Software factory

## Intent

Deliver approved tickets reliably with minimal routine human intervention. Preserve human ownership of intent and design. Use the tracker, repository and verification evidence as durable state. The factory does not define new features, change approved scope or authorize itself.

Read the [work contract](references/work-contract.md), [review policy](references/review-policy.md), [PR template](references/pr.md) and approved project `REVIEW.md`. Use `implement-ticket`, `verify-change`, `create-formal-verification`, `maintain-formal-verification` and `assess-change-risk` as focused disciplines. Use `maintain-documentation` for drift and change impact. If separate agent sessions are unavailable, use separated review passes and disclose the limitation. Do not pretend the harness provides persistent workers or event hooks.

Use the shared [writing standard](references/writing.md) for authored artifacts and review summaries.

Use the [standards contract](references/standards.md). Establish the adopted profile and immutable snapshot in preflight. Load [engineering-standards](../engineering-standards/SKILL.md) and applicable language standards (including [python-standards](../python-standards/SKILL.md) for Python) for affected work, not the entire library. These are cross-cutting disciplines, not additional workflow stages. The read-only [advise-workflow](../advise-workflow/SKILL.md) skill can help the human select the next activity but cannot authorize dispatch.

For UI issues, validate applicable experience and visual design approvals, referenced component foundation and required UI checks under the [experience contract](references/experience-contract.md). A missing or unapproved material interaction/design decision returns to human-led planning; do not start a redesign workshop inside an autonomous worker. Use `setup-repository` for missing approved frontend tooling and keep prototype scopes separate from production authority. Apply the [UI verification reference](references/ui-verification.md) and current trusted policy before integration. Hold only affected work when shared design changes invalidate an approval.

## Methodology

### 1. Preflight and establish execution scope

Identify the exact epic/issues, approved bodies, dependency graph and consistent requirements/specification/design revisions, authorized batch, tracker, integration branch and approved review mode. Check the repository can enforce approvals, protected branches and required check identities. Establish actual CI commands, test environment, merge permissions, retry/time/cost limits, concurrency, human checkpoints and notification mechanism. Confirm required documents and dependencies are accessible in worker contexts. Use [setup-repository](../setup-repository/SKILL.md) for missing or unverified governance, tooling or CI, with separate setup authorization. Check actual readiness evidence, not just file presence; reuse an already verified foundation. If policy or durable controller configuration is missing, do not start unattended integration. Offer a human-reviewed local run or report blocked. Do not invent credentials, permissions, CI workflows or a notification service.

Read the [policy contract](references/policy-contract.md), validate `.factory/policy.yaml` using the [schema](references/policy.schema.json), and record the approved policy revision and effective execution budgets. If absent, offer `setup-repository` with the [template](references/policy.yaml) and schema, `REVIEW.md` and required repository controls. Show the proposed changes and wait for approval. If a policy exists, never replace it automatically. Propose a compatible migration only when required. Stop automatic integration unless a trusted gate and policy evaluator are configured and verified. Persistent controller implementation is outside this skill's scope.

### 2. Select the next ready issue

Verify that the adopted standards snapshot and relevant language profiles are accessible and match the approved baseline. If missing, incompatible or materially unknown, hold affected unattended work and propose adoption or a permitted supervised route. Include applicable standards and exception references in the scoped worker handoff. Require independent standards review and actual configured checks. Bind their evidence to the exact candidate. Do not reset budgets or change controls to satisfy a standard.

Read the tracker graph and reconcile actual merged dependencies, approvals, PRs, current base and any persisted run state. Validate scoped requirements, specification, conformance cases, decisions and approval digests under the [baseline contract](references/baseline.md), [traceability contract](references/traceability.md) and [consistency contract](references/consistency.md). Run available structural checks and the applicable semantic review. Stop affected work on conflict, material drift, unknown material effect or a trusted hold. Do not claim unattended readiness without independently enforced structural validation and trusted approval/hold handling. Reuse approved material to avoid repeating planning. Reserve and record the issue claim and execution budget before dispatch. Give each ready issue an exclusive owner and dedicated branch/worktree. Use a fresh context with approved issue, relevant specification/conformance cases, architecture, program design, current code and test boundaries. Default to sequential execution. Run parallel work only with approved limits, disjoint or compatible changes and protected integration. Do not release a blocked dependency merely because the issue is closed.

### 3. Implement, independently verify and repair

Run `implement-ticket`. Use the thinnest approved end-to-end path first and implement each slice with feedback. Persist the candidate and evidence. Run `verify-change` in a separate context where supported. Include required formal or empirical verification. Open or update a scoped PR using the template if authorized. Trigger or observe the actual required CI checks. For failure, identify the concrete cause, reproduce when feasible and dispatch a focused repair within the approved design. Rerun checks on the new candidate. Apply the versioned execution budget from `.factory/policy.yaml`. Reserve each attempt before dispatch. Distinguish transient reruns from code repairs. Persist elapsed time, cost if metered, repeated failure signature and remaining attempts. Do not reset on restart or new head. Stop affected work when required evidence is unavailable, the same failure repeats without new evidence, infrastructure fails, a material decision changes or the budget is exhausted. Do not remove checks or modify acceptance.

### 4. Route review and integrate

Run `assess-change-risk` after required evidence is available and on each material candidate change using the approved policy snapshot. In human-review mode request authorized human review of every otherwise verified PR. In risk-based or autonomous mode request automatic integration only for an approved auto-eligible class and current trusted gate result. If human review is required, record the blocker. Notify the reviewer through the configured mechanism, if available, with the PR, risk reason, evidence and required decision. Otherwise report the pending review in the current session. In autonomous mode stop affected work rather than bypassing review. Continue independent authorized work only when policy permits.

The trusted gate reruns the targeted baseline and policy checks and validates candidate SHA, tested base or merge candidate, approved issue/epic/dependency payloads, current specification baseline and holds, structural and semantic review evidence, policy, required checks and human approval if applicable. Use configured auto-merge or queue. Never bypass branch protection, approve your own PR or use administrative merge to evade policy. Verify actual integration and required post-merge checks before releasing dependents. If the base or head changes, rerun checks and route as required. Merge is not production deployment permission.

### 5. Accept the epic and release

After the first end-to-end slice, stop for human review if the approved policy requires that checkpoint. A run cannot waive a mandatory policy checkpoint. At completion of the authorized batch, test integrated epic acceptance on the designated branch. If the batch does not cover all required scenarios, report remaining approved or deferred work without inventing issues. Verify integrated cross-issue guarantees and the applicable conformance matrix on the designated revision. Validate the end-to-end operational journey against the intended workflow in a representative environment. Confirm applicable deployment readiness, configuration, migration, monitoring and recovery evidence. Keep rollout/deployment authorization separate. Do not claim user validation or production readiness from a passing unit test or a merged PR. Require final human acceptance if the approved policy requires it. Otherwise require objective integrated acceptance evidence and explicit authorization. Report actual merge and deployment status separately. Do not close or ship incomplete work.

### 6. Preserve and resume state

At each gate, slice, repair, review and integration boundary record the approved policy revision, exact baseline, current revision, claim, check evidence, risk route, approval, remaining budget and next action in the configured durable state. On restart, reconcile with authoritative remote state and current code. Do not rely on a chat transcript. If the context is too large, hand off a compact record and use a fresh execution context when supported. Stop cleanly if the harness cannot persist or observe work. Improve the factory from observed failures through separate approved changes to tests, tooling or policy. Do not self-modify controls during a run.

## Response contract

At start/resume show a compact ready/blocked/in-progress table and the authorized mode. At checkpoints show **Outcome**, **Change**, **Evidence**, **Review route**, and **Decision required**. At completion show issue/PR links, integration revision, epic/release acceptance, residual limitations and next action. Do not stream a command transcript or claim ongoing work outside an available controller.

## Completion criteria

The authorized batch is integrated and verified, or explicitly blocked at an identifiable state. Epic acceptance is established through integrated evidence and the configured approval policy. Required checks, human decisions and deployment permissions remain distinct. Never report a pending merge or blocked change as complete.
