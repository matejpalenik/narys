# ADR format

Use the requested [Awesome Copilot ADR skill](https://github.com/github/awesome-copilot/blob/main/skills/create-architectural-decision-record/SKILL.md) structure. This is a project-selected community template, not a formal Microsoft architecture standard. Use `docs/adr/adr-NNNN-<slug>.md`. Keep one decision per file. Front matter and visible status must agree. Record authors or roles as actually known. Use unique coded items within each multi-item section. Proposed decisions stay proposed until human approval. When superseding, link both records and update status and supersession metadata, not the historical decision text.

```markdown
---
title: "ADR-NNNN: <Decision title>"
status: "Proposed"
date: "YYYY-MM-DD"
authors: "<stakeholders or roles>"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-NNNN: <Decision title>

## Status

**Proposed**

## Context

<Problem, requirements, technical constraints and relevant evidence.>

## Decision

<Selected option and rationale. Do not claim acceptance before approval.>

## Consequences

### Positive

- **POS-001**: <Benefit>

### Negative

- **NEG-001**: <Cost, limitation or risk>

## Alternatives Considered

### <Option>

- **ALT-001**: **Description**: <Approach>
- **ALT-002**: **Rejection Reason**: <Reason>

## Implementation Notes

- **IMP-001**: <Implementation or migration constraint>
- **IMP-002**: <Verification or operational obligation>

## References

- **REF-001**: <Link to requirement, source or related ADR>
```

Permitted statuses: Proposed, Accepted, Rejected, Superseded, Deprecated. Add entries only when applicable. If no meaningful alternative exists, explain the binding constraint. Do not invent an alternative or reviewer.
