import { expect, it } from "vitest";

import { extractAttributes } from "./extractAttributes";

it("should correctly extract attributes", () => {
  const code = `
    import { Component } from "./component";
    import { Component2 } from "./component2";
    import { Component3 } from "./component3";
    import { Component4 } from "./component4";
    import { Component5 } from "./component5";

    export function Component4() {
      return (
        <Component simple-string-prop="simpleStringPropValue" simple-number-prop={1}>
          <Component2 logical-expression-prop={condition && "logicalExpressionPropValue"}>
            <Component3 multiline-nested-ternary-expression-prop={
                  condition1
                   ? (condition2 ? "nestedTernaryExpressionProp1" : 100)
                   : (condition3 ? "nestedTernaryExpressionProp1" : undefined)}>
              <Component4 expression-prop-with-jsx={
                <><Component5 final-prop="The End"} /></>
              }>Hello</Component4>
            </Component3>
          </Component2>
        </Component>
      )
    }
  `;

  expect(extractAttributes(code)).toMatchInlineSnapshot(`
    [
      {
        "component": "Component",
        "name": "simple-string-prop",
        "values": [
          "simpleStringPropValue",
        ],
      },
      {
        "component": "Component",
        "name": "simple-number-prop",
        "values": [
          1,
        ],
      },
      {
        "component": "Component2",
        "name": "logical-expression-prop",
        "values": [
          "logicalExpressionPropValue",
        ],
      },
      {
        "component": "Component3",
        "name": "multiline-nested-ternary-expression-prop",
        "values": [
          100,
          "nestedTernaryExpressionProp1",
          "nestedTernaryExpressionProp1",
        ],
      },
      {
        "component": "Component5",
        "name": "final-prop",
        "values": [
          "The End",
        ],
      },
    ]
  `);
});
