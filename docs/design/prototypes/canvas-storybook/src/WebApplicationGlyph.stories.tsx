import type { Meta, StoryObj } from "@storybook/react-vite";
import { IllustrationPlayback } from "./IllustrativeFlow";
import { WebApplicationGlyph } from "./WebApplicationGlyph";

function WebApplicationSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Web Application illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="web-application-static">
            <h2 id="web-application-static">Static</h2>
            <WebApplicationGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="web-application-loading">
            <h2 id="web-application-loading">Page loading</h2>
            <IllustrationPlayback subject="page loading" loop>
              <WebApplicationGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Web Application primitive", component: WebApplicationSpecimen } satisfies Meta<typeof WebApplicationSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const PageLoading: Story = {};
