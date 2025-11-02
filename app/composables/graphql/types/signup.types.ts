import type { AuthInput, AuthResult } from 'cv-graphql';

export type SignupArgs = {
  auth: AuthInput;
};

export type SignupResult = {
  signup: AuthResult;
};
