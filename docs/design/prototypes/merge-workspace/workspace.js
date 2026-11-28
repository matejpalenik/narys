const repository = {
  area: "Payments",
  branch: "main",
  head: "8e24c0a",
};

const components = {
  checkout: { name: "Checkout", kind: "Web app", path: "apps/checkout/payments.ts" },
  api: { name: "Payments API", kind: "Service", path: "services/payments/api.ts" },
  queue: { name: "Payment jobs", kind: "Queue", path: "packages/jobs/payments.ts" },
  worker: { name: "Payments Worker", kind: "Worker", path: "services/payments/worker.ts" },
};

const original = {
  descriptions: {
    checkout: "Starts payments and retries failed attempts.",
    api: "Authorizes and charges payments.",
    queue: "Buffers background payment jobs.",
    worker: "Runs scheduled payment jobs.",
  },
  links: [
    { from: "checkout", to: "api", title: "Authorize" },
    { from: "queue", to: "worker", title: "Scheduled jobs" },
  ],
};

const beforeRetry = {
  descriptions: { ...original.descriptions, api: "Authorizes payments and exposes payment status." },
  links: [
    { from: "checkout", to: "api", title: "Authorize + status" },
    original.links[1],
  ],
};

const afterRetry = {
  descriptions: {
    ...beforeRetry.descriptions,
    checkout: "Starts payments and queues failed attempts.",
    queue: "Buffers retries and scheduled payment jobs.",
    worker: "Retries payments from the queue and runs background jobs.",
  },
  uncertainties: {
    checkout: {
      label: "Retry behavior unconfirmed",
      explanation: "The merged evidence leaves open whether Checkout still retries failed payments directly.",
    },
  },
  links: [
    beforeRetry.links[0],
    { from: "checkout", to: "queue", title: "Queue a retry", added: true },
    { from: "queue", to: "worker", title: "Payment jobs", added: true },
    { from: "worker", to: "api", title: "Retry payment", added: true },
  ],
};

const merges = [
  {
    id: "128",
    title: "Move retries to the payments worker",
    kind: "Retry path added",
    time: "27 Nov · 10:42 UTC",
    beforeSha: "06b7dd9",
    afterSha: "8e24c0a",
    before: beforeRetry,
    after: afterRetry,
    affected: ["checkout", "queue", "worker"],
    summary: "Checkout queues failed attempts. Payments Worker now retries payments through Payments API.",
    behavior: "The worker can retry a queued payment in the background.",
    rationale: {
      title: "Issue #91 · Decision note",
      text: "Move retries off the request path so a slow payment processor does not hold the checkout response.",
    },
    deployment: null,
    sourceText: "Checkout publishes a retry job after a failed attempt. Payments Worker reads that job, applies the retry schedule, and calls Payments API.",
  },
  {
    id: "124",
    title: "Expose a payment status interface",
    kind: "Interface changed",
    time: "26 Nov · 13:08 UTC",
    beforeSha: "d2f5621",
    afterSha: "06b7dd9",
    before: original,
    after: beforeRetry,
    affected: ["checkout", "api"],
    summary: "Checkout can request payment status directly from Payments API.",
    behavior: "Checkout can display an in-progress payment without starting another authorization request.",
    rationale: null,
    deployment: {
      title: "Production · 26 Nov · 14:20 UTC",
      text: "The production deployment record identifies revision 06b7dd9 and reports a successful deployment.",
    },
    sourceText: "Payments API adds a status endpoint. Checkout reads that endpoint to render the status of an existing payment.",
  },
];

