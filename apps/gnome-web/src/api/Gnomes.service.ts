import type { CreateGnomeRequest } from "@repo/shared/requests";
import type { GnomeResponse } from "@repo/shared/responses";
import { axiosInstance } from "@/api/axios";

const getGnomes = async (): Promise<GnomeResponse[]> => {
  const response = await axiosInstance.get("/gnomes");
  return response.data;
};

const addGnome = async (payload: FormData): Promise<GnomeResponse> => {
  const response = await axiosInstance.postForm("/gnomes", payload);
  return response.data;
};

const updateGnome = async (
  id: string,
  payload: Partial<CreateGnomeRequest>,
): Promise<GnomeResponse> => {
  const response = await axiosInstance.patch(`/gnomes/${id}`, payload);
  return response.data;
};

const removeGnome = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/gnomes/${id}`);
};

const updateGnomePicture = async (
  id: string,
  payload: FormData,
): Promise<GnomeResponse> => {
  const response = await axiosInstance.patch(`/gnomes/${id}/photo`, payload);
  return response.data;
};

const deleteGnomePicture = async (id: string): Promise<GnomeResponse> => {
  const response = await axiosInstance.delete(`/gnomes/${id}/photo`);
  return response.data;
};

export const GnomesService = {
  getGnomes,
  addGnome,
  updateGnome,
  removeGnome,
  updateGnomePicture,
  deleteGnomePicture,
};
