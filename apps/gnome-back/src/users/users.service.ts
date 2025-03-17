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

  async getMyGnomes(
    id: string,
  ): Promise<Array<{ gnomeId: string; interactionDate: Date; gnome: Gnome }>> {
    return this.prismaService.gnomeInteraction.findMany({
      where: { userId: id },
      select: {
        gnomeId: true,
        interactionDate: true,
        gnome: true,
      },
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

  async searchForFriend(name: string): Promise<any> {
    return this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        pictureUrl: true,
      },
    });
  }

  async findUserFriends(senderId: string): Promise<Friendship[]> {
    return this.prismaService.friendship.findMany({
      where: {
        senderId: senderId,
        status: "ACTIVE",
      },
    });
  }

  async findPendingRequests(senderId: string): Promise<Friendship[]> {
    return this.prismaService.friendship.findMany({
      where: {
        OR: [{ senderId: senderId }, { receiverId: senderId }],
        status: "PENDING",
      },
    });
  }

  async sendFriendRequest(senderId: string, receiverId: string) {
    return this.prismaService.friendship.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
      },
    });
  }

  async acceptFriendRequest(senderId: string, receiverId: string) {
    return await this.prismaService.$transaction(async (prisma) => {
      const updatedFriendship = await prisma.friendship.updateMany({
        where: {
          senderId: senderId,
          receiverId: receiverId,
          status: "PENDING",
        },
        data: {
          status: "ACTIVE",
        },
      });

      if (updatedFriendship.count === 0) {
        throw new Error("Invalid invite");
      }

      const newFriendship = await prisma.friendship.create({
        data: {
          senderId: receiverId,
          receiverId: senderId,
          status: "ACTIVE",
        },
      });

      return { updatedFriendship, newFriendship };
    });
  }

  async deleteFriend(senderId: string, receiverId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const cancelInvitation = await prisma.friendship.deleteMany({
        where: {
          status: "PENDING",
          OR: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });

      if (cancelInvitation.count === 0) {
        throw new Error("Nothing to cancel");
      }

      const deleteFriendship = await prisma.friendship.deleteMany({
        where: {
          status: "ACTIVE",
          OR: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });

      return { deleteFriendship, cancelInvitation };
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
