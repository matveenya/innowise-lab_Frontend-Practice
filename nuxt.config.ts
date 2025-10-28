// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@vee-validate/nuxt',
    '@primevue/nuxt-module',
  ],
  primevue: {
    options: {
      unstyled: true,
    },
    usePrimeVue: true,
  },
});
