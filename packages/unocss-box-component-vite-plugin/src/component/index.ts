import { cloneElement, createElement, type CSSProperties, type ForwardedRef, forwardRef,
  PropsWithoutRef, type ReactElement, type ReactNode } from "react";
import { mergeProps } from "react-aria";
import { type Descriptor, convertUnitlessNumberToPixelValue, generateKebabCasedClassName, type GenericTheme } from "../shared";

type Props = {
  asChild?: false;
  children?: ReactNode;
};

type AsChildProps = {
  asChild: true;
  children: ReactElement<{
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }>;
};

type PolymorphicProps<OwnProps extends object> = (Props | AsChildProps) &
  OwnProps;

type PrefixedProperties<T, Prefixes extends string | undefined> = Prefixes extends undefined
  ? { [K in keyof T]: T[K] }
  : { [K in keyof T]: T[K] } & { [K in keyof T as `${Prefixes}:${string & K}`]: T[K];
};

type ResponsiveProperties<T, Breakpoint extends string | undefined = undefined> = PrefixedProperties<T, Breakpoint>;

export function generatePropertyShortcutToNameMapFromDescriptors<Theme extends GenericTheme>(
  descriptors: Descriptor<Theme>[]
) {
  const shortcutsMap: Record<string, string> = {};

  for (const descriptor of descriptors) {
    for (const property of descriptor.properties) {
      if (
        typeof property === "object" &&
        "shortcut" in property &&
        property.shortcut
      ) {
        shortcutsMap[property.shortcut] = property.name;
      }
    }
  }

  return shortcutsMap;
}

function toTypedEntries<K extends string, V>(obj?: Partial<Record<K, V>>): Array<[K, V]> {
  if (!obj) return [];
  return Object.entries(obj) as Array<[K, V]>;
}

function findDescriptorByPropertyName<Theme extends GenericTheme>({ propertyName, descriptors } : { propertyName: string, descriptors: Descriptor<Theme>[]  }): Descriptor<Theme> | undefined {
  return descriptors.find(({ properties }) => {
    return properties.some(property => {
      const { name } = typeof property === "string" ? { name: property } : property;
      const shortcut = typeof property === "object" && "shortcut" in property ? property.shortcut : undefined;
      return propertyName === name || propertyName === shortcut;
    });
  });
}

function getValuePropertyValueFromDescriptor<Theme extends GenericTheme>({
 descriptor,
 value,
}: {
  descriptor: Descriptor<Theme>;
  value: string | number;
}) {
  const { token, values, isUnitlessNumberAShortcutForPixelValue } = descriptor;
  const isExplicitlyDefinedValue = values?.map(String).includes(String(value));
  return token && !isExplicitlyDefinedValue
    ? value
    : isUnitlessNumberAShortcutForPixelValue
      ? convertUnitlessNumberToPixelValue(String(value))
      : String(value);
}

function buildStylesAndFilterProps<Theme extends GenericTheme, Props extends ResponsiveProperties<Record<string, unknown>>>({ props, breakpoints, propertyShortcutToNameMap, descriptors }: { props: Props, propertyShortcutToNameMap: Record<string, string>, breakpoints?: string[], descriptors: Descriptor<Theme>[] }) {
  const classNames: string[] = [];
  const restProps: Record<string, unknown> = {};
  const breakpointKeysSet = new Set<unknown>(breakpoints);

  for (const [key, value] of toTypedEntries(props)) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value === undefined) continue;
    if (typeof value !== "string" && typeof value !== "number") {
      restProps[key] = value;
      continue;
    }

    // Responsive prefix e.g. "md:padding"
    const isResponsive = key.includes(":");

    if (isResponsive) {
      const [breakpoint, prop] = key.split(":");
      const descriptor = findDescriptorByPropertyName({ propertyName: prop, descriptors });
      if (!descriptor) continue;
      if (!breakpointKeysSet.has(breakpoint)) continue;
      classNames.push(generateKebabCasedClassName({
        propertyShortcutToNameMap,
        selector: `.${breakpoint}:${propertyShortcutToNameMap[prop] ?? prop}-${getValuePropertyValueFromDescriptor({
          descriptor,
          value,
        })}`,
      }))
    } else {
      const descriptor = findDescriptorByPropertyName({ propertyName: key, descriptors });
      if (descriptor) {
        classNames.push(generateKebabCasedClassName({
          propertyShortcutToNameMap,
          selector: `.${propertyShortcutToNameMap[key] ?? key}-${getValuePropertyValueFromDescriptor({
            descriptor,
            value,
          })}`,
        }))
      } else {
        restProps[key] = value;
      }
    }
  }

  return {
    classNames: classNames.join(' '),
    restProps: restProps as unknown as PolymorphicProps<object>,
  };
}

export function createBoxComponent<Theme extends GenericTheme, ComponentProps extends Record<string, unknown>>({ breakpoints, descriptors }: {
  descriptors: Descriptor<Theme>[];
  breakpoints?: string[];
}) {
  const propertyShortcutToNameMap = generatePropertyShortcutToNameMapFromDescriptors(descriptors);


  return forwardRef(function _Box(props: PropsWithoutRef<ComponentProps>, ref: ForwardedRef<HTMLDivElement>) {
    const { classNames, restProps } = buildStylesAndFilterProps({ props, breakpoints, descriptors, propertyShortcutToNameMap });

    if (restProps.asChild) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, asChild, ...rest } = restProps;
      return cloneElement(children, mergeProps(rest, children.props, { ref, className: classNames }));
    }

    const { children, ...rest } = restProps;

    return createElement("div", mergeProps(rest, { ref, className: classNames }), children);
  });
}