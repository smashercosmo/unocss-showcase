import { variantBreakpoints } from "@unocss/preset-mini/variants";
import { defineConfig, type VariantObject } from "unocss";
import { variantAttributify } from "unocss/preset-attributify";

import { generateRules } from "./generateRules";
import { descriptors } from "./descriptors";
import { extractor } from "./extractor";
import { safeList } from "./safeList";
import { theme, type Theme } from "./theme";
import { camelCaseToKebabCase, typedKeys } from "./utils";
import { generateCssVariablesFromTheme } from "./generateCssVariablesFromTheme";

const shortcutsMap: Record<string, string> = {};

for (const name of typedKeys(descriptors)) {
  for (const property of descriptors[name].properties) {
    if (typeof property === "object" && "shortcut" in property) {
      shortcutsMap[property.shortcut] = property.name;
    }
  }
}

export default defineConfig<Theme>({
  extendTheme() {
    return theme;
  },
  variants: [
    variantAttributify() as unknown as VariantObject<Theme>,
    variantBreakpoints() as unknown as VariantObject<Theme>,
  ],
  extractors: [extractor({ components: ["Box", "Stack", "Grid"] })],
  rules: generateRules(Object.values(descriptors)),
  safelist: safeList,
  postprocess(utilities) {
    const [name, ...rest] = utilities.selector.substring(1).split("-");
    const property = camelCaseToKebabCase(shortcutsMap[name] ?? name);
    const selector = [`.${property}`].concat(rest).join("-");
    utilities.selector = selector.replace(/\\ /g, "-");
  },
  extractorDefault: false,
  preflights: [
    { getCSS: () => generateCssVariablesFromTheme({ theme, layer: "tokens" }) },
  ],
});
