---
title: "ADR-0021: Direct model inference for V1"
status: "Accepted"
date: "2026-11-28"
authors: "Narys product owner and architecture design"
tags: ["architecture", "decision", "inference"]
supersedes: "ADR-0002, ADR-0003, ADR-0016"
superseded_by: ""
---

# ADR-0021: Direct model inference for V1

## Status

**Accepted** by the product owner on November 28, 2026. This decision supersedes the model gateway mechanism and packaging in [ADR-0002](adr-0002-repository-data-boundary.md), [ADR-0003](adr-0003-model-gateway-deployment.md), and [ADR-0016](adr-0016-pilot-gateway-product.md). It also replaces the gateway detail in [ADR-0010](adr-0010-v1-application-runtime.md).

## Context

One analysis worker submits bounded repository evidence to a model selected by the operator. Narys uses the result to propose changes and checks those claims against pinned source. TanStack AI provides TypeScript adapters for direct hosted OpenAI and Anthropic calls and a team-operated Ollama endpoint. The V1 deployment can use these adapters in the worker and remove the separately deployed LiteLLM service. [OpenAI adapter](https://tanstack.com/ai/latest/docs/adapters/openai) · [Anthropic adapter](https://tanstack.com/ai/latest/docs/adapters/anthropic) · [Ollama adapter](https://tanstack.com/ai/latest/docs/adapters/ollama)

## Decision

Keep one application-owned `CandidateModel` contract. Select one model and provider per installation in validated operator configuration. Use a TanStack AI adapter inside the worker to call OpenAI, Anthropic, or the team's local-only Ollama endpoint. Remove LiteLLM and its configuration from the Compose design. Give provider credentials to the worker only. Keep GitHub credentials and session data outside inference requests.

Send only the evidence authorized for the selected destination. A hosted route requires explicit operator configuration. When a local request fails, use the existing failure and retry path with that same local destination. Validate candidate output with Zod and check claims against the pinned source before publication. Preserve the rule in SPEC-016 and the failure exercise in CONF-011. [Specification](../../SPEC.md#3-observable-behavior) · [Ollama local-only mode](https://docs.ollama.com/faq#how-do-i-disable-ollamas-cloud-features) · [Source checks](adr-0020-first-slice-source-checks.md)

## Consequences

- **POS-001** The pilot runs the web and worker services from one image without an additional proxy image to deploy and update.
- **POS-002** The worker keeps one typed application contract across the three provider routes.
- **NEG-001** The worker owns provider configuration, cancellation, and error translation. Structured-output behavior can vary by model and needs to be checked on each supported route. [Structured outputs](https://tanstack.com/ai/latest/docs/structured-outputs/overview)

## Alternatives considered

- **ALT-001** Bundle LiteLLM. A shared gateway can centralize model configuration across clients. The V1 worker has a single operator-selected route, so the separate service adds deployment and maintenance work for this slice. [Previous gateway decision](adr-0016-pilot-gateway-product.md)

## Implementation notes

- **IMP-001** Run the same public or synthetic fixture against a representative model on OpenAI, Anthropic, and Ollama. Check the requested destinations, payloads, cancellation, and Zod-validated output. Repeat with Ollama down and hosted credentials present. Verify zero hosted calls for the local job.
- **IMP-002** Compare the candidate observations with the pinned Flask evidence and real Narys comparisons. Treat route verification, source correspondence, and model quality as separate results.
