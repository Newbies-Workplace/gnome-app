import { axiosInstance } from "@/lib/api/axios";

const regenerateInviteCode = async () => {
  return await axiosInstance
    .patch("api/rest/v1/users/@me/invite-code")
    .then((response) => {
      return response.data;
    });
};

export const UserService = {
  regenerateInviteCode,
};
