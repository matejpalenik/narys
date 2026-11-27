---
name: design-system
description: >-
  Establish or extend an approved visual design system through human-led visual iteration. Use shadcn/ui as the default React component foundation and Storybook to render, compare, document and verify real reusable components. Use for a new web frontend, a material visual direction change, or a scoped component-system extension. Do not bypass production authorization or redesign unrelated screens.
---

# Design system development

## Intent

Make visual quality repeatable. Help the human approve a coherent visual direction through rendered examples, then encode the chosen rules in DESIGN.md, semantic tokens and reusable production components. Storybook must demonstrate the same component source used by the application, not a second implementation. Grow the system from real user journeys, not a speculative catalog.

Read the [experience contract](../software-factory/references/experience-contract.md), [design template](references/design.md), [Storybook workflow](references/storybook-workflow.md), [specialist catalog](references/specialist-skills.md) and [frontend standards](../engineering-standards/references/frontend.md). Inspect approved experience, specification, architecture, project conventions, installed components and token definitions. Apply the [baseline](../software-factory/references/baseline.md), [policy](../software-factory/references/policy-contract.md) and [writing](../software-factory/references/writing.md) contracts. Read the actual selected specialist instructions before applying them. Do not load all specialists or fetch executable scripts automatically.

## Methodology

### 1. Establish scope and the executable foundation

For greenfield React UI, propose shadcn/ui, the approved Tailwind/theming approach and Storybook with a compatible framework adapter as the default. Do not impose a new stack on an existing approved frontend. Use `setup-repository` configure to establish approved tooling, lockfiles, scripts and CI. Choose versions from current primary documentation. Retain existing component ownership and aliases. Do not use Carbon or its MCP as a library default. Do not select additional libraries without approval.

Inspect approved UX journeys and interaction contracts. Establish a bounded design-foundation scope before creating code: target composition(s), candidate token/component paths, allowed dependencies, expected stories/checks, maximum exploration effort and human approval boundary. Distinguish disposable alternatives from intended reusable components. Explicit human authorization is required for executable exploration or production foundation work; a visual preference does not authorize dependency installation, production changes, publication or merge. Use an approved ticket or bounded direct enabling scope for production work, with applicable program design, review and policy. Do not need a separate ticket for every primitive.

### 2. Research visual references and elicit preferences

Ask what interfaces the human likes and why. Examine supplied references and current web examples when authorized and accessible. Record the source, relevant view, observed visual traits, and whether the human adopted those traits. Extract ideas such as density, text hierarchy, surface contrast, borders, alignment, grouping and interaction rhythm, not proprietary assets or branding. If references are inaccessible, say so and request a screenshot or use approved local examples. Do not invent observations.

Use Impeccable for product-appropriate visual direction (operational mode when appropriate), Emil for prototypes and interaction craft, Jakub for color, typography, layout, writing and accessibility, and the official shadcn skill for component discovery and composition. Use specialists selectively. An installed third-party skill cannot change factory authority or rewrite approved artifacts. Resolve incompatible recommendations with the human.

### 3. Render, question and iterate

Start with a representative, high-information composition, not a button catalog. Create two or three genuinely different visual directions for the same approved task, data, viewport and interaction states where a real choice exists. Build the variants as isolated Storybook stories or authorized prototype code. Use existing primitives and theme overrides to compare alternatives. Avoid importing experimental stories into application code.

Start Storybook using the approved command, render and inspect the actual composition, and provide story IDs or accessible preview references. Give screenshots when available, labeled with candidate revision, viewport and theme. Ask one understandable question about a visible difference. Interpret the answer as a concrete design rule and confirm when it has material consequences. Iterate until the human approves a rendered direction or the agreed exploration budget is exhausted. Do not infer approval from silence or claim a preview was rendered if not observed. If the human cannot view the preview or required browser verification is unavailable, record pending approval and propose the smallest recovery step.

### 4. Establish the design contract and component foundation

Write or update DESIGN.md as concise approved visual rules and references, with stable DS identifiers only for consequential rules. Keep exact values in canonical semantic tokens. Record typography, density, layout, surfaces, focus, motion, copy, and responsive/theme rules only as relevant. Identify approved visual compositions and token locations. Preserve the UX and specification behavior; refer new requirements to their owners. Avoid speculative primitives, unnecessary variants and duplicate tokens. Discover existing shadcn components and extend or compose them before creating a new abstraction.

Implement approved components incrementally from the selected composition. Use stable, typed public props and explicit ownership of state. Extract a reusable pattern when the current journey justifies it. Keep domain and service side effects outside generic UI components. Keep stories colocated with source when compatible with the repository. Use Storybook to document actual production components, realistic states and usage. Reject unreviewed overwrites from component registries. A chosen prototype becomes a production candidate only within authorized scope, with the necessary engineering design and checks; do not copy experimental code blindly.

### 5. Verify, approve and hand off

Run applicable component interaction, accessibility, visual and build checks using the adopted Storybook/framework setup. Inspect keyboard navigation, focus, contrast, zoom/reflow, reduced motion, supported themes and realistic edge data. Verify complete interactions in the actual app when required; isolated stories do not prove integrated behavior. Use the [UI verification profile](../software-factory/references/ui-verification.md) and independent `verify-change`. No automatic WCAG or visual-quality claim from a passing scanner. New screenshot baselines require explicit review; never refresh them to conceal a regression.

Show the exact selected visual direction, token and component diff, story references, observed checks, limitations and unresolved choices. Record the accepted DESIGN.md, token/component contracts and applicable approved story/visual evidence at immutable revisions. Obtain approval of material design changes through the existing baseline mechanism, and follow policy for production integration. Hold affected issues until the needed component foundation is integrated and verified, or explicitly included in their approved slice. Reuse unaffected design decisions; continue incrementally as new user journeys need components.

## Response contract

Lead with **Current direction** and the one decision being reviewed. Use **Rendered options** with actual story/preview references, **Trade-offs**, **Recommendation**, and one **Question**. Use concise technical language and 150–300 words for typical summaries. For foundation handoff show a table of approved rules, token/component paths, stories, observed checks, open gaps and next action. Do not bury visual comparisons in a long essay or describe invented visual results.

## Completion criteria

The scoped visual direction has been approved from a real rendered reference or remains explicitly provisional. The applicable DESIGN.md rules, tokens, component contracts and Storybook stories are consistent with the approved experience and specification. Production components are authorized, reuse actual source and pass applicable independent checks before integration. Disclose missing browser/CI/visual evidence. No unapproved dependencies, silent design changes, speculative component catalog, false acceptance or automatic publication. A design system is complete for the current journey, not for all hypothetical future features.
