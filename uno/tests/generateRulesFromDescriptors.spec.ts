import { describe, expect, it } from "vitest";
import { generateRulesFromDescriptors } from "../generators/generateRulesFromDescriptors";
import type { RuleContext } from "unocss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const context = {} as RuleContext<any>;

describe("generateRulesFromDescriptors", () => {
  it("should generate simple rule", () => {
    const property = "flex";
    const descriptor = {
      properties: [property],
    };
    const result = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher]) => matcher(`${property}-none`.match(regex)!, context)
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "flex": "none",
        },
      ]
    `);
  });

  it("should generate rule for multiple properties", () => {
    const property1 = "alignSelf";
    const property2 = "justifySelf";
    const descriptor = {
      properties: [property1, property2],
    };
    const result = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher], index) =>
        matcher(`${descriptor.properties[index]}-center`.match(regex)!, context)
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "align-self": "center",
        },
        {
          "justify-self": "center",
        },
      ]
    `);
  });

  it("should generate rule for multiple properties defined as strings or objects", () => {
    const property1 = "alignSelf";
    const property2 = "justifySelf";
    const descriptor = {
      properties: [property1, { name: property2 }],
    };
    const result = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher], index) => {
        const property =
          typeof descriptor.properties[index] === "object"
            ? descriptor.properties[index]?.name
            : descriptor.properties[index];
        return matcher(`${property}-center`.match(regex)!, context);
      }
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "align-self": "center",
        },
        {
          "justify-self": "center",
        },
      ]
    `);
  });

  it("should generate rule for both property name and shortcut", () => {
    const property = "alignItems";
    const shortcut = "align";
    const descriptor = {
      properties: [{ name: property, shortcut }],
    };
    const result1 = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher], index) =>
        matcher(
          `${descriptor.properties[index].name}-center`.match(regex)!,
          context
        )
    );
    const result2 = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher], index) =>
        matcher(
          `${descriptor.properties[index].shortcut}-center`.match(regex)!,
          context
        )
    );
    expect(result1).toMatchInlineSnapshot(`
      [
        {
          "align-items": "center",
        },
      ]
    `);
    expect(result2).toMatchInlineSnapshot(`
      [
        {
          "align-items": "center",
        },
      ]
    `);
  });

  it("should convert unitless numbers to pixels if isUnitlessNumberAShortcutForPixelValue option is true", () => {
    const property = "top";
    const descriptor = {
      properties: [property],
      isUnitlessNumberAShortcutForPixelValue: true,
    };
    const result = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher]) => matcher(`${property}-1`.match(regex)!, context)
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "top": "1px",
        },
      ]
    `);
  });

  it("should generate token-values if token option is provided", () => {
    const property = "color";
    const descriptor = {
      properties: [property],
      token: "colors" as const,
    };
    const result = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher]) =>
        matcher(`${property}-success-main`.match(regex)!, context)
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "color": "var(--colors-success-main)",
        },
      ]
    `);
  });

  it("should generate token-values but not for explicitly provided values", () => {
    const property = "color";
    const descriptor = {
      properties: [property],
      token: "colors" as const,
      values: ["currentColor"],
    };
    const result = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher]) =>
        matcher(`${property}-currentColor`.match(regex)!, context)
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "color": "currentColor",
        },
      ]
    `);
  });

  it("should generate rule with fallback if fallback option is provided", () => {
    const property = "overflowBlock";
    const descriptor = {
      properties: [{ name: property, fallback: "overflowY" }],
    };
    const result = generateRulesFromDescriptors([descriptor]).map(
      ([regex, matcher]) => matcher(`${property}-hidden`.match(regex)!, context)
    );
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "overflow-block": "hidden",
          "overflow-y": "hidden",
        },
      ]
    `);
  });
});
