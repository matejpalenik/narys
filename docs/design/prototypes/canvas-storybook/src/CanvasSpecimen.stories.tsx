import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArchitectureGlyph, ChangeMark, ConfidenceMark, ConnectionSample,
  connectionNames, primitiveNames, type ArchitectureChange, type ConnectionKind, type Primitive,
} from "./architecture-visuals";
import {
  ArchitectureNodeFace, SemanticIcon, TechnologyMark, semanticIcons, technologyIcons, type NodePresentation, type Technology,
} from "./ArchitectureNodeFace";
import { DensityFixture } from "./DensityFixture";
import { IllustrationPlayback } from "./IllustrativeFlow";

const primitives = Object.keys(primitiveNames) as Primitive[];
const semanticNames = Object.keys(semanticIcons) as (keyof typeof semanticIcons)[];
const technologies = Object.keys(technologyIcons) as Technology[];
const connections = Object.keys(connectionNames) as ConnectionKind[];
const states: ArchitectureChange[] = ["unchanged", "added", "modified", "removed"];

const sampleWorker: NodePresentation = {
  name: "Example worker",
  role: "Background worker",
  identity: { family: "semantic", icon: "worker" },
  element: "Container",
  responsibility: "Processes a queued job in this design specimen.",
  technology: { id: "python", source: "Technology assigned in the specimen fixture." },
};

function CanvasSpecimen() {
  return (
    <main className="narys specimen" data-direction="light" data-look="carbon" data-schematic="true">
      <div className="specimen-sheet">
        <header className="specimen-title">
          <h1>Architecture specimens</h1>
          <p>Notation and density samples for the Narys canvas.</p>
          <a href="#density-fixture">Jump to the 22-node fixture</a>
        </header>
        <section aria-labelledby="specimen-representations">
          <h2 id="specimen-representations">Representation families</h2>
          <div className="specimen-families">
            <div className="specimen-family">
              <h3>Semantic icons</h3>
              <p>Primary identity for familiar roles.</p>
              <div className="specimen-icon-set">
                {semanticNames.map((key) => <figure key={key}><SemanticIcon icon={key} /><figcaption>{semanticIcons[key].label}</figcaption></figure>)}
              </div>
            </div>
            <div className="specimen-family">
              <h3>Technology logos</h3>
              <p>Supporting metadata for evidence-backed implementation choices.</p>
              <div className="specimen-logo-set">
                {technologies.map((id) => <TechnologyMark key={id} id={id} />)}
              </div>
            </div>
            <div className="specimen-family">
              <h3>Technical illustrations</h3>
              <p>Compact and detailed forms for infrastructure and mechanisms.</p>
              <div className="specimen-infrastructure">
                {primitives.map((kind) => (
                  <figure key={kind}>
                    <figcaption>{primitiveNames[kind]}</figcaption>
                    <div className="specimen-glyph-pair">
                      <div><ArchitectureGlyph kind={kind} /><span>Compact</span></div>
                      <div><ArchitectureGlyph kind={kind} detail="detailed" /><span>Detailed</span></div>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="specimen-node-variants">
          <h2 id="specimen-node-variants">Node variants</h2>
          <div className="specimen-node-variants">
            <div><h3>Compact</h3><div className="specimen-node"><ArchitectureNodeFace node={sampleWorker} /></div></div>
            <div><h3>Detailed</h3><div className="specimen-node"><ArchitectureNodeFace node={sampleWorker} variant="detailed" change="modified" status="supported" /></div></div>
            <div><h3>Selected and keyboard focus</h3><div className="specimen-node" tabIndex={0} data-selected="true" aria-label="Selected example worker">
              <ArchitectureNodeFace node={sampleWorker} /></div></div>
          </div>
        </section>

        <section aria-labelledby="specimen-connections">
          <h2 id="specimen-connections">Relationships</h2>
          <div className="specimen-connections">
            {connections.map((kind) => <figure key={kind}><ConnectionSample kind={kind} /><figcaption>{connectionNames[kind]}</figcaption></figure>)}
          </div>
        </section>

        <section aria-labelledby="specimen-states">
          <h2 id="specimen-states">Change and evidence marks</h2>
          <div className="specimen-states">
            {states.map((change) => (
              <figure key={change} className="specimen-state" data-change={change}>
                <SemanticIcon icon="worker" />
                <figcaption><ChangeMark change={change} /></figcaption>
              </figure>
            ))}
            <figure className="specimen-state"><SemanticIcon icon="api" /><figcaption><ConfidenceMark confidence="supported" /></figcaption></figure>
            <figure className="specimen-state"><SemanticIcon icon="checkout" /><figcaption><ConfidenceMark confidence="unconfirmed" /></figcaption></figure>
          </div>
        </section>

        <section aria-labelledby="specimen-motion">
          <h2 id="specimen-motion">Change playback</h2>
          <p>One-shot motion specimen for an addition, removal, and affected element.</p>
          <IllustrationPlayback subject="change">
            <div className="specimen-change">
              <figure>
                <ArchitectureGlyph kind="bus" detail="detailed" draw />
                <figcaption><ChangeMark change="added" /></figcaption>
              </figure>
              <figure className="specimen-removal">
                <ConnectionSample kind="async" removed />
                <span className="specimen-outgoing" aria-hidden="true" />
                <figcaption><ChangeMark change="removed" /></figcaption>
              </figure>
              <figure className="specimen-propagation">
                <ArchitectureGlyph kind="gateway" detail="detailed" />
                <figcaption><ChangeMark change="modified" /></figcaption>
              </figure>
              <i className="specimen-motion-clock" aria-hidden="true" />
            </div>
          </IllustrationPlayback>
        </section>

        <section id="density-fixture" aria-labelledby="specimen-density">
          <h2 id="specimen-density">Synthetic density fixture · 22 nodes</h2>
          <p>Design-system sample. The nodes and relationships do not represent Payments or any real project.</p>
          <DensityFixture />
        </section>
      </div>
    </main>
  );
}

const meta = { title: "Narys/Canvas specimen", component: CanvasSpecimen } satisfies Meta<typeof CanvasSpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;
export const VisualLanguage: Story = {};
