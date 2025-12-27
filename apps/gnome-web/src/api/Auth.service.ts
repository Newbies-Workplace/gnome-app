import type { RefreshTokenRequest } from "@repo/shared/requests";
import type { RefreshTokenResponse } from "@repo/shared/responses";
import { axiosInstance } from "./axios";

export const refreshTokens = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  const request: RefreshTokenRequest = {
    refreshToken: refreshToken,
  };

  const response = await axiosInstance.post("/auth/refresh", request);

  return response.data;
};

export const AuthService = {
  refreshTokens,
};
