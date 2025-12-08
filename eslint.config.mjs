import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  eslintConfigPrettier,
  {
    rules: {
      // I prefer types
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      reactHooksPlugin.configs["recommended-latest"],
    ],
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/*.stories.ts", "**/*.stories.tsx"],
    rules: {
      // Storybook requires default exports
      "import/no-default-export": "off",

      // Stories can be rendered with `render` function, which
      // is not recognized by the plugin as a React component.
      "react-hooks/rules-of-hooks": "off",
    },
  },
  globalIgnores(["package-lock.json", "eslint.config.mjs", "build"]),
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: import.meta.dirname,
        },
      },
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  }
);
