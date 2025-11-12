import { gql, type TypedDocumentNode } from '@apollo/client';
import type { UpdateCvResult, UpdateCvArgs } from '../types';

export const UPDATE_CV: TypedDocumentNode<UpdateCvResult, UpdateCvArgs> = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
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
