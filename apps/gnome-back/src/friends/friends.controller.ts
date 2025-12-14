import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { AddFriendRequest, DeleteFriend } from "@repo/shared/requests";
import { FriendResponse, UserFriendResponse } from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
import { FriendsService } from "@/friends/friends.service";

@ApiBearerAuth()
@Controller("friends")
export class FriendsController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly friendsService: FriendsService,
  ) {}

  @Get("@me")
  @UseGuards(JwtGuard)
  async findUserFriends(@User() user: JwtUser): Promise<FriendResponse[]> {
    const myFriends = await this.friendsService.findUserFriends(user.id);
    return myFriends;
  }

  @Get("@me/:id")
  @UseGuards(JwtGuard)
  async getUserById(
    @Param("id") id: string,
    @User() user: JwtUser,
  ): Promise<UserFriendResponse> {
    return this.friendsService.getFriendData(id, user.id);
  }

  @ApiBody({
    schema: {
      example: {
        inviteCode: "7121971063737059",
      },
    },
  })
  @Post("@me")
  @UseGuards(JwtGuard)
  async addFriend(@User() user: JwtUser, @Body() body: AddFriendRequest) {
    const reciever = await this.prismaService.user.findUnique({
      where: { inviteCode: body.inviteCode },
    });

    if (!reciever) {
      throw new BadRequestException("User with this invite code not found");
    }

    if (reciever.id === user.id) {
      throw new BadRequestException("You cannot add yourself as a friend");
    }

    const isAlreadyFriends =
      (await this.friendsService.findFriendship(user.id, reciever.id)).length >
      0;

    if (isAlreadyFriends) {
      throw new BadRequestException("You are already friends with this user");
    }

    return await this.friendsService.addFriend(user.id, reciever.id);
  }
  @ApiBody({
    schema: {
      example: {
        friendId: "52f343cc-5d93-4293-bff4-0f1b093650d1",
      },
    },
  })

  @Delete("@me")
  @UseGuards(JwtGuard)
  async deleteFriend(@User() user: JwtUser, @Body() body: DeleteFriend) {
    const deleteFriend = await this.friendsService.deleteFriend(
      user.id,
      body.friendId,
    );
    return deleteFriend;
  }
}
