import { ConflictException, Injectable } from "@nestjs/common";
import { Team as PrismaTeam, User, UserResource } from "@prisma/client";
import { AssignTeam, Team } from "@repo/shared/requests";
import { customAlphabet } from "nanoid";
import { GoogleUser } from "@/auth/types/google-user";
import { PrismaService } from "@/db/prisma.service";

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

  async getUsers(page = 0, name?: string): Promise<User[]> {
    const LIMIT = 50;
    const OFFSET = page * LIMIT;

    return this.prismaService.user.findMany({
      take: LIMIT,
      skip: OFFSET,
      where: name
        ? {
            name: { contains: name },
          }
        : undefined,
    });
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

  async createUserWithGoogleData(data: GoogleUser): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        pictureUrl: data.pictureUrl,
        googleId: data.id,
        inviteCode: await this.generateInviteCode(),
      },
    });
    const resource = await this.prismaService.userResource.create({
      data: {
        userId: user.id,
      },
    });
    return user;
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        googleId,
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
  async getUserResources(userId: string): Promise<UserResource | null> {
    return this.prismaService.userResource.findFirst({
      where: {
        userId: userId,
      },
    });
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
