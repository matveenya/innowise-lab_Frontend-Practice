import { LOGIN } from '~/graphql/queries';
import { SIGNUP, UPDATE_TOKEN, FORGOT_PASSWORD } from '~/graphql/mutations';
import type { LoginArgs, SignupArgs, ForgotPasswordArgs } from '~/graphql/types';
import { apolloQuery, apolloMutation } from '~/utils/apollo';

export async function useLogin(auth: LoginArgs['auth']) {
  const data = await apolloQuery(LOGIN, { auth });
  return data?.login ?? null;
}

export async function useSignup(auth: SignupArgs['auth']) {
  const data = await apolloMutation(SIGNUP, { auth });
  return data?.signup ?? null;
}

export async function useUpdateToken(refreshToken: string) {
  const data = await apolloMutation(
    UPDATE_TOKEN,
    {},
    {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  return data?.updateToken ?? null;
}

export async function useForgotPassword(auth: ForgotPasswordArgs['auth']) {
  await apolloMutation(FORGOT_PASSWORD, { auth });
}
