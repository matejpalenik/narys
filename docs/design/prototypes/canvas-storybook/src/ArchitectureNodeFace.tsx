import { ArchitectureGlyph, ChangeMark, ConfidenceMark, type ArchitectureChange, type Primitive } from "./architecture-visuals";

export const semanticIcons = {
  checkout: { label: "Checkout", src: new URL("./assets/semantic/shopping-cart.svg", import.meta.url).href },
  payment: { label: "Payments", src: new URL("./assets/semantic/purchase.svg", import.meta.url).href },
  identity: { label: "Identity", src: new URL("./assets/semantic/user.svg", import.meta.url).href },
  notifications: { label: "Notifications", src: new URL("./assets/semantic/notification.svg", import.meta.url).href },
  search: { label: "Search", src: new URL("./assets/semantic/search.svg", import.meta.url).href },
  api: { label: "API", src: new URL("./assets/semantic/api.svg", import.meta.url).href },
  worker: { label: "Worker", src: new URL("./assets/semantic/settings.svg", import.meta.url).href },
  application: { label: "Application", src: new URL("./assets/semantic/application.svg", import.meta.url).href },
} as const;

type SemanticIconName = keyof typeof semanticIcons;

export const technologyIcons = {
  python: { label: "Python", src: new URL("./assets/technology/python.svg", import.meta.url).href },
  typescript: { label: "TypeScript", src: new URL("./assets/technology/typescript.svg", import.meta.url).href },
  javascript: { label: "JavaScript", src: new URL("./assets/technology/javascript.svg", import.meta.url).href },
  nextjs: { label: "Next.js", src: new URL("./assets/technology/nextjs.svg", import.meta.url).href },
  postgresql: { label: "PostgreSQL", src: new URL("./assets/technology/postgresql.svg", import.meta.url).href },
  redis: { label: "Redis", src: new URL("./assets/technology/redis.svg", import.meta.url).href },
  docker: { label: "Docker", src: new URL("./assets/technology/docker.svg", import.meta.url).href },
  kubernetes: { label: "Kubernetes", src: new URL("./assets/technology/kubernetes.svg", import.meta.url).href },
  aws: { label: "AWS", src: new URL("./assets/technology/aws.svg", import.meta.url).href },
  azure: { label: "Microsoft Azure", src: new URL("./assets/technology/azure.svg", import.meta.url).href },
  googlecloud: { label: "Google Cloud", src: new URL("./assets/technology/googlecloud.svg", import.meta.url).href },
} as const;

export type Technology = keyof typeof technologyIcons;
export type NodeIdentity = { family: "semantic"; icon: SemanticIconName } | { family: "technical"; kind: Primitive };
export type ElementType = "System" | "Container" | "Component";

export interface NodePresentation {
  identity: NodeIdentity;
  name: string;
  detailedIdentity?: NodeIdentity;
  role: string;
  element: ElementType;
  responsibility?: string;
  technology?: { id: Technology; source: string };
}

export function SemanticIcon({ icon }: { icon: SemanticIconName }) {
  return <img className="semantic-icon" src={semanticIcons[icon].src} alt="" width="32" height="32" draggable={false} />;
}

export function TechnologyMark({ id }: { id: Technology }) {
  const { label, src } = technologyIcons[id];
  return <span className="technology-mark"><img src={src} alt="" width="16" height="16" draggable={false} />{label}</span>;
}

export function NodeIdentityMark({ identity, detail }: { identity: NodeIdentity; detail?: boolean }) {
  return identity.family === "semantic" ? <SemanticIcon icon={identity.icon} />
    : <ArchitectureGlyph kind={identity.kind} detail={detail ? "detailed" : "compact"} />;
}

export function ArchitectureNodeFace({ node, variant = "compact", status, change, statusId }: {
  node: NodePresentation;
  variant?: "compact" | "detailed";
  status?: "supported" | "unconfirmed";
  change?: ArchitectureChange;
  statusId?: string;
}) {
  const detailed = variant === "detailed";
  const identity = (detailed && node.detailedIdentity) || node.identity;
  return (
    <span className="architecture-node-face" data-variant={variant} data-family={identity.family}>
      <span className="architecture-node-heading">
        <span className="architecture-node-identity"><NodeIdentityMark identity={identity} detail={detailed} /></span>
        <span className="architecture-node-heading-text"><strong>{node.name}</strong><small>{node.role}</small></span>
      </span>
      {detailed && (
        <span className="architecture-node-detail">
          <span className="architecture-node-element">{node.element}</span>
          {node.responsibility && <span>{node.responsibility}</span>}
        </span>
      )}
      {node.technology && (
        <span className="architecture-node-technology" title={node.technology.source}>
          <TechnologyMark id={node.technology.id} />
          {detailed && <small>{node.technology.source}</small>}
        </span>
      )}
      {(change || status) && (
        <span className="architecture-node-states" id={statusId}>
          {change && <ChangeMark change={change} />}
          {status && <ConfidenceMark confidence={status} />}
        </span>
      )}
    </span>
  );
}
