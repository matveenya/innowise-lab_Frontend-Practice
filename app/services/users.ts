import { apolloQuery } from '~/utils/apollo';
import { GET_USER_BY_ID, GET_USER_PROFILE, GET_USERS } from '~/graphql/queries';
import type { GetUserByIdResult, GetUserProfileResult, GetUsersResult } from '~/graphql/types';
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

export async function getUserProfile(args?: { id: string }, fetchPolicy?: FetchPolicy) {
  if (!args?.id) throw new Error('User ID is required');

  const result = await apolloQuery<GetUserProfileResult, { id: string }>(
    GET_USER_PROFILE,
    { id: args.id },
    fetchPolicy
  );

  return result.profile;
}
