import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, Braces, Check, ChevronDown, CircleHelp,
  ChevronRight, GitBranch, GitMerge, History, Layers3, LogIn, ScanLine, Server, TriangleAlert, X,
} from "lucide-react";
import { ArchitectureGraph, mapControlId, type Direction, type MapSelection } from "./ArchitectureGraph";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { afterRetry, checkoutGap, components, retryMerge, statusMerge, type MapRevision, type Merge } from "./fixture";
import { ArchitectureNodeFace, paymentNodeChange, paymentNodeVisuals } from "./ArchitectureNodeFace";
import { RetrySchematic } from "./IllustrativeFlow";
import { RevisionSwitch } from "./RevisionSwitch";
import { PaymentsScopeMap, UnavailableScope, paymentsObservations, type ArchitectureScope, type PaymentsObservation } from "./PaymentsExploration";

export type Scenario = "ready" | "checking" | "gap" | "public";
type Comparison = { merge: Merge; side: "before" | "after" };
type Perspective = "structure" | "flow";
type Panel =
  | { kind: "recent" }
  | { kind: "merge" }
  | { kind: "map"; selection: MapSelection }
  | { kind: "observation"; id: PaymentsObservation };

const scopePath: ArchitectureScope[] = ["context", "containers", "worker", "implementation"];
const scopeLabels = {
  context: "System context", containers: "Containers", worker: "Components", implementation: "Implementation",
};
const scopeTitles = {
  context: "Payments system", containers: "Payments", worker: "Payments Worker", implementation: "Retry handler",
};

interface WorkspaceProps {
  direction: Direction;
  look?: "blueprint" | "industrial" | "carbon";
  scenario?: Scenario;
  startWithChange?: boolean;
  schematic?: boolean;
  startAtWorker?: boolean;
  startAtContext?: boolean;
  simulateAnalysis?: boolean;
}

function Status({ kind, children }: { kind: "supported" | "unconfirmed"; children: string }) {
  const Icon = kind === "supported" ? Check : CircleHelp;
  return <Badge variant="outline" className="status-tag" data-kind={kind}><Icon size={13} aria-hidden="true" />{children}</Badge>;
}

function MergeDetails({ merge, side, onSide, onInspectImplementation }: {
  merge: Merge;
  side: "before" | "after";
  onSide: (side: "before" | "after") => void;
  onInspectImplementation?: () => void;
}) {
  return (
    <>
      <div className="merge-facts">
        <span><GitMerge size={15} /> Merged</span>
        <time>{merge.date}</time>
      </div>
      <RevisionSwitch revisions={{ before: merge.before.commit, after: merge.after.commit }} side={side} onSide={onSide} />
      <section className="detail-section">
        <h3>What changed</h3>
        {merge.id === 128
          ? <p>{side === "before" ? "The cited Checkout failure path retries the payment directly." : merge.summary}</p>
          : <p>{merge.summary}</p>}
        {merge.id === 128 && side === "after" && (
          <div className="claim-list">
            <div><Status kind="supported">Supported by source</Status><p>Payments Worker handles queued retries.</p></div>
            <div><Status kind="unconfirmed">Unconfirmed</Status><p>Whether Checkout still retries directly.</p></div>
          </div>
        )}
        {onInspectImplementation && <Button variant="outline" size="sm" type="button" data-implementation-opener="merge" onClick={onInspectImplementation}>
          Inspect retry implementation <ArrowRight size={14} aria-hidden="true" />
        </Button>}
      </section>
      <section className="detail-section deployment">
        <h3>Deployment</h3>
        {merge.deployment ? <Status kind="supported">{`Confirmed in ${merge.deployment.environment} at ${merge.deployment.commit}`}</Status> : <Status kind="unconfirmed">Deployment unconfirmed</Status>}
      </section>
      <section className="detail-section">
        <h3>Why</h3>
        {merge.rationale ? (
          <details className="rationale-disclosure">
            <summary className="source-reference"><Braces size={14} />{merge.rationale.label}<ChevronDown size={14} /></summary>
            <p><strong>Documented intent</strong> · {merge.rationale.text}</p>
          </details>
        ) : <p>Missing rationale</p>}
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
        {relationship.added && <SourceDisclosure commit={revision.commit} path={source} />}
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
      {detailed && <SourceDisclosure commit={revision.commit} path={components[id].path} />}
    </section>
  );
}

