---
name: setup-repository
description: >-
  Initialize an empty repository, configure approved development and verification tooling, or audit an existing repository. Use to establish factory templates, language tooling, linting, types, tests, architecture checks, CI/CD and repository protections without inventing application scope or bypassing approval.
---

# Repository setup

## Intent

Establish the smallest executable engineering foundation that the human and agents can use reliably. Convert approved standards and technical decisions into working tooling and observable controls. Preserve existing project conventions. Setup is not product design, implementation of unapproved features, or permission to dispatch, merge or deploy.

Read the [setup contract](references/setup-contract.md), [engineering standards](../engineering-standards/SKILL.md), [writing standard](../software-factory/references/writing.md) and relevant project instructions. Use the [standards contract](../software-factory/references/standards.md), [policy contract](../software-factory/references/policy-contract.md) and applicable language profile. For Python, read [python-standards](../python-standards/SKILL.md) and [Python foundation](references/python-foundation.md). For GitHub, use [CI and security](references/github-actions.md). Use [template sources](references/template-sources.md) for existing factory assets.

For approved frontend setup, use the [frontend foundation](references/frontend-foundation.md), [frontend standard](../engineering-standards/references/frontend.md) and [experience contract](../software-factory/references/experience-contract.md). Configure shadcn/ui and Storybook only when compatible and authorized; reuse the real source and theme. Propose reviewed specialist dependency revisions instead of auto-installing them. Do not create a speculative design system or overwrite EXPERIENCE.md/DESIGN.md as part of setup.

## Methodology

### 1. Identify intent, mode and current state

Select `initialize`, `configure` or `audit` from the requested outcome. If the choice materially changes work, ask one consequential question. Inspect the repository root, working-tree changes, relevant instructions, current config, lockfiles, runtime, commands, applicable approvals and accessible remote settings. Use the approved architecture and standards when available. Distinguish observed, missing, unknown, and not applicable. Do not execute untrusted repository scripts as part of read-only inspection. Do not expose secrets.

- **Initialize:** establish language-independent governance, template files and repository conventions. Do not choose the stack, license, visibility or release mechanism without approval. Use draft placeholders only in explicitly identified proposals; do not mark them approved or ready.
- **Configure:** establish or repair the approved executable foundation. Select tools and versions from existing decisions and current authoritative documentation. Resolve consequential gaps with the human or the responsible planning skill. Do not add product behavior, speculative dependencies, empty architectural layers or production infrastructure.
- **Audit:** inspect only. Give a prioritized gap analysis and proposed changes. Do not modify files, install dependencies, run project-controlled code, or change remote settings without a separate authorized configure operation.

### 2. Establish the proposed scope and authorization

Present a compact table of additions, changes, reuse and non-applicable controls. Identify selected tools, intended versions, verification commands, security implications and remote changes. Preserve existing configuration and accepted legacy conventions. If policy or templates are missing, offer the approved library templates; if present, propose a compatible diff rather than overwrite. Obtain explicit approval of the setup scope before mutation. Respect a prior exact authorization, but treat newly discovered material decisions as unresolved. Installation, pushes, remote settings and deployment each require applicable permission. A setup request does not approve the engineering baseline or a factory batch.

### 3. Establish the minimum executable foundation

Implement only the authorized changes. Prefer the approved existing tools. For a greenfield project, establish the smallest project structure and locked dependencies that support the approved initial implementation. Create real checks at useful boundaries, not a fictional product, no-op test or weakened verification to make CI green. If there is no product code, report product tests as not yet applicable and assign the approved first executable slice its real verification obligations. Reuse canonical commands in local development and CI. Configure appropriate lint, type, architecture, build, behavior, security and applicable formal/empirical checks. Do not add a task runner, container stack, service, custom checker or release pipeline without a demonstrated requirement. Install or resolve only approved dependencies, review generated lockfile changes and do not silently unlock dependencies during verification.

### 4. Establish CI and trusted repository controls

Configure PR verification, least-privilege credentials, reviewed pinned dependencies, safe events and applicable branch/check protections. Use the [CI reference](references/github-actions.md) for GitHub. Verify the actual check identities, candidate/base semantics and remote protection settings. Add the selected actual commands and obligations to AGENTS.md and REVIEW.md. Change machine-readable policy only with explicit approval. Keep candidate execution separate from trusted authorization. Do not grant the worker gate credentials or weaken protection to make setup pass. A workflow or policy file is not proof of enforcement. Do not implement the controller, classifier or trusted merge service as incidental setup. Do not enable unattended merging unless those existing controls are configured and independently commissioned.

### 5. Verify, report and hand off

Run applicable authorized checks in a clean or isolated environment and inspect their exit status and output. Verify the actual runtime and lockfile, required tool invocations, meaningful tests where code exists, and CI evidence for the relevant revision. Check the effect of at least one deliberately invalid case for each new mandatory enforcement mechanism when safe, in a disposable copy. Do not introduce the invalid case into the approved candidate. Record missing credentials, skipped checks and reasons. Distinguish local foundation, remotely verified CI and authorized factory execution. Reconcile remote evidence after publication if separately authorized. Repeat the setup inspection to confirm no unnecessary changes remain. Leave unapproved existing files intact. Refer to the [readiness contract](references/setup-contract.md) for the applicable completion conditions.

## Response contract

Start with **Recommendation** (mode and scope). Before approval show **Current state**, **Proposed changes** and **Decision required**. For audit or completion show a concise table with control, observed result/evidence, and action if unresolved. Summarize changed paths, actual local commands, remote settings and pending authorization separately. Give the next skill invocation or smallest required action. Use the shared writing standard and 150–300 words for typical summaries, excluding essential tables. Do not reproduce entire config files unless requested.

## Completion criteria

The approved setup scope is complete and verified, or explicitly partial/blocked with evidence and next action. Audit does not mutate state. Initialization is not executable readiness. Configuration has reproducible applicable commands and meaningful verification; missing CI or protection is reported rather than inferred. No unrelated files, standards, policy, scope, approvals or remote settings have been changed. The factory still requires an approved engineering baseline, exact issue authorization, current policy and applicable enforced runtime controls. No setup result grants dispatch, merge or deployment authority.
