import js from "@eslint/js";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-var-requires": "off",
      "brace-style": ["warn", "stroustrup", { allowSingleLine: true }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/newline-after-import": ["error", { count: 2 }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.ts", "**/*.test.tsx"],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "jsx-quotes": ["error", "prefer-single"],
      "no-else-return": "off",
      "no-multiple-empty-lines": ["error", { max: 2 }],
      "no-shadow": "off",
      "no-underscore-dangle": ["warn", { enforceInMethodNames: false }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "export" },
        { blankLine: "never", prev: "*", next: "import" },
      ],
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/destructuring-assignment": "off",
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".js", ".tsx"] },
      ],
      "react/jsx-uses-react": "off",
      "react/no-unescaped-entities": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
    },
  },
];
