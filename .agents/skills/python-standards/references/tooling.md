# Python tooling and verification

## Preferred greenfield toolchain

| Concern | Default | Scope |
|---|---|---|
| Environment and dependencies | uv | Pin reviewed tool/runtime versions, commit lockfile when applicable. |
| Formatting and lint | Ruff | Approved rules for correctness, imports and style, Google docstring convention. |
| Static type checking | Pyright or mypy | Select one strict checker and supported runtime configuration. |
| Tests | pytest | Behavior-first fixtures and tests, integration with real relevant dependencies. |
| Architecture | Import Linter or equivalent | Check inward layer dependencies and context boundaries where applicable. |
| Property testing | Hypothesis or equivalent | Only when useful for invariant/edge coverage; not a formal proof. |
| Packaging | Approved build backend | Build/install wheel or artifact when the distribution contract requires it. |

Use [setup-repository](../../setup-repository/SKILL.md) for authorized tooling initialization or changes. Use an existing equivalent toolchain if accepted. Do not require both type checkers or introduce pre-commit as a substitute for CI. Prefer a single command set shared by local development and CI. Choose supported versions by evidence and project constraints. Do not invent installed versions or green checks.

## Illustrative configuration

Adapt these fragments only after selecting the tools and confirming current options. Merge settings with existing configuration instead of replacing it. This is not a complete `pyproject.toml` or mandatory rule set.

```toml
[tool.ruff.lint]
select = ["E4", "E7", "E9", "F", "I", "D"]

[tool.ruff.lint.pydocstyle]
convention = "google"

[tool.pyright]
typeCheckingMode = "strict"
```

If mypy is selected instead, configure the adopted strict settings in its own section. Preserve existing rules and scoped exemptions. Select additional Ruff rules according to the agreed code quality policy. Do not apply sweeping auto-fixes to unrelated code.

Illustrative commands for a configured uv project:

```sh
uv sync --locked
uv run --locked ruff format --check .
uv run --locked ruff check .
uv run --locked pyright
uv run --locked pytest
```

Use the actual project dependency groups, extras and commands. These examples assume tools are already installed as project dependencies and a valid lockfile exists. When creating a project, approve bootstrap and generate the lock in a controlled step. In CI, fail stale or missing lockfiles rather than silently modifying them. Add architecture checks and package build checks when applicable. Record actual test profiles and required check names in `REVIEW.md` and approved policy.

## Test and review discipline

Use tests at useful public domain and application boundaries. Use pytest fixtures and test functions idiomatically. Mock external dependencies through ports where appropriate. Test actual adapter semantics, atomicity, uniqueness, authorization and protocol compatibility with real relevant dependencies. Keep fixtures deterministic, isolated and cleaned up. Use the project's approved formal or empirical verification when necessary.

Enforce module-level production business-function restrictions by review first. If repeated violations justify a custom AST check, define its narrow scope and exceptions, test it with deliberately broken cases and approve it as a separate control. Do not pretend Ruff universally enforces this project preference. Import checks cannot prove domain richness or correct runtime behavior. Review those semantically. Do not add a custom checker solely because the skill mentions it.
