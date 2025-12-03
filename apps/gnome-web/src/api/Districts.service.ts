import type { DistrictsResponse } from "@repo/shared/responses";
import { axiosInstance } from "@/api/axios";

const getDistricts = async (): Promise<DistrictsResponse[]> => {
  const response = await axiosInstance.get("/districts");
  return response.data;
};

export const DistrictsService = {
  getDistricts,
};
