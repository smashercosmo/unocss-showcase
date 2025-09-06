function chr(cp: number) {
  return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : "\ufffd";
}

// https://stackoverflow.com/questions/64273537/how-can-i-unescape-something-escaped-by-css-escape
export function unescapeCssSelector(s: string, quoted = false) {
  const re = /\\([0-9a-f]{1,6}\s?|$)|\\(\r?\n|\r|\f)|\\(.)/gi;
  return s.replace(
    re,
    (s, hex, skip, ch) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument
      ch ?? (skip ? (quoted ? "" : s) : chr(parseInt(hex, 16)))
  );
}
