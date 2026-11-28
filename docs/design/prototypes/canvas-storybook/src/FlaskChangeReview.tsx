import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, Braces, ChevronDown, ExternalLink, GitBranch, GitMerge, Layers3, X } from "lucide-react";
import { ChangeMark, ConfidenceMark, ConnectionSample } from "./architecture-visuals";
import { CodeSymbolCard } from "./CodeSymbolCard";
import { Button } from "./components/ui/button";
import { RevisionSwitch } from "./RevisionSwitch";
import {
  flaskComparison, flaskPullRequest, flaskReference, flaskRevisions, flaskSourceUrl,
  type FlaskSelection, type FlaskSide, type FlaskSource,
} from "./flask-reference";

function EvidenceExcerpt({ source, side, expanded }: { source: FlaskSource; side: FlaskSide; expanded: boolean }) {
  return (
    <details className="evidence-disclosure" open={expanded}>
      <summary><Braces size={15} aria-hidden="true" /><span>{source.label}</span><ChevronDown size={14} aria-hidden="true" /></summary>
      <div className="source-excerpts">
        <a className="flask-source-link" href={flaskSourceUrl(side, source)} target="_blank" rel="noreferrer">
          <code>{source.path} · {source.range}</code><ExternalLink size={13} aria-hidden="true" />
        </a>
        <pre>{source.excerpt}</pre>
      </div>
    </details>
  );
}

const symbols = ["jsonify", "owner", "flask", "default"] as const;
const relationships = ["dispatch", "selection", "inheritance"] as const;

