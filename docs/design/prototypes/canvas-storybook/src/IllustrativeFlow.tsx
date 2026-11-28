import { useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./components/ui/button";

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
