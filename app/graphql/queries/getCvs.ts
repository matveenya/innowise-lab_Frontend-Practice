import { gql, type TypedDocumentNode } from '@apollo/client';
import type { GetCvsResult } from '../types';

export const GET_CVS: TypedDocumentNode<GetCvsResult, Record<string, never>> = gql`
  query GetCvs {
    cvs {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`;