function SourceDisclosure({ commit, path, expanded = false }: { commit: string; path: string; expanded?: boolean }) {
  const excerpts = [retryMerge, statusMerge].flatMap(merge => {
    if (merge.after.commit === commit) return merge.evidence.after;
    if (merge.before.commit === commit) return merge.evidence.before;
    return [];
  });
  const excerpt = excerpts.find((item) => item.path === path);
  if (!excerpt) return null;

  return (
    <details className="evidence-disclosure" open={expanded}>
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

export function Workspace({
  direction, look, scenario = "ready", startWithChange = true, schematic = false,
  startAtWorker = false, startAtContext = false, simulateAnalysis = false,
}: WorkspaceProps) {
  const [scope, setScope] = useState<ArchitectureScope>(startAtWorker ? "worker" : startAtContext ? "context" : "containers");
  const [perspective, setPerspective] = useState<Perspective>(startAtWorker ? "flow" : "structure");
  const [implementationOrigin, setImplementationOrigin] = useState<ArchitectureScope | null>(null);
  const [comparison, setComparison] = useState<Comparison | null>(startWithChange && !startAtWorker ? { merge: retryMerge, side: "after" } : null);
  const [panel, setPanel] = useState<Panel | null>(startAtWorker
    ? { kind: "observation", id: "handler" }
    : startWithChange ? { kind: "merge" } : null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showSignInNote, setShowSignInNote] = useState(false);
  const mergeTrigger = useRef<HTMLButtonElement>(null);
  const panelTitle = useRef<HTMLHeadingElement>(null);
  const mapTitle = useRef<HTMLHeadingElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const savedViews = useRef<Partial<Record<ArchitectureScope, { panel: Panel | null; perspective: Perspective; focus?: string }>>>({});
  const requestedFocus = useRef<string | null>(null);
  const inspectingFromRecent = useRef(false);

  const checking = scenario === "checking" && !analysisComplete;
  const gap = scenario === "gap";
  const latest = checking || gap ? retryMerge.before : afterRetry;
  const merges = checking || gap ? [statusMerge] : [retryMerge, statusMerge];
  const visibleMap = comparison ? comparison.merge[comparison.side] : latest;
  const compactOverview = look === "industrial" || look === "carbon";
  const workerAvailable = visibleMap.retryPath;
  const showFlow = scope === "worker" && perspective === "flow" && workerAvailable;
  const innerScope = scope === "worker" || scope === "implementation";
  const observation = panel?.kind === "observation" ? paymentsObservations[panel.id] : undefined;
  const returnToComparison = implementationOrigin && savedViews.current[implementationOrigin]?.panel?.kind === "merge" && comparison;
  let overlayTitle = "Recent merges";
  if (panel?.kind === "merge" && comparison) overlayTitle = comparison.merge.title;
  if (panel?.kind === "map") overlayTitle = panel.selection.kind === "component"
    ? components[panel.selection.id].name : panel.selection.relationship.label;
  if (observation) overlayTitle = observation.label;

  useLayoutEffect(() => {
    const request = requestedFocus.current;
    if (!request) return;
    requestedFocus.current = null;
    if (request === "map-title") { mapTitle.current?.focus(); return; }
    if (request === "panel-title") { panelTitle.current?.focus(); return; }
    if (request === "recent-merges") { mergeTrigger.current?.focus(); return; }

    const target = stage.current?.querySelector<HTMLElement>(request);
    if (target) { target.focus(); return; }
    // The graph positions relationship controls after React Flow measures its nodes.
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
    if (current?.kind === "map") return `[data-map-control="${mapControlId(current.selection)}"]`;
    if (current?.kind === "observation") return `[data-map-control="observation-${current.id}"]`;
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

  function navigate(next: ArchitectureScope, entry: Panel | null = null, opener?: string) {
    const deeper = scopePath.indexOf(next) > scopePath.indexOf(scope);
    if (deeper) savedViews.current[scope] = { panel, perspective, focus: opener };
    const saved = savedViews.current[next];
    let restored = saved ? saved.panel : comparisonPanel();
    if (restored?.kind === "merge" && !comparison) restored = null;
    if (restored?.kind === "map" && restored.selection.kind === "relationship") {
      const id = restored.selection.relationship.id;
      const relationship = visibleMap.relationships.find(item => item.id === id);
      restored = relationship ? { kind: "map", selection: { kind: "relationship", relationship } } : comparisonPanel();
    }
    if (!deeper && next === "worker" && !workerAvailable) restored = comparisonPanel();
    requestedFocus.current = deeper ? entry ? "panel-title" : "map-title" : saved?.focus ?? selectionControl(restored) ?? "map-title";
    setImplementationOrigin(next === "implementation" ? scope : null);
    setScope(next);
    setPerspective(deeper ? "structure" : saved?.perspective ?? "structure");
    setPanel(deeper ? entry : restored);
  }

  function inspectImplementation(from: "merge" | "worker") {
    navigate("implementation", { kind: "observation", id: "callback" }, `[data-implementation-opener="${from}"]`);
  }

  function selectMerge(merge: Merge) {
    setComparison({ merge, side: "after" });
    openPanel({ kind: "merge" });
  }

  function selectObservation(id: PaymentsObservation) {
    openPanel({ kind: "observation", id });
  }

  function showPerspective(next: "structure" | "flow") {
    setPerspective(next);
    if (next === "flow" && !panel) setPanel({ kind: "observation", id: "handler" });
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
          {simulateAnalysis && <Button variant="ghost" size="sm" type="button" aria-label="Complete simulated analysis"
            aria-disabled={analysisComplete} onClick={() => setAnalysisComplete(true)}>Finish simulation</Button>}
          {scenario === "public" && <Button variant="ghost" size="sm" className="utility-button sign-in" type="button" onClick={() => setShowSignInNote(open => !open)}><LogIn size={15} /> Sign in</Button>}
          <Button variant="outline" size="sm" className="utility-button merge-trigger" type="button" ref={mergeTrigger}
            aria-expanded={panel?.kind === "recent" || panel?.kind === "merge"} aria-controls={panel ? "change-inspector" : undefined}
            onClick={() => openPanel({ kind: "recent" })}>
            <History size={16} /> <span>Recent merges</span>
          </Button>
        </div>
      </header>

      <div className="stage" ref={stage}>
        <div className="map-title">
          {schematic ? (
            <nav className="schematic-breadcrumb" aria-label="Architecture levels">
              {scopePath.slice(0, scopePath.indexOf(scope) + 1).map((level, index) => (
                <span className="scope-crumb" key={level}>
                  {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
                  {level === scope ? <span aria-current="page">{scopeLabels[level]}</span>
                    : <Button variant="ghost" size="sm" type="button" onClick={() => navigate(level)}>{scopeLabels[level]}</Button>}
                </span>
              ))}
            </nav>
          ) : innerScope
            ? <Button variant="ghost" size="sm" className="map-back" type="button" onClick={() => navigate("containers")}><ArrowLeft size={14} /> Back to Payments map</Button>
            : <span className="map-kicker"><ScanLine size={14} /> Architecture</span>}
          <h1 ref={mapTitle} tabIndex={-1}>{scopeTitles[scope]}</h1>
          <div className="map-meta">
            {comparison ? `${comparison.side === "before" ? "Before" : "After"} #${comparison.merge.id}` : "Map revision"} <code>{visibleMap.commit}</code>
            {schematic && !comparison && <span>· Selected area</span>}
            {comparison && panel?.kind !== "merge" && (
              <Button variant="ghost" size="sm" type="button" onClick={() => openPanel({ kind: "merge" })}>View PR #{comparison.merge.id}</Button>
            )}
          </div>
          {schematic && scope === "worker" && workerAvailable && (
            <Button variant="outline" size="sm" className="scope-perspective" type="button" onClick={() => showPerspective(showFlow ? "structure" : "flow")}>
              {showFlow ? "Back to structure" : "View retry flow"} <ArrowRight size={14} aria-hidden="true" />
            </Button>
          )}
          {schematic && scope === "implementation" && implementationOrigin && (
            <Button variant="outline" size="sm" className="scope-perspective" type="button" onClick={() => navigate(implementationOrigin)}>
              <ArrowLeft size={14} aria-hidden="true" /> {returnToComparison ? "Return to comparison" : `Return to ${scopeLabels[implementationOrigin]}`}
            </Button>
          )}
        </div>
        <div className="overview-map" data-hidden={scope !== "containers"} aria-hidden={scope !== "containers" || undefined} inert={scope !== "containers"}>
          <ArchitectureGraph direction={direction} compact={compactOverview} schematic={schematic}
            visible={scope === "containers"} panelVisible={Boolean(panel)} compare={Boolean(comparison)} selected={panel?.kind === "map" ? panel.selection : undefined}
            revision={visibleMap} onInspect={(selection) => openPanel({ kind: "map", selection })} />
        </div>
        {scope === "context" && (
          <PaymentsScopeMap scope={scope} panelVisible={Boolean(panel)} selected={panel?.kind === "observation" ? panel.id : undefined} onSelect={selectObservation} />
        )}
        {innerScope && !workerAvailable && <UnavailableScope commit={visibleMap.commit} panelVisible={Boolean(panel)} onBack={() => navigate("containers")} />}
        {innerScope && workerAvailable && (showFlow
          ? schematic ? <RetrySchematic panelVisible={Boolean(panel)} /> : <WorkerDrawing />
          : <PaymentsScopeMap scope={scope} panelVisible={Boolean(panel)} selected={panel?.kind === "observation" ? panel.id : undefined} onSelect={selectObservation} />)}
        {(checking || gap) && <div className="activity" data-scenario={scenario} role="status">{gap ? <TriangleAlert size={15} /> : <History size={15} />}{gap ? "Earlier merge analysis incomplete" : "Checking latest merges"}</div>}
        {simulateAnalysis && analysisComplete && <span className="activity" role="status">Analysis complete · #128 available</span>}
        {showSignInNote && <div className="sign-in-note" role="status">GitHub sign-in is simulated in this Storybook preview.</div>}

        {panel && (
          <aside className="inspector" id="change-inspector" aria-labelledby="inspector-title">
            <div className="inspector-heading">
              <div className="inspector-topline">
                {panel.kind === "merge" ? (
                  <Button variant="ghost" size="sm" className="back-button" type="button" onClick={backToRecent}><ArrowLeft size={15} /> Recent merges</Button>
                ) : <span className="inspector-category">{panel.kind === "recent" ? "Architecture activity"
                  : observation?.role ?? (panel.kind === "map" && panel.selection.kind === "relationship" ? "Relationship"
                  : schematic ? "Container" : "Architecture element")}</span>}
                <Button variant="outline" size="icon-sm" className="dismiss" type="button" aria-label="Close inspector"
                  onClick={panel.kind === "merge" ? backToRecent : closePanel}><X size={17} /></Button>
              </div>
              {panel.kind === "merge" && comparison && <span className="merge-id"><GitMerge size={14} /> PR #{comparison.merge.id}</span>}
              <h2 id="inspector-title" tabIndex={-1} ref={panelTitle}>{showFlow && observation ? "Source evidence" : overlayTitle}</h2>
            </div>
            <div className="inspector-body">
              {panel.kind === "recent" && (
                <ul className="merge-list" aria-label="Recent architecture merges">
                  {merges.map(merge => (
                    <li key={merge.id}>
                      <Button variant="ghost" type="button" data-merge-id={merge.id} onClick={() => selectMerge(merge)}>
                        <span className="list-icon"><GitMerge size={17} /></span>
                        <span><strong>{merge.title}</strong><small>#{merge.id} · {merge.date}</small></span>
                        <ArrowDownRight size={17} className="list-arrow" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {panel.kind === "merge" && comparison && <MergeDetails key={comparison.merge.id} merge={comparison.merge} side={comparison.side}
                onSide={side => setComparison({ ...comparison, side })}
                onInspectImplementation={schematic && scope !== "implementation" && comparison.merge.id === 128 && comparison.side === "after"
                  ? () => inspectImplementation("merge") : undefined} />}
              {panel.kind === "map" && (
                <>
                  <MapDetails selection={panel.selection} revision={visibleMap} detailed={schematic} comparing={Boolean(comparison)} />
                  {compactOverview && panel.selection.kind === "component" && panel.selection.id === "worker" && (
                    workerAvailable
                      ? <Button variant="outline" size="sm" className="explore-worker" type="button" onClick={() => {
                          navigate("worker");
                          if (!schematic) {
                            setPerspective("flow");
                            setPanel({ kind: "observation", id: "handler" });
                          }
                        }}>Explore {schematic ? "components" : "component"} <ArrowRight size={15} /></Button>
                      : schematic && <p className="scope-inspector-note">Worker internals are unavailable in the source excerpt for this revision.</p>
                  )}
                  {schematic && workerAvailable && panel.selection.kind === "component" && panel.selection.id === "worker" && (
                    <Button variant="ghost" size="sm" type="button" data-implementation-opener="worker" onClick={() => inspectImplementation("worker")}>
                      Inspect retry implementation <ArrowRight size={14} aria-hidden="true" />
                    </Button>
                  )}
                </>
              )}
              {panel.kind === "observation" && observation && (
                <section className="detail-section map-detail">
                  <p>{observation.description}</p>
                  <p>Revision <code>{visibleMap.commit}</code></p>
                  {scope === "context" && <p className="scope-inspector-note">Synthetic context fixture for the selected area.</p>}
                  {scope === "context" && panel.id === "payments" && <Button variant="outline" size="sm" type="button"
                    onClick={() => navigate("containers")}>Explore containers <ArrowRight size={15} /></Button>}
                  {innerScope && workerAvailable && <>
                    <Status kind="supported">Supported by fixture source</Status>
                    <SourceDisclosure commit={visibleMap.commit} path={components.worker.path} expanded={scope === "implementation"} />
                  </>}
                  {scope === "worker" && panel.id === "handler" && workerAvailable && (
                    <Button variant="outline" size="sm" className="explore-worker" type="button"
                      data-implementation-opener="handler"
                      onClick={() => navigate("implementation", { kind: "observation", id: "callback" }, '[data-implementation-opener="handler"]')}>
                      Explore implementation <ArrowRight size={15} aria-hidden="true" />
                    </Button>
                  )}
                </section>
              )}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
