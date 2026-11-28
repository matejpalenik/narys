---
name: implement-ticket
description: >-
  Implement one explicitly authorized ready issue within its approved product and program design. Use behaviour-driven test increments, maintain required invariants and return exact candidate evidence for independent review. Does not authorize or perform its own merge.
---

# Ticket implementation

## Intent

Deliver exactly the approved behaviour with the smallest correct maintainable change. Preserve existing guarantees. Make the result independently reproducible and reviewable.

Read the [work contract](../software-factory/references/work-contract.md) and applicable `REVIEW.md`. Read the exact approved issue, epic, relevant specification and conformance cases, design references, code and existing tests. Verify readiness, dependencies, authorized base and assigned branch or worktree. Do not alter other work.

Use the shared [writing standard](../software-factory/references/writing.md) for authored artifacts and review summaries.

Read the approved `.factory/policy.yaml`, [policy contract](../software-factory/references/policy-contract.md) and [baseline contract](../software-factory/references/baseline.md). Check relevant approval revisions and policy before work. Do not change protected controls or infer authority from a mutable label.

Before changing code, verify the adopted standards snapshot under the [standards contract](../software-factory/references/standards.md). Apply [engineering-standards](../engineering-standards/SKILL.md) and the applicable language skill (including [python-standards](../python-standards/SKILL.md) for Python) to affected code. Load only relevant references. Use the actual configured tools and report missing checks. Do not silently add an exception, retrofit unrelated legacy code, or weaken type/lint/architecture checks.

For affected UI, read approved EXPERIENCE.md, DESIGN.md and the [frontend standard](../engineering-standards/references/frontend.md), then discover actual source, tokens and relevant Storybook stories before changing code. Use adopted specialist guidance selectively. Reuse and compose existing components; implement missing approved components with applicable stories within the authorized slice. Do not introduce an unrelated aesthetic, copy experimental prototypes into production, change shared rules or silently refresh visual baselines. Apply the [experience contract](../software-factory/references/experience-contract.md) and [UI verification reference](../software-factory/references/ui-verification.md).

## Methodology

### 1. Establish the baseline

Confirm required tests and environment. Trace the intended call path and identify the approved public boundaries. Establish pre-change behaviour with existing tests or a reproduction. If an approved design is incompatible with the actual base, stop and provide evidence. Do not silently revise types, ownership or architecture. Report unrelated existing defects separately.

### 2. Implement in verifiable increments

For each new acceptance behaviour, add a focused test at the highest useful public boundary. Confirm it fails for the expected reason against the base where feasible. Derive expected results from the approved specification or trusted fixture, not the candidate implementation. Keep regression and characterization tests that already pass. Implement only enough to make the required behaviour correct. Run relevant checks, refactor locally when needed, then repeat. Do not write all layers before getting end-to-end feedback.

Respect approved file plans, signatures, data and call stacks. Treat the issue as implementation scope, not as permission to alter the normative system contract. Preserve applicable SPEC guarantees and interface semantics. Stop affected work if the issue or implementation conflicts with the approved baseline. Use existing project conventions. Avoid unnecessary abstractions, dependencies and unrelated cleanup. Use real dependencies where they determine correctness. Disclose substitutes and their limits. Preserve authorization, state integrity, failure handling and compatibility. Stop before a material deviation or required new decision.

For TypeScript, carry the intended [TSDoc](../typescript-standards/references/tooling.md#tsdoc) from the approved program design into source. Add or update it for affected contracts and check it against the implemented behavior.

### 3. Produce evidence

Use `maintain-documentation` for affected documentation and baseline impact. Record structural reference and semantic consistency checks for the relevant scope. Link observed checks to SPEC/CONF and acceptance case IDs. Report unavailable or failed evidence, rather than redefining a conformance case. Update descriptive documentation and examples in the same scoped PR. Report conflicts with approved intent as defects or blockers, not documentation corrections. Use the formal coverage manifests to identify affected guarantees. Do not silently introduce new property requirements or weaken an existing one.

Run the issue's verification plan and applicable policy profiles. Recheck affected formal properties with `maintain-formal-verification` (or `create-formal-verification` for an approved new property) when applicable. Run required tests, evaluations, build and other CI-equivalent checks where feasible. Inspect the full diff for scope, accidental artifacts, secrets, weakened checks and regressions. Record exact candidate revision, commands, environment, observed results and evidence. Do not hide a failure or change acceptance to make it pass.

### 4. Hand off

If authorized, commit the change on the designated branch and open or update the candidate PR using the [PR template](../software-factory/references/pr.md). Do not self-approve, bypass checks, close the issue before integration, or merge. Return the candidate to `verify-change`. For a repair request, reproduce the named failure, make the smallest within-scope correction, rerun affected checks and invalidate stale evidence. Report when a required check cannot run or the repair would change approved scope.

## Response contract

Show **Outcome**, **Change** (small table or call tree), **Verification** (case, observed result, evidence), and **Status** (candidate revision, remaining checks or blocker). Link the PR and artifacts. Do not paste large diffs.

## Completion criteria

A candidate is ready for independent review when it implements the approved issue, required local checks are accounted for, material changes are in scope and the exact revision is reproducible. This status is not verified integration or approval to merge.
