# Pull request

## Change

Closes #<issue> only if this PR delivers and integrates the entire issue under the tracker policy. Otherwise link the issue without closing it.

<One sentence describing the resulting behaviour. State approved baseline or issue snapshot.>

## Risk and recovery

| Item | Result |
|---|---|
| Proposed review route | <automatic candidate / human review / blocked> |
| Reason | <policy and changed concern> |
| Impact | <actor, data, system or invariant at risk> |
| Recovery | <revert, compatible rollback or recovery procedure> |

<The trusted gate determines actual routing. This description is not authorization.>

<!-- Keep the PR body near 100–300 words of prose. Link detailed evidence. Record the approved issue/baseline, trusted policy revision and review route. Identify adopted standards snapshot and exceptions, documentation, baseline consistency and formal property impact or state why none applies. Do not include secrets or claim that a route grants merge permission. -->

## Verification

Candidate: <head SHA; tested base/merge candidate where relevant>

| Acceptance / CONF case or required check | Observed result | Evidence |
|---|---|---|
| <criterion> | <pass/fail/blocked/not applicable + observed value> | <test/CI artifact> |

<Identify required checks not run, formal property bounds/sync revision, evaluation results and material residual risks. Never report unrun checks as passed.>

## Rollout

<Migration order, compatibility window, feature flag, operator action, monitoring and recovery if applicable. Remove if unnecessary.>
