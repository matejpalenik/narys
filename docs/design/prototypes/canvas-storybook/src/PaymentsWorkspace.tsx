import { Layers3, Server } from "lucide-react";
import { paymentsWorkspaces } from "./fixture";
import { RetrySchematic } from "./PaymentsRetryFlow";
import { Workspace, type WorkspaceProps } from "./Workspace";

type PaymentsWorkspaceProps = Omit<WorkspaceProps, "model" | "startScope" | "startFlow" | "renderFlow"> & {
  scenario?: keyof typeof paymentsWorkspaces;
  startAtWorker?: boolean;
  startAtContext?: boolean;
};

function ArchivedRetryDiagram() {
  return <figure className="worker-drawing" aria-label="Payment retry flow">
    <ol className="worker-flow" role="list">
      <li className="worker-terminal"><Layers3 size={22} aria-hidden="true" /><strong>Payment jobs</strong><code>payment.retry</code></li>
      <li className="worker-boundary"><span className="worker-boundary-label">Worker boundary</span><span className="worker-linework" aria-hidden="true"><i /><i /><i /></span><strong>Retry handler</strong></li>
      <li className="worker-terminal"><Server size={22} aria-hidden="true" /><strong>Payments API</strong><code>retry(paymentId)</code></li>
    </ol>
  </figure>;
}

export function PaymentsWorkspace({ scenario = "ready", startAtWorker, startAtContext, ...props }: PaymentsWorkspaceProps) {
  return <Workspace key={scenario} {...props} model={paymentsWorkspaces[scenario]} startFlow={startAtWorker}
    startScope={startAtWorker ? "worker" : startAtContext ? "context" : undefined}
    renderFlow={(_, panelVisible) => props.schematic ? <RetrySchematic panelVisible={panelVisible} /> : <ArchivedRetryDiagram />} />;
}
