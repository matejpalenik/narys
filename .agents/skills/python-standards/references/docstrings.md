# Python docstrings

Use the Google Python Style Guide docstring convention, not a claim of full Google language-style compliance. Follow the [factory writing standard](../../software-factory/references/writing.md) for technical prose. Use a short summary that states behavior. Describe important constraints, ownership, side effects, errors and examples when they affect correct use. Avoid restating signatures or explaining obvious assignments.

| Section | Include when |
|---|---|
| Summary | Public classes, modules and callable APIs, or non-obvious internal contracts. |
| Args | Parameters need semantic explanation, units, scope or preconditions. |
| Returns | Meaning of a result, sentinel, ownership or ordering matters. |
| Raises | Callers need to know specified exceptions and their conditions. |
| Yields | Iteration behavior or resource lifetime needs explanation. |
| Attributes | Public attributes require semantic documentation. |
| Examples | A small example materially clarifies how to use a public API. |

Do not duplicate annotation types in Args/Returns when the types are already clear. Describe return semantics rather than implementation. Document stable public failures, not every possible exception from the interpreter. Keep comments about why a rule exists, and link canonical specification or ADR when useful. Do not use docstrings as an independent source of normative business behavior.

Illustrative method docstring:

```text
"""Approve the pending request.

Preserve the current state if the request cannot be approved.

Raises:
    InvalidTransitionError: If the request is not pending.
"""
```

The example describes an illustrative contract. Use the actual project behavior. Configure Ruff's pydocstyle convention to `google` and select the `D` rules where the project adopts this enforcement. Adjust only approved narrowly scoped exclusions (for example test fixtures). A docstring linter checks format, not accuracy or complete STE compliance.
