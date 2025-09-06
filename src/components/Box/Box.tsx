import { forwardRef, type ForwardedRef, type ReactNode } from "react";
import { clsx } from "clsx";
import { CCS_VALUE_SPLITTER_REGEX } from "../../../unocss/utils/constants";

import {
  type AlignItems,
  type BorderRadius,
  type BorderWidth,
  type Colors,
  type Display,
  type Flex,
  type Grid,
  type JustifyContent,
  type Margin,
  type Overflow,
  type Padding,
  type Position,
  type ResponsiveProperties,
  type Size,
  type Gap,
} from "./Box.types";

type Props = {
  children?: ReactNode;
} &
  ResponsiveProperties<Gap> &
  ResponsiveProperties<Display> &
  ResponsiveProperties<AlignItems> &
  ResponsiveProperties<JustifyContent> &
  ResponsiveProperties<Colors> &
  ResponsiveProperties<BorderWidth> &
  ResponsiveProperties<BorderRadius> &
  ResponsiveProperties<Margin> &
  ResponsiveProperties<Padding> &
  ResponsiveProperties<Size> &
  ResponsiveProperties<Position> &
  ResponsiveProperties<Overflow> &
  ResponsiveProperties<Flex> &
  ResponsiveProperties<Grid>;

function generateClasses(props: Omit<Props, "children">) {
  return Object.entries(props)
    .filter(
      ([, value]) => typeof value === "string" || typeof value === "number"
    )
    .map(([key, value]) => {
      return [
        key,
        (String(value).match(CCS_VALUE_SPLITTER_REGEX) ?? []).join("-"),
      ].join("-");
    });
}

// eslint-disable-next-line react/display-name
export const Box = forwardRef(
  (
    { children, ...rest }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className={clsx(generateClasses(rest))} ref={ref}>
        {children}
      </div>
    );
  }
);
