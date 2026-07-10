import { defineConfig } from "tsdown";
import { base } from "@unocss-box-component/tsdown";

export default defineConfig([
  {
    ...base,
    outDir: "./dist/component",
    tsconfig: "./tsconfig.build.json",
    entry: { component: './src/component/index.ts' },
    platform: 'browser',
  },
  {
    ...base,
    outDir: "./dist/plugin",
    tsconfig: "./tsconfig.build.json",
    entry: { plugin: './src/plugin/index.ts' },
    platform: 'node',
  },
  {
    ...base,
    outDir: "./dist/shared",
    tsconfig: "./tsconfig.build.json",
    entry: { shared: './src/shared/index.ts' },
    platform: 'neutral',
  },
])