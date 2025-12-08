import { expect, it, describe } from "vitest";

import { extract } from "../extractor";

describe("Extractor", () => {
  it("should extract prop-value pairs from code", () => {
    const result = extract({
      code: `
      <div color="red">
        <Box size={300} />
      </div>  
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "color-red",
        "size-300",
      ]
    `);
  });

  it("should extract only from specified components", () => {
    const result = extract({
      code: `
      <div color="red">
        <Box size={300} />
      </div>  
    `,
      components: ["Box"],
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "size-300",
      ]
    `);
  });

  it("should ignore boolean props", () => {
    const result = extract({
      code: `
      <Box inline hidden size={300} inert />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "size-300",
      ]
    `);
  });

  it("should handle single quotes, double quotes and backticks", () => {
    const result = extract({
      code: `
      <Box size="300rem" color='red' position={\`relative\`} />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "size-300rem",
        "color-red",
        "position-relative",
      ]
    `);
  });

  it("should handle camelCased props", () => {
    const result = extract({
      code: `
      <Box inlineSize="300rem" />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "inlineSize-300rem",
      ]
    `);
  });

  it("should handle arbitrary spaces and line breaks", () => {
    const result = extract({
      code: `
      <Box  
         inlineSize  =   "300rem" 
         
         blockSize   =   "300rem" 
       />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "inlineSize-300rem",
        "blockSize-300rem",
      ]
    `);
  });

  it("should handle spaces in prop values", () => {
    const result = extract({
      code: `
      <Box
        gridTemplateAreas='"header header" "content content" "footer footer"'
        gridTemplateColumns="200px 1fr 200px"
      />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "gridTemplateAreas-"header header" "content content" "footer footer"",
        "gridTemplateColumns-200px 1fr 200px",
      ]
    `);
  });

  it("should handle variants", () => {
    const result = extract({
      code: `
      <Box
        md:size={300}
      />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "md:size-300",
      ]
    `);
  });

  it("should handle expressions", () => {
    const result = extract({
      code: `
      <Box
        gridTemplateColumns={condition1 ? "200px minmax(900px, 1fr) 100px" : (condition2 || "repeat(3, 1fr)")}
        gridRow={condition3 && "span 2"}
        gridColumn={condition4 ? "span 3" : 1}
        display={condition5 ? "none" : undefined}
      />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "gridTemplateColumns-200px minmax(900px, 1fr) 100px",
        "gridTemplateColumns-repeat(3, 1fr)",
        "gridRow-span 2",
        "gridColumn-span 3",
        "gridColumn-1",
        "display-none",
      ]
    `);
  });

  it("should skip expressions which evaluation result is unpredictable", () => {
    const result = extract({
      code: `
      <Box color={expression5 ? getColor({ variant }) : "red"} />
    `,
    });
    expect(result).toMatchInlineSnapshot(`[]`);
  });

  it("should not extract duplicates", () => {
    const result = extract({
      code: `
      <Box display="block" display="block" />
    `,
    });
    expect(result).toMatchInlineSnapshot(`
      [
        "display-block",
      ]
    `);
  });
});
