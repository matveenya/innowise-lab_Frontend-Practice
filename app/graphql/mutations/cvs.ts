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
  RemoveCvProjectResult,
  RemoveCvProjectArgs,
  UpdateCvProjectResult,
  UpdateCvProjectArgs,
  AddCvSkillResult,
  AddCvSkillArgs,
  UpdateCvSkillResult,
  UpdateCvSkillArgs,
  DeleteCvSkillResult,
  DeleteCvSkillArgs,
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

export const REMOVE_CV_PROJECT: TypedDocumentNode<RemoveCvProjectResult, RemoveCvProjectArgs> = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
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

export const UPDATE_CV_PROJECT: TypedDocumentNode<UpdateCvProjectResult, UpdateCvProjectArgs> = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
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

export const ADD_CV_SKILL: TypedDocumentNode<AddCvSkillResult, AddCvSkillArgs> = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
      }
    }
  }
`;

export const UPDATE_CV_SKILL: TypedDocumentNode<UpdateCvSkillResult, UpdateCvSkillArgs> = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
      }
    }
  }
`;

export const DELETE_CV_SKILL: TypedDocumentNode<DeleteCvSkillResult, DeleteCvSkillArgs> = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      skills {
        name
        mastery
      }
    }
  }
`;
