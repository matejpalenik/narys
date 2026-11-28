import type { ChangePresentation, ObservationPresentation, SourceEvidence, SourceExcerpt } from "./presentation";
import type { MapRevision, MergePresentation, OverviewNode, OverviewRelationship, WorkspacePresentation, WorkspaceScope } from "./workspace-model";

const paths = {
  checkout: "apps/checkout/payments.ts",
  api: "services/payments/api.ts",
  worker: "services/payments/worker.ts",
};

const directRetry = { path: paths.checkout, code: 'if (!attempt.succeeded) {\n  return paymentsApi.retry(paymentId);\n}' };
const queueRetry = { path: paths.checkout, code: 'await paymentJobs.publish("payment.retry", { paymentId });' };
const runRetry = { path: paths.worker, code: 'worker.register("payment.retry", async ({ paymentId }) => {\n  await paymentsApi.retry(paymentId);\n});' };
const authorizeSource = { path: paths.api, code: 'router.post("/payments/authorize", authorizePayment);' };
const statusSource = { path: paths.api, code: 'router.get("/payments/:id/status", readPaymentStatus);' };
const statusChangeBefore = { path: paths.api, code: 'await paymentRepository.setStatus(paymentId, status);' };
const statusChangeAfter = { path: paths.api, code: 'await paymentRepository.setStatus(paymentId, status);\nawait paymentJobs.publish("payment.status-updated", { paymentId, status });' };

function source(first: SourceExcerpt, ...rest: SourceExcerpt[]): SourceEvidence {
  return { kind: "available", excerpts: [first, ...rest] };
}

const nodes = [
  { id: "checkout", name: "Checkout", role: "Web application", shortRole: "Web app", element: "Container",
    identity: { family: "semantic", icon: "checkout" }, column: 0, row: 0, ports: ["right", "bottom"] },
  { id: "api", name: "Payments API", role: "Payments service", shortRole: "Service", element: "Container",
    identity: { family: "semantic", icon: "api" }, detailedIdentity: { family: "technical", kind: "api" }, column: 1, row: 0, ports: ["left", "bottom"] },
  { id: "jobs", name: "Payment jobs", role: "Message queue", shortRole: "Queue", element: "Container",
    identity: { family: "technical", kind: "queue" }, column: 0, row: 1, ports: ["top", "right"] },
  { id: "worker", name: "Payments Worker", role: "Background worker", shortRole: "Worker", element: "Container",
    identity: { family: "semantic", icon: "worker" }, column: 1, row: 1, ports: ["left", "top"] },
] as const satisfies readonly OverviewNode[];
const [checkout, api, jobs, worker] = nodes;

const exploreComponents = { id: "components", label: "Explore components", kind: "explore", scope: "worker" } as const;
const inspectRetry = { id: "implementation", label: "Inspect retry implementation", kind: "explore", scope: "implementation", target: "callback" } as const;
const exploreRetry = { ...inspectRetry, label: "Explore implementation" } as const;
const exploreContainers = { id: "containers", label: "Explore containers", kind: "explore", scope: "containers" } as const;

const contextNote = "Synthetic context fixture for the selected area.";
const contextObservations = {
  shopper: { title: "Shopper", role: "User", description: "Starts a payment through Checkout in this orientation example.", note: contextNote },
  payments: { title: "Payments", role: "Selected software area", description: "Starts payments and handles failed attempts.", note: contextNote, related: [exploreContainers] },
  processor: { title: "Payment processor", role: "External system", description: "The decision note mentions a payment processor. The fixture does not establish its interface or where it runs.", note: contextNote },
  starts: { title: "Starts a payment", role: "Context relationship", description: "Illustrates how a shopper uses the selected Payments area.", note: contextNote },
  processing: { title: "Uses a processor", role: "Context relationship", description: "Illustrates the external dependency mentioned in Issue #91. The supplied source excerpt does not establish this integration.", note: contextNote, confidence: "unconfirmed" },
} satisfies Record<string, ObservationPresentation>;