const workspace = document.querySelector("#workspace");
const dialog = document.querySelector("#reference-dialog");
const referenceBody = document.querySelector("#reference-body");
const parameters = new URLSearchParams(window.location.search);
const entries = { canvas: "Canvas first", changes: "Recent changes first", setup: "Starting map review" };
const requestedEntry = parameters.get("entry");
const entry = Object.hasOwn(entries, requestedEntry) ? requestedEntry : "canvas";
const reviewingMap = entry === "setup";
const layout = parameters.get("layout");
const expandedCanvas = entry !== "changes" && layout !== "compact";
const overlayCanvas = entry === "canvas" && expandedCanvas && layout !== "docked";
const reviewRevision = merges[0].beforeSha;
const proposedMap = {
  descriptions: { ...beforeRetry.descriptions, checkout: "Starts payments. The worker handles retries." },
  links: [ { ...beforeRetry.links[0] }, { ...beforeRetry.links[1], title: "Sends payment retries" } ],
};
const componentEvidence = {
  checkout: "submitPayment() retries failed attempts inside the checkout request before returning a response.",
  api: "The payment endpoint authorizes payments, and the status endpoint reads existing payment records.",
  queue: "The payment jobs queue receives scheduled settlement jobs at this revision.",
  worker: "The worker subscribes to scheduled settlement jobs. There is no payment retry handler at this revision.",
};
const relationshipEvidence = [
  { path: components.checkout.path, text: "Checkout calls Payments API to authorize payment and look up payment status." },
  { path: components.worker.path, text: "Payments Worker consumes scheduled settlement jobs from the Payment jobs queue." },
];
let selected = null;
let revision = "after";
let mergesOpen = false;
let graphObserver;
let reviewSelection = null;
let mapConfirmed = false;
let reviewFeedback = "";

document.body.classList.toggle("expanded-canvas", expandedCanvas);
document.body.classList.toggle("overlay-canvas", overlayCanvas);
document.querySelector(`[data-entry="${entry}"]`).setAttribute("aria-current", "page");
document.title = `${entries[entry]} · Narys prototype`;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function mergeList() {
  return `<ul class="merge-list">${merges.map((merge) => `
    <li><button class="merge-row" type="button" id="merge-${merge.id}" data-merge="${merge.id}"${selected?.id === merge.id ? ' aria-current="true"' : ""}>
      <span class="merge-meta"><span class="merge-number">#${merge.id}</span><span>${merge.time}</span></span>
      <strong>${merge.title}</strong>
      <span class="merge-kind">${merge.kind}</span>
      <span class="row-arrow" aria-hidden="true">↗</span>
    </button></li>
  `).join("")}</ul>`;
}

function areaHeader(isOverview) {
  const back = entry === "changes" && selected
    ? `<button class="text-button return-button" type="button" data-action="back">← Recent changes</button>`
    : "";
  const awaitingConfirmation = reviewingMap && !mapConfirmed;
  return `<section class="area-header" aria-labelledby="area-title">
    <div>${back}<h1 id="area-title">${repository.area}</h1>
    ${expandedCanvas ? "" : `<p>${isOverview ? "Architecture changes merged to main" : "Architecture of the selected repository area"}</p>`}</div>
    <span class="area-state${awaitingConfirmation ? " area-state-proposed" : ""}"><span class="status-dot" aria-hidden="true"></span>${awaitingConfirmation ? "Starting map proposed" : "Starting map confirmed"}</span>
  </section>`;
}

function recentOverview() {
  return `${areaHeader(true)}
    <section class="recent-overview panel" aria-labelledby="recent-title">
      <div class="panel-header"><h2 id="recent-title">Recent changes</h2><span class="counter">${merges.length} merges</span></div>
      ${mergeList()}
    </section>`;
}

