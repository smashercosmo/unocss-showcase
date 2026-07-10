import fs from "node:fs";
import { variantBreakpoints } from "@unocss/preset-mini/variants";
import {
  defineConfig,
  toEscapedSelector,
} from "unocss";
import UnoCSS from "unocss/vite";
import { variantAttributify } from "unocss/preset-attributify";
import { type Plugin } from "vite";

import { extractor } from "./extractor";
import { generateRulesFromDescriptors } from "./generateRulesFromDescriptors";
import { generateSafeListFromDescriptors } from "./generateSafeListFromDescriptors";
import { generatePropertyShortcutToNameMapFromDescriptors } from "./generatePropertyShortcutToNameMapFromDescriptors";
import { generateThemeFromCssVariables } from "./generateThemeFromCssVariables";
import { generateKebabCasedClassName, type Descriptor, type GenericTheme } from "../shared";

type Options = {
  tokensCssFilePath: string;
  components: string[];
  descriptors: Descriptor<GenericTheme>[];
  safelist: Descriptor<GenericTheme>[];
}

export function unocssBoxComponentVitePlugin({ tokensCssFilePath, components, descriptors, safelist }: Options): Plugin {
  return {
    name: 'unocss-box-component-vite-plugin',
    config(config) {
      const propertyShortcutToNameMap =
        generatePropertyShortcutToNameMapFromDescriptors(Object.values(descriptors));
      const tokensCssFileContent = fs.readFileSync(tokensCssFilePath, "utf8");
      const theme = generateThemeFromCssVariables(tokensCssFileContent);
      config.plugins ??= []
      config.plugins.push(
      UnoCSS(defineConfig({
        variants: [variantAttributify(), variantBreakpoints()],
        configDeps: [tokensCssFilePath],
        extractors: [extractor({ components })],
        rules: generateRulesFromDescriptors(Object.values(descriptors)),
        safelist: generateSafeListFromDescriptors({
          theme,
          descriptors: safelist,
        }),
        postprocess(utilities) {
          utilities.selector = toEscapedSelector(
            generateKebabCasedClassName({
              selector: utilities.selector,
              propertyShortcutToNameMap,
            })
          );
        },
        extractorDefault: false,
      }))
    )
    },
  }
}
