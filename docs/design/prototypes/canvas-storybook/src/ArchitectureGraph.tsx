import { useEffect, useId, useRef, useState } from "react";
import {
  BaseEdge, EdgeLabelRenderer, Handle, MarkerType, Position, ReactFlow,
  getSmoothStepPath, type Edge, type EdgeProps, type Node, type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";
import { Box, Check, CircleHelp, Focus, Layers3, Minus, Plus, Server, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { components, type ComponentId, type MapRevision, type Relationship } from "./fixture";
import { ChangeMark, ConnectionSample, ConnectionStroke, connectionNames, type ArchitectureChange, type ConnectionKind } from "./architecture-visuals";
import { ArchitectureNodeFace, paymentNodeChange, paymentNodeVisuals } from "./ArchitectureNodeFace";

export type Direction = "dark" | "light";
export type MapSelection = { kind: "component"; id: ComponentId } | { kind: "relationship"; relationship: Relationship };

export function mapControlId(selection: MapSelection): string {
  return selection.kind === "component" ? `component-${selection.id}` : `relationship-${selection.relationship.id}`;
}

const icons = { checkout: ShoppingCart, api: Server, jobs: Layers3, worker: Box };
const visiblePorts = { checkout: ["right", "bottom"], api: ["left", "bottom"], jobs: ["top", "right"], worker: ["left", "top"] } as const;

function relationKind({ to }: Relationship): ConnectionKind {
  return to === "api" ? "sync" : "async";
}

type ArchitectureNode = Node<{
  id: ComponentId;
  responsibility: string;
  compact: boolean;
  schematic: boolean;
  selected: boolean;
  change?: ArchitectureChange;
  status?: "unconfirmed" | "supported";
  open: () => void;
}, "component">;

type ArchitectureEdge = Edge<{
  relationship: Relationship;
  active: boolean;
  schematic: boolean;
  selected: boolean;
  change?: ArchitectureChange;
  open: () => void;
}, "relationship">;

function ComponentCard({ data }: NodeProps<ArchitectureNode>) {
  const component = components[data.id];
  const Icon = icons[data.id];
  const Supported = data.compact ? Check : Sparkles;
  const statusId = useId();

  return (
    <div className={data.schematic ? "schematic-node" : "graph-node"} data-status={data.status}
      data-change={data.change} data-selected={data.selected || undefined} data-component={data.id}>
      <Handle className="graph-handle" type="target" id="left" position={Position.Left} />
      <Handle className="graph-handle" type="target" id="top" position={Position.Top} />
      <Handle className="graph-handle" type="target" id="bottom" position={Position.Bottom} />
      <button className={`${data.schematic ? "schematic-node-button" : "node-button"} nodrag nopan`} type="button"
        onClick={data.open} aria-label={`Inspect ${component.name}`}
        data-map-control={mapControlId({ kind: "component", id: data.id })}
        aria-pressed={data.schematic ? data.selected : undefined}
        aria-describedby={data.schematic && (data.status || data.change) ? statusId : undefined}>
        {data.schematic ? (
          <ArchitectureNodeFace node={{ ...paymentNodeVisuals[data.id], name: component.name }}
            status={data.status} change={data.change} statusId={statusId} />
        ) : <>
        <span className="node-heading">
          <span className="node-icon"><Icon size={17} aria-hidden="true" /></span>
          <span><strong>{component.name}</strong><small>{component.type}</small></span>
        </span>
        {!data.compact && <span className="node-description">{data.responsibility}</span>}
        {data.status === "unconfirmed" && <span className="node-status"><CircleHelp size={13} /> Retry behavior unconfirmed</span>}
        {data.status === "supported" && <span className="node-status"><Supported size={13} /> Source-backed change</span>}
        </>}
      </button>
      <Handle className="graph-handle" type="source" id="right" position={Position.Right} />
      <Handle className="graph-handle" type="source" id="bottom" position={Position.Bottom} />
      <Handle className="graph-handle" type="source" id="top" position={Position.Top} />
      {data.schematic && visiblePorts[data.id].map((port) => <span key={port} className="schematic-port" data-port={port} aria-hidden="true" />)}
    </div>
  );
}

function RelationshipLink(props: EdgeProps<ArchitectureEdge>) {
  const { id, data, markerEnd } = props;
  const [path, x, y] = getSmoothStepPath({ ...props, borderRadius: data?.schematic ? 8 : 18 });
  if (!data) return null;
  const { relationship, active, open } = data;

  return (
    <>
      {data.schematic
        ? <ConnectionStroke path={path} kind={relationKind(relationship)} change={data.change} markerEnd={markerEnd}
            className={data.selected ? "schematic-connection-selected" : undefined} />
        : <BaseEdge id={id} path={path} markerEnd={markerEnd} className={active ? "graph-line graph-line-active" : "graph-line"} />}
      <EdgeLabelRenderer>
        <button
          className="edge-button nodrag nopan"
          data-active={active}
          data-change={data.change}
          data-selected={data.selected || undefined}
          data-map-control={mapControlId({ kind: "relationship", relationship })}
          style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
          onClick={open}
          aria-label={`Inspect ${components[relationship.from].name} to ${components[relationship.to].name}, ${relationship.label}`}
          aria-pressed={data.schematic ? data.selected : undefined}
          aria-description={data.schematic ? [connectionNames[relationKind(relationship)], data.change].filter(Boolean).join(", ") : undefined}
          type="button"
        >
          {data.change && data.change !== "unchanged" ? <ChangeMark change={data.change} /> : !data.schematic && active && <span aria-hidden="true">+</span>}
          {relationship.label}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

const nodeTypes = { component: ComponentCard };
const edgeTypes = { relationship: RelationshipLink };
const handles = { across: ["right", "left"], down: ["bottom", "top"], up: ["top", "bottom"] };

interface GraphProps {
  direction: Direction;
  compact: boolean;
  schematic?: boolean;
  visible?: boolean;
  panelVisible?: boolean;
  compare?: boolean;
  selected?: MapSelection;
  revision: MapRevision;
  onInspect: (selection: MapSelection) => void;
}

export function ArchitectureGraph({ direction, compact, schematic, visible = true, panelVisible, compare, selected, revision, onInspect }: GraphProps) {
  const container = useRef<HTMLDivElement>(null);
  const [flow, setFlow] = useState<ReactFlowInstance<ArchitectureNode, ArchitectureEdge> | null>(null);
  const [overviewScale, setOverviewScale] = useState(false);
  const manualViewport = useRef(false);
  const lastFit = useRef({ width: 0, height: 0, panelVisible });
  const wide = direction === "dark";
  const width = schematic ? 224 : compact ? 214 : wide ? 246 : 220;
  const column = schematic ? 450 : compact ? 433 : wide ? 492 : 433;
  const row = schematic ? 220 : compact ? 199 : wide ? 253 : 218;

  function fit(canvas: HTMLDivElement, instance: NonNullable<typeof flow>) {
    const { clientWidth, clientHeight } = canvas;
    const stacked = clientWidth < 900;
    const reserve = schematic && !panelVisible ? 0 : wide || compact ? 414 : 343;
    const span = stacked ? clientWidth : clientWidth - reserve;
    const graphWidth = column + width;
    const graphHeight = row + (schematic ? 104 : compact ? 92 : 134);
    const usableTop = schematic ? (stacked ? 105 : 124) : 120;
    const usableBottom = schematic ? (stacked && panelVisible ? clientHeight * 0.51 - 12 : clientHeight - 65) : clientHeight - 35;
    const usableHeight = schematic ? usableBottom - usableTop : stacked ? clientHeight * 0.55 - 35 : clientHeight - 155;
    const zoom = Math.max(0.36, Math.min(schematic ? 1.48 : 1, (span - (stacked ? 30 : 92)) / graphWidth, usableHeight / graphHeight));
    const x = Math.max(15, (span - graphWidth * zoom) / 2);
    const centeredY = (clientHeight - graphHeight * zoom) / 2;
    const y = schematic ? usableTop + Math.max(0, (usableHeight - graphHeight * zoom) / 2)
      : stacked ? 108 : Math.max(124, centeredY + 12);
    void instance.setViewport({ x, y, zoom });
  }

  useEffect(() => {
    const canvas = container.current;
    if (!canvas || !flow || !visible) return;
    const observer = new ResizeObserver(() => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const sameSize = lastFit.current.width === width && lastFit.current.height === height;
      if (schematic && sameSize && (manualViewport.current || lastFit.current.panelVisible === panelVisible)) return;
      lastFit.current = { width, height, panelVisible };
      fit(canvas, flow);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [flow, direction, compact, schematic, panelVisible, visible]);

  const nodes: ArchitectureNode[] = (["checkout", "api", "jobs", "worker"] as const).map((id, index) => ({
    id,
    type: "component",
    position: { x: index % 2 === 0 ? 0 : column, y: index < 2 ? 0 : row },
    style: { width },
    data: {
      id,
      compact,
      schematic: Boolean(schematic),
      selected: selected?.kind === "component" && selected.id === id,
      change: schematic ? paymentNodeChange(id, revision, Boolean(compare)) : undefined,
      responsibility: revision.responsibilities[id],
      status: revision.retryPath ? id === "checkout" ? "unconfirmed" : id === "worker" ? "supported" : undefined : undefined,
      open: () => onInspect({ kind: "component", id }),
    },
  }));

  const edges: ArchitectureEdge[] = revision.relationships.map((relationship) => {
    const [sourceHandle, targetHandle] = handles[relationship.route];
    const change = schematic && compare && relationship.added
      ? (relationship.id === "payment-jobs" ? "modified" : "added") : undefined;
    const isSelected = selected?.kind === "relationship" && selected.relationship.id === relationship.id;
    return {
      id: relationship.id,
      type: "relationship",
      source: relationship.from,
      target: relationship.to,
      sourceHandle,
      targetHandle,
      markerEnd: { type: schematic && relationKind(relationship) === "async" ? MarkerType.Arrow : MarkerType.ArrowClosed,
        width: 14, height: 14, color: change || isSelected || (!schematic && relationship.added) ? "var(--accent)" : "var(--edge)" },
      data: { relationship, active: Boolean(change || (!schematic && relationship.added)), schematic: Boolean(schematic),
        selected: isSelected, change, open: () => onInspect({ kind: "relationship", relationship }) },
    };
  });

  return (
    <div className="graph" ref={container} data-schematic={schematic || undefined} data-overview-scale={overviewScale || undefined}>
      <ReactFlow<ArchitectureNode, ArchitectureEdge>
        nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} onInit={setFlow}
        minZoom={0.36} maxZoom={2} nodesDraggable={false} nodesConnectable={false}
        onMoveEnd={(event, viewport) => {
          if (event) manualViewport.current = true;
          if (schematic) setOverviewScale(viewport.zoom < 0.7);
        }}
        nodesFocusable={false} edgesFocusable={false} elementsSelectable={false}
        zoomOnDoubleClick={false} proOptions={{ hideAttribution: true }}
        aria-label="Payments architecture map"
      />
      <div className="map-tools" aria-label="Map viewport controls">
        <Button variant="ghost" size="icon-sm" type="button" aria-label="Zoom out" title="Zoom out" onClick={() => { manualViewport.current = true; void flow?.zoomOut(); }}><Minus size={16} /></Button>
        <Button variant="ghost" size="icon-sm" type="button" aria-label="Zoom in" title="Zoom in" onClick={() => { manualViewport.current = true; void flow?.zoomIn(); }}><Plus size={16} /></Button>
        <Button variant="ghost" size="icon-sm" type="button" aria-label="Fit map" title="Fit map" onClick={() => {
          if (container.current && flow) { manualViewport.current = true; fit(container.current, flow); }
        }}><Focus size={16} /></Button>
      </div>
      {schematic && (
        <div className="schematic-key" data-inspector={Boolean(panelVisible)} aria-label="Relationship key">
          <span><ConnectionSample kind="sync" />Call</span>
          <span><ConnectionSample kind="async" />Message</span>
          <span><ConnectionSample kind="unknown" />Unconfirmed</span>
        </div>
      )}
    </div>
  );
}
