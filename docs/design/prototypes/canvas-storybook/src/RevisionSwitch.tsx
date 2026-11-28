import { Button } from "./components/ui/button";

export type RevisionSide = "before" | "after";

export function RevisionSwitch({ revisions, side, onSide }: {
  revisions: Record<RevisionSide, string>;
  side: RevisionSide;
  onSide: (side: RevisionSide) => void;
}) {
  return (
    <div className="revision-switch" role="group" aria-label="Compare revisions">
      {(["before", "after"] as const).map(value => (
        <Button key={value} variant="ghost" type="button" aria-pressed={side === value} onClick={() => onSide(value)}>
          <span>{value === "before" ? "Before" : "After"}</span><code title={revisions[value]}>{revisions[value].slice(0, 7)}</code>
        </Button>
      ))}
    </div>
  );
}
