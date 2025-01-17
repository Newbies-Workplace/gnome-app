import { axiosInstance } from "@/lib/api/axios";

const loginWithGoogle = async (googleIdToken: string) => {
  return axiosInstance
    .post("/api/rest/v1/auth/google", { idToken: googleIdToken })
    .then((response) => response.data);
};

export const AuthService = {
  loginWithGoogle,
};
