import type { Descriptor } from "../descriptors";

export function generatePropertyShortcutToNameMapFromDescriptors(
  descriptors: Descriptor[]
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