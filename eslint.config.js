import js from '@eslint/js'
import globals from 'globals'
import {defineConfig} from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginJs from '@eslint/js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {js},
    // extends: ['js/recommended'],
    extends: [],
    rules: {},
    languageOptions: {globals: {...globals.browser, ...globals.node}}
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended
])
