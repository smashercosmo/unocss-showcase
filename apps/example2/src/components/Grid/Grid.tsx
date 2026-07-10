import { type ForwardedRef, forwardRef } from "react";

import type {
  AlignItems,
  Display,
  FlexDirection,
  FlexDirectionShortcuts,
  Grid as GridType,
  JustifyContent,
  ResponsiveProperties,
  PolymorphicProps,
  CssProps,
} from "../../types";

import { Box } from "../Box/Box";

type Props = PolymorphicProps<
  ResponsiveProperties<
    Omit<
      CssProps,
      keyof (Display &
        GridType &
        FlexDirection &
        FlexDirectionShortcuts &
        AlignItems &
        JustifyContent)
    >
  > &
    (
      | ({ inline?: boolean } & ResponsiveProperties<{ display?: never }>)
      | ({ inline?: never } & ResponsiveProperties<{
          display?: "none" | "contents" | "grid" | "inline-grid";
        }>)
    )
>;

export const Grid = forwardRef(function _Grid(
  { inline, display, ...rest }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Box
      display={inline ? "inline-grid" : (display ?? "grid")}
      ref={ref}
      {...rest}
    />
  );
});
