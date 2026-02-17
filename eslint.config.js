import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.mjs'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ===== Code Style =====
      // Enforce single quotes
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],

      // Enforce semicolons
      'semi': ['error', 'always'],
      // Comma and spacing
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': 'error',
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always',
      }],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'max-len': ['warn', { 'code': 120, 'ignoreUrls': true, 'ignoreStrings': true }],
      
      // ===== Best Practices =====
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-rename': 'error',
      'object-shorthand': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-throw-literal': 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      'no-async-promise-executor': 'error',
      'no-promise-executor-return': 'error',
      
      // ===== Code Quality =====
      'no-unused-expressions': 'error',
      'no-param-reassign': ['error', { 'props': false }],
      'no-shadow': 'off', // Turned off in favor of TS rule
      'consistent-return': 'off', // TS handles this
      'default-case': 'error',
      'default-case-last': 'error',
      'dot-notation': 'error',
      'eqeqeq': ['error', 'always'],
      'no-else-return': ['error', { 'allowElseIf': false }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-lone-blocks': 'error',
      'no-multi-spaces': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'yoda': 'error',
      
      // ===== TypeScript Specific =====
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_',
      }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { 
        'prefer': 'type-imports',
        'fixStyle': 'inline-type-imports',
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { 'default': 'array-simple' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'variable',
          'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
          'leadingUnderscore': 'allow',
        },
        {
          'selector': 'function',
          'format': ['camelCase', 'PascalCase'],
        },
        {
          'selector': 'typeLike',
          'format': ['PascalCase'],
        },
      ],
    },
  }
);
