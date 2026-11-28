---
title: "ADR-0009: Identify the revisions for a merged pull request"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0009: Identify the revisions for a merged pull request

## Status

**Accepted** on November 27, 2026. The product owner chose to use both pull request and branch-update events on the same webhook endpoint for V1.

## Context

Narys uses a pull request webhook to start analysis. Its source correspondence check needs the target branch just before and just after the PR landed. GitHub supplies the integrated revision in the merged PR record. For a rebase, that value identifies the final commit even when several commits were applied. A signed `push` delivery can report the branch revisions before and after a branch update. A branch update can contain several integrations. GitHub can also mark a PR merged when its commits reached the branch through another route. [ADR-0005](adr-0005-merge-detection.md) · [ADR-0008](adr-0008-map-update-evidence.md) · [Pull request API](https://docs.github.com/en/rest/pulls/pulls#get-a-pull-request) · [Push event](https://docs.github.com/en/webhooks/webhook-events-and-payloads#push) · [Merge methods](https://docs.github.com/en/pull-requests/reference/pull-request-merges)

A disposable local Git exercise compared branch transitions for a merge commit, a squash, and a two-commit rebase. The recorded transition found both changes in each case. The final commit and its parent found only the second change after the rebase. Using the earlier PR base included an unrelated CLI change. Using the latest branch state included the next integration. This exercise checked Git history. GitHub delivery and API attribution still need a rehearsal.

## Decision

Accept target-branch `push` events through the same signed GitHub webhook endpoint as pull request events. Use the branch-update delivery as additional evidence and keep the pull request event as the analysis trigger. Record branch transitions and merge facts independently of delivery order. Use a transition as a PR's comparison pair when the repository, target branch, integrated revision, and evidence about the commits in the transition support a single-PR attribution. A matching final revision alone can still represent a batch.

During recovery, use repository history and GitHub's PR-to-commit associations where they resolve the comparison. Use first-parent history for a supported single integration boundary. If evidence establishes a map change across known branch revisions but the PR attribution remains uncertain, show the supported change with its revision evidence and mark the attribution as unconfirmed. [Commit associations](https://docs.github.com/en/rest/commits/commits#list-pull-requests-associated-with-a-commit)

## Consequences

### Positive

- **POS-001** Observed branch transitions can anchor a full comparison across multi-commit integrations.
- **POS-002** The map can reflect supported source changes even when several PRs share a branch update.

### Negative

- **NEG-001** A second event type adds filtering, durable correlation, and recovery cases. GitHub sends branch events for activities in addition to PR merges.
- **NEG-002** Missing, batched, or indirect integrations can still leave per-PR attribution unresolved. Attribution needs its own evidence state.

## Alternatives Considered

### Use pull request webhooks and reconstruct boundaries through the API

- **ALT-001** This would simplify the webhook subscription. Narys would depend on commit history and associations to locate the pre-merge revision for every PR. Where those records leave ambiguity, the map can still show a source change with unconfirmed attribution.

## Implementation Notes

- **IMP-001** Capture and replay GitHub deliveries for a merge commit, squash, multi-commit rebase, and two adjacent merges. Check reversed delivery order, duplicates, and recovery with the push event missing.
- **IMP-002** Test a transition containing two integrations. Check that a valid branch comparison remains usable and that it does not assign the whole change to the last PR.

## References

- **REF-001** [Git revisions and first-parent semantics](https://git-scm.com/docs/gitrevisions)
- **REF-002** [Flask reference case](../research/2026-11-27-flask-merge-reference-case.md#3-authoritative-guidance)
- **REF-003** [Runtime, deployment, and recovery](../../ARCHITECTURE.md#6-runtime-deployment-and-recovery)
