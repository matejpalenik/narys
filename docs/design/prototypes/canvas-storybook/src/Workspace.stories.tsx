import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentsWorkspace } from "./PaymentsWorkspace";

const meta = {
  title: "Narys/Architecture canvas",
  component: PaymentsWorkspace,
  parameters: { layout: "fullscreen" },
  args: { scenario: "ready", startWithChange: true },
} satisfies Meta<typeof PaymentsWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

const schematic = { direction: "light", look: "carbon", schematic: true } as const;
export const PaymentsOverview: Story = { name: "Payments · Return after a merge", args: { ...schematic, startWithChange: false } };
export const PaymentsCheckingMerges: Story = { args: { ...schematic, scenario: "checking", startWithChange: false } };
export const PaymentsAnalysisGap: Story = { args: { ...schematic, scenario: "gap", startWithChange: false } };
export const PaymentsDependentGap: Story = {
  name: "Payments · Later merge awaiting evidence",
  args: { ...schematic, scenario: "dependentGap", startWithChange: false },
};
export const PaymentsExploration: Story = { args: { ...schematic, startAtContext: true, startWithChange: false } };
export const PaymentsWorkerDetail: Story = { args: { ...schematic, startAtWorker: true } };
export const PaymentsReducedMotion: Story = {
  name: "Payments · Reduced motion",
  args: { ...schematic, startAtWorker: true },
  beforeEach: () => {
    const original = window.matchMedia;
    const preference = "(prefers-reduced-motion: reduce)";
    const reduced = original.call(window, preference);
    Object.defineProperty(reduced, "matches", { configurable: true, value: true });
    window.matchMedia = query => query === preference ? reduced : original.call(window, query);
    return () => { window.matchMedia = original; };
  },
  play: ({ canvasElement }) => {
    const sequence = canvasElement.querySelector<HTMLElement>(".illustration-playback");
    if (!sequence?.textContent?.includes("static for reduced motion") || sequence.hasAttribute("data-playing")
      || sequence.querySelector(".illustration-controls button") || !sequence.querySelector(".retry-summary")?.textContent
      || sequence.getAnimations({ subtree: true }).some(animation => animation.playState === "running")) {
      throw new Error("Reduced motion must leave the supported retry sequence readable and static.");
    }
  },
};
export const PaymentsChangeReview: Story = { args: schematic };
export const PublicWorkspace: Story = { args: { ...schematic, scenario: "public" } };