const implementationEvidence = { kind: "available", excerpts: [runRetry], expanded: true } as const;
const explored = {
  "worker-queue": { title: jobs.name, role: "External to worker · Container", description: "Provides the queued payment.retry job consumed by the worker handler." },
  handler: { title: "Retry handler", role: "Component · Job handler", description: "Handles payment.retry messages and passes the payment ID to Payments API.", related: [exploreRetry] },
  "worker-api": { title: api.name, role: "External to worker · Container", description: "Receives the retry call with the payment ID." },
  message: { title: "Delivers retry job", role: "Asynchronous message", description: "The worker registers a handler for the payment.retry job." },
  retry: { title: "Calls retry", role: "Synchronous call", description: "The handler awaits paymentsApi.retry(paymentId)." },
  register: { title: "worker.register", role: "Registration call", description: "Associates payment.retry with the callback supplied in this file.", evidence: implementationEvidence },
  callback: { title: "Retry callback", role: "Anonymous function", description: "Receives paymentId and awaits the API retry call.", evidence: implementationEvidence },
  call: { title: "paymentsApi.retry", role: "Method call", description: "Receives paymentId from the retry callback. The method body is outside this excerpt.", evidence: implementationEvidence },
  registers: { title: "Registers callback", role: "Registration", description: "The anonymous function is passed as the second argument to worker.register.", evidence: implementationEvidence },
  calls: { title: "Awaits retry call", role: "Call", description: "The body of the callback awaits paymentsApi.retry(paymentId).", evidence: implementationEvidence },
} satisfies Record<string, ObservationPresentation>;
const innerObservations = Object.fromEntries(Object.entries(explored).map(([id, detail]) => [
  id, { evidence: source(runRetry), confidence: "supported", ...detail } satisfies ObservationPresentation,
]));

const scopes: readonly WorkspaceScope[] = [
  {
    id: "context", label: "System context", title: "Payments system", kind: "context",
    diagram: {
      label: "Payments system context", qualifier: "Synthetic context · selected area only",
      nodes: [
        { id: "shopper", node: { name: contextObservations.shopper.title, role: "User", element: "System", identity: { family: "semantic", icon: "identity" } } },
        { id: "payments", node: { name: contextObservations.payments.title, role: "Selected software area", element: "System", identity: { family: "semantic", icon: "payment" } } },
        { id: "processor", node: { name: contextObservations.processor.title, role: "External system", element: "System", identity: { family: "semantic", icon: "application" } } },
      ],
      relationships: [
        { id: "starts", label: contextObservations.starts.title, kind: "sync" },
        { id: "processing", label: contextObservations.processing.title, kind: "unknown" },
      ],
    },
  },
  { id: "containers", label: "Containers", title: "Payments", kind: "overview" },
  {
    id: "worker", label: "Components", title: worker.name, kind: "components",
    unavailable: { title: "Worker internals unavailable", message: "The available source does not establish the retry handler at" },
    diagram: {
      label: "Payments Worker component map", qualifier: "Retry responsibility · source excerpt scope",
      nodes: [
        { id: "worker-queue", node: jobs },
        { id: "handler", node: { name: explored.handler.title, role: explored.handler.role, element: "Component", identity: { family: "semantic", icon: "worker" } } },
        { id: "worker-api", node: api },
      ],
      relationships: [{ id: "message", label: explored.message.title, kind: "async" }, { id: "retry", label: explored.retry.title, kind: "sync" }],
    },
  },
  {
    id: "implementation", label: "Implementation", title: "Retry handler", kind: "implementation",
    unavailable: { title: "Retry implementation unavailable", message: "The available source does not establish the retry handler at" },
    diagram: {
      label: "Retry handler implementation map", qualifier: paths.worker,
      nodes: [
        { id: "register", symbol: { name: explored.register.title, kind: "Call", members: ['register("payment.retry", …)'] } },
        { id: "callback", symbol: { name: explored.callback.title, kind: "Function", members: ["async ({ paymentId }) => …"] } },
        { id: "call", symbol: { name: explored.call.title, kind: "Call", members: ["await paymentsApi.retry(paymentId)"] } },
      ],
      relationships: [{ id: "registers", label: explored.registers.title, kind: "registration" }, { id: "calls", label: explored.calls.title, kind: "sync" }],
    },
  },
];

const scheduledJobs: OverviewRelationship = { id: "scheduled", from: jobs.id, to: worker.id, label: "Scheduled jobs", route: "across", kind: "async" };
const authorize: OverviewRelationship = { id: "authorize", from: checkout.id, to: api.id, label: "Authorize + status", route: "across", kind: "sync" };
const queued: OverviewRelationship = { id: "queue-retry", from: checkout.id, to: jobs.id, label: "Queue a retry", route: "down", kind: "async" };
const delivers: OverviewRelationship = { id: "payment-jobs", from: jobs.id, to: worker.id, label: "Payment jobs", route: "across", kind: "async" };
const retries: OverviewRelationship = { id: "retry-payment", from: worker.id, to: api.id, label: "Retry payment", route: "up", kind: "sync" };
const statusPublication: OverviewRelationship = { id: "status-updated", from: api.id, to: jobs.id, label: "Publishes payment status update", route: "down", kind: "event" };

