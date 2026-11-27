# Verification and CI/CD standards

Apply the [review policy](../../software-factory/references/review-policy.md) and project `REVIEW.md`. This reference guides project quality checks. Use [setup-repository](../../setup-repository/SKILL.md) to configure and verify the approved tooling. It does not authorize or configure automatic merging by itself.

## Verification boundaries

| Check | Evidence |
|---|---|
| Domain | Invariants, valid and rejected transitions, edge cases through public behavior. |
| Application | Authorization and orchestration through public use cases. Use focused substitutes only at true dependency boundaries. |
| Integration | Real relevant persistence, external protocol, transaction, compatibility, concurrency and failure semantics. |
| Architecture | Import/dependency graph, forbidden edges, cyclic dependencies and context ownership where mechanically detectable. |
| End-to-end | Representative integrated user or consumer outcomes, not just component health. |
| Formal or empirical | Apply the project's required critical-property or measured-quality profiles. |

Test behavior rather than incidental implementation details. Use deterministic fixtures, isolated state, repeatable cleanup and explicit time/resource bounds. Derive expected results from approved contracts. Do not impose an arbitrary coverage percentage as a substitute for meaningful acceptance and invariant coverage. Follow `implement-ticket` for red-green-refactor and `verify-change` for independent evidence.

## CI and release

- Use one documented local/CI command set. Configure locked or reproducible tool/dependency resolution and supported runtime versions. Build and verify in clean environments. Do not depend on untracked developer state.
- Require applicable format, lint, type, architecture, build, behavior and integration checks. Use dependency vulnerability and secret checks appropriate to risk. Review lockfile changes. Record the actual commands and check identities in `AGENTS.md`/`REVIEW.md` and the trusted policy, not repeated in each ticket. Missing tools are a bootstrap or scoped engineering task, not passing evidence.
- Protect branches and trusted verification configuration. Give workers only necessary permissions. Run untrusted candidate code without privileged gate credentials. Pin third-party CI actions to reviewed immutable revisions when supported. Do not expose release secrets to PR jobs. Verify check source and candidate identity. Never remove a check to pass CI.
- Build the intended release artifact, verify it and promote the same artifact when supported. Version interfaces and packages according to approved compatibility policy. For published artifacts, consider SBOM, provenance and signing based on supply-chain risk. Prefer simple release automation over another framework. Document migration, rollout, rollback or forward recovery, and post-deployment checks where applicable. Merge is not deployment authorization.

When a check is unavailable, state the gap and required decision. Do not modify CI, dependencies, type checker strictness or enforcement during an unrelated ticket. Propose scoped bootstrap or maintenance work. Use an executable guard when it can reliably detect the rule. Use human or independent review for semantic design judgments.
