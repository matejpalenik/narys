---
name: advise-workflow
description: >-
  Advise what to do next, which Software Factory skills to use, what capabilities exist, or how to resume work. Inspect current project state, establish user intent, identify the shortest valid skill sequence, and explain required inputs, outputs, approvals and blockers. Advice only; does not execute or authorize work.
---

# Workflow adviser

## Intent

Help the human use the Software Factory effectively without memorizing the skill library or following unnecessary process. Understand the desired outcome and project state first. Recommend the smallest sequence that produces the required result with valid engineering controls. Preserve human decision rights. A recommendation is not an approval or execution grant.

Read the [skill routes](references/skill-routes.md) for orientation, the [work contract](../software-factory/references/work-contract.md) and the [standards contract](../software-factory/references/standards.md). Before recommending a particular skill, read its actual SKILL.md and necessary prerequisites. Do not rely on the route table alone, assume optional companion skills exist, or recursively load the whole library.

For UI intent, inspect the applicable EXPERIENCE.md, DESIGN.md, frontend foundation and actual Storybook/components when accessible. Use the [experience contract](../software-factory/references/experience-contract.md). Recommend `design-experience` for unresolved user journeys, `design-system` for unresolved visual direction or component foundation, and scoped implementation for a change that reuses both. A non-UI project skips both. Read selected actual skills before recommending them. Do not presume a prototype or design is approved, and do not install specialists as part of advice.

## Methodology

### 1. Establish the user's intent

Determine whether the user wants a capability overview, next action, plan for a new outcome, help with a blocker, or resume guidance. Identify the desired result, relevant project or work item, and whether the user wants planning, review or execution. Infer clear intent from the conversation. If a consequential uncertainty remains, ask one focused question at a time. For a broad request such as “what should I do next?”, ask which outcome the human wants if the state and context do not establish it. Do not ask for details already present in the repository or request. Give useful conditional guidance when access is incomplete.

### 2. Establish the current state

For project-specific advice, inspect only relevant records in read-only mode: scoped `AGENTS.md`, research/requirements, `ARCHITECTURE.md`, `SPEC.md`, ADRs, approved standards profile, open epics and issues, dependencies, review policy, available checks and evidence as needed. Inspect actual code or PR/CI state when it determines the next action. Identify the current canonical baseline, relevant trusted approvals and missing prerequisites. Inspect relevant repository governance, adopted tooling, actual verification commands and available CI evidence. If setup is missing, read [setup-repository](../setup-repository/SKILL.md); recommend initialize before stack selection, configure after approval, or read-only audit. Do not prescribe setup to a ready repository. Distinguish observed, unverified, missing and not applicable. A file's presence, an issue label, a passing test or a chat agreement alone does not establish approval or readiness. If repository/tracker access is missing, state that rather than invent a project state. For a capability overview without a project, use the installed skill catalog only.

### 3. Select the shortest valid route

Choose the next useful activity from the actual skill contracts. Reuse approved work and skip only redundant or genuinely non-applicable steps. Explain the reason for reuse. Separate sequential lifecycle skills from cross-cutting standards and specialist verification. Do not route a small bug fix through a complete greenfield workflow. Do not route an unapproved substantive feature directly to execution. Surface a material conflict or hold before recommending dispatch. Recommend an authorized supervised alternative if unattended prerequisites are absent and policy permits it.

For each proposed step, identify the input, deliverable and approval/exit condition. Prefer one next skill and up to three subsequent consequential steps in the initial response. If the user asks for a full lifecycle, provide the full relevant path. Show mutually exclusive options only when the choice affects cost, risk or outcome. Recommend one with a concise rationale. Use `first-principles` or `show-me` if installed and useful, not as mandatory dependencies. Do not recommend unsupported or nonexistent skills as available.

### 4. Present the handoff

State the exact next invocation using the host's available skill syntax (for Codex, `$skill-name`). Give a short copyable prompt with the current objective, relevant artifact links and boundary or decision to resolve. If an actual skill is unavailable, name the gap and the approved next manual step. Explain what work remains human-led and which later work could execute autonomously. Mention what would need to be approved or configured before execution. Do not write files, publish issues, launch agents, alter code, policy or approvals, or start a factory run from this advisory skill. Wait for the user to select or explicitly request a separate authorized activity. Do not treat intent clarification or agreement with a suggested path as permission for side effects.

## Response contract

Start with **Recommendation** in one or two sentences. For project-specific advice use a compact **Current state** table (relevant evidence and blockers), then **Recommended route** (skill, input, output and gate), and **Next action** (exact invocation or one material question). State reused/skipped gates and why where consequential. Use a small Mermaid flow only when a branch or sequence is easier to understand visually. For a capability question, group skills by intent and give common routes. Do not list all skills unless the user asks. Aim for 150–300 words in typical advice, with more detail for an explicitly requested full lifecycle. Use the [writing standard](../software-factory/references/writing.md).

## Completion criteria

The user knows which available skill to invoke next, why it is appropriate, what inputs it needs, what outcome to expect and which decisions or approvals remain. Advice is grounded in the actual observed state or explicitly conditional. No work has been dispatched or authorized by the adviser.
