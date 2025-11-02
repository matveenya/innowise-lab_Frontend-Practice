import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

declare module '#app' {
  interface NuxtApp {
    $apollo: ApolloClient<NormalizedCacheObject>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $apollo: ApolloClient<NormalizedCacheObject>;
  }
}

export {};
