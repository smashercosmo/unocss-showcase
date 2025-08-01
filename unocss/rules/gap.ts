import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedGapValues = values.gap.join("|");

export const gap: DynamicRule = [
  new RegExp(`^(row-|column-)?(gap)-(${allowedGapValues})$`),
  (marchArray) =>
    createRule(marchArray, ({ rawValue }) => `var(--spacing-${rawValue})`),
];
