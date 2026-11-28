import { useLayoutEffect, useRef, useState } from "react";
import {
  ControlButton, Controls, EdgeLabelRenderer, Handle, MarkerType, Position, ReactFlow, useReactFlow,
  type Edge, type EdgeProps, type Node, type NodeProps,
} from "@xyflow/react";
import { Maximize, Minus, Plus } from "lucide-react";
import { ArchitectureNodeFace, type NodePresentation } from "./ArchitectureNodeFace";
import { ConnectionSample, ConnectionStroke, connectionNames } from "./architecture-visuals";
import { Inspector } from "./Inspector";
import type { RelationshipPresentation } from "./presentation";

export interface DensityModel {
  label: string;
  tileWidth: number;
  inventory: Record<string, NodePresentation & { position: { x: number; y: number } }>;
  headings: readonly { label: string; x: number; width: number }[];
  links: readonly DensityLink[];
}

type DensityLink = RelationshipPresentation & {
  source: string;
  target: string;
  lane: number;
  sameRow: boolean;
  viaX?: number;
};

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
type GroupNode = Node<{ label: string }, "groupLabel">;
type DensityEdge = Edge<DensityLink & { quiet: boolean; active: boolean; showLabel: boolean; sourceName: string; targetName: string; inspect: () => void }, "sample">;

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
          aria-pressed={data.active} aria-label={`Inspect ${data.sourceName} to ${data.targetName}, ${data.label}`}
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${laneY}px)` }} onClick={data.inspect}>
          {data.label}
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

export function DensityFixture({ model: { inventory, links, label, tileWidth, headings } }: { model: DensityModel }) {
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
    if (prior) fixture.current?.querySelector<HTMLButtonElement>(`[data-density-control="${CSS.escape(prior)}"]`)?.focus({ preventScroll: true });
  }, [selection]);

  function inspect(next: Selection, origin?: string) {
    // The route label can disappear at map fit. Return to a visible endpoint.
    returnFocus.current = next.kind === "node" ? next.id : origin ?? links.find(link => link.id === next.id)?.source ?? null;
    setSelection(next);
  }

  const groupNodes: GroupNode[] = headings.map(({ label, x, width }) => ({
    id: `group-${x}`, type: "groupLabel", position: { x, y: -58 }, style: { width }, data: { label },
  }));
  const nodes: DensityNode[] = Object.entries(inventory).map(([id, presentation]) => ({
    id, type: "sample",
    position: presentation.position,
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
      data: { ...link, sourceName: inventory[link.source].name, targetName: inventory[link.target].name, active, quiet: Boolean(selection && !related), showLabel: active || (detailed && (!selection || related)),
        inspect: () => inspect({ kind: "edge", id: link.id }) },
    };
  });

  return (
    <div className="density-fixture" ref={fixture} data-inspector={Boolean(selection)} onKeyDown={event => {
      if (event.key === "Escape" && selection) setSelection(null);
    }}>
      <div className="density-graph">
        <ReactFlow<DensityNode | GroupNode, DensityEdge> aria-label={label}
          nodes={[...groupNodes, ...nodes]} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}
          fitView fitViewOptions={fitOptions} minZoom={minZoom} maxZoom={maxZoom} zoomOnScroll={false}
          onMoveEnd={(_, viewport) => setDetailed(viewport.zoom >= 0.9)}
          nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
          nodesFocusable={false} edgesFocusable={false} proOptions={{ hideAttribution: true }}>
          <DensityControls focusIds={zoomFocus} />
        </ReactFlow>
      </div>
      {selection && <Inspector layout="docked" title={selectedNode?.name ?? selectedLink?.label ?? ""}
        titleRef={title} onDismiss={() => setSelection(null)}
        leading={<span className="inspector-category">{selectedLink ? connectionNames[selectedLink.kind] : selectedNode?.element}</span>}>
          {selectedNode && <>
            <p>{selectedNode.role}</p>
            {(["incoming", "outgoing"] as const).map(direction => {
              const incoming = direction === "incoming";
              const matches = relatedLinks.filter(link => (incoming ? link.target : link.source) === selection.id);
              return matches.length > 0 && <section key={direction} aria-label={direction === "incoming" ? "Incoming relationships" : "Outgoing relationships"}>
                <h3>{incoming ? "Incoming" : "Outgoing"} <span>{matches.length}</span></h3>
                {matches.map(link => <button className="density-evidence-row" key={link.id} type="button"
                  onClick={() => inspect({ kind: "edge", id: link.id }, selection.id)}>
                  <strong>{inventory[incoming ? link.source : link.target].name}</strong>
                  <span>{link.label} · {connectionNames[link.kind]}</span>
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
      </Inspector>}
    </div>
  );
}
