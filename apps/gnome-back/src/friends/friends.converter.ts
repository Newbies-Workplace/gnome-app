import { Injectable } from "@nestjs/common";
import { FriendDetailsResponse, FriendResponse } from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";
import { User } from "@/generated/prisma/client";

@Injectable()
export class FriendsConverter {
  constructor(private readonly prismaService: PrismaService) {}

  async toFriendResponse(user: User): Promise<FriendResponse> {
    const interactions = await this.prismaService.gnomeInteraction
      .findMany({
        where: { userId: user.id },
        distinct: ["gnomeId"],
      })
      .then((result) => result.length);

    return {
      id: user.id,
      name: user.name,
      avatar: user.pictureUrl,
      interactions: interactions,
    };
  }

  async toFriendDetailsResponse(user: User): Promise<FriendDetailsResponse> {
    return {
      id: user.id,
      name: user.name,
      pictureUrl: user.pictureUrl,
      inviteCode: user.inviteCode,
    };
  }
}
