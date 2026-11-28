---
title: "Human control plane for software factories"
status: approved
scope: product
baseline: none
approval:
  date: 2026-11-27
  reviewed_draft_sha256: 14bc583fa95ef47f70cda3b1becf3e86d73d87bd113b6457c78ebe8b722433e1
  source: "Product owner approval in the V1 discovery conversation"
---

# Product discovery

## 1. Executive summary

Engineers need to maintain an accurate understanding of software as agents change it. They need to know what arrived, how it changes the system, why it was done, and where the evidence stops. The product owner confirmed that reducing cognitive and intent debt is the primary objective. A living architecture is the proposed way to keep that understanding connected to the evolving software.

The first workflow is to keep pace with agent-led architecture changes as their pull requests merge. Narys proposes a starting map for one area from the repository. A maintainer can confirm or correct the proposal. Engineers can then see what changed in the architecture, the behavior it affects, and the recorded reason for the change. The first release uses existing rationale records, shows their source, and flags gaps. Show deployment separately when it can be confirmed.

## 2. Users and business context

| Actor | Responsibility | Problem or need |
|---|---|---|
| Engineer working with coding agents | Direct and maintain a system over multiple changes | Keep an accurate mental model of the areas agents are changing, including work delegated by other engineers. |
| Maintainer familiar with the selected area | Confirm or correct the starting architecture | Establish a reliable starting point with a brief check of a proposed map. |
| Engineer responsible for a design decision | Explain why a consequential choice was made and when it should be revisited | Preserve enough rationale for future engineers to distinguish a deliberate decision from an incidental implementation detail. |
| Product owner | Choose the initial user, workflow, and release boundary | Validate a recurring need and the cost of addressing it before approving scope. |

