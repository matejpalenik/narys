import type { Meta, StoryObj } from "@storybook/react-vite";
import { EventBusGlyph } from "./EventBusGlyph";
import { IllustrationPlayback } from "./IllustrativeFlow";

function EventBusSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Event Bus illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="event-bus-static">
            <h2 id="event-bus-static">Static</h2>
            <EventBusGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="event-bus-distribution">
            <h2 id="event-bus-distribution">Event distribution</h2>
            <IllustrationPlayback subject="event distribution" loop>
              <EventBusGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Event Bus primitive", component: EventBusSpecimen } satisfies Meta<typeof EventBusSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const EventDistribution: Story = {};
