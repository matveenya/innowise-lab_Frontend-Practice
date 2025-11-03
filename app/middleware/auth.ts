export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server) {
    return;
  }

  const authStore = useAuthStore();

  if (import.meta.client) {
    const token = localStorage.getItem('access_token');
    if (token && token !== authStore.accessToken) {
      authStore.accessToken = token;
    }
  }

  if (!authStore.isAuthenticated) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    });
  }
});
