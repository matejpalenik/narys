import { ConnectionSample, connectionNames } from "./architecture-visuals";
import type { RelationshipPresentation } from "./presentation";

export function RelationshipControl({ relation, controlId, selected, onInspect, position, orientation = "right" }: {
  relation: RelationshipPresentation;
  controlId: string;
  selected: boolean;
  onInspect: () => void;
  position?: string;
  orientation?: "right" | "up";
}) {
  return <button className="scope-edge" type="button" data-map-control={controlId} data-position={position}
    data-orientation={orientation} aria-label={`Inspect ${relation.label}`} aria-description={connectionNames[relation.kind]}
    aria-pressed={selected} onClick={onInspect}>
    <span>{relation.label}</span><ConnectionSample kind={relation.kind} />
  </button>;
}
