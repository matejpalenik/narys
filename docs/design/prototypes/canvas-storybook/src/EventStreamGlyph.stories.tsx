import type { Meta, StoryObj } from "@storybook/react-vite";
import { EventStreamGlyph } from "./EventStreamGlyph";
import { IllustrationPlayback } from "./IllustrativeFlow";

function EventStreamSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Event stream illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="stream-static">
            <h2 id="stream-static">Static</h2>
            <EventStreamGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="stream-read">
            <h2 id="stream-read">Read</h2>
            <IllustrationPlayback subject="read" loop>
              <EventStreamGlyph operation="read" />
            </IllustrationPlayback>
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="stream-append">
            <h2 id="stream-append">Append</h2>
            <IllustrationPlayback subject="append" loop>
              <EventStreamGlyph operation="append" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Illustrations/Event Stream", id: "narys-event-stream-primitive", component: EventStreamSpecimen } satisfies Meta<typeof EventStreamSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Operations: Story = {};
