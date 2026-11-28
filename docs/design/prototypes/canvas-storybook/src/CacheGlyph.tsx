export type CacheOperation = "hit" | "miss" | "write";

export function CacheGlyph({ operation }: { operation?: CacheOperation }) {
  return (
    <span className="architecture-glyph cache-glyph" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100"
        data-narys-primitive={operation && "cache"} data-operation={operation}>
        <title>{operation ? `Cache ${operation}` : "Cache"}</title>
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M10 32 22 20H130V58L118 70H73V65H63V70H10Z" />
          <path d="M10 32H118L130 20M118 32V70" fill="none" />
        </g>
        <g data-part="memory-blocks" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25">
          <rect x="18" y="38" width="26" height="22" />
          <rect x="51" y="38" width="26" height="22" />
          <rect x="84" y="38" width="26" height="22" />
        </g>
        <g data-part="contacts" stroke="#262626" strokeWidth="1.25" fill="none">
          <path d="M19 64V70M26 64V70M33 64V70M40 64V70M47 64V70M54 64V70M81 64V70M88 64V70M95 64V70M102 64V70M109 64V70" />
        </g>
        <rect data-part="cache-hit" x="86" y="40" width="22" height="18" fill="#0F62FE" opacity="0" />
        <path data-part="activity" d="M65 39.5 57.5 50H64L61 58.5 71.5 46.5H65.5L69 39.5Z" fill="#0F62FE" />
        {operation === "miss" && (
          <>
            <g data-part="lookup" fill="none" stroke="#0F62FE" strokeWidth="1.5">
              <rect data-part="scan-1" x="20" y="40" width="22" height="18" opacity="0" />
              <rect data-part="scan-2" x="53" y="40" width="22" height="18" opacity="0" />
              <rect data-part="scan-3" x="86" y="40" width="22" height="18" opacity="0" />
            </g>
            <path data-part="miss-marker" d="M92 44L102 54M102 44L92 54" fill="none" stroke="#525252" strokeWidth="1.65" opacity="0" />
          </>
        )}
        {operation === "write" && (
          <rect data-part="write-packet" x="86" y="8" width="22" height="18" fill="#0F62FE" opacity="0" />
        )}
      </svg>
    </span>
  );
}
