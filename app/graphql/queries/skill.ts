import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  GetSkillsResult,
  CreateSkillResult,
  CreateSkillVariables,
  UpdateSkillResult,
  UpdateSkillVariables,
  DeleteSkillVariables,
  DeleteSkillResult,
} from '../types/skill';

export const GET_SKILLS: TypedDocumentNode<GetSkillsResult> = gql`
  query GetSkills {
    skills {
      id
      name
      category {
        id
      }
      category_name
    }
  }
`;

export const CREATE_SKILL: TypedDocumentNode<CreateSkillResult, CreateSkillVariables> = gql`
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      name
      categoryId
    }
  }
`;

export const UPDATE_SKILL: TypedDocumentNode<UpdateSkillResult, UpdateSkillVariables> = gql`
  mutation UpdateSkill($input: UpdateSkillInput!) {
    updateSkill(input: $input) {
      skillId
      name
      categoryId
    }
  }
`;

export const DELETE_SKILL: TypedDocumentNode<DeleteSkillResult, DeleteSkillVariables> = gql`
  mutation DeleteSkill($input: DeleteSkillInput!) {
    deleteSkill(input: $input) {
      affected
    }
  }
`;
