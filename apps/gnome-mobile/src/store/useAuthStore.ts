import { AuthService } from "@/lib/api/Auth.service";
import { axiosInstance } from "@/lib/api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthStore {
  user: UserResponse | null;
  accessToken: string | null;
  isLoading: boolean;

  init: () => Promise<void>;
  login: (googleIdToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isLoading: true,

      init: async () => {
        const accessToken = get().accessToken;
        if (accessToken) {
          axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        }
        set({ isLoading: false });
      },

      login: async (googleIdToken: string) => {
        const response = await AuthService.loginWithGoogle(googleIdToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${response.access_token}`;

        set({
          accessToken: response.access_token,
          user: response.user,
          isLoading: false,
        });
      },

      logout: async () => {
        set({ user: null, accessToken: null, isLoading: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["isLoading"].includes(key)),
        ),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
