import type { DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedDirectionValues = values.direction.join("|");

export const direction: DynamicRule = [
  new RegExp(`^(flex)-(direction)-(${allowedDirectionValues})$`),
  (marchArray) => createRule(marchArray, ({ rawValue }) => rawValue),
];
