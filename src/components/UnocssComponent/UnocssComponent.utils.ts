import { generateKebabCasedClassName } from "@uno/generators/generateKebabCasedClassName";
import type { UnocssProps } from "./UnocssComponent.types";
import { generatePropertyShortcutToNameMapFromDescriptors } from "@uno/generators/generatePropertyShortcutToNameMapFromDescriptors";
import { descriptors } from "@uno/descriptors";
import type { ResponsiveProperties } from "@uno/types";

const propertyShortcutToNameMap =
  generatePropertyShortcutToNameMapFromDescriptors(Object.values(descriptors));

export function generateClassNamesFromProps({
  props,
  propertiesToInclude,
}: {
  props: ResponsiveProperties<UnocssProps>;
  propertiesToInclude: Set<unknown>;
}) {
  const { borderColor, borderStyle, borderWidth, ...rest } = props;

  const hasBorderWidthSet = Object.keys(props).some((key) =>
    /^border(.*)Width$/.test(key)
  );

  const defaultBorderProps = {
    borderColor,
    borderStyle:
      borderColor && borderStyle === undefined ? "solid" : borderStyle,
    borderWidth: borderColor && !hasBorderWidthSet ? 1 : borderWidth,
  };

  return Object.entries({
    ...defaultBorderProps,
    ...rest,
  })
    .filter(
      (entry): entry is [string, string | number] =>
        propertiesToInclude.has(entry[0]) &&
        (typeof entry[1] === "string" || typeof entry[1] === "number")
    )
    .map(([key, value]) => {
      const camelCasedSelector = `.${[key, value].join("-")}`;
      return generateKebabCasedClassName({
        selector: camelCasedSelector,
        propertyShortcutToNameMap,
      });
    });
}
