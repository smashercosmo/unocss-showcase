import { type ReactElement, type JSX, type ReactNode } from "react";
import {
  type Colors,
  type Margins,
  type Paddings,
  type BorderRadiuses,
  type Overflows,
  type Display,
  type Position,
  type Flex,
  type Insets,
  type Sizes,
  type TextAlign,
  type VerticalAlign,
  type BorderStyle,
  type BorderWidths,
  type Gaps,
  type FlexDirection,
  type AlignItems,
  type AlignSelfJustifySelf,
  type JustifyContent,
  type AlignContent,
  type FlexWrap,
  type FlexDirectionShortcuts,
  type AlignItemsShortcuts,
  type JustifyContentShortcuts,
  type Grid,
  type GridShortcuts,
} from "@uno/types";

type Props = {
  asChild?: never;
  as?: never;
  children?: ReactNode;
};

type AsChildProps = {
  asChild: true;
  as?: never;
  children: ReactElement<{ className?: string }>;
};

type AsProps<E extends keyof JSX.IntrinsicElements, OwnProps extends object> = {
  as: E;
  asChild?: never;
  children?: ReactNode;
} & Omit<JSX.IntrinsicElements[E], keyof OwnProps | "as">;

export type PolymorphicProps<
  E extends keyof JSX.IntrinsicElements = "div",
  OwnProps extends object = object,
> = (Props | AsChildProps | AsProps<E, OwnProps>) & OwnProps;

export type UnocssProps = Colors &
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
