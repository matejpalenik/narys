import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, Braces, Check, ChevronDown, CircleHelp,
  ChevronRight, GitBranch, GitMerge, History, Layers3, LogIn, ScanLine, Server, TriangleAlert, X,
} from "lucide-react";
import { ArchitectureGraph, mapControlId, type Direction, type MapSelection } from "./ArchitectureGraph";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { afterRetry, checkoutGap, components, retryMerge, statusMerge, type MapRevision, type Merge } from "./fixture";
import { ArchitectureGlyph } from "./architecture-visuals";
import { ArchitectureNodeFace, paymentNodeChange, paymentNodeVisuals } from "./ArchitectureNodeFace";
import { RetrySchematic } from "./IllustrativeFlow";

export type Scenario = "ready" | "checking" | "gap" | "public";
type Panel =
  | { kind: "recent" }
  | { kind: "merge"; merge: Merge; side: "before" | "after" }
  | { kind: "map"; selection: MapSelection; revision: MapRevision; view?: "worker" };

interface WorkspaceProps {
  direction: Direction;
  look?: "blueprint" | "industrial" | "carbon";
  scenario?: Scenario;
  startWithChange?: boolean;
  schematic?: boolean;
  startAtWorker?: boolean;
}

function Status({ kind, children }: { kind: "supported" | "unconfirmed"; children: string }) {
  const Icon = kind === "supported" ? Check : CircleHelp;
  return <Badge variant="outline" className="status-tag" data-kind={kind}><Icon size={13} aria-hidden="true" />{children}</Badge>;
}

function MergeDetails({ merge, side, onSide }: { merge: Merge; side: "before" | "after"; onSide: (side: "before" | "after") => void }) {
  return (
    <>
      <div className="merge-facts">
        <span><GitMerge size={15} /> Merged</span>
        <time>{merge.date}</time>
      </div>
      <div className="revision-switch" role="group" aria-label="Compare revisions">
        {(["before", "after"] as const).map((value) => (
          <Button key={value} variant="ghost" type="button" aria-pressed={side === value} onClick={() => onSide(value)}>
            <span>{value === "before" ? "Before" : "After"}</span><code>{merge[value].commit}</code>
          </Button>
        ))}
      </div>
      <section className="detail-section">
        <h3>What changed</h3>
        <p>{merge.summary}</p>
        {merge.id === 128 && (
          <div className="claim-list">
            <div><Status kind="supported">Supported by source</Status><p>Payments Worker handles queued retries.</p></div>
            <div><Status kind="unconfirmed">Unconfirmed</Status><p>Whether Checkout still retries directly.</p></div>
          </div>
        )}
      </section>
      <section className="detail-section deployment">
        <h3>Deployment</h3>
        {merge.deployment ? <Status kind="supported">{`${merge.deployment.environment} at ${merge.deployment.commit}`}</Status> : <Status kind="unconfirmed">Deployment unconfirmed</Status>}
      </section>
      <section className="detail-section">
        <h3>Why</h3>
        {merge.rationale ? (
          <details className="rationale-disclosure">
            <summary className="source-reference"><Braces size={14} />{merge.rationale.label}<ChevronDown size={14} /></summary>
            <p><strong>Documented intent</strong> · {merge.rationale.text}</p>
          </details>
        ) : <p>Rationale unavailable.</p>}
      </section>
      <details className="evidence-disclosure">
        <summary><Braces size={16} /><span>Inspect source at <code>{merge[side].commit}</code></span><ChevronDown size={15} /></summary>
        <div className="source-excerpts">
          {merge.evidence[side].map(({ path, code }) => <div key={path}><code>{path}</code><pre>{code}</pre></div>)}
        </div>
      </details>
    </>
  );
}

