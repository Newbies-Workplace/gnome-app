import { UserRole } from "@prisma/client";

export type JwtUser = {
  id: string;
  name: string;
  email: string;
  googleId: string;
  role: UserRole;
};

export type Token = {
  user: JwtUser;
};
