import { useId } from "react";
import { Check, CircleHelp, Minus, Plus, Triangle } from "lucide-react";
import { ApiGatewayGlyph } from "./ApiGatewayGlyph";
import { ApiPlugGlyph } from "./ApiPlugGlyph";
import { CacheGlyph } from "./CacheGlyph";
import { ComputeUnitGlyph } from "./ComputeUnitGlyph";
import { DatabaseGlyph } from "./DatabaseGlyph";
import { EventBusGlyph } from "./EventBusGlyph";
import { EventStreamGlyph } from "./EventStreamGlyph";
import { ObjectStorageGlyph } from "./ObjectStorageGlyph";
import { SchedulerGlyph } from "./SchedulerGlyph";
import { ServerlessFunctionGlyph } from "./ServerlessFunctionGlyph";
import { WebApplicationGlyph } from "./WebApplicationGlyph";
import { WorkerGlyph } from "./WorkerGlyph";

export const primitiveNames = {
  web: "Web application",
  service: "Compute unit",
  api: "API connector",
  worker: "Worker mechanism",
  scheduler: "Scheduler",
  serverless: "Serverless function",
  database: "Database",
  cache: "Cache",
  queue: "Message queue",
  bus: "Event bus",
  stream: "Event stream",
  gateway: "API Gateway",
  storage: "Object storage",
  boundary: "Boundary",
} as const;

export type Primitive = keyof typeof primitiveNames;

const geometry = {
  boundary: {
    shell: "M14 26V12h21m42 0h22v14m0 16v14H77m-42 0H14V42",
    detail: "M14 30v8m85-8v8M39 12h7m6 0h8m6 0h7M39 56h7m6 0h8m6 0h7M36 27h17v15H36zm27 0h17v15H63zM53 34h10",
    ports: "M9 34h5m85 0h5m-47-22V7m0 49v7",
  },
};

export function ArchitectureGlyph({ kind, detail = "compact", draw = false }: {
  kind: Primitive;
  detail?: "compact" | "detailed";
  draw?: boolean;
}) {
  if (kind === "api") return <ApiPlugGlyph />;
  if (kind === "bus") return <EventBusGlyph draw={draw} />;
  if (kind === "cache") return <CacheGlyph />;
  if (kind === "database") return <DatabaseGlyph />;
  if (kind === "gateway") return <ApiGatewayGlyph />;
  if (kind === "queue") return <MessageQueueGlyph />;
  if (kind === "scheduler") return <SchedulerGlyph />;
  if (kind === "serverless") return <ServerlessFunctionGlyph />;
  if (kind === "service") return <ComputeUnitGlyph />;
  if (kind === "storage") return <ObjectStorageGlyph />;
  if (kind === "stream") return <EventStreamGlyph />;
  if (kind === "web") return <WebApplicationGlyph />;
  if (kind === "worker") return <WorkerGlyph />;
  const { shell, detail: interior, ports } = geometry[kind];

  return (
    <svg className="architecture-glyph" data-detail={detail} data-draw={draw || undefined}
      viewBox="0 0 116 69" aria-hidden="true" fill="none" stroke="currentColor" strokeLinejoin="round">
      <path className="glyph-shell" d={shell} pathLength={1} />
      <path className="glyph-interior" d={interior} />
      <path className="glyph-ports" d={ports} />
    </svg>
  );
}

export function MessageQueueGlyph({ animated = false }: { animated?: boolean }) {
  return (
    <svg className="architecture-glyph message-queue-glyph" viewBox="0 0 136 84"
      data-animated={animated || undefined} aria-hidden="true">
      <g data-part="shell" fill="#ffffff" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
        <path d="M6 22 20.5 7.5H129V63L114.5 77.5H6Z" />
        <path d="M6 22H114.5L129 7.5M114.5 22V77.5" fill="none" />
      </g>
      <g data-part="message-slots" fill="#ffffff" stroke="#262626" strokeWidth="1.2">
        {[15, 47, 79].map((x, index) => (
          <rect key={x} className="message-slot" data-part={`slot-${index + 1}`} x={x} y="31" width="23" height="38" />
        ))}
      </g>
    </svg>
  );
}

export const connectionNames = {
  sync: "Synchronous call",
  async: "Asynchronous message",
  event: "Event publication",
  data: "Data dependency",
  unknown: "Unconfirmed semantics",
} as const;

export type ConnectionKind = keyof typeof connectionNames;
export type ArchitectureChange = "unchanged" | "added" | "modified" | "removed";

const changes = {
  unchanged: { label: "Unchanged", Icon: Minus },
  added: { label: "Added", Icon: Plus },
  modified: { label: "Modified", Icon: Triangle },
  removed: { label: "Removed", Icon: Minus },
} satisfies Record<ArchitectureChange, { label: string; Icon: typeof Plus }>;

export function ChangeMark({ change }: { change: ArchitectureChange }) {
  const { label, Icon } = changes[change];
  return <span className="schematic-mark" data-change={change}><Icon size={11} aria-hidden="true" />{label}</span>;
}

export function ConfidenceMark({ confidence }: { confidence: "supported" | "unconfirmed" }) {
  const Icon = confidence === "supported" ? Check : CircleHelp;
  return <span className="schematic-confidence" data-confidence={confidence}><Icon size={12} aria-hidden="true" />
    {confidence === "supported" ? "Source supported" : "Unconfirmed"}
  </span>;
}

export function ConnectionStroke({ path, kind, markerEnd, className, change = "unchanged" }: {
  path: string;
  kind: ConnectionKind;
  markerEnd?: string;
  className?: string;
  change?: ArchitectureChange;
}) {
  return <path d={path} fill="none" markerEnd={markerEnd} className={`schematic-connection ${className ?? ""}`}
    data-kind={kind} data-change={change} />;
}

export function ConnectionSample({ kind, removed = false }: { kind: ConnectionKind; removed?: boolean }) {
  const marker = useId();
  return (
    <svg className="connection-sample" viewBox="0 0 140 28" aria-hidden="true">
      <defs>
        <marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 7 4 1 7" fill="none" stroke="context-stroke" />
        </marker>
      </defs>
      <circle cx="7" cy="14" r="3" fill="var(--panel)" stroke="var(--draft-line)" />
      <ConnectionStroke path="M10 14H130" kind={kind} change={removed ? "removed" : "unchanged"} markerEnd={`url(#${marker})`} />
    </svg>
  );
}
