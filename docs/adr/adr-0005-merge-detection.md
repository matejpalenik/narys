---
title: "ADR-0005: Merge detection in the self-hosted pilot"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0005: Merge detection in the self-hosted pilot

## Status

**Accepted** on November 27, 2026. The product owner chose to use a GitHub webhook from the start of the pilot.

## Context

V1 shows supported architecture changes as qualifying PRs merge. The pilot tracks one repository area and runs in the team's environment. It needs to pick up changes while the canvas is closed and recover after downtime. Compare the delay from merge to detection, the network setup, GitHub API usage, and how each approach can recover missed updates. The time to analyze and publish a detected merge is a separate part of freshness. [V1 requirements](../requirements/product.md#6-domain-and-rules) · [Pilot operating model](adr-0001-pilot-operating-model.md)

GitHub recommends webhooks over polling. A webhook needs a receiving endpoint that GitHub can reach. GitHub leaves recovery of failed deliveries to the consumer. GitHub's pull request API supports branch-filtered, conditional reads. Pull request details distinguish the integrated revision from the test merge commit for an open PR. [GitHub REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api) · [Creating webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks) · [Failed webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries) · [Pull request API](https://docs.github.com/en/rest/pulls/pulls)

## Decision

Use a GitHub pull request webhook as the primary merge trigger. The pilot team provides a webhook endpoint that GitHub can reach over HTTPS. Narys validates the signature and checks the configured repository and target branch. A merged PR creates a durable work record before acknowledgement. Evidence retrieval and model analysis run outside the delivery request. Narys checks the authoritative PR record and uses its integrated revision as the evidence reference. [Webhook best practices](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks) · [Validating webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)

Use GitHub API reconciliation to recover missed merges after interruptions. Replayed deliveries and recovery both resolve to the same work record for the same merge. Recovery cadence, access credentials, and freshness targets remain open design choices.

## Consequences

### Positive

- **POS-001** The service can begin processing on delivery while the workspace is closed. Normal detection does not add a polling interval before analysis.
- **POS-002** Normal processing and recovery use the same merge records. A delayed or replayed notification can resume work already recorded for that merge.

### Negative

- **NEG-001** The pilot team configures reachable HTTPS ingress and manages the webhook secret. The initial deployment design exposes a dedicated webhook route and keeps access to the interactive workspace under the team's control.
- **NEG-002** The service needs durable acceptance, replay handling, and catch-up when delivery fails. Publication still depends on retrieval of evidence and analysis after the webhook arrives.

## Alternatives Considered

### Detect merges through scheduled GitHub API checks

- **ALT-001** An outbound check would simplify private-network setup and use one path for routine detection and recovery. A merge could wait until the next successful check. The product owner chose to receive the merge signal directly.

## Implementation Notes

- **IMP-001** Verify signed deliveries, rejection of invalid signatures and out-of-scope events, and acknowledgement before slow analysis. Replay a delivery after acknowledgement and restart the service with durable work pending.
- **IMP-002** Recover several merges from a period of downtime and verify that late deliveries converge with reconciliation. Cover squash, rebase, merge commits, and closed unmerged PRs. Measure webhook receipt and map publication separately.

## References

- **REF-001** [V1 requirements, REQ-001](../requirements/product.md#6-domain-and-rules)
- **REF-002** [Runtime, deployment, and recovery](../../ARCHITECTURE.md#6-runtime-deployment-and-recovery)
- **REF-003** [Confirmed map ownership](adr-0004-confirmed-map-ownership.md)
