import type { DynamicRule } from "unocss";

import { normalizeCssValue } from "./normalizeCssValue";

type PropertyDescriptor = {
  property: string;
  token?: string;
  isUnitless?: boolean;
  additionalValues?: (string | number)[];
};

function createRule({
  property,
  token,
  isUnitless,
  additionalValues,
}: PropertyDescriptor): DynamicRule {
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
