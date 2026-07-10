// eslint-disable-next-line import/no-unresolved
import "../src/tokens.css";

import addonDocs from "@storybook/addon-docs";
import { definePreview} from "@storybook/react-vite";

/**
 * path aliases for css fjles unfortunately
 * are not supported as of now by the vite-tsconfig-paths plugin
 * https://github.com/aleclarson/vite-tsconfig-paths/tree/eec0e9eb646d8122bdf5a352f22090ded6d18569?tab=readme-ov-file#%EF%B8%8F-css-imports-are-not-supported
 */

export default definePreview({
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story, context) => {
      const isFullscreen =
        context.globals.layout === "fullscreen" ||
        context.parameters.layout === "fullscreen";
      return (
        <div style={{ padding: isFullscreen ? "2rem" : undefined}}>
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
  addons: [addonDocs()],
});
