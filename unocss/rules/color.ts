import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedColorValues = values.color.join("|");

export const color: DynamicRule = [
  new RegExp(`^(background|border)?-?(color)-(${allowedColorValues})$`),
  (marchArray) =>
    createRule(marchArray, ({ rawValue }) => `var(--colors-${rawValue})`),
];
