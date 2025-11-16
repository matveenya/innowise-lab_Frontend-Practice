import { getUserProfile } from '~/services/users';

export const useUserProfile = async (id: string) => {
  const { data, error, pending } = await useAsyncData(
    `profile-${id}`,
    () => getUserProfile({ id }),
    {
      server: true,
      lazy: true,
    }
  );
  return { profile: data, error, pending };
};
