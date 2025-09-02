import type { DynamicRule } from "unocss";

export function createArbitraryValueRule(regexString: string): DynamicRule {
  return [
    new RegExp(`^${regexString}-(.*)$`),
    (match) => {
      const parts = match.slice(1).filter(Boolean);
      const value = parts.pop();
      const selector = parts.join("-");
      return {
        [selector]: value,
      };
    },
  ];
}
