import { AuthService } from "@/lib/api/Auth.service";
import type { UserResponse } from "@repo/shared/responses";
import { create } from "zustand/react";

export interface AuthStore {
  user: UserResponse | null;
  accessToken: string | null;
  isLoading: boolean;

  init: () => Promise<void>;
  login: (googleIdToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: true,

  init: async () => {
    //todo check if token is valid and initialize variables
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    set({ isLoading: false });
  },
  login: async (googleIdToken: string) => {
    const response = await AuthService.loginWithGoogle(googleIdToken);

    set({
      accessToken: response.access_token,
      isLoading: false,
      user: response.user,
    });
  },
  logout: async () => {
    set({ accessToken: null, isLoading: false });
  },
}));
