import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedPositionValues = values.position.join("|");

export const position: DynamicRule = [
  new RegExp(`^(position)-(${allowedPositionValues})$`),
  (matchArray) => createRule(matchArray),
];
