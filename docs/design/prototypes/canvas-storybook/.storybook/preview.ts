import type { Preview } from "@storybook/react-vite";
import "@fontsource-variable/geist";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@xyflow/react/dist/style.css";
import "../src/workspace.css";
import "../src/schematic.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    options: { storySort: { order: ["Narys", ["Architecture canvas", "Canvas specimen", "Illustrations", "Archive (deprecated)"]] } },
  },
};

export default preview;
