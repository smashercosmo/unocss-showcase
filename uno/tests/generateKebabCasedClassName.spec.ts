import { describe, expect, it } from "vitest";

import { generateKebabCasedClassName } from "../generators/generateKebabCasedClassName";

describe("generateKebabCasedClassName", () => {
  it("should generate kebab-cased selectors", () => {
    const unocssSelectors = [
      ".gridRow-1\\ \\/\\ -1",
      ".row-2\\ \\/\\ -2",
      ".gridTemplateColumns-200px\\ minmax\\(900px\\,\\ 1fr\\)\\ 100px",
      ".columns-repeat\\(3\\,\\ 1fr\\)",
      `.gridTemplateAreas-\\"header\\ header\\"\\ \\"content\\ content\\"\\ \\"footer\\ footer\\"`,
      `.areas-\\"one\\ one\\"\\ \\"two\\ two\\"\\ \\"three\\ three\\"`,
    ];

    const result = unocssSelectors.map((selector) => {
      return generateKebabCasedClassName({
        selector,
        propertyShortcutToNameMap: {
          "columns": "gridTemplateColumns",
          "row": "gridRow",
          "areas": "gridTemplateAreas",
        }
      })
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "grid-row-1/-1",
        "grid-row-2/-2",
        "grid-template-columns-200px-minmax(900px,1fr)-100px",
        "grid-template-columns-repeat(3,1fr)",
        "grid-template-areas-"header-header"-"content-content"-"footer-footer"",
        "grid-template-areas-"one-one"-"two-two"-"three-three"",
      ]
    `);
  });
});
