# Engineering consistency contract

Apply the [standards contract](standards.md) to adopted profile identity, applicability, approved exceptions, and the relationship between standards, architecture, tool configuration and verification. A profile change with unknown material effect holds affected work. Report conflicts instead of silently enforcing a new global preference. Check candidate changes to standards/control configuration against the trusted base.

For UI work apply the [experience contract](experience-contract.md). Check that UX task flows, normative states and permissions, architecture feasibility, design rules, actual token/component contracts and required verification agree. Verify the relevance and identity of selected prototypes and approved Storybook references. Check changed shared components, themes and visual baselines for indirect effects. A prototype screenshot cannot authorize a changed normative guarantee. Coordinate affected repository and tracker updates with the existing hold and reapproval process.

## Authority and scope

Use the canonical ownership in the [work contract](work-contract.md) and the [traceability contract](traceability.md). Requirements, specification, architecture, accepted ADRs, interface schemas, delivery contracts, and verification obligations must be compatible. No hierarchy permits an agent to silently resolve a conflict between approved facts. Code is evidence of implementation, not authority to change intent.

Use the smallest relevant review scope. Reuse unchanged approved material. Inspect shared invariants, cross-boundary contracts and indirect dependencies, not just changed paths. A full-system review is justified at an initial baseline, major change or release assessment, not for each local edit. A small direct authorized edit can record reuse or non-applicability without inventing a hierarchy. Existing projects may use approved equivalent specifications until a migration is authorized. Do not fabricate missing artifacts or infer readiness for autonomous execution from absence of records.

## 1. Structural checks

Use deterministic checks wherever the rule can be expressed in code. Validate the applicable canonical IDs, unique definitions, required references, actual schema validity, adopted standards identity and approved exceptions, current ADR status, dependency graph, coverage mappings, approval identities and exact content snapshots. Check that each mandatory in-scope behavior has a verification mapping, and that affected tickets are justified and bounded. Resolve links from the approved snapshot and current base. Require explicit evidence for supersession mappings. Distinguish planned cases from observed verification. Inspect the tested merge candidate and approved base, not only the PR body. Use the repository's implemented validator and retain results. If no validator exists, use a scoped manual check under human supervision and disclose it. A skill or a schema is not an executable gate.

## 2. Semantic checks

Use an independent review pass for the relevant contracts. Compare actual propositions, not only matching IDs or similar words. Check at least the following where material:

| Relationship | Question |
|---|---|
| Requirements → specification | Are required outcomes preserved, feasible and testable? Is anything added without authority? |
| Experience → specification and architecture (UI) | Do user-visible states, permissions, intended tasks and feasible mechanisms agree? |
| Visual design → actual token/component contracts and stories (UI) | Are the shared visual rules and approved reference compositions preserved? Are affected consumers covered? |
| Specification → architecture / ADRs | Can the mechanisms supply the guarantees under the specified conditions, including failure and concurrency? |
| Interface provider → consumer | Do schemas, versions, permissions, timing, errors and assumptions agree? |
| Specification → epic / issue / program design | Does allocated work implement the required increment without changing or weakening guarantees? |
| Specification → verification | Does the method and assertion detect violations, including relevant negative cases and actual integration? |
| Candidate → baseline | Does code and descriptive documentation conform to the approved behavior and design? |

Use primary evidence, code, tests, contracts, a concrete counterexample, or an approved experiment to justify material findings. For a new design, distinguish feasible, proven and unresolved. An AI semantic review is a bounded assessment, not proof of global consistency. Verify critical properties through executable or formal checks where required. Do not equate agreement between agents with verification.

## 3. Decide and resolve

Use `consistent`, `conflict`, or `blocked` for the reviewed scope. A consistent verdict means no material contradiction was found with the evidence examined. A conflict names both authoritative records, the incompatible claims, the scenario that exposes the incompatibility, and affected work. Block when required evidence is missing or material effect is unknown. Use this compact output, in the existing review or PR evidence:

| Finding / status | Conflicting references or checked scope | Evidence and consequence | Owner / next action |
|---|---|---|---|

Do not invent a separate consistency report when existing approval evidence suffices. Return to the earliest affected decision owner. A requirement change uses `discover-requirements`, a normative behavior change uses `define-specification`, an architectural change uses `design-architecture`, an interaction change uses `design-experience`, a material visual rule change uses `design-system`, and delivery/program changes use their own gates. Correct descriptive errors with `maintain-documentation`. Preserve old approved snapshots and superseded ADR history. If the code violates an unchanged guarantee, report a defect. Do not resolve it by editing the contract.

## 4. Coordinate changes

Identify the impact on authoritative documents, active epics/issues, interface consumers, conformance cases and formal properties. Prepare the minimum coherent repository diff and have the human approve affected material changes together. Repository commits and tracker edits are not one atomic transaction. Use a trusted hold on affected work before publishing incompatible updates. Record the intended target revision and affected approvals. Reconcile partially completed tracker updates idempotently. Reestablish the approved consistent baseline and exact issue approvals before releasing the hold. Do not let an ordinary worker release its own hold. Unrelated compatible work may continue under policy. If the trusted hold/approval mechanism is unavailable, stop affected autonomous execution and use supervised reconciliation.

## 5. Checkpoints

| Checkpoint | Scope |
|---|---|
| Engineering baseline approval | Relevant requirements, specification, architecture, ADRs, interfaces, applicable experience and visual design, and planned verification |
| Epic and ticket approval | Allocation, integrated acceptance, constraints, program design and graph |
| Dispatch and resume | Exact approval, current scoped baseline, dependencies and unresolved holds |
| Candidate verification | Actual implementation, verification and documentation impact, semantic consistency |
| Merge gate | Revalidate exact candidate/base, evidence, approval and relevant baseline/holds |
| Integrated epic/release acceptance | Cross-issue guarantees, complete operational journey, coverage and rollout obligations |

Bind evidence to exact revisions per [baseline](baseline.md). If a change requires a new approval, do not continue affected implementation or merge until approval exists. A human review of code is not an implicit waiver of a contradiction. Any explicitly allowed exception needs authorized scope, rationale, residual risk, compensating check and expiry or closure condition. Never use an exception to evade mandatory safety, verification, or merge policy. A change to an approved guarantee is a baseline change, not a passing conformance result.
