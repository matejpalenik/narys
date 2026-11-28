import { useId, type ReactNode, type Ref } from "react";
import { ArrowRight, Braces, Check, ChevronDown, CircleHelp, ExternalLink, TriangleAlert, X } from "lucide-react";
import { ArchitectureNodeFace, type NodePresentation } from "./ArchitectureNodeFace";
import { ChangeMark, ConfidenceMark } from "./architecture-visuals";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import type { RevisionSide } from "./RevisionSwitch";
import type {
  ChangePresentation, Claim, ContextAction, DeploymentEvidence, ObservationPresentation, RecordedIntent, ReferenceLink, SourceEvidence,
} from "./presentation";

type ActionHandler = (action: Exclude<ContextAction, { kind: "unavailable" }>) => void;

export function Inspector({ id, title, titleRef, leading, meta, onDismiss, children, layout = "overlay" }: {
  id?: string;
  layout?: "overlay" | "docked";
  title: string;
  titleRef?: Ref<HTMLHeadingElement>;
  leading?: ReactNode;
  meta?: ReactNode;
  onDismiss?: () => void;
  children: ReactNode;
}) {
  const heading = useId();
  return <aside className={layout === "docked" ? "density-inspector" : "inspector"} id={id} aria-labelledby={heading}>
    <div className="inspector-heading">
      {(leading || onDismiss) && <div className="inspector-topline">
        {leading}
        {onDismiss && <Button variant="outline" size="icon-sm" className="dismiss" type="button" aria-label="Close inspector" onClick={onDismiss}>
          <X size={17} aria-hidden="true" />
        </Button>}
      </div>}
      {meta}
      <h2 id={heading} tabIndex={-1} ref={titleRef}>{title}</h2>
    </div>
    <div className="inspector-body">{children}</div>
  </aside>;
}

function EvidenceStatus({ kind, children }: { kind: "supported" | "unconfirmed" | "divergence"; children: string }) {
  const Icon = kind === "supported" ? Check : kind === "divergence" ? TriangleAlert : CircleHelp;
  return <Badge variant="outline" className="status-tag" data-kind={kind}><Icon size={13} aria-hidden="true" />{children}</Badge>;
}

function Reference({ link }: { link: ReferenceLink }) {
  return <a className="inspector-reference" href={link.href} target="_blank" rel="noreferrer">
    {link.label}<ExternalLink size={13} aria-hidden="true" />
  </a>;
}

function EvidenceDisclosure({ evidence, revision }: { evidence?: SourceEvidence; revision: string }) {
  if (!evidence) return null;
  if (evidence.kind === "unavailable") return <div className="detail-section" aria-label="Source evidence">
    <h3>Source temporarily unavailable</h3><p>{evidence.reason}</p><code>{revision}</code>
  </div>;
  return <details className="evidence-disclosure" open={evidence.expanded}>
    <summary><Braces size={16} aria-hidden="true" /><span>Inspect source at <code>{revision}</code></span><ChevronDown size={15} aria-hidden="true" /></summary>
    <div className="source-excerpts">
      {evidence.excerpts.map(({ label, path, range, href, code }) => {
        const reference = range ? `${path} · ${range}` : path;
        return <div key={reference}>
          {label && <p>{label}</p>}
          {href ? <a className="inspector-reference" href={href} target="_blank" rel="noreferrer"><code>{reference}</code><ExternalLink size={13} aria-hidden="true" /></a> : <code>{reference}</code>}
          <pre>{code}</pre>
        </div>;
      })}
    </div>
  </details>;
}

function Claims({ values, revision }: { values?: readonly Claim[]; revision: string }) {
  if (!values?.length) return null;
  return <div className="claim-list">
    {values.map(value => <div key={value.text}>
      <EvidenceStatus kind={value.kind}>{value.kind === "divergence" ? "Possible divergence" : value.kind === "supported" ? "Supported by source" : "Unconfirmed"}</EvidenceStatus>
      {value.kind === "divergence" && <><p><strong>{value.attribution}</strong></p><p>{value.reported}</p></>}
      <p>{value.text}</p>
      {value.kind === "divergence" && <EvidenceDisclosure evidence={value.evidence} revision={revision} />}
    </div>)}
  </div>;
}

