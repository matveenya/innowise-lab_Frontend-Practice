import { getUserById } from '~/services/users';

export const useUser = async (id: string) => {
  const { data, error, pending } = await useAsyncData(`user-${id}`, () => getUserById({ id }), {
    server: true,
    lazy: true,
  });
  return { user: data, error, pending };
};
