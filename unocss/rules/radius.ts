import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedBorderRadiusValues = values["border-radius"].join("|");

export const radius: DynamicRule = [
  new RegExp(`^(border-radius)-(${allowedBorderRadiusValues})$`),
  (marchArray) =>
    createRule(marchArray, ({ rawValue }) => `var(--radii-${rawValue})`),
];
