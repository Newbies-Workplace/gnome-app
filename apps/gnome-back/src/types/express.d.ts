import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: { id: string };
      file: Express.Multer.File;
    }
  }
}
