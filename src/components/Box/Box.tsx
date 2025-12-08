import {
  UnocssComponent,
  type PolymorphicProps,
  type UnocssProps,
} from "@/components/UnocssComponent";
import { type JSX } from "react";
import type {
  AlignItemsShortcuts,
  FlexDirectionShortcuts,
  GridShortcuts,
  JustifyContentShortcuts,
  ResponsiveProperties,
} from "@uno/types";

type Props<E extends keyof JSX.IntrinsicElements> = PolymorphicProps<
  E,
  ResponsiveProperties<
    Omit<
      UnocssProps,
      keyof (GridShortcuts &
        FlexDirectionShortcuts &
        AlignItemsShortcuts &
        JustifyContentShortcuts)
    >
  >
>;

export function Box<E extends keyof JSX.IntrinsicElements>(props: Props<E>) {
  return <UnocssComponent {...props} />;
}
