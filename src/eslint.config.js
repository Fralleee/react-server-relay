import { configs as eslintConfigs } from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },
    rules: {
      ...eslintConfigs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
    },
  },
];