export function ContextActions({ actions, onAction }: { actions?: readonly ContextAction[]; onAction: ActionHandler }) {
  const id = useId();
  if (!actions?.length) return null;
  return <div className="inspector-actions" role="group" aria-label="Related observations">
    {actions.map(action => {
      const note = action.kind === "unavailable" ? action.reason : action.kind === "inspect" ? action.uncertainty : undefined;
      const description = `${id}-${action.id}`;
      return <div key={action.id}>
        <Button variant="outline" size="sm" type="button" data-inspector-action={action.id} aria-describedby={note ? description : undefined}
          disabled={action.kind === "unavailable"} onClick={() => { if (action.kind !== "unavailable") onAction(action); }}>
          {action.label}<ArrowRight size={14} aria-hidden="true" />
        </Button>
        {note && <p id={description}>{note}</p>}
      </div>;
    })}
  </div>;
}

export function ChangeDetails({ value, side, revision, intent, deployment, onAction }: {
  value: ChangePresentation;
  side: RevisionSide;
  revision: string;
  intent: RecordedIntent;
  deployment: DeploymentEvidence;
  onAction: ActionHandler;
}) {
  return <>
    <section className="detail-section">
      <h3>{value.responsibility?.title ?? "What changed"}</h3>
      {value.responsibility && <dl className="responsibility-transfer">
        <div data-current={side === "before"}><dt>Before</dt><dd>{value.responsibility.before}</dd></div>
        <div data-current={side === "after"}><dt>After</dt><dd>{value.responsibility.after}</dd></div>
      </dl>}
      <p>{value.summary}</p>
      <Claims values={value.claims} revision={revision} />
      <ContextActions actions={value.related} onAction={onAction} />
      {value.references?.map(link => <Reference key={link.href} link={link} />)}
    </section>
    <section className="detail-section">
      <h3>{intent.kind === "documented" && intent.href ? "Documented intent" : "Why"}</h3>
      {intent.kind === "missing" ? <p>Missing rationale</p>
        : intent.href ? <><p>{intent.text}</p><Reference link={{ href: intent.href, label: intent.reference }} /></>
        : <details className="rationale-disclosure">
          <summary className="source-reference"><Braces size={14} aria-hidden="true" />{intent.reference}<ChevronDown size={14} aria-hidden="true" /></summary>
          <p><strong>Documented intent</strong> · {intent.text}</p>
        </details>}
      {intent.kind === "documented" && intent.outcome && <p><strong>{intent.outcome.label}</strong> · {intent.outcome.text}</p>}
    </section>
    <EvidenceDisclosure evidence={value.evidence} revision={revision} />
    <section className="detail-section deployment">
      <h3>Deployment</h3>
      {deployment.kind === "confirmed" ? <EvidenceStatus kind="supported">{`Confirmed in ${deployment.environment} at ${deployment.revision}`}</EvidenceStatus>
        : <EvidenceStatus kind="unconfirmed">Deployment unconfirmed</EvidenceStatus>}
    </section>
  </>;
}

export function ObservationDetails({ observation, revision, node, relationship, onAction }: {
  observation: ObservationPresentation;
  revision: string;
  node?: NodePresentation;
  relationship?: { source: string; target: string };
  onAction: ActionHandler;
}) {
  return <section className="detail-section map-detail">
    {relationship && <p className="relationship-title">{relationship.source} <ArrowRight size={14} aria-hidden="true" /> {relationship.target}</p>}
    {node ? <div className="architecture-inspection"><ArchitectureNodeFace variant="detailed" node={{ ...node, responsibility: observation.description }}
      status={observation.confidence} change={observation.change} /></div> : <>
      <p>{observation.description}</p>
      {(observation.confidence || observation.change) && <div className="observation-marks">
        {observation.confidence && <ConfidenceMark confidence={observation.confidence} />}
        {observation.change && <ChangeMark change={observation.change} />}
      </div>}
    </>}
    {observation.note && <p className="scope-inspector-note">{observation.note}</p>}
    <p className="observation-revision">Revision <code>{revision}</code></p>
    <Claims values={observation.claims} revision={revision} />
    <EvidenceDisclosure key={revision} evidence={observation.evidence} revision={revision} />
    <ContextActions actions={observation.related} onAction={onAction} />
  </section>;
}
