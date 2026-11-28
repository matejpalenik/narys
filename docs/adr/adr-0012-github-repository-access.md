---
title: "ADR-0012: GitHub repository access for self-hosted Narys"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0012: GitHub repository access for self-hosted Narys

## Status

**Accepted** on November 27, 2026. The product owner chose a team-owned GitHub App for the pilot connection to the Narys repository.

## Context

The pilot reads one selected GitHub repository and receives signed pull request and branch-update events on one HTTPS endpoint. The worker needs GitHub access when nobody is signed into Narys. Compare repository scope, credential ownership and expiry, setup effort, and operation after a person leaves the team. [Pilot operating model](adr-0001-pilot-operating-model.md) · [Merge trigger](adr-0005-merge-detection.md) · [Branch evidence](adr-0009-merged-revision-attribution.md)

A GitHub App registration can subscribe to both events at one webhook URL. Installation tokens can be limited to the approved repositories and permissions and expire after one hour. GitHub's fine-grained personal tokens can also be scoped to a repository and read permissions. They depend on the user's continued access. [GitHub App webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks#creating-webhooks-for-a-github-app) · [Installation tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app) · [Personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

## Decision

Use a private GitHub App owned by the team or repository owner and installed only on the pilot repository. Connect the Narys repository for the first dogfood pilot. Configure the GitHub App webhook directly to the team's Narys endpoint. Subscribe to `pull_request` for merge processing and `push` for branch revision evidence. The Narys server verifies the webhook signature and checks the installation, configured repository, and tracked branch. Its GitHub adapter uses short-lived installation tokens for background reads. Keep the app private key and webhook secret in the team's server environment. [GitHub App registration](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) · [Webhook signing](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)

Start from read permissions for Contents and Pull requests. Verify the permission for the actual linked issue and deployment reads before documenting the installation. Keep the repository integration separate from the identity and permissions of a person using the workspace. [Event permissions](https://docs.github.com/en/webhooks/webhook-events-and-payloads) · [GitHub App permissions](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app) · [Deployment status permissions](https://docs.github.com/en/rest/deployments/statuses#list-deployment-statuses)

## Consequences

### Positive

- **POS-001** The team owns the app registration, repo selection, and delivery URL. The integration can receive events and read evidence unattended.
- **POS-002** Short-lived installation tokens give the worker scoped access. The installation can be revoked in GitHub.

### Negative

- **NEG-001** Someone with the necessary GitHub access must register and install the app, supply reachable HTTPS ingress, and manage the private key and webhook secret.
- **NEG-002** Installation revocation or insufficient permissions can interrupt source analysis. Exercise observable recovery without advancing beyond established source evidence.

## Alternatives Considered

### Repository webhook and a fine-grained personal access token

- **ALT-001** Set up the same events on a repository webhook and use a scoped token to read GitHub. This avoids app registration and gives the operator two separate items to configure. Background access depends on the token's expiry and the token owner's repository access.

## Implementation Notes

- **IMP-001** Verify setup against a team-controlled repository. Exercise both signed event types, the required evidence reads, token renewal, key rotation, and recovery after an installation is removed and reconnected.
- **IMP-002** Confirm that the installation cannot write repository content or access a second private repository. Verify that app keys, webhook secrets, and installation tokens stay within the GitHub integration boundary.

## References

- **REF-001** [Material interfaces](../../ARCHITECTURE.md#5-domain-and-data-architecture)
- **REF-002** [Runtime and deployment](../../ARCHITECTURE.md#6-runtime-deployment-and-recovery)
