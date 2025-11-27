import type { GnomeIdResponse, GnomeResponse } from "@repo/shared/responses";
import { axiosInstance } from "@/api/axios";

const getGnomes = async (): Promise<GnomeResponse[]> => {
  const response = await axiosInstance.get("/gnomes");
  return Array.isArray(response.data) ? response.data : response.data.gnomes;
};

const getGnomeById = async (id: string): Promise<GnomeIdResponse> => {
  const response = await axiosInstance.get(`/gnomes/${id}`);
  return response.data;
};

const addGnome = async (gnome: GnomeResponse): Promise<GnomeResponse> => {
  const response = await axiosInstance.post("/gnomes", gnome);
  return response.data;
};

const removeGnome = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/gnomes/${id}`);
};

export const GnomesService = {
  getGnomes,
  getGnomeById,
  addGnome,
  removeGnome,
};
