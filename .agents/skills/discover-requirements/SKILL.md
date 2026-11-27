---
name: discover-requirements
description: >-
  Investigate a business idea or feature through first-principles analysis and structured human questioning. Establish the business process, value hypothesis, domain requirements, proposed solution and release scope. Save an approved discovery document under docs/requirements.
---

# Product and requirements discovery

## Intent

Determine whether a proposed product is worth pursuing and what it must achieve. Help the human understand the underlying business problem before committing to software, architecture or features.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md) and [requirements template](references/requirements.md). Use the installed `first-principles` skill for analysis. If unavailable, identify objectives, premises, mechanisms, alternatives, counterexamples and independent tests directly.

For products with a UI, identify intended user tasks and operating context. Route unresolved interaction and workspace choices to [design-experience](../design-experience/SKILL.md) before approving the relevant normative specification. Do not prescribe a visual language in requirements or manufacture user research.

## Methodology

### 1. Establish context

Read the relevant research reports, existing discovery, approved architecture and relevant product behaviour. For a greenfield project, record what is not established. Separate the desired outcome from the proposed product. Identify the intended user, buyer, beneficiary and decision owner when relevant.

### 2. Analyze the business process

Trace the current workflow from trigger to outcome. Identify actors, inputs, decisions, records, state transitions, constraints and failure paths. Determine what work is necessary, what work exists because of the current approach, and what can be removed. Show the flow where it clarifies the problem. Do not assume software is the best solution.

### 3. Resolve consequential questions

Ask one material question at a time. First investigate answers available in evidence or existing decisions. For each question, explain its importance, state the relevant facts and options, and recommend an answer when justified. Use concrete scenarios to expose ambiguity. Record confirmed answers in the draft. Do not ask the same question again unless new evidence invalidates the answer.

Examine the value proposition, existing alternatives, switching and integration costs, buyer incentives and adoption risks. For a business idea, separate technical feasibility from demand and economic viability. Identify the evidence required to validate the value hypothesis. Do not treat market size, interview claims or invented figures as proven demand.

### 4. Derive the proposed product and scope

Reconstruct the simplest approach from the business objective and constraints. Identify the target workflow and the domain concepts, rules and invariants necessary to support it. Define the high-level capabilities, measurable success where evidence permits, and observable release acceptance. Assign stable `REQ-<number>` IDs to binding business requirements under the [traceability contract](../software-factory/references/traceability.md). Give each its source, necessity and observable success condition. Describe normal and consequential degraded operating scenarios, including actor and intended environment. Keep detailed normative behavior for `define-specification`. Distinguish confirmed requirements, hypotheses, non-goals and deferred features. Do not silently turn candidate features into commitments.

### 5. Consolidate and approve

Use the requirements template. For a new product, write `docs/requirements/product.md`. For a feature or release delta, write `docs/requirements/<slug>.md` and link the existing baseline. Update the canonical product document only if its approved content changes. Use evidence links to research rather than copying the research. Validate each material requirement for clarity, necessity, feasibility, consistency, testability and redundancy. Compare intended workflow with stakeholder expectations. Ask the human to approve the exact discovery and release boundary. Carry technical uncertainties into the applicable planning decision with an owner and required evidence, not a hidden assumption. Record unresolved blockers and decisions that remain provisional. No production code or tracker publication.

## Response contract

During questioning show **Understanding**, **Evidence and implications**, and **Decision required**. Use a small table or Mermaid diagram when it helps. Ask one question and wait. At completion show the problem, value hypothesis, confirmed scope, exclusions, critical open assumptions and artifact path/revision. Request explicit approval.

## Completion criteria

The human approves the problem, target process, proposed value and scope, with observable success and unresolved hypotheses clearly identified. The approved requirements are the source for architecture and normative specification. Approval does not prove commercial viability or integrated product validation. Discovery may proceed with accepted uncertainty if the next activity is a defined validation experiment. Block implementation when a required decision is unresolved.
