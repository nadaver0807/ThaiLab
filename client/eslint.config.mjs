import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // "סטנדרטים לפיתוח"
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'max-len': [
        'error',
        { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: ['block', 'block-like'] },
        { blankLine: 'always', prev: ['block', 'block-like'], next: '*' },
      ],
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression",
          message:
            'אין לכתוב עיצוב על התגית — יש להגדיר אובייקט ב-ComponentName.style.ts.',
        },
        {
          selector: "MemberExpression[property.name='watch']",
          message: 'יש להשתמש ב-useWatch מ-react-hook-form במקום watch.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@thailab/server', '@thailab/server/*'],
              message: 'client לעולם לא מייבא מ-server (סטנדרטים לפיתוח).',
            },
            {
              group: ['../*'],
              message: 'יש להשתמש ב-aliases (@components, @hooks, @theme, @thailab/shared).',
            },
          ],
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
