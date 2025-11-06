export type JwtUser = {
  id: string;
  name: string;
  email: string;
  googleId: string;
};

export type Token = {
  user: JwtUser;
};
