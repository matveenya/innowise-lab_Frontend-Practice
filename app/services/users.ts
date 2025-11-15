import { apolloQuery } from '~/utils/apollo';
import { GET_USER_BY_ID, GET_USERS } from '~/graphql/queries';
import type { GetUserByIdResult, GetUsersResult } from '~/graphql/types';
import type { FetchPolicy } from '@apollo/client';

export async function getUsers() {
  const result = await apolloQuery<GetUsersResult>(GET_USERS, {});

  return result.users;
}

export async function getUserById(args?: { id: string }, fetchPolicy?: FetchPolicy) {
  if (!args?.id) throw new Error('User ID is required');

  const result = await apolloQuery<GetUserByIdResult, { id: string }>(
    GET_USER_BY_ID,
    { id: args.id },
    fetchPolicy
  );

  return result.user;
}
