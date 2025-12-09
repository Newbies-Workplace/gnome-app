import { axiosInstance } from "./axios";

const getUserAchivements = async () => {
  return await axiosInstance
    .get("api/rest/v1/achievements/@me")
    .then((response) => {
      return response.data;
    });
};

export const AchievementsService = {
  getUserAchivements,
};
