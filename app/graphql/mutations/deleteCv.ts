import { gql, type TypedDocumentNode } from '@apollo/client';
import type { DeleteCvResult, DeleteCvArgs } from '../types';

export const DELETE_CV: TypedDocumentNode<DeleteCvResult, DeleteCvArgs> = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;
