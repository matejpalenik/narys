# AGENTS.md

## Engineering objective

Deliver the smallest correct, maintainable implementation of the approved requirements. Preserve existing guarantees. Prefer simple designs and observable results over speculative abstractions.

The human owns product scope, business rules, consequential design decisions, and integration policy. Agents investigate, propose, and execute within approved boundaries. Evidence establishes correctness, not permission to merge.

## Work boundaries

- Keep planning separate from implementation. For substantive features, obtain approval for product scope, applicable architecture, experience and specification, program design, and the ticket plan. Reuse applicable approved decisions. Do not repeat gates without cause.
- Implement only authorized work. Factory execution requires an approved issue, consistent applicable engineering and UI baseline, satisfied dependencies, and explicit dispatch authorization. A small direct edit does not require a fabricated epic or backlog.
- Stop affected work if an approved requirement, design decision, or execution boundary must change. Explain the conflict and return to the relevant approval gate.
- Preserve unrelated changes. Do not expand scope, invent requirements, or introduce infrastructure without a demonstrated need.

## Authoritative context

Read the records relevant to the task, not the entire documentation tree.

| Record | Use |
|---|---|
| `README.md` | Project overview and setup |
| `docs/research/` | Evidence and applicable standards |
| `docs/requirements/` | Approved requirements and scope |
| `SPEC.md` and linked `docs/specifications/` | Normative behavior and conformance |
| Public schemas / protocol contracts | Canonical interface syntax |
| `ARCHITECTURE.md` | System design and implementation status |
| `EXPERIENCE.md` (UI) | Approved interaction design and task flows |
| `DESIGN.md` (UI) | Approved visual rules and references |
| Token/component source and Storybook (UI) | Actual styling, component contracts and rendered evidence |
| Adopted standards snapshot | General and language-specific engineering rules |
| `docs/adr/` | Architectural decisions |
| Issue tracker | Approved epics, tickets, program design, and dependencies |
| `REVIEW.md` | Required verification and its rationale |
| `.factory/policy.yaml` | Review routing and execution limits |
| `docs/verification/` | Formal properties and coverage |

Use stable identifiers, exact approved snapshots and scoped traceability. Check reference integrity, semantic compatibility and material changes before approval, dispatch, review, and merge. Resolve contradictions at their canonical owner. Hold affected work until coordinated changes and approvals are valid. Do not invent new specs for a trivial change. Do not treat issue closure, mutable labels, or chat history as proof of approval or integration. Record durable decisions and evidence at work boundaries. Do not maintain duplicate specifications.

## Skill selection

Use the installed skill for the authorized activity. Follow its required references and completion criteria. Respect harness invocation restrictions. When a required skill cannot run, report the blocker rather than silently substituting a weaker process.

| Activity | Skill |
|---|---|
| Decide next activity or ask about capabilities | `advise-workflow` |
| Initialize, configure or audit repository tooling | `setup-repository` |
| Investigate evidence and standards | `research` |
| Establish business requirements | `discover-requirements` |
| Design system architecture and ADRs | `design-architecture` |
| Design user journeys and interactions | `design-experience` |
| Develop visual rules and reusable components | `design-system` |
| Define normative system behavior | `define-specification` |
| Define capability scope | `define-epic` |
| Design files, signatures, flows, and tests | `design-program` |
| Define and consolidate vertical slices | `define-tickets` |
| Execute an authorized issue batch | `software-factory` |
| Implement one approved ticket | `implement-ticket` |
| Independently verify a change | `verify-change` |
| Create or update documentation | `maintain-documentation` |
| Establish a formal property check | `create-formal-verification` |
| Restore formal verification correspondence | `maintain-formal-verification` |
| Assess the review route | `assess-change-risk` |
| Apply engineering rules | `engineering-standards` |
| Apply Python rules | `python-standards` |

Use `first-principles` and `show-me` when available and useful. Do not load all skills for every task.

## Engineering standards

Use `engineering-standards` during architecture, program design, implementation and review. Use `python-standards` for affected Python code. For other languages use the adopted general standards and project conventions. Load only applicable references. Adopt or change standards through existing architecture and baseline approval. Do not silently migrate legacy code or use an unapproved skill revision. Escalate material conflicts. Independently verify applicable rules and actual check results.

Project adoption (complete and approve during architecture design):

- General profile: `engineering-standards`.
- Language profiles and scope: <select applicable profiles or existing approved conventions>.
- Standards snapshot: <immutable approved locator and revision or content digest>.
- Material exceptions: <accepted ADR/scoped design references or none>.

These placeholders are not an approval. Preserve existing approved conventions until adoption. The advisory skill recommends a route only; it does not dispatch work.

## Implementation and verification

- Follow approved architecture, public contracts, and repository conventions. Deliver working vertical slices. Use behavior-driven tests and the smallest sufficient implementation.
- Use the actual repository build, test, lint, and verification commands. Do not invent commands or check results. Record unavailable checks and their reasons.
- Preserve acceptance criteria, security boundaries, and business invariants. Never weaken tests or controls to obtain a pass. Check documentation impact and affected formal properties.
- Verify the exact candidate revision against the approved specification independently as required by `REVIEW.md`. Validate integrated intended workflows separately from conformance. Use fresh review contexts when supported. Distinguish a candidate, verified change, integrated change, and accepted outcome.

## Review and execution policy

Use the approved `.factory/policy.yaml` from the trusted base. If it is missing, offer the factory template. Obtain approval before setup or modification. Do not overwrite existing policy.

Respect execution budgets across retries and restarts. Escalate exhausted budgets, repeated failures, material uncertainty, or missing required evidence.

Do not approve your own work, bypass branch protection, or grant merge authority to a model. Keep gate credentials and trusted controls separate from worker execution. If enforcement is absent, block unattended integration. Publication, dispatch, merge, and deployment require their respective authorization.

## Documentation and communication

Apply the factory writing standard and ASD-STE100 guidance. Do not claim compliance without verification. Use Diátaxis for reader-facing documentation. Keep requirements, ADRs, and specifications in their own formats. Do not rewrite approved requirements to match defective code.

Lead with the result. Use concise tables, diagrams, and simple examples where they improve understanding. During discovery and design, ask one consequential question at a time. Report decisions, evidence, limitations, and the next required action. Do not report unverified work as complete.

## Experience and design system (UI only)

Use `design-experience` for material UX decisions and `design-system` for material visual rules or component foundation. Read applicable EXPERIENCE.md, SPEC.md, DESIGN.md and actual tokens/components/stories before UI work. Reuse the approved UI foundation; propose shadcn/ui and Storybook for new compatible React frontends. Do not install or update specialist skills without authorization. Keep prototypes isolated, and obtain production authorization before promotion. Verify actual rendered behavior, accessibility, consistency and applicable integrated tasks. Do not refresh visual baselines to conceal regressions. Use the shared experience contract; skip these activities for non-UI work.

## Repository-specific configuration

Use `setup-repository` for authorized governance or tooling setup; use audit for read-only inspection. Verify actual local commands, CI results and remote controls. Initialization does not establish factory readiness. Do not silently overwrite existing settings or weaken checks. Use existing project instructions and verified tooling. When establishing the project, record the actual setup and verification commands and any local conventions here or in the appropriate scoped `AGENTS.md`. Keep this file current and concise. Do not duplicate skill procedures, policy values, or architecture details.
