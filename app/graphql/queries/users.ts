import { gql, type TypedDocumentNode } from '@apollo/client';
import type { GetUsersResult } from '../types';

export const GET_USERS: TypedDocumentNode<GetUsersResult, Record<string, never>> = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
      }
      department_name
      position_name
    }
  }
`;
