import { GoogleUser } from "@/auth/types/GoogleUser";
import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Friendship, Gnome, GnomeInteraction, User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async changeUserData(
    id: string,
    name: string,
    pictureUrl: string,
  ): Promise<{ id: string; name: string; pictureUrl: string }> {
    const dataToUpdate: any = {};

    if (name) {
      dataToUpdate.name = name;
    }

    if (pictureUrl) {
      dataToUpdate.pictureUrl = pictureUrl;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return { id, name, pictureUrl };
    }

    return this.prismaService.user.update({
      where: { id: id },
      data: dataToUpdate,
    });
  }

  async createUserWithGoogleData(data: GoogleUser): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        pictureUrl: data.pictureUrl,
        googleId: data.id,
      },
    });
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        googleId,
      },
    });
  }
}
