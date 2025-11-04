import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  CombinedGraphQLErrors,
  Observable,
  ApolloLink,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { useAuthStore } from '~/stores/auth';
import { ErrorLink } from '@apollo/client/link/error';
import { useUpdateToken } from '~/graphql/hooks/auth';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const httpLink = new HttpLink({
    uri: config.public.apiUrl,
  });

  const authLink = new SetContextLink(prevContext => {
    const existingAuth = prevContext.headers?.authorization;

    if (existingAuth) {
      return prevContext;
    }

    const token = authStore.accessToken || null;

    return {
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const getNewToken = async (): Promise<string | null> => {
    try {
      const refreshToken = authStore.refreshToken;

      if (!refreshToken) {
        console.warn('[Token Refresh] ⚠️ No refresh token available, clearing auth');
        authStore.clearAuth();
        return null;
      }

      const updateTokenMutation = await nuxtApp.runWithContext(() => useUpdateToken());
      const data = await updateTokenMutation(refreshToken);

      const newAccess = data?.access_token;
      const newRefresh = data?.refresh_token;

      if (newAccess && newRefresh) {
        authStore.setToken(newAccess, newRefresh);
        return newAccess;
      }

      console.warn('[Token Refresh] ⚠️ Failed to get new tokens, clearing auth');
      authStore.clearAuth();
      return null;
    } catch {
      authStore.clearAuth();
      return null;
    }
  };

  const errorLink = new ErrorLink(({ error, operation, forward }) => {
    if (operation.operationName === 'UpdateToken') {
      return forward(operation);
    }

    if (CombinedGraphQLErrors.is(error)) {
      const authError = error.errors.find(
        err => err.extensions?.code === 'UNAUTHENTICATED' || err.extensions?.code === 'UNAUTHORIZED'
      );

      if (authError) {
        return new Observable(observer => {
          getNewToken()
            .then(newToken => {
              if (!newToken) {
                console.error('[Token Refresh] ❌ Could not refresh token, operation will fail');
                observer.error(error);
                return;
              }

              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${newToken}`,
                },
              });

              const subscriber = forward(operation).subscribe({
                next: value => observer.next(value),
                error: e => observer.error(e),
                complete: () => {
                  observer.complete();
                },
              });

              return () => {
                if (subscriber) subscriber.unsubscribe();
              };
            })
            .catch(refreshError => {
              console.error('[Token Refresh] ❌ Error during token refresh:', refreshError);
              observer.error(refreshError);
            });
        });
      }
    }

    return forward(operation);
  });
  const link = ApolloLink.from([errorLink, authLink, httpLink]);
  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'cache-first',
      },
    },
  });

  nuxtApp.provide('apollo', apolloClient);
});
