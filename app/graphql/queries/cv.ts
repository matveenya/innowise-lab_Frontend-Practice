import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Cv } from 'cv-graphql';

export const GET_CV_BY_ID: TypedDocumentNode<{ cv: Cv }, { cvId: string }> = gql`
  query GetCvById($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      description
      education
      projects {
        id
        name
        domain
        start_date
        end_date
        description
        environment
        responsibilities
      }
    }
  }
`;
