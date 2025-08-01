import { type PresetUnoTheme } from "unocss";

export const theme = {
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px",
  },
  colors: {
    disabled: "#909090",
    "text-primary": "#1a1a1a",
    "text-secondary": "#707070",
    "info-dark": "#0B8AAC",
    "info-main": "#0EA9D2",
    "info-light": "#9BE4F8",
    "info-surface": "#F1FBFE",
    "error-dark": "#B42E09",
    "error-main": "#D62E00",
    "error-light": "#FFC3B3",
    "error-surface": "#FFF3F0",
    "brand-dark": "#245866",
    "brand-main": "#4b7a8a",
    "brand-light": "#4798ae",
    "brand-surface": "#f1fbfe",
    "success-dark": "#009906",
    "success-main": "#13b91a",
    "success-light": "#ade6af",
    "success-surface": "#F3FBF4",
    "warning-dark": "#C77400",
    "warning-main": "#eb8c00",
    "warning-light": "#ffd494",
    "warning-surface": "#FFF3F0",
    "grey-50": "#fafafa",
    "grey-100": "#f5f5f5",
    "grey-200": "#eeeeee",
    "grey-300": "#dddddd",
    "grey-400": "#b9b9b9",
    "grey-500": "#909090",
    "grey-600": "#707070",
    "grey-700": "#585858",
    "grey-800": "#454545",
    "grey-900": "#353535",
    "grey-1000": "#1a1a1a",
    white: "#FFFFFF",
    black: "#000000",
    current: "currentColor",
    transparent: "transparent",
    divider: "#eeeeee",
  },
  spacing: {
    "2xs": "0.125rem",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.5rem",
    "5xl": "5rem",
  },
  borderRadius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    full: "50%",
  },
} satisfies PresetUnoTheme;

const colorValues = Object.keys(theme.colors) as  ColorValue[];
const spacingValues = Object.keys(theme.spacing) as SpacingValue[];
const borderRadiusValues = Object.keys(theme.borderRadius) as BorderRadiusValue[];
const displayValues = [
  "none",
  "inline",
  "block",
  "flex",
  "grid",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "contents",
] as const;
const alignItemsValues = ["start", "end", "center", "baseline"] as const;
const justifyContentValues = [
  "start",
  "end",
  "center",
  "space-between",
] as const;
const positionValues = ["relative", "absolute", "fixed", "sticky"] as const;
const flexValues = ["none", 1] as const;

export type ColorValue = keyof typeof theme.colors;
export type SpacingValue = keyof typeof theme.spacing;
export type BorderRadiusValue = keyof typeof theme.borderRadius;
export type DisplayValue = (typeof displayValues)[number];
export type PositionValue = (typeof positionValues)[number];
export type AlignItemsValue = (typeof alignItemsValues)[number];
export type JustifyContentValue = (typeof justifyContentValues)[number];
export type MarginValue = SpacingValue | "auto";

export const values = {
  display: displayValues,
  "align-items": alignItemsValues,
  "justify-content": justifyContentValues,
  padding: spacingValues,
  margin: ["auto", ...spacingValues],
  position: positionValues,
  gap: spacingValues,
  "border-radius": borderRadiusValues,
  flex: flexValues,
  color: colorValues,
} as const;
