import type { AuthInput, AuthResult, UpdateTokenResult as UpdateTokenResultType } from 'cv-graphql';

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
