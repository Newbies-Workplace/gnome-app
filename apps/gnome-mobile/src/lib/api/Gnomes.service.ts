import { CreateInteractionRequest } from "@repo/shared/requests";
import {
  GnomeIdResponse,
  GnomeResponse,
  InteractionResponse,
} from "@repo/shared/responses";
import { axiosInstance } from "@/lib/api/axios";

const getGnomes = async (): Promise<GnomeResponse[]> => {
  return await axiosInstance
    .get("api/rest/v1/gnomes")
    .then((response) => response.data);
};

const getMyGnomesInteractions = async (): Promise<InteractionResponse[]> => {
  return await axiosInstance
    .get("api/rest/v1/gnomes/@me/interactions")
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

const addInteraction = async (
  data: CreateInteractionRequest,
): Promise<InteractionResponse> => {
  return await axiosInstance
    .post("api/rest/v1/gnomes/interaction", data)
    .then((response) => response.data);
};

const getInteractionCount = async (gnomeId: string): Promise<number> => {
  return await axiosInstance
    .get(`api/rest/v1/gnomes/${gnomeId}/interactions/count`)
    .then((response) => response.data);
};

export const GnomesService = {
  getGnomes,
  getMyGnomesInteractions,
  getGnomeById,
  addInteraction,
  getInteractionCount,
};
