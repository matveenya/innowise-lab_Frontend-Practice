import { apolloQuery } from '~/utils/apollo';
import { GET_PROJECTS } from '~/graphql/queries';
import type { GetProjectsResult } from '~/graphql/types';

export async function getProjects() {
  const result = await apolloQuery<GetProjectsResult>(GET_PROJECTS);
  return result.projects;
}
