import type { UserResponse } from "@repo/shared/responses";
import { create } from "zustand/react";
import { axiosInstance } from "@/api/axios";
import { UserService } from "@/api/User.service";

type AuthState = {
  isLoading: boolean;
  user: UserResponse | null;
  handleAccessToken: (token: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  isLoading: true,
  user: null,
  handleAccessToken: async (token: string) => {
    console.log("Handling access token:", token);
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

    try {
      const user = await UserService.getMyUser();

      console.log("Fetched user:", user);

      set({ user, isLoading: false });
    } catch (error) {
      console.error(error);

      set({ user: null, isLoading: false });
    }
  },
  logout: async () => {
    // clear cookie
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=None; Secure";

    axiosInstance.defaults.headers.Authorization = "";
    set({ user: null });
  },
}));
