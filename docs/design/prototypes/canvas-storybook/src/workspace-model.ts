import type { NodePresentation } from "./ArchitectureNodeFace";
import type { CodeSymbol } from "./CodeSymbolCard";
import type { RevisionSide } from "./RevisionSwitch";
import type { ChangePresentation, DeploymentEvidence, ObservationPresentation, RecordedIntent, RelationshipPresentation } from "./presentation";

type Port = "top" | "right" | "bottom" | "left";

export interface OverviewNode extends NodePresentation {
  id: string;
  column: number;
  row: number;
  ports: readonly Port[];
  shortRole?: string;
}

export interface OverviewRelationship extends RelationshipPresentation {
  from: string;
  to: string;
  route: "across" | "down" | "up";
}

type ScopeNode = { id: string } & ({ node: NodePresentation } | { symbol: CodeSymbol });

export interface WorkspaceScope {
  id: string;
  label: string;
  title: string;
  kind: "context" | "overview" | "components" | "implementation";
  diagram?: { label: string; qualifier: string; nodes: readonly ScopeNode[]; relationships: readonly RelationshipPresentation[] };
  unavailable?: { title: string; message: string };
}

export interface MapRevision {
  commit: string;
  observations: Readonly<Partial<Record<string, ObservationPresentation>>>;
  relationships: readonly OverviewRelationship[];
  scopes: readonly string[];
  flows?: Readonly<Partial<Record<string, { id: string; label: string; observation?: string }>>>;
}

export interface MergePresentation {
  id: number;
  title: string;
  date: string;
  revisions: Record<RevisionSide, { commit: string; details: ChangePresentation; map?: MapRevision }>;
  intent: RecordedIntent;
  deployment: DeploymentEvidence;
}

export interface WorkspaceSnapshot {
  map: MapRevision;
  merges: readonly MergePresentation[];
  status?: { kind: "checking" | "gap" | "complete"; label: string };
}

export interface WorkspacePresentation {
  repository: string;
  branch: string;
  overviewScope: string;
  nodes: readonly OverviewNode[];
  scopes: readonly WorkspaceScope[];
  initial: WorkspaceSnapshot;
  transition?: { label: string; accessibleLabel?: string; result: WorkspaceSnapshot };
  public?: boolean;
}
