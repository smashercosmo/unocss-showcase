import { theme } from "./theme";
import { type Descriptor, descriptors } from "./descriptors";
import { typedKeys } from "./utils";

export const safeList = [
  descriptors.display,
  descriptors.gaps,
  descriptors.alignItems,
  descriptors.alignSelfJustifySelf,
  descriptors.justifyContent,
  descriptors.alignContent,
  descriptors.colors,
  descriptors.flexDirection,
  descriptors.borderStyle,
  { ...descriptors.borderWidths, values: [0, 1] },
].flatMap((descriptor: Descriptor) => {
  const properties = descriptor.properties.map((property) => {
    return typeof property === "string" ? property : property.name;
  });
  const values = [
    ...(descriptor.values ?? []),
    ...(descriptor.token ? typedKeys(theme[descriptor.token]) : []),
  ];
  return properties.flatMap((property) => {
    return values.map((value) => `${property}-${value}`);
  });
});
