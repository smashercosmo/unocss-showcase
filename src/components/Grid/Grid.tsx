import { UnocssComponent } from "@/components/UnocssComponent/UnocssComponent";
import { type JSX } from "react";
import type {
  PolymorphicProps,
  UnocssProps,
} from "@/components/UnocssComponent";
import type {
  AlignItems,
  Display,
  FlexDirection,
  FlexDirectionShortcuts,
  Grid,
  JustifyContent,
  ResponsiveProperties,
} from "@uno/types";

type Props<E extends keyof JSX.IntrinsicElements> = PolymorphicProps<
  E,
  ResponsiveProperties<
    Omit<
      UnocssProps,
      keyof (Display &
        Grid &
        FlexDirection &
        FlexDirectionShortcuts &
        AlignItems &
        JustifyContent)
    >
  > &
    (
      | ({ inline?: boolean } & ResponsiveProperties<{ display?: never }>)
      | ({ inline?: never } & ResponsiveProperties<Display>)
    )
>;

export function Grid<E extends keyof JSX.IntrinsicElements>({
  inline,
  ...rest
}: Props<E>) {
  return (
    <UnocssComponent display={inline ? "inline-grid" : "grid"} {...rest} />
  );
}
