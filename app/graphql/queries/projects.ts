import { gql, type TypedDocumentNode } from '@apollo/client';
import type { GetProjectsResult } from '../types';

export const GET_PROJECTS: TypedDocumentNode<GetProjectsResult, Record<string, never>> = gql`
  query GetProjects {
    projects {
      id
      name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`;