function mapPanel(snapshot, sha) {
  const nodes = Object.entries(components).map(([id, component]) => {
    const affected = selected?.affected.includes(id);
    const inspecting = reviewSelection?.kind === "component" && reviewSelection.id === id;
    const uncertainty = snapshot.uncertainties?.[id];
    return `<button type="button" class="node${affected ? " node-affected" : ""}${inspecting ? " node-inspected" : ""}" data-node="${id}"${reviewingMap ? ` aria-pressed="${inspecting}"` : ""}>
      <span class="node-kind">${component.kind}</span>
      <strong>${component.name}${affected ? '<span class="sr-only">, affected component</span>' : ""}</strong>
      <span class="node-description">${escapeHtml(snapshot.descriptions[id])}</span>
      ${uncertainty ? `<span class="node-evidence">${uncertainty.label}</span>` : ""}
    </button>`;
  }).join("");

  const comparison = selected ? `<div class="revision-switch" role="group" aria-label="Compared revision">
    <button type="button" data-revision="before" aria-pressed="${revision === "before"}">Before merge</button>
    <button type="button" data-revision="after" aria-pressed="${revision === "after"}">After merge</button>
  </div>` : "";

  const relationships = snapshot.links.map(({ from, to, title, added }) => `
    <li><strong>${components[from].name} → ${components[to].name}</strong><span>${escapeHtml(title)}${added ? " · changed in #128" : ""}</span></li>`).join("");

  const linkControls = reviewingMap ? snapshot.links.map(({ from, to, title }, index) => {
    const inspecting = reviewSelection?.kind === "relationship" && reviewSelection.id === index;
    return `<button class="edge-button" type="button" data-review-link="${index}" aria-pressed="${inspecting}" aria-label="Inspect ${components[from].name} to ${components[to].name} relationship: ${escapeHtml(title)}">${escapeHtml(title)}</button>`;
  }).join("") : "";

  const overlays = overlayCanvas ? `
    <button type="button" class="secondary merge-toggle" id="merge-toggle" data-action="toggle-merges" aria-controls="canvas-merge-panel" aria-expanded="${mergesOpen}">
      Recent merges <span class="counter">${merges.length}</span>
    </button>
    <div class="canvas-merge-panel" id="canvas-merge-panel"${mergesOpen ? "" : " hidden"}>${expandedRail()}</div>` : "";

  return `<section class="panel map-panel" aria-labelledby="map-title">
    <div class="map-toolbar">
      <div class="panel-header map-header">${overlayCanvas ? `<h1 id="map-title">${repository.area}</h1>` : '<h2 id="map-title">Architecture</h2>'}${comparison}</div>
      <div class="map-meta"><span>${reviewingMap ? "Starting revision" : selected ? (revision === "before" ? "Before merge" : "After merge") : repository.branch} <code>${sha}</code></span>${selected ? '<span class="impact-key"><span aria-hidden="true"></span>Affected component</span>' : overlayCanvas ? '<span>Synthetic data</span>' : ""}</div>
    </div>
    <div class="graph"><canvas aria-hidden="true"></canvas><div class="graph-grid">${nodes}</div>${reviewingMap ? `<div class="edge-actions">${linkControls}</div>` : ""}</div>
    <details class="relationships"><summary>Relationships <span>${snapshot.links.length}</span></summary><ul>${relationships}</ul></details>
    ${overlays}
  </section>`;
}

function recentRail() {
  return `<aside class="panel rail" aria-labelledby="rail-title"><div class="panel-header"><h2 id="rail-title">Recent merges</h2><span class="counter">${merges.length}</span></div>${mergeList()}</aside>`;
}

function expandedRail() {
  const close = overlayCanvas ? '<button class="close-detail" type="button" aria-label="Close recent merges" data-action="toggle-merges">×</button>' : "";
  return `<aside class="panel rail pinned-rail" aria-label="Merges and change details">
    <section class="pinned-merges" aria-labelledby="rail-title">
      <div class="panel-header"><h2 id="rail-title" tabindex="-1">Recent merges</h2>${close || `<span class="counter">${merges.length}</span>`}</div>
      ${mergeList()}
    </section>${selected ? changeDetails() : ""}
  </aside>`;
}

