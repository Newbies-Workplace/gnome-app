import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Friendship, User } from "@prisma/client";
import {
  FriendResponse,
  FriendSearchResponse,
  FriendShipResponse,
  UserFriendResponse,
} from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";
import { GnomesService } from "@/gnomes/gnomes.service";

@Injectable()
export class FriendsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly gnomesService: GnomesService,
  ) {}

  async findUserFriends(userId: string): Promise<FriendResponse[]> {
    const friendShips = await this.prismaService.friendship.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      select: {
        sender: true,
        receiver: true,
      },
    });

    const friends = friendShips.map((friendShip) => {
      const isSender = friendShip.sender.id === userId;
      return isSender ? friendShip.receiver : friendShip.sender;
    });

    return Promise.all(
      friends.map(async (friend) => {
        const interactions =
          await this.gnomesService.getUserUniqueInteractionCount(friend.id);
        return {
          id: friend.id,
          name: friend.name,
          avatar: friend.pictureUrl,
          interactions: interactions,
        };
      }),
    );
  }

  async getFriendData(id: string, userId: string): Promise<UserFriendResponse> {
    const isFriends = await this.findFriendship(id, userId);
    if (isFriends.length === 0) {
      return null;
    }
    const findFriend = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        achievements: {
          include: {
            achievement: true,
          },
        },
        gnomeInteractions: true,
      },
    });

    return findFriend;
  }

  async findFriendship(
    senderId: string,
    receiverId: string,
  ): Promise<FriendShipResponse[] | null> {
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
      },
    });
  }

  async deleteFriend(senderId: string, receiverId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const findFriendship = await this.findFriendship(senderId, receiverId);

      const deleteFriendship = await prisma.friendship.deleteMany({
        where: {
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
