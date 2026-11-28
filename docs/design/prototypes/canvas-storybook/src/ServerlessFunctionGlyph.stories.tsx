import type { Meta, StoryObj } from "@storybook/react-vite";
import { IllustrationPlayback } from "./IllustrativeFlow";
import { ServerlessFunctionGlyph } from "./ServerlessFunctionGlyph";

function ServerlessFunctionSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Serverless function illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="function-static">
            <h2 id="function-static">Static</h2>
            <ServerlessFunctionGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="function-invocation">
            <h2 id="function-invocation">Invocation cycle</h2>
            <IllustrationPlayback subject="invocation cycle" loop>
              <ServerlessFunctionGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Illustrations/Serverless Function", id: "narys-serverless-function-primitive", component: ServerlessFunctionSpecimen } satisfies Meta<typeof ServerlessFunctionSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const InvocationCycle: Story = {};