function changeDetails() {
  const container = expandedCanvas ? "section" : "aside";
  const panelClass = expandedCanvas ? "details-pane" : "panel rail details-rail";
  const back = entry === "canvas" && !expandedCanvas ? '<button class="text-button" type="button" data-action="back">← Recent merges</button>' : "";
  const close = expandedCanvas ? '<button class="close-detail" aria-label="Close change details" type="button" data-action="back">×</button>' : "";
  const uncertainties = Object.entries(selected.after.uncertainties ?? {}).map(([id, evidence]) =>
    evidenceGap(`${components[id].name} · ${evidence.label} after merge`, evidence.explanation)).join("");
  return `<${container} class="${panelClass}" aria-labelledby="change-title">
    <div class="change-header">
      ${back}
      <div class="change-meta"><span class="status-label">Merged</span><span>#${selected.id} · ${selected.time}</span>${close}</div>
      <h2 id="change-title" tabindex="-1">${selected.title}</h2>
      <p>${selected.summary}</p>
    </div>
    <div class="evidence-section"><h3>Affected behavior</h3><p>${selected.behavior}</p>
      ${uncertainties}
      <button class="text-button source-button" type="button" data-source="change">View PR #${selected.id} ↗</button>
    </div>
    <div class="evidence-section"><h3>Why it changed</h3>
      ${selected.rationale ? `<p>${selected.rationale.text}</p><button class="text-button source-button" type="button" data-source="rationale">${selected.rationale.title} ↗</button>` : '<p class="unknown">Rationale missing</p><p>The available records do not explain why this change was made.</p>'}
    </div>
    <div class="evidence-section"><h3>Deployment</h3>
      ${selected.deployment ? `<p>${selected.deployment.title}</p><button class="text-button source-button" type="button" data-source="deployment">View deployment record ↗</button>` : '<p class="unknown">Unconfirmed</p><p>No deployment is linked to this merge.</p>'}
    </div>
  </${container}>`;
}

function reviewPanel() {
  const item = reviewSelection?.kind === "component" ? components[reviewSelection.id] : null;
  const link = reviewSelection?.kind === "relationship" ? proposedMap.links[reviewSelection.id] : null;
  const relationship = link ? `${components[link.from].name} → ${components[link.to].name}` : "";
  const title = item?.name ?? relationship;
  const evidence = item
    ? { path: item.path, text: componentEvidence[reviewSelection.id] }
    : link ? relationshipEvidence[reviewSelection.id] : null;
  const claim = item ? proposedMap.descriptions[reviewSelection.id] : link?.title;
  const options = (current) => Object.entries(components).map(([id, component]) =>
    `<option value="${id}"${id === current ? " selected" : ""}>${component.name}</option>`).join("");
  const fields = item
    ? `<label>Responsibility<textarea name="description" required maxlength="180" rows="3">${escapeHtml(claim)}</textarea></label>`
    : link ? `<div class="relationship-fields">
        <label>From<select name="from">${options(link.from)}</select></label>
        <label>To<select name="to">${options(link.to)}</select></label>
      </div><label>Relationship label<input name="title" value="${escapeHtml(claim)}" required maxlength="40"></label>` : "";
  const content = evidence ? `<h3 id="review-item" tabindex="-1">${title}</h3>
    <div class="review-source"><strong>Repository source</strong>
      <code>${evidence.path} · ${reviewRevision}</code><p>${evidence.text}</p>
    </div>${mapConfirmed ? `<p>${escapeHtml(claim)}</p>` : `<form id="correction-form" class="correction-form">
      ${fields}<div class="review-actions"><button type="submit" class="secondary" data-apply disabled>Apply correction</button>
      <button type="button" class="text-button" data-action="discard-correction" data-discard disabled>Discard edit</button></div>
    </form>`}` : `<p>Select a component or relationship on the canvas to inspect its source${mapConfirmed ? "" : " and correct the proposal"}.</p>`;

  return `<aside class="panel rail review-rail" aria-labelledby="review-title">
    <div class="panel-header"><h2 id="review-title" tabindex="-1">Starting map review</h2></div>
    <div class="review-content">${content}<p class="review-feedback" id="review-feedback" role="status">${reviewFeedback}</p></div>
    <div class="review-footer">${mapConfirmed
      ? `<p>Map confirmed at <code>${reviewRevision}</code>.</p>`
      : `<button class="primary" type="button" data-action="confirm-map">Confirm map</button>`}</div>
  </aside>`;
}

function currentSnapshot() {
  return reviewingMap ? proposedMap : selected ? selected[revision] : afterRetry;
}

