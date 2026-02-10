import globals from "globals";
import tseslint from "typescript-eslint";
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended, { files } from 'eslint-plugin-prettier/recommended'
import jest from 'eslint-plugin-jest'

export default tseslint.config(
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  //...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  eslintPluginPrettierRecommended,
  {
    ignores: ['reports']
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked]
  },
  {
    files: ['scripts/**/*.zx.js'],
    globals: {
      $: true,
      fs: true
    }
  },
  {
    files: ['test/**', 'setup-jest.js'],
    ...jest.configs['flat/recommended']
  }
);
