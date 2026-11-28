import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComputeUnitGlyph } from "./ComputeUnitGlyph";
import { IllustrationPlayback } from "./IllustrativeFlow";

function ComputeUnitSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Compute unit illustration</h1>
          <p>Illustrative processing · no runtime data</p>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-label="Static compute unit">
            <h2>Static</h2>
            <ComputeUnitGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-label="Animated compute unit">
            <h2>Processing cycle</h2>
            <IllustrationPlayback subject="processing cycle" loop>
              <ComputeUnitGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Compute unit primitive", component: ComputeUnitSpecimen } satisfies Meta<typeof ComputeUnitSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const ProcessingCycle: Story = {};
