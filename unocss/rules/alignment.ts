import { type DynamicRule } from "unocss";

import { values } from "../theme";
import { createRule } from "../utils/createRule";

const allowedAlignmentValues = [
  ...new Set([...values["align-items"], ...values["justify-content"]]),
].join("|");

export const alignment: DynamicRule = [
  new RegExp(
    `^(align|justify)-(items|content|self)-(${allowedAlignmentValues})$`
  ),
  (matchArray) => createRule(matchArray),
];
