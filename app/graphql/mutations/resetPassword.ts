import { gql, type TypedDocumentNode } from '@apollo/client';
import type { ResetPasswordResult, ResetPasswordArgs } from '../types';

export const RESET_PASSWORD: TypedDocumentNode<ResetPasswordResult, ResetPasswordArgs> = gql`
  mutation ResetPassword($auth: ResetPasswordInput!) {
    resetPassword(auth: $auth)
  }
`;
