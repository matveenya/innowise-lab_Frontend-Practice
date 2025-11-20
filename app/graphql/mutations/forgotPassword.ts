import { gql, type TypedDocumentNode } from '@apollo/client';
import type { ForgotPasswordResult, ForgotPasswordArgs } from '../types';

export const FORGOT_PASSWORD: TypedDocumentNode<ForgotPasswordResult, ForgotPasswordArgs> = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;
