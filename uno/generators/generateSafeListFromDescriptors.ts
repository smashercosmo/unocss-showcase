import type { Descriptor } from "../descriptors";
import type { PresetUnoTheme } from "unocss";

export function generateSafeListFromDescriptors({
  descriptors,
  theme,
}: {
  descriptors: Descriptor[];
  theme: PresetUnoTheme;
}) {
  return descriptors.flatMap((descriptor: Descriptor) => {
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
