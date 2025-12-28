import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import type { UserResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthService } from "@/lib/api/Auth.service";
import { UserService } from "@/lib/api/User.service";

export interface AuthStore {
  user: UserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;

  login: (googleIdToken: string) => Promise<void>;
  logout: () => Promise<void>;
  handleTokens: (accessToken: string, refreshToken: string) => void;

  deleteAccount: () => Promise<void>;
  regenerateInviteCode: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,

      login: async (googleIdToken: string) => {
        const response = await AuthService.loginWithGoogle(googleIdToken);

        await get().handleTokens(response.accessToken, response.refreshToken);

        set({
          user: response.user,
          isLoading: false,
        });
      },

      logout: async () => {
        GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        });
        await GoogleSignin.signOut().catch();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoading: false,
        });
      },

      handleTokens: async (accessToken: string, refreshToken: string) => {
        set({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      },

      deleteAccount: async () => {
        await UserService.deleteAccount();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoading: false,
        });
      },

      regenerateInviteCode: async () => {
        const user = get().user;
        if (!user) return;

        const response = await UserService.regenerateInviteCode();
        set({ user: { ...user, inviteCode: response.inviteCode } });
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
