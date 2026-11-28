export function WebApplicationGlyph({ motion = "idle" }: { motion?: "idle" | "flow" }) {
  return (
    <span className="architecture-glyph web-application-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" data-narys-illustration="web-application">
        <title>Web application</title>
        <desc>{motion === "flow" ? "Illustrative page loading and content update." : "A browser window on a computer display."}</desc>
        <g data-part="display" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M61 75V88H75V75Z" />
          <path d="M48 88H88" fill="none" />
          <rect x="14" y="10" width="108" height="65" />
          <rect x="20" y="16" width="96" height="53" />
          <path d="M20 27H116" fill="none" />
        </g>
        <g data-part="browser-chrome" fill="#262626">
          <circle cx="25.5" cy="21.5" r="1.05" />
          <circle cx="29.5" cy="21.5" r="1.05" />
          <circle cx="33.5" cy="21.5" r="1.05" />
          <path d="M43 21.5H91" fill="none" stroke="#A8A8A8" strokeWidth="1.25" />
        </g>
        <g data-part="navigation" fill="none" stroke="#262626" strokeWidth="1.25">
          <rect x="26" y="34" width="21" height="28" />
          <path d="M31 40H42M31 47H42M31 54H39" />
        </g>
        <g data-part="content" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25">
          <rect x="54" y="34" width="56" height="16" />
          <path d="M54 56H110M54 62H91" fill="none" />
        </g>
        <rect data-part="activity" x="56" y="36" width="52" height="12" fill="#0F62FE" />
        <path data-part="loading" d="M20 27H116" fill="none" stroke="#0F62FE" strokeWidth="1.8" opacity="0" />
      </svg>
    </span>
  );
}
