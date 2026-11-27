# Python engineering foundation

Apply [Python standards](../../python-standards/SKILL.md) and its [tooling guidance](../../python-standards/references/tooling.md). Select the approved runtime, build backend and strict type checker before configuring. Use the current official tool documentation to verify option names and supported versions. Preserve an approved equivalent toolchain. Do not choose dependencies based solely on a template.

## Minimal setup

| Concern | Preferred greenfield approach |
|---|---|
| Project and environment | `pyproject.toml`, uv, reviewed runtime version in `.python-version` where appropriate |
| Dependencies | Explicit runtime/dev groups, `uv.lock`, locked install |
| Formatting and linting | Ruff with approved rules and Google docstring convention |
| Type checking | One strict checker, Pyright or mypy |
| Tests | pytest with real behavior and contract tests as code becomes available |
| Architecture | Import Linter or equivalent for actual bounded contexts and layer boundaries |
| Property checks | Hypothesis when relevant; formal verification through existing specialist skills |
| Local hooks | pre-commit if useful, invoking the same configured tools; no duplicate rules |
| Build and release | Approved packaging/backend and applicable build/install smoke tests |

Use the supplied [TOML fragment](../assets/python/pyproject.fragment.toml) only as a reviewed merge into the project's actual configuration. It does not declare dependencies, project metadata or a build backend. Configure the selected runtime, source package and test layout from approved architecture, not from an arbitrary framework scaffold. Do not create empty DDD layers. Keep domain logic independent of ORM/framework code. Review package-manager commands and lockfile changes. Keep local secrets, generated files and environments out of version control without hiding source or lockfiles.

## Verification commands

For an approved uv project with these tools installed and locked, a typical local/CI command set is:

```sh
uv sync --locked
uv run --locked ruff format --check .
uv run --locked ruff check .
uv run --locked pyright
uv run --locked pytest
```

Substitute approved commands for the actual dependency groups, extras, type checker and test profiles. Use a single command entry point if the project already has one or repetition warrants a small wrapper. Do not add another task runner simply to combine five commands. If pytest has no tests to collect, do not convert its nonzero exit into success. Where there is no code, omit the test job step with explicit pending first-slice obligations; enable it with a real test when code is introduced. Include `lint-imports` or equivalent only when actual import contracts are configured and demonstrated. An import check does not prove DDD quality or runtime semantics.

Generate or update the lockfile only during an approved dependency change. In verification and CI use locked resolution so a stale lock fails. Check supported runtime(s), formatting, lint, types, test exit status and actual build where applicable. For new architecture guards, validate the permitted and forbidden edge in a disposable fixture. For the no-module-level-business-functions preference, begin with review; introduce a narrowly scoped tested checker only if observed failures justify it. Do not add custom validators that are weaker than established tools.

## Optional extensions

Select vulnerability auditing, dependency updates, SBOM, artifact signing, build matrix, package publication and deployment controls according to the actual distribution and threat model. Reuse approved CI. Do not publish, deploy, enable paid services or add credentials without authorization. Record actual commands in AGENTS.md or its canonical linked tooling document, required evidence in REVIEW.md, and review routing in approved policy.
