import { Injectable } from "@nestjs/common";
import { User, UserResource } from "@prisma/client";
import { UserResponse } from "@repo/shared/responses";

@Injectable()
export class UsersConverter {
  async toUserResponse(
    user: User & { Resource: UserResource },
  ): Promise<UserResponse> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pictureUrl: user.pictureUrl,
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
