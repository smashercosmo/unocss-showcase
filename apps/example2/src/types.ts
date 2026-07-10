import type { ReactNode, ReactElement, CSSProperties } from "react";
import { type Theme, type Breakpoint } from "./theme";
import { type Descriptor, descriptors } from "./descriptors";

export type PropsFromDescriptor<
  D extends Descriptor,
  O extends { shortcuts: boolean } = { shortcuts: false },
> = {
  [
    P in D["properties"][number] as O["shortcuts"] extends true
      ? P extends { shortcut: string }
        ? P["shortcut"]
        : never
      : P extends string
        ? P
        : P extends { name: string }
          ? P["name"]
          : never
  ]?: [
    | (D["token"] extends keyof Theme ? keyof Theme[D["token"]] : never)
    | (D["values"] extends ReadonlyArray<infer V> ? V : never),
  ] extends [never]
    ? string | number
    : | (D["token"] extends keyof Theme ? keyof Theme[D["token"]] : never)
      | (D["values"] extends ReadonlyArray<infer V> ? V : never);
};

export type Props = {
  asChild?: false;
  children?: ReactNode;
};

export type AsChildProps = {
  asChild: true;
  children: ReactElement<{
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }>;
};

export type PolymorphicProps<OwnProps extends object> = (Props | AsChildProps) &
  OwnProps;

type PrefixedProperties<T, Prefixes extends string> = {
  [K in keyof T]: T[K];
} & {
  [K in keyof T as `${Prefixes}:${string & K}`]: T[K];
};

export type ResponsiveProperties<T> = PrefixedProperties<T, Breakpoint>;

export type Colors = PropsFromDescriptor<typeof descriptors.colors>;
export type Margins = PropsFromDescriptor<typeof descriptors.margins>;
export type Paddings = PropsFromDescriptor<typeof descriptors.paddings>;
export type Gaps = PropsFromDescriptor<typeof descriptors.gaps>;
export type BorderRadiuses = PropsFromDescriptor<
  typeof descriptors.borderRadiuses
>;
export type Overflows = PropsFromDescriptor<typeof descriptors.overflows>;
export type Display = PropsFromDescriptor<typeof descriptors.display>;
export type FlexDirection = PropsFromDescriptor<
  typeof descriptors.flexDirection
>;
export type FlexDirectionShortcuts = PropsFromDescriptor<
  typeof descriptors.flexDirection,
  { shortcuts: true }
>;
export type Grid = PropsFromDescriptor<typeof descriptors.grid>;
export type GridShortcuts = PropsFromDescriptor<
  typeof descriptors.grid,
  { shortcuts: true }
>;
export type Position = PropsFromDescriptor<typeof descriptors.position>;
export type Flex = PropsFromDescriptor<typeof descriptors.flex>;
export type Insets = PropsFromDescriptor<typeof descriptors.insets>;
export type Sizes = PropsFromDescriptor<typeof descriptors.sizes>;
export type AlignItems = PropsFromDescriptor<typeof descriptors.alignItems>;
export type AlignItemsShortcuts = PropsFromDescriptor<
  typeof descriptors.alignItems,
  { shortcuts: true }
>;
export type AlignSelfJustifySelf = PropsFromDescriptor<
  typeof descriptors.alignSelfJustifySelf
>;
export type JustifyContent = PropsFromDescriptor<
  typeof descriptors.justifyContent
>;
export type JustifyContentShortcuts = PropsFromDescriptor<
  typeof descriptors.justifyContent,
  { shortcuts: true }
>;
export type AlignContent = PropsFromDescriptor<typeof descriptors.alignContent>;
export type FlexWrap = PropsFromDescriptor<typeof descriptors.flexWrap>;
export type TextAlign = PropsFromDescriptor<typeof descriptors.textAlign>;
export type VerticalAlign = PropsFromDescriptor<
  typeof descriptors.verticalAlign
>;
export type BorderStyle = PropsFromDescriptor<typeof descriptors.borderStyle>;
export type BorderWidths = PropsFromDescriptor<typeof descriptors.borderWidths>;

export type CssProps = Colors &
  Margins &
  Paddings &
  BorderRadiuses &
  Overflows &
  Display &
  Position &
  Flex &
  Insets &
  Sizes &
  TextAlign &
  VerticalAlign &
  Gaps &
  FlexDirection &
  AlignItems &
  AlignSelfJustifySelf &
  JustifyContent &
  AlignContent &
  FlexWrap &
  FlexDirectionShortcuts &
  AlignItemsShortcuts &
  JustifyContentShortcuts &
  Grid &
  GridShortcuts &
  BorderStyle &
  BorderWidths;
