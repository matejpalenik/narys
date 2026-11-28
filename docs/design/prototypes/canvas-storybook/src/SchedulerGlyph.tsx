export function SchedulerGlyph({ motion = "idle" }: { motion?: "idle" | "flow" }) {
  return (
    <span className="architecture-glyph scheduler-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" data-narys-illustration="scheduler">
        <title>Scheduler</title>
        <desc>A clock face inside a technical enclosure, representing time-based work triggers.</desc>
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M22 22 36.5 7.5H114V77L99.5 91.5H22Z" />
          <path d="M22 22H99.5L114 7.5M99.5 22V91.5" fill="none" />
        </g>
        <g data-part="clock-face" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25">
          <circle cx="60.75" cy="56.75" r="23" />
          <path d="M60.75 37.25V41.25M80.25 56.75H76.25M60.75 76.25V72.25M41.25 56.75H45.25" fill="none" />
          <path d="M60.75 56.75H70.75" strokeWidth="1.65" fill="none" />
        </g>
        <g data-part="clock-hand">
          <path d="M60.75 56.75V43.5" fill="none" stroke="#0F62FE" strokeWidth="1.8" />
        </g>
        <circle cx="60.75" cy="56.75" r="1.7" fill="#262626" />
        <path data-part="trigger" d="M60.75 37.25V41.25" fill="none" stroke="#0F62FE" strokeWidth="2.5" opacity="0" />
      </svg>
    </span>
  );
}
