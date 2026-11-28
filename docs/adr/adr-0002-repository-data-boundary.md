---
title: "ADR-0002: Repository data boundary for architecture analysis"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0002: Repository data boundary for architecture analysis

## Status

**Accepted** on November 27, 2026. The product owner chose a model gateway that supports team-selected hosted providers and models served by the team's Ollama instance.

## Context

Narys needs repository evidence to propose a starting map and explain what changed at a merged revision. For the retry example, relevant inputs could include the worker diff, surrounding Checkout source, and the linked PR or issue text. The pilot team operates Narys in its own environment. Some teams can send that evidence to a hosted model. Others need inference to stay within their environment. [ADR-0001](adr-0001-pilot-operating-model.md) · [V1 experience](../../EXPERIENCE.md)

Hosted APIs can retain request content under endpoint and account policies. OpenAI documents differences between application state and abuse-monitoring logs. Local inference is also available. Ollama, for example, documents a local-only configuration. These sources establish possible operating boundaries. Useful architecture extraction on a real repository remains to be demonstrated. [OpenAI API data controls](https://developers.openai.com/api/docs/guides/your-data) · [Ollama local-only mode](https://docs.ollama.com/faq#how-do-i-disable-ollamas-cloud-features)

## Decision

Use a model gateway for architecture analysis. The pilot operator configures a route to a hosted provider, such as OpenAI or Anthropic, or to a model served by its own Ollama instance. A hosted route requires explicit configuration for the pilot repository. For a local route, inference stays within the team's environment. A failed request keeps its configured routing boundary.

Narys supplies the source and rationale excerpts needed for the analysis. Revision and evidence references, supported observations, and maintainer decisions remain in Narys. The supported model capabilities and retention of local source copies await design and verification. [Gateway packaging](adr-0003-model-gateway-deployment.md)

## Consequences

### Positive

- **POS-001** Teams can use a provider they already have access to or use their own Ollama setup. Narys can exercise the same analysis workflow through either route.
- **POS-002** The owner of the repository controls whether model inputs may be processed externally. A local route can keep analysis of private repository evidence within the team's environment.

### Negative

- **NEG-001** With hosted analysis enabled, selected excerpts cross the team's boundary. Provider terms, request logs, availability, and usage cost can affect the pilot.
- **NEG-002** A local route depends on the team's model and hardware. Gateway API compatibility establishes connectivity. The chosen model still needs to demonstrate useful results at acceptable latency.

## Alternatives Considered

### Support only one type of provider

- **ALT-001** A hosted-only route minimizes inference setup but excludes repositories that require local processing. A local-only route preserves the data boundary but requires inference setup even for teams already able to use a hosted model. The pilot decision supports both routes through a common interface.

## Implementation Notes

- **IMP-001** Check which fields enter a model request. Verify that repository evidence reaches only the operator's configured destination, that an Ollama route uses local inference, and that GitHub credentials stay in the GitHub integration. Test a failed Ollama request with a hosted route configured separately.
- **IMP-002** Run the same starting-map and merge fixtures with representative hosted and local models. Compare the results with maintainer judgment and include a claim with insufficient evidence. Check result shape and revision-pinned references independently of the model.

## References

- **REF-001** [Approved V1 requirements, REQ-001 through REQ-004](../requirements/product.md#6-domain-and-rules)
- **REF-002** [Pilot operating model](adr-0001-pilot-operating-model.md)
- **REF-003** [Domain and data architecture](../../ARCHITECTURE.md#5-domain-and-data-architecture)
