# UX interview and prototyping guidance

Use [Nielsen Norman Group's usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) and the [GOV.UK Service Manual on prototypes](https://www.gov.uk/service-manual/design/making-prototypes) as primary guidance. Apply them to the task, not as a questionnaire or substitute for observed users. Review [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for applicable accessibility criteria. The following interview and acceptance format is our own adaptation.

## Interview focus

| Decision | Example question | Evidence to show |
|---|---|---|
| Job and workflow | What must a developer accomplish after opening a project? | Task flow with starting and ending state |
| Navigation | Should the architecture or the conversation occupy the main workspace? | Same task in canvas-first and conversation-first layouts |
| Context | Should a selected component persist when switching views? | Walkthrough of a view switch and return |
| Feedback | What must the operator see when an agent stops or a check fails? | Normal, stale and failed states with recovery action |
| Human control | How should a proposed architecture change be inspected and approved? | Explicit proposal vs accepted revision and consequences |
| Accessibility | How can the user connect or select nodes without dragging? | Keyboard and click-based alternative |

Explain the options in everyday language. Name a preference as a preference, not as research. Do not force the user to select among equivalent choices. Resolve high-impact interactions before visual details. Use actual user research when available, otherwise distinguish heuristic review, founder walkthrough and unvalidated hypotheses. Record only consequential decisions in EXPERIENCE.md.

## Prototype protocol

1. State the task and uncertainty. Select the least expensive fidelity that can answer it. Ask for bounded permission to create or run prototypes if not already authorized.
2. Compare two or three distinct hypotheses only when materially useful. Hold scenario, data and important constraints constant. Build a single focused revision when the direction is already established.
3. For executable exploration, use an isolated worktree or approved prototype area that is not imported into production. Avoid real services, credentials and private data. Use the adopted frontend conventions where practical. Do not install unapproved tools or publish previews automatically.
4. Provide a real preview or reproducible local command. Inspect normal and relevant adverse states. Ask one question about a concrete difference. Capture what was actually observed, which alternative the human chose, and why.
5. Retain the selected prototype reference and decision record. Remove or archive disposable variants only with authorization. Reimplement or promote only through an approved production scope and verification. Do not substitute screenshots or wireframes for observed interaction results.

## Illustrative review

Task: review a proposed component change while retaining context. Option A gives the canvas the central space and places the chat in a side panel. Option B puts the conversation first and shows the canvas as a contextual preview. Compare selection, reading the diff and the approval action with the same component and proposed change. Recommend an option based on task frequency and information needs, then ask which workspace model better supports the user's real work. The choice is UX-001; specific styling is a later design-system decision.

An accepted mockup does not establish latency, backend behavior or accessibility. Give those obligations to the specification and its conformance cases. A prototype failure may expose a new requirement or an architecture conflict. Return to the responsible gate instead of improvising a solution in production.
