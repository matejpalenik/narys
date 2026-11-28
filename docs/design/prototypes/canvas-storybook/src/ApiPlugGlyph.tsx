type ApiInvocationMotion = "idle" | "flow" | "paused";

export function ApiPlugGlyph({ motion = "idle" }: { motion?: ApiInvocationMotion }) {
  return (
    <span className="architecture-glyph api-plug-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" fill="none">
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M22 25 36.5 10.5H114V75L99.5 89.5H22Z" />
          <path d="M22 25H99.5L114 10.5M99.5 25V89.5" fill="none" />
        </g>
        <g data-part="connector" transform="rotate(-35 60.75 57.25)" stroke="#262626" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="square">
          <g data-part="plug" fill="#FFFFFF">
            <path d="M24 57.25H32" fill="none" />
            <rect x="48" y="50.5" width="10" height="3.5" />
            <rect x="48" y="60.5" width="10" height="3.5" />
            <path d="M48 46.25H43a11 11 0 0 0 0 22H48Z" />
          </g>
          <g data-part="socket" fill="#FFFFFF">
            <path d="M89 57.25H97" fill="none" />
            <path d="M73 46.25H78a11 11 0 0 1 0 22H73Z" />
            <path data-part="contacts" d="M75.5 52.25H79.5M75.5 62.25H79.5" stroke="#0F62FE" strokeWidth="1.5" fill="none" />
          </g>
          <path data-part="activity" d="M60.5 47.5V67" stroke="#0F62FE" strokeWidth="1.65" opacity="0" />
        </g>
      </svg>
    </span>
  );
}
