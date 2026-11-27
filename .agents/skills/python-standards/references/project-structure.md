# Python project structure and packaging

Start from [capability-first organization](../../engineering-standards/references/code-organization.md). Use a `src/<import_package>/` layout for a new distributable application or library by default. Install the package in the development/test environment rather than modifying `sys.path` to make tests pass. Use the approved packaging backend and declare `requires-python`, dependencies, entry points and optional groups in `pyproject.toml` as applicable. Avoid import-time side effects. Keep public exports explicit and preserve compatibility for consumers. Do not split a small package into artificial layers or create empty folders.

```text
pyproject.toml
uv.lock
src/
  purchase_app/
    procurement/
      domain/
        purchase_request.py
        purchase_request_repository.py
      application/
        commands/
          submit_purchase_request.py
        queries/
          get_purchase_request.py
      infrastructure/
        persistence/
      presentation/
        api/
    bootstrap/
tests/
  unit/
  integration/
  architecture/
  e2e/
```

This tree is illustrative. Tests can mirror capabilities inside each test boundary. A small SDK may need only domain types, public operations, adapters and tests. Put configuration parsing, environment access and concrete dependency construction at the outer boundary. Use the chosen framework only at the layer that owns its integration. Pydantic or an equivalent validation library is appropriate for external schemas/settings when selected, not a mandatory dependency for all domain objects.

Use `uv` for new projects by default. Commit the project lockfile to reproduce local and CI environments when applicable. A reusable library still declares compatible dependency ranges for its consumers, not its development lock as a universal transitive dependency constraint. Build and test a distribution if publishing. Verify supported runtime versions and extras where relevant. Do not impose an arbitrary Python version, build backend or dependency on an established project.
