import { getUsers } from '~/services/users';
import type { User } from '~/graphql/types/user';

export async function useUsersTable() {
  const { data, pending, error, refresh } = await useAsyncData<User[]>('users', () => getUsers(), {
    lazy: true,
    default: () => [],
  });

  return { users: data, pending, error, refresh };
}
