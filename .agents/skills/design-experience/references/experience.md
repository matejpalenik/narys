# Experience document template

Default location: root `EXPERIENCE.md`. Update relevant sections for a new feature; use linked `docs/design/` records only for genuinely large prototypes or independently evolving experience areas. Do not create empty sections. The experience record describes design intent and interaction choices; `SPEC.md` owns normative product behavior. Before specification approval, mark proposed required behavior as input. After approval, replace repeated guarantees with precise SPEC references. Preserve the approved design rationale.

# <Product> — Experience

Status: <draft | approved | superseded>
Scope: <product or feature and intended release>
Requirements: <REQ IDs and immutable source>
Architecture: <relevant accepted/proposed decisions>
Approval: <trusted reference to exact approved payload, or pending>

## 1. Experience intent

<The user's job, desired result, design priorities and exclusions.>

## 2. Users and context

| Actor | Goal and frequency | Context and constraints | Evidence or assumption |
|---|---|---|---|
| <role> | <task> | <device, expertise, environment> | <source or unvalidated assumption> |

## 3. Experience principles

<Few actionable priorities, with why and trade-offs. Link applicable usability/accessibility sources.>

## 4. Information architecture

<Navigation, workspaces, labels and persistent context. Use a Mermaid flowchart when helpful.>

## 5. User journeys

| ID | Actor and trigger | Task steps and outcome | Requirements / SPEC | Prototype and validation |
|---|---|---|---|---|
| UX-001 | <actor and trigger> | <short normal and alternate task flow> | <REQ and approved SPEC refs when available> | <link, observed or pending> |

## 6. Interaction model

| ID | Decision and rationale | Affected journey / view | Normative handoff |
|---|---|---|---|
| UX-002 | <interaction choice, why and trade-off> | <UX-001> | <SPEC link or pending input> |

<Describe selection, navigation, editing, search, commands, context continuity and feedback as relevant. Show sequence or state diagrams for important relationships.>

## 7. Workspace specifications

| View | Purpose and information | Actions and context | Relevant journey |
|---|---|---|---|
| <view> | <what the user needs to see> | <what the user can do> | <UX ref> |

## 8. Interface states and recovery

| View or interaction | State | User-visible information and next action | SPEC reference / proposal |
|---|---|---|---|
| <view> | <normal, empty, loading, stale, partial, blocked, failed, canceled, success> | <meaning and recovery> | <exact ref> |

## 9. Human-agent interaction (when applicable)

<Proposed vs approved vs applied vs verified state, conversation context, streaming progress, human control, permission/approval boundaries, cancellation and errors. Do not imply that a visual animation establishes real execution state. Reference normative authority and evidence semantics in SPEC.>

## 10. Accessibility and responsive experience

<Approved accessibility target, keyboard and alternative pointer controls, focus and reading order, zoom/reflow, reduced motion, supported devices and limitations. Use WCAG 2.2 AA as the default proposal for web UI.>

## 11. Prototypes and decisions

| Reference | Task and fidelity | Observation / human preference | Status and revision |
|---|---|---|---|
| <path, story ID or preview> | <task> | <observed evidence or stated preference> | <draft, selected, rejected; immutable locator> |

## 12. Assumptions and limitations

| Assumption or gap | Effect if false | Resolution / owner |
|---|---|---|
| <unvalidated user need or technical question> | <consequence> | <check or explicit limitation> |

## 13. Experience acceptance

| Journey | Representative task and context | Expected observable outcome | Method and evidence |
|---|---|---|---|
| <UX ref> | <start state, data, actor and task> | <intended outcome> | <walkthrough, browser task, inspection; actual or pending> |

<Identify what still needs SPEC, architecture or design-system review. A human-selected prototype is not a production or deployment approval.>
