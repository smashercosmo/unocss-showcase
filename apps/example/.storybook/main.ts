// This file has been automatically migrated to valid ESM format by Storybook.
import { defineMain } from "@storybook/react-vite/node";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineMain({
  stories: [resolve(__dirname, "..", "./**/*.stories.tsx")],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    experimentalReactComponentMeta: true,
    experimentalCodeExamples: true,
  },
});
