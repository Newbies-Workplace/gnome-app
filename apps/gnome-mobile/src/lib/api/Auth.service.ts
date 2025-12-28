import {
  GoogleLoginResponse,
  type RefreshTokenResponse,
} from "@repo/shared/responses";
import { axiosInstance } from "@/lib/api/axios";

const loginWithGoogle = async (googleIdToken: string) => {
  return axiosInstance
    .post<GoogleLoginResponse>("/api/rest/v1/auth/google", {
      idToken: googleIdToken,
    })
    .then((response) => response.data);
};

const refreshTokens = async (refreshToken: string) => {
  return axiosInstance
    .post<RefreshTokenResponse>("/api/rest/v1/auth/refresh", {
      refreshToken,
    })
    .then((response) => response.data);
};

export const AuthService = {
  loginWithGoogle,
  refreshTokens,
};
