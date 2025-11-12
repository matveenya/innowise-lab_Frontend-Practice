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
  components: [
    {
      path: '~/components/ui',
      prefix: '',
      pathPrefix: false,
    },
    {
      path: '~/components',
      prefix: '',
      pathPrefix: true,
    },
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL as string,
    },
  },
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
  icon: {
    mode: 'svg',
    serverBundle: {
      collections: ['ic', 'material-symbols'],
    },
  },
});
