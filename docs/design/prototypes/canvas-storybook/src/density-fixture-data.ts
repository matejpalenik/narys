import type { NodeIdentity } from "./ArchitectureNodeFace";
import type { ConnectionKind } from "./architecture-visuals";
import type { DensityModel } from "./DensityFixture";

const application: NodeIdentity = { family: "semantic", icon: "application" };
const api: NodeIdentity = { family: "semantic", icon: "api" };
const worker: NodeIdentity = { family: "semantic", icon: "worker" };
const queue: NodeIdentity = { family: "technical", kind: "queue" };
const database: NodeIdentity = { family: "technical", kind: "database" };
const storage: NodeIdentity = { family: "technical", kind: "storage" };

const tiers: [string, string, NodeIdentity][][] = [
  [
    ["Web portal", "Web application", { family: "semantic", icon: "checkout" }],
    ["Partner client", "Application", application],
    ["Account console", "Web application", { family: "semantic", icon: "identity" }],
    ["Search portal", "Web application", { family: "semantic", icon: "search" }],
    ["Notification console", "Web application", { family: "semantic", icon: "notifications" }],
    ["Operations client", "Application", application],
  ],
  [
    ["Request gateway", "Gateway", { family: "technical", kind: "gateway" }],
    ["Partner API", "Service", api],
    ["Account API", "Service", api],
    ["Search API", "Service", api],
    ["Notification API", "Service", api],
    ["Operations API", "Service", api],
  ],
  [
    ["Work queue", "Message queue", queue],
    ["Partner events", "Event bus", { family: "technical", kind: "bus" }],
    ["Account worker", "Background worker", worker],
    ["Index worker", "Background worker", worker],
    ["Delivery queue", "Message queue", queue],
    ["Audit worker", "Background worker", worker],
  ],
  [
    ["Output archive", "Object storage", storage],
    ["Partner archive", "Object storage", storage],
    ["Account store", "Database", database],
    ["Search index", "Data store", database],
  ],
];

const tileWidth = 206;
const columnX = (col: number) => col * 237 + Math.floor(col / 2) * 58;
const groups = ["Gateway & partners", "Accounts & search", "Delivery & operations"];
const headings = groups.map((label, index) => ({ label, x: columnX(index * 2), width: columnX(1) + tileWidth }));

const inventory: DensityModel["inventory"] = Object.fromEntries(tiers.flatMap((tier, row) => tier.map(([name, role, identity], col) => [
  `${row}-${col}`, { name, role, identity, element: "Container", position: { x: columnX(col), y: row * 230 } },
])));

type LinkSpec = [source: string, target: string, kind: ConnectionKind, name: string, lane?: number, viaAfterColumn?: number];

const linkSpecs: LinkSpec[] = [
  ["0-0", "1-0", "sync", "Opens session", 14],
  ["0-1", "1-0", "sync", "Sends partner requests", 40],
  ["0-2", "1-0", "sync", "Authenticates account", 68],
  ["0-3", "1-3", "sync", "Runs query"],
  ["0-4", "1-4", "sync", "Requests delivery"],
  ["0-5", "1-5", "sync", "Opens operation"],
  ["1-0", "1-1", "sync", "Routes partner request", 24],
  ["1-0", "1-2", "sync", "Routes account request", 47],
  ["1-0", "1-3", "sync", "Routes search request", 69],
  ["1-0", "2-0", "async", "Queues platform work", 60],
  ["1-1", "2-1", "event", "Publishes partner event"],
  ["1-2", "2-0", "async", "Queues account work", 81],
  ["1-2", "3-2", "data", "Reads accounts", 13, 2],
  ["1-3", "3-3", "data", "Reads search index", 13, 3],
  ["1-4", "2-4", "async", "Queues delivery"],
  ["1-5", "2-5", "unknown", "Operation link"],
  ["1-5", "3-2", "data", "Looks up account", 81, 4],
  ["2-0", "2-2", "async", "Consumes account work", 24],
  ["2-0", "2-3", "async", "Consumes index work", 43],
  ["2-1", "2-2", "event", "Updates account projection", 57],
  ["2-1", "2-3", "event", "Reindexes partner items", 73],
  ["2-1", "2-5", "event", "Records partner event", 93],
  ["2-2", "3-2", "data", "Writes accounts"],
  ["2-2", "2-4", "async", "Queues account notification", 34],
  ["2-3", "3-3", "data", "Writes index"],
  ["2-4", "2-5", "event", "Records delivery receipt", 24],
  ["2-5", "3-0", "data", "Archives audit output", 106],
  ["2-5", "3-1", "data", "Archives partner audit", 118],
];

const links: DensityModel["links"] = linkSpecs.map(([source, target, kind, name, lane = 54, viaAfterColumn]) => ({
  id: `${source}/${target}`, source, target, kind, label: name, lane,
  sameRow: inventory[source].position.y === inventory[target].position.y,
  viaX: viaAfterColumn === undefined ? undefined : (columnX(viaAfterColumn) + tileWidth + columnX(viaAfterColumn + 1)) / 2,
}));

export const densityModel = { inventory, links, headings, tileWidth, label: "Synthetic architecture density fixture" } satisfies DensityModel;
