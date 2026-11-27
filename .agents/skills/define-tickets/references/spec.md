# <Action title describing the observable behaviour>

## What to build

<Actor, action, observable result, where the slice ends. Preserve named existing behaviour.>

Parent: <epic reference or native parent>

Baseline: <approved git revision, REQ/SPEC/CONF/PROP IDs as applicable, allocated scope, interface contracts, architecture sections, ADR IDs and program design snapshot; applicable adopted standards snapshot and exception references; for UI, UX/DS IDs, immutable component/token/story refs and relevant approval>

Non-goals: <material exclusions, if any>

## Acceptance criteria

- [ ] AC-01: Given <state>, when <actor acts>, then <observable result>.
- [ ] AC-02: Given <material failure/retry/conflict>, when <action>, then <result and preserved invariant>.

## Program design

### Files

| Path | Change and reason |
|---|---|
| <path> | <responsibility> |

### Types and signatures

<Relevant signatures and type shapes without bodies. Link long approved shared contracts.>

### Call stack

<Short call tree. Add Mermaid sequence or state diagram where order matters.>

### Test plan

| Test or check | Assertion / expected evidence | Criterion / conformance |
|---|---|---|
| <name and boundary> | <observable result> | AC-01 / <CONF-ID> |

### Least confident decisions

<Resolved decisions and links. Any unresolved material decision blocks readiness. If none, state none.>

## Verify

<Required verification profile, exact environment/fixtures, runnable commands or intended check boundary, formal property IDs, affected documentation and evidence to retain. Only add details not already in the test plan.>

## Dependencies

<Use native blocked-by relationship. Record external prerequisites here. Remove this section when no text is needed.>

## Approval

<Trusted reference to approved issue content and design baseline. Never self-approve.>
