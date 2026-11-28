export type ComponentId = "checkout" | "api" | "jobs" | "worker";

export interface Relationship {
  id: string;
  from: ComponentId;
  to: ComponentId;
  label: string;
  route: "across" | "down" | "up";
  added?: boolean;
}

export interface MapRevision {
  commit: string;
  responsibilities: Record<ComponentId, string>;
  relationships: Relationship[];
  retryPath: boolean;
}

interface SourceExcerpt {
  path: string;
  code: string;
}

export interface Merge {
  id: number;
  title: string;
  date: string;
  before: MapRevision;
  after: MapRevision;
  summary: string;
  rationale?: { label: string; text: string };
  deployment?: { environment: string; commit: string };
  evidence: Record<"before" | "after", SourceExcerpt[]>;
}

export const components = {
  checkout: { name: "Checkout", type: "Web app", path: "apps/checkout/payments.ts" },
  api: { name: "Payments API", type: "Service", path: "services/payments/api.ts" },
  jobs: { name: "Payment jobs", type: "Queue", path: "packages/jobs/payments.ts" },
  worker: { name: "Payments Worker", type: "Worker", path: "services/payments/worker.ts" },
} satisfies Record<ComponentId, { name: string; type: string; path: string }>;

const scheduledJobs: Relationship = { id: "scheduled", from: "jobs", to: "worker", label: "Scheduled jobs", route: "across" };
const authorize: Relationship = { id: "authorize", from: "checkout", to: "api", label: "Authorize + status", route: "across" };

const original: MapRevision = {
  commit: "d2f5621",
  retryPath: false,
  responsibilities: {
    checkout: "Starts payments and retries failed attempts.",
    api: "Authorizes and charges payments.",
    jobs: "Buffers background payment jobs.",
    worker: "Runs scheduled payment jobs.",
  },
  relationships: [{ ...authorize, label: "Authorize" }, scheduledJobs],
};

const beforeRetry: MapRevision = {
  ...original,
  commit: "06b7dd9",
  responsibilities: { ...original.responsibilities, api: "Authorizes payments and exposes payment status." },
  relationships: [authorize, scheduledJobs],
};

export const afterRetry: MapRevision = {
  commit: "8e24c0a",
  retryPath: true,
  responsibilities: {
    checkout: "Starts payments and queues failed attempts.",
    api: beforeRetry.responsibilities.api,
    jobs: "Buffers retries and scheduled payment jobs.",
    worker: "Retries payments from the queue.",
  },
  relationships: [
    authorize,
    { id: "queue-retry", from: "checkout", to: "jobs", label: "Queue a retry", route: "down", added: true },
    { id: "payment-jobs", from: "jobs", to: "worker", label: "Payment jobs", route: "across", added: true },
    { id: "retry-payment", from: "worker", to: "api", label: "Retry payment", route: "up", added: true },
  ],
};

export const retryMerge: Merge = {
  id: 128,
  title: "Move retries to the payments worker",
  date: "Nov 27 · 10:42 UTC",
  before: beforeRetry,
  after: afterRetry,
  summary: "Checkout queues failed attempts. Payments Worker can retry a queued payment through Payments API.",
  rationale: {
    label: "Issue #91 · Decision note",
    text: "Move retries off the request path so a slow payment processor does not hold the checkout response.",
  },
  evidence: {
    before: [{ path: components.checkout.path, code: 'if (!attempt.succeeded) {\n  return paymentsApi.retry(paymentId);\n}' }],
    after: [
      { path: components.checkout.path, code: 'await paymentJobs.publish("payment.retry", { paymentId });' },
      { path: components.worker.path, code: 'worker.register("payment.retry", async ({ paymentId }) => {\n  await paymentsApi.retry(paymentId);\n});' },
    ],
  },
};

export const statusMerge: Merge = {
  id: 124,
  title: "Expose a payment status interface",
  date: "Nov 26 · 13:08 UTC",
  before: original,
  after: beforeRetry,
  summary: "Checkout can display an in-progress payment without starting another authorization request.",
  deployment: { environment: "Production", commit: beforeRetry.commit },
  evidence: {
    before: [{ path: components.api.path, code: 'router.post("/payments/authorize", authorizePayment);' }],
    after: [{ path: components.api.path, code: 'router.get("/payments/:id/status", readPaymentStatus);' }],
  },
};

export const checkoutGap = "The merged source shows Checkout queuing a retry. Whether Checkout can still retry directly is unconfirmed.";
