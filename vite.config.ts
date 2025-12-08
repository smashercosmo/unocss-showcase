/// <reference types="vitest" />
/// <reference types="vite/client" />

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      sourcemap: "hidden" as const,
    },
    plugins: [
      UnoCSS({ configFile: resolve(__dirname, "./uno/config.ts") }),
      React(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@uno": resolve(__dirname, "./uno"),
      },
    },
  };
});
