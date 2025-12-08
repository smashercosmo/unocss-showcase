import { cloneElement, createElement, type JSX } from "react";
import type { ResponsiveProperties } from "@uno/types";
import { theme } from "@uno/theme";
import { descriptors } from "@uno/descriptors";
import { generatePropertiesListFromDescriptors } from "@uno/generators/generatePropertiesListFromDescriptors";
import { generateClassNamesFromProps } from "./UnocssComponent.utils";
import type { PolymorphicProps, UnocssProps } from "./UnocssComponent.types";

const allPropertiesSet = new Set<unknown>(
  generatePropertiesListFromDescriptors({
    descriptors: Object.values(descriptors),
    theme,
  })
);

export function UnocssComponent<E extends keyof JSX.IntrinsicElements>(
  props: PolymorphicProps<E, ResponsiveProperties<UnocssProps>>
) {
  const classNames = generateClassNamesFromProps({
    props,
    propertiesToInclude: allPropertiesSet,
  });

  if (props.asChild) {
    const { children } = props;
    return cloneElement(children, {
      className: [children.props.className]
        .filter(Boolean)
        .concat(classNames)
        .join(" "),
    });
  }

  const { as, children, ...rest } = props;

  const domProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !allPropertiesSet.has(key))
  );

  return createElement(
    as ?? "div",
    {
      ...domProps,
      className: classNames.join(" "),
    },
    children
  );
}