function MapDetails({ selection, revision, detailed, comparing }: {
  selection: MapSelection; revision: MapRevision; detailed: boolean; comparing: boolean;
}) {
  if (selection.kind === "relationship") {
    const relationship = selection.relationship;
    const source = relationship.id === "payment-jobs" || relationship.id === "retry-payment"
      ? components.worker.path : components[relationship.from].path;
    return (
      <section className="detail-section map-detail">
        <p className="relationship-title">{components[relationship.from].name} <ArrowRight size={14} /> {components[relationship.to].name}</p>
        {relationship.added && <Status kind="supported">Supported by source</Status>}
        <p>Relationship at <code>{revision.commit}</code></p>
        <span className="source-reference"><Braces size={14} />{source}</span>
        {relationship.added && revision.commit === retryMerge.after.commit && <SourceDisclosure commit={revision.commit} path={source} />}
      </section>
    );
  }

  const { id } = selection;
  const confidence = revision.retryPath ? id === "checkout" ? "unconfirmed" : id === "worker" ? "supported" : undefined : undefined;
  return (
    <section className="detail-section map-detail">
      {detailed ? (
        <div className="architecture-inspection"><ArchitectureNodeFace variant="detailed"
          node={{ ...paymentNodeVisuals[id], name: components[id].name, responsibility: revision.responsibilities[id] }}
          status={confidence} change={paymentNodeChange(id, revision, comparing)} /></div>
      ) : (
        <>
          <p>{revision.responsibilities[id]}</p>
          {confidence === "unconfirmed" && <Status kind="unconfirmed">Retry behavior unconfirmed</Status>}
          {confidence === "supported" && <Status kind="supported">Supported by source</Status>}
        </>
      )}
      {confidence === "unconfirmed" && <p>{checkoutGap}</p>}
      <p>{detailed ? "Container" : "Source"} at <code>{revision.commit}</code></p>
      <span className="source-reference"><Braces size={14} />{components[id].path}</span>
      {detailed && revision.commit === retryMerge.after.commit && <SourceDisclosure commit={revision.commit} path={components[id].path} />}
    </section>
  );
}

function SourceDisclosure({ commit, path }: { commit: string; path: string }) {
  const excerpt = retryMerge.evidence.after.find((item) => item.path === path);
  if (!excerpt) return null;

  return (
    <details className="evidence-disclosure">
      <summary><Braces size={16} /><span>Inspect source at <code>{commit}</code></span><ChevronDown size={15} /></summary>
      <div className="source-excerpts"><div><code>{excerpt.path}</code><pre>{excerpt.code}</pre></div></div>
    </details>
  );
}

function WorkerDrawing() {
  return (
    <figure className="worker-drawing" aria-label="Payment retry flow">
      <ol className="worker-flow" role="list">
        <li className="worker-terminal">
          <Layers3 size={22} aria-hidden="true" />
          <strong>Payment jobs</strong>
          <code>payment.retry</code>
        </li>
        <li className="worker-boundary">
          <span className="worker-boundary-label">Worker boundary</span>
          <span className="worker-linework" aria-hidden="true"><i /><i /><i /></span>
          <strong>Retry handler</strong>
        </li>
        <li className="worker-terminal">
          <Server size={22} aria-hidden="true" />
          <strong>Payments API</strong>
          <code>retry(paymentId)</code>
        </li>
      </ol>
    </figure>
  );
}

