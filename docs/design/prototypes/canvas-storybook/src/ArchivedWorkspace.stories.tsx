import type { Meta, StoryObj } from "@storybook/react-vite";
import { Workspace } from "./Workspace";

const meta = {
  title: "Narys/Archive (deprecated)/Architecture canvas",
  component: Workspace,
  tags: ["deprecated"],
  args: { scenario: "ready", startWithChange: true },
} satisfies Meta<typeof Workspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DarkFocused: Story = { name: "Dark · Graphite", args: { direction: "dark" } };
export const DarkIndustrial: Story = { name: "Dark · Graphite industrial", args: { direction: "dark", look: "industrial" } };
export const DarkBlueprint: Story = { name: "Dark · Blueprint", args: { direction: "dark", look: "blueprint" } };
export const LightCarbon: Story = { name: "Early light · Carbon palette", args: { direction: "light", look: "carbon" } };
export const LightCompact: Story = { name: "Early light · Compact", args: { direction: "light" } };
export const CheckingMerges: Story = { args: { direction: "dark", scenario: "checking", startWithChange: false } };
export const EarlierMergeGap: Story = { args: { direction: "dark", scenario: "gap", startWithChange: false } };
