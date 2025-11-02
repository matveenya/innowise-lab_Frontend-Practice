export const useLogout = () => {
  const { $apollo } = useNuxtApp();

  const logout = async () => {
    localStorage.removeItem('access_token');

    await $apollo.clearStore();

    navigateTo('/auth/login');
  };

  return { logout };
};
