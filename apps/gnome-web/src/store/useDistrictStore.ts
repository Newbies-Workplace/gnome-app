import type { DistrictsResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { DistrictsService } from "@/api/Districts.service";

interface DistrictState {
  districts: DistrictsResponse[];
  fetchDistricts: () => Promise<void>;
}

export const useDistrictStore = create<DistrictState>((set) => ({
  districts: [],
  fetchDistricts: async () => {
    const data = await DistrictsService.getDistricts();
    set({ districts: data });
  },
}));
