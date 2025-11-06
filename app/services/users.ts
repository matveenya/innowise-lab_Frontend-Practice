import { apolloQuery } from '~/utils/apollo';
import { GET_USERS } from '~/graphql/queries';
import type { GetUsersResult } from '~/graphql/types';

export async function getUsers() {
  const result = await apolloQuery<GetUsersResult>(GET_USERS, {});

  return result.users;
}
