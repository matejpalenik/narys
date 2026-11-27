---
name: create-formal-verification
description: >-
  Establish reproducible formal verification for a critical property of the code or approved design. Select the verifier from the property, establish code correspondence and a failing witness, and generate a project-local verification skill, coverage manifest and property record. Use when example tests do not adequately cover consequential state, concurrency, retry, integrity or algorithmic properties.
---

# Create formal verification

## Intent

Verify the strongest consequential guarantee that ordinary example tests cannot adequately establish. Leave a low-cost, reproducible check that a new agent can use and maintain. Make the scope and harm understandable without requiring the reader to know the verification language.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md), [property template](references/property.md), [coverage contract](references/coverage-contract.md) and [manifest template](references/property.yaml). Read approved requirements, normative specification and conformance cases, architecture, code and `REVIEW.md`. Do not change product code unless separately authorized.

## Methodology

### 1. Choose the target

Find a concrete guarantee whose violation harms users and whose possible executions or inputs are difficult to cover with examples. Read the relevant code, existing tests and guarantees before choosing the property. Use a human-specified target when given. Prefer the strongest relevant property rather than the easiest check. State the property and harm in plain words, the protected state, relevant writers/readers, atomicity, and required assumptions. Ask for approval of new critical properties or changed promises. For greenfield, mark a design-only check as such until code correspondence is established.

### 2. Choose a method and map it to the code

Select the method that answers the question at the lowest sufficient cost. A model checker such as TLA+ can explore relevant interleavings and protocol states. Code-level verification, SMT or proof assistants may suit input, algorithmic or memory properties. If a suitable verifier is not available, test the actual code with generated inputs and label this empirical verification, not proof. Record exact tool/version, assumptions, bounds, environment, fairness and safety/liveness scope. Map each model action, state and atomic step to real functions, storage constraints and code paths. Do not treat two implementation steps as atomic without evidence. Record omissions and indirect dependencies.

### 3. Create the artifacts

Identify the canonical SPEC guarantee and its applicable CONF case and source REQ identifiers. Do not define a competing normative requirement in the property record. A newly discovered necessary guarantee requires specification approval before it becomes binding. Allocate a stable `PROP-<number>` and create `docs/verification/PROP-<number>-<slug>.md` and a matching `.yaml` manifest from the templates. Keep executable models and harnesses at the approved repository location. Use a pinned tool version and a reproducible command. Select coverage paths, symbols, relevant state and transitive dependencies. Record explicit scope, exact revision and the digest of covered inputs. Keep the manifest and narrative linked rather than duplicating operational values. Add the check to the required verification configuration when authorized.

Generate a focused project-local verification skill using real names, commands, paths and manifest references. Use the repository's supported skill discovery location. Include a trigger for relevant changes, the rerun command, expected result, failing witness, how to identify drift or defects, and a reference to `maintain-formal-verification`. Use valid `SKILL.md` frontmatter. Do not leave placeholders. If this cannot be done, report a draft. For TLA+ use the installed pstack `statechart` skill if available to explain the counterexample in code terms. Otherwise use a short state diagram and trace from actual output. Do not invent results.

### 4. Demonstrate that the check can fail

Run the check against the actual target and record results. In an isolated scratch variant, make a deliberate violation of the real guarantee, such as removing a guard or splitting an atomic update. Use the project-local skill as a new agent would. Verify that the actual-code check or the model updated to correspond to that broken code detects the violation. For a model checker, explain how the broken model action corresponds to an executable broken-code path. Replay the counterexample against code where possible. A mutation only in an unrelated model does not establish code correspondence. Remove the scratch change and rerun against the unmodified target. Never introduce the scratch mutation into a production commit. If the check misses the break, correct the verifier or its mapping, not the intended property.

### 5. Verify and hand off

Report the property, scope, verified inputs, tool, command, bounds, correspondence, failing witness and actual result. When an actual counterexample is possible in code, report it as a defect with a trace and harm. Do not weaken the property to get a pass. Record a synchronization revision only after correspondence and required checks are established under the coverage contract. Leave a reproducible verified skill and record or an explicit blocked/draft/design-only outcome. Keep product changes separate from verification changes unless approved.

## Response contract

Show **Property and harm**, **Method**, **Coverage and assumptions**, **Result and failing witness**, **How to rerun** and **Limits**. Use a compact state diagram or call trace for consequential failures. Link the manifest, property record and project-local skill. Do not paste raw tool logs in chat.

## Completion criteria

The property is precise and approved. The verification and its project-local skill are reproducible, true to the stated code or design, and demonstrated to detect a violation. The scope, bounds and synchronization evidence are explicit. An unrun or stale verification is not a pass. A design-only or empirical check is not implementation-level proof.
