import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApiPlugGlyph } from "./ApiPlugGlyph";
import { IllustrationPlayback } from "./IllustrativeFlow";

function InvocationSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>API invocation</h1>
          <p>Illustrative invocation · no runtime data</p>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-label="Disconnected">
            <h2>Disconnected</h2>
            <ApiPlugGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-label="Invocation cycle">
            <h2>Invocation cycle</h2>
            <IllustrationPlayback subject="invocation" loop>
              <ApiPlugGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
          <section className="specimen-family motion-primitive-example" aria-label="Paused at contact">
            <h2>Paused at contact</h2>
            <div style={{ "--api-start-offset": "-1400ms" } as CSSProperties}>
              <ApiPlugGlyph motion="paused" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/API primitive", component: InvocationSpecimen } satisfies Meta<typeof InvocationSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const InvocationCycle: Story = {};
