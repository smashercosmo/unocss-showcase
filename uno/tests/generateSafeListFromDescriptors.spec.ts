import { describe, expect, it } from "vitest";

import { generateSafeListFromDescriptors } from "../generators/generateSafeListFromDescriptors";

describe("generateSafeListFromDescriptors", () => {
  it("should generate safelist from descriptors", () => {
    const result = generateSafeListFromDescriptors({
      descriptors: [
        {
          properties: [
            { name: "borderRadius" },
            "borderEndEndRadius",
            "borderStartStartRadius",
          ],
          token: "borderRadius",
          values: [0, 1],
        },
      ],
      theme: {
        borderRadius: {
          sm: "0.125rem",
          md: "0.25rem",
          full: "50%",
        },
      },
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "borderRadius-0",
        "borderRadius-1",
        "borderRadius-sm",
        "borderRadius-md",
        "borderRadius-full",
        "borderEndEndRadius-0",
        "borderEndEndRadius-1",
        "borderEndEndRadius-sm",
        "borderEndEndRadius-md",
        "borderEndEndRadius-full",
        "borderStartStartRadius-0",
        "borderStartStartRadius-1",
        "borderStartStartRadius-sm",
        "borderStartStartRadius-md",
        "borderStartStartRadius-full",
      ]
    `);
  });
});
