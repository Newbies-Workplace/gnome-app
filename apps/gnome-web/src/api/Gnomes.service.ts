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

const updateGnomePicture = async ({
  id,
  payload,
}: {
  id: string;
  payload: File | null | undefined;
}): Promise<GnomeResponse> => {
  const formData = new FormData();
  if (payload) {
    formData.append("file", payload);
  }
  const response = await axiosInstance.patch(`/gnomes/${id}/photo`, formData);
  return response.data;
};

export const GnomesService = {
  getGnomes,
  addGnome,
  updateGnome,
  removeGnome,
  updateGnomePicture,
};
