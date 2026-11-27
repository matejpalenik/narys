# Traceability contract

## Intent

Make each consequential commitment traceable to its source, its allocated delivery work, and its verification. Generate reverse relationships from references. Do not maintain a second manual traceability matrix, graph database, or duplicate backlog.

## Identifiers and canonical definitions

| Kind | Default identifier | Canonical location |
|---|---|---|
| Business requirement | `REQ-014` | `docs/requirements/` |
| Normative behavior | `SPEC-021` | `SPEC.md` or linked `docs/specifications/` |
| Experience decision or journey (when applicable) | `UX-001` | `EXPERIENCE.md` or its linked canonical section |
| Consequential visual rule (when applicable) | `DS-001` | `DESIGN.md` or its linked canonical section |
| Conformance case | `CONF-008` | Applicable specification conformance table |
| Architecture decision | `ADR-0004` | `docs/adr/adr-0004-*.md` |
| Formal property | `PROP-001` | Specification-linked property record and manifest |
| Delivery work | Repository-qualified issue number | Tracker parent or child issue |
| Acceptance case | `AC-01` | Local to a parent/child issue; qualify by issue identity |

Keep existing valid IDs (including `BR-*` if already used for business requirements). Use repository-global unique IDs per kind for new canonical definitions, not per-file numbering. Do not renumber or recycle retired IDs. Preserve IDs on moves, record a replacement when splitting or retiring a commitment, and do not silently change its meaning. A stable ID identifies a commitment across revisions, not immutable wording. Keep approval tied to content snapshots. Avoid adding IDs to incidental prose or implementation internals.

New Markdown records use an ID as the first cell of the canonical table row or at the start of a heading, for example `### SPEC-021 — Retry safety`. Other occurrences are references, not new definitions. For new specification entries use `Sources: REQ-014` and `Verification: CONF-008` (or equivalent named table columns). The conformance table references the relevant specification IDs. Architecture driver/quality/interface tables reference relevant specification and requirement IDs and accepted ADRs. For machine-readable schemas, use exact file/fragment references, not a copied schema. For legacy formats, map existing identifiers and canonical locators explicitly. Document the extractor's supported formats before claiming automated validation.

## Required relationships

| Record | References |
|---|---|
| Specification obligation | Business requirement or approved source/derived constraint, and applicable conformance cases |
| Architecture mechanism / ADR | Applicable behavior guarantees, requirements or approved constraints, owning boundary and applicable material standards exceptions |
| Epic | Included specification IDs, applicable business objective, architecture/ADR references, integrated acceptance |
| Issue | Parent or approved direct scope, allocated specification IDs, applicable CONF/PROP IDs, architecture/ADR and program design, real dependencies |
| Verification result | Requirement or conformance case, exact observed check, candidate/base and applicable property/model evidence |
| Formal manifest | Canonical specification guarantee and relevant source requirements, checked inputs and coverage |

Some design constraints arise from standards, dependencies or risk rather than a user feature. Link the approved source and rationale. Do not create fictitious business requirements to make a graph connected. Distinguish one-to-many allocation from complete satisfaction. A single issue can partially realize a system obligation; state the covered condition and remaining approved work. A conformance case may cover more than one obligation, but its assertions must substantiate each claim. An issue-level `AC` tests its increment and does not redefine the normative guarantee.

## Scope and coverage

At baseline approval, account for mandatory release obligations and planned conformance cases. At epic approval, show allocation of the included obligations, shared invariants, release dependencies and intentional deferrals. At ticket approval, check the selected batch and its boundaries. Do not require tickets for every future capability. At release acceptance, each mandatory in-scope obligation has observed evidence at the integrated candidate. Mark planned, partial, verified, failed, blocked, or intentionally excluded where useful. An unexecuted planned test is not verified coverage.

Validate forward coverage and backward justification: orphan references, duplicate canonical definitions, missing sources, unallocated in-scope mandatory commitments at release planning, uncovered mandatory conformance cases, and unauthorized delivery work. Examine indirect and shared constraints. A referenced ID is not evidence that the guarantee is satisfied. See [consistency](consistency.md) and [baseline](baseline.md).

## Minimal representation

Keep references in the existing artifacts. Use exact immutable links for reviewed content. A trusted approval record binds document locations, revisions and content digests, including tracker bodies and dependencies. Derive a temporary coverage table from those references when reviewing an epic or a change. Do not persist a second source of truth. If the repository lacks an extractor, review scoped references manually in supervised mode. Automated integration requires independently enforced structural validation. Do not claim a validator exists because this contract defines it.

For UI work, apply the [experience contract](experience-contract.md). Reference REQ from UX decisions and UX from relevant SPEC obligations; refer approved behavior back to its canonical SPEC rather than duplicating it. Epic/issue refs include applicable UX/DS IDs and immutable component, token and story locators. Verification maps stories and integrated user tasks to applicable AC/CONF cases; visual review references approved DS rules and exact visual evidence. IDs apply only to consequential commitments; do not invent IDs for every primitive or style. Derive coverage from these relationships.
