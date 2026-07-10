import { type DynamicRule } from "unocss";
import { type Descriptor, camelCaseToKebabCase, type GenericTheme } from "../shared";

export function convertUnitlessNumberToPixelValue(value: string) {
  return /^-?[0-9]+$/.test(value) && value !== "0" ? `${value}px` : value;
}

function generateRule<Theme extends GenericTheme>({
  property,
  shortcut,
  fallback,
  token,
  values,
  isUnitlessNumberAShortcutForPixelValue,
}: { property: string } & Omit<
  Exclude<Descriptor<Theme>["properties"][number], string>,
  "name"
> &
  Omit<Descriptor<Theme>, "properties">): DynamicRule {
  return [
    new RegExp(`^(?:${[property].concat(shortcut ?? []).join("|")})-(.*)$`),
    ([, rawValue]) => {
      const isExplicitlyDefinedValue = values?.map(String).includes(rawValue);
      const value =
        token && !isExplicitlyDefinedValue
          ? `var(--${token}__${rawValue})`
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

export function generateRulesFromDescriptors<Theme extends GenericTheme>(descriptors: Descriptor<Theme>[]) {
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
