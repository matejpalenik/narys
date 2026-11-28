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

const schematic = { direction: "light", look: "carbon", schematic: true } as const;
export const PaymentsOverview: Story = { name: "Payments · Return after a merge", args: { ...schematic, startWithChange: false } };
export const PaymentsCheckingMerges: Story = { args: { ...schematic, scenario: "checking", simulateAnalysis: true, startWithChange: false } };
export const PaymentsAnalysisGap: Story = { args: { ...schematic, scenario: "gap", startWithChange: false } };
export const PaymentsExploration: Story = { args: { ...schematic, startAtContext: true, startWithChange: false } };
export const PaymentsWorkerDetail: Story = { args: { ...schematic, startAtWorker: true } };
export const PaymentsChangeReview: Story = { args: schematic };
export const PublicWorkspace: Story = { args: { ...schematic, scenario: "public" } };
