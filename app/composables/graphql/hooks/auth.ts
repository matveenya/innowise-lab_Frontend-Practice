import { LOGIN } from '../queries/login';
import { SIGNUP } from '../mutations/signup';
import type { LoginResult, LoginArgs, SignupResult, SignupArgs } from '../types';

export const useLogin = () => {
  const { $apollo } = useNuxtApp();

  return async (auth: LoginArgs['auth']): Promise<LoginResult | null> => {
    const { data } = await $apollo.query<LoginResult, LoginArgs>({
      query: LOGIN,
      variables: { auth },
    });

    return data || null;
  };
};

export const useSignup = () => {
  const { $apollo } = useNuxtApp();

  return async (auth: SignupArgs['auth']): Promise<SignupResult | null> => {
    const { data } = await $apollo.mutate<SignupResult, SignupArgs>({
      mutation: SIGNUP,
      variables: { auth },
    });

    return data || null;
  };
};
