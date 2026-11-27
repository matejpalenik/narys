# Repository setup contract

Use this reference to select the minimum scope and record evidence. This is a checklist for the setup operation, not a new permanent project status file or approval gate.

## Scope and ownership

| Concern | Canonical record | Setup responsibility |
|---|---|---|
| Human intent, behavior and design | Requirements, SPEC.md, ARCHITECTURE.md, ADRs | Reuse approvals. Ask responsible skill to resolve missing decisions. |
| Engineering rules | Adopted general/language profiles and approved exceptions | Configure actual checks; do not adopt unapproved versions. |
| Local instructions | AGENTS.md, scoped instructions, README/CONTRIBUTING as appropriate | Record actual setup and verification commands or link to their canonical definition. |
| Tool settings | Language configuration, lockfile, runtime file | Establish reproducible environment and commands. |
| CI execution | Approved workflows | Invoke the same local verification commands in clean environments. |
| Required evidence | REVIEW.md | Describe applicable verification profiles, evidence and check identities. |
| Execution/review permissions | Trusted policy, approvals and remote rules | Propose or configure only with authorization; verify actual enforcement. |

## Initialization

Create only missing, applicable files. Use the [template sources](template-sources.md). Review `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `REVIEW.md`, `.factory/`, GitHub issue and PR templates, `.gitignore`, `.editorconfig`, and licensing/security guidance. License, visibility, default branch, publish targets and security reporting channels require human decisions if not already approved. Never invent license terms, contact addresses, secrets, or supported versions. Do not generate empty research, requirement or architecture records just to populate directories. Do not commit credentials. Document actual environment variable names without secret values where applicable.

In an empty repository with unknown architecture, stop after approved language-independent setup. A governed but empty repository has no executable application and no verified product acceptance.

## Configuration

Use a targeted inventory and compare each proposed control against approved design. Establish the selected runtime, package layout, environment/dependency resolution, format/lint, type checking, tests, applicable architecture checks, build and CI. Pre-commit hooks are optional convenience, not a verification or authorization gate. Add release/deployment workflows only if approved and required by the intended release process. Existing tooling may be sufficient. Prefer one maintained command set; do not duplicate semantics across shell wrappers, task runners and workflow YAML. Keep task runner additions conditional. Use the actual language profile rather than assuming Python in a mixed-language repository.

## Readiness evidence

| Control | Minimum evidence | If missing |
|---|---|---|
| Governance | Approved applicable files and actual standards snapshot | Identify draft or pending decision. |
| Reproducible environment | Successful locked install and supported runtime/tool versions from an isolated checkout | Report blocked or partial. |
| Local verification | Exact commands, actual exit results and snapshot identity, applicable meaningful tests | Report failed/not run; do not use placeholder passes. |
| Architecture guards | Approved import/dependency checks and failing witness if applicable | Explicitly identify what is checked and what still requires review. |
| CI | Workflow run URL, candidate SHA, jobs/results, actual required check names | Report configured but remote unverified. |
| Remote protection | Observed effective rules, permissions, required check identities and candidate semantics | No inferred enforcement or unattended merge. |
| Trusted factory controls | Valid approved baseline, claims/approvals, independent review, policy gate, budgets, notification and controller evidence as required by the mode | Supervised authorized operation only if permitted; otherwise block. |

Use the following distinct outcomes. Do not persist a second readiness status system if existing evidence is sufficient.

- **Initialized:** authorized governance setup verified; code/tooling may remain absent.
- **Local foundation verified:** applicable commands actually execute and required local checks pass for the stated revision. Product behavior not yet implemented remains unverified.
- **CI verified:** applicable local and remote checks passed for the exact revision and required remote settings were inspected. State any unverified protection separately.
- **Factory preflight:** only `software-factory` establishes authorization for a particular batch and mode. It must recheck current evidence and enforcement. No earlier outcome implies permission to dispatch or merge.

## Existing repositories and repeatability

Inspect first. Keep accepted toolchains, hooks, branch policies and repository-specific instructions. Propose a narrowly scoped migration only if required. Preserve worktree modifications, untracked user files and remote settings. Never blanket-reformat, reset, clean, regenerate lockfiles or update dependencies just to normalize a project. Require a reviewed diff for existing policy or control changes. Repeating setup with unchanged approved inputs should make no material changes; if dependency resolution would differ, preserve the approved lockfile or request an explicit update.

## Completion report example

| Control | Observed result | Next action |
|---|---|---|
| Local lint and types | Commands passed at recorded candidate snapshot | None |
| Product tests | Not yet applicable; no product code | Implement approved first slice |
| CI | Workflow prepared; no remote run | Obtain publication approval, then observe actual run |
| Protected branch | Unknown, no settings access | Human verifies or authorizes configuration |

Conclusion: local tooling configured and checked, not factory-ready. This is an example, not evidence about the user's repository.

For applicable UI readiness, establish approved frontend tooling and commands, relevant UX/design approvals and component foundation required by the scoped work, or an explicitly approved first enabling slice. Use the [frontend foundation](frontend-foundation.md) and [experience contract](../../software-factory/references/experience-contract.md). Distinguish Storybook configured, actual stories rendered/tested and integrated UI verified; one does not imply the next. Audit remains read-only. Missing required rendering or remote checks is an explicit gap.
