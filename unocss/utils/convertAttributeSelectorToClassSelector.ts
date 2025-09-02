import { toEscapedSelector } from "unocss";

import { CCS_VALUE_SPLITTER_REGEX } from "./constants";

function chr(cp: number) {
  return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : "\ufffd";
}

// https://stackoverflow.com/questions/64273537/how-can-i-unescape-something-escaped-by-css-escape
export function CSSUnescape(s: string, quoted = false) {
  const re = /\\([0-9a-f]{1,6}\s?|$)|\\(\r?\n|\r|\f)|\\(.)/gi;
  return s.replace(
    re,
    (s, hex, skip, ch) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument
      ch ?? (skip ? (quoted ? "" : s) : chr(parseInt(hex, 16)))
  );
}

const ATTRIBUTE_SELECTOR_REGEX = /\[.*]/;

/**
 * Converts attribute selector to class selector.
 *
 * Example:
 * const attributeSelector = `[md:block-size~="5.5rem"]`;
 * convertAttributeSelectorToClassSelector(attributeSelector);
 *
 * Output:
 * ".md\:block-size-5\.5rem"
 */
export function convertAttributeSelectorToClassSelector(selector: string) {
  const unescapedSelector = CSSUnescape(selector);

  if (ATTRIBUTE_SELECTOR_REGEX.test(unescapedSelector)) {
    const className = (
      unescapedSelector.match(CCS_VALUE_SPLITTER_REGEX) ?? []
    ).join("-");
    return className ? toEscapedSelector(className) : selector;
  }

  return selector;
}
