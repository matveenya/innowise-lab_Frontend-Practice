import { gql, type TypedDocumentNode } from '@apollo/client';
import type { GetUsersResult, GetUserByIdResult, GetUserProfileResult } from '../types';

export const GET_USERS: TypedDocumentNode<GetUsersResult, Record<string, never>> = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department_name
      position_name
      role
    }
  }
`;

export const GET_USER_BY_ID: TypedDocumentNode<GetUserByIdResult, { id: string }> = gql`
  query GetUserById($id: ID!) {
    user(userId: $id) {
      id
      email
      profile {
        first_name
        last_name
        avatar
        skills {
          name
        }
        languages {
          name
        }
      }
      role
    }
  }
`;

export const GET_USER_PROFILE: TypedDocumentNode<GetUserProfileResult, { id: string }> = gql`
  query GetUserProfile($id: ID!) {
    profile(userId: $id) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;
