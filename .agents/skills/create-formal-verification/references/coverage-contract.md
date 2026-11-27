# Formal verification coverage contract

Each property has a human-readable record and matching YAML manifest under `docs/verification/`. The manifest is the authority for execution metadata. The narrative explains the guarantee, harm, method, correspondence, results and limitations. See [manifest template](property.yaml) and [property template](property.md). Copy the schema [property.schema.json](property.schema.json) to an approved project configuration location when establishing validation. The template is a draft, not a verified property.

## Coverage

Record actual covered file globs and symbols, protected state, model/harness, and indirect dependencies such as schema, configuration, synchronization, shared storage and every relevant writer. Inspect new and moved code. A path match is only a trigger, not a proof of completeness. A new writer outside a listed path may invalidate the guarantee. Check dependencies and semantic impact for each relevant change. Require explicit approval for intentionally changed critical promises.

## Reproducible inputs and revisions

Record a pinned tool/version, exact command, scope, assumptions, bounds, property approval, model correspondence and observed evidence. The trusted check must bind evidence to the exact candidate and tested base or merge candidate. Compute the `covered_inputs_digest` from a documented deterministic representation of all covered code, model/harness, properties and relevant configuration (excluding the manifest's volatile evidence/status fields). Record which files and hashes were used. A manifest status or self-reported SHA is not trusted evidence. Validate the manifest with a safe YAML parser and the versioned schema. Missing paths, tool/version, unestablished assumptions, missing evidence or unknown scope block required verification.

`last_synchronized` records the immutable source snapshot actually checked. Do not attempt to embed the hash of a commit that contains that very hash. An evidence-only follow-up commit may refer to the prior source snapshot if the covered input digest is unchanged and the trusted CI checks bind the result to the final candidate. If any covered input changes, reestablish correspondence and rerun. Retain failing and blocked results. Do not advance synchronization for a blocked check. Record defect evidence separately, even when model maintenance restored correspondence. A design-only check cannot establish implementation correspondence. An empirical property test cannot establish a formal proof.

## Impact and required action

| Change | Required action |
|---|---|
| No effect on modeled behaviour | Confirm correspondence against model/harness and rerun required check |
| Semantics, atomicity, reachable state or covered code changes | Update verification from the actual code and verify again |
| Intended change to critical promise | Obtain human approval, record old and new property, then update and verify |
| Counterexample | Replay steps against actual implementation; report defect if possible, otherwise correct model drift |
| Unknown effect, missing proof or unavailable tool | Block required verification; do not advance synchronization |

Use `maintain-formal-verification` after changes, including changes made without the project-local skill. For creation, use `create-formal-verification`. CI should require all affected properties, validate manifest and evidence, and recheck on changed inputs. Keep the verification policy and trusted checks outside ordinary worker control. Path triggers can be implemented in CI, but semantic impact still needs review. Use the strongest practical verification tool for the actual guarantee.

## Specification correspondence

The canonical normative guarantee remains in the applicable SPEC entry. The manifest `requirement_refs` includes its SPEC ID and relevant source REQ identifiers. Link the conformance case in the property record. A changed guarantee or material assumption requires impact review and renewed approval, even when implementation paths are unchanged. Include the relevant normative inputs in the covered input set and synchronization evidence. Do not change the manifest property to contradict the approved specification.