export function FlaskChangeReview() {
  const [side, setSide] = useState<FlaskSide>("after");
  const [inspection, setInspection] = useState<FlaskSelection | "merge" | null>("merge");
  const workspace = useRef<HTMLElement>(null);
  const inspectorTitle = useRef<HTMLHeadingElement>(null);
  const prButton = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<"inspector" | "pr" | FlaskSelection | null>(null);
  const reference = flaskReference[side];
  const selected = inspection && inspection !== "merge" ? reference[inspection] : undefined;

  useLayoutEffect(() => {
    const focus = pendingFocus.current;
    pendingFocus.current = null;
    if (focus === "inspector") inspectorTitle.current?.focus();
    else if (focus === "pr") prButton.current?.focus();
    else if (focus) workspace.current?.querySelector<HTMLElement>(`[data-map-control="flask-${focus}"]`)?.focus();
  }, [inspection]);

  function inspect(next: FlaskSelection | "merge") {
    if (next === inspection) { inspectorTitle.current?.focus(); return; }
    pendingFocus.current = "inspector";
    setInspection(next);
  }

  function closeInspector() {
    pendingFocus.current = inspection === "merge" ? "pr" : inspection;
    setInspection(null);
  }

  function switchRevision(next: FlaskSide) {
    setSide(next);
    if (inspection && inspection !== "merge" && !flaskReference[next][inspection]) setInspection("merge");
  }

  function handleEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && inspection) closeInspector();
  }

  return (
    <main ref={workspace} className="narys flask-review" data-direction="light" data-look="carbon" data-schematic="true"
      aria-label="Flask architecture workspace" onKeyDown={handleEscape}>
      <header className="project-bar">
        <div className="project-identity">
          <span className="brand"><span className="brand-mark"><Layers3 size={17} aria-hidden="true" /></span><strong>Narys</strong></span>
          <span className="project-separator" aria-hidden="true">/</span><span className="project-name">pallets/flask</span>
          <span className="branch"><GitBranch size={14} aria-hidden="true" /> main</span>
        </div>
        <div className="project-actions">
          <Button variant="outline" size="sm" ref={prButton} type="button" aria-expanded={inspection === "merge"}
            aria-controls={inspection ? "flask-inspector" : undefined} onClick={() => inspect("merge")}>
            <GitMerge size={15} aria-hidden="true" /> PR #4692
          </Button>
        </div>
      </header>

      <div className="stage">
        <div className="map-title flask-title">
          <p className="scope-qualifier">Implementation · Flask JSON responses</p>
          <h1>JSON response construction</h1>
          <RevisionSwitch revisions={flaskRevisions} side={side} onSide={switchRevision} />
        </div>

        <section className="flask-code-map" data-inspector={Boolean(inspection)} aria-label="Flask source relationships">
          <div className="flask-code-content">
            <p className="flask-revision-summary" role="status">{reference.summary}</p>
            <div className="flask-code-diagram">
              {symbols.map(id => {
                const item = reference[id];
                return item && <div key={id} className="flask-code-cell" data-position={id}>
                  <CodeSymbolCard symbol={item.symbol} change={item.change} selected={inspection === id} controlId={`flask-${id}`} onInspect={() => inspect(id)} />
                </div>;
              })}
              {relationships.map(id => {
                const item = reference[id];
                return item && <button className="scope-edge flask-code-relation" key={id} data-position={id} data-map-control={`flask-${id}`}
                  aria-label={`Inspect ${item.title}`} aria-pressed={inspection === id} type="button" onClick={() => inspect(id)}>
                  <span>{item.title}</span>
                  {id === "inheritance" ? (
                    <svg className="flask-inheritance" viewBox="0 0 18 42" aria-hidden="true">
                      <path d="M9 41V14" stroke="currentColor" strokeDasharray="3 3" />
                      <path d="M2 14 9 2 16 14Z" fill="white" stroke="currentColor" />
                    </svg>
                  ) : <ConnectionSample kind={id === "selection" ? "data" : "sync"} />}
                </button>;
              })}
            </div>
          </div>
        </section>

        {inspection && (
          <aside className="inspector" id="flask-inspector" aria-labelledby="flask-inspector-title">
            <div className="inspector-heading">
              <div className="inspector-topline">
                {selected ? <Button variant="ghost" className="back-button" size="sm" type="button" onClick={() => inspect("merge")}>
                  <ArrowLeft size={15} aria-hidden="true" /> Back to PR #4692
                </Button> : <span className="merge-id"><GitMerge size={14} aria-hidden="true" /> Merged · PR #4692</span>}
                <Button variant="outline" size="icon-sm" type="button" aria-label="Close inspector" onClick={closeInspector}>
                  <X size={17} aria-hidden="true" />
                </Button>
              </div>
              <h2 id="flask-inspector-title" ref={inspectorTitle} tabIndex={-1}>{selected?.title ?? "Add JSON provider interface"}</h2>
            </div>
            <div className="inspector-body">
              <p className="flask-revision-reference"><strong>{side === "before" ? "Before" : "After"} revision</strong><code>{flaskRevisions[side]}</code></p>
              <section className="detail-section">
                {selected ? (
                  <>
                    <p>{selected.description}</p>
                    <div className="flask-evidence-marks"><ConfidenceMark confidence="supported" />{selected.change && <ChangeMark change={selected.change} />}</div>
                  </>
                ) : <>
                  <h3>Who builds the JSON response</h3>
                  <dl className="responsibility-transfer">
                    <div data-current={side === "before"}><dt>Before</dt><dd><code>jsonify()</code></dd></div>
                    <div data-current={side === "after"}><dt>After</dt><dd>The app’s JSON provider</dd></div>
                  </dl>
                  <p>Applications can replace the provider. The default still uses Python’s built-in <code>json</code> library.</p>
                  {side === "after" && <div className="flask-evidence-actions" role="group" aria-label="Provider evidence">
                    <Button variant="outline" size="sm" type="button" onClick={() => inspect("flask")}>Configuration point</Button>
                    <Button variant="outline" size="sm" type="button" onClick={() => inspect("default")}>Default implementation</Button>
                  </div>}
                  <a className="flask-source-link" href={flaskComparison} target="_blank" rel="noreferrer">Compare the pinned commits <ExternalLink size={13} aria-hidden="true" /></a>
                </>}
              </section>
              {!selected && (
                <section className="detail-section">
                  <h3>Documented intent</h3>
                  <p>Let applications choose their JSON implementation. The author cited potential speed gains for JSON-heavy APIs as a motivation.</p>
                  <a className="flask-source-link" href={flaskPullRequest} target="_blank" rel="noreferrer">Read the PR rationale <ExternalLink size={13} aria-hidden="true" /></a>
                  <p className="flask-performance-status"><strong>Performance outcome</strong> · Unverified</p>
                </section>
              )}
              <section className="detail-section flask-evidence" aria-label="Pinned source evidence">
                <h3>Pinned source</h3>
                {(selected?.source ?? reference.dispatch.source).map((source, index) => (
                  <EvidenceExcerpt key={`${side}-${inspection}-${source.range}`} source={source} side={side} expanded={index === 0} />
                ))}
              </section>
              {!selected && <section className="detail-section deployment">
                <h3>Deployment</h3>
                <p>Deployment unconfirmed.</p>
                <a className="flask-source-link" href={flaskSourceUrl("after", { path: "tests/test_json.py", range: "L223-L257" })}
                  target="_blank" rel="noreferrer">Custom-provider test source <ExternalLink size={13} aria-hidden="true" /></a>
              </section>}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
