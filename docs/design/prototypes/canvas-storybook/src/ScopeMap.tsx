import { ArrowRight } from "lucide-react";
import { ArchitectureNodeFace } from "./ArchitectureNodeFace";
import { CodeSymbolCard } from "./CodeSymbolCard";
import { Button } from "./components/ui/button";
import { RelationshipControl } from "./RelationshipControl";
import type { WorkspaceScope } from "./workspace-model";

export function ScopeMap({ diagram, layout, panelVisible, selected, onSelect }: {
  diagram: NonNullable<WorkspaceScope["diagram"]>;
  layout: WorkspaceScope["kind"];
  panelVisible: boolean;
  selected?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="scope-map" data-inspector={panelVisible} aria-label={diagram.label}>
      <div className="scope-content">
        <p className="scope-qualifier">{diagram.qualifier}</p>
        <div className="scope-diagram" data-scope={layout}>
          {diagram.nodes.map((item, index) => {
            const relation = diagram.relationships[index];
            return <div className="scope-step" key={item.id}>
              {"symbol" in item
                ? <CodeSymbolCard symbol={item.symbol} selected={selected === item.id} controlId={`observation-${item.id}`} onInspect={() => onSelect(item.id)} />
                : <button className="scope-node" type="button" data-map-control={`observation-${item.id}`} aria-label={`Inspect ${item.node.name}`}
                  aria-pressed={selected === item.id} onClick={() => onSelect(item.id)}>
                  <ArchitectureNodeFace node={item.node} />
                </button>}
              {relation && <RelationshipControl relation={relation} controlId={`observation-${relation.id}`}
                selected={selected === relation.id} onInspect={() => onSelect(relation.id)} />}
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}

export function UnavailableScope({ message, title, commit, panelVisible, onBack, backLabel }: {
  message: string; title: string; commit: string; panelVisible: boolean; onBack: () => void; backLabel: string;
}) {
  return <section className="scope-map" data-inspector={panelVisible} aria-label="Scope evidence unavailable">
    <div className="scope-unavailable">
      <h2>{title}</h2><p>{message} <code>{commit}</code>.</p>
      <Button variant="outline" type="button" onClick={onBack}>{backLabel} <ArrowRight size={15} aria-hidden="true" /></Button>
    </div>
  </section>;
}
