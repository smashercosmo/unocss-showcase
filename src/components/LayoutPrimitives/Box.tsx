import {
  UnocssComponent,
  type PolymorphicProps,
} from "@/components/UnocssComponent/UnocssComponent";
import { type JSX } from "react";
import {
  type AlignContent,
  type AlignItems,
  type AlignSelfJustifySelf,
  type BorderRadiuses,
  type BorderStyle,
  type BorderWidths,
  type Colors,
  type Display,
  type Flex,
  type FlexDirection,
  type FlexWrap,
  type Gaps,
  type Grid,
  type Insets,
  type JustifyContent,
  type Margins,
  type Overflows,
  type Paddings,
  type Position,
  type ResponsiveProperties,
  type Sizes,
  type TextAlign,
  type VerticalAlign,
} from "@uno/types";

export type UnocssProps = ResponsiveProperties<
  Colors &
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
  BorderStyle &
  BorderWidths &
  Gaps &
  FlexDirection &
  AlignItems &
  AlignSelfJustifySelf &
  JustifyContent &
  AlignContent &
  FlexWrap &
  Grid
>;

type Props<E extends keyof JSX.IntrinsicElements> = PolymorphicProps<E, UnocssProps>;

export function Box<E extends keyof JSX.IntrinsicElements>(props: Props<E>) {
  return <UnocssComponent {...props} />;
}
