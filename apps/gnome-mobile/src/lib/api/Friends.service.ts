import { axiosInstance } from "@/lib/api/axios";

const findUserFriends = async () => {
  return await axiosInstance.get("api/rest/v1/friends/@me").then((response) => {
    return response.data;
  });
};

const addFriend = async (inviteCode: string) => {
  return await axiosInstance
    .post("api/rest/v1/friends/@me", { inviteCode })
    .then((response) => {
      return response.data;
    });
};

export const FriendsService = {
  findUserFriends,
  addFriend,
};