const original: MapRevision = {
  commit: "d2f5621", scopes: ["context", "containers"],
  observations: {
    ...contextObservations,
    checkout: { title: checkout.name, role: checkout.role, description: "Starts payments and retries failed attempts.", evidence: source(directRetry) },
    api: { title: api.name, role: api.role, description: "Authorizes and charges payments.", evidence: source(authorizeSource) },
    jobs: { title: jobs.name, role: jobs.role, description: "Buffers background payment jobs." },
    worker: { title: worker.name, role: worker.role, description: "Runs scheduled payment jobs." },
    authorize: { title: "Authorize", role: "Synchronous call", description: "Checkout calls the interface to authorize a payment.", evidence: source(authorizeSource) },
    scheduled: { title: scheduledJobs.label, role: "Asynchronous message", description: "The queue delivers scheduled payment jobs to the worker in this fixture." },
  },
  relationships: [{ ...authorize, label: "Authorize" }, scheduledJobs],
};

const beforeRetry: MapRevision = {
  ...original,
  commit: "06b7dd9",
  observations: {
    ...original.observations,
    api: { title: api.name, role: api.role, description: "Authorizes payments and exposes payment status.", evidence: source(statusSource) },
    authorize: { title: authorize.label, role: "Synchronous call", description: "Checkout can authorize a payment or query its current status.", evidence: source(statusSource) },
  },
  relationships: [authorize, scheduledJobs],
};

const checkoutUnconfirmed = "The merged source shows Checkout queuing a retry. Whether Checkout can still retry directly is unconfirmed.";
const afterRetry: MapRevision = {
  commit: "8e24c0a", scopes: [...beforeRetry.scopes, "worker", "implementation"],
  flows: { worker: { id: "retry", label: "View retry flow", observation: "handler" } },
  observations: {
    ...beforeRetry.observations, ...innerObservations,
    checkout: { title: checkout.name, role: checkout.role, description: "Starts payments and queues failed attempts.", note: checkoutUnconfirmed,
      confidence: "unconfirmed", change: "modified", evidence: source(queueRetry) },
    jobs: { title: jobs.name, role: jobs.role, description: "Buffers retries and scheduled payment jobs.", change: "modified" },
    worker: { title: worker.name, role: worker.role, description: "Retries payments from the queue.", confidence: "supported",
      change: "modified", evidence: source(runRetry), related: [exploreComponents, inspectRetry] },
    [queued.id]: { title: queued.label, role: "Asynchronous message", description: "Checkout queues a failed payment attempt.", confidence: "supported", change: "added", evidence: source(queueRetry) },
    [delivers.id]: { title: delivers.label, role: "Asynchronous message", description: "The worker registers a handler for the queued retry.", confidence: "supported", change: "modified", evidence: source(runRetry) },
    [retries.id]: { title: retries.label, role: "Synchronous call", description: "The worker awaits the retry call with the payment ID.", confidence: "supported", change: "added", evidence: source(runRetry) },
  },
  relationships: [authorize, queued, delivers, retries],
};

function side(map: MapRevision, details: ChangePresentation) {
  return { map, commit: map.commit, details };
}

const statusAfterMap: MapRevision = {
  ...beforeRetry,
  observations: {
    ...beforeRetry.observations,
    api: { ...beforeRetry.observations.api!, change: "modified" },
    authorize: { ...beforeRetry.observations.authorize!, change: "modified" },
  },
};

const statusMerge: MergePresentation = {
  id: 124, title: "Expose a payment status interface", date: "Nov 26 · 13:08 UTC",
  revisions: {
    before: side(original, { summary: "The cited interface authorizes a payment. Its earlier evidence does not show a separate status endpoint.", evidence: source(authorizeSource) }),
    after: side(statusAfterMap, { summary: "Checkout can display an in-progress payment without starting another authorization request.", evidence: source(statusSource) }),
  },
  intent: { kind: "missing" },
  deployment: { kind: "confirmed", environment: "Production", revision: beforeRetry.commit },
};

