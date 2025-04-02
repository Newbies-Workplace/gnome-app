import { axiosInstance } from "@/lib/api/axios";
import type { Gnome } from "@/store/useGnomeStore";

const getGnomes = async (): Promise<Gnome[]> => {
  return await axiosInstance
    .get("api/rest/v1/gnomes")
    .then((response) => response.data);
};

const getMyGnomesInteractions = async (userId: string) => {
  return await axiosInstance
    .get(`api/rest/v1/interactions?userId=${userId}`)
    .then((response) => response.data);
};

export const GnomesService = {
  getGnomes,
  getMyGnomesInteractions,
};