function render(focusSelector) {
  graphObserver?.disconnect();
  if (entry === "changes" && !selected) {
    workspace.innerHTML = recentOverview();
  } else {
    const sha = reviewingMap ? reviewRevision : selected ? selected[`${revision}Sha`] : repository.head;
    const snapshot = currentSnapshot();
    const map = mapPanel(snapshot, sha);
    if (overlayCanvas) {
      workspace.innerHTML = map;
    } else {
      const rail = reviewingMap ? reviewPanel() : expandedCanvas ? expandedRail() : selected ? changeDetails() : recentRail();
      workspace.innerHTML = `${areaHeader(false)}<div class="workspace-grid">${map}${rail}</div>`;
    }
    const graph = workspace.querySelector(".graph");
    graphObserver = new ResizeObserver(() => drawLinks(graph, snapshot));
    graphObserver.observe(graph);
    drawLinks(graph, snapshot);
    document.fonts.ready.then(() => {
      if (graph.isConnected) drawLinks(graph, snapshot);
    });
  }
  if (focusSelector) workspace.querySelector(focusSelector)?.focus();
}

function setMergesOpen(open) {
  mergesOpen = open;
  const toggle = workspace.querySelector("#merge-toggle");
  const panel = workspace.querySelector("#canvas-merge-panel");
  toggle.setAttribute("aria-expanded", String(open));
  panel.hidden = !open;
  const focusTarget = open ? panel.querySelector(selected ? "#change-title" : "#rail-title") : toggle;
  focusTarget.focus({ preventScroll: true });
}

function drawLinks(graph, snapshot) {
  const canvas = graph.querySelector("canvas");
  const context = canvas.getContext("2d");
  const frame = graph.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(frame.width * pixelRatio);
  canvas.height = Math.round(frame.height * pixelRatio);
  context.scale(pixelRatio, pixelRatio);

  for (const [index, link] of snapshot.links.entries()) {
    const from = graph.querySelector(`[data-node="${link.from}"]`).getBoundingClientRect();
    const to = graph.querySelector(`[data-node="${link.to}"]`).getBoundingClientRect();
    const fromX = from.left + from.width / 2;
    const fromY = from.top + from.height / 2;
    const toX = to.left + to.width / 2;
    const toY = to.top + to.height / 2;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const fromOffset = Math.min((from.width / 2 + 2) / Math.abs(dx), (from.height / 2 + 2) / Math.abs(dy));
    const toOffset = Math.min((to.width / 2 + 3) / Math.abs(dx), (to.height / 2 + 3) / Math.abs(dy));
    const startX = fromX + dx * fromOffset - frame.left;
    const startY = fromY + dy * fromOffset - frame.top;
    const endX = toX - dx * toOffset - frame.left;
    const endY = toY - dy * toOffset - frame.top;
    const direction = Math.atan2(endY - startY, endX - startX);
    const inspecting = reviewSelection?.kind === "relationship" && reviewSelection.id === index;
    const accent = Boolean((link.added && selected) || inspecting);

    context.strokeStyle = accent ? "#2c775c" : "#728078";
    context.lineWidth = accent ? 2 : 1.4;
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.moveTo(endX - 7 * Math.cos(direction - 0.47), endY - 7 * Math.sin(direction - 0.47));
    context.lineTo(endX, endY);
    context.lineTo(endX - 7 * Math.cos(direction + 0.47), endY - 7 * Math.sin(direction + 0.47));
    context.stroke();

    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    if (reviewingMap) {
      const control = graph.querySelector(`[data-review-link="${index}"]`);
      control.style.left = `${centerX}px`;
      control.style.top = `${centerY}px`;
      continue;
    }
    if (frame.width < 560) continue;
    const horizontal = Math.abs(dy) < 2;
    context.font = '600 11px "Avenir Next", "Trebuchet MS", sans-serif';
    const width = Math.ceil(context.measureText(link.title).width) + 12;
    const labelX = horizontal ? centerX - width / 2 : centerX + 8;
    const labelY = horizontal ? centerY - 24 : centerY - 9;
    context.fillStyle = "#f0f1e8";
    context.fillRect(labelX, labelY, width, 18);
    context.fillStyle = accent ? "#215f46" : "#4a5b52";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(link.title, labelX + width / 2, labelY + 9);
  }
}

function evidenceGap(label, explanation) {
  return `<div class="evidence-gap"><strong>${label}</strong><p>${explanation}</p></div>`;
}

function showReference(title, label, body, note, uncertainty) {
  referenceBody.innerHTML = `<p class="dialog-label">${label}</p><h2 id="reference-title">${title}</h2><p>${escapeHtml(body)}</p>${uncertainty ? evidenceGap(uncertainty.label, uncertainty.explanation) : ""}<p class="dialog-note">${note}</p>`;
  dialog.showModal();
}

