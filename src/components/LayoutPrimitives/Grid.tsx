import {
  UnocssComponent,
  type PolymorphicProps,
} from "@/components/UnocssComponent/UnocssComponent";
import { type JSX } from "react";
import {
  type AlignContent,
  type AlignItemsShortcuts,
  type AlignSelfJustifySelf,
  type BorderRadiuses,
  type BorderStyle,
  type BorderWidths,
  type Colors,
  type Display,
  type Flex,
  type Gaps,
  type GridShortcuts,
  type Insets,
  type JustifyContentShortcuts,
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
    Position &
    Flex &
    Insets &
    Sizes &
    TextAlign &
    VerticalAlign &
    BorderStyle &
    BorderWidths &
    Gaps &
    GridShortcuts &
    AlignContent &
    AlignSelfJustifySelf &
    AlignItemsShortcuts &
    JustifyContentShortcuts
> &
  (
    | ({ inline?: boolean } & ResponsiveProperties<{ display?: never }>)
    | ({ inline?: never } & ResponsiveProperties<Display>)
  );

type Props<E extends keyof JSX.IntrinsicElements> = PolymorphicProps<
  E,
  UnocssProps
>;

export function Grid<E extends keyof JSX.IntrinsicElements>({
  inline,
  ...rest
}: Props<E>) {
  return (
    <UnocssComponent display={inline ? "inline-grid" : "grid"} {...rest} />
  );
}
