// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwindcss from 'eslint-plugin-tailwindcss';
import next from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';

// Bridge to use eslintrc-style shareable configs
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  // Ignore generated/build artefacts
  { ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**'] },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Bridge old-style plugin presets (these caused the "plugins array" error)
  ...compat.extends(
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals'
  ),

  // Main project config
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node, // gives you process, console, URL, module, require
      },
    },
    settings: {
      react: { version: 'detect' },
      tailwindcss: { callees: ['cn', 'cva'] },
    },
    plugins: {
      react,
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      tailwindcss,
      '@next/next': next,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility
      'jsx-a11y/anchor-is-valid': 'warn',

      // Tailwind ergonomics
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',

      // Import hygiene
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Turn off triple-slash reference error just for Next’s generated file
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Node config files + scripts
  {
    files: ['**/*.config.{js,ts,mjs,cjs}', 'scripts/**'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // allow require() in configs
      'import/order': 'off', // optional: configs don’t need strict order
    },
  },

  // Other overrides
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.config.{js,ts}', 'scripts/**'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
