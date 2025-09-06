import {
  type AlignItemsValue,
  type BorderRadiusValue,
  type ColorValue,
  type DirectionValue,
  type DisplayValue,
  type FlexValue,
  type JustifyContentValue,
  type MarginValue,
  type OverflowValue,
  type PositionValue,
  type SpacingValue,
  type theme,
} from "../../../unocss/theme";

type Breakpoints = keyof typeof theme.breakpoints;
type ArbitraryValue = string | number;

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
  "inline-size"?: ArbitraryValue;
  "max-inline-size"?: ArbitraryValue;
  "min-inline-size"?: ArbitraryValue;
  "block-size"?: ArbitraryValue;
  "max-block-size"?: ArbitraryValue;
  "min-block-size"?: ArbitraryValue;
};

export type Position = {
  position?: PositionValue;
  inset?: ArbitraryValue;
  "inset-inline"?: ArbitraryValue;
  "inset-inline-start"?: ArbitraryValue;
  "inset-inline-end"?: ArbitraryValue;
  "inset-block"?: ArbitraryValue;
  "inset-block-start"?: ArbitraryValue;
  "inset-block-end"?: ArbitraryValue;
};

export type Flex = {
  flex?: FlexValue;
  "flex-direction"?: DirectionValue;
};

export type Grid = {
  "grid-template-columns"?: ArbitraryValue;
  "grid-template-rows"?: ArbitraryValue;
  "grid-column"?: ArbitraryValue;
  "grid-row"?: ArbitraryValue;
};

export type Display = {
  display?: DisplayValue;
};

export type Overflow = {
  overflow?: OverflowValue;
  "overflow-inline"?: OverflowValue;
  "overflow-block"?: OverflowValue;
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
  "border-width"?: ArbitraryValue;
  "border-inline-width"?: ArbitraryValue;
  "border-inline-start-width"?: ArbitraryValue;
  "border-inline-end-width"?: ArbitraryValue;
  "border-block-width"?: ArbitraryValue;
  "border-block-start-width"?: ArbitraryValue;
  "border-block-end-width"?: ArbitraryValue;
};
