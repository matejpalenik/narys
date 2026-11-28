import type { Meta, StoryObj } from "@storybook/react-vite";
import { Workspace } from "./Workspace";

const meta = {
  title: "Narys/Architecture canvas",
  component: Workspace,
  parameters: { layout: "fullscreen" },
  args: { scenario: "ready", startWithChange: true },
} satisfies Meta<typeof Workspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DarkFocused: Story = { name: "Dark · Graphite", args: { direction: "dark" } };
export const DarkIndustrial: Story = { name: "Dark · Graphite industrial", args: { direction: "dark", look: "industrial" } };
export const DarkBlueprint: Story = { name: "Dark · Blueprint", args: { direction: "dark", look: "blueprint" } };
export const LightCarbon: Story = { name: "Light · Carbon palette", args: { direction: "light", look: "carbon" } };
export const LightCompact: Story = { args: { direction: "light" } };
export const CheckingMerges: Story = { args: { direction: "dark", scenario: "checking", startWithChange: false } };
export const EarlierMergeGap: Story = { args: { direction: "dark", scenario: "gap", startWithChange: false } };
export const PublicWorkspace: Story = { args: { direction: "light", scenario: "public" } };

const schematic = { direction: "light", look: "carbon", schematic: true } as const;
export const PaymentsOverview: Story = { args: { ...schematic, startWithChange: false } };
export const PaymentsWorkerDetail: Story = { args: { ...schematic, startAtWorker: true } };
export const PaymentsChangeReview: Story = { args: schematic };
