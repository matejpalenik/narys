---
title: "Workspace publication and the public Narys demo"
status: approved
scope: release
baseline: product.md
approval:
  date: 2026-11-27
  reviewed_decision_sha256: 0ce316760fd11a42fc4ed457204595556a479627051496033186b2c15037a8b9
  source: "The product owner made the Narys repository public, selected Apache 2.0, and asked to launch as soon as possible."
publication_approval:
  date: 2026-11-27
  reviewed_proposal_sha256: 737eaf960fd020479b5e0b02139baa21f172c938ea0beb5fe95d68c1dab20616
  source: "The product owner approved opt-in publication as a standard V1 setting for workspaces backed by public GitHub repositories."
---

# Workspace publication and the public Narys demo

## Confirmed intent

On November 27, 2026, the product owner asked for the Narys project's map to be public so visitors can explore the product. The Narys dogfood pilot will use the workspace publication setting for its public launch. The public release uses the existing canvas. [V1 discovery](product.md) · [Workspace access decision](../adr/adr-0013-workspace-access.md)

## Approved release choice

```text
Live demo at the open-source release
The real Narys map and changes as they land.
```

The approval digest covers the two lines in the decision block, encoded as UTF-8 with LF line endings and a final newline. The product owner selected this release approach by making the repository public and asking to launch promptly. The first public product release should include the working walkthrough of Narys. [Public demo decision](../adr/adr-0014-public-narys-demo.md)

## Approved publication scope

Workspace publication is a standard V1 setting. Workspaces start private. The operator can publish a read-only view of the selected area when the connected GitHub repository is public. The public view includes eligible map, merge, and evidence records. Each workspace keeps its signed-in viewer and maintainer permissions. The new approval covers the publication proposal reviewed before acceptance. [Workspace publication decision](../adr/adr-0017-workspace-publication.md)

## Release outcome

| ID | Business requirement | Source and rationale | Observable success condition |
|---|---|---|---|
| REQ-005 | An operator can explicitly publish a workspace backed by a public GitHub repository so visitors can explore its selected area without signing in. | The owner wants teams to share a live map using the same V1 product as the Narys showcase. | A workspace backed by a public repository starts private. After the operator publishes it, a new visitor can inspect its map and recent merges, compare revisions, and open the available public evidence. The Narys release uses this same flow. Workspace configuration requires authorized access. The map updates automatically under [REQ-004](v1-automated-map.md). |

The guest walkthrough reuses the approved canvas and merge inspection journeys (UX-001, UX-003, and UX-005). UX-006 describes how visitors enter that workspace. [V1 experience](../../EXPERIENCE.md#12-published-workspace-entry)
