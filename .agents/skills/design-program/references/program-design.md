# Program design: <epic or feature>

Baseline: <approved epic, applicable SPEC/CONF/PROP IDs, interface contracts, architecture and ADR revisions>

<For UI, reference approved UX/DS decisions and actual component/token/story contracts. Include component props, state ownership and applicable story/browser checks in the existing five sections.>

## Files

| Path | Create/change | Responsibility or reason |
|---|---|---|
| <path> | <action> | <why it belongs here> |

## Types and signatures

<Code blocks in the repository language. Include public types and method signatures, input/output and errors. No implementation bodies.>

## Call stack

<Call tree for each main flow. Show checks, state transitions and effect boundaries. Use a Mermaid sequence diagram for timing, transaction or concurrency when useful.>

## Test plan

| Test | Boundary / fixture | Expected assertion | SPEC/CONF or epic case |
|---|---|---|---|
| <name> | <public interface> | <observable expectation> | <ID> |

<Identify relevant formal properties and independent acceptance evidence.>

## Least confident decisions

| Decision | Why uncertain | Consequence / proposed resolution | Status |
|---|---|---|---|
| <decision> | <evidence gap> | <option, experiment or human answer> | <open/resolved> |

Approval: <human approval reference and exact design revision>
