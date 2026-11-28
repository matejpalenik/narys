import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeChangeWorkspace } from "./CodeChangeWorkspace";
import { flaskReview } from "./flask-reference";

const meta = { title: "Narys/Architecture canvas/Flask", component: CodeChangeWorkspace } satisfies Meta<typeof CodeChangeWorkspace>;
export default meta;
type Story = StoryObj<typeof meta>;
export const JsonProviderChange: Story = { name: "PR #4692 · JSON provider", args: { comparison: flaskReview() } };
export const PossibleDivergence: Story = { name: "PR #4692 · Possible divergence", args: { comparison: flaskReview(true) } };
