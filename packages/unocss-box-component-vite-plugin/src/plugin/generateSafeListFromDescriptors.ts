import { type Descriptor, type GenericTheme } from "../shared";

export function generateSafeListFromDescriptors<Theme extends GenericTheme>({
  descriptors,
  theme,
}: {
  descriptors: Descriptor<GenericTheme>[];
  theme: GenericTheme;
}) {
  return descriptors.flatMap((descriptor: Descriptor<GenericTheme>) => {
    const properties = descriptor.properties.map((property) => {
      return typeof property === "string" ? property : property.name;
    });
    const values = [
      ...(descriptor.values ?? []),
      ...(descriptor.token ? Object.keys(theme[descriptor.token] ?? {}) : []),
    ];
    return properties.flatMap((property) => {
      return values.map((value) => `${property}-${value}`);
    });
  });
}
