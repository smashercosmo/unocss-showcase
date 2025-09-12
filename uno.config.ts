import { variantBreakpoints } from "@unocss/preset-mini/variants";
import { defineConfig, toEscapedSelector } from "unocss";
import { variantAttributify } from "unocss/preset-attributify";

import { attributifyExtractor } from "./unocss/attributifyExtractor";
import { type Theme, theme } from "./unocss/theme";
import { SELECTOR_SPLITTER_REGEX } from "./unocss/utils/constants";
import { createRules } from "./unocss/utils/createRules";
import { unescapeCssSelector } from "./unocss/utils/unescapeCssSelector";
import { generateCssVariablesFromTheme } from "./unocss/utils/generateCssVariablesFromTheme";

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

function getMargins(properties: string[]) {
  return properties.map((property) => ({
    property,
    token: "spacing",
    additionalValues: [0, "auto"],
  }));
}

function getPaddings(properties: string[]) {
  return properties.map((property) => ({
    property,
    token: "spacing",
    additionalValues: [0],
  }));
}

export default defineConfig<Theme>({
  extendTheme() {
    return theme;
  },
  // @ts-expect-error problem with unocss types
  variants: [variantAttributify(), variantBreakpoints()],
  extractors: [attributifyExtractor({ components: ["Box"] })],
  rules: createRules([
    { property: "flex", isUnitless: true },
    { property: "color", token: "colors" },
    { property: "border-color", token: "colors" },
    { property: "background-color", token: "colors" },
    { property: "position" },
    { property: "gap", token: "spacing" },
    { property: "row-gap", token: "spacing" },
    { property: "column-gap", token: "spacing" },
    { property: "inline-size" },
    { property: "min-inline-size" },
    { property: "max-inline-size" },
    { property: "block-size" },
    { property: "min-block-size" },
    { property: "max-block-size" },
    { property: "inset" },
    { property: "inset-inline" },
    { property: "inset-inline-start" },
    { property: "inset-inline-end" },
    { property: "inset-block" },
    { property: "inset-block-start" },
    { property: "inset-block-end" },
    ...getMargins([
      "margin",
      "margin-inline",
      "margin-inline-start",
      "margin-inline-end",
      "margin-block",
      "margin-block-start",
      "margin-block-end",
    ]),
    ...getPaddings([
      "padding",
      "padding-inline",
      "padding-inline-start",
      "padding-inline-end",
      "padding-block",
      "padding-block-start",
      "padding-block-end",
    ]),
    { property: "justify-self" },
    { property: "align-self" },
    { property: "justify-content" },
    { property: "align-content" },
    { property: "align-items" },
    { property: "border-width" },
    { property: "border-inline-width" },
    { property: "border-inline-start-width" },
    { property: "border-inline-end-width" },
    { property: "border-block-width" },
    { property: "border-block-start-width" },
    { property: "border-block-end-width" },
    { property: "border-radius", token: "radii" },
    { property: "border-start-end-radius", token: "radii" },
    { property: "border-start-start-radius", token: "radii" },
    { property: "border-end-end-radius", token: "radii" },
    { property: "border-end-start-radius", token: "radii" },
    { property: "display" },
    { property: "flex-direction" },
    { property: "overflow" },
    { property: "overflow-block" },
    { property: "overflow-inline" },
    { property: "grid-template-columns" },
    { property: "grid-template-rows" },
    { property: "grid-column", isUnitless: true },
    { property: "grid-row", isUnitless: true },
  ]),
  safelist: generateColorClasses(["color", "border-color", "background-color"]),
  postprocess(utilities) {
      /**
       * Here we transform unocss-generated selectors,
       * like `.grid-template-columns-200px\ minmax\(900px\,\ 1fr\)\ 100px`,
       * to more readable ones (`.grid-template-columns-200px-minmax-900px-1fr-100px`)
       */
    utilities.selector = toEscapedSelector(
      (
        unescapeCssSelector(utilities.selector)
          .slice(1)
          .match(SELECTOR_SPLITTER_REGEX) ?? []
      ).join("-")
    );
  },
  layers: {
    tokens: 1,
    utilities: 2,
  },
  outputToCssLayers: true,
  extractorDefault: false,
  preflights: [
    {
      getCSS: generateCssVariablesFromTheme,
    },
  ],
});
