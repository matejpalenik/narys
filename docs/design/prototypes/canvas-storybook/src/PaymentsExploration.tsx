import { ArrowRight, Braces, CircleUser, Code2, Workflow } from "lucide-react";
import { paymentNodeVisuals, ArchitectureNodeFace } from "./ArchitectureNodeFace";
import { ConnectionSample, type ConnectionKind } from "./architecture-visuals";
import { CodeSymbolCard, type CodeSymbol } from "./CodeSymbolCard";
import { Button } from "./components/ui/button";
import { components } from "./fixture";

export type ArchitectureScope = "context" | "containers" | "worker" | "implementation";
type DiagramScope = Exclude<ArchitectureScope, "containers">;

export const paymentsObservations = {
  shopper: { label: "Shopper", role: "User", description: "Starts a payment through Checkout in this orientation example." },
  payments: { label: "Payments", role: "Selected software area", description: "Starts payments, reports their status, and handles background payment retries." },
  processor: { label: "Payment processor", role: "External system", description: "The decision note mentions a payment processor. The fixture does not establish its interface or where it runs." },
  starts: { label: "Starts a payment", role: "Context relationship", description: "Illustrates how a shopper uses the selected Payments area." },
  processing: { label: "Uses a processor", role: "Context relationship", description: "Illustrates the external dependency mentioned in Issue #91. The supplied source excerpt does not establish this integration." },
  jobs: { label: "Payment jobs", role: "External to worker · Container", description: "Provides the queued payment.retry job consumed by the worker handler." },
  handler: { label: "Retry handler", role: "Component · Job handler", description: "Handles payment.retry messages and passes the payment ID to Payments API." },
  api: { label: "Payments API", role: "External to worker · Container", description: "Receives the retry call with the payment ID." },
  message: { label: "Delivers retry job", role: "Asynchronous message", description: "The worker registers a handler for the payment.retry job." },
  retry: { label: "Calls retry", role: "Synchronous call", description: "The handler awaits paymentsApi.retry(paymentId)." },
  register: { label: "worker.register", role: "Registration call", description: "Associates payment.retry with the callback supplied in this file." },
  callback: { label: "Retry callback", role: "Anonymous function", description: "Receives paymentId and awaits the API retry call." },
  call: { label: "paymentsApi.retry", role: "Method call", description: "Receives paymentId from the retry callback. The method body is outside this excerpt." },
  registers: { label: "Registers callback", role: "Registration", description: "The anonymous function is passed as the second argument to worker.register." },
  calls: { label: "Awaits retry call", role: "Call", description: "The body of the callback awaits paymentsApi.retry(paymentId)." },
} as const;

export type PaymentsObservation = keyof typeof paymentsObservations;

const codeSymbols: Partial<Record<PaymentsObservation, CodeSymbol>> = {
  register: { name: "worker.register", kind: "Call", members: ['register("payment.retry", …)'] },
  callback: { name: "Retry callback", kind: "Function", members: ["async ({ paymentId }) => …"] },
  call: { name: "paymentsApi.retry", kind: "Call", members: ["await paymentsApi.retry(paymentId)"] },
};

const diagrams = {
  context: { nodes: ["shopper", "payments", "processor"], edges: [["starts", "sync"], ["processing", "unknown"]] },
  worker: { nodes: ["jobs", "handler", "api"], edges: [["message", "async"], ["retry", "sync"]] },
  implementation: { nodes: ["register", "callback", "call"], edges: [["registers", "data"], ["calls", "sync"]] },
} as const satisfies Record<DiagramScope, { nodes: readonly PaymentsObservation[]; edges: readonly (readonly [PaymentsObservation, ConnectionKind])[] }>;

export function PaymentsScopeMap({ scope, panelVisible, selected, onSelect }: {
  scope: DiagramScope;
  panelVisible: boolean;
  selected?: PaymentsObservation;
  onSelect: (id: PaymentsObservation) => void;
}) {
  const diagram = diagrams[scope];
  return (
    <section className="payments-scope-map" data-inspector={panelVisible} aria-label={scope === "implementation" ? "Retry handler implementation map" : scope === "worker" ? "Payments Worker component map" : "Payments system context"}>
      <div className="payments-scope-content">
        <p className="scope-qualifier">{scope === "context" ? "Synthetic context · selected area only" : scope === "worker" ? "Retry responsibility · source excerpt scope" : components.worker.path}</p>
        <div className="scope-diagram" data-scope={scope}>
          {diagram.nodes.map((id, index) => {
            const item = paymentsObservations[id];
            const edge = diagram.edges[index];
            const Icon = id === "shopper" ? CircleUser : id === "processor" ? Workflow : id === "handler" ? Braces : Code2;
            const container = id === "jobs" || id === "api";
            const symbol = codeSymbols[id];
            return (
              <div className="scope-step" key={id}>
                {symbol ? <CodeSymbolCard symbol={symbol} selected={selected === id} controlId={`observation-${id}`} onInspect={() => onSelect(id)} />
                  : <button className="scope-node" type="button" data-map-control={`observation-${id}`} aria-label={`Inspect ${item.label}`}
                  aria-pressed={selected === id} onClick={() => onSelect(id)}>
                  {container ? <ArchitectureNodeFace node={{ ...paymentNodeVisuals[id], name: item.label }} /> : <>
                    <Icon size={22} aria-hidden="true" />
                    <span><strong>{item.label}</strong><small>{item.role}</small></span>
                  </>}
                </button>}
                {edge && <button type="button" className="scope-edge" data-map-control={`observation-${edge[0]}`}
                  aria-label={`Inspect ${paymentsObservations[edge[0]].label}`} aria-pressed={selected === edge[0]} onClick={() => onSelect(edge[0])}>
                  <span>{paymentsObservations[edge[0]].label}</span><ConnectionSample kind={edge[1]} />
                </button>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function UnavailableScope({ commit, panelVisible, onBack }: { commit: string; panelVisible: boolean; onBack: () => void }) {
  return <section className="payments-scope-map" data-inspector={panelVisible} aria-label="Scope evidence unavailable">
    <div className="scope-unavailable">
      <h2>Worker internals unavailable</h2>
      <p>The available source does not establish the retry handler at <code>{commit}</code>.</p>
      <Button variant="outline" type="button" onClick={onBack}>Return to Containers <ArrowRight size={15} aria-hidden="true" /></Button>
    </div>
  </section>;
}
