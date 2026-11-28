---
title: "ADR-0010: Application runtime for the self-hosted pilot"
status: "Accepted"
date: "2026-11-27"
authors: "Product owner and architecture design assistant"
tags: ["architecture", "decision"]
supersedes: ""
superseded_by: ""
---

# ADR-0010: Application runtime for the self-hosted pilot

## Status

**Accepted** on November 27, 2026. The product owner chose Next.js, React, and an analysis worker in one TypeScript codebase for V1. Specialized Python tooling can run in a separate container if needed.

## Context

The pilot runs on one host with Docker Compose. It needs an interactive canvas, a webhook that can acknowledge durable work promptly, and background analysis that can recover after restart. Compare installation and release effort, isolation of slow analysis from incoming requests, and support for inspecting repository source in several languages. [Pilot operating model](adr-0001-pilot-operating-model.md) · [Merge detection](adr-0005-merge-detection.md) · [V1 experience](../../EXPERIENCE.md)

Next.js documents a self-hosted Node.js deployment and recommends placing a reverse proxy in front of its server. The Flask evidence exercise used Python to inspect syntax. Tree-sitter has Node.js bindings and a Python grammar, so a Node-based worker can be evaluated against the same source check. This identifies a candidate parser and leaves actual coverage and packaging to verification. [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting) · [Node Tree-sitter](https://github.com/tree-sitter/node-tree-sitter) · [Tree-sitter Python grammar](https://github.com/tree-sitter/tree-sitter-python)

## Decision

Use one TypeScript codebase on Node.js. Use Next.js and React for the workspace and Next.js route handlers for the application HTTP boundary. Run the web process and a single analysis worker as separate processes from the same release image. The web process accepts and records webhook work. The worker processes durable work independently of the browser and HTTP request, reads GitHub evidence, and uses the bundled model gateway. Both use the same domain rules and durable project store. [Next.js route handlers](https://nextjs.org/docs/app/getting-started/route-handlers)

Keep presentation and infrastructure adapters outside the domain. Share application operations for map confirmation, revision updates, and reads between entry points. Next.js supplies UI and HTTP adapters. The worker uses application operations directly. The storage proposal, runtime versions, package manager, and UI foundation await scoped decisions. [ADR-0011](adr-0011-v1-persistence.md)

Start with source, GitHub records, and text documents such as Markdown ADRs. The Flask and Hermes reference cases use PR text and source directly. If a pilot needs rationale held in PDFs or Office documents, evaluate Docling Serve as an optional Compose service. The worker can call its HTTP API and retain a link to the original document and relevant page or section. Confirm extraction quality and operating cost with an actual pilot document before adding the service. [Docling formats](https://docling-project.github.io/docling/usage/supported_formats/) · [Docling deployment](https://docling-project.github.io/docling/usage/api_server/deployment/) · [Compose profiles](https://docs.docker.com/compose/how-tos/profiles/)

## Consequences

### Positive

- **POS-001** One codebase and one application image provide a common release for the web and analysis processes.
- **POS-002** Slow source inspection and inference are isolated from webhook acknowledgement and workspace requests. The worker can restart and recover from the shared store.

### Negative

- **NEG-001** Compose must start and check both application processes. A shared store requires short transactions and verification of concurrent updates and recovery.
- **NEG-002** The analysis may need language-specific parsers or tooling. Evaluate coverage, memory, and distribution cost with actual source in the pilot before committing to parser choices.

## Alternatives Considered

### Next.js workspace with a separate backend service

- **ALT-001** A separate analysis backend, for example in Python, gives that service an independent runtime and access to its language ecosystem. It adds a second runtime and a network contract or another shared-state boundary. Reconsider it if the evidence checks demonstrate a concrete dependency or isolation need.

## Implementation Notes

- **IMP-001** Stop a worker after the webhook acknowledgement and during publication. Verify that a restarted worker can resume without publishing the same change twice or leaving the map partly updated.
- **IMP-002** A disposable Node.js and SQLite exercise retained committed pending work after process exit. An interrupted publication rolled back and was retried atomically. This supports evaluating an embedded store. Measure concurrency, backup, and restore in the Compose design. [SQLite deployment guidance](https://sqlite.org/whentouse.html) · [Node.js SQLite API](https://nodejs.org/api/sqlite.html)

## References

- **REF-001** [Container view](../../ARCHITECTURE.md#4-containers-c4-l2)
- **REF-002** [Application evidence check](adr-0008-map-update-evidence.md)
- **REF-003** [Flask reference case and rationale](../research/2026-11-27-flask-merge-reference-case.md#4-findings-and-expected-canvas)
