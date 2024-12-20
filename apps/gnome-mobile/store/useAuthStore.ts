import {create} from "zustand/react";

export interface AuthStore {
  session: string | null;
  isLoading: boolean;

  init: () => Promise<void>;
  login: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  isLoading: true,
  init: async () => {
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    })

    set({ isLoading: false });
  },
  login: () => {
    set({ session: "123", isLoading: false });
  }
}));
