export function DatabaseGlyph({ motion = "idle" }: { motion?: "idle" | "flow" }) {
  return (
    <span className="architecture-glyph database-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" role="img" aria-label="Database">
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M30 19V78C30 84.075 47.013 89 68 89S106 84.075 106 78V19Z" />
          <ellipse cx="68" cy="19" rx="38" ry="11" />
        </g>
        <g data-part="layers" fill="none" stroke="#262626" strokeWidth="1.25">
          <path d="M30 39C30 45.075 47.013 50 68 50S106 45.075 106 39" />
          <path d="M30 59C30 65.075 47.013 70 68 70S106 65.075 106 59" />
        </g>
        <path data-part="activity" d="M30 39C30 45.075 47.013 50 68 50S106 45.075 106 39"
          fill="none" stroke="#0F62FE" strokeWidth="2.4" pathLength="100" strokeDasharray="24 100" strokeDashoffset="-38" />
      </svg>
    </span>
  );
}
