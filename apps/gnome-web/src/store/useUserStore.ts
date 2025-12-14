import type { UserResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { UserService } from "@/api/User.service";

interface UserState {
  users: UserResponse[];
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      const data = await UserService.getMyUser();
      set({ users: Array.isArray(data) ? data : [data] });
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? "Brak autoryzacji - zaloguj się"
          : "Nie udało się pobrać użytkowników";

      set({ error: message });
    }
  },
}));
