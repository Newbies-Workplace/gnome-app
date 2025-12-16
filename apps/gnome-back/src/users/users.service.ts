import { ConflictException, Injectable } from "@nestjs/common";
import { Team as PrismaTeam, User, UserResource } from "@prisma/client";
import { Team } from "@repo/shared/requests";
import { customAlphabet } from "nanoid";
import { GoogleUser } from "@/auth/types/google-user";
import { PrismaService } from "@/db/prisma.service";

const PAGE_LIMIT = 50;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(
    id: string,
  ): Promise<(User & { Resource: UserResource }) | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        Resource: true,
      },
    });
  }

  async getUsers(
    page = 0,
    name?: string,
  ): Promise<(User & { Resource: UserResource })[]> {
    const OFFSET = page * PAGE_LIMIT;

    return this.prismaService.user.findMany({
      take: PAGE_LIMIT,
      skip: OFFSET,
      include: {
        Resource: true,
      },
      where: name
        ? {
            name: { contains: name },
          }
        : undefined,
    });
  }

  async changeUserData(
    id: string,
    {
      name,
      pictureUrl,
    }: {
      name?: string;
      pictureUrl?: string;
    },
  ): Promise<User & { Resource: UserResource }> {
    const dataToUpdate: any = {};

    if (name) {
      dataToUpdate.name = name;
    }

    if (pictureUrl) {
      dataToUpdate.pictureUrl = pictureUrl;
    }

    return this.prismaService.user.update({
      where: { id: id },
      data: dataToUpdate,
      include: {
        Resource: true,
      },
    });
  }

  async deleteAccount(userId) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async generateInviteCode() {
    const alphabet = "0123456789";
    const nanoid = customAlphabet(alphabet, 16);

    return nanoid();
  }

  async createUserWithGoogleData(
    data: GoogleUser,
  ): Promise<User & { Resource: UserResource }> {
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        pictureUrl: data.pictureUrl,
        googleId: data.id,
        inviteCode: await this.generateInviteCode(),
        Resource: {
          create: {
            berries: 0,
            stones: 0,
            sticks: 0,
          },
        },
      },
      include: {
        Resource: true,
      },
    });

    return user;
  }

  async findUserByGoogleId(
    googleId: string,
  ): Promise<(User & { Resource: UserResource }) | null> {
    return this.prismaService.user.findFirst({
      where: {
        googleId,
      },
      include: {
        Resource: true,
      },
    });
  }

  async regenerateInviteCode(userId: string): Promise<string> {
    const newInviteCode = await this.generateInviteCode();

    await this.prismaService.user.update({
      where: { id: userId },
      data: { inviteCode: newInviteCode },
    });

    return newInviteCode;
  }

  async assignTeam(userId: string, team: Team) {
    const hasAssigned = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (hasAssigned.Team)
      throw new ConflictException("User already have assigned team");

    return this.prismaService.user.update({
      where: { id: userId },
      data: { Team: team as unknown as PrismaTeam },
    });
  }
}
