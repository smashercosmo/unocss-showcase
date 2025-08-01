export function normalizeCssValue(value: string) {
  return /^[0-9]+$/.test(value) ? `${value}px` : value;
}
