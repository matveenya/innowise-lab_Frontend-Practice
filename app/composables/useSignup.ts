import type { SignupArgs, SignupResult } from './graphql/types/signup.types';
import { SIGNUP } from './graphql/mutations/signup';

export const useSignup = () => {
  const { $apollo } = useNuxtApp();
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const signup = async (auth: SignupArgs['auth']) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $apollo.mutate<SignupResult, SignupArgs>({
        mutation: SIGNUP,
        variables: { auth },
      });

      if (data?.signup?.access_token) {
        localStorage.setItem('access_token', data.signup.access_token);
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
    signup,
    loading: readonly(loading),
    error: readonly(error),
  };
};
