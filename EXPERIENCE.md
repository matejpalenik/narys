# Narys experience

Status: approved
Scope: V1, one selected area in an existing GitHub repository
Requirements: REQ-001 through REQ-004 in the [approved V1 discovery record](docs/requirements/product.md). The reviewed draft has SHA-256 `14bc583fa95ef47f70cda3b1becf3e86d73d87bd113b6457c78ebe8b722433e1`.
Approval: The product owner approved this V1 experience draft as written on November 27, 2026 in the experience conversation. Reviewed draft SHA-256 `30d5796922cbeac73036cb68f120e579b2f64630c966f62ae659068ce38da8bb`.
Scope amendment: [UX-008](#14-automated-map-setup) replaces the earlier starting-map confirmation flow. The original approval records that earlier experience.

## 1. Experience intent

Help an engineer returning to a project understand a newly merged architectural change. They should be able to explain what changed, which behavior it affects, and why it was done when the reason is recorded. A maintainer first establishes a starting map by confirming or correcting a proposal from the repository.

The engineer begins the recurring task on the architecture canvas and opens recent merges from that workspace.

## 2. Users and context

| Actor | Goal and frequency | Context and constraints | Evidence or assumption |
|---|---|---|---|
| Engineer following agent-led changes | Understand a consequential change after it merges. | May know the area and have missed the original issue or coding session. | Approved workflow. Frequency and familiarity remain hypotheses. |
| Maintainer familiar with the area | Confirm or correct a proposed map during setup. | Can judge a component's responsibility from repository evidence and experience. | Approved workflow. Required confirmation effort remains unmeasured. |

## 3. Experience principles

- Keep the current area and the selected change clear. An engineer should be able to recognize what they are inspecting when switching between the change and a component. [Nielsen Norman Group usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- Make revision and deployment evidence easy to distinguish. Argo CD documents separate concepts for target, live, sync, and health. That separation informs the experience. [Argo CD core concepts](https://argo-cd.readthedocs.io/en/stable/core_concepts/)
- Present the minimum context for the task and provide a route to the source. A focused change view is familiar from GitHub's pull request diff. IcePanel shows a version timeline alongside an architecture model. These are reference patterns from product documentation. [GitHub pull request reference](https://docs.github.com/en/pull-requests/reference/pull-requests) · [IcePanel versioning](https://docs.icepanel.io/future-state-design/versioning)

## 4. Information architecture

### UX-003 — Workspace entry

The product owner chose the full-screen canvas and overlay on November 27, 2026. The canvas fills the project view below the navbar. Project controls and inspection panels appear on or over the map. The Railway references illustrate this use of a full working surface with controls and details in context. [Railway project canvas](https://docs.railway.com/projects#project-canvas)

**Recent merges** opens a panel over the map. Selecting a merge opens its details in the panel and keeps the list available for switching. The engineer can compare the architecture before and after the merge and open its evidence in context. Closing the details returns focus to the selected merge. Closing the panel returns focus to **Recent merges**.

### UX-004 — Starting map review

The product owner chose on-canvas review on November 27, 2026. The maintainer selects a component or relationship and sees its repository source at the proposed revision. They can apply a correction beside the selected item and see the proposal update. Confirmation applies to the starting map at the reviewed repository revision.

### UX-005 — Incomplete evidence after a merge

The product owner chose to show supported changes as soon as a PR merges and mark uncertainty on the affected part of the canvas. For PR #128, the after-merge map shows that Payments Worker now retries payments and labels Checkout's retry behavior as unconfirmed. Selecting Checkout explains the gap. The previous revision retains its own established behavior. The rationale and deployment evidence remain separately identifiable.

## 5. User journeys

| ID | Actor and trigger | Task steps and outcome | Requirements | Prototype and validation |
|---|---|---|---|---|
| UX-001 | Engineer opens the area after a meaningful merge. | Find the retry change, inspect the supported worker path and the uncertain Checkout behavior, locate the source of the reason, and identify what is known about deployment. | REQ-001, REQ-002, REQ-003 | Canvas-first selected in UX-003. Partial evidence decision rendered and tested in UX-005. |
| UX-002 | Maintainer sets up the selected area. | Inspect a component or relationship on the canvas, see its source, correct the proposal in the workspace, and confirm the starting map. | REQ-004 | On-canvas review selected in UX-004. Local prototype rendered and tested. |

## 6. Interaction states and recovery

| Journey | State | What the engineer needs to understand |
|---|---|---|
| UX-001 | Merged, deployment unconfirmed | The change is part of the shared code. Recognize what the available deployment evidence establishes. |
| UX-001 | Recorded rationale missing | Understand the observed architectural change and see the gap in its rationale. |
| UX-001 | Architecture comparison is incomplete | See supported changes at merge and recognize which behavior remains unconfirmed at the displayed revision. Open the affected component to understand the evidence gap. |
| UX-001 | Recent merges or PR details are open | Keep the map in view and available for inspection. Close details to return to the merge list. Close the panel to return to the Recent merges control. |
| UX-002 | Proposal awaits confirmation | Distinguish what was proposed from what the maintainer has confirmed. |
| UX-002 | Correction is unapplied | See that the edit is pending, apply or discard it, then continue the review. |
| UX-002 | Starting map confirmed | See the confirmed map and the revision it describes. |

The specification should define the feedback and recovery for an empty merge list, an initial map still being prepared, and a repository or evidence fetch that fails. The experience priority is to keep the displayed revision and the availability of evidence clear. These states still need checks beyond the current prototypes.

## 7. Accessibility and responsive experience

The proposed target is WCAG 2.2 AA. The essential tasks include identifying affected components and relationships, following evidence, and completing the starting map review by keyboard. Explain additions, removals, and evidence gaps in text. Highlighted lines and color supplement that text. Local prototype checks exercised keyboard paths at desktop widths. Narrow layouts and assistive technology still need evaluation. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## 8. Prototypes and decisions

The product owner authorized two disposable local browser mockups for UX-001 using the same synthetic content. PR #128 adds a supported worker retry path and leaves Checkout's current retry behavior unconfirmed. It includes sourced rationale and an unconfirmed deployment. PR #124 exercises missing rationale and confirmed deployment. [GOV.UK prototyping guidance](https://www.gov.uk/service-manual/design/making-prototypes)

| Reference | Task and fidelity | Observed check | Status |
|---|---|---|---|
| [Full-screen canvas and overlay](docs/design/prototypes/merge-workspace/index.html?entry=canvas) | Open Recent merges over the map, inspect PR #128, open its rationale, and return to the canvas. | Verified that the map filled the viewport below the navbar. Opening the list and PR details kept the map and graph positions stable. Before and after comparison, Escape, and focus return worked. | Rendered at 1527 × 1315 in the in-app browser. The product owner selected this interaction. |
| [Expanded canvas with adjacent list](docs/design/prototypes/merge-workspace/index.html?entry=canvas&layout=docked) | Begin on a full-height architecture workspace. Inspect the supported and unconfirmed behavior in PR #128 and switch to #124. | Verified the worker path and the Checkout label on the current map, the explanation when opening Checkout, and the separate behavior in the earlier revision. The merge list remained visible. | Rendered at 1385 × 1315 before the overlay comparison. |
| [Original canvas comparison](docs/design/prototypes/merge-workspace/index.html?entry=canvas&layout=compact) | Start with the map and select PR #128 from the adjacent list. | Opened the PR with the keyboard, switched compared revisions, opened the rationale source, and dismissed it with Escape. The map stayed in the workspace. | Rendered at 1265 × 720 in the initial comparison. Canvas-first selected. |
| [Recent changes first](docs/design/prototypes/merge-workspace/index.html?entry=changes) | Start with the merge list and open the architecture for PR #128. | Reached the same evidence, opened the text relationships with the keyboard, and returned focus to the originating merge. PR #124 showed missing rationale and opened the deployment record. | Rendered at 1280 × 720 in the initial comparison. Retained for comparison. |
| [Starting map review](docs/design/prototypes/merge-workspace/index.html?entry=setup) | Open Checkout and the Payment jobs relationship in the proposed map at `06b7dd9`. Inspect the sources, correct both claims, and confirm. | Verified keyboard selection, visible source excerpts, component and relationship edits, recovery from unapplied edits, and the confirmed revision. | Rendered at 1280 × 720 in the in-app browser. The synthetic map resets on reload. |

The prototypes use fixed data. These checks cover the observed local browser interactions. A pilot in an existing repository still needs to establish whether engineers benefit in their usual work.

Run the preview with this command from the repository root.

```sh
python3 -m http.server 48731 --bind 127.0.0.1 --directory docs/design/prototypes/merge-workspace
```

Open `http://127.0.0.1:48731/?entry=canvas` for the architecture workspace or `http://127.0.0.1:48731/?entry=setup` for the starting map review.

## 9. Assumptions and limitations

| Assumption or gap | Effect if false | Resolution |
|---|---|---|
| Engineers can find the relevant merge quickly from the canvas. | The engineer may overlook a meaningful change. | Test the selected workspace with a realistic set of recent merges. |
| The repository can support a useful starting map and evidence-backed updates at merge. | Maintainers may need to reconstruct context or correct too many claims. | Check a real area and its qualifying PRs in architecture exploration. Measure setup effort and gaps in source evidence. |
| The visual map improves understanding of architectural changes. | A concise evidence view may work as well or better. | Compare how engineers explain the change and predict a follow-up, using the same evidence. |

## 10. Experience acceptance

| Journey | Representative task and context | Expected observable outcome | Method and evidence |
|---|---|---|---|
| UX-001 | Return after the retry merge and explain the change to a teammate. | Describe the new worker retry path, identify the unconfirmed Checkout behavior, and distinguish the rationale source from deployment evidence. | Browser task paths exercised. The product owner chose the canvas-first direction and on-canvas uncertainty. Intended-use validation remains pending. |
| UX-001 | Inspect a merge with evidence for both sides of a responsibility transfer. | Identify the prior and new owners and explain the affected behavior at the merged revision. | Planned. Covers the complete-evidence case in REQ-001. |
| UX-002 | Inspect a proposed map with a mistaken ownership claim and a mislabeled relationship. | Locate each source, apply both corrections while keeping the canvas in view, and confirm the resulting map at the reviewed revision. | Both paths exercised in the local browser. The product owner chose on-canvas review. Intended-use validation remains pending. |

## 11. Handoff

Use `design-architecture` to establish how a known repository revision, the confirmed starting map, and later observations correspond. Check that a real PR can support the distinction between an observed architecture change and an uncertain claim. Use `define-specification` to give merge, rationale, deployment, revision, confirmation, and recovery states observable rules and conformance cases. The complete-evidence case remains a verification obligation under REQ-001.

## 12. Published workspace entry

**UX-006 is a draft walkthrough of the approved V1 publication setting.** The earlier approved experience ends at section 11. [Publication requirement](docs/requirements/v1-public-narys-demo.md) · [Workspace publication decision](docs/adr/adr-0017-workspace-publication.md)

The shared link opens the same canvas and merge inspection used by engineers. A guest can select #128, compare revisions, and read the eligible evidence. The navbar offers **Sign in**. On successful sign-in, an authorized maintainer can configure the workspace. Assigned viewers use GitHub sign-in to inspect private workspaces. [Workspace roles](docs/adr/adr-0013-workspace-access.md)

Verify this walkthrough in the rendered workspace using UX-003 and UX-005. Check the public view and follow the same link with a maintainer account.

## 13. Merge progress on the canvas

**UX-007.** The product owner chose a visible merge progress status on November 27, 2026. While Narys checks an accepted merge, show a brief status such as **Checking latest merges**. Keep the map visible with the revision it describes. This lets an engineer tell when Narys is catching up while continuing to inspect the available map. Make the status available to assistive technology with focus on the engineer's current control. [WCAG status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)

The draft uses the following sequence for #128. The workspace shows the status while the earlier map remains visible. When supported results are ready, **Recent merges** updates in the open workspace. An engineer comparing an earlier PR stays on those selected revisions. Rehearse this sequence in the rendered workspace. [V1 conformance cases](SPEC.md#4-conformance-cases)

## 14. Automated map setup

**UX-008.** The product owner approved automatic map generation and revision updates. This replaces UX-002 and UX-004 for setup. The maintainer configures an area from a path or description. The workspace shows that Narys is building the map. Evidence-backed results appear automatically and can be inspected on the canvas. An engineer can leave after setup and return to the generated map. [Automated map requirement](docs/requirements/v1-automated-map.md) · [Architecture decision](docs/adr/adr-0018-automated-map-publication.md)

The evidence inspector shows **Supported by source** when the check establishes the claim from the displayed revision. Show **Unconfirmed** where a material gap affects what the engineer can conclude. For #128, the worker retry path appears with supporting source. Checkout's current retry behavior remains unconfirmed. The label applies to the claim and revision. [Evidence rules](SPEC.md#evidence-for-a-change-claim)

The earlier starting-map review prototype records the superseded interaction. Rehearse the new journey with the browser closed after setup. The product owner deferred optional map corrections for V1.

## 15. Gaps in merge analysis

**UX-009.** On November 28, 2026, the product owner approved showing later merges whose changes Narys can support independently while an earlier merge remains unresolved. Show the gap on the canvas alongside the displayed map revision. Narys retries recoverable analysis failures in the background. [Merge recovery](docs/adr/adr-0005-merge-detection.md)

If analysis of #128 stalls, mark that gap. If Narys can establish #129 from its own before-and-after source, show #129 in **Recent merges** and let the engineer inspect those revisions. The map revision remains visible and the earlier gap stays visible until resolved. [Conformance cases](SPEC.md#4-conformance-cases)

## 16. Published workspace unavailable

**UX-010.** On November 28, 2026, the product owner approved pausing guest access when Narys cannot reverify that a repository is public. When the workspace next checks access and the check fails, show a temporary unavailable message in place of the map. Apply the same rule when an anonymous visitor opens a shared link or requests merge details. The public workspace becomes available again when the repository is verified public and publication is enabled. [Workspace publication](docs/adr/adr-0017-workspace-publication.md)
