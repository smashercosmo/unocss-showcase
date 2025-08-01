import { forwardRef, type ForwardedRef, type ReactNode } from "react";

import {
  type AlignItems,
  type BorderRadius,
  type BorderWidth,
  type Colors,
  type Display,
  type Flex,
  type Gap,
  type JustifyContent,
  type Margin,
  type Padding,
  type Position,
  type ResponsiveProperties,
  type Size,
} from "./Box.types";

type Props = {
  id?: string;
  children?: ReactNode;
} & Colors &
  Display &
  BorderRadius &
  AlignItems &
  JustifyContent &
  BorderWidth &
  ResponsiveProperties<Margin> &
  ResponsiveProperties<Padding> &
  ResponsiveProperties<Size> &
  ResponsiveProperties<Position> &
  ResponsiveProperties<Flex> &
  ResponsiveProperties<Gap>;

function generateClasses(props: Omit<Props, "children">) {
  return Object.entries(props)
    .filter(
      ([, value]) => typeof value === "string" || typeof value === "number"
    )
    .map(([key, value]) => {
      return [key, value].join("-");
    }).join(" ");
}

export const Box = forwardRef(
  ({ children, id, ...rest }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div id={id} className={generateClasses(rest)} ref={ref}>
        {children}
      </div>
    );
  }
);
