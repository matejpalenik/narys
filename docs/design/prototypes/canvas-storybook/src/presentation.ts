import type { ArchitectureChange, ConnectionKind } from "./architecture-visuals";

export type Confidence = "supported" | "unconfirmed";

export interface SourceExcerpt {
  path: string;
  code: string;
  label?: string;
  range?: string;
  href?: string;
}

export type SourceEvidence =
  | { kind: "available"; excerpts: readonly [SourceExcerpt, ...SourceExcerpt[]]; expanded?: boolean }
  | { kind: "unavailable"; reason: string };

export type Claim =
  | { kind: Confidence; text: string }
  | { kind: "divergence"; text: string; reported: string; attribution: string; evidence: SourceEvidence };

export type ContextAction =
  | { id: string; label: string; kind: "inspect"; target: string; uncertainty?: string }
  | { id: string; label: string; kind: "explore"; scope: string; target?: string }
  | { id: string; label: string; kind: "unavailable"; reason: string };

export interface ObservationPresentation {
  title: string;
  role?: string;
  description: string;
  note?: string;
  confidence?: Confidence;
  change?: ArchitectureChange;
  claims?: readonly Claim[];
  evidence?: SourceEvidence;
  related?: readonly ContextAction[];
}

export type RelationshipPresentation = {
  id: string;
  label: string;
  kind: ConnectionKind;
};

export interface ReferenceLink { label: string; href: string }

export interface ChangePresentation {
  summary: string;
  responsibility?: { title: string; before: string; after: string };
  claims?: readonly Claim[];
  related?: readonly ContextAction[];
  evidence?: SourceEvidence;
  references?: readonly ReferenceLink[];
}

export type RecordedIntent =
  | { kind: "documented"; text: string; reference: string; href?: string; outcome?: { label: string; text: string } }
  | { kind: "missing" };

export type DeploymentEvidence =
  | { kind: "confirmed"; environment: string; revision: string }
  | { kind: "unconfirmed" };