Technically experienced individuals and small teams with frequent agent use are the initial audience hypothesis. The first adopter, frequency of the problem, and buyer remain unverified. Existing alternatives include repository diagrams and ADRs, agent handoffs, and human-authored tours. [Opportunity research](../research/2026-11-27-human-control-plane.md#42-competitive-capabilities)

## 3. Current business process

Illustrative workflow to check against direct examples from engineers.

1. An engineer delegates a change. The goal and decision rationale may appear in an issue, an agent session, or a design record.
2. The change lands. Code and delivery records can show some of what changed. They can leave open where a responsibility now lives and why it moved.
3. An engineer needs to explain the current system, investigate a problem, or change it again. They reconstruct the relevant behavior from code, diffs, conversation, and decisions.
4. The engineer makes or postpones a decision. Missing rationale can force them to ask someone else, repeat an earlier investigation, or proceed on an assumption.

Reading decisive evidence and forming a mental model are necessary work. Searching dispersed artifacts and reconstructing the same context repeatedly are potential costs to reduce. Their frequency and impact in the target workflow are unknown.

## 4. First-principles analysis

| ID | Premise | Type and basis | What follows |
|---|---|---|---|
| P01 | Some engineering tasks depend on predicting where behavior can change and what else can be affected. | Reasoning from the work of diagnosing and modifying software. | Test understanding through an explanation or prediction that a knowledgeable maintainer can check. |
| P02 | An accurate description of behavior may exist even when the reasons for it are missing. | Distinction between observed behavior and intent. | A system map can help with understanding. Recovering intent also needs a trustworthy record or a human confirmation. |
| P03 | Humans can miss changes even when an agent generates an accurate summary. | Product hypothesis. Reading a summary and forming a usable mental model are different activities. | Evaluate whether the engineer can use the understanding on a follow-up task and correctly identify uncertainties. |
| P04 | The cost of keeping a map current can offset the value it creates. | Adoption hypothesis. Source relationships and design decisions can evolve at different rates. | Compare time spent creating and maintaining useful context with the time and errors it saves across repeat use. |

The strongest counterexample is a team whose existing handoff practice already keeps engineers oriented. A short, human-checked handoff with a source link and rationale is a comparison worth trying. A living architecture could add value by showing a change in the context of existing responsibilities and relationships, then preserving that context as subsequent changes arrive. This depends on the reliability of its relationships and the effort needed to maintain them. [Research on cognitive and intent debt](../research/2026-11-27-human-control-plane.md#41-challenge-the-premises)

## 5. Target process and product

1. The maintainer selects one area of an existing repository. Narys proposes a map from repository evidence at a known revision. The maintainer can confirm the proposal or correct it before confirmation.
2. An agent-led pull request merges into the shared codebase. This triggers the architecture update for the area.
3. The engineer can see what changed in the relevant architecture and which behavior it affects. For example, a change may move a responsibility, alter an interface or dependency, or change a flow through existing components.
4. The engineer can see the reason recorded in the team's existing workflow and identify its source. When the available records provide no reason, the engineer can see that the rationale is missing.
5. The engineer updates their understanding and can explain the changed behavior or a likely consequence to another engineer. They can distinguish the merged change from a confirmed deployment.

Example. An agent moves payment retries out of checkout and into a worker. An engineer learns that retries now belong to the worker and sees why the change was made if that reason is recorded. They can see that the change has been integrated even if its deployment has not yet been established. If the rationale is missing, that gap remains visible.

The explanation should be available without requiring the engineer to search through long or potentially stale Markdown files or initiate a conversation with a coding agent. Source records remain available for inspection when needed. Which actions belong on a canvas and which belong in another view remain experience design decisions.

## 6. Domain and rules

| Term | Working definition |
|---|---|
| Cognitive debt | A gap in an engineer's or team's understanding that makes future work harder. |
| Intent debt | Missing, stale, or disconnected goals, constraints, and rationale that make deliberate change harder. |
| Living architecture | A representation of how a system is organized that evolves with the software and links relevant observations to decisions and evidence. |
| Starting map | A representation of the architecture of one selected area at a known repository revision. It is proposed from repository evidence, then confirmed or corrected by a maintainer. |
| Architecture change | A change to how the system is organized, such as a change in component responsibilities, dependencies, interfaces, or flows. |
| Merged change | A change integrated through a pull request into the shared codebase. Merge triggers the first workflow. |
| Confirmed deployment | Evidence that a revision containing the change has been deployed to an identified environment. This observation can arrive after merge. |
| Recorded rationale | An explanation of why a change was made, attributed to an existing source such as an issue, pull request, plan, or decision record. |

The following draft requirements reflect confirmed product direction. The exact release boundary still needs approval.

| ID | Business requirement / required outcome | Source and rationale | Observable success condition |
|---|---|---|---|
| REQ-001 | When an in-scope agent-led PR changes the architecture and merges, explain the architectural change and the behavior it affects. Make the explanation available in the normal workflow without requiring a search through repository documents or a conversation with the agent. | D01, D02, D03, D06. Engineers need to keep their mental model current. | After a PR moves retry handling from checkout to a worker, an engineer can identify the old and new owners and explain the affected retry flow with reference to the merged revision. |
| REQ-002 | Show the recorded rationale for an in-scope change and its source. Flag missing rationale when available records do not explain the change. | D02, D05. Engineers need to recover the reason for a change and see where it came from. | Given one PR with a linked rationale and one with none in available records, the engineer can locate the source for the first and identify the gap for the second. |
| REQ-003 | Show confirmed deployment as a separate observation from merge. | D03. Engineers need to distinguish integrated code from code deployed to an environment. | For a merged PR, the engineer can distinguish an unconfirmed deployment from a later observation that confirms it for an identified environment. |
| REQ-004 | Propose a starting map for one area from repository evidence at a known revision. Let the maintainer confirm or correct it without building it by hand. | D07. The engineer needs a credible point of comparison with low setup effort. | Given one area of an existing repository, the maintainer can identify its proposed components and relationships, correct a mistaken responsibility, and confirm the resulting map. |

## 7. Value and feasibility hypotheses

| Hypothesis | Available evidence | Candidate validation |
|---|---|---|
| An engineer can keep their understanding current with less investigation as agent changes land. | Conceptual and prototype evidence. No trial for this product. | Compare with the team's ordinary handoff on real changes. After seeing what landed, have the engineer explain the changed behavior and predict one consequence. Check their reasoning against source and maintainer knowledge. |
| Existing records contain enough useful rationale for the first workflow. | Cognitive Tours supplies a design precedent. Coverage of rationale in the target teams' records remains unvalidated. | Test whether an engineer can explain a consequential reason and find its source. Include missing or contradictory rationale and observe whether gaps recur across meaningful changes. |
| Maintaining a living representation has acceptable overhead. | Existing tools establish possible mechanisms. Adoption cost in the target workflow is unknown. | Measure confirmation and upkeep across repeated changes. Compare with a maintained handoff or tour. |

## 8. Release scope

The approved V1 boundary is one area in one existing GitHub repository per pilot setup. Use known agent-led PRs to evaluate the workflow. The experiment measures whether engineers can keep up with architecture changes while staying in their existing development and delivery process.

| Capability | Required outcome | Priority or decision |
|---|---|---|
| Establish the starting architecture | Propose one repo-derived map. A maintainer can confirm or correct it. REQ-004. | Confirmed direction |
| Explain architecture changes at merge | Show the architecture change and its affected behavior in context. REQ-001. | Confirmed direction |
| Explain why | Show existing rationale with its source, or identify the gap. REQ-002. | Confirmed direction |
| Show deployment evidence separately | Distinguish merged changes from confirmed deployment observations. REQ-003. | Confirmed direction |

### Non-goals

Standalone behavior changes are deferred. For example, increasing the retry limit from three to five while retaining the same responsibility and flow falls outside the architecture change workflow. The proposed boundary also defers repository-wide architecture coverage, automatic agent attribution across providers, prohibited-dependency checks, agent dispatch, and policy-controlled integration. Revisit a dedicated rationale handoff if the pilot shows recurring gaps in existing records.

### Release acceptance

1. Set up one selected area. A maintainer reviews the repository-derived proposal, can correct a mistaken ownership claim, and confirms the starting map.
2. Replay or observe a merge that moves retry handling from checkout to a worker. The engineer uses the architecture view to explain the old and new responsibility, describe the affected retry behavior, and locate the documented rationale. They can distinguish the merged revision from a later confirmed deployment.
3. Exercise a comparable change with missing rationale and unconfirmed deployment. The engineer identifies the gaps. Include a retry-limit-only change to check the scope boundary.

Compare the engineer's explanation and prediction of a follow-up change with a knowledgeable maintainer's account. Use the team's current GitHub handoff as the comparison and record time, accuracy, setup effort, and repeat use. These observations test feasibility and value. Commercial demand remains unvalidated.

## 9. Constraints and open decisions

| ID | Constraint or question | Status | Owner or next action |
|---|---|---|---|
| D01 | The primary product objective is to reduce cognitive and intent debt about software that agents change and ship. | Confirmed direction | Product owner. |
| D02 | Help engineers keep up as agent-led changes land. Make what changed, the architectural effect, and the available rationale easy to understand without requiring a search through repository documents or a conversation with a coding agent. | Confirmed direction | Product owner. |
| D03 | Surface architecture changes when a PR merges. Show deployment separately when evidence confirms it. | Confirmed direction | Product owner. |
| D04 | Determine what engineers can already recover from their current tools and at what cost. | Unvalidated | Use real engineering examples and a comparison workflow. |
| D05 | Use the team's existing rationale records in the first release. Show their source and flag missing rationale. Revisit a dedicated handoff if important gaps recur. | Confirmed direction | Product owner. |
| D06 | Focus V1 on architecture changes and explain the behavior those changes affect. Defer standalone behavior changes. | Confirmed direction | Product owner. |
| D07 | Propose a starting map for one area from the repository. Allow a brief maintainer confirmation or correction without manual map creation. | Confirmed direction | Product owner. |
| D08 | Limit the pilot setup to one selected area of one existing GitHub repository and use known agent-led PRs. | Approved release boundary | Product owner approval recorded below. |
| D09 | Establish how reliably repository evidence can support a proposed map and architecture updates at acceptable setup and upkeep cost. | Unvalidated | Carry to experience design and architecture. Use real before-and-after PRs to test the proposal. |

## 10. Evidence and approval

The product owner's direction on November 27, 2026 establishes the objective in D01, the first workflow in D02, the delivery milestone in D03, the approach to rationale in D05, the kinds of changes in D06, and onboarding in D07. The earlier research supplies evidence about alternatives and proposed evaluation methods. Its PR review recommendation is background for discovery. The product owner approved these V1 requirements and release scope as written. The approval metadata identifies the exact reviewed draft. The prose is STE-inspired. [Opportunity research](../research/2026-11-27-human-control-plane.md)
