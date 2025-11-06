import { gql, type TypedDocumentNode } from '@apollo/client';
import type { ForgotPasswordArgs } from '../types';

export type ForgotPasswordResult = {
  forgotPassword: boolean;
};

export const FORGOT_PASSWORD: TypedDocumentNode<ForgotPasswordResult, ForgotPasswordArgs> = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;
