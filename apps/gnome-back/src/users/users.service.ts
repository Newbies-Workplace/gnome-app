import { GoogleUser } from "@/auth/types/GoogleUser";
import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Friendship, User } from "@prisma/client";

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

  async findUserFriends(senderId: string): Promise<Friendship[]> {
    return this.prismaService.friendship.findMany({
      where: {
        senderId,
      },
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
