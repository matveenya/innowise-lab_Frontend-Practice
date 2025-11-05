import { LOGIN } from '../queries';
import { SIGNUP, UPDATE_TOKEN, FORGOT_PASSWORD } from '../mutations';
import type {
  LoginResult,
  LoginArgs,
  SignupResult,
  SignupArgs,
  UpdateTokenResult,
  ForgotPasswordArgs,
} from '../types';

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

  return async (refreshToken: string): Promise<UpdateTokenResult['updateToken'] | null> => {
    const { data } = await $apollo.mutate<UpdateTokenResult>({
      mutation: UPDATE_TOKEN,
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    });

    return data?.updateToken || null;
  };
};

export const useForgotPassword = () => {
  const { $apollo } = useNuxtApp();

  if (!$apollo) {
    throw new Error('Apollo Client is not initialized');
  }

  return async (auth: ForgotPasswordArgs['auth']): Promise<void> => {
    await $apollo.mutate<ForgotPasswordArgs>({
      mutation: FORGOT_PASSWORD,
      variables: { auth },
    });
  };
};
