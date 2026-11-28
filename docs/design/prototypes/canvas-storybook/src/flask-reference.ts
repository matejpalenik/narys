import type { ArchitectureChange } from "./architecture-visuals";
import type { CodeSymbol } from "./CodeSymbolCard";

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
  source: readonly FlaskSource[];
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

export const flaskReference: Record<FlaskSide, FlaskReference> = {
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
