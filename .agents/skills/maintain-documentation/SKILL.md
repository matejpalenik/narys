---
name: maintain-documentation
description: >-
  Create, review or update technical documentation and detect drift between approved requirements, specification, architecture, decisions, code and observed behaviour. Use Diátaxis for reader-facing documentation, ASD-STE100 controlled-language guidance, concise examples and appropriate diagrams. Preserve authoritative records and request approval before semantic changes.
---

# Documentation maintenance

## Intent

Keep each document accurate for its purpose. Make the project understandable to a new engineer and to an agent with no prior conversation. Preserve approved intent. Do not change a requirement to match a defect.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md) and [documentation formats](references/documentation-formats.md). Read the applicable requirements, specification, architecture, ADRs, issue, code, tests and repository conventions. Use the existing documentation toolchain. Do not reorganize an entire repository to fix one page.

Use the [standards contract](../software-factory/references/standards.md) to verify that described project conventions and adopted standards references match actual approved configuration. Do not copy the whole standards library into project docs or silently upgrade the adopted snapshot. Record material changes for approval; fix descriptive errors without changing the approved rules.

For affected UI, apply the [experience contract](../software-factory/references/experience-contract.md). Compare approved EXPERIENCE.md and DESIGN.md with actual interaction behavior, tokens, component APIs and rendered stories. Correct descriptive errors within authorization; report a defect if implementation violates an approved UX, design or SPEC obligation. Do not replace design rules with current defective visuals. Route material UX/visual changes to their owner for human approval, coordinate affected issue holds and verification baseline updates, and preserve canonical ownership. Do not copy token values or component API tables into Markdown.

## Methodology

### 1. Establish purpose and authority

Identify the reader, task and affected scope. Classify reader-facing content using Diátaxis. For requirements, specification, architecture, ADRs, research, verification and issues, use their dedicated formats. Find the authoritative record for each claim. Distinguish approved target behaviour, implemented behaviour and observations at a specific revision.

For a new repository, propose the minimal documentation layout and create only necessary pages. For an existing repository, preserve its conventions unless the human approves migration. If `docs/discovery/` exists, propose migration to `docs/requirements/`: inventory files, links, issue references, published URLs and approval snapshots. Move rather than copy current requirements, repair references, preserve history and stable IDs, and record a mapping for immutable historical links. Do not move or overwrite without approval. Never rewrite historical approved issue bodies or accepted ADR rationale silently.

### 2. Detect and classify drift

For a change, compare the approved baseline, actual base and candidate diff. Read affected documents, code and tests. Include API, configuration, CLI, schema, runtime behaviour and operational procedures as applicable. Use direct observations when a claim depends on execution. For an audit, work from named documents or changed paths, not a complete speculative rewrite.

| Finding | Action |
|---|---|
| Stale descriptive text or example | Correct from code or verified evidence within scope |
| Target design not implemented | Mark planned or partial, preserve the target |
| Code conflicts with approved requirement | Report defect and block affected acceptance |
| Intent or architecture needs to change | Return to the applicable approval gate, supersede ADR if needed |
| Evidence insufficient | Mark unverified and identify the required check |
| Duplicate or broken reference | Keep canonical record and repair links without changing approved meaning |

Do not assume code is correct because it exists. Do not convert research hypotheses into requirements. Compare affected approvals using the [baseline contract](../software-factory/references/baseline.md). Identify dependent issues, interface consumers, conformance cases and verification properties through the [traceability contract](../software-factory/references/traceability.md). Report structural and semantic drift using the [consistency contract](../software-factory/references/consistency.md). Coordinate affected canonical updates and trusted holds with the human. Do not change tracker approval state or normative semantics without authority. For V3 projects, propose specification migration only when needed and approved; never retroactively invent normative decisions.

### 3. Write or revise

Use the shared writing standard and relevant page template. Apply the ASD-STE100 rules and dictionary where available. Use precise terms and short sentences. Start with the purpose, then necessary detail. Use tables for structured facts. Use Mermaid for a process, state, interaction or structural relationship where useful. Add a small runnable or clearly illustrative example when it explains a mechanism. Do not add generic sections or duplicate technical detail solely for uniformity.

Link requirements, specification, architecture and ADRs using stable identifiers. Keep descriptive pages in step with behaviour. Update documentation affected by an approved code change within the same issue and PR when possible. If the change requires different approved intent, stop and request authorization before editing. For broader out-of-scope improvements, report the gap instead of expanding the issue.

### 4. Verify and hand off

Check internal links and anchors, term consistency, source locators, code examples, diagram syntax and current-state claims. Run the project's documentation, link and example checks where available. Inspect the resulting diff for semantic changes. Check the standard and dictionary or approved STE checker if accessible, and record the scope of language review. Do not claim compliance without evidence. Keep only necessary documents. Return affected requirement IDs, ADRs, issues, evidence and proposed approval actions to the caller.

## Response contract

Start with **Status**. Show a compact table of document, drift type, evidence and action. Show only significant revised passages or diagrams for human review. Link the files and list missing checks, affected approvals and decisions required. If no update is necessary, record why. Do not paste the full documentation set.

## Completion criteria

The affected documents are correct for their declared purpose and revision, consistent with authoritative records, and clear to the intended reader. Changes are within the authorized scope. Contradictions and unchecked claims remain visible. Material changes to requirements, accepted decisions or issue specifications require renewed approval. Verification reports record checks that ran and checks that did not run.
