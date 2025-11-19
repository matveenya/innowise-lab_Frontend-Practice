import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  SignupResult,
  SignupArgs,
  UpdateTokenResult,
  ForgotPasswordResult,
  ForgotPasswordArgs,
} from '../types';

export const SIGNUP: TypedDocumentNode<SignupResult, SignupArgs> = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;

export const UPDATE_TOKEN: TypedDocumentNode<UpdateTokenResult, Record<string, never>> = gql`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`;

export const FORGOT_PASSWORD: TypedDocumentNode<ForgotPasswordResult, ForgotPasswordArgs> = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;
