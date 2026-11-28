import { ChangeMark, type ArchitectureChange } from "./architecture-visuals";

const symbolMarks = { Class: "C", Interface: "I", Function: "F", Method: "M", Type: "T", Module: "□", Call: "↗" } as const;

export interface CodeSymbol {
  name: string;
  kind: keyof typeof symbolMarks;
  members: readonly string[];
}

export function CodeSymbolCard({ symbol, selected, change, controlId, onInspect }: {
  symbol: CodeSymbol;
  selected: boolean;
  change?: ArchitectureChange;
  controlId: string;
  onInspect: () => void;
}) {
  return (
    <button className="code-symbol" type="button" data-map-control={controlId} aria-label={`Inspect ${symbol.name}`}
      aria-description={[symbol.kind, change].filter(Boolean).join(", ")} aria-pressed={selected} onClick={onInspect}>
      <span className="code-symbol-heading">
        <span className="code-symbol-mark" aria-hidden="true">{symbolMarks[symbol.kind]}</span>
        <strong>{symbol.name}</strong>
        <small>{symbol.kind}</small>
      </span>
      <span className="code-symbol-members">
        {symbol.members.map(member => <code key={member}>{member}</code>)}
        {change && <ChangeMark change={change} />}
      </span>
    </button>
  );
}
