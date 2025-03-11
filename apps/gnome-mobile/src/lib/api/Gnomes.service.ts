import { axiosInstance } from "@/lib/api/axios";

const getGnomes = async () => {
  return await axiosInstance
    .get("api/rest/v1/gnomes")
    .then((response) => response.data);
};

export const GnomesService = {
  getGnomes,
};
