import type { DataType, Globals, Property } from "csstype";
import type { theme } from "./theme";

export type Descriptor = {
  properties: (
    | string
    | { name: string; shortcut?: string; fallback?: string }
  )[];
  token?: keyof typeof theme;
  values?: (string | number)[];
  isUnitlessNumberAShortcutForPixelValue?: boolean;
};

export const colors = {
  properties: ["color", "backgroundColor", "borderColor"],
  token: "colors",
  values: ["transparent", "currentColor"],
} as const satisfies Descriptor;

export const margins = {
  properties: [
    "margin",
    "marginInline",
    "marginInlineStart",
    "marginInlineEnd",
    "marginBlock",
    "marginBlockStart",
    "marginBlockEnd",
  ],
  token: "spacing",
  values: [0, 1, "auto"],
  isUnitlessNumberAShortcutForPixelValue: true,
} as const satisfies Descriptor;

export const paddings = {
  properties: [
    "padding",
    "paddingInline",
    "paddingInlineStart",
    "paddingInlineEnd",
    "paddingBlock",
    "paddingBlockStart",
    "paddingBlockEnd",
  ],
  token: "spacing",
  values: [0, 1],
  isUnitlessNumberAShortcutForPixelValue: true,
} as const satisfies Descriptor;

export const gaps = {
  properties: ["gap", "rowGap", "columnGap"],
  token: "spacing",
  values: [0, 1],
  isUnitlessNumberAShortcutForPixelValue: true,
} as const satisfies Descriptor;

export const borderRadiuses = {
  properties: [
    "borderRadius",
    "borderStartEndRadius",
    "borderStartStartRadius",
    "borderEndEndRadius",
    "borderEndStartRadius",
  ],
  token: "borderRadius",
} as const satisfies Descriptor;

export const flexDirection = {
  properties: [{ name: "flexDirection", shortcut: "direction" }],
  values: ["row", "column", "row-reverse", "column-reverse"] satisfies Exclude<
    Property.FlexDirection,
    Globals
  >[],
} as const satisfies Descriptor;

export const display = {
  properties: ["display"],
  values: [
    "none",
    "inline",
    "block",
    "flex",
    "grid",
    "inline-block",
    "inline-flex",
    "inline-grid",
    "contents",
  ] satisfies (
    | DataType.DisplayOutside
    | DataType.DisplayInside
    | DataType.DisplayInternal
    | DataType.DisplayLegacy
    | "contents"
    | "list-item"
    | "none"
  )[],
} as const satisfies Descriptor;

export const overflows = {
  properties: [
    "overflow",
    { name: "overflowBlock", fallback: "overflowY" },
    { name: "overflowInline", fallback: "overflowX" },
  ],
  values: ["auto", "hidden", "visible", "clip"] satisfies Exclude<
    Property.OverflowBlock & Property.OverflowInline,
    Globals
  >[],
} as const satisfies Descriptor;

export const grid = {
  properties: [
    { name: "gridTemplateColumns", shortcut: "columns" },
    { name: "gridTemplateAreas", shortcut: "areas" },
    { name: "gridTemplateRows", shortcut: "rows" },
    { name: "gridAutoRows", shortcut: "autoRows" },
    { name: "gridColumn", shortcut: "column" },
    { name: "gridArea", shortcut: "area" },
    { name: "gridRow", shortcut: "row" },
  ],
} as const satisfies Descriptor;

export const position = {
  properties: ["position"],
  values: ["relative", "absolute", "fixed", "sticky"] satisfies Exclude<
    Property.Position,
    Globals
  >[],
} as const satisfies Descriptor;

export const flex = {
  properties: ["flex"],
} as const satisfies Descriptor;

export const flexWrap = {
  properties: ["flexWrap"],
  values: ["nowrap", "wrap", "wrap-reverse"] satisfies Exclude<
    Property.FlexWrap,
    Globals
  >[],
} as const satisfies Descriptor;

export const sizes = {
  properties: [
    "inlineSize",
    "minInlineSize",
    "maxInlineSize",
    "blockSize",
    "minBlockSize",
    "maxBlockSize",
  ],
  isUnitlessNumberAShortcutForPixelValue: true,
} as const satisfies Descriptor;

export const insets = {
  properties: [
    "inset",
    "insetInline",
    "insetInlineStart",
    "insetInlineEnd",
    "insetBlock",
    "insetBlockStart",
    "insetBlockEnd",
  ],
  isUnitlessNumberAShortcutForPixelValue: true,
} as const satisfies Descriptor;

export const alignSelfJustifySelf = {
  properties: ["alignSelf", "justifySelf"],
  values: ["center", "end", "start", "baseline", "stretch"] satisfies (
    | DataType.SelfPosition
    | "baseline"
    | "stretch"
  )[],
} as const satisfies Descriptor;

export const alignItems = {
  properties: [{ name: "alignItems", shortcut: "align" }],
  values: ["center", "end", "start", "baseline", "stretch"] satisfies (
    | DataType.SelfPosition
    | "baseline"
    | "stretch"
  )[],
} as const satisfies Descriptor;

export const alignContent = {
  properties: ["alignContent"],
  values: [
    "space-around",
    "space-between",
    "space-evenly",
    "stretch",
    "center",
    "end",
    "start",
    "baseline",
  ] satisfies (
    | DataType.ContentPosition
    | DataType.ContentDistribution
    | "baseline"
  )[],
} as const satisfies Descriptor;

export const justifyContent = {
  properties: [{ name: "justifyContent", shortcut: "justify" }],
  values: [
    "space-around",
    "space-between",
    "space-evenly",
    "stretch",
    "center",
    "end",
    "start",
  ] satisfies (DataType.ContentPosition | DataType.ContentDistribution)[],
} as const satisfies Descriptor;

export const textAlign = {
  properties: ["textAlign"],
  values: ["start", "center", "end"] satisfies Exclude<
    Property.TextAlign,
    Globals
  >[],
} as const satisfies Descriptor;

export const verticalAlign = {
  properties: ["verticalAlign"],
  values: ["baseline", "middle"],
} as const satisfies Descriptor;

export const borderStyle = {
  properties: ["borderStyle"],
  values: ["solid"] satisfies DataType.LineStyle[],
} as const satisfies Descriptor;

export const borderWidths = {
  properties: [
    "borderWidth",
    "borderInlineWidth",
    "borderInlineStartWidth",
    "borderInlineEndWidth",
    "borderBlockWidth",
    "borderBlockStartWidth",
    "borderBlockEndWidth",
  ],
  isUnitlessNumberAShortcutForPixelValue: true,
} as const satisfies Descriptor;

export const descriptors = {
  colors,
  margins,
  paddings,
  gaps,
  borderRadiuses,
  flexDirection,
  display,
  overflows,
  grid,
  flex,
  flexWrap,
  position,
  sizes,
  insets,
  alignItems,
  alignSelfJustifySelf,
  justifyContent,
  alignContent,
  textAlign,
  verticalAlign,
  borderStyle,
  borderWidths,
} as const;
