import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ChevronRight, GitBranch, GitMerge, History, Layers3, LogIn, ScanLine, TriangleAlert } from "lucide-react";
import { ArchitectureGraph, mapControlId, type Direction, type MapSelection } from "./ArchitectureGraph";
import { Button } from "./components/ui/button";
import { ChangeDetails, Inspector, ObservationDetails } from "./Inspector";
import { RevisionSwitch, type RevisionSide } from "./RevisionSwitch";
import { ScopeMap, UnavailableScope } from "./ScopeMap";
import type { ContextAction, ObservationPresentation } from "./presentation";
import type { MapRevision, MergePresentation, WorkspacePresentation } from "./workspace-model";

type Comparison = { merge: MergePresentation; side: RevisionSide; fallbackMap: MapRevision };
type Perspective = "structure" | "flow";
type Panel = { kind: "recent" } | { kind: "merge" } | { kind: "map"; selection: MapSelection } | { kind: "observation"; id: string };

export interface WorkspaceProps {
  model: WorkspacePresentation;
  direction: Direction;
  look?: "blueprint" | "industrial" | "carbon";
  schematic?: boolean;
  startWithChange?: boolean;
  startScope?: string;
  startFlow?: boolean;
  renderFlow?: (id: string, panelVisible: boolean) => ReactNode;
}

