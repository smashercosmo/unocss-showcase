/// <reference types="vitest" />
/// <reference types="vite/client" />

import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      sourcemap: "hidden" as const,
    },
    plugins: [UnoCSS(), React()],
  };
});
