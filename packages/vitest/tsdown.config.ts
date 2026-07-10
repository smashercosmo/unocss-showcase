import { defineConfig } from "tsdown";
import { base } from "@unocss-box-component/tsdown";

export default defineConfig({...base,
  entry: ["./src/index.ts"],
});
