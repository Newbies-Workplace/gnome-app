import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Friendship } from "@prisma/client";
import { FriendSearchResponse, FriendsResponse } from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";
import { GnomesService } from "@/gnomes/gnomes.service";

@Injectable()
export class FriendsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly gnomesService: GnomesService,
  ) {}

  async findUserFriends(
    senderId: string,
  ): Promise<(Friendship & { interactions: number })[]> {
    const friends = await this.prismaService.friendship.findMany({
      where: {
        OR: [{ senderId: senderId }, { receiverId: senderId }],
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

  async addFriend(senderId: string, receiverId: string) {
    return this.prismaService.friendship.create({
      data: {
        receiverId: receiverId,
        senderId: senderId,
        status: "ACTIVE",
      },
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
