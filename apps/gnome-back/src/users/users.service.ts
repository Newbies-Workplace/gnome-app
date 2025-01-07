import { Injectable } from "@nestjs/common";
import type { User } from "@prisma/client";
import type { GoogleUser } from "src/auth/types/GoogleUser.js";
import type { PrismaService } from "src/prisma.service.js";

@Injectable()
export class UsersService {
  constructor(private readonly prismaservice: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    return this.prismaservice.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUserWithGoogleData(data: GoogleUser): Promise<User> {
    return this.prismaservice.user.create({
      data: {
        email: data.email,
        name: data.name,
        pictureUrl: data.pictureUrl,
        googleId: data.id,
      },
    });
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    return this.prismaservice.user.findFirst({
      where: {
        googleId,
      },
    });
  }
}
