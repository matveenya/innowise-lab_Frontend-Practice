import { GET_USERS } from '../queries/users';
import type { GetUsersResult } from '../types/user';

export const useGetUsers = () => {
  const { $apollo } = useNuxtApp();

  if (!$apollo) {
    throw new Error('Apollo Client is not initialized');
  }

  return async (): Promise<GetUsersResult['users']> => {
    const { data } = await $apollo.query<GetUsersResult>({
      query: GET_USERS,
      fetchPolicy: 'cache-first',
    });

    return data.users ?? [];
  };
};
