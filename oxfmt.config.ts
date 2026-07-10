import { defineConfig } from "oxfmt";

export default defineConfig({
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "printWidth": 120,
  "singleQuote": false,
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "sortPackageJson": true,
  "sortImports": {
    "newlinesBetween": true,
    "groups": [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown"
    ]
  }
});