function correctionPending() {
  const form = workspace.querySelector("#correction-form");
  if (!form) return false;
  const values = new FormData(form);
  if (reviewSelection.kind === "component") return values.get("description") !== proposedMap.descriptions[reviewSelection.id];
  const link = proposedMap.links[reviewSelection.id];
  return ["from", "to", "title"].some((key) => values.get(key) !== link[key]);
}

function showReviewFeedback(message) {
  workspace.querySelector("#review-feedback").textContent = message;
}

function inspectReviewItem(kind, id) {
  if (correctionPending()) {
    showReviewFeedback("Apply or discard your edit before switching items.");
    return;
  }
  reviewSelection = { kind, id };
  reviewFeedback = "";
  render("#review-item");
}

workspace.addEventListener("input", (event) => {
  if (!event.target.closest("#correction-form")) return;
  const pending = correctionPending();
  workspace.querySelector("[data-apply]").disabled = !pending;
  workspace.querySelector("[data-discard]").disabled = !pending;
  workspace.querySelector('[data-action="confirm-map"]').disabled = pending;
  showReviewFeedback(pending ? "Unapplied edit." : "");
});

workspace.addEventListener("submit", (event) => {
  if (event.target.id !== "correction-form") return;
  event.preventDefault();
  const values = new FormData(event.target);
  if (reviewSelection.kind === "component") {
    const description = String(values.get("description")).trim();
    if (!description) return showReviewFeedback("Enter a responsibility for this component.");
    proposedMap.descriptions[reviewSelection.id] = description;
  } else {
    const from = values.get("from");
    const to = values.get("to");
    const title = String(values.get("title")).trim();
    if (!title) return showReviewFeedback("Enter a label for this relationship.");
    if (from === to) return showReviewFeedback("Choose two different components for this relationship.");
    proposedMap.links[reviewSelection.id] = { from, to, title };
  }
  reviewFeedback = "Correction applied to the proposed map.";
  render("#review-item");
});

workspace.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "toggle-merges") {
    setMergesOpen(!mergesOpen);
  } else if (reviewingMap && button.dataset.node) {
    inspectReviewItem("component", button.dataset.node);
  } else if (button.dataset.reviewLink !== undefined) {
    inspectReviewItem("relationship", Number(button.dataset.reviewLink));
  } else if (button.dataset.action === "discard-correction") {
    reviewFeedback = "Unapplied edit discarded.";
    render("#review-item");
  } else if (button.dataset.action === "confirm-map") {
    if (correctionPending()) return;
    mapConfirmed = true;
    reviewFeedback = "";
    render("#review-title");
  } else if (button.dataset.merge) {
    selected = merges.find((merge) => merge.id === button.dataset.merge);
    revision = "after";
    render("#change-title");
  } else if (button.dataset.action === "back") {
    const id = selected.id;
    selected = null;
    render(`#merge-${id}`);
  } else if (button.dataset.revision) {
    revision = button.dataset.revision;
    render(`[data-revision="${revision}"]`);
  } else if (button.dataset.node) {
    const id = button.dataset.node;
    const { name, kind, path } = components[id];
    const snapshot = currentSnapshot();
    showReference(name, kind, snapshot.descriptions[id], path, snapshot.uncertainties?.[id]);
  } else if (button.dataset.source === "change") {
    showReference(`PR #${selected.id}`, "Merged pull request", selected.sourceText, `Compared revisions ${selected.beforeSha} → ${selected.afterSha}`);
  } else if (button.dataset.source === "rationale") {
    showReference(selected.rationale.title, "Rationale source", selected.rationale.text, "Decision recorded in the linked issue before the merge.");
  } else if (button.dataset.source === "deployment") {
    showReference(selected.deployment.title, "Deployment evidence", selected.deployment.text, `Deployed revision ${selected.afterSha}`);
  }
});

workspace.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlayCanvas && mergesOpen && !dialog.open) {
    event.preventDefault();
    setMergesOpen(false);
  }
});

render();
