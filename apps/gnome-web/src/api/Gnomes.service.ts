import type { GnomeIdResponse, GnomeResponse } from "@repo/shared/responses";
import { axiosInstance } from "@/api/axios";

const getGnomes = async (): Promise<GnomeResponse[]> => {
  return await axiosInstance
    .get("api/rest/v1/gnomes")
    .then((response) => response.data);
};

const getGnomeById = async (id: string): Promise<GnomeIdResponse> => {
  return await axiosInstance
    .get(`api/rest/v1/gnomes/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const GnomesService = {
  getGnomes,
  getGnomeById,
};
