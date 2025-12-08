import { type DynamicRule, type PresetUnoTheme } from "unocss";

import { camelCaseToKebabCase } from "../utils";
import type { Descriptor } from "../descriptors";

export function convertUnitlessNumberToPixelValue(value: string) {
  return /^-?[0-9]+$/.test(value) && value !== "0" ? `${value}px` : value;
}

function generateRule({
  property,
  shortcut,
  fallback,
  token,
  values,
  isUnitlessNumberAShortcutForPixelValue,
}: { property: string } & Omit<
  Exclude<Descriptor["properties"][number], string>,
  "name"
> &
  Omit<Descriptor, "properties">): DynamicRule<PresetUnoTheme> {
  return [
    new RegExp(`^(?:${[property].concat(shortcut ?? []).join("|")})-(.*)$`),
    ([, rawValue]) => {
      const isExplicitlyDefinedValue = values?.map(String).includes(rawValue);
      const value =
        token && !isExplicitlyDefinedValue
          ? `var(--${token}-${rawValue})`
          : isUnitlessNumberAShortcutForPixelValue
            ? convertUnitlessNumberToPixelValue(rawValue)
            : rawValue;

      return {
        ...(fallback ? { [camelCaseToKebabCase(fallback)]: value } : undefined),
        [camelCaseToKebabCase(property)]: value,
      };
    },
  ];
}

export function generateRulesFromDescriptors(descriptors: Descriptor[]) {
  return descriptors.flatMap(({ properties, ...rest }) => {
    return properties.map((property) => {
      const { name, shortcut, fallback } =
        typeof property === "string" ? { name: property } : property;

      return generateRule({
        property: name,
        shortcut,
        fallback,
        ...rest,
      });
    });
  });
}
