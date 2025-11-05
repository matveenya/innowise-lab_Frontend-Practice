import { GET_USERS } from '~/graphql/queries';
import type { GetUsersResult } from '~/graphql/types/user';
import { apolloQuery } from '~/utils/apollo';

export async function useGetUsers() {
  const data = await apolloQuery<GetUsersResult>(GET_USERS);
  return data?.users ?? [];
}
