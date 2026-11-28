---
title: "V1 merge coverage"
status: approved
scope: release
baseline: product.md
approval:
  date: 2026-11-27
  reviewed_decision_sha256: fe945878bc3f75ad8c062e0cf5eefe723f952b615df1f0b42fcc14915c30a029
  source: "Product owner selected coverage for both human and agent work in the V1 architecture conversation"
---

# V1 merge coverage

## Approved decision

```text
All architecture-changing merges in the selected area
Keeps the map current across human and agent work. Known agent-led PRs remain the focus of pilot evaluation.
```

## Effect on the V1 requirements

This decision extends REQ-001 and the D08 release boundary to architecture-changing PRs authored by people or agents. The pilot tracks one selected area of one GitHub repository. REQ-002 and REQ-003 apply to these changes. Use known agent-led changes to evaluate the product objective. The original approval applies to the rest of the discovery record. [V1 discovery](product.md#8-release-scope)

## Release acceptance example

A person renames a component and an agent later moves a responsibility out of it. Both merged changes appear in the selected area's recent changes. The current map uses the new component name and shows the responsibility change with its evidence. Check a standalone behavior change as the existing scope control. Use the approved canvas and evidence inspection journey. [Experience](../../EXPERIENCE.md#5-user-journeys) · [ADR-0006](../adr/adr-0006-merge-coverage.md)

The approval digest covers the two lines in the approved decision block, encoded as UTF-8 with LF line endings and a final newline. The product owner selected this option in the architecture discussion.
