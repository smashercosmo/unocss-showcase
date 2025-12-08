import { camelCaseToKebabCase } from "./utils";

type ThemePart = { [Key in string]: ThemeValue };
type ThemeValue = string | number | ThemePart;

/**
 * Flattens theme object.
 *
 * Example:
 * const theme = {
 *   spacing: { "2xs": "0.125rem", xs: "0.25rem" },
 *   borderRadius: { xs: "0.125rem", sm: "0.25rem" },
 *   colors: { info: { dark: "#0B8AAC" } },
 * };
 * flattenTheme(theme);
 *
 * Output:
 * {
 *   "spacing-2xs": "0.125rem",
 *   "spacing-xs": "0.25rem"
 *   "border-radius-xs": "0.125rem",
 *   "border-radius-sm": "0.25rem",
 *   "colors-info-dark": "#0B8AAC",
 * }
 */
export function flattenTheme({
  theme,
  parentKey = "",
  flattenedTheme = {},
}: {
  theme: ThemePart;
  parentKey?: string;
  flattenedTheme?: Record<string, string>;
}) {
  Object.entries(theme).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null && value !== undefined) {
      flattenTheme({
        theme: value,
        parentKey: `${parentKey}${key}-`,
        flattenedTheme,
      });
    } else {
      flattenedTheme[`${parentKey}${key}`] = String(value);
    }
  });
  return flattenedTheme;
}

/**
 * Generates CSS variables from the theme.
 *
 * Example:
 * const theme = { spacing: { "2xs": "0.125rem", xs: "0.25rem" }};
 * generateCssVariablesFromTheme({ theme, layer: "new-tokens" });
 *
 * Output:
 * "@layer new-tokens {
 * :where(:root, :host) {
 * --spacing-2xs: 0.125rem;
 * --spacing-xs: 0.25rem;
 * }
 * }"
 */
export function generateCssVariablesFromTheme({
  theme,
  layer,
}: {
  theme: ThemePart;
  layer: string;
}) {
  const cssVariables = Object.entries(flattenTheme({ theme }))
    .map(([key, value]) => {
      return `--${camelCaseToKebabCase(key)}: ${value};`;
    })
    .join("\r\n");
  return [
    `@layer ${layer} {`,
    ":where(:root, :host) {",
    cssVariables,
    "}",
    "}",
  ].join("\r\n");
}
