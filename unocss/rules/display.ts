import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedDisplayValues = values.display.join("|");

export const display: DynamicRule = [
  new RegExp(`^(display)-(${allowedDisplayValues})$`),
  (matchArray) => createRule(matchArray),
];
