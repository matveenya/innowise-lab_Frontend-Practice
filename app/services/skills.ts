import { apolloQuery } from '~/utils/apollo';
import { CREATE_SKILL, DELETE_SKILL, GET_SKILLS, UPDATE_SKILL } from '~/graphql/queries';
import type {
  CreateSkillResult,
  CreateSkillVariables,
  DeleteSkillResult,
  DeleteSkillVariables,
  GetSkillsResult,
  UpdateSkillResult,
  UpdateSkillVariables,
  CreateSkillInput,
  DeleteSkillInput,
  UpdateSkillInput,
} from '~/graphql/types';

export async function getSkills() {
  const result = await apolloQuery<GetSkillsResult>(GET_SKILLS);
  return result.skills;
}

export async function createSkill(input: CreateSkillInput) {
  const result = await apolloQuery<CreateSkillResult, CreateSkillVariables>(CREATE_SKILL, {
    input,
  });
  return result.skill;
}

export async function updateSkill(input: UpdateSkillInput) {
  const result = await apolloQuery<UpdateSkillResult, UpdateSkillVariables>(UPDATE_SKILL, {
    input,
  });
  return result.skill;
}

export async function deleteSkill(input: DeleteSkillInput) {
  const result = await apolloQuery<DeleteSkillResult, DeleteSkillVariables>(DELETE_SKILL, {
    input,
  });
  return result.deleteResult;
}
