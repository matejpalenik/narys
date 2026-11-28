import type { Meta, StoryObj } from "@storybook/react-vite";
import { IllustrationPlayback } from "./IllustrativeFlow";
import { ObjectStorageGlyph } from "./ObjectStorageGlyph";

function ObjectStorageSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Object storage illustration</h1>
        </header>
        <div className="specimen-node-variants">
          <section className="specimen-family motion-primitive-example" aria-labelledby="storage-static">
            <h2 id="storage-static">Static</h2>
            <ObjectStorageGlyph />
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="storage-read">
            <h2 id="storage-read">Read</h2>
            <IllustrationPlayback subject="read" loop>
              <ObjectStorageGlyph operation="read" />
            </IllustrationPlayback>
          </section>
          <section className="specimen-family motion-primitive-example" aria-labelledby="storage-write">
            <h2 id="storage-write">Write</h2>
            <IllustrationPlayback subject="write" loop>
              <ObjectStorageGlyph operation="write" />
            </IllustrationPlayback>
          </section>
        </div>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Illustrations/Object storage", id: "narys-object-storage-primitive", component: ObjectStorageSpecimen } satisfies Meta<typeof ObjectStorageSpecimen>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Operations: Story = {};
