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
  ForgotPasswordResult,
  ResetPasswordArgs,
  ResetPasswordResult,
} from '~/graphql/types';

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

export async function forgotPassword(args: ForgotPasswordArgs): Promise<void> {
  await apolloMutation<ForgotPasswordResult, ForgotPasswordArgs>(FORGOT_PASSWORD, args);
}

export async function resetPassword(args: ResetPasswordArgs, token: string) {
  const result = await apolloMutation<ResetPasswordResult, ResetPasswordArgs>(
    RESET_PASSWORD,
    args,
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
