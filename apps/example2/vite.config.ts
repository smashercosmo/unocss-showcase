import React from "@vitejs/plugin-react";
import cssVariablesToThemeObjectVitePlugin from "@unocss-box-component/css-variables-to-theme-object-vite-plugin";
import { defineConfig } from "vite";
import { unocssBoxComponentVitePlugin } from "unocss-box-component-vite-plugin/plugin";
import { descriptors } from "./src/descriptors";

export default defineConfig(() => {
  return {
    plugins: [
      cssVariablesToThemeObjectVitePlugin({
        sourceCssFilePath: "./src/tokens.css",
        outputTsFilePath: "./src/tokens.ts",
      }),
      unocssBoxComponentVitePlugin({
        tokensCssFilePath: "./src/tokens.css",
        descriptors: Object.values(descriptors),
        components: ["Box", "Grid", "Slack"],
        safelist: [],
      }),
      React(),
    ],
    resolve: {
      tsconfigPaths: true,
    },
  };
});




