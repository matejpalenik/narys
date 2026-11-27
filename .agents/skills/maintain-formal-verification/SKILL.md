---
name: maintain-formal-verification
description: >-
  Restore and verify correspondence between existing formal verification and changed code. Use after changes, merges or refactors that affect verified state, code or assumptions. Distinguish a current defect from model drift, retain the original guarantee unless explicitly changed, and update manifests and project-local verification skills only with reproducible evidence.
---

# Maintain formal verification

## Intent

Prevent a passing verification from giving false confidence about code that it no longer describes. Bring the verifier into correspondence with actual implementation before interpreting the result. Preserve approved guarantees and report real defects rather than weakening checks.

Read the [work contract](../software-factory/references/work-contract.md), [writing standard](../software-factory/references/writing.md), [coverage contract](../create-formal-verification/references/coverage-contract.md) and approved `REVIEW.md`. This skill may edit verification models, harnesses, property records, manifests and project-local verification skills within authorized scope. It does not edit product code or change required checks without separate approval.

## Methodology

### 1. Inventory checks and establish the old result

Find project-local skills and manifests that verify named code or state. Include existing verification without this library's manifest. Read the property, its canonical specification and conformance references, code coverage, tool, command, assumptions, bounds and last synchronization revision. Check the current approved guarantee and material interface dependencies even if code paths did not change. If no check exists, use `create-formal-verification`. If the sync revision is missing, use the last verifier-changing commit only as a conservative investigation starting point and disclose it. Establish actual correspondence before claiming verification. Run the existing check once without changes and record its result. A pass establishes only that the old model/check passed, not that it describes current code.

### 2. Inspect changes since the last confirmed synchronization

Inspect each relevant diff and commit since the recorded revision. Include moved/renamed/split symbols, new writers or paths that reach the same state, schema and atomicity changes, configuration, dependencies and environmental assumptions. Compare behaviour with the model or harness, not only commit messages. Classify each material change:

| Classification | Action |
|---|---|
| No effect | Confirm the mapping and rerun |
| Model/harness drift | Update it from code before interpreting results |
| Intentionally changed promise | Require explicit approved evidence and human approval of the new guarantee |
| Possible broken promise | Preserve property and investigate the counterexample |
| Unknown | Block until evidence is sufficient |

### 3. Restore correspondence before rerunning

Update the model, harness and mappings to reflect code as it exists. Match atomic steps, reachable branches, value ranges and state writers. Do not tune the model to obtain a pass. Keep the property, bounds and assumptions unless evidence justifies a change. Report any reduced bound or narrower scope and obtain approval before using a weakened guarantee as acceptance evidence. If a promise changed intentionally, return to `define-specification` and the relevant approval gates. Record the old wording, new wording and trusted approval. Coordinate affected conformance cases and issue approvals before using the revised property. A changed test or commit message alone does not authorize a weaker critical requirement.

### 4. Interpret the new result and demonstrate detection

If the synchronized check fails, replay each counterexample step against the current code. If a step cannot occur, correct the model or harness and explain the drift. If all steps can occur, report a product defect and its harm. Identify the introducing revision when supported. Produce a safe reproduction if feasible. Do not change product code during review. If the check passes, use an isolated broken-code variant and corresponding verifier input to demonstrate that the check can still detect the protected violation. Remove the variant and rerun the actual target. Use a state diagram or trace to explain the result. Do not describe an empirical test as a proof or a model pass as a proof of implementation.

### 5. Synchronize and verify the handoff

Update the manifest and project-local verification skill with actual coverage, commands, assumptions, bounds, correspondence and evidence. Update sync revision and covered input digest only for a checked snapshot in accordance with the coverage contract. Do not advance the successful synchronization record for blocked verification or an unresolved defect. Keep defect evidence and any restored mapping separately. Run the project-local skill once as the next agent would. If required verification is not current and reproducible, block the affected change. Return material defects to implementation only through separately authorized repair work.

## Response contract

Use one row per property: **Property**, **Outcome** (`in_sync`, `updated`, `defect`, `blocked`), **Change and evidence**, **Checked revision**, **Next action**. A restored mapping can reveal a defect; record that explicitly. State any unverified scope or reduced bound. Link exact reproduction, artifacts and manifest. Explain a counterexample as a short sequence of actual steps and its harm. Do not claim verification of untested code.

## Completion criteria

Every affected check has an explicit outcome and evidence. Successful checks describe the current code within the recorded scope, can detect a violation and can be rerun. Defects remain findings. Blocked checks remain blocked. Changes to critical guarantees or verification authority require human approval.
