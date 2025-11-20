import { apolloQuery, apolloMutation } from '~/utils/apollo';
import { LOGIN } from '~/graphql/queries';
import { SIGNUP, UPDATE_TOKEN, FORGOT_PASSWORD, RESET_PASSWORD } from '~/graphql/mutations';
import type {
  LoginArgs,
  LoginResult,
  SignupArgs,
  SignupResult,
  UpdateTokenResult,
  ForgotPasswordArgs,
  ResetPasswordArgs,
} from '~/graphql/types';
import type { ResetPasswordInput } from 'cv-graphql';

export async function login(args: LoginArgs) {
  const result = await apolloQuery<LoginResult, LoginArgs>(LOGIN, args);
  return result.login;
}

export async function signup(args: SignupArgs) {
  const result = await apolloMutation<SignupResult, SignupArgs>(SIGNUP, args);
  return result.signup;
}

export async function updateToken(refreshToken: string) {
  const result = await apolloMutation<UpdateTokenResult, Record<string, never>>(
    UPDATE_TOKEN,
    {},
    {
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    }
  );
  return result.updateToken;
}

export async function forgotPassword(auth: ForgotPasswordArgs['auth']): Promise<void> {
  await apolloMutation<{ forgotPassword: null }, ForgotPasswordArgs>(FORGOT_PASSWORD, { auth });
}

export async function resetPassword(auth: ResetPasswordInput, token: string) {
  const result = await apolloMutation<{ resetPassword: null }, ResetPasswordArgs>(
    RESET_PASSWORD,
    {
      auth: {
        newPassword: auth.newPassword,
      },
    },
    {
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }
  );
  return result.resetPassword;
}