const retryMerge: MergePresentation = {
  id: 128, title: "Move retries to the payments worker", date: "Nov 27 · 10:42 UTC",
  revisions: {
    before: side(beforeRetry, { summary: "The cited Checkout failure path retries the payment directly.", evidence: source(directRetry) }),
    after: side(afterRetry, {
      summary: "Checkout queues failed attempts. Payments Worker can retry a queued payment through Payments API.",
      claims: [{ kind: "supported", text: "Payments Worker handles queued retries." }, { kind: "unconfirmed", text: "Whether Checkout still retries directly." }],
      related: [inspectRetry], evidence: source(queueRetry, runRetry),
    }),
  },
  intent: { kind: "documented", reference: "Issue #91 · Decision note", text: "Move retries off the request path so a slow payment processor does not hold the checkout response." },
  deployment: { kind: "unconfirmed" },
};

const laterRevision: MapRevision = {
  ...afterRetry, commit: "af129de",
  observations: {
    ...afterRetry.observations,
    checkout: { ...afterRetry.observations.checkout!, change: undefined },
    jobs: { ...afterRetry.observations.jobs!, description: "Buffers retries, scheduled jobs, and payment-status updates.", change: "modified" },
    worker: { ...afterRetry.observations.worker!, change: undefined },
    api: { ...afterRetry.observations.api!, description: "Authorizes payments, exposes their status, and publishes status updates to Payment jobs.", evidence: source(statusChangeAfter), change: "modified" },
    [queued.id]: { ...afterRetry.observations[queued.id]!, change: undefined },
    [delivers.id]: { ...afterRetry.observations[delivers.id]!, change: undefined },
    [retries.id]: { ...afterRetry.observations[retries.id]!, change: undefined },
    [statusPublication.id]: { title: statusPublication.label, role: "Event publication", description: "The API publishes a status update after persisting it.",
      confidence: "supported", change: "added", evidence: source(statusChangeAfter) },
  },
  relationships: [...afterRetry.relationships, statusPublication],
};

const laterBefore: ChangePresentation = { summary: "The cited API path persisted the payment status.", evidence: source(statusChangeBefore) };
const laterAfter: ChangePresentation = { summary: "The API now publishes an event to Payment jobs after persisting the payment status.",
  claims: [{ kind: "supported", text: "The status-write source establishes the new relationship independently of the earlier retry merge." }],
  evidence: source(statusChangeAfter),
};
const independentMerge: MergePresentation = {
  id: 129, title: "Publish payment status changes to Payment jobs", date: "Nov 27 · 11:20 UTC",
  revisions: { before: { commit: afterRetry.commit, details: laterBefore }, after: { commit: laterRevision.commit, details: laterAfter } },
  intent: { kind: "missing" }, deployment: { kind: "unconfirmed" },
};
const recoveredMerge: MergePresentation = {
  ...independentMerge,
  revisions: {
    before: side({
      ...afterRetry, observations: Object.fromEntries(Object.entries(afterRetry.observations).map(([id, item]) =>
        [id, item ? { ...item, change: undefined } : undefined])),
    }, laterBefore),
    after: side(laterRevision, laterAfter),
  },
};

const base = { repository: "acme/payments", branch: "main", overviewScope: "containers", nodes, scopes };
const ready = { map: afterRetry, merges: [retryMerge, statusMerge] };
const recovered = { map: laterRevision, merges: [recoveredMerge, retryMerge, statusMerge], status: { kind: "complete", label: "Analysis recovered · earlier gap resolved" } } as const;

export const paymentsWorkspaces = {
  ready: { ...base, initial: ready },
  public: { ...base, initial: ready, public: true },
  checking: { ...base, initial: { map: beforeRetry, merges: [statusMerge], status: { kind: "checking", label: "Checking latest merges" } },
    transition: { label: "Finish simulation", accessibleLabel: "Complete simulated analysis", result: { ...ready, status: { kind: "complete", label: "Analysis complete · #128 available" } } } },
  gap: { ...base, initial: { map: beforeRetry, merges: [independentMerge, statusMerge], status: { kind: "gap", label: "PR #128 analysis incomplete" } },
    transition: { label: "Complete simulated retry", result: recovered } },
  dependentGap: { ...base, initial: { map: beforeRetry, merges: [statusMerge], status: { kind: "gap", label: "PR #128 analysis incomplete · #129 waits for its evidence" } } },
} satisfies Record<string, WorkspacePresentation>;
