// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt([
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
    },
  },
  eslintPluginPrettierRecommended,
]);
