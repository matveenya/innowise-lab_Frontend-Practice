import { gql, type TypedDocumentNode } from '@apollo/client';
import type { GetSkillsResult } from '../types/skill';

export const GET_SKILLS: TypedDocumentNode<GetSkillsResult> = gql`
  query GetSkills {
    skills {
      id
      name
      category_name
    }
  }
`;
