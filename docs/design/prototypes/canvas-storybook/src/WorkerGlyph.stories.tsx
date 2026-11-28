import { useState, type CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WorkerGlyph, type WorkerMotion } from "./WorkerGlyph";
import { Button } from "./components/ui/button";

function WorkerExample({ title, initial }: { title: string; initial: WorkerMotion }) {
  const [motion, setMotion] = useState(initial);
  const [startOffset, setStartOffset] = useState(initial === "paused" ? "-1800ms" : "0ms");

  return (
    <section className="worker-primitive-example" aria-label={title}>
      <h2>{title}</h2>
      <div className="worker-primitive-art" style={{ "--worker-start-offset": startOffset } as CSSProperties}>
        <WorkerGlyph motion={motion} />
      </div>
      <p>State <output>{motion}</output></p>
      <div className="worker-primitive-actions">
        <Button type="button" variant="outline" size="sm"
          onClick={() => setMotion(motion === "processing" ? "paused" : "processing")}>
          {motion === "processing" ? "Pause" : motion === "paused" ? "Resume" : "Start"}
        </Button>
        <Button type="button" variant="ghost" size="sm" disabled={motion === "idle"}
          onClick={() => { setMotion("idle"); setStartOffset("0ms"); }}>
          Reset to idle
        </Button>
      </div>
    </section>
  );
}

function MotionSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Worker processing cycle</h1>
          <p>Illustrative processing · no runtime data</p>
        </header>
        <div className="worker-primitive-examples">
          <WorkerExample title="Idle" initial="idle" />
          <WorkerExample title="Processing" initial="processing" />
          <WorkerExample title="Paused mid-cycle" initial="paused" />
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Worker primitive", component: MotionSpecimen } satisfies Meta<typeof MotionSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const MotionStates: Story = {};
