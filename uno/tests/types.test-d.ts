/* eslint-disable @typescript-eslint/no-unused-vars -- variables in this file are used only as types */

import { describe, expectTypeOf, it } from "vitest";
import type { PropsFromDescriptor, Tokens } from "../types";
import type { Descriptor } from "../descriptors";

describe("Types", () => {
  it("should use `string | number` as a fallback value for a property if the descriptor is missing both the token and values fields", () => {
    const descriptor = {
      properties: ["flex"],
    } as const satisfies Descriptor;

    expectTypeOf<{ flex?: string | number }>().toEqualTypeOf<
      PropsFromDescriptor<typeof descriptor>
    >();
  });

  it("should use generate property value based on the `token` field", () => {
    const descriptor = {
      properties: ["padding"],
      token: "spacing",
    } as const satisfies Descriptor;

    expectTypeOf<{ padding?: Tokens["spacing"] }>().toEqualTypeOf<
      PropsFromDescriptor<typeof descriptor>
    >();
  });

  it("should use generate property value based on the `values` field", () => {
    const descriptor = {
      properties: ["margin"],
      values: [0, 1, "auto"],
    } as const satisfies Descriptor;

    expectTypeOf<{ margin?: 0 | 1 | "auto" }>().toEqualTypeOf<
      PropsFromDescriptor<typeof descriptor>
    >();
  });

  it("should use generate property value based on both the `token` and `values` fields", () => {
    const descriptor = {
      properties: ["margin"],
      token: "spacing",
      values: [0, 1, "auto"],
    } as const satisfies Descriptor;

    expectTypeOf<{
      margin?: Tokens["spacing"] | 0 | 1 | "auto";
    }>().toEqualTypeOf<PropsFromDescriptor<typeof descriptor>>();
  });

  it("should generate type for multiple properties", () => {
    const descriptorStrings = {
      properties: ["margin", "marginInline", "marginBlock"],
      token: "spacing",
      values: [0, 1, "auto"],
    } as const satisfies Descriptor;

    const descriptorObjects = {
      properties: [
        { name: "margin" },
        { name: "marginInline" },
        { name: "marginBlock" },
      ],
      token: "spacing",
      values: [0, 1, "auto"],
    } as const satisfies Descriptor;

    const descriptorMixed = {
      properties: [{ name: "margin" }, "marginInline", { name: "marginBlock" }],
      token: "spacing",
      values: [0, 1, "auto"],
    } as const satisfies Descriptor;

    type ExpectedType = {
      margin?: Tokens["spacing"] | 0 | 1 | "auto";
      marginInline?: Tokens["spacing"] | 0 | 1 | "auto";
      marginBlock?: Tokens["spacing"] | 0 | 1 | "auto";
    };

    expectTypeOf<ExpectedType>().toEqualTypeOf<
      PropsFromDescriptor<typeof descriptorStrings>
    >();
    expectTypeOf<ExpectedType>().toEqualTypeOf<
      PropsFromDescriptor<typeof descriptorObjects>
    >();
    expectTypeOf<ExpectedType>().toEqualTypeOf<
      PropsFromDescriptor<typeof descriptorMixed>
    >();
  });

  it("should generate type for shortcuts", () => {
    const descriptor = {
      properties: [
        { name: "gridTemplateColumns", shortcut: "columns" },
        { name: "gridTemplateRows", shortcut: "rows" },
        { name: "gridAutoRows", shortcut: "autoRows" },
        { name: "gridColumn", shortcut: "column" },
        { name: "gridRow", shortcut: "row" },
      ],
    } as const satisfies Descriptor;

    expectTypeOf<{
      gridTemplateColumns?: string | number;
      gridTemplateRows?: string | number;
      gridAutoRows?: string | number;
      gridColumn?: string | number;
      gridRow?: string | number;
    }>().toEqualTypeOf<PropsFromDescriptor<typeof descriptor>>();

    expectTypeOf<{
      columns?: string | number;
      rows?: string | number;
      autoRows?: string | number;
      column?: string | number;
      row?: string | number;
    }>().toEqualTypeOf<
      PropsFromDescriptor<typeof descriptor, { shortcuts: true }>
    >();
  });
});
