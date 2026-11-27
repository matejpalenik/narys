# CI and repository security

This reference describes an ordinary unprivileged verification workflow, not a trusted merge gate. Use the [CI/CD engineering reference](../../engineering-standards/references/ci-cd.md), [factory policy contract](../../software-factory/references/policy-contract.md), and current official GitHub documentation. Where GitHub is not the selected host, adapt equivalent controls to that host.

## Configure a minimal CI path

1. Identify existing workflows, actual check names and issuers, merge target and supported runtime matrix. Do not create a duplicate pipeline. Select the canonical local commands and their actual required dependency groups.
2. Use pull-request verification and an approved default-branch integration check. Use `merge_group` when the selected merge queue requires it; ensure all required checks run for the merge candidate. Avoid path filters that skip required checks. Keep required job names unique and stable. Do not silently relax failure handling or use blanket `continue-on-error`.
3. Run candidate code with minimal credentials (read-only by default), isolated runners and no release secrets. Review external actions and pin them to reviewed full commit SHAs; pin the actual tool/runtime versions and lock resolution. Keep setup dependencies updated via approved dependency review. Do not interpolate untrusted issue/PR fields into shell commands.
4. Keep release, deployment, review-policy status publication and other privileged operations separate from candidate execution. Do not use `pull_request_target` to check out or execute untrusted PR code. Do not reuse privileged credentials, writable shared caches or unsafe self-hosted workspaces across trust boundaries.
5. Run the workflow for the actual candidate, inspect result and identity, and record the evidence. A valid YAML file or successful local run does not establish remote success.

The [Python workflow starter](../assets/python/verify.yml.template) contains explicit placeholders for the approved integration branch, runtime and uv versions. It uses action revisions shown in Astral's official GitHub integration guide at the time of drafting. Verify the upstream immutable commits, suitability and action inputs again at use time. Adapt the commands to the approved project. This is not a universally runnable workflow and must not be copied with unresolved placeholders. It assumes a real Python project, committed lockfile, installed dev tools and meaningful tests.

## Remote settings and trusted enforcement

| Control | Proposed default |
|---|---|
| Integration branch | Protect against unauthorized direct pushes, force pushes and deletion. |
| PR approval | Human review until independent conditional enforcement is commissioned. |
| Required checks | Actual unique check names and expected issuers, tested against current base/merge candidate. |
| Stale approval | Revalidate relevant approval and evidence when candidate changes. |
| Control paths | Human-controlled review of CI, policy, verification, instructions, dependency and other material control changes. |
| Agent credentials | No branch-protection bypass, no authority to alter trusted checks or approve its own changes. |
| Secret/dependency controls | Enable supported and approved scanning, vulnerability review and dependency update automation. |
| Auto-merge | Do not enable as part of bootstrap unless already independently authorized and enforced. |

Read effective repository and organization rules where available, including bypass actors and app permissions. Propose changes before writing settings; preserve stricter controls and ask before any migration. Confirm effective settings by reading them back, not by trusting an API success response. If settings access, plan features or permission is missing, provide exact outstanding control and manual action. Required status names in YAML do not configure rulesets by themselves. A required check should come from the expected trusted issuer; unprivileged candidate verification cannot establish its own authorization.

Use the existing commissioning protocol in the factory policy contract. For a new trusted control, require an observable negative case (for example failed verification or a changed candidate) in an approved disposable test before automatic use. Do not create an alternate gate or grant bypass rights to work around required human review. Respect separate authorization for commit, push, PR creation, remote policy, merge and deploy. Where automation is not ready, the factory may use only the separately authorized supervised route permitted by policy.

## Primary references

- [GitHub: security hardening for GitHub Actions](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub: managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitHub: available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [Astral: using uv in GitHub Actions](https://docs.astral.sh/uv/guides/integration/github/)
- [Astral: locking and syncing](https://docs.astral.sh/uv/concepts/projects/sync/)

When preparing the proposed policy, review actual toolchain and verification paths, for example `pyproject.toml`, lockfiles, task definitions, architecture check configuration and verification scripts. Decide which material changes require human review. Do not blindly classify all lockfile changes as unsafe or all configuration changes as mechanical. The selected policy controls and protected paths must be approved and tested by the trusted gate. Do not change the supplied schema or an existing policy as a side effect of setup.
