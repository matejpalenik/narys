import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApiGatewayGlyph } from "./ApiGatewayGlyph";
import { IllustrationPlayback } from "./IllustrativeFlow";

function ApiGatewaySpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>API Gateway illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="gateway-static">
            <h2 id="gateway-static">Static</h2>
            <ApiGatewayGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="gateway-routing">
            <h2 id="gateway-routing">Request routing</h2>
            <IllustrationPlayback subject="routing" loop>
              <ApiGatewayGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/API Gateway primitive", component: ApiGatewaySpecimen } satisfies Meta<typeof ApiGatewaySpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const RequestRouting: Story = {};
