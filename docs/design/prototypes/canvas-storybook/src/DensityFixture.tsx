import {
  Controls, EdgeLabelRenderer, Handle, MarkerType, Position, ReactFlow, getSmoothStepPath,
  type Edge, type EdgeProps, type Node, type NodeProps,
} from "@xyflow/react";
import { ArchitectureNodeFace, type NodeIdentity, type NodePresentation } from "./ArchitectureNodeFace";
import { ConnectionStroke, type ConnectionKind } from "./architecture-visuals";

type DensityNode = Node<{ presentation: NodePresentation; incoming: boolean; outgoing: boolean }, "sample">;
type DensityEdge = Edge<{ kind: ConnectionKind; name: string }, "sample">;

const application: NodeIdentity = { family: "semantic", icon: "application" };
const api: NodeIdentity = { family: "semantic", icon: "api" };
const worker: NodeIdentity = { family: "semantic", icon: "worker" };
const queue: NodeIdentity = { family: "technical", kind: "queue" };
const database: NodeIdentity = { family: "technical", kind: "database" };
const storage: NodeIdentity = { family: "technical", kind: "storage" };

const tiers: [string, string, NodeIdentity][][] = [
  [
    ["Web portal", "Web application", { family: "semantic", icon: "checkout" }],
    ["Partner client", "Application", application],
    ["Account console", "Web application", { family: "semantic", icon: "identity" }],
    ["Search portal", "Web application", { family: "semantic", icon: "search" }],
    ["Notification console", "Web application", { family: "semantic", icon: "notifications" }],
    ["Operations client", "Application", application],
  ],
  [
    ["Request gateway", "Gateway", { family: "technical", kind: "gateway" }],
    ["Partner API", "Service", api],
    ["Account API", "Service", api],
    ["Search API", "Service", api],
    ["Notification API", "Service", api],
    ["Operations API", "Service", api],
  ],
  [
    ["Work queue", "Message queue", queue],
    ["Partner events", "Event bus", { family: "technical", kind: "bus" }],
    ["Account worker", "Background worker", worker],
    ["Index worker", "Background worker", worker],
    ["Delivery queue", "Message queue", queue],
    ["Audit worker", "Background worker", worker],
  ],
  [
    ["Output archive", "Object storage", storage],
    ["Partner archive", "Object storage", storage],
    ["Account store", "Database", database],
    ["Search index", "Data store", database],
  ],
];

const ids = (tier: number, col: number) => `${tier}-${col}`;
const links: [string, string, ConnectionKind, string][] = [
  ...["Routes requests", "Calls API", "Reads account", "Runs query", "Requests delivery", "Opens operation"].map(
    (label, col): [string, string, ConnectionKind, string] => [ids(0, col), ids(1, col), "sync", label],
  ),
  ["1-0", "2-0", "async", "Queues work"],
  ["1-1", "2-1", "event", "Publishes event"],
  ["1-2", "2-2", "async", "Queues account job"],
  ["1-3", "2-3", "async", "Queues indexing"],
  ["1-4", "2-4", "async", "Queues delivery"],
  ["1-5", "2-5", "unknown", "Operation link"],
  ["2-0", "3-0", "unknown", "Output link"],
  ["2-1", "3-1", "event", "Publishes archive event"],
  ["2-2", "3-2", "data", "Writes accounts"],
  ["2-3", "3-3", "data", "Writes index"],
];

const nodes: DensityNode[] = tiers.flatMap((tier, row) => tier.map(([name, role, identity], col) => {
  const id = ids(row, col);
  return {
    id,
    type: "sample",
    position: { x: col * 237, y: row * 150 },
    style: { width: 206 },
    data: {
      presentation: { name, role, identity, element: "Container" },
      incoming: links.some(([, to]) => to === id),
      outgoing: links.some(([from]) => from === id),
    },
  };
}));

const edges: DensityEdge[] = links.map(([source, target, kind, name]) => ({
  id: `${source}/${target}`,
  type: "sample",
  source,
  target,
  data: { kind, name },
  markerEnd: { type: kind === "sync" ? MarkerType.ArrowClosed : MarkerType.Arrow, color: "#6f6f6f", width: 12, height: 12 },
}));

function DensityTile({ data }: NodeProps<DensityNode>) {
  return (
    <div className="specimen-node">
      {data.incoming && <><Handle className="graph-handle" type="target" position={Position.Top} /><span className="schematic-port" data-port="top" aria-hidden="true" /></>}
      <ArchitectureNodeFace node={data.presentation} />
      {data.outgoing && <><Handle className="graph-handle" type="source" position={Position.Bottom} /><span className="schematic-port" data-port="bottom" aria-hidden="true" /></>}
    </div>
  );
}

function DensityLink(props: EdgeProps<DensityEdge>) {
  if (!props.data) return null;
  const [path, x, y] = getSmoothStepPath({ ...props, borderRadius: 8 });

  return (
    <>
      <ConnectionStroke path={path} kind={props.data.kind} markerEnd={props.markerEnd} />
      <EdgeLabelRenderer><span className="density-label" style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}>
        {props.data.name}
      </span></EdgeLabelRenderer>
    </>
  );
}

const nodeTypes = { sample: DensityTile };
const edgeTypes = { sample: DensityLink };

export function DensityFixture() {
  return (
    <div className="density-fixture">
      <ReactFlow<DensityNode, DensityEdge> aria-label="Synthetic architecture density fixture"
        nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}
        fitView fitViewOptions={{ padding: 0.05, maxZoom: 1 }} minZoom={0.2} maxZoom={2} zoomOnScroll={false}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        nodesFocusable={false} edgesFocusable={false} proOptions={{ hideAttribution: true }}>
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
