import { gql, type TypedDocumentNode } from '@apollo/client';
import type { UpdateTokenResult } from '../types';

export const UPDATE_TOKEN: TypedDocumentNode<UpdateTokenResult, Record<string, never>> = gql`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`;
