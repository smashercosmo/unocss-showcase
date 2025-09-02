/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { defineConfig, loadEnv } from "vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = env.PORT ? Number(env.PORT) : 3000;

  return {
    server: {
      port,
    },
    preview: {
      port,
    },
    build: {
      outDir: "build",
      sourcemap: "hidden" as const,
    },
    plugins: [
      UnoCSS(),
      React({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
      bundleStats(),
      visualizer({
        filename: "build/bundle-analysis.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
        template: "treemap", // sunburst, treemap, network, raw-data, list, flamegraph
      }),
      svgr({
        esbuildOptions: {
          loader: "tsx",
        },
        svgrOptions: {
          typescript: true,
          jsxRuntime: "automatic",
          ref: true,
          svgo: true,
          svgoConfig: {
            multipass: true,
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              "removeStyleElement",
              "prefixIds",
            ],
          },
          svgProps: {
            "aria-hidden": "true",
            focusable: "false",
          },
        },
      }),
      Fonts(),
      prismjsPlugin({
        languages: ["js", "py"],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@icons": path.resolve(__dirname, "./src/assets/icons"),
        "@uno": path.resolve(__dirname, "./uno"),
      },
    },
    test: {
      clearMocks: true,
      environment: "jsdom",
      setupFiles: ["./src/tests/setup-tests.ts"],
      include: [
        "./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "./uno/**/*.{test,spec}.{ts,tsx}",
      ],
      css: false,
      globals: true,
      retryTimes: 2,
      coverage: {
        exclude: [
          ".storybook/**",
          "storybook-static/**",
          "test-results/**",
          "build/**",
          "src/assets/**",
          "src/tests/**",
          "coverage/**",
          "dist/**",
          "playwright-report/**",
          "public/**",
          "**/node_modules/**",
          "**/[.]**",
          "packages/*/test?(s)/**",
          "**/*.d.ts",
          "**/virtual:*",
          "**/__x00__*",
          "**/\x00*",
          "cypress/**",
          "test?(s)/**",
          "test?(-*).?(c|m)[jt]s?(x)",
          "**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)",
          "**/__tests__/**",
          "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier,playwright}.config.*",
          "**/vitest.{workspace,projects}.[jt]s?(on)",
          "**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
        ],
        reporter: ["text", "lcov"],
      },
    },
  };
});
