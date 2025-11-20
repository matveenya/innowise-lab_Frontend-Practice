import type {
  AuthInput,
  AuthResult,
  UpdateTokenResult as UpdateTokenResultType,
  ForgotPasswordInput,
  ResetPasswordInput,
} from 'cv-graphql';

export type LoginArgs = {
  auth: AuthInput;
};

export type LoginResult = {
  login: AuthResult;
};

export type SignupArgs = {
  auth: AuthInput;
};

export type SignupResult = {
  signup: AuthResult;
};

export type UpdateTokenResult = {
  updateToken: UpdateTokenResultType;
};

export type ForgotPasswordArgs = {
  auth: ForgotPasswordInput;
};

export type ForgotPasswordResult = {
  forgotPassword: null;
};

export type ResetPasswordArgs = {
  auth: ResetPasswordInput;
};

export type ResetPasswordResult = {
  resetPassword: null;
};
