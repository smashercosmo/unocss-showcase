import type { DynamicRule } from "unocss";
import { type Theme } from "../theme";

type PropertyDescriptor = {
  property: string;
  token?: string;
  isUnitless?: boolean;
  additionalValues?: (string | number)[];
};

export function normalizeCssValue(value: string) {
  return /^[0-9]+$/.test(value) ? `${value}px` : value;
}

function createRule({
  property,
  token,
  isUnitless,
  additionalValues,
}: PropertyDescriptor): DynamicRule<Theme> {
  return [
    new RegExp(`^${property}-(.*)$`),
    ([, value]) => {
      const isAdditionalValue = additionalValues?.map(String).includes(value);
      return {
        [property]: isUnitless
          ? value
          : token
            ? isAdditionalValue
              ? value
              : `var(--${token}-${value})`
            : normalizeCssValue(value),
      };
    },
  ];
}

export function createRules(properties: PropertyDescriptor[]) {
  return properties.map(createRule);
}
