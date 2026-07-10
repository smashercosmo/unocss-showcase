export function convertUnitlessNumberToPixelValue(value: string) {
  return /^-?[0-9]+$/.test(value) && value !== "0" ? `${value}px` : value;
}
