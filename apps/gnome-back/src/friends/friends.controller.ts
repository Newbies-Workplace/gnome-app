import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Friendship } from "@prisma/client";
import { AddFriendRequest, DeleteFriend } from "@repo/shared/requests";
import {
  FriendResponse,
  FriendSearchResponse,
  UserResponse,
} from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
import { FriendsService } from "./friends.service";

@Controller("friends")
export class FriendsController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly friendsService: FriendsService,
  ) {}

  @Get("@me") // znajomi + ich interakcje
  @UseGuards(JwtGuard)
  async findUserFriends(@User() user: JwtUser): Promise<FriendResponse[]> {
    const myFriends = await this.friendsService.findUserFriends(user.id);
    return myFriends;
  }

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

  @Delete("@me") // usun znajomego
  @UseGuards(JwtGuard)
  async deleteFriend(@User() user: JwtUser, @Body() body: DeleteFriend) {
    const deleteFriend = await this.friendsService.deleteFriend(
      user.id,
      body.friendId,
    );
    return deleteFriend;
  }
}
