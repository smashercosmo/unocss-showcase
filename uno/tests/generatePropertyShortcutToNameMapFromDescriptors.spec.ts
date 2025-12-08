import { describe, expect, it } from "vitest";

import { generatePropertyShortcutToNameMapFromDescriptors } from "../generators/generatePropertyShortcutToNameMapFromDescriptors";

describe("generatePropertyShortcutToNameMapFromDescriptors", () => {
  it("should generate property shortcut to name map from descriptors", () => {
    const result = generatePropertyShortcutToNameMapFromDescriptors([
      {
        properties: [
          "margin",
          "marginInline",
          "marginInlineStart",
          "marginInlineEnd",
          "marginBlock",
          "marginBlockStart",
          "marginBlockEnd",
        ],
      },
      {
        properties: [
          { name: "gridTemplateColumns", shortcut: "columns" },
          { name: "gridTemplateAreas", shortcut: "areas" },
          { name: "gridTemplateRows", shortcut: "rows" },
          { name: "gridAutoRows", shortcut: "autoRows" },
          { name: "gridColumn", shortcut: "column" },
          { name: "gridArea", shortcut: "area" },
          { name: "gridRow", shortcut: "row" },
        ],
      },
    ]);
    expect(result).toMatchInlineSnapshot(`
      {
        "area": "gridArea",
        "areas": "gridTemplateAreas",
        "autoRows": "gridAutoRows",
        "column": "gridColumn",
        "columns": "gridTemplateColumns",
        "row": "gridRow",
        "rows": "gridTemplateRows",
      }
    `);
  });
});
