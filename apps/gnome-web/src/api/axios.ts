import type { RefreshTokenResponse } from "@repo/shared/responses";
import axios, { AxiosError } from "axios";
import { AuthService } from "@/api/Auth.service.ts";
import { useAuthStore } from "@/store/useAuthStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

function getTokenExpiration(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch (e) {
    console.error(e, "Failed to parse token expiration");
    return null;
  }
}

function isAuthRoute(url?: string) {
  if (!url) return false;
  return ["/auth/refresh", "/auth/google"].some((route) => url.includes(route));
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = useAuthStore.getState();

    if (!accessToken) {
      return config;
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (isAuthRoute(config.url)) {
      return config;
    }

    const exp = getTokenExpiration(accessToken);
    const now = Date.now();

    const shouldRefresh = exp && exp - now < 60_000 && refreshToken;
    if (!shouldRefresh) {
      return config;
    }

    if (!refreshPromise) {
      refreshPromise = AuthService.refreshTokens(refreshToken);
    }

    try {
      const tokens = await refreshPromise;
      refreshPromise = null;

      if (tokens?.accessToken && tokens?.refreshToken) {
        useAuthStore
          .getState()
          .handleTokens(tokens.accessToken, tokens.refreshToken);

        const newAuthorization = `Bearer ${tokens.accessToken}`;

        axiosInstance.defaults.headers.Authorization = newAuthorization;
        config.headers.Authorization = newAuthorization;
      }
    } catch (error) {
      refreshPromise = null;

      if (error instanceof AxiosError && error.response?.status === 401) {
        console.error("Token refresh failed, logging out user.");
        useAuthStore.getState().logout();

        throw new AxiosError(
          "Request cancelled due to failed token refresh",
          "ERR_CANCELED",
        );
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
