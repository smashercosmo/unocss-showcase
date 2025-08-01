import { normalizeCssValue } from "./normalizeCssValue";

export function createRule(
  [match]: RegExpMatchArray,
  formatValue: (args: {
    normalizedValue: string;
    rawValue: string;
  }) => string = ({ normalizedValue }) => normalizedValue
) {
  const parts = match.split("-");
  const value = parts.pop();
  const selector = parts.join("-");
  return {
    [selector]: formatValue({
      normalizedValue: value ? normalizeCssValue(value) : "0",
      rawValue: value || "0",
    }),
  };
}
