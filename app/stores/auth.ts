import type { User, AuthInput } from 'cv-graphql';
import { jwtDecode } from 'jwt-decode';
import { login as loginService, signup as signupService } from '../services/auth';
import { defineStore } from 'pinia';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

type JwtPayload = {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

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

  const restoreUserFromToken = () => {
    if (accessTokenCookie.value && !user.value) {
      try {
        const decoded = jwtDecode<JwtPayload>(accessTokenCookie.value);
        user.value = {
          id: decoded.sub.toString(),
          email: decoded.email,
          role: decoded.role as User['role'],
        } as User;
      } catch (error) {
        console.warn('Failed to decode token', error);
      }
    }
  };

  restoreUserFromToken();

  const login = async (auth: AuthInput) => {
    const data = await loginService({ auth });

    if (data) {
      setToken(data.access_token, data.refresh_token);
      setUser(data.user);
      return true;
    }
    return false;
  };

  const signup = async (auth: AuthInput) => {
    try {
      const data = await signupService({ auth });

      if (data) {
        setToken(data.access_token, data.refresh_token);
        setUser(data.user);
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
    restoreUserFromToken,
  };
});
