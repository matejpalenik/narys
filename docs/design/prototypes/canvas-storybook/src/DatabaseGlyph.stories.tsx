import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatabaseGlyph } from "./DatabaseGlyph";
import { IllustrationPlayback } from "./IllustrativeFlow";

function DatabaseSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Database illustration</h1>
          <p>Illustrative database access · no runtime data</p>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-label="Static database">
            <h2>Static</h2>
            <DatabaseGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-label="Animated database">
            <h2>Access cycle</h2>
            <IllustrationPlayback subject="access cycle" loop>
              <DatabaseGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Database primitive", component: DatabaseSpecimen } satisfies Meta<typeof DatabaseSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const AccessCycle: Story = {};
