---
title: "ADR-0017: Opt-in public access to a workspace"
status: "Accepted"
date: "2026-11-27"
authors: "Narys product owner and architecture design"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0017: Opt-in public access to a workspace

## Status

**Accepted.** On November 27, 2026, the product owner selected opt-in publication as a standard V1 setting for workspaces backed by public GitHub repositories. The reviewed proposal had SHA-256 `737eaf960fd020479b5e0b02139baa21f172c938ea0beb5fe95d68c1dab20616`. [Approved scope](../requirements/v1-public-narys-demo.md#approved-publication-scope)

The public view uses the revisions published automatically by [ADR-0018](adr-0018-automated-map-publication.md). Workspace configuration uses authenticated access.

On November 28, 2026, the product owner approved pausing anonymous access when Narys cannot reverify that the repository is public. The specification records the approved verification and withdrawal bounds. [Access timing](../../SPEC.md#5-access-timing)

## Context

The product owner wants the public Narys showcase to use the same product behavior available to other teams. The approved release outcome lets anyone inspect a live Narys map. Existing workspace access uses GitHub sign-in and explicit viewer and maintainer roles. [Public launch requirement](../requirements/v1-public-narys-demo.md) · [Workspace roles](adr-0013-workspace-access.md) · [Public launch decision](adr-0014-public-narys-demo.md)

## Decision

Use one workspace visibility setting for V1. Workspaces start private. Public access requires the instance operator to publish the workspace and the connected GitHub repository to be public. The Narys launch uses this setting on its own workspace.

Anonymous visitors use the usual canvas, recent merges, revision comparisons, and eligible public evidence. Maintainers sign in with GitHub to change the map. A viewer assigned to a private workspace signs in to read it. The application checks each page and data request and only returns records the requester can access. For example, it can publish a source-backed change while keeping rationale from a private issue accessible only to authorized users. [Guest experience](../../EXPERIENCE.md#12-published-workspace-entry) · [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

## Consequences

- **POS-001** Any eligible team can share its own map with a link using the same product. A visitor can use the live canvas immediately.
- **NEG-001** The application needs a publication check on server responses. A public source repository can still be associated with private records. Withdrawal and cached responses need verification.

## Alternatives Considered

- **ALT-001** Publish credentials for a shared viewer account. Anyone with the link to the credentials can read as the same account. Visitors must copy credentials and sign in. Narys would also take on account setup, credential rotation, and a password sign-in path alongside GitHub. [Better Auth GitHub provider](https://better-auth.com/docs/authentication/github) · [Better Auth password sign-in](https://better-auth.com/docs/authentication/email-password)

## Implementation Notes

- **IMP-001** Check a public-source workspace left private, the same workspace deliberately published, and a private-source workspace. Exercise the same read paths and verify that signed-in roles still control private reads and all map changes.
- **IMP-002** Define the withdrawal behavior in the specification. Verify public responses when publication or upstream visibility changes.
