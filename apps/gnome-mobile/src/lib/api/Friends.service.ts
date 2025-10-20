import { FriendsResponse } from "@repo/shared/responses";
import { axiosInstance } from "@/lib/api/axios";

const findUserFriends = async () => {
  return await axiosInstance.get("api/rest/v1/friends/@me").then((response) => {
    return response.data;
  });
};

export const FriendsService = {
  findUserFriends,
};
