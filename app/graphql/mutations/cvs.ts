import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  CreateCvArgs,
  CreateCvResult,
  DeleteCvResult,
  DeleteCvArgs,
  UpdateCvResult,
  UpdateCvArgs,
  AddCvProjectResult,
  AddCvProjectArgs,
} from '../types';

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

export const DELETE_CV: TypedDocumentNode<DeleteCvResult, DeleteCvArgs> = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

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

export const ADD_CV_PROJECT: TypedDocumentNode<AddCvProjectResult, AddCvProjectArgs> = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
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
