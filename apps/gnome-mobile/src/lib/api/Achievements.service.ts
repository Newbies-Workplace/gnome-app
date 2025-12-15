import { axiosInstance } from "./axios";

const getUserAchievements = async () => {
  return await axiosInstance
    .get("api/rest/v1/achievements/@me")
    .then((response) => {
      return response.data;
    });
};

const getAllAchievements = async () => {
  return await axiosInstance
    .get("api/rest/v1/achievements/all")
    .then((response) => {
      return response.data;
    });
};

export const AchievementsService = {
  getUserAchievements,
  getAllAchievements,
};
