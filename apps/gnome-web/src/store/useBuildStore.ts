import type { BuildingResponse, UserResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { BuildingsService } from "@/api/Buildings.service";
import { UserService } from "@/api/User.service";

interface BuildingWithOwner extends BuildingResponse {
  ownerName: string;
}

interface BuildState {
  buildings: BuildingResponse[];
  users: UserResponse[];
  loading: boolean;
  error: string | null;

  fetchBuildings: () => Promise<void>;
  fetchUsers: () => Promise<void>;

  getBuildingsWithOwnerName: () => BuildingWithOwner[];
}

export const useBuildStore = create<BuildState>((set, get) => ({
  buildings: [],
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      const data = await UserService.getMyUser(); // lub getUsers jeśli jest endpoint wszystkich
      set({ users: Array.isArray(data) ? data : [data] });
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? "Brak autoryzacji - zaloguj się"
          : "Nie udało się pobrać użytkowników";

      set({ error: message });
    }
  },

  fetchBuildings: async () => {
    set({ loading: true, error: null });
    try {
      const data = await BuildingsService.getBuildings();
      set({
        buildings: Array.isArray(data) ? data : [data],
        loading: false,
      });
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? "Brak autoryzacji - zaloguj się"
          : "Nie udało się pobrać budowli";
      set({ error: message, loading: false });
    }
  },

  getBuildingsWithOwnerName: () => {
    const { buildings, users } = get();
    return buildings.map((b) => ({
      ...b,
      ownerName: users.find((u) => u.id === b.ownerId)?.name || "Nieznany",
    }));
  },
}));
