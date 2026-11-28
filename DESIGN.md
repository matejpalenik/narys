# Narys visual design

Status: Draft for V1 design baseline review. The Carbon light hybrid canvas remains the selected visual direction.

Scope: V1 canvas, Recent merges, and PR evidence overlay.

Foundation: React Flow, shadcn/ui, and Storybook. [Canvas foundation](docs/adr/adr-0015-v1-canvas-foundation.md)

## 1. Visual intent

Keep the map usable as the main workspace while making it easy to answer what changed, why, and what the evidence supports. Retain the full-screen canvas, compact project navigation, and overlays the product owner chose. Take the sense of space from the supplied Railway references and the separation of operational states from Argo CD. Factory is the product owner's reference for the overall visual quality. [Canvas experience](EXPERIENCE.md#4-information-architecture) · [Railway project canvas](https://docs.railway.com/projects#project-canvas) · [Argo CD core concepts](https://argo-cd.readthedocs.io/en/stable/core_concepts/)

## 2. Dark treatments to compare

Use the synthetic Payments PR #128 in both variants. The reviewer opens Recent merges, compares the revisions, finds the worker's retry path, and checks why Checkout remains unconfirmed. Compare at the same viewport using the same graph, evidence, and controls. [Synthetic workspace](docs/design/prototypes/merge-workspace/index.html) · [V1 conformance cases](SPEC.md#4-conformance-cases)

