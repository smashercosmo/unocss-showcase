import {
  type AlignItemsValue,
  type BorderRadiusValue,
  type ColorValue,
  type DisplayValue,
  type JustifyContentValue,
  type MarginValue,
  type PositionValue,
  type SpacingValue,
  type theme,
} from "../../../unocss/theme";

type Breakpoints = keyof typeof theme.breakpoints;
type ArbitrarySpacing = `${number}rem` | `${number}%` | number;

type PrefixedProperties<T, Prefixes extends string> = {
  [K in keyof T]: T[K];
} & {
  [K in keyof T as `${Prefixes}:${string & K}`]: T[K];
};

export type ResponsiveProperties<T> = PrefixedProperties<T, Breakpoints>;

export type Margin = {
  margin?: MarginValue;
  "margin-inline"?: MarginValue;
  "margin-inline-start"?: MarginValue;
  "margin-inline-end"?: MarginValue;
  "margin-block"?: MarginValue;
  "margin-block-start"?: MarginValue;
  "margin-block-end"?: MarginValue;
};

export type Padding = {
  padding?: SpacingValue;
  "padding-inline"?: SpacingValue;
  "padding-inline-start"?: SpacingValue;
  "padding-inline-end"?: SpacingValue;
  "padding-block"?: SpacingValue;
  "padding-block-start"?: SpacingValue;
  "padding-block-end"?: SpacingValue;
};

export type Size = {
  "inline-size"?: ArbitrarySpacing;
  "max-inline-size"?: ArbitrarySpacing;
  "min-inline-size"?: ArbitrarySpacing;
  "block-size"?: ArbitrarySpacing;
  "max-block-size"?: ArbitrarySpacing;
  "min-block-size"?: ArbitrarySpacing;
};

export type Position = {
  position?: PositionValue;
  inset?: ArbitrarySpacing;
  "inset-inline"?: ArbitrarySpacing;
  "inset-inline-start"?: ArbitrarySpacing;
  "inset-inline-end"?: ArbitrarySpacing;
  "inset-block"?: ArbitrarySpacing;
  "inset-block-start"?: ArbitrarySpacing;
  "inset-block-end"?: ArbitrarySpacing;
};

export type Flex = {
  flex?: number | "none";
};

export type Display = {
  display?: DisplayValue;
};

export type BorderRadius = {
  "border-radius"?: BorderRadiusValue;
};

export type AlignItems = {
  "align-items"?: AlignItemsValue;
  "align-self"?: AlignItemsValue;
};

export type JustifyContent = {
  "justify-content"?: JustifyContentValue;
  "justify-self"?: JustifyContentValue;
};

export type Colors = {
  color?: ColorValue;
  "background-color"?: ColorValue;
  "border-color"?: ColorValue;
};

export type BorderWidth = {
  "border-width"?: ArbitrarySpacing;
  "border-inline-width"?: ArbitrarySpacing;
  "border-inline-start-width"?: ArbitrarySpacing;
  "border-inline-end-width"?: ArbitrarySpacing;
  "border-block-width"?: ArbitrarySpacing;
  "border-block-start-width"?: ArbitrarySpacing;
  "border-block-end-width"?: ArbitrarySpacing;
};

export type Gap = {
  gap?: SpacingValue;
  "row-gap"?: SpacingValue;
  "col-gap"?: SpacingValue;
};
