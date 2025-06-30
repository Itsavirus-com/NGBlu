import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import _import from "eslint-plugin-import";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [{
    ignores: ["**/.next", "**/node_modules"],
}, ...fixupConfigRules(compat.extends(
    "next",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript"
)), {
    plugins: {
      import: fixupPluginRules(_import),
    },

    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/ban-ts-ignore': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-var-requires': 0,

      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
          imports: 'always-multiline',
          objects: 'always-multiline',
        },
      ],

      'generator-star-spacing': 0,
      'import/no-named-as-default': 0,

      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },

          groups: [['builtin', 'external'], 'internal', ['sibling', 'parent'], 'index', 'unknown'],

          'newlines-between': 'always',
        },
      ],

      indent: 0,
      'multiline-ternary': 0,
      'prettier/prettier': 0,
      'react-hooks/exhaustive-deps': 0,
      semi: 0,
      curly: ['warn', 'multi-line'],

      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],

      'space-before-function-paren': 0,
    },
  },
]
