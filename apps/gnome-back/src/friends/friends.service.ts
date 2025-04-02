import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Friendship } from "@prisma/client";
import { SearchForFriendResponse } from "@repo/shared/responses";

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async searchForFriend(name: string): Promise<SearchForFriendResponse[]> {
    return this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        pictureUrl: true,
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
  async findUserFriends(senderId: string): Promise<Friendship[]> {
    return this.prismaService.friendship.findMany({
      where: {
        senderId: senderId,
        status: "ACTIVE",
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            pictureUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            pictureUrl: true,
          },
        },
      },
    });
  }

  async sendFriendRequest(senderId: string, receiverId: string) {
    if (senderId !== receiverId) {
      return this.prismaService.friendship.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
        },
      });
    }
    throw new Error("Can't invite yourself");
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
      if (senderId !== receiverId) {
        return { updatedFriendship, newFriendship };
      }
      throw new Error("Can't accept yourself");
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
}
