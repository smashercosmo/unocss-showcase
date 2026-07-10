import React from "@vitejs/plugin-react";
import cssVariablesToThemeObjectVitePlugin from "@unocss-box-component/css-variables-to-theme-object-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [
      cssVariablesToThemeObjectVitePlugin({
        sourceCssFilePath: "./src/tokens.css",
        outputTsFilePath: "./src/tokens.ts",
      }),
      React(),
    ],
    resolve: {
      tsconfigPaths: true,
    },
  };
});
