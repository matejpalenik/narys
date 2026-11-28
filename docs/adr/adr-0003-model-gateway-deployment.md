---
title: "ADR-0003: Model gateway deployment for the pilot"
status: "Superseded"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: "ADR-0021"
---

# ADR-0003: Model gateway deployment for the pilot

## Status

**Superseded** by [ADR-0021](adr-0021-direct-model-inference.md) on November 28, 2026. The worker connects to the operator's selected model endpoint.

## Context

The pilot runs in the team's environment using Docker Compose. The team can choose a hosted model or a model served by Ollama through a gateway. The deployment choice is whether Compose starts the gateway or expects the team to bring a running gateway. Compare first-install effort, responsibility for routing and upgrades, the local inference boundary, and the workload needed to validate both routes. [ADR-0001](adr-0001-pilot-operating-model.md) · [ADR-0002](adr-0002-repository-data-boundary.md)

LiteLLM documents proxy integrations for OpenAI, Anthropic, and Ollama. It also documents file-configured API access without its database-backed management features. Bifrost documents comparable routes for those three providers. These are candidates for the same contract. The documentation establishes available integration paths. Model quality and runtime behavior require exercises with representative inputs. [LiteLLM OpenAI](https://docs.litellm.ai/docs/providers/openai) · [LiteLLM Anthropic](https://docs.litellm.ai/docs/providers/anthropic) · [LiteLLM Ollama](https://docs.litellm.ai/docs/providers/ollama) · [LiteLLM deployment](https://docs.litellm.ai/docs/proxy/docker_quick_start) · [Bifrost providers](https://www.getmaxim.ai/bifrost/guides/providers)

## Decision

Ship the gateway service in the pilot Compose stack. The team connects its chosen hosted model account or its own Ollama endpoint. A pilot using Ollama can connect to inference on a different machine inside its environment. The team supplies the model access and any required credentials. Hosted-provider credentials belong to the gateway, and GitHub credentials belong to the Narys application.

At the time of this decision, the gateway product remained open. The proposed sequence was to evaluate LiteLLM's file-configured mode first, with Bifrost as an alternative, and validate both model routes through the same application interface before selection.

## Consequences

### Positive

- **POS-001** A team can use the Compose distribution to start Narys and its gateway in one deployment. It can choose the inference route in configuration.
- **POS-002** A single application interface concentrates provider-specific routing in an existing gateway. Narys owns the analysis request and validation of the returned observations.

### Negative

- **NEG-001** The pilot team runs and updates an additional service. The Narys distribution needs a tested gateway configuration and a route-specific setup example.
- **NEG-002** An Ollama route requires a reachable model endpoint and enough compute for the chosen model. Availability of that model in Ollama does not establish its suitability for the architecture workflow.

## Alternatives Considered

### Connect to a gateway operated separately by the team

- **ALT-001** The team supplies an endpoint, credentials, and model route before installing Narys. This can reuse an existing gateway and leaves its upgrades with its current operator. Teams without one must install and troubleshoot two deployments to start the pilot.

## Implementation Notes

- **IMP-001** Verify the smallest distribution can use both routes with one application interface. Exercise a representative OpenAI model, a Claude model, and a team-run Ollama model. Verify the agreed evidence boundary and check failure behavior and payload handling before selecting a gateway.
- **IMP-002** Use the same examples for response validation, semantic quality, and elapsed time. Include a partial-evidence merge and a model outage. Establish model compatibility from those observations. [Ollama structured outputs](https://docs.ollama.com/capabilities/structured-outputs)

## References

- **REF-001** [Pilot operating model](adr-0001-pilot-operating-model.md)
- **REF-002** [Repository data boundary](adr-0002-repository-data-boundary.md)
- **REF-003** [Deployment view](../../ARCHITECTURE.md#4-containers-c4-l2)
