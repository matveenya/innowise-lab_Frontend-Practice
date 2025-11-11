import { gql, type TypedDocumentNode } from '@apollo/client';
import type { CreateCvArgs, CreateCvResult } from '../types';

export const CREATE_CV: TypedDocumentNode<CreateCvResult, CreateCvArgs> = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    creareCv(cv: $cv) {
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
