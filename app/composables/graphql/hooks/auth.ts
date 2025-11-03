import { LOGIN } from '../queries/login';
import { SIGNUP } from '../mutations/signup';
import type { LoginResult, LoginArgs, SignupResult, SignupArgs } from '../types';

export const useLogin = () => {
  return async (auth: LoginArgs['auth']): Promise<LoginResult | null> => {
    const { $apollo } = useNuxtApp();

    if (!$apollo) {
      throw new Error('Apollo Client is not initialized');
    }

    const { data } = await $apollo.query<LoginResult, LoginArgs>({
      query: LOGIN,
      variables: { auth },
    });

    return data || null;
  };
};

export const useSignup = () => {
  return async (auth: SignupArgs['auth']): Promise<SignupResult | null> => {
    const { $apollo } = useNuxtApp();

    if (!$apollo) {
      throw new Error('Apollo Client is not initialized');
    }

    const { data } = await $apollo.mutate<SignupResult, SignupArgs>({
      mutation: SIGNUP,
      variables: { auth },
    });

    return data || null;
  };
};
