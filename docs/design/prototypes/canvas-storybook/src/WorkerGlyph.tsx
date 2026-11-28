export type WorkerMotion = "idle" | "processing" | "paused";

export function WorkerGlyph({ motion = "idle" }: { motion?: WorkerMotion | "flow" }) {
  return (
    <span className="architecture-glyph worker-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" fill="none">
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M22 22 36.5 7.5H114V77L99.5 91.5H22Z" />
          <path d="M22 22H99.5L114 7.5M99.5 22V91.5" fill="none" />
        </g>
        <g data-part="processor" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <polygon points="54.24,41.04 56.35,40.33 56.74,36.14 64.76,36.14 65.15,40.33 67.26,41.04 69.25,42.03 72.49,39.34 78.16,45.01 75.47,48.25 76.46,50.24 77.17,52.35 81.36,52.74 81.36,60.76 77.17,61.15 76.46,63.26 75.47,65.25 78.16,68.49 72.49,74.16 69.25,71.47 67.26,72.46 65.15,73.17 64.76,77.36 56.74,77.36 56.35,73.17 54.24,72.46 52.25,71.47 49.01,74.16 43.34,68.49 46.03,65.25 45.04,63.26 44.33,61.15 40.14,60.76 40.14,52.74 44.33,52.35 45.04,50.24 46.03,48.25 43.34,45.01 49.01,39.34 52.25,42.03" />
          <circle cx="60.75" cy="56.75" r="10.5" />
        </g>
        <circle data-part="activity" cx="60.75" cy="56.75" r="7.8" fill="#0F62FE" />
      </svg>
    </span>
  );
}
