import { CreateInteractionRequest } from "@repo/shared/requests";
import {
  GnomeDetailsResponse,
  GnomeResponse,
  InteractionResponse,
} from "@repo/shared/responses";
import { axiosInstance } from "@/lib/api/axios";

const getGnomes = async (): Promise<GnomeResponse[]> => {
  return await axiosInstance
    .get("api/rest/v1/gnomes")
    .then((response) => response.data);
};

const getMyGnomesUniqueInteractions = async (): Promise<
  InteractionResponse[]
> => {
  return await axiosInstance
    .get("api/rest/v1/gnomes/@me/interactions")
    .then((response) => response.data);
};

const getGnomeById = async (id: string): Promise<GnomeDetailsResponse> => {
  return await axiosInstance
    .get(`api/rest/v1/gnomes/${id}`)
    .then((response) => {
      return response.data;
    });
};

const addInteraction = async (
  gnomeId: string,
  data: CreateInteractionRequest,
): Promise<InteractionResponse> => {
  return await axiosInstance
    .post(`api/rest/v1/gnomes/${gnomeId}/interactions`, data)
    .then((response) => response.data);
};

const getInteractionCount = async (gnomeId: string): Promise<number> => {
  return await axiosInstance
    .get(`api/rest/v1/gnomes/${gnomeId}/interactions/count`)
    .then((response) => response.data);
};

export const GnomesService = {
  getGnomes,
  getMyGnomesUniqueInteractions,
  getGnomeById,
  addInteraction,
  getInteractionCount,
};
