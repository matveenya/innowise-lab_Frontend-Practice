import type { User, AuthInput } from 'cv-graphql';
import { useLogin, useSignup } from '../composables/graphql/hooks';

const ACCESS_TOKEN_KEY = 'access_token';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const isAuthenticated = ref<boolean>(false);

  const router = useRouter();

  const setUser = (userData: User) => {
    user.value = userData;
    isAuthenticated.value = true;
  };

  const setToken = (token: string) => {
    accessToken.value = token;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  };

  const clearAuth = () => {
    user.value = null;
    accessToken.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  const login = async (auth: AuthInput) => {
    try {
      const loginQuery = useLogin();
      const data = await loginQuery(auth);

      if (data?.login) {
        setToken(data.login.access_token);
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
        setToken(data.signup.access_token);
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

  return { user, isAuthenticated, accessToken, login, signup, logout };
});
