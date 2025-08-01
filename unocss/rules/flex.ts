import type { DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedFlexValues = values.display.join("|");

export const flex: DynamicRule = [
  new RegExp(`^(flex)-(${allowedFlexValues})$`),
  (marchArray) => createRule(marchArray, ({ rawValue }) => rawValue),
];
