# Template sources and reuse

Use the original library templates. Do not create another independently maintained governance format. Locate the installed skill directory and, if available, the release package that contains `repository-templates/`. If the release package is unavailable, the installed assets and sibling references below are sufficient to propose the core templates. Inspect the actual source before copying. Use explicit authorization for file creation and adaptation.

| Target | Source |
|---|---|
| `AGENTS.md` | [AGENTS.md starter](../assets/common/AGENTS.md) |
| `REVIEW.md` | [REVIEW.md starter](../assets/common/REVIEW.md) |
| `.factory/policy.yaml` | [Canonical policy](../../software-factory/references/policy.yaml) |
| `.factory/policy.schema.json` | [Canonical schema](../../software-factory/references/policy.schema.json) |
| `.github/ISSUE_TEMPLATE/epic.md` | [Epic issue starter](../assets/common/.github/ISSUE_TEMPLATE/epic.md) |
| `.github/ISSUE_TEMPLATE/spec.md` | [Ticket issue starter](../assets/common/.github/ISSUE_TEMPLATE/spec.md) |
| `.github/pull_request_template.md` | [PR starter](../assets/common/.github/pull_request_template.md) |
| `.editorconfig` | [Minimal editor settings](../assets/common/editorconfig.template) |
| Python `.gitignore` additions | [Python ignore fragment](../assets/python/gitignore.fragment) |
| Python `pyproject.toml` settings | [Python config fragment](../assets/python/pyproject.fragment.toml) |
| Python GitHub verification workflow | [CI starter](../assets/python/verify.yml.template) |

The common governance files mirror the release package's existing repository templates byte-for-byte; they are generated copies for installed-skill portability, not separate standards. Policy and schema remain in the existing factory skill. Existing project-specific files take precedence until a change is approved. Merge compatible settings without deleting user configuration.

The optional starter files require adaptation. Do not copy a template with unresolved placeholders to an active workflow. Do not generate a lockfile from unreviewed dependencies. Do not treat template text as evidence of actual approval or verification. Never install a license, select a remote visibility or configure release permissions solely from the presence of a template.

Use [EXPERIENCE.md format](../../design-experience/references/experience.md) and [DESIGN.md format](../../design-system/references/design.md) only during their respective authorized design activities. Do not copy unfilled templates to project root or mark them approved during initialization. For an approved frontend use [frontend foundation](frontend-foundation.md); do not introduce an unreviewed version-specific scaffold.
