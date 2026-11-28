const functionPath = "M51 42C46 38 43 41 41.5 47L37.5 67C36.5 72 34 74 31.5 71.5M35.5 53H49";
const inputPath = "M63 51 75 64M75 51 63 64";

export function ServerlessFunctionGlyph({ motion = "idle" }: { motion?: "idle" | "flow" }) {
  return (
    <span className="architecture-glyph serverless-function-glyph" data-motion={motion} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 136 100" data-narys-primitive="serverless-function">
        <g data-part="enclosure" fill="#FFFFFF" stroke="#262626" strokeWidth="1.25" strokeLinejoin="miter">
          <path d="M22 22 36.5 7.5H114V77L99.5 91.5H22Z" />
          <path d="M22 22H99.5L114 7.5M99.5 22V91.5" fill="none" />
        </g>
        <g data-part="function-symbol" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round">
          <path d={functionPath} />
          <path d="M58 42Q49 57 58 72M81 42Q90 57 81 72" />
          <path d={inputPath} />
        </g>
        <g fill="none" stroke="#0F62FE" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round">
          <path data-part="execution-activity" d={functionPath} />
          <path data-part="input-activity" d={inputPath} opacity="0" />
        </g>
      </svg>
    </span>
  );
}
