import type { Meta, StoryObj } from "@storybook/react-vite";
import { IllustrationPlayback } from "./IllustrativeFlow";
import { SchedulerGlyph } from "./SchedulerGlyph";

function SchedulerSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Scheduler illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="scheduler-static">
            <h2 id="scheduler-static">Static</h2>
            <SchedulerGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="scheduler-trigger-cycle">
            <h2 id="scheduler-trigger-cycle">Trigger cycle</h2>
            <IllustrationPlayback subject="trigger cycle" loop>
              <SchedulerGlyph motion="flow" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Scheduler primitive", component: SchedulerSpecimen } satisfies Meta<typeof SchedulerSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const TriggerCycle: Story = {};
