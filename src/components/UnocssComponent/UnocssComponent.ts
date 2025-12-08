import {
  cloneElement,
  createElement,
  type ReactElement,
  type JSX,
  type ReactNode,
} from "react";
import { type UnocssProps, type ResponsiveProperties } from "@uno/types";
import { camelCaseToKebabCase, typedKeys } from "@uno/utils";
import { descriptors } from "@uno/descriptors";
import { theme } from "@uno/theme";

type Props = {
  asChild?: never;
  as?: never;
  children?: ReactNode;
};

type AsChildProps = {
  asChild: true;
  as?: never;
  children: ReactElement<{ className?: string }>;
};

type AsProps<E extends keyof JSX.IntrinsicElements, OwnProps extends object> = {
  as: E;
  asChild?: never;
  children?: ReactNode;
} & Omit<JSX.IntrinsicElements[E], keyof OwnProps | "as">;

export type PolymorphicProps<
  E extends keyof JSX.IntrinsicElements = "div",
  OwnProps extends object = object,
> = (Props | AsChildProps | AsProps<E, OwnProps>) & OwnProps;

const propertiesSet = new Set<unknown>(
  Object.values(descriptors).flatMap((descriptor) => {
    return descriptor.properties.flatMap((property) => {
      const shortcut =
        typeof property === "string"
          ? undefined
          : "shortcut" in property
            ? property.shortcut
            : undefined;

      return [
        typeof property === "string" ? property : property.name,
        ...(shortcut ? [shortcut] : []),
      ].flatMap((name) => {
        return [
          name,
          ...typedKeys(theme.breakpoints).map((breakpoint) => {
            return `${breakpoint}:${name}` as const;
          }),
        ];
      });
    });
  })
);

const shortcutsMap: Record<string, string> = {};

for (const name of typedKeys(descriptors)) {
  for (const property of descriptors[name].properties) {
    if (typeof property === "object" && "shortcut" in property) {
      shortcutsMap[property.shortcut] = property.name;
    }
  }
}

function getDefaultBorderProps(props: ResponsiveProperties<UnocssProps>) {
  const hasBorderWidthSet = typedKeys(props).some((key) =>
    /border(.*)Width$/.test(key)
  );
  return {
    borderStyle:
      props.borderColor && props.borderStyle === undefined
        ? "solid"
        : props.borderStyle,
    borderWidth:
      props.borderColor && !hasBorderWidthSet ? 1 : props.borderWidth,
  };
}

export function UnocssComponent<E extends keyof JSX.IntrinsicElements>(
  props: PolymorphicProps<E, ResponsiveProperties<UnocssProps>>
) {
  const classNames = Object.entries({
    ...getDefaultBorderProps(props),
    ...props
  })
    .filter(
      (entry): entry is [string, string | number] =>
        propertiesSet.has(entry[0]) &&
        (typeof entry[1] === "string" || typeof entry[1] === "number")
    )
    .map(([key, value]) => {
      const [variant, name] = key.includes(":")
        ? key.split(":")
        : [undefined, key];
      const property = camelCaseToKebabCase(shortcutsMap[name] ?? name);
      const propertyWithVariant = variant ? `${variant}:${property}` : property;
      return [propertyWithVariant, String(value).replace(/ /g, "-")].join("-");
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
    Object.entries(rest).filter(([key]) => !propertiesSet.has(key))
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
