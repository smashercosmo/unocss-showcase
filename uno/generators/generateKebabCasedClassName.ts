import { camelCaseToKebabCase } from "../utils";

export function generateKebabCasedClassName({
  selector,
  propertyShortcutToNameMap,
}: {
  selector: string;
  propertyShortcutToNameMap: Record<string, string>;
}) {
  const [nameOrShortcut, ...rest] = selector.substring(1).split("-");
  const property = propertyShortcutToNameMap[nameOrShortcut] ?? nameOrShortcut;

  return [`${camelCaseToKebabCase(property)}`]
    .concat(rest)
    .join("-")
    .replace(/\\(.)/g, "$1")
    .replace(/\s*(,)\s*/g, "$1")
    .replace(/\s*(\/)\s*/g, "$1")
    .replace(/\s+/g, "-");
}
