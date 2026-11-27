# Engineering baseline and change impact

## 1. Establish the baseline

The engineering baseline is the approved set of business requirements, normative system behavior, architecture, accepted ADRs, applicable interface schemas, adopted engineering/language standards snapshot, applicable experience and visual design records/contracts, and planned conformance cases for a release or feature. It is not a new long document. Prefer one reviewed repository commit containing the compatible records. If their approvals refer to earlier revisions, record the evidence that the relevant content still matches. Bind approval of the scoped baseline to the exact snapshot and authorized human. Resolve contradictions using the [consistency contract](consistency.md) before approving epics.

Each published epic and issue has its own approved payload and references the relevant baseline. Include approved program design, parent, actual prerequisite graph, acceptance and verification requirements. Tracker issue bodies, labels and relationships are mutable. Record their approved content in a trusted, human-controlled mechanism outside worker modification rights. Use immutable git references and explicit identifiers under the [traceability contract](traceability.md). Do not fabricate a record or digest. Publication, dispatch, integration and deployment remain separate authorizations.

Example approval payload (illustrative, not a native GitHub field or generated proof):

```yaml
repository: owner/repo
epic: 42
issue: 43
baseline: <approved-git-commit-sha>
references:
  requirements: [REQ-014]
  specification: [SPEC-021]
  decisions: [ADR-0004]
  conformance: [CONF-008]
  properties: [PROP-001]
  architecture:
    - path: ARCHITECTURE.md
      section: Purchase persistence
  interfaces: []
  # Only for affected UI work, use immutable locators and checked snapshots.
  experience: [] # UX IDs and approved reference
  design: [] # DS IDs and approved reference
  ui_contracts: [] # relevant token/component/story refs and approved revision
standards_snapshot_ref: <immutable-approved-standards-reference>
program_design_ref: <immutable-approved-reference>
epic_payload_digest: <sha256>
issue_payload_digest: <sha256>
dependency_payload_digest: <sha256>
approval_ref: <trusted-human-approval-record>
```

The approved commit supplies file content. Record canonical locators for IDs and scoped content if needed. The trusted approval mechanism must define and test exact canonical encoding, content extraction and digest algorithm (for example SHA-256 over an agreed canonical UTF-8 payload). Include title, body, parent, dependency semantics and shared program contracts. Exclude only the approval reference itself and explicitly allowed operational metadata such as progress comments. An issue edit outside the excluded fields requires exact new approval, even if its wording looks editorial. A changed Git commit alone is not proof of semantic change. Avoid depending on unstable heading numbers or line offsets alone. Never hash a self-referential approval value. Preserve historical snapshots, not only hashes.

Apply the [standards contract](standards.md). Include the approved applicable general and language standards snapshot and any material exceptions in the scoped baseline. An upgrade or change to installed skills is not itself an approved baseline change. Retrieve the exact accepted version or record an authorized compatibility decision. A material or unknown difference holds affected work. Record exact checked inputs and evidence for required standards checks; do not allow an execution worker to approve a new profile.

For affected UI use the [experience contract](experience-contract.md). Include relevant approved UX decisions, visual rules and actual component/token contracts with applicable approved story/visual references. If the visual foundation is established after initial specification approval, approve the scoped addition before dependent production work. Do not invalidate unrelated approvals simply because another story or theme changed. A material shared rule/contract change requires coordinated impact review and reapproval. An agent cannot approve its own snapshot updates.

## 2. Validate at dispatch, resume, candidate review and merge

1. Fetch the exact approved content and current authoritative records. Verify repository identity, trusted approval, digests, dependencies, accessible artifact revisions and effective policy from the trusted base. Confirm no material hold exists. Use current scope and actual candidate base.
2. Compare relevant IDs, locators, shared invariants, interface changes, indirect dependencies, moved sections and superseded ADRs. Inspect actual diffs. Do not rely on a path or hash comparison to establish semantic compatibility. Do not invalidate unrelated work just because the repository head changed.
3. Run structural and semantic checks from the [consistency contract](consistency.md). Classify each relevant change as unrelated, editorial, compatible implementation progress, material change/conflict, or unknown. Record exact checked inputs and evidence.
4. Unchanged referenced content can retain approval. For editorial changes or compatible changes to referenced repository records, retain the prior approval only when the trusted mechanism records an authorized compatibility attestation binding the old and current snapshots. A worker cannot grant that attestation. Use human review when required or when no trusted compatibility rule exists. A changed approved issue/epic payload or dependency outside excluded metadata requires reapproval. Material or unknown relevant effect blocks affected dispatch and merge until resolved.
5. For a material conflict or changed commitment, invalidate affected approvals through the trusted mechanism, hold affected work, return to the responsible gate, obtain exact new approvals and revalidate. Do not reset execution budgets merely because a baseline changed. Only an authorized new execution grant can adjust limits.
6. At merge, verify the approved issue/epic/dependency payloads, current policy and scoped baseline, exact PR head and tested base/merge candidate, required evidence and current human authorization where applicable. Any change that could invalidate evidence or approval requires rechecking. If the tooling cannot establish validity, stop unattended integration. Manual supervision is not permission to ignore a material conflict or required evidence.

## 3. Maintain the baseline

Use the canonical owner for a change. Coordinate repository and tracker updates with a trusted hold because they are not atomic together. Preserve stable IDs and historical links. For moves from `docs/discovery/`, propose a migration mapping. For an existing V3 project without `SPEC.md`, inventory its approved behavioral contracts first. Create or extend a specification by explicit approval when needed. Do not retroactively label unapproved behavior as normative or fabricate references for old tickets. An approved equivalent may support supervised legacy work if the human and policy permit it. Do not silently migrate an existing project.

Evidence and review records are tied to the actual verified inputs. Keep product status (target vs implemented), verification evidence, and authorization distinct. Use `maintain-documentation` for descriptive changes and affected approvals, and `maintain-formal-verification` for changed property coverage. No agent can self-approve a changed baseline.