export function Workspace({
  model, direction, look, schematic = false, startWithChange = true, startScope = model.overviewScope, startFlow = false, renderFlow,
}: WorkspaceProps) {
  const [scope, setScope] = useState(startScope);
  const [perspective, setPerspective] = useState<Perspective>(startFlow ? "flow" : "structure");
  const [returnTo, setReturnTo] = useState<string | null>(null);
  const initialMerge = startWithChange && !startFlow ? model.initial.merges[0] : undefined;
  const [comparison, setComparison] = useState<Comparison | null>(initialMerge
    ? { merge: initialMerge, side: "after", fallbackMap: model.initial.map } : null);
  const initialObservation = startFlow ? model.initial.map.flows?.[startScope]?.observation : undefined;
  const [panel, setPanel] = useState<Panel | null>(initialObservation
    ? { kind: "observation", id: initialObservation } : initialMerge ? { kind: "merge" } : null);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [showSignInNote, setShowSignInNote] = useState(false);
  const mergeTrigger = useRef<HTMLButtonElement>(null);
  const panelTitle = useRef<HTMLHeadingElement>(null);
  const mapTitle = useRef<HTMLHeadingElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const savedViews = useRef(new Map<string, { panel: Panel | null; perspective: Perspective; focus?: string }>());
  const requestedFocus = useRef<string | null>(null);
  const inspectingFromRecent = useRef(false);

  const { scopes, overviewScope } = model;
  const scopeIndex = scopes.findIndex(item => item.id === scope);
  const currentScope = scopes[scopeIndex];
  const snapshot = simulationComplete ? model.transition?.result ?? model.initial : model.initial;
  const changeRevision = comparison?.merge.revisions[comparison.side];
  const visibleMap = changeRevision?.map ?? comparison?.fallbackMap ?? snapshot.map;
  const compactOverview = look === "industrial" || look === "carbon";
  const flow = visibleMap.flows?.[scope];
  const showFlow = flow && renderFlow && perspective === "flow";
  const mapSelection = panel?.kind === "map" ? panel.selection : undefined;
  const relation = mapSelection?.kind === "relationship" ? mapSelection.relationship : undefined;
  const node = mapSelection?.kind === "component" ? model.nodes.find(item => item.id === mapSelection.id) : undefined;
  const observationId = panel?.kind === "observation" ? panel.id : node?.id ?? relation?.id;
  const observation = observationId ? visibleMap.observations[observationId] : undefined;
  const returnScope = scopes.find(item => item.id === returnTo);
  const returnLabel = returnTo && savedViews.current.get(returnTo)?.panel?.kind === "merge" && comparison
    ? "Return to comparison" : `Return to ${returnScope?.label}`;

  useLayoutEffect(() => {
    const request = requestedFocus.current;
    if (!request) return;
    requestedFocus.current = null;
    if (request === "map-title") { mapTitle.current?.focus(); return; }
    if (request === "panel-title") { panelTitle.current?.focus(); return; }
    if (request === "recent-merges") { mergeTrigger.current?.focus(); return; }

    const target = stage.current?.querySelector<HTMLElement>(request);
    if (target) { target.focus(); return; }
    const fallback = mapTitle.current;
    fallback?.focus();
    const frame = requestAnimationFrame(() => {
      if (document.activeElement === fallback) stage.current?.querySelector<HTMLElement>(request)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [panel, perspective, scope]);

  function openPanel(next: Panel) {
    if (next.kind === "map" || next.kind === "observation") {
      if (panel?.kind !== "map" && panel?.kind !== "observation") inspectingFromRecent.current = panel?.kind === "recent";
    }
    requestedFocus.current = "panel-title";
    setPanel(next);
  }

  function comparisonPanel(): Panel | null {
    return comparison ? { kind: "merge" } : null;
  }

  function selectionControl(current: Panel | null) {
    if (current?.kind === "map") return `[data-map-control="${CSS.escape(mapControlId(current.selection))}"]`;
    if (current?.kind === "observation") return `[data-map-control="observation-${CSS.escape(current.id)}"]`;
    return null;
  }

  function closePanel() {
    if (panel?.kind === "map" || panel?.kind === "observation") {
      requestedFocus.current = selectionControl(panel) ?? "map-title";
      setPanel(inspectingFromRecent.current ? { kind: "recent" } : comparisonPanel());
      inspectingFromRecent.current = false;
      return;
    }
    requestedFocus.current = "recent-merges";
    setComparison(null);
    setPanel(null);
  }

  function backToRecent() {
    requestedFocus.current = comparison ? `[data-merge-id="${comparison.merge.id}"]` : "panel-title";
    setComparison(null);
    setPanel({ kind: "recent" });
  }

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (showSignInNote) setShowSignInNote(false);
      else if (panel?.kind === "merge") backToRecent();
      else if (panel) closePanel();
    }
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  });

  function navigate(next: string, entry: Panel | null = null, opener?: string) {
    const nextIndex = scopes.findIndex(item => item.id === next);
    if (nextIndex < 0 || next === scope) return;
    const deeper = nextIndex > scopeIndex;
    if (deeper) savedViews.current.set(scope, { panel, perspective, focus: opener });
    const saved = savedViews.current.get(next);
    let restored = saved ? saved.panel : comparisonPanel();
    if (restored?.kind === "merge" && !comparison) restored = null;
    if (restored?.kind === "map" && restored.selection.kind === "relationship") {
      const id = restored.selection.relationship.id;
      const relationship = visibleMap.relationships.find(item => item.id === id);
      restored = relationship ? { kind: "map", selection: { kind: "relationship", relationship } } : comparisonPanel();
    }
    if (!visibleMap.scopes.includes(next) ||
      (restored?.kind === "observation" && !visibleMap.observations[restored.id])) restored = comparisonPanel();
    const restoredFocus = restored?.kind === saved?.panel?.kind ? saved?.focus : undefined;
    requestedFocus.current = deeper
      ? entry ? "panel-title" : "map-title"
      : restoredFocus ?? selectionControl(restored) ?? (restored?.kind === "merge" ? "panel-title" : "map-title");
    setReturnTo(deeper && scopes[nextIndex].kind === "implementation" ? scope : null);
    setScope(next);
    setPerspective(deeper ? "structure" : saved?.perspective ?? "structure");
    setPanel(deeper ? entry : restored);
  }

  function followAction(action: Exclude<ContextAction, { kind: "unavailable" }>) {
    if (action.kind === "inspect") {
      openPanel({ kind: "observation", id: action.target });
      return;
    }
    const selector = `[data-inspector-action="${CSS.escape(action.id)}"]`;
    navigate(action.scope, action.target ? { kind: "observation", id: action.target } : null, selector);
    const selectedFlow = visibleMap.flows?.[action.scope];
    if (!schematic && selectedFlow) {
      setPerspective("flow");
      if (selectedFlow.observation) setPanel({ kind: "observation", id: selectedFlow.observation });
    }
  }

  function applicable(actions?: readonly ContextAction[]) {
    return actions?.filter(action => action.kind !== "explore"
      || (action.scope !== scope && visibleMap.scopes.includes(action.scope) && (schematic || compactOverview)));
  }

  function reviseObservation(value: ObservationPresentation): ObservationPresentation {
    return { ...value, change: comparison ? value.change : undefined, related: applicable(value.related) };
  }

  function selectMerge(merge: MergePresentation) {
    setComparison({ merge, side: "after", fallbackMap: snapshot.map });
    openPanel({ kind: "merge" });
  }

  function togglePerspective() {
    setPerspective(showFlow ? "structure" : "flow");
    if (!showFlow && !panel && flow?.observation) setPanel({ kind: "observation", id: flow.observation });
  }

  const mergeTitle = comparison?.merge.title;
  const inspectorTitle = panel?.kind === "merge" ? mergeTitle : panel?.kind === "recent" ? "Recent merges" : observation?.title;
  const nodeName = (id: string) => model.nodes.find(item => item.id === id)?.name ?? id;
  const isolatedComparison = Boolean(changeRevision && !changeRevision.map);
  const missingScope = !visibleMap.scopes.includes(scope) ? currentScope.unavailable : undefined;

  return (
    <main className="narys" data-direction={direction} data-schematic={schematic || undefined}
      data-look={look ?? (direction === "dark" ? "graphite" : undefined)} aria-label="Narys architecture workspace">
      <header className="project-bar">
        <div className="project-identity">
          <span className="brand"><span className="brand-mark"><Layers3 size={17} aria-hidden="true" /></span><strong>Narys</strong></span>
          <span className="project-separator" aria-hidden="true">/</span>
          <span className="project-name">{model.repository}</span><span className="branch"><GitBranch size={14} aria-hidden="true" /> {model.branch}</span>
        </div>
        <div className="project-actions">
          {model.transition && <Button variant="ghost" size="sm" type="button" aria-label={model.transition.accessibleLabel}
            aria-disabled={simulationComplete} onClick={() => setSimulationComplete(true)}>{model.transition.label}</Button>}
          {model.public && <Button variant="ghost" size="sm" className="utility-button sign-in" type="button" onClick={() => setShowSignInNote(open => !open)}>
            <LogIn size={15} aria-hidden="true" /> Sign in</Button>}
          <Button variant="outline" size="sm" className="utility-button merge-trigger" type="button" ref={mergeTrigger}
            aria-expanded={panel?.kind === "recent" || panel?.kind === "merge"} aria-controls={inspectorTitle ? "change-inspector" : undefined}
            onClick={() => openPanel({ kind: "recent" })}>
            <History size={16} aria-hidden="true" /> <span>Recent merges</span>
          </Button>
        </div>
      </header>

      <div className="stage" ref={stage}>
        <div className="map-title">
          {schematic ? <nav className="schematic-breadcrumb" aria-label="Architecture levels">
            {scopes.slice(0, scopeIndex + 1).map((level, index) => <span className="scope-crumb" key={level.id}>
              {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {level.id === scope ? <span aria-current="page">{level.label}</span>
                : <Button variant="ghost" size="sm" type="button" onClick={() => navigate(level.id)}>{level.label}</Button>}
            </span>)}
          </nav> : currentScope.kind === "components" || currentScope.kind === "implementation"
            ? <Button variant="ghost" size="sm" className="map-back" type="button" onClick={() => navigate(overviewScope)}><ArrowLeft size={14} aria-hidden="true" /> Back to architecture map</Button>
            : <span className="map-kicker"><ScanLine size={14} aria-hidden="true" /> Architecture</span>}
          <h1 ref={mapTitle} tabIndex={-1}>{currentScope.title}</h1>
          <div className="map-meta">
            {comparison && !isolatedComparison ? `${comparison.side === "before" ? "Before" : "After"} #${comparison.merge.id}` : "Map revision"} <code>{visibleMap.commit}</code>
            {isolatedComparison && <span>· Comparing PR #{comparison?.merge.id} separately</span>}
            {schematic && !comparison && <span>· Selected area</span>}
            {comparison && panel?.kind !== "merge" && (
              <Button variant="ghost" size="sm" type="button" onClick={() => openPanel({ kind: "merge" })}>View PR #{comparison.merge.id}</Button>
            )}
          </div>
          {schematic && flow && renderFlow && <Button variant="outline" size="sm" className="scope-perspective" type="button" onClick={togglePerspective}>
            {showFlow ? "Back to structure" : flow.label} <ArrowRight size={14} aria-hidden="true" />
          </Button>}
          {schematic && returnScope && <Button variant="outline" size="sm" className="scope-perspective" type="button" onClick={() => navigate(returnScope.id)}>
            <ArrowLeft size={14} aria-hidden="true" /> {returnLabel}
          </Button>}
        </div>
        <div className="overview-map" data-hidden={scope !== overviewScope} aria-hidden={scope !== overviewScope || undefined} inert={scope !== overviewScope}>
          <ArchitectureGraph direction={direction} compact={compactOverview} schematic={schematic} layout={model.nodes}
            label={`${scopes.find(item => item.id === overviewScope)?.title} architecture map`} visible={scope === overviewScope}
            panelVisible={Boolean(inspectorTitle)} compare={Boolean(changeRevision?.map)} selected={mapSelection}
            revision={visibleMap} onInspect={selection => openPanel({ kind: "map", selection })} />
        </div>
        {missingScope ? <UnavailableScope {...missingScope} commit={visibleMap.commit} panelVisible={Boolean(inspectorTitle)}
          backLabel={`Return to ${scopes.find(item => item.id === overviewScope)?.label}`} onBack={() => navigate(overviewScope)} />
          : showFlow ? renderFlow(flow.id, Boolean(inspectorTitle))
            : currentScope.diagram && <ScopeMap diagram={currentScope.diagram} layout={currentScope.kind} panelVisible={Boolean(inspectorTitle)}
              selected={panel?.kind === "observation" ? panel.id : undefined} onSelect={id => openPanel({ kind: "observation", id })} />}
        {snapshot.status && <div className="activity" data-scenario={snapshot.status.kind} role="status">
          {snapshot.status.kind === "gap" ? <TriangleAlert size={15} aria-hidden="true" /> : <History size={15} aria-hidden="true" />}
          {snapshot.status.label}
        </div>}
        {showSignInNote && <div className="sign-in-note" role="status">GitHub sign-in is simulated in this Storybook preview.</div>}

        {inspectorTitle && <Inspector id="change-inspector" title={showFlow && observation ? "Source evidence" : inspectorTitle} titleRef={panelTitle}
          onDismiss={panel?.kind === "merge" ? backToRecent : closePanel}
          leading={panel?.kind === "merge" ? <Button variant="ghost" size="sm" className="back-button" type="button" onClick={backToRecent}>
            <ArrowLeft size={15} aria-hidden="true" /> Recent merges
          </Button> : <span className="inspector-category">{panel?.kind === "recent" ? "Architecture activity"
            : observation?.role ?? (relation ? "Relationship" : node?.element)}</span>}
          meta={panel?.kind === "merge" && comparison && <span className="merge-id"><GitMerge size={14} aria-hidden="true" /> PR #{comparison.merge.id}</span>}>
          {panel?.kind === "recent" && <ul className="merge-list" aria-label="Recent architecture merges">
            {snapshot.merges.map(merge => <li key={merge.id}>
              <Button variant="ghost" type="button" data-merge-id={merge.id} onClick={() => selectMerge(merge)}>
                <span className="list-icon"><GitMerge size={17} aria-hidden="true" /></span>
                <span><strong>{merge.title}</strong><small>#{merge.id} · {merge.date}</small></span>
                <ArrowDownRight size={17} className="list-arrow" aria-hidden="true" />
              </Button>
            </li>)}
          </ul>}
          {panel?.kind === "merge" && comparison && changeRevision && <>
            <div className="merge-facts"><span><GitMerge size={15} aria-hidden="true" /> Merged</span><time>{comparison.merge.date}</time></div>
            <RevisionSwitch revisions={{ before: comparison.merge.revisions.before.commit, after: comparison.merge.revisions.after.commit }}
              side={comparison.side} onSide={side => setComparison({ ...comparison, side })} />
            {isolatedComparison && <p className="scope-inspector-note">This change uses its own source revisions. The canvas shows the last supported area map.</p>}
            <ChangeDetails key={changeRevision.commit} value={{ ...changeRevision.details, related: applicable(changeRevision.details.related) }}
              side={comparison.side} revision={changeRevision.commit} intent={comparison.merge.intent} deployment={comparison.merge.deployment} onAction={followAction} />
          </>}
          {observation && <ObservationDetails observation={reviseObservation(observation)} revision={visibleMap.commit}
            node={schematic ? node : undefined} relationship={relation ? { source: nodeName(relation.from), target: nodeName(relation.to) } : undefined}
            onAction={followAction} />}
        </Inspector>}
      </div>
    </main>
  );
}
