import { variantBreakpoints } from "@unocss/preset-mini/variants";
import { defineConfig, presetAttributify } from "unocss";

import { customAttributifyExtractor } from "./unocss/customAttributifyExtractor";
import {
  alignment,
  border,
  color,
  direction,
  display,
  flex,
  gap,
  inset,
  overflow,
  position,
  radius,
  size,
  space,
} from "./unocss/rules";
import { theme } from "./unocss/theme";
import { convertAttributeSelectorToClassSelector } from "./unocss/utils/convertAttributeSelectorToClassSelector";
import { createArbitraryValueRule } from "./unocss/utils/createArbitraryValueRule";
import {generateCssVariablesFromTheme} from "./unocss/utils/generateCssVariablesFromTheme";

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

const presets = [
  {
    ...presetAttributify(),
    extractors: [customAttributifyExtractor()],
  },
];

export default defineConfig({
  extendTheme() {
    return theme;
  },
  presets,
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
    direction,
    overflow,
    createArbitraryValueRule("(grid)-(template)-(columns)"),
    createArbitraryValueRule("(grid)-(template)-(rows)"),
    createArbitraryValueRule("(grid)-(column)"),
    createArbitraryValueRule("(grid)-(row)"),
  ],
  safelist: generateColorClasses(["color", "border-color", "background-color"]),
  postprocess(utilities) {
    utilities.selector = convertAttributeSelectorToClassSelector(
      utilities.selector
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
