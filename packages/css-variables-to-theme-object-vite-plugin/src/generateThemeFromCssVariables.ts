import postcss from "postcss";

function kebabCaseToCamelCase(str: string): string {
  return str.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

export function generateThemeFromCssVariables(css: string) {
  const theme: Record<string, Record<string, string | number>> = {};
  postcss.parse(css).walkDecls((decl) => {
    if (decl.prop.startsWith("--")) {
      // Split by your '__' separator
      const parts = decl.prop.slice(2).split("__");

      if (parts.length === 2) {
        const [category, token] = parts;
        const camelCasedCategory = kebabCaseToCamelCase(category)
        theme[camelCasedCategory] ??= {};
        theme[camelCasedCategory][token] = decl.value.trim();
      }
    }
  });
  return theme;
}
