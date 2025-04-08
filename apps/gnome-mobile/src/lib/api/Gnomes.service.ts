import { axiosInstance } from "@/lib/api/axios";
import {
  GnomeIdResponse,
  GnomeResponse,
  InteractionResponse,
} from "@repo/shared/responses";

const getGnomes = async (): Promise<GnomeResponse[]> => {
  return await axiosInstance
    .get("api/rest/v1/gnomes")
    .then((response) => response.data);
};

const getMyGnomesInteractions = async (): Promise<InteractionResponse[]> => {
  return await axiosInstance
    .get(`api/rest/v1/gnomes/@me/interactions`)
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
  getMyGnomesInteractions,
  getGnomeById,
};
