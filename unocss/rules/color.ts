import { type DynamicRule } from "unocss";

import { values } from "../theme";

const allowedColorValues = values.color.join("|");

export const color: DynamicRule = [
  new RegExp(`^(background-|border-)?(color)-(${allowedColorValues})$`),
  ([match]) => {
    const parts = match.split(/-?(color)-/);
    const value = parts.pop();
    const selector = parts.filter(Boolean).join("-");
    return {
      [selector]: `var(--colors-${value})`,
    };
  },
];
