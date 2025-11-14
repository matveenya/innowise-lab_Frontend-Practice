import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CreateCvArgs, CreateCvResult } from '../types';

export const CREATE_CV: TypedDocumentNode<CreateCvResult, CreateCvArgs> = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      created_at
      name
      education
      description
      user {
        id
        email
        profile {
          first_name
          last_name
          full_name
        }
      }
    }
  }
`;
