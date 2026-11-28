---
title: "Public reference case for the living architecture"
date: 2026-11-27
scope: feature
status: complete
---

# Public reference case for the living architecture

## 1. Summary

Use Flask PR #4692 as the first reference case for V1. It adds an application-level JSON provider and makes `jsonify()` delegate response construction to that provider. Repository source shows the old and new call paths. The PR records why Flask added the provider. The case supplies expected results for future implementation checks. [S02](#s02) · [S03](#s03) · [S04](#s04)

## 2. Question and scope

Can a small public example provide a starting map, a supported architecture change, and attributable rationale from the records Narys expects to use? The selected area is Flask's JSON response construction, centered on `jsonify()`. Read its source and application configuration where they explain that flow. This exercise used read-only GitHub metadata, revision comparisons, and source inspection. [V1 requirements](../requirements/product.md#6-domain-and-rules) · [V1 coverage](../requirements/v1-merge-coverage.md)

## 3. Authoritative guidance

The relevant external contracts are GitHub's pull request and commit comparison APIs. They identify the merged revision and supply a comparison between repository revisions. In this case, comparing the integrated commit with its first parent identified the target branch before the merge. This result applies to the selected case. [S01](#s01) · [S02](#s02)

| Evidence | Exact revision |
|---|---|
| Target branch before the merge | `c356c6da5f25ba70bd53448ff1d1bf6ad6967fd5` |
| Integrated commit after the merge | `67310ab49613be97a121053dfbbced14657b96eb` |

## 4. Findings and expected canvas

| Check | Observed evidence | Expected canvas or PR details |
|---|---|---|
| F01 · Starting map | Before merge, `jsonify()` selects formatting, serializes the arguments through `dumps`, and constructs the response using the application's response class. [S03](#s03) | Show `jsonify()` constructing the JSON response at the starting revision. Give the maintainer access to the source for that relationship. |
| F02 · Architecture change | After merge, `jsonify()` calls `current_app.json.response()`. Flask initializes `app.json` from `json_provider_class`, with `DefaultJSONProvider` as the default. [S04](#s04) | Show the new delegation from the helper to the application's JSON provider. Identify the provider as responsible for response construction. Keep the prior revision available for comparison. |
| F03 · Affected behavior | Applications can replace the provider. The default provider continues to serialize through Python's `json` library. [S04](#s04) | Explain that apps can customize JSON response construction through the provider, and that Python's standard JSON library remains the default. |
| F04 · Recorded rationale | The PR describes letting apps choose their JSON implementation, including faster serializers for JSON-heavy APIs. [S02](#s02) | Link the PR as the rationale source and present speed as a stated motivation. |
| F05 · Deployment and tests | The PR is merged. The integrated source contains a custom-provider test. This exercise inspected the test source. [S02](#s02) · [S05](#s05) | Show the merged revision. Deployment remains unconfirmed in this case. Test source can be linked as a test case. A passing result requires evidence from a run at an identified revision. |

The application binds the provider in `src/flask/app.py`, outside the `src/flask/json/` directory. For this area, a source review limited to the JSON directory would miss the configuration point. The initial map and update should include relevant source reached through the reviewed relationship. [S04](#s04)

### Source correspondence check

A read-only Python syntax-tree check on the two pinned source revisions corroborated the real PR claim that `jsonify()` began calling `app.json.response`. The same exercise tested a synthetic description claiming the PR made `orjson` the default. The merged source selects `DefaultJSONProvider` and calls Python's `json.dumps` in it. The expected result for that synthetic claim is possible divergence. The statements were selected by hand for this exercise. [S02](#s02) · [S03](#s03) · [S04](#s04) · [ADR-0008](../adr/adr-0008-map-update-evidence.md)

## 5. Candidates considered

| Candidate | Appropriate use |
|---|---|
| **Flask #4692** | First reference case. One clear responsibility change, an exact before and after, and a reason in the PR. The selected flow is small enough to follow in source. [S02](#s02) |
| **Hermes Agent #13347** | Regression case for attributing merged changes. The PR's reported base includes an intervening CLI change. [Prior evidence](../../ARCHITECTURE.md#7-verification-and-open-design-work) |
| **PostHog #125722** | Follow-up for checking relationships across surfaces and rationale across related records. The PR documents the problem and links three companion PRs in its feature flag restore work. [S06](#s06) |

## 6. Conclusions and limits

Use the expected canvas above to evaluate the first implementation. The manual result establishes that the selected records support a scoped map and change explanation. Automated extraction accuracy, model behavior, and end-to-end latency need measurements in the implementation. This older Flask change gives a reference for the architecture workflow. Known agent-led examples remain the focus when evaluating whether the workflow helps engineers keep up with agent work. Use Narys itself for ongoing dogfooding once its application has real architecture-changing merges.

## 7. Sources

### S01

GitHub Docs · Pull request metadata and revision comparison contracts. [Get a pull request](https://docs.github.com/en/rest/pulls/pulls#get-a-pull-request) · [Compare two commits](https://docs.github.com/en/rest/commits/commits#compare-two-commits)

### S02

Pallets · Flask PR #4692, merged July 13, 2022. PR description, merged commit, and comparison with its first parent. [PR and rationale](https://github.com/pallets/flask/pull/4692) · [Merged commit](https://github.com/pallets/flask/commit/67310ab49613be97a121053dfbbced14657b96eb) · [Exact comparison](https://github.com/pallets/flask/compare/c356c6da5f25ba70bd53448ff1d1bf6ad6967fd5...67310ab49613be97a121053dfbbced14657b96eb)

### S03

Pallets · Flask source at the first parent. [Prior `jsonify()` implementation](https://github.com/pallets/flask/blob/c356c6da5f25ba70bd53448ff1d1bf6ad6967fd5/src/flask/json/__init__.py#L284-L303)

### S04

Pallets · Flask source at the integrated revision. [Delegation in `jsonify()`](https://github.com/pallets/flask/blob/67310ab49613be97a121053dfbbced14657b96eb/src/flask/json/__init__.py#L328-L341) · [Default provider selection](https://github.com/pallets/flask/blob/67310ab49613be97a121053dfbbced14657b96eb/src/flask/app.py#L338-L348) · [Initialization of `app.json`](https://github.com/pallets/flask/blob/67310ab49613be97a121053dfbbced14657b96eb/src/flask/app.py#L474-L489) · [Default serialization](https://github.com/pallets/flask/blob/67310ab49613be97a121053dfbbced14657b96eb/src/flask/json/provider.py#L225-L230) · [Provider response construction](https://github.com/pallets/flask/blob/67310ab49613be97a121053dfbbced14657b96eb/src/flask/json/provider.py#L291-L310)

### S05

Pallets · Custom-provider test at the integrated revision. [Test source](https://github.com/pallets/flask/blob/67310ab49613be97a121053dfbbced14657b96eb/tests/test_json.py#L223-L257)

### S06

PostHog · PR #125722, merged November 2, 2026. The PR describes feature flag restoration and links companion changes. [PostHog PR and rationale](https://github.com/PostHog/posthog/pull/125722)
