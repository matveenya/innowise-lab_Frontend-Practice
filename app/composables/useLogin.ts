import type { LoginArgs, LoginResult } from './graphql/types/login.types';
import { LOGIN } from './graphql/queries/login';

export const useLogin = () => {
  const { $apollo } = useNuxtApp();
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const router = useRouter();
  const route = useRoute();

  const login = async (auth: LoginArgs['auth']) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $apollo.query<LoginResult, LoginArgs>({
        query: LOGIN,
        variables: { auth },
        fetchPolicy: 'network-only',
      });

      if (data?.login?.access_token) {
        localStorage.setItem('access_token', data.login.access_token);
        const redirect = (route.query.redirect as string) || '/users';
        await router.push(redirect);
      }

      return data;
    } catch (e) {
      error.value = e as Error;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    login,
    loading: readonly(loading),
    error: readonly(error),
  };
};
