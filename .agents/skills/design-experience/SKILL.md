---
name: design-experience
description: >-
  Establish or revise the user experience through a human-led design interview, evidence-based interaction design and rendered prototypes. Use for new products with a UI or material changes to user journeys, navigation, interaction states or human-agent workflows. Produce an approved EXPERIENCE.md and inputs to the normative specification, not production feature code.
---

# Experience design

## Intent

Help the human decide how the product should work before agents implement it. Optimize the experience for successful tasks, comprehensible state, efficient operation, accessibility and recovery from errors. Make design decisions through concrete examples and observable prototypes rather than requiring the human to know design terminology.

Read the [experience template](references/experience.md), [interview and prototyping guidance](references/design-interview.md), [experience contract](../software-factory/references/experience-contract.md), [writing standard](../software-factory/references/writing.md) and [work contract](../software-factory/references/work-contract.md). Read only relevant existing product artifacts and approved specialist skills from the [specialist catalog](../design-system/references/specialist-skills.md). Use `first-principles` or `show-me` if installed. Do not load every design skill by default.

## Methodology

### 1. Establish the experience boundary

Inspect the repository, approved requirements, current interface, relevant architecture, `SPEC.md`, `EXPERIENCE.md` and `DESIGN.md` if present. Identify the target users, intended tasks, operating environment, frequent actions, existing constraints and current evidence. Reuse accepted decisions. If there is no user interface or the task changes no material interaction, report non-applicability and stop. A headless SDK does not need an experience document.

Distinguish observed user evidence, standards and heuristics, founder preferences and assumptions. Do not claim user interviews or usability results that did not occur. In the absence of user research, use the intended user's perspective, task walkthroughs and heuristic analysis. Record material hypotheses and limitations. Do not postpone all design solely because interviews are unavailable.

### 2. Explore interaction alternatives

Research relevant interaction patterns and comparable products. Prefer authoritative guidance and actual interfaces over ungrounded design trends. Record links and the specific observed pattern; separate observations from interpretations. Do not copy proprietary assets or assume a reference's implementation. Consider a familiar, simpler interaction alongside novel options. Compare options against task completion, information needs, frequency, error recovery, accessibility and feasibility. Investigate questions that can be answered without the human.

### 3. Conduct the design interview

Ask one consequential question per turn, in dependency order. Begin with the user's goal and task, then workspaces and navigation, information hierarchy, selection/editing, state feedback, approval and recovery, accessibility and material responsive constraints. Ask about collaboration only when required. Revisit earlier decisions when evidence reveals a conflict.

For each meaningful choice, show concrete alternatives with the same realistic task and data. Explain the effects in ordinary language and recommend one with reasons. Use a short task flow, wireframe or rendered prototype where it clarifies a choice. Do not ask for preferences on every minor detail. Resolve consequential uncertainty relentlessly, not indefinitely. Record each accepted decision in the working experience record. Keep drafts and approvals distinct. Do not restart the entire interview for a feature delta.

### 4. Prototype and evaluate

Agree on a bounded, disposable exploration scope before creating executable prototypes or installing tools. Use the existing frontend or a safe isolated preview when authorized; use an adopted prototyping skill where useful. Begin with low-fidelity flows and use interactive code for decisions that depend on actual interaction. Show genuinely distinct solutions, not recolored copies. Keep constant data and tasks for comparison. Use synthetic data, no production credentials or real side effects. Include normal, empty, loading, failure, cancellation and pending approval states as applicable.

Render and inspect the prototypes. Give the human an actual accessible preview, screenshots or a runnable local command and precise limitations. Do not claim to have shown or tested an interaction if browser access is unavailable. Record the observed tasks, results and unresolved uncertainties. Selecting a prototype does not authorize promotion. If a necessary preview or tool is unavailable, mark the visual/interaction decision provisional and ask for the smallest next action.

### 5. Establish the experience baseline

Write or revise root `EXPERIENCE.md` using the template. Record approved task flows, workspace responsibilities, interaction decisions, prototype references and intended-use acceptance. Use stable UX identifiers for consequential decisions or journeys and link to requirements. Use Mermaid for flows or state where helpful. Record actual evidence and open assumptions. Keep the document concise by linking detailed prototypes and contracts. Do not specify colors, component implementation, technology choices or duplicate normative behavior.

Hand material behavior to `define-specification` and technical implications to `design-architecture`. Resolve inconsistencies before approving the relevant engineering baseline. When SPEC defines a mandatory obligation, EXPERIENCE references it rather than independently redefining the guarantee. Present the exact scoped experience revision and any required changes for human approval. Only then identify the inputs to epics and the design system. Do not publish issues or begin production implementation as part of this approval.

## Response contract

During the interview use **Decision**, **Options** (compact table or visible prototype), **Recommendation**, and one **Question**. Refer to the current draft and accepted decisions without repeating the entire conversation. Use 150–300 words for typical replies, excluding essential diagrams. At a prototype review identify the task, variants, preview references, observed result and limitation. At completion show the approved or pending revision, key journey/decision IDs, unresolved assumptions, relevant architecture/specification impact and the next skill. Never treat a generic “looks good” as approval of unseen or unrelated artifacts.

## Completion criteria

The relevant experience is approved at an exact revision, or explicitly provisional/blocked. Intended journeys, major interface states and consequential interactions are understandable and traceable. Necessary feasibility, accessibility and intended-use concerns are resolved or recorded with a hold. The human has inspected the applicable rendered prototypes or explicitly approved a lower-fidelity decision with its limits. There is no fabricated user evidence, unapproved production code, competing product contract or silent scope expansion. Further questions stop when they cannot materially change the experience or acceptance.
