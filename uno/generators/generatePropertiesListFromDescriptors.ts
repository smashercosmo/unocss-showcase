import type { Descriptor } from "../descriptors";
import type { PresetUnoTheme } from "unocss";

export function generatePropertiesListFromDescriptors({
  descriptors,
  theme,
}: {
  descriptors: Descriptor[];
  theme: PresetUnoTheme;
}) {
  return descriptors.flatMap((descriptor) => {
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
          ...(theme.breakpoints === undefined
            ? []
            : Object.keys(theme.breakpoints).map((breakpoint) => {
                return `${breakpoint}:${name}` as const;
              })),
        ];
      });
    });
  });
}
