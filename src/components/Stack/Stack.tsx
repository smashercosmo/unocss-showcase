import { UnocssComponent } from "@/components/UnocssComponent/UnocssComponent";
import type { PolymorphicProps, UnocssProps } from "@/components/UnocssComponent/UnocssComponent.types";
import { type JSX } from "react";
import {
  type AlignItems,
  type Display,
  type FlexDirection,
  type FlexDirectionShortcuts,
  type FlexWrap,
  type Grid,
  type GridShortcuts,
  type JustifyContent,
  type ResponsiveProperties,
} from "@uno/types";

type Props<E extends keyof JSX.IntrinsicElements> = PolymorphicProps<
  E,
  ResponsiveProperties<
    Omit<
      UnocssProps,
      keyof (Display & Grid & GridShortcuts & FlexDirection & AlignItems & JustifyContent)
    >
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
    )
>;

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
      direction={row ? "row" : (direction ?? "column")}
      flexWrap={wrap ? "wrap" : flexWrap}
      {...rest}
    />
  );
}
