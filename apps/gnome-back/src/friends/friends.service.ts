import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserFriends(userId: string): Promise<User[]> {
    const friendShips = await this.prismaService.friendship.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      select: {
        sender: true,
        receiver: true,
      },
    });

    return friendShips.map((friendShip) => {
      const isSender = friendShip.sender.id === userId;
      return isSender ? friendShip.receiver : friendShip.sender;
    });
  }

  async getFriendData(friendId: string, userId: string): Promise<User> {
    const friendship = await this.findFriendship(friendId, userId);

    if (friendship === null) {
      throw new ForbiddenException("Friend not found");
    }

    const isSender = friendship.sender.id === friendId;
    return isSender ? friendship.sender : friendship.receiver;
  }

  async findFriendship(senderId: string, receiverId: string) {
    return this.prismaService.friendship.findFirst({
      where: {
        OR: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      select: {
        sender: true,
        receiver: true,
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
    await this.prismaService.friendship.deleteMany({
      where: {
        OR: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });
  }
}
