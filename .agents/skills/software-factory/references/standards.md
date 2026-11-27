# Standards adoption and compatibility contract

The factory separates reusable engineering preferences from the project's accepted architecture, actual tooling and authorized work. Standards guide quality; they do not change product semantics or authorize implementation, migration, publication or integration.

## 1. Ownership

| Record | Authority |
|---|---|
| `engineering-standards` | Reusable language-independent rules and defaults. |
| Language standards (initially `python-standards`) | Language-specific rules and tooling preferences. |
| Root or scoped `AGENTS.md` | Adopted standards snapshot, applicable language profiles and verified repository conventions. |
| Architecture and ADRs | Approved project application, technology choices and consequential exceptions. |
| Code and tool configuration | Actual implementation and mechanically enforced settings. |
| `REVIEW.md` | Applicable check obligations and evidence. |
| `.factory/policy.yaml` | Trusted execution/review authorization and limits. |

Do not duplicate rule text in tickets or create a separate standards registry. Record only the adopted snapshot, actual applicability, project decisions and exceptions. The system specification remains the canonical normative behavior contract.

## 2. Adoption and versioning

During initial architecture design, propose the general standards and relevant language profiles. In an existing repository inspect the approved design, conventions and tooling. Propose a scoped adoption or compatible mapping. Do not assume the presence of global skills makes their latest version approved. The human approves the applicable standards revision through the existing architecture/baseline gate. Record a verifiable immutable release/commit or content-addressed snapshot covering the relevant skill files and required references (including scoped standards dependencies) in `AGENTS.md`. A human-readable version label such as V5 is useful but is not an immutable identity by itself. Retain the approved files or a retrievable immutable reference. For locally modified skills, record the actual content identity in the trusted baseline mechanism. Do not invent a digest or treat an unpinned URL as immutable.

Example profile fields in AGENTS.md: `Standards: engineering-standards`; `Language profiles: python-standards (Python paths)`; `Standards snapshot: <immutable locator and digest or commit>`; `Approved exceptions: <ADR references or none>`. This is a compact project convention, not a new YAML schema. For other languages without a library profile, use the general standards and approved repository language conventions. Report that no specialized skill is installed; do not invent one. Mixed-language projects scope rules by package or path.

Bind the adopted snapshot and any material exceptions to the engineering baseline and exact approval. The controller/worker must be able to retrieve and use that version. A trusted gate, not the worker, validates the adopted revision and any allowed compatibility attestation. If the installed version differs, use the approved snapshot or stop affected work for an adoption decision. No automatic migration or new approval on the basis of a version label. For legacy supervised work without an adopted profile, explicitly use existing approved conventions if the human and policy permit; offer adoption separately. An empty repository can plan before approval, but cannot claim adopted/enforced standards. No unattended execution with unknown material standards applicability.

## 3. Classification and exception handling

| Class | Meaning |
|---|---|
| Mandatory when applicable | Binding rule for the adopted profile and affected scope. Failure or missing required evidence blocks the relevant work. |
| Default | Preferred design where it satisfies the approved objective. Depart with a reason; material departures require approval in the appropriate design record. |
| Conditional | Apply only when a stated requirement, risk or contract justifies it. |

A standards preference cannot override a binding specification guarantee, security requirement, accepted decision or trusted integration policy. If a mandatory rule and an approved design conflict, stop affected work and return to the responsible decision owner. Resolve at the canonical owner. A permitted exception records the rule, scope, rationale, risk, compensating check and closure condition in the existing ADR or approved scoped design. No exception grants permission to bypass required evidence or merge policy. A small reversible choice within a default may be recorded in program design without a new ADR. Never retroactively relax a standard to pass review. Existing out-of-scope legacy violations are observations, not authorization for refactoring.

## 4. Application and evidence

| Stage | Required action |
|---|---|
| Architecture | Establish adoption, boundaries and language/tooling choices. Approve material exceptions. |
| Program design | Check ownership, dependency direction, signatures, invariants, transaction and test boundaries. |
| Epic/ticket definition | Refer to adopted baseline and approved exceptions. Include only work necessary for the specified outcome. |
| Factory dispatch | Verify applicable snapshot and tooling access. Pass only needed reference sections to the worker. |
| Implementation | Apply relevant standards to changed code. Use actual tools. Escalate material conflicts, not migrate unrelated code. |
| Verification | Independently assess applicable rules, execute required checks, record semantic findings and limits. |
| Risk/merge | Unapproved material deviation blocks. Approved changes to standards/control files follow human-required policy and exact revision checks. |

Use deterministic checks for dependency direction, lint, typing, reproducible build and selected mechanical rules. Use semantic review and behavior evidence for rich domain models, useful abstractions, invariant ownership and architecture suitability. A pass establishes only the checked property. Do not claim enforcement just because a Markdown rule or sample config exists. Missing required enforcement blocks unattended integration under the existing policy. A direct authorized change can use proportionate checks without a fabricated epic. A standards update is a coordinated approved baseline change, not a reason to reset execution budgets.

For UI-bearing projects record adopted component/Storybook tooling and any selected design-specialist source/revision, digest and execution constraints in the existing standards snapshot or relevant approved AGENTS.md record. Use the [experience contract](experience-contract.md) and [specialist catalog](../../design-system/references/specialist-skills.md). Do not automatically install new specialist releases or let conflicting skill guidance change the baseline. Approved equivalent frontend tooling and existing components remain valid until a migration is authorized.
