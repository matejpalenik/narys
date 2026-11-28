import type { ArchitectureChange } from "./architecture-visuals";
import type { CodeSymbol } from "./CodeSymbolCard";
import type { CodeComparison } from "./CodeChangeWorkspace";
import type { ContextAction, SourceEvidence, SourceExcerpt } from "./presentation";
import type { ConnectionKind } from "./architecture-visuals";

export const flaskRevisions = {
  before: "c356c6da5f25ba70bd53448ff1d1bf6ad6967fd5",
  after: "67310ab49613be97a121053dfbbced14657b96eb",
} as const;

export type FlaskSide = keyof typeof flaskRevisions;
export const flaskPullRequest = "https://github.com/pallets/flask/pull/4692";
export const flaskComparison = `https://github.com/pallets/flask/compare/${flaskRevisions.before}...${flaskRevisions.after}`;

export interface FlaskSource {
  label: string;
  path: string;
  range: string;
  excerpt: string;
}

const jsonModule = "src/flask/json/__init__.py";
const providerModule = "src/flask/json/provider.py";
const appModule = "src/flask/app.py";

export function flaskSourceUrl(side: FlaskSide, { path, range }: Pick<FlaskSource, "path" | "range">) {
  return `https://github.com/pallets/flask/blob/${flaskRevisions[side]}/${path}#${range}`;
}

const constructs: FlaskSource = {
  label: "Direct response construction", path: jsonModule, range: "L300-L303",
  excerpt: String.raw`return current_app.response_class(
    f"{dumps(data, indent=indent, separators=separators)}\n",
    mimetype=current_app.config["JSONIFY_MIMETYPE"],
)`,
};
const delegates: FlaskSource = {
  label: "Delegation from jsonify()", path: jsonModule, range: "L341",
  excerpt: "return current_app.json.response(*args, **kwargs)",
};
const providerResponse: FlaskSource = {
  label: "Base provider response method", path: providerModule, range: "L105-L106",
  excerpt: 'obj = self._prepare_response_obj(args, kwargs)\nreturn self._app.response_class(self.dumps(obj), mimetype="application/json")',
};
const defaultResponse: FlaskSource = {
  label: "Default provider response construction", path: providerModule, range: "L308-L310",
  excerpt: String.raw`return self._app.response_class(
    f"{self.dumps(obj, **dump_args)}\n", mimetype=mimetype
)`,
};
const defaultSerialization: FlaskSource = {
  label: "Default serialization", path: providerModule, range: "L230",
  excerpt: "return json.dumps(obj, **kwargs)",
};
const providerInheritance: FlaskSource = {
  label: "Default provider class declaration", path: providerModule, range: "L125",
  excerpt: "class DefaultJSONProvider(JSONProvider):",
};
const providerSelection: FlaskSource = {
  label: "Default provider class", path: appModule, range: "L338",
  excerpt: "json_provider_class: t.Type[JSONProvider] = DefaultJSONProvider",
};
const providerBinding: FlaskSource = {
  label: "Binding the provider to the application", path: appModule, range: "L474",
  excerpt: "self.json: JSONProvider = self.json_provider_class(self)",
};

interface FlaskObservation {
  title: string;
  description: string;
  source: readonly [FlaskSource, ...FlaskSource[]];
  change?: ArchitectureChange;
}

interface FlaskSymbol extends FlaskObservation { symbol: CodeSymbol }

export type FlaskSelection = "jsonify" | "dispatch" | "owner" | "flask" | "selection" | "default" | "inheritance";
type FlaskReference = {
  summary: string;
  jsonify: FlaskSymbol;
  dispatch: FlaskObservation;
  owner: FlaskSymbol;
  flask?: FlaskSymbol;
  selection?: FlaskObservation;
  default?: FlaskSymbol;
  inheritance?: FlaskObservation;
};

const jsonifySymbol: CodeSymbol = { name: "jsonify", kind: "Function", members: ["jsonify(*args, **kwargs) → Response"] };

