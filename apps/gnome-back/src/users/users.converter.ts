import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserResponse } from "@repo/shared/responses";
import { User, UserResource } from "@/generated/prisma/client";

@Injectable()
export class UsersConverter {
  constructor(private readonly configService: ConfigService) {}

  async toUserResponse(
    user: User & { Resource: UserResource },
  ): Promise<UserResponse> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pictureUrl: user.pictureUrl
        ? user.pictureUrl.startsWith("http")
          ? user.pictureUrl
          : this.configService.get("STORAGE_URL_PREFIX") + user.pictureUrl
        : undefined,
      inviteCode: user.inviteCode,
      role: user.role,
      resources: {
        berries: user.Resource.berries,
        stones: user.Resource.stones,
        sticks: user.Resource.sticks,
      },
    };
  }
}
