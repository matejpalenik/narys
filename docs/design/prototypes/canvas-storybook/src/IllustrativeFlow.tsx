import { useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { Focus, Minus, Pause, Play, Plus, RotateCcw } from "lucide-react";
import { ApiPlugGlyph } from "./ApiPlugGlyph";
import { ConnectionStroke, MessageQueueGlyph } from "./architecture-visuals";
import { Button } from "./components/ui/button";
import { WorkerGlyph } from "./WorkerGlyph";

const preference = "(prefers-reduced-motion: reduce)";
function subscribe(listener: () => void) {
  const query = window.matchMedia(preference);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

function reducedMotion() {
  return window.matchMedia(preference).matches;
}

type Playback = "ready" | "playing" | "paused" | "finished";

export function IllustrationPlayback({ subject, children, loop = false }: { subject: string; children: ReactNode; loop?: boolean }) {
  const [playback, setPlayback] = useState<Playback>(loop ? "playing" : "ready");
  const reduced = useSyncExternalStore(subscribe, reducedMotion, () => true);
  const active = !reduced && (playback === "playing" || playback === "paused");
  const description = useId();
  const Icon = playback === "playing" ? Pause : playback === "finished" ? RotateCcw : Play;
  const action = ({ ready: "Play", playing: "Pause", paused: "Resume", finished: "Replay" } as const)[playback];

  function toggle() {
    setPlayback((current) => current === "playing" ? "paused" : "playing");
  }

  return (
    <div className="illustration-playback" data-playing={active || undefined} data-paused={playback === "paused" || undefined}
      onAnimationEnd={(event) => { if (!loop && event.animationName === "illustration-complete") setPlayback("finished"); }}>
      <div className="illustration-controls">
        <span id={description}>{reduced ? "Illustrative sequence · static for reduced motion" : "Illustrative sequence · no runtime data"}</span>
        {!reduced && (
          <Button variant="outline" size="sm" type="button" onClick={toggle} aria-describedby={description}>
            <Icon size={15} aria-hidden="true" />{action} {subject}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

export function RetrySchematic() {
  const arrow = useId();
  const [zoom, setZoom] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    const scroller = viewport.current;
    if (!scroller) return;
    scroller.scrollTo((scroller.scrollWidth - scroller.clientWidth) / 2, (scroller.scrollHeight - scroller.clientHeight) / 2);
  }, [zoom]);

  function beginPan(event: PointerEvent<HTMLDivElement>) {
    if (zoom === 1 || event.pointerType !== "mouse" || event.button !== 0) return;
    const scroller = event.currentTarget;
    drag.current = { x: event.clientX, y: event.clientY, left: scroller.scrollLeft, top: scroller.scrollTop };
    scroller.setPointerCapture(event.pointerId);
  }

  function pan(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const { x, y, left, top } = drag.current;
    event.currentTarget.scrollTo(left + x - event.clientX, top + y - event.clientY);
  }

  return (
    <figure className="retry-schematic" aria-label="Illustrative payment retry flow">
      <IllustrationPlayback subject="flow" loop>
        <div className="retry-workspace">
          <div ref={viewport} className="retry-viewport" data-zoomed={zoom > 1 || undefined}
            role="region" aria-label="Retry diagram viewport" tabIndex={zoom > 1 ? 0 : undefined}
            onPointerDown={beginPan} onPointerMove={pan} onLostPointerCapture={() => { drag.current = null; }}>
            <div className="retry-plane" style={{ "--retry-zoom": zoom } as CSSProperties}>
              <div className="retry-trace">
                <ol role="list" className="retry-stages">
                  <li className="retry-stage">
                    <MessageQueueGlyph animated />
                    <strong>Payment jobs</strong>
                    <code>payment.retry</code>
                  </li>
                  <li className="retry-channel" role="presentation" aria-hidden="true">
                    <span className="retry-channel-label">Job message</span>
                    <svg viewBox="0 0 110 20" preserveAspectRatio="none">
                      <defs><marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="m1 1 8 4-8 4" fill="none" stroke="context-stroke" /></marker></defs>
                      <ConnectionStroke path="M2 10H108" kind="async" markerEnd={`url(#${arrow})`} />
                    </svg>
                    <span className="trace-pulse" data-leg="inbound" />
                  </li>
                  <li className="retry-stage retry-worker">
                    <span className="retry-boundary-label">Payments Worker</span>
                    <WorkerGlyph motion="flow" />
                    <strong>Retry handler</strong>
                    <small>Component</small>
                  </li>
                  <li className="retry-channel" role="presentation" aria-hidden="true">
                    <span className="retry-channel-label">Retry call</span>
                    <svg viewBox="0 0 110 20" preserveAspectRatio="none">
                      <ConnectionStroke path="M2 10H108" kind="sync" markerEnd={`url(#${arrow})`} />
                    </svg>
                    <span className="trace-pulse" data-leg="outbound" />
                  </li>
                  <li className="retry-stage">
                    <ApiPlugGlyph motion="flow" />
                    <strong>Payments API</strong>
                    <code>retry(paymentId)</code>
                  </li>
                </ol>
                <p className="retry-summary">The worker handles a queued <code>payment.retry</code> message and calls <code>paymentsApi.retry(paymentId)</code>.</p>
              </div>
            </div>
          </div>
          <div className="retry-viewport-tools" role="group" aria-label="Flow viewport controls">
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Zoom out flow" disabled={zoom <= 1}
              onClick={() => setZoom((current) => Math.max(1, current - 0.25))}><Minus size={16} /></Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Zoom in flow" disabled={zoom >= 2}
              onClick={() => setZoom((current) => Math.min(2, current + 0.25))}><Plus size={16} /></Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Fit flow" onClick={() => setZoom(1)}><Focus size={16} /></Button>
          </div>
        </div>
      </IllustrationPlayback>
    </figure>
  );
}
