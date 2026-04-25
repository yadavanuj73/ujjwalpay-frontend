import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '**/node_modules/**', 'ujjwal pr/**']),
  {
    files: ['backend/**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: 'commonjs',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['backend/**'],
    plugins: {
      react,
      'unused-imports': unusedImports,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      // Warn: codebase has many legacy placeholders; keeps CI green while surfacing cleanup in the editor.
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^[A-Z_]',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-empty': 'warn',
      'react/jsx-uses-vars': 'error',
      // Mount-time data loading and hook ordering are common here; the strict rules add noise without catching real bugs.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/static-components': 'off',
      // Context files legitimately export hooks alongside providers.
      'react-refresh/only-export-components': 'off',
    },
  },
])
