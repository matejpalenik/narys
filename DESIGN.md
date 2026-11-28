# Narys visual design

Status: Draft. The Carbon light hybrid canvas is the current candidate for visual review.

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
| Relationship semantics | Solid for synchronous calls, short dashes for async messages, dash-dot for events, thick long dashes for data dependencies, and dots for unconfirmed semantics. The Payments fixture uses calls and messages. |
| Architecture change | Added uses a plus and solid outline. Modified uses a triangle and a leading rule. Removed uses a dashed form and struck label. Unchanged uses the normal outline. PR #128 only shows the supported additions and modifications. |
| Selection and evidence | Selection uses a single blue border. Keyboard focus uses a separate dashed outline. Source support uses a check and label. Uncertainty uses a question mark and label. Recorded rationale is marked as documented intent. |
| Motion | Entering the worker detail starts a 6.2-second retry loop with pause and resume. During queue release, blue fills each slot in turn up to its outline. The slots return to white before the message pulse travels to the handler. The Worker and API primitives have their own four-second illustrative cycles and follow the same pause control. The API illustration depicts an invocation with a brief Carbon Blue seam during contact. The specimen change sequence plays once on request. The system reduced-motion preference selects the static presentation. |

The retry playback illustrates the queued message, handler, and API call in the existing source at `8e24c0a`. Its label identifies it as an illustration with no runtime data. The specimen shows the three visual families and a separately labeled 22-node synthetic graph. [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) · [V1 evidence rules](SPEC.md#evidence-for-a-change-claim)

### Stories

The disposable preview uses Storybook with the React/Vite adapter and React Flow for the graph. It uses the shadcn/ui New York Radix Button for workspace controls and the Badge for evidence status. Preview theme tokens drive the shadcn/ui colors. The visual comparison stories start with PR #128 open. [Preview package](docs/design/prototypes/canvas-storybook/package.json) · [shadcn/ui Button](https://ui.shadcn.com/docs/components/radix/button) · [shadcn/ui Badge](https://ui.shadcn.com/docs/components/radix/badge)

| Story | Local preview |
|---|---|
| Payments architecture overview | [Open the overview](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-overview&viewMode=story) |
| Payments Worker detail | [Open the retry schematic](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-worker-detail&viewMode=story) |
| Web Application primitive | [Compare static artwork and animated page loading](http://127.0.0.1:6006/iframe.html?id=narys-web-application-primitive--page-loading&viewMode=story) |
| Worker primitive | [Compare idle, processing, and paused](http://127.0.0.1:6006/iframe.html?id=narys-worker-primitive--motion-states&viewMode=story) |
| Scheduler primitive | [Compare static artwork and the animated trigger cycle](http://127.0.0.1:6006/iframe.html?id=narys-scheduler-primitive--trigger-cycle&viewMode=story) |
| API primitive | [Compare disconnected, live, and paused at contact](http://127.0.0.1:6006/iframe.html?id=narys-api-primitive--invocation-cycle&viewMode=story) |
| API Gateway primitive | [Compare static and animated request routing](http://127.0.0.1:6006/iframe.html?id=narys-api-gateway-primitive--request-routing&viewMode=story) |
| Database primitive | [Compare the static mark and animated access cycle](http://127.0.0.1:6006/iframe.html?id=narys-database-primitive--access-cycle&viewMode=story) |
| Cache primitive | [Compare static, hit, miss, and write](http://127.0.0.1:6006/iframe.html?id=narys-cache-primitive--operations&viewMode=story) |
| Compute unit primitive | [Compare the static mark and animated processing cycle](http://127.0.0.1:6006/iframe.html?id=narys-compute-unit-primitive--processing-cycle&viewMode=story) |
| Object storage primitive | [Compare static, read, and write](http://127.0.0.1:6006/iframe.html?id=narys-object-storage-primitive--operations&viewMode=story) |
| Event Bus primitive | [Compare static and animated event distribution](http://127.0.0.1:6006/iframe.html?id=narys-event-bus-primitive--event-distribution&viewMode=story) |
| Architectural change review | [Open PR #128](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--payments-change-review&viewMode=story) |
| Architecture specimens | [Open the specimen sheet](http://127.0.0.1:6006/iframe.html?id=narys-canvas-specimen--visual-language&viewMode=story) |
| Synthetic density fixture | [Open the 22-node graph](http://127.0.0.1:6006/iframe.html?id=narys-canvas-specimen--visual-language&viewMode=story#density-fixture) |
| Light · Carbon palette | [Open the full-size story](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--light-carbon&viewMode=story) |
| Dark · Graphite | [Open the full-size story](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--dark-focused&viewMode=story) |
| Dark · Graphite industrial | [Open the full-size story](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--dark-industrial&viewMode=story) |
| Dark · Blueprint | [Open the full-size story](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--dark-blueprint&viewMode=story) |
| Earlier light mockup | [Open the comparison story](http://127.0.0.1:6006/iframe.html?id=narys-architecture-canvas--light-compact&viewMode=story) |
| Merge progress, earlier gap, and published workspace | [Open the Storybook story index](http://127.0.0.1:6006/) |

Start the installed preview from the repository root with `npm --prefix docs/design/prototypes/canvas-storybook run storybook`. The preview package contains the npm lockfile and separate `typecheck` and `build-storybook` commands.

## 4. Preview evidence

Both dark treatments rendered at 1280 × 720 on November 28, 2026. In each, the keyboard walkthrough revealed the worker retry path in the later revision, retained Checkout's uncertainty, and opened the source and rationale. Escape returned focus to PR #128 and then to the Recent merges opener. The earlier dark and light comparisons at 1440 × 900 also exercised component-detail focus and the synthetic progress, gap, and public stories. Type checking and the Storybook build passed. The selected dark treatment still needs narrow-viewport and visual review.

The industrial worker story rendered at 1394 × 1315 and 390 × 844 on November 28, 2026. The desktop walkthrough exercised pointer and keyboard entry, source inspection, and focus return to Payments Worker in the PR #128 comparison. The earlier revision did not offer the drill-down. The narrow worker view fit above the inspector, and the source panel had no horizontal overflow at either size. Type checking and the Storybook build passed for the industrial candidate. The overview and detail composition are pending visual approval.

The Carbon light story rendered at 1394 × 1315 and 390 × 844 on November 28, 2026. The desktop walkthrough exercised both revisions, the visible uncertainty label, and pointer and keyboard access to the worker drawing and source. Returning restored the PR #128 comparison and worker focus. The narrow drawing fit above the evidence panel, whose source excerpt wrapped at both sizes. The light composition is pending visual approval.

The hybrid candidate rendered on November 28, 2026. The browser checks covered the opaque white card surface, separate styles for selected and keyboard-focused nodes, container terminology, worker drill-down, pinned source, stable positions across PR #128 revisions, and focus return to the relationship, merge row, and opener. The worker scene checked automatic playback, pause and resume, pan, zoom, fit, and the 390 × 844 layout. The system reduced-motion rules were present in the loaded stylesheet. The OS preference was not emulated. At 1280 × 720 the synthetic graph showed 22 nodes and 16 relationship labels with no clipping or label collisions. The browser loaded all eight Carbon icon assets and all eleven technology logos.

Human review is still needed for recognition at a glance, visual coherence between the three families, perceived loop timing, and ease of reading the larger graph.
