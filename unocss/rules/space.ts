import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedSpaceValues = [
  ...new Set([...values.padding, ...values.margin]),
].join("|");

export const space: DynamicRule = [
  new RegExp(
    `^(padding|margin)(-inline|-block)?(-start|-end)?-(${allowedSpaceValues})$`
  ),
  (marchArray) =>
    createRule(marchArray, ({ rawValue }) =>
      rawValue === "auto" ? "auto" : `var(--spacing-${rawValue})`
    ),
];
