import type { Meta, StoryObj } from "@storybook/react-vite";
import { CacheGlyph, type CacheOperation } from "./CacheGlyph";
import { IllustrationPlayback } from "./IllustrativeFlow";

const operations: readonly CacheOperation[] = ["hit", "miss", "write"];

function CacheSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Cache illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="cache-static">
            <h2 id="cache-static">Static</h2>
            <CacheGlyph />
          </section>
          {operations.map(operation => (
            <section key={operation} className="specimen-family motion-primitive-example" aria-labelledby={`cache-${operation}`}>
              <h2 id={`cache-${operation}`}>Cache {operation}</h2>
              <IllustrationPlayback subject={`cache ${operation}`} loop>
                <CacheGlyph operation={operation} />
              </IllustrationPlayback>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Illustrations/Cache", id: "narys-cache-primitive", component: CacheSpecimen } satisfies Meta<typeof CacheSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Operations: Story = {};
