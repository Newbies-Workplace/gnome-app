import type { UserResponse } from "@repo/shared/responses";
import { axiosInstance } from "@/api/axios";

const getMyUser = async () => {
  return await axiosInstance
    .get<UserResponse>("/users/@me")
    .then((res) => res.data);
};

export const UserService = {
  getMyUser,
};
