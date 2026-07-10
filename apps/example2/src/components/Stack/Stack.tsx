import { type ForwardedRef, forwardRef } from "react";

import { Box } from "../Box/Box";
import {
  type PolymorphicProps,
  type AlignItems,
  type Display,
  type FlexDirection,
  type FlexDirectionShortcuts,
  type FlexWrap,
  type Grid,
  type GridShortcuts,
  type JustifyContent,
  type ResponsiveProperties,
  type CssProps,
} from "../../types";

type Props = PolymorphicProps<
  ResponsiveProperties<
    Omit<
      CssProps,
      keyof (Display &
        Grid &
        GridShortcuts &
        FlexDirection &
        AlignItems &
        JustifyContent)
    >
  > &
    (
      | ({ inline?: boolean } & ResponsiveProperties<{ display?: never }>)
      | ({ inline?: never } & ResponsiveProperties<{
          display: "none" | "contents" | "flex" | "inline-flex";
        }>)
    ) &
    (
      | ({ row?: boolean } & ResponsiveProperties<{ direction?: never }>)
      | ({ row?: never } & ResponsiveProperties<FlexDirectionShortcuts>)
    ) &
    (
      | ({ wrap?: boolean } & ResponsiveProperties<{ flexWrap?: never }>)
      | ({ wrap?: never } & ResponsiveProperties<FlexWrap>)
    )
>;

export const Stack = forwardRef(function _Stack(
  { inline, row, direction, wrap, flexWrap, display, ...rest }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Box
      display={inline ? "inline-flex" : (display ?? "flex")}
      direction={row ? "row" : (direction ?? "column")}
      flexWrap={wrap ? "wrap" : flexWrap}
      ref={ref}
      {...rest}
    />
  );
});
