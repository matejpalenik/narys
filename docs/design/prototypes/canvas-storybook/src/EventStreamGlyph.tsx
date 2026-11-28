const recordHighlightPositions = [18, 37, 56, 75, 94];

export function EventStreamGlyph({ operation = "idle" }: { operation?: "idle" | "read" | "append" }) {
  return (
    <span className="architecture-glyph event-stream-glyph" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" data-narys-primitive="event-stream" data-operation={operation}>
        <title>{operation === "idle" ? "Event stream" : `Illustrative event stream ${operation}`}</title>
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M8 36 20 24H128V66L116 78H8Z" />
          <path d="M8 36H116L128 24M116 36V78" fill="none" />
        </g>
        <g data-part="stream-axis" fill="none" stroke="#262626" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M16 68H108M103 64L108 68 103 72" />
          <path d="M23 66V70M42 66V70M61 66V70M80 66V70M99 66V70" strokeWidth="0.85" />
        </g>
        <g data-part="retained-records" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25">
          <rect x="16" y="46" width="14" height="12" />
          <rect x="35" y="46" width="14" height="12" />
          <rect x="54" y="46" width="14" height="12" />
          <rect x="73" y="46" width="14" height="12" />
        </g>
        {operation !== "append" && (
          <rect data-part="tail-record" x="92" y="46" width="14" height="12" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" />
        )}
        {operation === "idle" && <rect data-part="activity" x="94" y="48" width="10" height="8" fill="#0F62FE" />}
        {operation === "read" && (
          <>
            <g data-part="record-highlights">
              {recordHighlightPositions.map((x, index) => (
                <rect key={x} data-part="activity" data-record={index + 1} x={x} y="48" width="10" height="8"
                  fill="#0F62FE" opacity={index === 0 ? 1 : 0} />
              ))}
            </g>
            <g data-part="read-cursor">
              <path d="M19 39H27L23 43Z" fill="#0F62FE" />
            </g>
          </>
        )}
        {operation === "append" && (
          <g data-part="appended-record">
            <rect x="92" y="46" width="14" height="12" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" />
            <rect data-part="activity" x="94" y="48" width="10" height="8" fill="#0F62FE" />
          </g>
        )}
      </svg>
    </span>
  );
}
