import { axiosInstance } from "@/lib/api/axios";
import { UserResponse } from "@repo/shared/responses";

const loginWithGoogle = async (googleIdToken: string) => {
  return axiosInstance
    .post<{
      user: UserResponse;
      access_token: string;
    }>("/api/rest/v1/auth/google", { idToken: googleIdToken })
    .then((response) => response.data);
};

export const AuthService = {
  loginWithGoogle,
};
