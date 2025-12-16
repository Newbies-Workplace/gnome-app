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
import { AddFriendRequest } from "@repo/shared/requests";
import { FriendDetailsResponse, FriendResponse } from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
import { FriendsConverter } from "@/friends/friends.converter";
import { FriendsService } from "@/friends/friends.service";

@ApiBearerAuth()
@Controller("friends")
export class FriendsController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly converter: FriendsConverter,
    private readonly friendsService: FriendsService,
  ) {}

  @Get("@me")
  @UseGuards(JwtGuard)
  async findUserFriends(@User() user: JwtUser): Promise<FriendResponse[]> {
    const myFriends = await this.friendsService.findUserFriends(user.id);

    return Promise.all(
      myFriends.map((friend) => this.converter.toFriendResponse(friend)),
    );
  }

  @Get("@me/:id")
  @UseGuards(JwtGuard)
  async getUserById(
    @Param("id") friendId: string,
    @User() user: JwtUser,
  ): Promise<FriendDetailsResponse> {
    const friend = await this.friendsService.getFriendData(friendId, user.id);

    return this.converter.toFriendDetailsResponse(friend);
  }

  @ApiBody({
    schema: {
      example: {
        inviteCode: "1234123412341234",
      },
    },
  })
  @Post("@me")
  @UseGuards(JwtGuard)
  async addFriend(
    @User() user: JwtUser,
    @Body() body: AddFriendRequest,
  ): Promise<FriendDetailsResponse> {
    const receiver = await this.prismaService.user.findUnique({
      where: { inviteCode: body.inviteCode },
    });

    if (!receiver) {
      throw new BadRequestException("User with this invite code not found");
    }

    if (receiver.id === user.id) {
      throw new BadRequestException("You cannot add yourself as a friend");
    }

    const isAlreadyFriends =
      (await this.friendsService.findFriendship(user.id, receiver.id)) !== null;

    if (isAlreadyFriends) {
      throw new BadRequestException("You are already friends with this user");
    }

    await this.friendsService.addFriend(user.id, receiver.id);

    return this.converter.toFriendDetailsResponse(receiver);
  }

  @Delete(":id")
  @UseGuards(JwtGuard)
  async deleteFriend(@User() user: JwtUser, @Param("id") friendId: string) {
    await this.friendsService.deleteFriend(user.id, friendId);
  }
}
