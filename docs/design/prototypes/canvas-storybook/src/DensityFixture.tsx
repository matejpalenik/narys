import { useLayoutEffect, useRef, useState } from "react";
import {
  ControlButton, Controls, EdgeLabelRenderer, Handle, MarkerType, Position, ReactFlow, useReactFlow,
  type Edge, type EdgeProps, type Node, type NodeProps,
} from "@xyflow/react";
import { Maximize, Minus, Plus, X } from "lucide-react";
import { ArchitectureNodeFace, type NodeIdentity, type NodePresentation } from "./ArchitectureNodeFace";
import { ConnectionSample, ConnectionStroke, connectionNames, type ConnectionKind } from "./architecture-visuals";
import { Button } from "./components/ui/button";

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

const tileWidth = 206;
const columnX = (col: number) => col * 237 + Math.floor(col / 2) * 58;
const groups = ["Gateway & partners", "Accounts & search", "Delivery & operations"];
const groupNodes: Node<{ label: string }, "groupLabel">[] = groups.map((label, index) => ({
  id: `group-${index}`, type: "groupLabel",
  position: { x: columnX(index * 2), y: -58 },
  style: { width: columnX(1) + tileWidth },
  data: { label },
}));

const inventory = Object.fromEntries(tiers.flatMap((tier, row) => tier.map(([name, role, identity], col) => [
  `${row}-${col}`, { name, role, identity, element: "Container", row, col },
]))) as Record<string, NodePresentation & { row: number; col: number }>;

type LinkSpec = [source: string, target: string, kind: ConnectionKind, name: string, lane?: number, viaAfterColumn?: number];

const linkSpecs: LinkSpec[] = [
  ["0-0", "1-0", "sync", "Opens session", 14],
  ["0-1", "1-0", "sync", "Sends partner requests", 40],
  ["0-2", "1-0", "sync", "Authenticates account", 68],
  ["0-3", "1-3", "sync", "Runs query"],
  ["0-4", "1-4", "sync", "Requests delivery"],
  ["0-5", "1-5", "sync", "Opens operation"],
  ["1-0", "1-1", "sync", "Routes partner request", 24],
  ["1-0", "1-2", "sync", "Routes account request", 47],
  ["1-0", "1-3", "sync", "Routes search request", 69],
  ["1-0", "2-0", "async", "Queues platform work", 60],
  ["1-1", "2-1", "event", "Publishes partner event"],
  ["1-2", "2-0", "async", "Queues account work", 81],
  ["1-2", "3-2", "data", "Reads accounts", 13, 2],
  ["1-3", "3-3", "data", "Reads search index", 13, 3],
  ["1-4", "2-4", "async", "Queues delivery"],
  ["1-5", "2-5", "unknown", "Operation link"],
  ["1-5", "3-2", "data", "Looks up account", 81, 4],
  ["2-0", "2-2", "async", "Consumes account work", 24],
  ["2-0", "2-3", "async", "Consumes index work", 43],
  ["2-1", "2-2", "event", "Updates account projection", 57],
  ["2-1", "2-3", "event", "Reindexes partner items", 73],
  ["2-1", "2-5", "event", "Records partner event", 93],
  ["2-2", "3-2", "data", "Writes accounts"],
  ["2-2", "2-4", "async", "Queues account notification", 34],
  ["2-3", "3-3", "data", "Writes index"],
  ["2-4", "2-5", "event", "Records delivery receipt", 24],
  ["2-5", "3-0", "data", "Archives audit output", 106],
  ["2-5", "3-1", "data", "Archives partner audit", 118],
];

const links = linkSpecs.map(([source, target, kind, name, lane = 54, viaAfterColumn]) => ({
  id: `${source}/${target}`, source, target, kind, name, lane,
  sameRow: inventory[source].row === inventory[target].row,
  viaX: viaAfterColumn === undefined ? undefined : (columnX(viaAfterColumn) + tileWidth + columnX(viaAfterColumn + 1)) / 2,
}));

type DensityLink = typeof links[number];
type Selection = { kind: "node" | "edge"; id: string };
type DensityNode = Node<{
  id: string;
  presentation: NodePresentation;
  incoming: boolean;
  lowerIncoming: boolean;
  outgoing: boolean;
  active: boolean;
  quiet: boolean;
  inspect: () => void;
}, "sample">;
type GroupNode = typeof groupNodes[number];
type DensityEdge = Edge<DensityLink & { quiet: boolean; active: boolean; showLabel: boolean; inspect: () => void }, "sample">;

