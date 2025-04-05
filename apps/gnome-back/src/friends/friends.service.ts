import { PrismaService } from "@/db/prisma.service";
import { GnomesService } from "@/gnomes/gnomes.service";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Friendship } from "@prisma/client";
import { FriendSearchResponse, FriendsResponse } from "@repo/shared/responses";

@Injectable()
export class FriendsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly gnomesService: GnomesService,
  ) {}

  async searchForFriend(name: string): Promise<FriendSearchResponse[]> {
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
  async findUserFriends(
    senderId: string,
  ): Promise<(Friendship & { interactions: number })[]> {
    const friends = await this.prismaService.friendship.findMany({
      where: {
        senderId: senderId,
        status: "ACTIVE",
      },
    });

    return Promise.all(
      friends.map(async (friend) => {
        const interactions = await this.gnomesService.getInteractionCount(
          friend.receiverId,
        );
        return {
          ...friend,
          interactions,
        };
      }),
    );
  }

  async findFriendship(
    senderId: string,
    receiverId: string,
  ): Promise<FriendsResponse[] | null> {
    return this.prismaService.friendship.findMany({
      where: {
        OR: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });
  }
  async sendFriendRequest(
    senderId: string,
    receiverId: string,
  ): Promise<FriendsResponse | null> {
    if (senderId !== receiverId) {
      const findFriend = await this.prismaService.user.findUnique({
        where: {
          id: receiverId,
        },
      });
      if (!findFriend) {
        throw new NotFoundException("Nie znaleziono użytkownika");
      }
      const findFriendship = await this.findFriendship(senderId, receiverId);
      const friendshipStatus = findFriendship.map(
        (friendship) => friendship.status,
      );

      if (friendshipStatus.includes("ACTIVE")) {
        throw new BadRequestException("Już jesteście znajomymi");
      }
      if (friendshipStatus.includes("PENDING")) {
        throw new BadRequestException("Już wysłałeś zaproszenie");
      }

      const inviteFriend = await this.prismaService.friendship.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
        },
      });

      return inviteFriend;
    }
    throw new BadRequestException("Nie możesz zaprosić siebie");
  }
  async acceptFriendRequest(senderId: string, receiverId: string) {
    return await this.prismaService.$transaction(async (prisma) => {
      const findFriendship = await this.findFriendship(senderId, receiverId);
      const friendshipStatus = findFriendship.map(
        (friendship) => friendship.status,
      );
      if (!friendshipStatus.includes("PENDING")) {
        throw new BadRequestException("Nie masz zaproszenia do znajomych");
      }
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

  async cancelInvitaion(senderId: string, receiverId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const findFriendship = await this.findFriendship(senderId, receiverId);
      const friendshipStatus = findFriendship.map(
        (friendship) => friendship.status,
      );
      if (!friendshipStatus.includes("PENDING")) {
        throw new BadRequestException("Nie masz zaproszenia do znajomych");
      }
      const cancelOutgoingInvitation = await prisma.friendship.deleteMany({
        where: {
          senderId: senderId,
          receiverId: receiverId,
          status: "PENDING",
        },
      });
      const cancelIncomingInvitation = await prisma.friendship.deleteMany({
        where: {
          senderId: receiverId,
          receiverId: senderId,
          status: "PENDING",
        },
      });
      return { cancelOutgoingInvitation, cancelIncomingInvitation };
    });
  }

  async deleteFriend(senderId: string, receiverId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const findFriendship = await this.findFriendship(senderId, receiverId);
      const friendshipStatus = findFriendship.map(
        (friendship) => friendship.status,
      );

      const deleteFriendship = await prisma.friendship.deleteMany({
        where: {
          status: "ACTIVE",
          OR: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });

      return { deleteFriendship };
    });
  }
}
