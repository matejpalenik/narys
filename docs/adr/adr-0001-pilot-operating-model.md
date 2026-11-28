---
title: "ADR-0001: V1 pilot operating model"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0001: V1 pilot operating model

## Status

**Accepted** on November 27, 2026. The product owner chose self-hosting with Docker Compose for the pilot in the architecture conversation.

## Context

V1 helps engineers understand architectural changes as in-scope agent-led pull requests merge. An engineer may return to the workspace after several merges. Processing independently of the browser would let Narys prepare changes while the workspace is closed. The approved scope covers one selected area of one GitHub repository per pilot. Freshness, repository access boundaries, onboarding effort, and recovery after downtime drive the operating decision.

GitHub exposes pull request records for identifying merged revisions. Its guidance favors webhooks for routine change signals, and failed webhooks need consumer-managed recovery. Either continuously available option needs to recover missed changes. The application can be responsible for recovery regardless of who deploys it. [Pull request API](https://docs.github.com/en/rest/pulls/pulls) · [REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api) · [Failed webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries)

## Decision

The pilot team self-hosts Narys with Docker Compose in its own environment. The initial deployment design assumes one host running continuously, with persistent workspace state. The team owns access, credentials, availability, and recovery for its installation. Docker documents a single-server deployment path for Compose. Storage technology, GitHub authentication, update mechanism, and permission to send repository data to a model provider remain separate design decisions. [Docker Compose deployment](https://docs.docker.com/compose/how-tos/production/) · [ADR-0002](adr-0002-repository-data-boundary.md)

## Consequences

### Positive

- **POS-001** The pilot team chooses where to run the service and controls credentials and persisted workspace data.
- **POS-002** A running instance can prepare changes while the workspace is closed, including when a maintainer returns after several merges.

### Negative

- **NEG-001** The pilot team supplies a host and handles updates, backup, restore, and outages. Keeping the workspace current depends on the availability of that host and its GitHub connection.
- **NEG-002** A GitHub webhook would require an endpoint reachable by GitHub. A pilot behind a private network may prefer outbound reconciliation if its measured delay is acceptable. [Creating GitHub webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks) · [Pull request API](https://docs.github.com/en/rest/pulls/pulls)

## Alternatives Considered

### Narys operates a hosted service

- **ALT-001** Narys operates the service and the team connects its repository. This saves the team installation effort and gives Narys direct responsibility for hosting, credentials, and recovery. The product owner chose to begin with infrastructure controlled by the pilot team.

### Refresh when the workspace opens

- **ALT-002** A local or on-demand tool fetches changes when the engineer opens the workspace. It is useful for testing whether the map can be derived from source. During downtime between sessions the experience becomes catch-up on open, so an engineer who returns after a merge may have to wait for an update.

## Implementation Notes

- **IMP-001** Keep durable state across container replacement. Verify installation, update, backup, and restoration on the deployment host. Docker volumes are one candidate for host-managed persistence. [Docker volumes](https://docs.docker.com/engine/storage/volumes/)
- **IMP-002** Measure time from merge to a usable map update in a real pilot. Replay duplicate, delayed, and missed updates. Confirm that deployment status requires its own evidence.

## References

- **REF-001** [Approved V1 requirements, REQ-001 through REQ-004](../requirements/product.md#6-domain-and-rules)
- **REF-002** [Approved V1 experience, UX-001 through UX-005](../../EXPERIENCE.md)
- **REF-003** [Runtime, deployment, and recovery](../../ARCHITECTURE.md#6-runtime-deployment-and-recovery)
