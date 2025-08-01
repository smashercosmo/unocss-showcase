import { variantBreakpoints } from "@unocss/preset-mini/variants";
import { defineConfig, presetAttributify } from "unocss";

import {
  alignment,
  border,
  color,
  display,
  flex,
  gap,
  inset,
  position,
  radius,
  size,
  space,
} from "./unocss/rules";
import { theme } from "./unocss/theme";
import { convertAttributeSelectorToClassSelector } from "./unocss/utils/convertAttributeSelectorToClassSelector";
import { generateCssVariablesFromTheme } from "./unocss/utils/generateCssVariablesFromTheme.ts";

const breakpoints = Object.keys(theme.breakpoints);
const colors = Object.keys(theme.colors);

function generateColorClasses(props: string[]) {
  const classes: string[] = [];
  for (const color of colors) {
    for (const prop of props) {
      classes.push(`${prop}-${color}`);
    }
  }
  return classes;
}

function generateColorAttributes(props: string[]) {
  const classes: string[] = [];
  for (const breakpoint of breakpoints) {
    for (const prop of props) {
      classes.push(`${breakpoint}:${prop}`);
    }
  }
  return classes;
}

export default defineConfig({
  extendTheme() {
    return theme;
  },
  presets: [
    presetAttributify({
      ignoreAttributes: generateColorAttributes([
        "color",
        "border-color",
        "background-color",
      ]),
    }),
  ],
  variants: [variantBreakpoints()],
  rules: [
    flex,
    color,
    position,
    gap,
    size,
    inset,
    space,
    alignment,
    border,
    radius,
    display,
  ],
  safelist: generateColorClasses(["color", "border-color", "background-color"]),
  postprocess(utilities) {
    utilities.selector = convertAttributeSelectorToClassSelector(
      utilities.selector,
    );
  },
  extractorDefault: false,
  preflights: [
    {
      getCSS: () =>
        generateCssVariablesFromTheme({ theme, layer: "new-tokens" }),
    },
  ],
});
