import { variantBreakpoints } from "@unocss/preset-mini/variants";
import { defineConfig, toEscapedSelector } from "unocss";
import { variantAttributify } from "unocss/preset-attributify";

import { descriptors } from "./descriptors";
import { extractor } from "./extractor";
import { theme } from "./theme";
import { generateKebabCasedClassName } from "./generators/generateKebabCasedClassName";
import { generateRulesFromDescriptors } from "./generators/generateRulesFromDescriptors";
import { generateCssVariablesFromTheme } from "./generators/generateCssVariablesFromTheme";
import { generateSafeListFromDescriptors } from "./generators/generateSafeListFromDescriptors";
import { generatePropertyShortcutToNameMapFromDescriptors } from "./generators/generatePropertyShortcutToNameMapFromDescriptors";

const propertyShortcutToNameMap =
  generatePropertyShortcutToNameMapFromDescriptors(Object.values(descriptors));

export default defineConfig({
  extendTheme() {
    return theme;
  },
  variants: [
    variantAttributify(),
    variantBreakpoints(),
  ],
  extractors: [extractor({ components: ["Box", "Stack", "Grid"] })],
  rules: generateRulesFromDescriptors(Object.values(descriptors)),
  safelist: generateSafeListFromDescriptors({
    theme,
    descriptors: [
      descriptors.display,
      descriptors.gaps,
      descriptors.alignItems,
      descriptors.alignSelfJustifySelf,
      descriptors.justifyContent,
      descriptors.alignContent,
      descriptors.colors,
      descriptors.flexDirection,
      descriptors.borderStyle,
      { ...descriptors.borderWidths, values: [0, 1] },
    ],
  }),
  postprocess(utilities) {
    utilities.selector = toEscapedSelector(generateKebabCasedClassName({
      selector: utilities.selector,
      propertyShortcutToNameMap
    }));
  },
  extractorDefault: false,
  preflights: [
    { getCSS: () => generateCssVariablesFromTheme({ theme, layer: "tokens" }) },
  ],
});
