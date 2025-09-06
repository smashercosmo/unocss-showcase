import { type PresetUnoTheme } from "unocss";

/**
 * Currently, these theme values are not in use (except for breakpoints),
 * but in the future it's going to be the main source of truth. Even CSS variables
 * are going to be generated from the theme object.
 */
export const theme = {
  breakpoints: {
    sm: "40em",
    md: "48em",
    lg: "64em",
    xl: "80em",
    xxl: "96em",
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
  } as const,
  spacing: {
    "2xs": "0.125rem" /* 2px */,
    xs: "0.25rem" /* 4px */,
    sm: "0.5rem" /* 8px */,
    md: "0.75rem" /* 12px */,
    lg: "1rem" /* 16px */,
    xl: "1.25rem" /* 20px */,
    "2xl": "1.5rem" /* 24px */,
    "3xl": "2rem" /* 32px */,
    "4xl": "2.5rem" /* 40px */,
    "5xl": "3.75rem" /* 60px */,
    "6xl": "5rem" /* 80px */,
  },
  borderRadius: {
    xs: "0.125rem" /* 2px */,
    sm: "0.25rem" /* 4px */,
    md: "0.5rem" /* 8px */,
    full: "50%",
  },
} satisfies PresetUnoTheme;

export type ColorValue = keyof typeof theme.colors;
export type SpacingValue = keyof typeof theme.spacing | 0;
export type BorderRadiusValue = keyof typeof theme.borderRadius;
export type DisplayValue =
  | "none"
  | "inline"
  | "block"
  | "flex"
  | "grid"
  | "inline-block"
  | "inline-flex"
  | "inline-grid"
  | "contents";
export type PositionValue = "relative" | "absolute" | "fixed" | "sticky";
export type AlignItemsValue = "start" | "end" | "center" | "baseline";
export type JustifyContentValue = "start" | "end" | "center" | "space-between";
export type FlexValue = "none" | number;
export type DirectionValue = "row" | "column";
export type OverflowValue = "auto" | "hidden" | "visible" | "clip";
export type MarginValue = SpacingValue | "auto" | 0;
