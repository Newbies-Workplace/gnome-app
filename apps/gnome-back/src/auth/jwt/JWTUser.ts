export type JWTUser = {
  id: string;
  name: string;
  email: string;
  googleId: string;
};

export type Token = {
  user: JWTUser;
};
