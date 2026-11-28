import type { Meta, StoryObj } from "@storybook/react-vite";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { ArchitectureNodeFace } from "./ArchitectureNodeFace";
import { CodeSymbolCard } from "./CodeSymbolCard";
import { Inspector, ChangeDetails, ObservationDetails } from "./Inspector";
import { RelationshipControl } from "./RelationshipControl";
import type { ChangePresentation, ObservationPresentation } from "./presentation";

const policy: ObservationPresentation = {
  title: "Retention policy validation",
  role: "Component · Policy",
  description: "Checks the retention limit before an archive can be created.",
};

const subscription: ObservationPresentation = {
  title: "Archive completion subscription",
  role: "Event subscription",
  description: "The available source declares a subscription. The final handler binding is unconfirmed.",
  confidence: "unconfirmed",
  evidence: { kind: "available", excerpts: [{ path: "events/listeners.go", code: 'registry.Declare("archive.completed")' }] },
};

const actions = [
  { id: "policy", label: "Validation policy", kind: "inspect", target: "policy" },
  { id: "subscription", label: "Event subscription", kind: "inspect", target: "subscription", uncertainty: "Handler binding unconfirmed." },
] as const;

const examples: Record<string, ObservationPresentation> = { policy, subscription };

function InspectorExample({ change, documented = true, long = false }: {
  change: ChangePresentation; documented?: boolean; long?: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const observation = selected ? examples[selected] : undefined;
  const title = useRef<HTMLHeadingElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | string | null>(null);

  useLayoutEffect(() => {
    if (selected) title.current?.focus();
    else if (typeof opener.current === "string") {
      stage.current?.querySelector<HTMLButtonElement>(`[data-inspector-action="${CSS.escape(opener.current)}"]`)?.focus();
    } else opener.current?.focus();
  }, [selected]);

  function inspect(id: string, action?: string) {
    if (!selected) opener.current = action ?? (document.activeElement instanceof HTMLButtonElement ? document.activeElement : null);
    setSelected(id);
  }
  return <main className="narys" data-direction="light" data-look="carbon" data-schematic="true">
    <div className="stage" ref={stage}>
      <div className="map-title"><p className="scope-qualifier">Component contract · synthetic fixture</p><h1>Archive review</h1></div>
      {long && <div className="inspector-specimen-elements">
        <ArchitectureNodeFace node={{ name: "ArchiveRetentionPolicyValidatorWithRepositoryOverrides", role: "Policy validator", element: "Component", identity: { family: "semantic", icon: "worker" } }}
          variant="detailed" />
        <ArchitectureNodeFace node={{ name: "Archive", role: "Document store", element: "Container", identity: { family: "technical", kind: "storage" } }} />
        <RelationshipControl relation={{ id: "dep", label: "Checks archive retention before saving", kind: "data" }}
          selected={selected === "policy"} controlId="dep" onInspect={() => inspect("policy")} />
        <RelationshipControl relation={{ id: "event", label: "Publishes archive completion", kind: "event" }}
          selected={selected === "subscription"} controlId="event" onInspect={() => inspect("subscription")} />
        <CodeSymbolCard symbol={{ name: "RetentionPolicy", kind: "Interface", members: ["Validate(archive Archive) error"] }}
          selected={selected === "policy"} controlId="policy" onInspect={() => inspect("policy")} />
      </div>}
      <Inspector titleRef={title} id="sample-inspector" title={observation?.title ?? (long ? "Archive retention and exceptional record handling across regional compliance boundaries" : "Apply archive retention policy")}
        leading={observation ? <Button type="button" variant="ghost" size="sm" onClick={() => setSelected(null)}>Back to change</Button> : undefined}>
        {observation
          ? <ObservationDetails observation={observation} revision="f1c7000" onAction={() => {}} />
          : <ChangeDetails value={change} side="after" revision="f1c7000"
            intent={documented ? { kind: "documented", reference: "Decision note", text: "Apply a consistent archive lifecycle." } : { kind: "missing" }}
            deployment={{ kind: "unconfirmed" }} onAction={action => { if (action.kind === "inspect") inspect(action.target, action.id); }} />}
      </Inspector>
    </div>
  </main>;
}

const meta = { title: "Narys/Canvas specimen/Inspector", component: InspectorExample } satisfies Meta<typeof InspectorExample>;
export default meta;

type Story = StoryObj<typeof meta>;
const overview = { summary: "Archives pass through a retention policy before storage." };

export const MultipleRelatedObservations: Story = { args: { change: { ...overview, related: actions } } };
export const OneRelatedObservation: Story = { args: { change: { ...overview, related: [actions[0]] } } };
export const NoRelatedObservations: Story = { args: { change: overview } };
export const UnconfirmedObservation: Story = { args: { change: { ...overview, related: [actions[1]], claims: [{ kind: "unconfirmed", text: subscription.description }] } } };
export const EvidenceUnavailable: Story = { args: { change: { ...overview,
  related: [{ id: "retry-read", kind: "unavailable", label: "Inspect handler binding", reason: "The source read is pending." }, actions[0]],
  evidence: { kind: "unavailable", reason: "The pinned file is temporarily unavailable." },
} } };
export const MissingRationale: Story = { args: { change: overview, documented: false } };
export const LongContent: Story = { args: { long: true, change: {
  summary: "Applies the effective archive retention policy, including regional overrides, before determining whether to retain or discard the record after the underlying export finishes.",
  related: actions,
  evidence: { kind: "available", expanded: true, excerpts: [{ path: "internal/records/archive/retention/policies/organization_with_regional_exception_overrides.go", code: "policy.ValidateRetentionWithRegionalOverrides(archive, region, organization)" }] },
} } };
