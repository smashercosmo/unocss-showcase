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
  type FlexDirectionShortcuts,
  type FlexWrap,
  type Gaps,
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
    AlignContent &
    AlignSelfJustifySelf &
    AlignItemsShortcuts &
    JustifyContentShortcuts
> &
  (
    | ({ inline?: boolean } & ResponsiveProperties<{ display?: never }>)
    | ({ inline?: never } & ResponsiveProperties<Display>)
  ) &
  (
    | ({ row?: boolean } & ResponsiveProperties<{ direction?: never }>)
    | ({ row?: never } & ResponsiveProperties<FlexDirectionShortcuts>)
  ) &
  (
    | ({ wrap?: boolean } & ResponsiveProperties<{ flexWrap?: never }>)
    | ({ wrap?: never } & ResponsiveProperties<FlexWrap>)
  );

type Props<E extends keyof JSX.IntrinsicElements> = PolymorphicProps<E, UnocssProps>;

export function Stack<E extends keyof JSX.IntrinsicElements>({
  inline,
  wrap,
  flexWrap,
  row,
  direction,
  ...rest
}: Props<E>) {
  return (
    <UnocssComponent
      display={inline ? "inline-flex" : "flex"}
      direction={row ? "row" : direction ?? "column"}
      flexWrap={wrap ? "wrap" : flexWrap}
      {...rest}
    />
  );
}
