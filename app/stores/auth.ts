import type { User, AuthInput } from 'cv-graphql';
import { useLogin, useSignup } from '../graphql/hooks';
import { defineStore } from 'pinia';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);

  const accessTokenCookie = useCookie<string | null>(ACCESS_TOKEN_KEY);
  const refreshTokenCookie = useCookie<string | null>(REFRESH_TOKEN_KEY);

  const accessToken = computed(() => accessTokenCookie.value);
  const refreshToken = computed(() => refreshTokenCookie.value);

  const isAuthenticated = computed<boolean>(() => {
    return !!accessTokenCookie.value;
  });

  const router = useRouter();

  const setUser = (userData: User) => {
    user.value = userData;
  };

  const setToken = (access: string, refresh: string) => {
    accessTokenCookie.value = access;
    refreshTokenCookie.value = refresh;
  };

  const clearAuth = () => {
    user.value = null;
    accessTokenCookie.value = null;
    refreshTokenCookie.value = null;
  };

  const login = async (auth: AuthInput) => {
    try {
      const loginQuery = useLogin();
      const data = await loginQuery(auth);

      if (data?.login) {
        setToken(data.login.access_token, data.login.refresh_token);
        setUser(data.login.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (auth: AuthInput) => {
    try {
      const signupMutation = useSignup();
      const data = await signupMutation(auth);

      if (data?.signup) {
        setToken(data.signup.access_token, data.signup.refresh_token);
        setUser(data.signup.user);
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      };
    }
  };

  const logout = async () => {
    try {
      clearAuth();
      const { $apollo } = useNuxtApp();
      if ($apollo) {
        await $apollo.clearStore();
      }
      await router.replace('/auth/login');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    accessToken,
    refreshToken,
    setToken,
    clearAuth,
    login,
    signup,
    logout,
  };
});
