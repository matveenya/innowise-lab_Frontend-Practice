import { gql, type TypedDocumentNode } from '@apollo/client';
import type { SignupResult, SignupArgs } from '../types';

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
