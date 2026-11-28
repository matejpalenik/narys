export function ObjectStorageGlyph({ operation }: { operation?: "read" | "write" }) {
  return (
    <span className="architecture-glyph object-storage-glyph" data-operation={operation} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" fill="none">
        <g data-part="rim-back" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <ellipse cx="68" cy="42" rx="33" ry="10.5" fill="#FFFFFF" />
        </g>
        <g data-part="incoming-object" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <rect x="60" y="12" width="16" height="33" fill="#FFFFFF" />
          <rect data-part="activity" x="62" y="14" width="12" height="29" fill="#0F62FE" stroke="none" />
        </g>
        <path data-part="enclosure" d="M35 42 C35 47.8 49.774 52 68 52 S101 47.8 101 42 L92 87 C90.7 93 81.2 97 68 97 S45.3 93 44 87 Z"
          fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter" />
      </svg>
    </span>
  );
}
