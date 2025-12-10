import type { UserResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { axiosInstance } from "@/api/axios";
import { UserService } from "@/api/User.service";

type AuthState = {
  isLoading: boolean;
  user: UserResponse | null;
  accessToken: string | null;
  init: () => Promise<void>;
  handleAccessToken: (token: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoading: true,
      user: null,
      accessToken: null,

      init: async () => {
        const token = get().accessToken;
        if (!token) {
          set({ isLoading: false });
          return;
        }

        set({ isLoading: true });
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
        try {
          const user = await UserService.getMyUser();
          set({ user, isLoading: false });
        } catch {
          set({ user: null, accessToken: null, isLoading: false });
        }
      },

      handleAccessToken: async (token: string) => {
        set({ isLoading: true });
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
        try {
          const user = await UserService.getMyUser();
          set({ accessToken: token, user, isLoading: false });
        } catch {
          set({ accessToken: null, user: null, isLoading: false });
        }
      },

      logout: () => {
        axiosInstance.defaults.headers.Authorization = "";
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.init(),
    },
  ),
);
