---
title: "ADR-0020: Establish source support with bounded code checks"
status: "Accepted"
date: "2026-11-28"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision", "evidence"]
supersedes: ""
superseded_by: ""
---

# ADR-0020: Establish source support with bounded code checks

## Status

**Accepted.** The product owner chose a small set of abstract syntax tree (AST) checks, to be evaluated against Flask and real Narys merges. Claims outside the checks' coverage stay unconfirmed. The reviewed proposal had SHA-256 `148a55a01466497cfa3dc7470026e2426a8844f08dfa406db5938daf33e63bdb`.

## Context

Narys uses a model to propose architectural observations. ADR-0008 establishes that source correspondence determines the confidence label. A valid file link alone leaves correspondence open. Flask #4692 supplies a known delegation and provider binding. Its default serializer is also visible in source. The Narys pilot supplies a TypeScript repository for the same workflow. Compare reproducibility, source coverage, and maintenance effort. [Source correspondence](adr-0008-map-update-evidence.md) · [Flask reference case](../research/2026-11-27-flask-merge-reference-case.md#source-correspondence-check)

## Decision

Use the existing worker for candidate extraction and repeatable source checks. The configured model may suggest a claim and the files, symbols, and relationships to inspect. The worker uses prewritten checks on the syntax trees of the pinned source. The first slice checks explicit calls, declarations, and configuration bindings that it can follow to their definitions. It can inspect related files outside the starting path. [Evidence rules](../../SPEC.md#evidence-for-a-change-claim) · [Application runtime](adr-0010-v1-application-runtime.md)

Use **Supported by source** when the check establishes the narrow claim and identifies its decisive source. A claim about a change requires evidence from both sides. Return **Unconfirmed** when the relevant evidence, binding, or check is incomplete. Show **Possible divergence** when the checked code conflicts with a concrete statement about the change. Record the author's performance motivation separately as rationale. [Evidence publication](adr-0019-revision-bound-evidence.md) · [SPEC-008](../../SPEC.md#3-observable-behavior)

## Consequences

- **POS-001** A repeated check on the same code and claim has a defined expected result. The label's scope is easier to explain and test.
- **NEG-001** Early coverage is narrower. Dynamic dispatch and implicit wiring may remain unconfirmed, and supported patterns require language-specific checks.

## Alternatives Considered

- **ALT-001** Let a separate model pass establish source support from the pinned excerpts. This can cover more patterns early. Its reliability depends on model judgment and on whether the supplied excerpts include the decisive context.

## Implementation Notes

- **IMP-001** Evaluate parser coverage and packaging within the TypeScript worker during program design. Tree-sitter has Node.js bindings and Python and TypeScript parsers. A parser supplies code structure. Scope and binding checks must establish the actual claim. [Tree-sitter bindings and parsers](https://tree-sitter.github.io/tree-sitter/)
- **IMP-002** Reproduce Flask's delegation across files and the conflicting synthetic `orjson` claim. Include an unresolved binding and a dependency change when the caller's file is untouched. Reuse the same check categories on qualifying live Narys merges. Record which claims the checks establish and which remain unconfirmed so the team can assess coverage before extending it. [CONF-005](../../SPEC.md#4-conformance-cases) · [Flask expected findings](../research/2026-11-27-flask-merge-reference-case.md#4-findings-and-expected-canvas)
