import { LOGIN } from '../queries/login';
import { SIGNUP } from '../mutations/signup';
import { UPDATE_TOKEN } from '../mutations/updateToken';
import type { LoginResult, LoginArgs, SignupResult, SignupArgs } from '../types';
import type { UpdateTokenResult } from 'cv-graphql';

export const useLogin = () => {
  const { $apollo } = useNuxtApp();

  if (!$apollo) {
    throw new Error('Apollo Client is not initialized');
  }

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

  if (!$apollo) {
    throw new Error('Apollo Client is not initialized');
  }

  return async (auth: SignupArgs['auth']): Promise<SignupResult | null> => {
    const { data } = await $apollo.mutate<SignupResult, SignupArgs>({
      mutation: SIGNUP,
      variables: { auth },
    });

    return data || null;
  };
};

export const useUpdateToken = () => {
  const { $apollo } = useNuxtApp();

  if (!$apollo) {
    throw new Error('Apollo Client is not initialized');
  }

  return async (refreshToken: string): Promise<{ updateToken: UpdateTokenResult } | null> => {
    const { data } = await $apollo.mutate<{ updateToken: UpdateTokenResult }>({
      mutation: UPDATE_TOKEN,
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    });

    return data || null;
  };
};
