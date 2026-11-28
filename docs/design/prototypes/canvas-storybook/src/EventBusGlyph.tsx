export function EventBusGlyph({ motion = "idle", draw = false }: { motion?: "idle" | "flow"; draw?: boolean }) {
  return (
    <span className="architecture-glyph event-bus-glyph" data-motion={motion} data-draw={draw || undefined} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100">
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M8 28 22.5 13.5H128V73.5L113.5 88H8Z" pathLength={draw ? 1 : undefined} />
          <path d="M8 28H113.5L128 13.5M113.5 28V88" fill="none" />
        </g>
        <g data-part="distribution-rail" fill="none" stroke="#262626" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M27 48H101M101 44V52" />
          <path d="M43 48V69M67 48V69M91 48V69" />
          <path d="M39.5 65.5 43 69 46.5 65.5M63.5 65.5 67 69 70.5 65.5M87.5 65.5 91 69 94.5 65.5" />
        </g>
        <g data-part="event-ports" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25">
          <rect x="16" y="42" width="11" height="12" />
          <rect x="38" y="71" width="10" height="9" />
          <rect x="62" y="71" width="10" height="9" />
          <rect x="86" y="71" width="10" height="9" />
        </g>
        <g data-part="activity" fill="#0F62FE" stroke="none">
          <rect data-part="published-event" x="18" y="44" width="7" height="8" />
          <path data-part="rail-activity" d="M27 48H101" pathLength="100" fill="none" stroke="#0F62FE" strokeWidth="1.65" />
          <g data-part="fanout-activity" opacity="0" fill="none" stroke="#0F62FE" strokeWidth="1.65" strokeLinecap="square" strokeLinejoin="miter">
            <path data-part="branch" d="M43 48V69" pathLength="100" />
            <path data-part="branch" d="M67 48V69" pathLength="100" />
            <path data-part="branch" d="M91 48V69" pathLength="100" />
            <path data-part="fanout-arrowheads" d="M39.5 65.5 43 69 46.5 65.5M63.5 65.5 67 69 70.5 65.5M87.5 65.5 91 69 94.5 65.5" />
          </g>
          <g data-part="delivered-events" opacity="0">
            <rect x="40" y="73" width="6" height="5" />
            <rect x="64" y="73" width="6" height="5" />
            <rect x="88" y="73" width="6" height="5" />
          </g>
        </g>
      </svg>
    </span>
  );
}
