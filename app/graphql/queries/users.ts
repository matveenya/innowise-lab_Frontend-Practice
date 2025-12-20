import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  GetUsersResult,
  GetUserByIdResult,
  GetUserProfileResult,
  GetDepartmentsResult,
  GetPositionsResult,
} from '../types';

export const GET_USERS: TypedDocumentNode<GetUsersResult, Record<string, never>> = gql`
  query GetUsers {
    users {
      id
      email
      department {
        id
        name
      }
      position {
        id
        name
      }
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
      created_at
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
      department {
        id
        name
      }
      position {
        id
        name
      }
      department_name
      position_name
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

export const GET_DEPARTMENTS: TypedDocumentNode<GetDepartmentsResult, Record<string, never>> = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

export const GET_POSITIONS: TypedDocumentNode<GetPositionsResult, Record<string, never>> = gql`
  query GetPositions {
    positions {
      id
      name
    }
  }
`;
