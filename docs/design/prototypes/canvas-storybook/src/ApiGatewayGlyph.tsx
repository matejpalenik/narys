const routes = [
  { id: 1, path: "M54 56H67V38H82", contacts: "M85 35.5H89M85 40.5H89" },
  { id: 2, path: "M54 56H82", contacts: "M85 53.5H89M85 58.5H89" },
  { id: 3, path: "M54 56H67V74H82", contacts: "M85 71.5H89M85 76.5H89" },
] as const;

const ingressContacts = "M35 51H41M35 61H41";

export function ApiGatewayGlyph({ motion = "idle" }: { motion?: "idle" | "flow" }) {
  const animated = motion === "flow";

  return (
    <span className="architecture-glyph api-gateway-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" fill="none">
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M12 24 26.5 9.5H122.5V73.5L108 88H12Z" />
          <path d="M12 24H108L122.5 9.5M108 24V88" fill="none" />
        </g>
        <g data-part="routes" fill="none" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter" strokeLinecap="square">
          <path d="M20 56H32M54 56H67V38H82M67 56H82M67 56V74H82" />
        </g>
        <g data-part="ingress" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="round">
          <path d="M32 43H41a13 13 0 0 1 0 26H32Z" />
          <path d={ingressContacts} stroke={animated ? "#262626" : "#0F62FE"}
            strokeWidth={animated ? "1.25" : "1.65"} fill="none" />
        </g>
        <g data-part="endpoints" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="round">
          <path data-part="endpoint-1" d="M82 31H94a7 7 0 0 1 0 14H82Z" />
          <path data-part="endpoint-2" d="M82 49H94a7 7 0 0 1 0 14H82Z" />
          <path data-part="endpoint-3" d="M82 67H94a7 7 0 0 1 0 14H82Z" />
          <path d="M85 35.5H89M85 40.5H89M85 53.5H89M85 58.5H89M85 71.5H89M85 76.5H89" fill="none" />
        </g>
        {animated ? (
          <g stroke="#0F62FE" strokeWidth="1.65" fill="none" strokeLinecap="square" strokeLinejoin="miter">
            <path data-part="ingress-activity" d={ingressContacts} opacity="0" />
            {routes.map(({ id, path, contacts }) => (
              <g key={id} data-route={id}>
                <path data-part="route-activity" d={path} pathLength="100" opacity="0" />
                <path data-part="endpoint-activity" d={contacts} opacity="0" />
              </g>
            ))}
          </g>
        ) : (
          <>
            <path data-part="active-route" d={routes[0].path} stroke="#0F62FE" strokeWidth="1.65"
              strokeLinecap="square" strokeLinejoin="miter" fill="none" />
            <path data-part="activity" d={routes[0].contacts} stroke="#0F62FE" strokeWidth="1.65" fill="none" />
          </>
        )}
      </svg>
    </span>
  );
}
