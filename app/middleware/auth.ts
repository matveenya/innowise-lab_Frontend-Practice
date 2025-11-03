export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server) {
    return;
  }
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    });
  }
});