const flaskReference: Record<FlaskSide, FlaskReference> = {
  before: {
    summary: "jsonify() serializes the data and constructs the response directly.",
    jsonify: {
      title: "jsonify()", symbol: jsonifySymbol,
      description: "Selects formatting, serializes the arguments with dumps(), and calls the application's response class.", source: [constructs],
    },
    dispatch: {
      title: "Constructs response", description: "jsonify() supplies the serialized body and configured MIME type directly to current_app.response_class.", source: [constructs],
    },
    owner: {
      title: "current_app.response_class", symbol: { name: "current_app.response_class", kind: "Call", members: ["response_class(body, mimetype=…)"] },
      description: "Receives the JSON body and MIME type from jsonify().", source: [constructs],
    },
  },
  after: {
    summary: "jsonify() delegates response construction to the application's configurable JSON provider.",
    jsonify: {
      title: "jsonify()", symbol: jsonifySymbol, change: "modified",
      description: "Passes its original arguments to current_app.json.response().", source: [delegates],
    },
    dispatch: {
      title: "Delegates response", change: "added",
      description: "jsonify() calls response() on the provider instance bound to this application.", source: [delegates, providerBinding],
    },
    owner: {
      title: "JSONProvider", change: "added",
      symbol: { name: "JSONProvider", kind: "Class", members: ["response(*args, **kwargs) → Response", "dumps(obj, **kwargs) → str"] },
      description: "Defines the response operation available through app.json. Each application can bind its own provider.", source: [providerResponse, providerBinding],
    },
    flask: {
      title: "Flask", change: "modified", symbol: { name: "Flask", kind: "Class", members: ["json_provider_class", "json: JSONProvider"] },
      description: "Creates a provider instance from json_provider_class and assigns it to app.json.", source: [providerBinding, providerSelection],
    },
    selection: {
      title: "Selects by default", change: "added",
      description: "Flask selects DefaultJSONProvider unless its provider class or app.json instance is customized.", source: [providerSelection, providerBinding],
    },
    default: {
      title: "DefaultJSONProvider", change: "added",
      symbol: { name: "DefaultJSONProvider", kind: "Class", members: ["response(*args, **kwargs) → Response", "dumps(obj, **kwargs) → str"] },
      description: "The default provider still serializes through Python's built-in json library and constructs the response in its response() method.", source: [defaultResponse, defaultSerialization],
    },
    inheritance: {
      title: "Extends", change: "added", description: "DefaultJSONProvider subclasses JSONProvider.", source: [providerInheritance],
    },
  },
};

const symbolSlots = {
  jsonify: "top-start", owner: "top-end", flask: "bottom-start", default: "bottom-end",
} as const;
const relationSlots = {
  dispatch: { position: "top-link", kind: "sync" },
  selection: { position: "bottom-link", kind: "configuration" },
  inheritance: { position: "vertical-link", kind: "inheritance", orientation: "up" },
} as const satisfies Record<string, { position: string; kind: ConnectionKind; orientation?: "up" }>;

function evidence(side: FlaskSide, [first, ...rest]: readonly [FlaskSource, ...FlaskSource[]]): SourceEvidence {
  const pin = (source: FlaskSource): SourceExcerpt => ({ ...source, code: source.excerpt, href: flaskSourceUrl(side, source) });
  return { kind: "available", expanded: true, excerpts: [pin(first), ...rest.map(pin)] };
}

const providerActions: ContextAction[] = [
  { id: "configure", label: "Configuration point", kind: "inspect", target: "flask" },
  { id: "default-provider", label: "Default implementation", kind: "inspect", target: "default" },
];

export function flaskReview(divergence = false): CodeComparison {
  function revision(side: FlaskSide): CodeComparison["revisions"][FlaskSide] {
    const reference = flaskReference[side];
    const items: CodeComparison["revisions"][FlaskSide]["items"][number][] = [];
    for (const id of Object.keys(symbolSlots) as (keyof typeof symbolSlots)[]) {
      const item = reference[id];
      if (item) items.push({ id, position: symbolSlots[id], kind: "symbol", symbol: item.symbol,
        observation: { ...item, confidence: "supported", evidence: evidence(side, item.source) } });
    }
    for (const id of Object.keys(relationSlots) as (keyof typeof relationSlots)[]) {
      const item = reference[id];
      if (item) {
        const slot = relationSlots[id];
        items.push({ id, ...slot, kind: "relationship", relation: { id, label: item.title, kind: slot.kind },
          observation: { ...item, confidence: "supported", evidence: evidence(side, item.source) } });
      }
    }
    const after = side === "after";
    return {
      commit: flaskRevisions[side],
      mapSummary: reference.summary,
      items,
      change: {
        responsibility: { title: "Who builds the JSON response", before: "jsonify()", after: "The app’s JSON provider" },
        summary: after
          ? "Applications can replace the provider. The default still uses Python’s built-in json library."
          : "jsonify() serializes its arguments and supplies the body and MIME type to the application’s response class.",
        related: after ? providerActions : undefined,
        claims: divergence && after ? [{
          kind: "divergence",
          attribution: "Synthetic claim for this fixture",
          reported: "PR #4692 made orjson the default serializer.",
          text: "The merged source selects DefaultJSONProvider, which calls Python’s built-in json.dumps.",
          evidence: evidence(side, [providerSelection, defaultSerialization]),
        }] : undefined,
        evidence: evidence(side, reference.dispatch.source),
        references: [
          { href: flaskComparison, label: "Compare the pinned commits" },
          ...(after ? [{ href: flaskSourceUrl(side, { path: "tests/test_json.py", range: "L223-L257" }), label: "Custom-provider test source" }] : []),
        ],
      },
    };
  }
  return {
    repository: "pallets/flask", branch: "main", subject: "Implementation · Flask JSON responses", title: "JSON response construction",
    merge: {
      id: 4692, title: "Add JSON provider interface",
      intent: {
        kind: "documented", reference: "Read the PR rationale", href: flaskPullRequest,
        text: "Let applications choose their JSON implementation. The author cited potential speed gains for JSON-heavy APIs as a motivation.",
        outcome: { label: "Performance outcome", text: "Unverified" },
      },
      deployment: { kind: "unconfirmed" },
    },
    revisions: { before: revision("before"), after: revision("after") },
  };
}
