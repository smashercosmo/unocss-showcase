import { expect, it } from "vitest";
import { generateClassNamesFromProps } from "./UnocssComponent.utils";

it("should generate correct class names", () => {
  const result = generateClassNamesFromProps({
    props: {
      padding: "xs"
    },
    propertiesToInclude: new Set(["padding"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "padding-xs",
    ]
  `);
});

it("should only include properties listed in the propertiesToInclude option", () => {
  const result = generateClassNamesFromProps({
    props: {
      padding: "xs",
      margin: "sm"
    },
    propertiesToInclude: new Set(["padding"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "padding-xs",
    ]
  `);
});

it("should handle properties with variants", () => {
  const result = generateClassNamesFromProps({
    props: {
      "md:padding": "xs",
    },
    propertiesToInclude: new Set(["padding", "md:padding"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "md:padding-xs",
    ]
  `);
});

it("should camel-case properties", () => {
  const result = generateClassNamesFromProps({
    props: {
      "gridTemplateColumns": "1fr",
    },
    propertiesToInclude: new Set(["gridTemplateColumns"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "grid-template-columns-1fr",
    ]
  `);
});

it("should handle shortcuts", () => {
  const result = generateClassNamesFromProps({
    props: {
      "columns": "1fr",
    },
    propertiesToInclude: new Set(["columns"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "grid-template-columns-1fr",
    ]
  `);
});

it("should replace spaces with dashes", () => {
  const result = generateClassNamesFromProps({
    props: {
      "gridTemplateColumns": "200px minmax(900px, 1fr) 100px",
    },
    propertiesToInclude: new Set(["gridTemplateColumns"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "grid-template-columns-200px-minmax(900px,1fr)-100px",
    ]
  `);
});

it("should generate default border props", () => {
  const result = generateClassNamesFromProps({
    props: {
      "borderColor": "success-main",
    },
    propertiesToInclude: new Set(["borderColor", "borderStyle", "borderWidth"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "border-color-success-main",
      "border-style-solid",
      "border-width-1",
    ]
  `);
});

it("should generate default border props if border general border width is set", () => {
  const result = generateClassNamesFromProps({
    props: {
      "borderColor": "success-main",
      "borderWidth": "2"
    },
    propertiesToInclude: new Set(["borderColor", "borderStyle", "borderWidth"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "border-color-success-main",
      "border-style-solid",
      "border-width-2",
    ]
  `);
});

it("should not generate just default border style classes of specific border width is set", () => {
  const result = generateClassNamesFromProps({
    props: {
      "borderColor": "success-main",
      "borderInlineWidth": "2"
    },
    propertiesToInclude: new Set(["borderColor", "borderStyle", "borderWidth", "borderInlineWidth"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "border-color-success-main",
      "border-style-solid",
      "border-inline-width-2",
    ]
  `);
});

it("should not generate default border class if all border props are set", () => {
  const result = generateClassNamesFromProps({
    props: {
      "borderColor": "success-main",
      "borderInlineWidth": "2",
      "borderStyle": "dashed",
    },
    propertiesToInclude: new Set(["borderColor", "borderStyle", "borderWidth", "borderInlineWidth"]),
  });
  expect(result).toMatchInlineSnapshot(`
    [
      "border-color-success-main",
      "border-style-dashed",
      "border-inline-width-2",
    ]
  `);
});