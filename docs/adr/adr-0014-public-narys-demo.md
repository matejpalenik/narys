---
title: "ADR-0014: Public read-only access to the Narys demo"
status: "Accepted"
date: "2026-11-27"
authors: "Narys product owner and architecture design"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0014: Public read-only access to the Narys demo

## Status

**Accepted.** On November 27, 2026, the product owner made the repository public, selected Apache 2.0, and asked to launch promptly. [Approved release choice](../requirements/v1-public-narys-demo.md#approved-release-choice)

The first public product release uses the standard workspace publication setting accepted in [ADR-0017](adr-0017-workspace-publication.md).

## Context

The product owner wants visitors to explore the Narys map without signing in and has approved GitHub sign-in for workspace roles. The repository was private when the snapshot alternative was proposed. A new read-only GitHub metadata check on November 27, 2026 confirmed that the configured repository is public. The live demo still needs a boundary for the content available to visitors. [Public demo requirements](../requirements/v1-public-narys-demo.md) · [Workspace access](adr-0013-workspace-access.md) · [GitHub repository metadata](https://docs.github.com/en/rest/repos/repos#get-a-repository)

Next.js recommends keeping authorization close to the data and returning only the fields needed by the client. OWASP recommends checking each request and granting access explicitly. A signed-in read path and a public one can render the same canvas while receiving different data. [Next.js authorization](https://nextjs.org/docs/app/guides/authentication#authorization) · [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

## Decision

Launch the live, read-only Narys walkthrough with the first public product release. Enable anonymous access deliberately for the Narys demo workspace. Give visitors the published map, recent merges, revision comparisons, and available public source and rationale. Build guest responses from claims supported by evidence eligible for publication, including when the signed-in analysis used additional material. Check authorization at the server on the page and data routes. Give maintainers the established signed-in controls.

Verify the live walkthrough and public eligibility before enabling the demo. Define how the service withdraws public responses and cached data after visibility or publication changes. Review the guest entry and sign-in interactions against the approved experience.

## Consequences

### Positive

- **POS-001** Visitors can follow a real Narys change and inspect the evidence without a GitHub account once the live demo launches.
- **POS-002** Signed-in maintenance and public inspection can reuse the same canvas while the server controls the published records.

### Negative

- **NEG-001** The live walkthrough depends on publication of the repository and eligible evidence.
- **NEG-002** The public read path needs verification of visibility, direct URLs, response fields, and cache behavior. Changes to what is public can affect previously generated explanations.

## Alternatives Considered

### Launch with an approved snapshot while the repository is private

- **ALT-001** Publish a fixed map and sample merge walkthrough from explicitly approved content. This could have allowed access while the repository was private. The repository is now public, and the live map lets visitors follow subsequent changes.

## Implementation Notes

- **IMP-001** Exercise anonymous navigation and direct data requests. Check that guest responses carry eligible map and merge data and exclude private evidence, account data, and credentials. Verify that only signed-in maintainers can make map changes.
- **IMP-002** Rehearse disabling publication and changing upstream visibility. Check fresh and cached requests after the change. Use a public-source fixture and a mixed-source observation in verification.

## References

- **REF-001** [Public demo release requirement](../requirements/v1-public-narys-demo.md)
- **REF-002** [Workspace journeys](../../EXPERIENCE.md#5-user-journeys)
- **REF-003** [Runtime and deployment](../../ARCHITECTURE.md#6-runtime-deployment-and-recovery)