| Treatment | Canvas | PR evidence |
|---|---|---|
| Graphite | Neutral charcoal, a dot grid, and blue-violet highlights on changed paths. [Linear design refresh](https://linear.app/now/behind-the-latest-design-refresh) | An overlay with understated borders and room to compare revisions and read source. |
| Blueprint | Navy, a two-scale grid, crisp card edges, and ice-blue paths with visible relationship labels. [Grafana node graph](https://grafana.com/docs/grafana/latest/visualizations/panels-visualizations/visualizations/node-graph/) | The same evidence order and controls, with a cooler palette and sharper outlines. |

Show the before and after states, merge analysis in progress, an unresolved merge, and a public read-only view. Keep source support, uncertainty, and deployment independently readable. Both dark treatments use amber for uncertainty. Check keyboard access and focus restoration, readable contrast, and reduced motion where applicable. Check the selected treatment on a narrower viewport. [Merge status](EXPERIENCE.md#13-merge-progress-on-the-canvas) · [Analysis gaps](EXPERIENCE.md#15-gaps-in-merge-analysis) · [Published workspace](EXPERIENCE.md#12-published-workspace-entry)

## 3. Local Storybook preview

### Industrial Graphite exploration

Start with the restrained hierarchy of Graphite. The industrial variant uses warmer charcoal, fine borders, compact labels, and copper for the selected change. An explicit warning label and icon identify unconfirmed behavior. Node responsibilities and evidence remain in the inspector. The Factory reference informs surface restraint and technical typography. The TOC Storage Tank screenshot supplied for review informs linework, hatching, and a single point of emphasis. The supplied infrastructure graph informs hierarchy, and Datascale informs grouping and relationship legibility. [Factory](https://factory.com/) · [Datascale](https://getdatascale.com/)

In the disposable #128 story, select Payments Worker and then **Explore component**. The focused canvas draws Payment jobs → Retry handler → Payments API and shows the corresponding source at `8e24c0a`. **Back to Payments map** restores the PR comparison. The C4 model informs the move from an overview to a scoped view. This prototype explores one useful level of detail. The interaction and a formal C4 hierarchy remain open product decisions. [C4 diagram levels](https://c4model.com/diagrams)

### Carbon light exploration

The product owner chose to try the light layers and sharp edges in the ArchLens references. The variant maps Carbon's Gray 10, White, and Blue colors to the preview tokens. It uses square cards, controls, and panels with thin gray borders. Blue marks changed paths, the active revision, and focus. Yellow accompanies the uncertainty icon and label. The Payments Worker view keeps the graphite linework and hatching on a white surface. The preview uses its existing shadcn/ui components. [ArchLens](https://archlens.app/) · [Carbon color tokens](https://www.carbondesignsystem.com/building-blocks/foundations/color/tokens) · [Preview theme](docs/design/prototypes/canvas-storybook/src/workspace.css)

### Hybrid canvas candidate

The Payments scenes share a Carbon light shell and IBM Plex Sans. A compact node uses an opaque white surface, square corners, a fine neutral border, a role label, and ports at the boundary. Checkout uses the Carbon cart, Payments API the Carbon API glyph, Payments Worker a Carbon processing gear, and Payment jobs the supplied three-slot message queue drawing. The technology registry provides labeled SVG marks as supporting metadata when the implementation identity has a source. The Payments excerpts do not establish implementation technologies. [Node composition](docs/design/prototypes/canvas-storybook/src/ArchitectureNodeFace.tsx) · [Queue SVG](docs/design/prototypes/canvas-storybook/src/architecture-visuals.tsx) · [Asset sources and licenses](docs/design/prototypes/canvas-storybook/src/assets/README.md)

The compact node, detailed inspector, and worker deep dive represent degrees of visual detail. C4 scope identifies the elements in each view. The Payments API, queue, and worker are containers in the overview. The retry handler is a component inside the worker. The deep dive uses the original technical geometry for internal flow. The same four node positions carry through both revisions of PR #128. [Schematic styles](docs/design/prototypes/canvas-storybook/src/schematic.css) · [C4 diagram levels](https://c4model.com/diagrams) · [C4 queue notation](https://c4model.com/abstractions/queues-and-topics)

| Visual signal | Treatment |
|---|---|
| Relationship semantics | Solid for calls, short dashes for messages, dash-dot for events, thick long dashes for data dependencies, and dots for unconfirmed semantics. Registration alternates short and long dashes. Configuration uses a diamond. Inheritance uses a hollow triangle. Interactive relationships expose their type in the accessibility tree. |
| Architecture change | Added uses a plus and solid outline. Modified uses a triangle and a leading rule. Removed uses a dashed form and struck label. Unchanged uses the normal outline. PR #128 only shows the supported additions and modifications. |
| Selection and evidence | Selection uses a single blue border. Keyboard focus uses a separate dashed outline. Source support uses a check and label. Uncertainty uses a question mark and label. Recorded rationale is marked as documented intent. |
| Motion | Entering the worker detail starts a 6.2-second retry loop with pause and resume. During queue release, blue fills each slot in turn up to its outline. The slots return to white before the message pulse travels to the handler. The Worker and API primitives have their own four-second illustrative cycles and follow the same pause control. The API illustration depicts an invocation with a brief Carbon Blue seam during contact. The specimen change sequence plays once on request. The system reduced-motion preference selects the static presentation. |

The retry playback illustrates the queued message, handler, and API call in the existing source at `8e24c0a`. Its label identifies it as an illustration with no runtime data. The specimen shows the three visual families and a separately labeled 22-node synthetic graph. [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) · [V1 evidence rules](SPEC.md#evidence-for-a-change-claim)

### Payments workspace experience candidate

The container map is the return view. **System context** gives orientation above it. Selecting a node or relationship opens its inspector. **Explore components** changes scope, and canvas zoom changes visual scale. In **Payments · Return after a merge**, open **Recent merges**, select PR #128, compare **Before** and **After**, and inspect the Payments Worker. **Inspect retry implementation** in either the worker or the merge inspector opens the relevant source excerpt and code cards. The guided route reaches the same excerpt through **Explore components**, **Retry handler**, and **Explore implementation**. **View PR #128** opens the merge and its recorded rationale within the current scope. The return action restores the starting scope, inspection, viewport and keyboard focus while retaining the PR comparison and revision. [Approved workspace interaction](EXPERIENCE.md#4-information-architecture) · [Comparison and evidence requirements](SPEC.md#3-observable-behavior)

The context diagram identifies its shopper and external-system relationships as synthetic orientation within the selected area. At `8e24c0a`, the worker and code views use the job registration and API call in the Payments fixture. The compact implementation cards show the registration call, anonymous callback, and retry call. If a reviewer switches to a revision without the worker excerpt, the view describes that gap and links back to Containers. [Payments fixture](docs/design/prototypes/canvas-storybook/src/fixture.ts)

The product owner approved **View retry flow** as a contextual action within the worker scope. The queue, worker, API, and connection pulses share one cycle. The entry point stays next to the worker and preserves the scope and comparison.

The checking story supplies a controlled fixture update. Open PR #124, choose **Before**, and then use **Finish simulation**. The current comparison retains its selected revision while PR #128 becomes available in Recent merges. The analysis gap story keeps map revision `06b7dd9` visible while PR #128 is unresolved. PR #129 appears in Recent merges with independently supported before and after source at `8e24c0a` and `af129de`. The companion dependent variant withholds the later change. **Complete simulated retry** resolves the gap, makes the recovered map available and creates one entry per supported merge. These fixtures exercise presentation parts of CONF-005, CONF-006, CONF-007, CONF-013, and CONF-014. Automatic recovery and evidence evaluation require production verification. [Conformance cases](SPEC.md#4-conformance-cases)

### Flask source-level change candidate

The Flask PR #4692 inspector names who builds the JSON response at each revision. Before, `jsonify()` built it directly. After, `jsonify()` delegates responsibility to the app’s configurable `JSONProvider`. The **Configuration point** and **Default implementation** actions lead to the pinned lines for `Flask.json_provider_class` and `DefaultJSONProvider.response()`. The inspector links the recorded performance motivation under **Documented intent** and marks the performance outcome **Unverified**. The test-source link is separate from deployment. The divergence variant labels the orjson claim as synthetic and cites the merged provider selection and built-in `json.dumps` call. [Flask reference case](docs/research/2026-11-27-flask-merge-reference-case.md) · [Pinned comparison](https://github.com/pallets/flask/compare/c356c6da5f25ba70bd53448ff1d1bf6ad6967fd5...67310ab49613be97a121053dfbbced14657b96eb)

Classic code cards are the standard for implementation-level elements in this design. The heading gives the symbol kind and name. A separate compartment gives the signatures or expressions relevant to the architectural question. Flask shows the source-backed inheritance with a hollow arrowhead. Payments uses the same cards for the job registration, callback and retry call. [Code symbol card](docs/design/prototypes/canvas-storybook/src/CodeSymbolCard.tsx)

### Density fixture

The synthetic fixture adds fan-in, fan-out and cross-group dependencies to the existing 22 nodes. Routes use separate orthogonal lanes where possible. At map fit, select a node to read its incoming and outgoing relationships in the inspector. Select a relationship to highlight its path and inspect its source and target. Zoom controls center the inspection and expose labels at close zoom. **Fit View** recovers the whole map. [Density fixture](docs/design/prototypes/canvas-storybook/src/DensityFixture.tsx)

### Presentation contracts for baseline review

| Audit finding | Candidate contract |
|---|---|
| Node faces, code cards, revision controls and illustrative playback were already reusable. | Keep the existing primitives. Select node identities and code signatures through data. Use typed relationship kinds for stroke, direction and accessible descriptions. |
| Payments selected content with PR numbers and worker IDs. Flask built special controls from symbol names. | Use the same inspector shell, change details and observation details. Revisions supply summaries, responsibilities, applicable actions, evidence and unresolved claims. Change records supply documented or missing intent and separate deployment evidence. |
| The density fixture embedded the graph and its inspector together. | Supply the synthetic inventory and routes separately. Use the shared inspector shell with a docked layout. Keep the relationship traversal and positioning with the fixture. |

The workspace receives a typed model and owns the selected scope, revision, comparison, perspective, selection and focus. Related actions identify a supplied observation or a scope. Unconfirmed observations remain inspectable with their reason. A pending source read can disable the specific action while leaving others available. Omit empty optional sections. The selected revision supplies the evidence excerpts. Compact, detailed and code representations use shared tokens. The Payments illustrative scene and Flask code placement stay with their respective compositions. No schema for arbitrary UI rendering is needed. [Presentation types](docs/design/prototypes/canvas-storybook/src/presentation.ts) · [Workspace model](docs/design/prototypes/canvas-storybook/src/workspace-model.ts) · [Shared inspector](docs/design/prototypes/canvas-storybook/src/Inspector.tsx)

### Stories

The disposable preview uses Storybook with the React/Vite adapter and React Flow for the graph. It uses the shadcn/ui New York Radix Button for workspace controls and the Badge for evidence status. Preview theme tokens drive the shadcn/ui colors. The visual comparison stories start with PR #128 open. [Preview package](docs/design/prototypes/canvas-storybook/package.json) · [shadcn/ui Button](https://ui.shadcn.com/docs/components/radix/button) · [shadcn/ui Badge](https://ui.shadcn.com/docs/components/radix/badge)

| Story | Local preview |
|---|---|
| Payments · Return after a merge | [Start at the Payments workspace](http://127.0.0.1:6006/?path=/story/narys-architecture-canvas--payments-overview) |
| Payments checking merges | [Open the progress and update story](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-checking-merges&viewMode=story) |
| Payments analysis gap | [Open the unresolved-gap story](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-analysis-gap&viewMode=story) |
| Payments architectural exploration | [Open the system context](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-exploration&viewMode=story) |
| Payments Worker detail | [Open the retry schematic](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-worker-detail&viewMode=story) |
| Payments later merge awaiting evidence | [Open the dependent gap story](http://127.0.0.1:6006/?path=/story/narys-architecture-canvas--payments-dependent-gap) |
| Payments reduced motion | [Open the simulated preference test](http://127.0.0.1:6006/?path=/story/narys-architecture-canvas--payments-reduced-motion) |
| Flask possible divergence | [Review the synthetic claim and pinned counterevidence](http://127.0.0.1:6006/?path=/story/narys-architecture-canvas-flask--possible-divergence) |
| Inspector variants | [Open the multiple-observation specimen](http://127.0.0.1:6006/?path=/story/narys-canvas-specimen-inspector--multiple-related-observations) |
| Flask PR #4692 | [Compare JSON response construction](http://127.0.0.1:6006/?path=/story/narys-architecture-canvas-flask--json-provider-change) |
| Web Application primitive | [Compare static artwork and animated page loading](http://127.0.0.1:6006/iframe.html?id=narys-web-application-primitive--page-loading&viewMode=story) |
| Worker primitive | [Compare idle, processing, and paused](http://127.0.0.1:6006/iframe.html?id=narys-worker-primitive--motion-states&viewMode=story) |
| Scheduler primitive | [Compare static artwork and the animated trigger cycle](http://127.0.0.1:6006/iframe.html?id=narys-scheduler-primitive--trigger-cycle&viewMode=story) |
| Serverless Function primitive | [Compare static artwork and the animated invocation cycle](http://127.0.0.1:6006/iframe.html?id=narys-serverless-function-primitive--invocation-cycle&viewMode=story) |
| API primitive | [Compare disconnected, live, and paused at contact](http://127.0.0.1:6006/iframe.html?id=narys-api-primitive--invocation-cycle&viewMode=story) |
| API Gateway primitive | [Compare static and animated request routing](http://127.0.0.1:6006/iframe.html?id=narys-api-gateway-primitive--request-routing&viewMode=story) |
| Database primitive | [Compare the static mark and animated access cycle](http://127.0.0.1:6006/iframe.html?id=narys-database-primitive--access-cycle&viewMode=story) |
| Cache primitive | [Compare static, hit, miss, and write](http://127.0.0.1:6006/iframe.html?id=narys-cache-primitive--operations&viewMode=story) |
| Compute unit primitive | [Compare the static mark and animated processing cycle](http://127.0.0.1:6006/iframe.html?id=narys-compute-unit-primitive--processing-cycle&viewMode=story) |
| Object storage primitive | [Compare static, read, and write](http://127.0.0.1:6006/iframe.html?id=narys-object-storage-primitive--operations&viewMode=story) |
| Event Bus primitive | [Compare static and animated event distribution](http://127.0.0.1:6006/iframe.html?id=narys-event-bus-primitive--event-distribution&viewMode=story) |
| Event Stream primitive | [Compare static, read, and append](http://127.0.0.1:6006/iframe.html?id=narys-event-stream-primitive--operations&viewMode=story) |
| Architectural change review | [Open PR #128](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-change-review&viewMode=story) |
| Architecture specimens | [Open the specimen sheet](http://127.0.0.1:6006/iframe.html?id=narys-canvas-specimen--visual-language&viewMode=story) |
| Synthetic density fixture | [Open the dedicated 22-node story](http://127.0.0.1:6006/?path=/story/narys-canvas-specimen--density) |
| Archive · Early light Carbon palette | [Open the archived story](http://127.0.0.1:6006/?path=/story/narys-archive-deprecated-architecture-canvas--light-carbon) |
| Archive · Dark Graphite | [Open the archived story](http://127.0.0.1:6006/?path=/story/narys-archive-deprecated-architecture-canvas--dark-focused) |
| Archive · Dark Graphite industrial | [Open the archived story](http://127.0.0.1:6006/?path=/story/narys-archive-deprecated-architecture-canvas--dark-industrial) |
| Archive · Dark Blueprint | [Open the archived story](http://127.0.0.1:6006/?path=/story/narys-archive-deprecated-architecture-canvas--dark-blueprint) |
| Archive · Earlier light mockup | [Open the archived story](http://127.0.0.1:6006/?path=/story/narys-archive-deprecated-architecture-canvas--light-compact) |
| Merge progress, earlier gap, and published workspace | [Open the Storybook story index](http://127.0.0.1:6006/) |

Start the installed preview from the repository root with `npm --prefix docs/design/prototypes/canvas-storybook run storybook`. The preview package contains the npm lockfile and separate `typecheck` and `build-storybook` commands.

## 4. Preview evidence

Both dark treatments rendered at 1280 × 720 on November 28, 2026. In each, the keyboard walkthrough revealed the worker retry path in the later revision, retained Checkout's uncertainty, and opened the source and rationale. Escape returned focus to PR #128 and then to the Recent merges opener. The earlier dark and light comparisons at 1440 × 900 also exercised component-detail focus and the synthetic progress, gap, and public stories. Type checking and the Storybook build passed. The selected dark treatment still needs narrow-viewport and visual review.

The industrial worker story rendered at 1394 × 1315 and 390 × 844 on November 28, 2026. The desktop walkthrough exercised pointer and keyboard entry, source inspection, and focus return to Payments Worker in the PR #128 comparison. The earlier revision did not offer the drill-down. The narrow worker view fit above the inspector, and the source panel had no horizontal overflow at either size. Type checking and the Storybook build passed for the industrial candidate. The overview and detail composition are pending visual approval.

The Carbon light story rendered at 1394 × 1315 and 390 × 844 on November 28, 2026. The desktop walkthrough exercised both revisions, the visible uncertainty label, and pointer and keyboard access to the worker drawing and source. Returning restored the PR #128 comparison and worker focus. The narrow drawing fit above the evidence panel, whose source excerpt wrapped at both sizes. The light composition is pending visual approval.

The hybrid candidate rendered on November 28, 2026. The browser checks covered the opaque white card surface, separate styles for selected and keyboard-focused nodes, container terminology, worker drill-down, pinned source, stable positions across PR #128 revisions, and focus return to the relationship, merge row, and opener. The worker scene checked automatic playback, pause and resume, pan, zoom, fit, and the 390 × 844 layout. The system reduced-motion rules were present in the loaded stylesheet. The OS preference was not emulated. At 1280 × 720 the synthetic graph showed 22 nodes and 16 relationship labels with no clipping or label collisions. The browser loaded all eight Carbon icon assets and all eleven technology logos.

Human review is still needed for recognition at a glance, visual coherence between the three families, perceived loop timing, and ease of reading the larger graph.

The Payments workspace candidate was exercised by keyboard in the desktop browser. The walkthrough checked scope and zoom independently, restoration of the worker selection and the container viewport, all four stable container positions across PR #128, the rationale and pinned source excerpts, Checkout uncertainty, and focus return from comparison details and Recent merges. All retry animation tracks used the same 6.2-second cycle and paused and resumed together. The sample analysis advanced the current map from `06b7dd9` to `8e24c0a` while the open #124 comparison stayed at `d2f5621`. The gap story kept `06b7dd9` visible. Storybook's 399-pixel mobile preview reached the retry excerpt without horizontal overflow. Type checking and the Storybook build passed.

Visual and intended-use review remain open. Ask a developer to explain the retry change, its rationale, and what remains uncertain, then recover their earlier map. Compare the accuracy and effort with their normal GitHub handoff. Screen-reader and live reduced-motion tests remain open. The proposed Narys workspace remains deferred.

The public Flask story was exercised by keyboard through the ngrok preview. The two shared card positions stayed fixed across revision switches. The evidence pane matched the selected source and revision. Closing an inspection returned focus to its relationship. The desktop cards cleared each other and the 414-pixel preview showed the source and stacked cards without horizontal overflow. Eight excerpts were checked against the pinned files. The public menu rendered the 22-node density fixture, the relocated illustration, and an archived dark story. The Payments drill-down used the shared code cards and kept its contextual retry action.

The V1 journey walkthrough followed PR #128 from Recent merges through the Before and After comparison, retry source and recorded rationale. From the worker inspector it took one action to reach the excerpt directly and three through Components. Return restored the worker inspection, comparison revision, keyboard focus and container viewport. Entering from the merge inspector in Components returned to that scope and comparison. In Flask, the configuration and default actions opened their own pinned source lines. The earlier revision showed direct response construction, and the later view labeled the performance outcome unverified.

At desktop map fit with the density inspector open, the gateway’s three incoming and four outgoing relationships were readable in the inspector even where map text was small. At close zoom, selecting the route to Account API brought its label and direction into view. The cross-group Partner events route to Audit worker exposed both endpoints and led to the worker’s three incoming relationships. These checks covered particular paths. Human review still needs to establish how easily unfamiliar developers can follow adjacent paths at shared ports and crossings, find decisive source, and explain the changes accurately.

### Reusable foundation walkthrough

The Carbon light candidate was rendered through the Storybook tunnel at a desktop preview width of 980 pixels and a 414-pixel mobile preset. The mobile long-content specimen had no horizontal overflow in the inspector. The minimal archive examples exercised two, one and zero related actions, unconfirmed source with a navigable action, temporary source unavailability with other actions still enabled, missing rationale, and separate unconfirmed deployment. The archive example uses Go names and paths. Provider-specific actions only appeared where the evidence supplied them.

The Payments keyboard rehearsal covered system context, Containers, Components and implementation. Direct access from the worker and merge, plus guided access through the retry handler, preserved the selected revision and comparison. Returning restored the original scope, inspection, manually adjusted viewport and keyboard focus. PR #124 showed its own responsibilities and source at each revision. Completion of the checking fixture kept its open Before comparison pinned. The gap fixture kept `06b7dd9` visible while comparing #129, withheld the dependent change in the companion fixture, and produced one entry per supported merge after simulated recovery. Recovery preserved the historical comparison until it was closed. These observations apply to the Storybook presentation of SPEC-023 and CONF-014.

The Flask divergence story exposed two pinned lines alongside the synthetic claim. The real intent remained separately attributed and the performance outcome stayed unverified. The before revision omitted the later actions and counterevidence. Both code views used the same relationship notation. Browser checks covered calls, registration, configuration, inheritance and data dependencies. The docked specimen exposed both directions on a cross-group route. Dismissal returned focus to the originating node when the route label could be hidden at map fit.

The Storybook reduced-motion interaction test supplied a simulated media preference. It passed with three readable retry stages, no active animation and no playback button. A normal-preference check stopped and resumed the playback tracks with the keyboard. The native accessibility tree exposed named inspector regions, heading focus, selected controls, and expandable pinned source. A live spoken screen-reader walkthrough and an OS-level reduced-motion check remain open. Prototype walkthroughs support design review. Operational conformance and comparative user comprehension still require verification.
