---
title: "ADR-0013: Sign-in and permissions for the pilot workspace"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0013: Sign-in and permissions for the pilot workspace

## Status

**Accepted** on November 27, 2026. The product owner chose Better Auth, GitHub sign-in with read-only email access, and viewer and maintainer roles. The Narys pilot also needs a public read-only map. Its publication boundary is tracked in [ADR-0017](adr-0017-workspace-publication.md).

Under [ADR-0018](adr-0018-automated-map-publication.md), the maintainer manages workspace setup and the worker publishes map revisions automatically. The original map correction and confirmation actions below are superseded for V1.

## Context

Engineers inspect the map and source evidence. A maintainer can also correct and confirm the starting map. A pilot can contain private repository material and receives GitHub webhooks at a reachable endpoint. The workspace needs explicit access decisions for browsing and confirmation, with a separate identity from background GitHub ingestion. Compare operator setup, reliance on another service, and how permissions are granted and removed. [V1 experience](../../EXPERIENCE.md) · [Repository access](adr-0012-github-repository-access.md)

GitHub Apps support browser authorization on the same registration that provides installation credentials. GitHub provides an API to check which repositories the user can access for an installation. Next.js recommends enforcing authorization where protected data is accessed. [GitHub App user authorization](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app) · [User repository access](https://docs.github.com/en/rest/apps/installations#list-repositories-accessible-to-the-user-access-token) · [Next.js authorization](https://nextjs.org/docs/app/guides/authentication#authorization)

## Decision

Use Better Auth for GitHub sign-in and sessions in the Next.js web process. Store account and session tables in the existing SQLite database. Grant the team-owned GitHub App read-only Email addresses account permission for the built-in GitHub provider. Rehearse the flow with a GitHub account with a private email address. [Next.js integration](https://better-auth.com/docs/integrations/next) · [SQLite support](https://better-auth.com/docs/adapters/sqlite) · [GitHub provider](https://better-auth.com/docs/authentication/github#setting-up-your-github-app)

At sign-in, verify the GitHub account and its access to the pilot repository. The operator assigns eligible GitHub accounts one of two Narys roles. Viewers can inspect the map, changes, and evidence. Maintainers can also set up, correct, and confirm the map. Narys evaluates the current role at the server for protected reads and actions and records who confirmed each revision.

Use an expiring workspace session. Use the GitHub user token for sign-in and repository eligibility, and use the installation token for unattended ingestion. Configure the browser authorization callback separately from the webhook receiver. Define session expiry, revocation, and access-loss handling in the specification. [OAuth security guidance](https://www.rfc-editor.org/rfc/rfc9700.html)

## Consequences

### Positive

- **POS-001** A pilot team can use its existing GitHub accounts and the already required GitHub App registration.
- **POS-002** The operator can limit workspace access to the team and assign map confirmation explicitly. Background processing continues independently of browser sessions.

### Negative

- **NEG-001** The operator configures a browser callback and client credentials in addition to the webhook configuration.
- **NEG-002** GitHub availability affects sign-in and repository eligibility checks. The pilot needs a clear way to remove a person's workspace access.

## Alternatives Considered

### Accept identity from the team's trusted sign-in proxy

- **ALT-001** An existing proxy can use the team's identity provider. Narys would still need a trusted identity and local authorization rules. Teams without such infrastructure would need to configure and operate it for the pilot.

## Implementation Notes

- **IMP-001** Exercise an eligible viewer, an eligible maintainer, and a GitHub user without workspace access. Check evidence reads and map confirmation at the app boundary. Verify that removing a local role affects subsequent protected requests in an existing session.
- **IMP-002** Verify the GitHub App browser callback, repository eligibility check, and private email case. Check the chosen behavior for provider token retention, session expiry, and offboarding. Keep GitHub user credentials, installation credentials, and signed webhook requests in their respective flows. [Better Auth account options](https://better-auth.com/docs/reference/options#account)

## References

- **REF-001** [Workspace journeys](../../EXPERIENCE.md#5-user-journeys)
- **REF-002** [Material interfaces](../../ARCHITECTURE.md#5-domain-and-data-architecture)
