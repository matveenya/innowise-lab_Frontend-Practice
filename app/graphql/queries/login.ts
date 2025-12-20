import { gql, type TypedDocumentNode } from '@apollo/client';
import type { LoginResult, LoginArgs } from '../types';

export const LOGIN: TypedDocumentNode<LoginResult, LoginArgs> = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;
