import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/*.stories.tsx"],
  framework: "@storybook/react-vite",
  core: {
    disableTelemetry: true,
    allowedHosts: ["cytoplasm-erratic-cache.ngrok-free.dev"],
  },
  viteFinal: (vite) => ({ ...vite, plugins: [...(vite.plugins ?? []), tailwindcss()] }),
};

export default config;
