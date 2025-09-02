import { type DynamicRule } from "unocss";

import { createRule } from "../utils/createRule";
import { ALLOWED_SELECTOR_SYMBOLS_REGEX_STRING } from "./constants";

export const border: DynamicRule = [
  new RegExp(
    `^(border)-?(inline|block)?-?(start|end)?-(width)-(${ALLOWED_SELECTOR_SYMBOLS_REGEX_STRING})$`
  ),
  (matchArray) => createRule(matchArray),
];