function DensityTile({ data }: NodeProps<DensityNode>) {
  return (
    <div className="density-tile" data-quiet={data.quiet || undefined}>
      {data.incoming && <Handle className="graph-handle" id="upper" type="target" position={Position.Top} />}
      {data.lowerIncoming && <Handle className="graph-handle" id="lower" type="target" position={Position.Bottom} />}
      {data.outgoing && <Handle className="graph-handle" id="output" type="source" position={Position.Bottom} />}
      <button className="specimen-node nodrag nopan" type="button" aria-label={`Inspect ${data.presentation.name}`}
        aria-pressed={data.active} data-selected={data.active || undefined} data-density-control={data.id} onClick={data.inspect}>
        <ArchitectureNodeFace node={data.presentation} />
      </button>
      {data.incoming && <span className="schematic-port" data-port="top" aria-hidden="true" />}
      {(data.outgoing || data.lowerIncoming) && <span className="schematic-port" data-port="bottom" aria-hidden="true" />}
    </div>
  );
}

function DensityGroup({ data }: NodeProps<GroupNode>) {
  return <div className="density-group">{data.label}</div>;
}

function DensityConnection({ data, sourceX, sourceY, targetX, targetY, markerEnd }: EdgeProps<DensityEdge>) {
  if (!data) return null;
  const laneY = sourceY + data.lane;
  const entryY = targetY - 17;
  const bendX = data.viaX ?? targetX;
  const vertical = Math.abs(sourceX - bendX) < 1;
  const path = vertical ? `M${sourceX} ${sourceY} V${targetY}` : data.viaX === undefined
    ? `M${sourceX} ${sourceY} V${laneY} H${targetX} V${targetY}`
    : `M${sourceX} ${sourceY} V${laneY} H${bendX} V${entryY} H${targetX} V${targetY}`;
  const labelX = vertical ? sourceX : (sourceX + bendX) / 2;

  return (
    <>
      <g data-density-route={data.id} data-quiet={data.quiet || undefined}>
        <ConnectionStroke path={path} kind={data.kind} markerEnd={markerEnd} className={data.active ? "schematic-connection-selected" : undefined} />
        <path className="density-hitbox" d={path} onClick={data.inspect} aria-hidden="true" />
      </g>
      <EdgeLabelRenderer>
        <button type="button" className="density-label nodrag nopan" data-visible={data.showLabel} data-density-control={data.id}
          aria-pressed={data.active} aria-label={`Inspect ${inventory[data.source].name} to ${inventory[data.target].name}, ${data.name}`}
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${laneY}px)` }} onClick={data.inspect}>
          {data.name}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

const nodeTypes = { sample: DensityTile, groupLabel: DensityGroup };
const edgeTypes = { sample: DensityConnection };
const fitOptions = { padding: 0.06, maxZoom: 1 };
const minZoom = 0.2;
const maxZoom = 2;

function DensityControls({ focusIds }: { focusIds: string[] }) {
  const { fitView, getNodesBounds, getZoom, setCenter, zoomIn, zoomOut } = useReactFlow();

  function zoom(factor: number) {
    if (!focusIds.length) {
      void (factor > 1 ? zoomIn() : zoomOut());
      return;
    }
    const bounds = getNodesBounds(focusIds);
    const nextZoom = Math.min(maxZoom, Math.max(minZoom, getZoom() * factor));
    void setCenter(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, { zoom: nextZoom });
  }

  return (
    <Controls position="bottom-right" showZoom={false} showFitView={false} showInteractive={false}>
      <ControlButton aria-label="Zoom In" title="Zoom In" onClick={() => zoom(1.2)}><Plus aria-hidden="true" /></ControlButton>
      <ControlButton aria-label="Zoom Out" title="Zoom Out" onClick={() => zoom(1 / 1.2)}><Minus aria-hidden="true" /></ControlButton>
      <ControlButton aria-label="Fit View" title="Fit View" onClick={() => void fitView(fitOptions)}><Maximize aria-hidden="true" /></ControlButton>
    </Controls>
  );
}

export function DensityFixture() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [detailed, setDetailed] = useState(false);
  const fixture = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<string | null>(null);
  const selectedLink = selection?.kind === "edge" ? links.find(link => link.id === selection.id) : undefined;
  const selectedNode = selection?.kind === "node" ? inventory[selection.id] : undefined;
  const relatedLinks = selectedNode ? links.filter(link => link.source === selection?.id || link.target === selection?.id) : [];
  const focusedLinks = selectedLink ? [selectedLink] : relatedLinks;
  const focusedNodes = new Set(focusedLinks.flatMap(link => [link.source, link.target]));
  const zoomFocus = selectedLink ? [selectedLink.source, selectedLink.target] : selection ? [selection.id] : [];

  useLayoutEffect(() => {
    if (selection) { title.current?.focus(); return; }
    const prior = returnFocus.current;
    if (prior) fixture.current?.querySelector<HTMLButtonElement>(`[data-density-control="${prior}"]`)?.focus();
  }, [selection]);

  function inspect(next: Selection) {
    returnFocus.current = next.id;
    setSelection(next);
  }

  const nodes: DensityNode[] = Object.entries(inventory).map(([id, presentation]) => ({
    id, type: "sample",
    position: { x: columnX(presentation.col), y: presentation.row * 230 },
    style: { width: tileWidth },
    data: {
      id,
      presentation,
      incoming: links.some(link => link.target === id && !link.sameRow),
      lowerIncoming: links.some(link => link.target === id && link.sameRow),
      outgoing: links.some(link => link.source === id),
      active: selection?.kind === "node" && selection.id === id,
      quiet: Boolean(selection && selection.id !== id && !focusedNodes.has(id)),
      inspect: () => inspect({ kind: "node", id }),
    },
  }));

  const edges: DensityEdge[] = links.map(link => {
    const active = selectedLink?.id === link.id;
    const related = focusedLinks.includes(link);
    return {
      id: link.id, type: "sample", source: link.source, target: link.target,
      sourceHandle: "output", targetHandle: link.sameRow ? "lower" : "upper",
      zIndex: active ? 2 : related ? 1 : 0,
      markerEnd: { type: link.kind === "sync" ? MarkerType.ArrowClosed : MarkerType.Arrow,
        color: active ? "#0f62fe" : "#6f6f6f", width: 12, height: 12 },
      data: { ...link, active, quiet: Boolean(selection && !related), showLabel: active || (detailed && (!selection || related)),
        inspect: () => inspect({ kind: "edge", id: link.id }) },
    };
  });

  return (
    <div className="density-fixture" ref={fixture} data-inspector={Boolean(selection)} onKeyDown={event => {
      if (event.key === "Escape" && selection) setSelection(null);
    }}>
      <div className="density-graph">
        <ReactFlow<DensityNode | GroupNode, DensityEdge> aria-label="Synthetic architecture density fixture"
          nodes={[...groupNodes, ...nodes]} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}
          fitView fitViewOptions={fitOptions} minZoom={minZoom} maxZoom={maxZoom} zoomOnScroll={false}
          onMoveEnd={(_, viewport) => setDetailed(viewport.zoom >= 0.9)}
          nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
          nodesFocusable={false} edgesFocusable={false} proOptions={{ hideAttribution: true }}>
          <DensityControls focusIds={zoomFocus} />
        </ReactFlow>
      </div>
      {selection && <aside className="density-inspector" aria-labelledby="density-inspector-title">
        <header>
          <span className="inspector-category">{selectedLink ? connectionNames[selectedLink.kind] : "Synthetic component"}</span>
          <Button variant="ghost" size="icon-sm" type="button" aria-label="Close density inspector" onClick={() => setSelection(null)}><X size={16} /></Button>
          <h3 id="density-inspector-title" tabIndex={-1} ref={title}>{selectedNode?.name ?? selectedLink?.name}</h3>
        </header>
        <div className="density-inspector-content">
          {selectedNode && <>
            <p>{selectedNode.role}</p>
            {(["incoming", "outgoing"] as const).map(direction => {
              const incoming = direction === "incoming";
              const matches = relatedLinks.filter(link => (incoming ? link.target : link.source) === selection.id);
              return <section key={direction} aria-label={direction === "incoming" ? "Incoming relationships" : "Outgoing relationships"}>
                <h4>{incoming ? "Incoming" : "Outgoing"} <span>{matches.length}</span></h4>
                {matches.map(link => <button className="density-evidence-row" key={link.id} type="button"
                  onClick={() => inspect({ kind: "edge", id: link.id })}>
                  <strong>{inventory[incoming ? link.source : link.target].name}</strong>
                  <span>{link.name} · {connectionNames[link.kind]}</span>
                </button>)}
              </section>;
            })}
          </>}
          {selectedLink && <>
            <div className="density-route-description">
              {(["source", "target"] as const).map(end => <button className="density-evidence-row" key={end} type="button"
                onClick={() => inspect({ kind: "node", id: selectedLink[end] })}>
                <strong>{inventory[selectedLink[end]].name}</strong><span>{end === "source" ? "From" : "To"}</span>
              </button>)}
            </div>
            <ConnectionSample kind={selectedLink.kind} />
          </>}
        </div>
      </aside>}
    </div>
  );
}
