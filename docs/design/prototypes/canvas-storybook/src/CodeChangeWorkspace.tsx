import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, GitBranch, GitMerge, Layers3 } from "lucide-react";
import { CodeSymbolCard, type CodeSymbol } from "./CodeSymbolCard";
import { Button } from "./components/ui/button";
import { ChangeDetails, Inspector, ObservationDetails } from "./Inspector";
import { RelationshipControl } from "./RelationshipControl";
import { RevisionSwitch, type RevisionSide } from "./RevisionSwitch";
import type { ChangePresentation, DeploymentEvidence, ObservationPresentation, RecordedIntent, RelationshipPresentation } from "./presentation";

type DiagramSlot = "top-start" | "top-link" | "top-end" | "vertical-link" | "bottom-start" | "bottom-link" | "bottom-end";

type CodeDiagramItem = { id: string; position: DiagramSlot; observation: ObservationPresentation } & (
  | { kind: "symbol"; symbol: CodeSymbol }
  | { kind: "relationship"; relation: RelationshipPresentation; orientation?: "up" }
);

export interface CodeComparison {
  repository: string;
  branch: string;
  subject: string;
  title: string;
  merge: { id: number; title: string; intent: RecordedIntent; deployment: DeploymentEvidence };
  revisions: Record<RevisionSide, { commit: string; mapSummary: string; items: readonly CodeDiagramItem[]; change: ChangePresentation }>;
}

export function CodeChangeWorkspace({ comparison }: { comparison: CodeComparison }) {
  const [side, setSide] = useState<RevisionSide>("after");
  const [inspection, setInspection] = useState<{ kind: "merge" } | { kind: "observation"; id: string } | null>({ kind: "merge" });
  const workspace = useRef<HTMLElement>(null);
  const inspectorTitle = useRef<HTMLHeadingElement>(null);
  const prButton = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<string | null>(null);
  const relatedOpener = useRef<string | null>(null);
  const revision = comparison.revisions[side];
  const current = inspection?.kind === "observation" ? inspection.id : undefined;
  const selected = revision.items.find(item => item.id === current);
  const mergeLabel = `PR #${comparison.merge.id}`;

  useLayoutEffect(() => {
    const focus = pendingFocus.current;
    pendingFocus.current = null;
    if (focus === "inspector") inspectorTitle.current?.focus();
    else if (focus === "pr") prButton.current?.focus();
    else if (focus) (workspace.current?.querySelector<HTMLElement>(focus) ?? inspectorTitle.current)?.focus();
  }, [inspection]);

  function inspect(id: string, opener?: string) {
    relatedOpener.current = opener ?? null;
    pendingFocus.current = "inspector";
    setInspection({ kind: "observation", id });
  }

  function openMerge(restoreOpener = false) {
    pendingFocus.current = (restoreOpener && relatedOpener.current) || "inspector";
    relatedOpener.current = null;
    setInspection({ kind: "merge" });
  }

  function closeInspector() {
    pendingFocus.current = current ? `[data-map-control="code-${CSS.escape(current)}"]` : "pr";
    relatedOpener.current = null;
    setInspection(null);
  }

  function switchRevision(next: RevisionSide) {
    setSide(next);
    if (current && !comparison.revisions[next].items.some(item => item.id === current)) {
      // The pressed revision control retains focus when a selection ceases to apply.
      relatedOpener.current = null;
      setInspection({ kind: "merge" });
    }
  }

  function handleEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && inspection) closeInspector();
  }

  return <main ref={workspace} className="narys code-comparison" data-direction="light" data-look="carbon" data-schematic="true"
    aria-label={`${comparison.repository} architecture workspace`} onKeyDown={handleEscape}>
    <header className="project-bar">
      <div className="project-identity">
        <span className="brand"><span className="brand-mark"><Layers3 size={17} aria-hidden="true" /></span><strong>Narys</strong></span>
        <span className="project-separator" aria-hidden="true">/</span><span className="project-name">{comparison.repository}</span>
        <span className="branch"><GitBranch size={14} aria-hidden="true" /> {comparison.branch}</span>
      </div>
      <div className="project-actions">
        <Button variant="outline" size="sm" ref={prButton} type="button" aria-expanded={inspection?.kind === "merge"}
          aria-controls={inspection ? "code-inspector" : undefined} onClick={() => openMerge()}>
          <GitMerge size={15} aria-hidden="true" /> {mergeLabel}
        </Button>
      </div>
    </header>
    <div className="stage">
      <div className="map-title code-comparison-title">
        <p className="scope-qualifier">{comparison.subject}</p>
        <h1>{comparison.title}</h1>
        <RevisionSwitch revisions={{ before: comparison.revisions.before.commit, after: comparison.revisions.after.commit }}
          side={side} onSide={switchRevision} />
      </div>
      <section className="code-comparison-map" data-inspector={Boolean(inspection)} aria-label="Implementation relationships">
        <div className="code-comparison-content">
          <p className="code-comparison-summary" role="status">{revision.mapSummary}</p>
          <div className="code-comparison-diagram">
            {revision.items.map(item => item.kind === "symbol"
              ? <div key={item.id} className="code-comparison-cell" data-position={item.position}>
                <CodeSymbolCard symbol={item.symbol} change={item.observation.change} selected={current === item.id}
                  controlId={`code-${item.id}`} onInspect={() => inspect(item.id)} />
              </div>
              : <RelationshipControl key={item.id} relation={item.relation} controlId={`code-${item.id}`} position={item.position}
                orientation={item.orientation} selected={current === item.id} onInspect={() => inspect(item.id)} />)}
          </div>
        </div>
      </section>
      {inspection && <Inspector id="code-inspector" title={selected?.observation.title ?? comparison.merge.title}
        titleRef={inspectorTitle} onDismiss={closeInspector}
        leading={selected ? <Button variant="ghost" className="back-button" size="sm" type="button" onClick={() => openMerge(true)}>
          <ArrowLeft size={15} aria-hidden="true" /> Back to {mergeLabel}
        </Button> : <span className="merge-id"><GitMerge size={14} aria-hidden="true" /> Merged · {mergeLabel}</span>}>
        {selected ? <ObservationDetails observation={selected.observation} revision={revision.commit} onAction={action => {
          if (action.kind === "inspect") inspect(action.target);
        }} /> : <>
          <p className="observation-revision"><strong>{side === "before" ? "Before" : "After"} revision</strong> <code>{revision.commit}</code></p>
          <ChangeDetails value={revision.change} side={side} revision={revision.commit} intent={comparison.merge.intent}
            deployment={comparison.merge.deployment} onAction={action => {
              if (action.kind === "inspect") inspect(action.target, `[data-inspector-action="${CSS.escape(action.id)}"]`);
            }} />
        </>}
      </Inspector>}
    </div>
  </main>;
}
