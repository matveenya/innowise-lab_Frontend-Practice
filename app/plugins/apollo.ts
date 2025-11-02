import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  const httpLink = new HttpLink({
    uri: config.public.apiUrl,
  });

  const authLink = new SetContextLink(prevContext => {
    let token = null;

    if (import.meta.client) {
      token = localStorage.getItem('access_token');
    }

    return {
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  nuxtApp.provide('apollo', apolloClient);
});
