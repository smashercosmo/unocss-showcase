import { expect, it } from "vitest";

import { generateCssVariablesFromTheme } from "./generateCssVariablesFromTheme";

it("should generate css variables from the theme object", () => {
  const result = generateCssVariablesFromTheme({
    theme: {
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
      colors: {
        info: {
          dark: "#0B8AAC",
          main: "#0EA9D2",
          light: "#9BE4F8",
          surface: "#F1FBFE",
        },
      },
      borderRadius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.5rem",
        full: "50%",
      },
    },
    layer: "tokens",
  });
  expect(result).toMatchInlineSnapshot(`
    "@layer tokens {
    :where(:root, :host) {
    --breakpoints-sm: 640px;
    --breakpoints-md: 768px;
    --breakpoints-lg: 1024px;
    --breakpoints-xl: 1280px;
    --breakpoints-xxl: 1536px;
    --colors-info-dark: #0B8AAC;
    --colors-info-main: #0EA9D2;
    --colors-info-light: #9BE4F8;
    --colors-info-surface: #F1FBFE;
    --border-radius-xs: 0.125rem;
    --border-radius-sm: 0.25rem;
    --border-radius-md: 0.5rem;
    --border-radius-full: 50%;
    }
    }"
  `);
});
