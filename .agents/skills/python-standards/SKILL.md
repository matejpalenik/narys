---
name: python-standards
description: >-
  Apply or review the adopted Python engineering standards for Python application and SDK design, implementation and verification. Use for object-oriented domain code, Protocol contracts, strict typing, Google-style docstrings, packaging, Ruff, uv, tests and architecture checks. Do not force tooling migrations or change approved behavior.
---

# Python engineering standards

## Intent

Produce explicit, typed, object-oriented Python that preserves the domain model and architecture. Use conventional Python names and language facilities within the adopted project preferences. Keep implementation understandable to humans, type checkers and future agents.

Read the [standards contract](../software-factory/references/standards.md) and [engineering-standards](../engineering-standards/SKILL.md) if not already loaded. Read the actual Python version, `pyproject.toml`, lockfile, project architecture, public API and relevant scoped instructions. Do not assume a runtime version or configured tool. Use only applicable references.

## Methodology

### 1. Establish the language profile

Confirm the approved Python support range, package type, runtime, tooling and exceptions. For new Python projects, propose a supported modern version range, `src` layout, `uv`, a committed project lockfile, Ruff, one strict type checker (Pyright or mypy), pytest and appropriate architecture checks. Keep existing accepted tools unless migration is separately approved. The project selects versions and commands. Do not install tools, change language versions or regenerate dependencies solely because this skill is loaded.

### 2. Design object-oriented Python

Use [object-oriented design](references/object-oriented-design.md) and the general domain standards. Place business logic in entities, value objects, named domain services and application use-case classes. Do not use free-floating module-level production business functions. Use instance methods for stateful behavior and injected dependencies, class methods for named constructors, and static methods for cohesive stateless operations where there is a meaningful owner. Do not create `Utils`, `Helpers`, `Manager` or a namespace class with unrelated methods merely to avoid functions.

Module-level functions are permitted for framework-mandated callbacks or entry points, registration, thin composition adapters, pytest tests/fixtures, and library compatibility where needed. Keep such functions thin. Delegate substantive business behavior to the relevant object. Python has no dedicated static-class construct; use `@staticmethod` in a cohesive class. This convention is a deliberate user preference, not general Python or Google style. Do not turn it into a mechanical conversion of existing code.

### 3. Use explicit types and errors

Use [type system and language rules](references/type-system.md). Annotate public contracts and parameters/returns, including no-result operations. Use `typing.Protocol` for meaningful dependency boundaries, modern annotations supported by the selected minimum Python version, explicit domain values and immutable types where appropriate. Do not use `Any`, unchecked casts, broad ignores or assertions to hide invalid types or untrusted inputs. Validate external data at the boundary. Keep async, resource, error and transaction semantics explicit.

### 4. Organize, document and verify

Use [project structure](references/project-structure.md), [docstrings](references/docstrings.md) and [tooling and tests](references/tooling.md). Keep packages capability-first. Use Google-style docstrings for public and non-obvious contracts. Keep descriptive prose concise and compatible with the factory writing guidance. Prefer source names and types over duplicate explanatory comments.

Run the actual formatting, lint, type, build and test commands for the affected scope when authorized. Verify dependency direction and protocols with appropriate automated checks. Do not weaken rules, replace tools or add broad suppression to make a candidate pass. If a necessary tool or configuration is missing, propose the smallest approved setup. Report actual results and limitations. Do not claim full Google Style Guide conformance.

## Response contract

When invoked for a design or quality review, start with **Assessment**. Show a concise table of applicable standard, finding, affected file or symbol, evidence and action. Include a small code shape only when it clarifies the contract. During implementation apply the standard inside the requested task and report material deviations or missing checks; do not generate a separate essay. Use the [writing standard](../software-factory/references/writing.md).

## Completion criteria

The affected Python work conforms to the adopted architecture, typing, object-ownership, naming, documentation and tooling requirements, or material exceptions and missing verification are explicitly reported and routed for approval. No unrelated refactor or tool migration is implied.