export function Workspace({ direction, look, scenario = "ready", startWithChange = true, schematic = false, startAtWorker = false }: WorkspaceProps) {
  const [panel, setPanel] = useState<Panel | null>(() => {
    if (startAtWorker) return { kind: "map", selection: { kind: "component", id: "worker" }, revision: afterRetry, view: "worker" };
    return startWithChange ? { kind: "merge", merge: retryMerge, side: "after" } : null;
  });
  const [contextOpen, setContextOpen] = useState(false);
  const [showSignInNote, setShowSignInNote] = useState(false);
  const mergeTrigger = useRef<HTMLButtonElement>(null);
  const panelTitle = useRef<HTMLHeadingElement>(null);
  const workerTitle = useRef<HTMLHeadingElement>(null);
  const overviewTitle = useRef<HTMLHeadingElement>(null);
  const inspector = useRef<HTMLElement>(null);
  const overview = useRef<HTMLDivElement>(null);
  const returnToMap = useRef<string | null>(null);
  const pendingMapFocus = useRef<string | null>(null);
  const previousPanel = useRef<Exclude<Panel, { kind: "map" }> | null>(null);
  const returnToMerge = useRef<number | null>(null);
  const pendingFocus = useRef<HTMLElement | null>(null);
  const mounted = useRef(false);
  const isBehind = scenario === "checking" || scenario === "gap";
  const latest = isBehind ? retryMerge.before : afterRetry;
  const merges = scenario === "checking" ? [statusMerge] : [retryMerge, statusMerge];
  const visibleMap = panel?.kind === "merge" ? panel.merge[panel.side] : panel?.kind === "map" ? panel.revision : latest;
  const compactOverview = look === "industrial" || look === "carbon";
  const workerView = compactOverview && panel?.kind === "map" && panel.view === "worker";
  const comparing = (panel?.kind === "map" ? previousPanel.current : panel)?.kind === "merge";
  const graphHidden = workerView || contextOpen;
  const canExploreWorker = compactOverview && panel?.kind === "map" && panel.selection.kind === "component"
    && panel.selection.id === "worker" && panel.revision.commit === retryMerge.after.commit;

  let panelKey: string | undefined = panel?.kind;
  if (panel?.kind === "merge") panelKey = `merge-${panel.merge.id}`;
  if (workerView) panelKey = "worker-view";
  else if (panel?.kind === "map") {
    const { selection } = panel;
    panelKey = `map-${selection.kind}-${selection.kind === "component" ? selection.id : selection.relationship.id}`;
  }
  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (startAtWorker) return;
    }
    const opener = pendingFocus.current;
    pendingFocus.current = null;
    const mapControl = pendingMapFocus.current;
    pendingMapFocus.current = null;
    if (mapControl) {
      const map = overview.current;
      opener?.focus();
      if (!map) return;

      // Relationship labels can remount after React Flow finishes its layout pass.
      function restore() {
        if (opener && document.activeElement !== opener) {
          observer.disconnect();
          return;
        }
        const target = map?.querySelector<HTMLButtonElement>(`[data-map-control="${mapControl}"]`);
        target?.focus();
        if (target && document.activeElement === target) observer.disconnect();
      }

      const observer = new MutationObserver(restore);
      observer.observe(map, { childList: true, subtree: true });
      const frame = requestAnimationFrame(restore);
      const timeout = window.setTimeout(() => observer.disconnect(), 1000);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        window.clearTimeout(timeout);
      };
    }
    if (opener?.isConnected) { opener.focus(); return; }
    if (panelKey === "recent" && returnToMerge.current !== null) {
      const row = inspector.current?.querySelector<HTMLButtonElement>(`[data-merge-id="${returnToMerge.current}"]`);
      returnToMerge.current = null;
      if (row) { row.focus(); return; }
    }
    if (contextOpen) overviewTitle.current?.focus();
    else (workerView ? workerTitle.current : panelTitle.current)?.focus();
  }, [panelKey, workerView, contextOpen, startAtWorker]);

  const closePanel = useCallback((kind: Panel["kind"]) => {
    if (kind === "map") pendingMapFocus.current = returnToMap.current;
    pendingFocus.current = kind === "map" ? overviewTitle.current : mergeTrigger.current;
    setPanel(kind === "map" ? previousPanel.current : null);
  }, []);

  const backToRecent = useCallback((id: number) => {
    returnToMerge.current = id;
    setPanel({ kind: "recent" });
  }, []);

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (showSignInNote) { setShowSignInNote(false); return; }
      if (panel?.kind === "merge") backToRecent(panel.merge.id);
      else if (panel) closePanel(panel.kind);
    }
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [backToRecent, closePanel, panel, showSignInNote]);

  function openMapSelection(selection: MapSelection) {
    returnToMap.current = mapControlId(selection);
    if (panel?.kind !== "map") previousPanel.current = panel;
    setPanel({ kind: "map", selection, revision: visibleMap });
  }

  function openContext() {
    if (panel?.kind === "map") setPanel(previousPanel.current);
    setContextOpen(true);
  }

  function openContainers() {
    pendingFocus.current = overviewTitle.current;
    setContextOpen(false);
  }

  let overlayTitle = "Recent merges";
  if (panel?.kind === "merge") overlayTitle = panel.merge.title;
  if (panel?.kind === "map") {
    const { selection } = panel;
    overlayTitle = selection.kind === "component" ? components[selection.id].name : selection.relationship.label;
  }

  return (
    <main className="narys" data-direction={direction} data-schematic={schematic || undefined}
      data-look={look ?? (direction === "dark" ? "graphite" : undefined)} aria-label="Narys architecture workspace">
      <header className="project-bar">
        <div className="project-identity">
          <span className="brand"><span className="brand-mark"><Layers3 size={17} /></span><strong>Narys</strong></span>
          <span className="project-separator" aria-hidden="true">/</span>
          <span className="project-name">acme/payments</span>
          <span className="branch"><GitBranch size={14} /> main</span>
        </div>
        <div className="project-actions">
          {scenario === "public" && <Button variant="ghost" size="sm" className="utility-button sign-in" type="button" onClick={() => setShowSignInNote((open) => !open)}><LogIn size={15} /> Sign in</Button>}
          <Button variant="outline" size="sm" className="utility-button merge-trigger" type="button" ref={mergeTrigger} aria-expanded={panel?.kind === "recent" || panel?.kind === "merge"} aria-controls={panel ? "change-inspector" : undefined} onClick={() => setPanel({ kind: "recent" })}>
            <History size={16} /> <span>Recent merges</span>
          </Button>
        </div>
      </header>

      <div className="stage">
        <div className="map-title">
          {schematic ? (
            <nav className="schematic-breadcrumb" aria-label="Architecture levels">
              {contextOpen ? <span aria-current="page">System context</span>
                : <Button variant="ghost" size="sm" type="button" onClick={openContext}>System context</Button>}
              {!contextOpen && <><ChevronRight size={12} aria-hidden="true" />
                {workerView
                  ? <Button variant="ghost" size="sm" type="button" onClick={() => closePanel("map")}>Containers</Button>
                  : <span aria-current="page">Containers</span>}</>}
              {workerView && <><ChevronRight size={12} aria-hidden="true" /><span aria-current="page">Worker components</span></>}
            </nav>
          ) : workerView
            ? <Button variant="ghost" size="sm" className="map-back" type="button" onClick={() => closePanel("map")}><ArrowLeft size={14} /> Back to Payments map</Button>
            : <span className="map-kicker"><ScanLine size={14} /> Architecture</span>}
          {workerView ? <h1 ref={workerTitle} tabIndex={-1}>Payments Worker</h1>
            : <h1 ref={overviewTitle} tabIndex={schematic ? -1 : undefined}>{contextOpen ? "Payments system" : "Payments"}</h1>}
          <div className="map-meta">{panel?.kind === "merge" ? `${panel.side === "before" ? "Before" : "After"} #${panel.merge.id}` : "Map revision"} <code>{visibleMap.commit}</code></div>
        </div>
        <div ref={overview} className="overview-map" data-hidden={graphHidden} aria-hidden={graphHidden || undefined} inert={graphHidden}>
          <ArchitectureGraph direction={direction} compact={compactOverview} schematic={schematic}
            panelVisible={Boolean(panel)} compare={comparing} selected={panel?.kind === "map" ? panel.selection : undefined}
            revision={visibleMap} onInspect={openMapSelection} />
        </div>
        {workerView && (schematic ? <RetrySchematic /> : <WorkerDrawing />)}
        {contextOpen && (
          <div className="system-context" data-inspector={Boolean(panel)}>
            <Button variant="outline" type="button" className="context-system" onClick={openContainers}>
              <ArchitectureGlyph kind="boundary" detail="detailed" />
              <strong>Payments</strong>
              <span>Open container map <ArrowRight size={14} aria-hidden="true" /></span>
            </Button>
          </div>
        )}
        {isBehind && <div className="activity" data-scenario={scenario} role="status">{scenario === "gap" ? <TriangleAlert size={15} /> : <History size={15} />}{scenario === "gap" ? "Earlier merge analysis incomplete" : "Checking latest merges"}</div>}
        {showSignInNote && <div className="sign-in-note" role="status">GitHub sign-in is simulated in this Storybook preview.</div>}

        {panel && (
          <aside className="inspector" id="change-inspector" ref={inspector} aria-labelledby="inspector-title">
            <div className="inspector-heading">
              <div className="inspector-topline">
                {panel.kind === "merge" ? (
                  <Button variant="ghost" size="sm" className="back-button" type="button" onClick={() => backToRecent(panel.merge.id)}><ArrowLeft size={15} /> Recent merges</Button>
                ) : <span className="inspector-category">{panel.kind === "recent" ? "Architecture activity"
                  : panel.selection.kind === "relationship" ? "Relationship"
                  : workerView ? "Component evidence" : schematic ? "Container" : "Architecture element"}</span>}
                <Button variant="outline" size="icon-sm" className="dismiss" type="button" aria-label="Close inspector" onClick={() => closePanel(panel.kind)}><X size={17} /></Button>
              </div>
              {panel.kind === "merge" && <span className="merge-id"><GitMerge size={14} /> PR #{panel.merge.id}</span>}
              <h2 id="inspector-title" tabIndex={-1} ref={panelTitle}>{workerView ? "Source evidence" : overlayTitle}</h2>
            </div>
            <div className="inspector-body">
              {panel.kind === "recent" && (
                <ul className="merge-list" aria-label="Recent architecture merges">
                  {merges.map((merge) => (
                    <li key={merge.id}>
                      <Button variant="ghost" type="button" data-merge-id={merge.id} onClick={() => setPanel({ kind: "merge", merge, side: "after" })}>
                        <span className="list-icon"><GitMerge size={17} /></span>
                        <span><strong>{merge.title}</strong><small>#{merge.id} · {merge.date}</small></span>
                        <ArrowDownRight size={17} className="list-arrow" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {panel.kind === "merge" && <MergeDetails key={panel.merge.id} merge={panel.merge} side={panel.side} onSide={(side) => setPanel({ ...panel, side })} />}
              {panel.kind === "map" && (
                <>
                  <MapDetails selection={panel.selection} revision={panel.revision} detailed={schematic && !workerView} comparing={comparing} />
                  {canExploreWorker && !workerView && <Button variant="outline" size="sm" className="explore-worker" type="button" onClick={() => setPanel({ ...panel, view: "worker" })}>Explore component <ArrowRight size={14} /></Button>}
                  {workerView && <SourceDisclosure commit={panel.revision.commit} path={components.worker.path} />}
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
