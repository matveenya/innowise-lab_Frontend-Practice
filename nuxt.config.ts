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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/variables.scss" as *;
            @use "@/assets/scss/mixins.scss" as *;
          `,
        },
      },
    },
  },
  css: ['~/assets/scss/main.scss'],
  primevue: {
    options: {
      unstyled: true,
    },
    usePrimeVue: true,
  },
});
