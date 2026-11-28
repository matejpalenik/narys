export function ComputeUnitGlyph({ motion = "idle" }: { motion?: "idle" | "flow" }) {
  return (
    <span className="architecture-glyph compute-unit-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" fill="none" role="img" aria-label="Compute unit">
        <g data-part="pins" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M46 32H32L28 36V40H34V37H44Z" />
          <path d="M40 47H26L22 51V55H28V52H38Z" />
          <path d="M34 62H20L16 66V70H22V67H32Z" />
          <path d="M106 32H120L124 36V40H118V37H104Z" />
          <path d="M100 47H114L118 51V55H112V52H98Z" />
          <path d="M94 62H108L112 66V70H106V67H92Z" />
        </g>
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M29 70 49 22H111V32L91 80H29Z" />
          <path d="M29 70 49 22H111L91 70Z" />
          <path d="M91 70V80" />
        </g>
        <path data-part="processor" d="M47 61 60 31H94L81 61Z" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter" />
        <path data-part="activity" d="M51 58 61.9 34H89.7L79.3 58Z" fill="#0F62FE" />
      </svg>
    </span>
  );
}
