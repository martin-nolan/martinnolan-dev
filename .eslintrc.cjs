// .eslintrc.cjs
module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },

  settings: {
    react: { version: "detect" },
  },

  plugins: [
    "@typescript-eslint",
    "react-hooks",
    "jsx-a11y",
    "tailwindcss",
    "@next/next", // ← notice the @next scope
  ],

  extends: [
    "eslint:recommended", // core JS
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",

    "plugin:@next/next/recommended", // Next.js ruleset
    "plugin:@next/next/core-web-vitals", // Next.js Core Web Vitals rules
  ],

  rules: {
    // your overrides…
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-expressions": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Disable warnings for custom Tailwind CSS class names
    "tailwindcss/no-custom-classname": "off",
  },
};
