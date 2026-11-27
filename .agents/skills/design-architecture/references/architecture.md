# <Product> architecture

## 1. Overview

<Purpose, product boundary, approved release objective, architecture status and applicable requirements and specification, if defined. The architecture owns mechanisms, not normative semantics. Short high-level block view if it helps orient the reader.>

## 2. Architecture drivers

| ID / source | Driver or constraint | Consequence |
|---|---|---|
| <requirement> | <measurable need or binding rule> | <design implication> |

### Applicable engineering standards

<Reference the adopted immutable standards snapshot and language profiles in AGENTS.md. State the project-specific application: bounded contexts, inward dependency direction, command/query model, persistence and interface ownership, selected tooling and material approved exceptions. Link ADRs. Do not reproduce the reusable standards rules.>

## 3. System context (C4 L1)

<Mermaid diagram: people, system under design, external systems. Title and legend. Label relationships. Explain the boundary and actor responsibilities.>

## 4. Containers (C4 L2)

<Mermaid diagram: applications and data stores, responsibilities, technologies, protocols, trust boundaries where relevant.>

| Container | Responsibility | Technology | Owns / uses |
|---|---|---|---|
| <name> | <responsibility> | <accepted choice> | <state or interface> |

## 5. Components (C4 L3)

<For consequential containers, show modules, responsibilities, public interfaces and permitted dependencies. Avoid speculative component diagrams.>

## 6. Code structure (C4 L4, where useful)

<Stable code-level boundaries, key interfaces or module tree. Mark planned versus observed code. Refer to approved ticket program design for detailed signatures. State why a view is not needed if omitted.>

## 7. Domain and data architecture

<Domain/module boundaries, system of record, data ownership, persistence, consistency mechanisms and migration design. Reference canonical domain semantics, invariants, state transitions and retention obligations in SPEC.md or the applicable requirements. Use structural diagrams where helpful.>

### Material interfaces

| Boundary | Provider / owner | Consumer | Canonical contract and behavior refs | Compatibility mechanism |
|---|---|---|---|---|
| <interface> | <owner> | <consumer> | <schema / SPEC / CONF refs> | <versioning, contract checks or migration> |

## 8. Runtime behaviour

<Sequence diagrams of component interactions for principal flows. Identify transaction and authorization boundaries and how mechanisms realize SPEC guarantees. Do not repeat normative state machines or failure rules.>

## 9. Deployment and operations

<Environment and deployment views, network boundaries, configuration, operational ownership, scaling assumptions, observability, backup/recovery and safe rollout. Link private deployment details without exposing secrets.>

## 10. Quality and security

| Concern | Requirement / target | Mechanism | Verification |
|---|---|---|---|
| <security, performance, reliability, etc.> | <source-backed requirement or open target> | <design> | <check> |

<Identify threat boundaries, identity, access control, sensitive data, integrity, failures and recovery in proportion to risk.>

## 11. Verification architecture

<Technical test boundaries, integration environment, dependencies and verification mechanisms. Link SPEC conformance criteria, REVIEW.md, and property records.>

## 12. Decisions and evolution

| ADR | Decision | Status | Affected area |
|---|---|---|---|
| <link> | <short summary> | <status> | <area> |

<Current implementation versus approved target, known limitations, migration sequence and open decisions. Do not describe planned behaviour as deployed.>

<Use applicable sections only. For a feature, amend affected sections of the same root document. Do not produce a second architecture document.>

For UI-bearing systems, reference the approved `EXPERIENCE.md` journeys and applicable design rules rather than repeating them. Describe frontend responsibilities, state ownership, component and token boundaries, preview/test integration, and technology decisions only where they are material. Link relevant interfaces and SPEC guarantees. The UI foundation and optional specialist integrations are approved architecture/tooling choices.
