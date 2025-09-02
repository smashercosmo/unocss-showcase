import { type DynamicRule } from "unocss";

import { createRule } from "../utils/createRule";
import { ALLOWED_SELECTOR_SYMBOLS_REGEX_STRING } from "./constants";

export const size: DynamicRule = [
  new RegExp(
    `^(min|max)?-?(inline|block)-(size)-(${ALLOWED_SELECTOR_SYMBOLS_REGEX_STRING})$`
  ),
  (matchArray) => createRule(matchArray),
];
