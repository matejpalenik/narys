---
title: "Automated V1 architecture map"
status: approved
scope: release
baseline: product.md
approval:
  date: 2026-11-27
  source: "The product owner directed that the workspace be fully automated and approved evidence labels based on automated source analysis."
---

# Automated V1 architecture map

## Approved scope change

This decision replaces the manual confirmation step in REQ-004 and D07. A maintainer supplies the workspace setup, including the repository and area. Narys generates the starting map and publishes evidence-backed observations automatically. It applies the same evidence rules to later merges. For claims whose evidence is incomplete, it shows uncertainty at the affected revision. [V1 discovery](product.md#6-domain-and-rules) · [Automated map decision](../adr/adr-0018-automated-map-publication.md)

An engineer can inspect the code that supports a claim. Use **Supported by source** for a claim established by the automated check at an identified revision and **Unconfirmed** when the check leaves a material gap. Continue to show the source when it conflicts with a stated change. The labels apply to individual claims. Deployment continues to use its own evidence under REQ-003. [Source correspondence decision](../adr/adr-0008-map-update-evidence.md)

## Release acceptance

Configure one area, close the workspace, and return after the analysis worker has produced the first map. The canvas is available with its revision and evidence. Replay a later qualifying merge. The map updates under the same rules and keeps the earlier revision available. For #128, the worker retry path appears with source support while Checkout's current retry behavior remains unconfirmed. The whole sequence runs after setup without a maintainer reviewing the map. [Automated setup experience](../../EXPERIENCE.md#14-automated-map-setup)

## Deferred scope

The product owner deferred in-app map corrections for V1 on November 27, 2026. Engineers inspect the automatically published map and its evidence. Pilot observations will inform whether to add a correction workflow.
