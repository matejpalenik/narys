---
title: "ADR-0016: Bundled gateway product for V1"
status: "Superseded"
date: "2026-11-27"
authors: "Narys product owner and architecture design"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: "ADR-0021"
---

# ADR-0016: Bundled gateway product for V1

## Status

**Superseded** by [ADR-0021](adr-0021-direct-model-inference.md) on November 28, 2026. V1 uses direct calls through TanStack AI.

## Context

The product owner chose to bundle a gateway in Docker Compose and let each team connect a hosted model or its own Ollama instance. A request assigned to local inference stays within the team's environment, including after a failure. Narys needs to submit selected repository evidence and receive candidate observations. The application owns response validation and source correspondence. [Repository data boundary](adr-0002-repository-data-boundary.md) · [Gateway deployment](adr-0003-model-gateway-deployment.md)

LiteLLM documents a file-configured container with authenticated API access and no gateway database. Its provider guides cover OpenAI, Anthropic, and Ollama. Database-backed key management and spending limits are outside this configuration. [LiteLLM quickstart](https://docs.litellm.ai/docs/proxy/docker_quick_start) · [OpenAI](https://docs.litellm.ai/docs/providers/openai) · [Anthropic](https://docs.litellm.ai/docs/providers/anthropic) · [Ollama](https://docs.litellm.ai/docs/providers/ollama)

## Decision

Use file-configured LiteLLM as the bundled V1 gateway, subject to verification. Keep the proxy private to the deployment. Give the worker one inference interface and route each request to the team-configured model. A local route fails locally when Ollama is unavailable. Check the gateway's outbound destinations for a local deployment. Select a release using the project's dependency and security checks before bundling it. [Outbound request controls](https://docs.litellm.ai/docs/proxy/outbound_requests) · [Upstream security advisories](https://github.com/BerriAI/litellm/security/advisories)

## Consequences

- **POS-001** Compose can start the gateway from a configuration file. Narys can keep its SQLite deployment and use the same worker interface for hosted and local inference.
- **NEG-001** Narys takes on another image to update. Teams that need hosted spend limits must configure those limits at the provider. Compatibility depends on the model and settings used in the verification exercise.

## Alternatives Considered

- **ALT-001** Bifrost documents the same three provider routes and a file-only configuration with optional log storage. It is a practical second candidate if LiteLLM fails the routing or response requirements. Documentation for both candidates establishes configuration support. It supplies no measured advantage in analysis quality or latency. [Bifrost providers](https://www.getmaxim.ai/bifrost/guides/providers) · [Bifrost file configuration](https://github.com/maximhq/bifrost/blob/dev/docs/deployment-guides/config-json.mdx)

## Implementation Notes

- **IMP-001** Use the same public or synthetic evidence with a representative OpenAI model, Claude, and team-run Ollama. Check the response shape and the destination of the request. Turn off the Ollama endpoint and check that no hosted inference request occurs. Evaluate the quality of observations separately.
- **IMP-002** The local sandbox denied access to the Podman socket during design. The container and model route checks remain pending. Use a permitted container environment when performing them.
