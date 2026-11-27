# Configuration, errors and operations

## Configuration

| Concern | Rule |
|---|---|
| Source | Define typed configuration at the composition boundary. Document defaults, required values and resolution order in the canonical contract. |
| Validation | Reject invalid or missing required values before the affected service accepts work. Validate reloads and define safe fallback behavior if dynamic config is required. |
| Secrets | Retrieve through approved secret storage or injected secret references. Do not commit credentials, log values or expose secrets in exceptions. Sample files contain names and safe placeholders only. |
| Environment | Keep deploy-specific settings external. Do not hard-code environment names, endpoints or tenant credentials in domain code. |
| Ownership | Pass resolved configuration or narrow dependencies to consumers. Do not scatter environment reads or framework config throughout domain code. |

Do not create a second configuration authority for standards. Actual project configuration lives in existing config files. Architecture records consequential technology and operational choices; the specification defines observable configuration semantics. Keep factory policy separate from application settings.

## Error handling and security

Define explicit failure types, retryability and externally visible error mapping. Reject invalid transitions without partial state changes. Catch errors only where the caller can recover, translate or report them. Do not swallow unexpected exceptions or return success on a failed operation. Make retry, timeout and cancellation behavior match the approved contract. Preserve exception causes for diagnosis without exposing sensitive data. Use least privilege, server-side authorization, safe input parsing and validated trust boundaries. Test negative and boundary cases. Do not retry non-idempotent effects blindly.

## Operational design

Use structured logs, correlation identifiers, meaningful health and readiness signals, and metrics tied to approved operational goals. Never log secrets or unnecessary personal data. Add distributed tracing when necessary to diagnose cross-boundary behavior. Keep the core independent of logging vendors. Define resource cleanup, startup/shutdown, timeouts, backup, recovery and migration where applicable. A library does not need a web health endpoint. Use injected time, identifiers and external ports where determinism or side effects require control. No observability backend or new service is required without demonstrated need.
