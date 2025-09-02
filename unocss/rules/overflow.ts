import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedOverflowValues = values.overflow.join("|");

export const overflow: DynamicRule = [
  new RegExp(`^(overflow)-?(inline|block)?-(${allowedOverflowValues})$`),
  (matchArray) => createRule(matchArray),
];
