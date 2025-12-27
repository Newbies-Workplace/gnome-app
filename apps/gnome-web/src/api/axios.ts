import type { RefreshTokenResponse } from "@repo/shared/responses";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthService } from "./Auth.service";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

let refreshPromise: Promise<RefreshTokenResponse | null> | null = null;

async function handleRefreshAndRetry(
  originalRequest: { headers: Record<string, string> } & {
    [key: string]: unknown;
  },
  error: unknown,
  shouldUpdateStore: boolean,
) {
  const tokens = await refreshPromise;

  const accessToken = tokens?.accessToken;
  const refreshToken = tokens?.refreshToken;

  if (accessToken && refreshToken) {
    if (shouldUpdateStore) {
      useAuthStore.getState().handleTokens(accessToken, refreshToken);
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (refreshPromise) {
        return handleRefreshAndRetry(originalRequest, error, false);
      }

      const refreshToken = useAuthStore.getState().refreshToken;
      if (!refreshToken) {
        return Promise.reject(error);
      }

      refreshPromise = AuthService.refreshTokens(refreshToken);

      try {
        return await handleRefreshAndRetry(originalRequest, error, true);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  },
);
