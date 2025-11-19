import { apolloQuery } from '~/utils/apollo';
import { GET_SKILLS } from '~/graphql/queries';
import type { GetSkillsResult } from '~/graphql/types';

export async function getSkills() {
  const result = await apolloQuery<GetSkillsResult>(GET_SKILLS);
  return result.skills;
}
