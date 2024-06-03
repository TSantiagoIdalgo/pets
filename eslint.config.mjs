import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.strict,
  {
    'rules': {
      'indent': ['error', 2],
      'no-console': 'off',
      'one-var': 'off',
      'quotes': ['error', 'single'],
      'semi': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];