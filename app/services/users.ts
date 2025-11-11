import { apolloQuery } from '~/utils/apollo';
import { GET_USER_BY_ID, GET_USERS } from '~/graphql/queries';
import type { GetUserByIdResult, GetUsersResult } from '~/graphql/types';

export async function getUsers() {
  const result = await apolloQuery<GetUsersResult>(GET_USERS, {});

  return result.users;
}

export async function getUserById(id: string) {
  const result = await apolloQuery<GetUserByIdResult, { id: string }>(GET_USER_BY_ID, { id });

  return result.user;
}
