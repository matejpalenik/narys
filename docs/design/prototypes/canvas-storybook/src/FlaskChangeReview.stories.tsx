import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlaskChangeReview } from "./FlaskChangeReview";

const meta = { title: "Narys/Architecture canvas/Flask", component: FlaskChangeReview } satisfies Meta<typeof FlaskChangeReview>;
export default meta;

type Story = StoryObj<typeof meta>;
export const JsonProviderChange: Story = { name: "PR #4692 · JSON provider" };
