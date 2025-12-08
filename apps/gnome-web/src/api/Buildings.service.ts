import type { BuildingResponse } from "@repo/shared/responses";
import { axiosInstance } from "@/api/axios";

const getBuildings = async (): Promise<BuildingResponse[]> => {
  const response = await axiosInstance.get("/buildings");
  return response.data;
};

export const BuildingsService = {
  getBuildings,
};
