/// <reference types="vitest" />
/// <reference types="vite/client" />

import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
    plugins: [
      UnoCSS(),
      React(),
    ],
    test: {
      clearMocks: true,
      environment: "jsdom",
      include: [
        "./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "./unocss/**/*.{test,spec}.{ts,tsx}",
      ],
      css: false,
      globals: true,
      retryTimes: 2,
    },
  };
});
