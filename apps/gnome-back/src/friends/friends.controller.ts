import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Friendship } from "@prisma/client";
import {
  FriendAcceptResponse,
  FriendDeleteResponse,
  FriendSearchResponse,
  FriendsResponse,
  UserResponse,
} from "@repo/shared/responses";
import { AcceptFriendRequest } from "./dto/AcceptRequest.dto";
import { DeleteFriend } from "./dto/DeleteFriend.dto";
import { SendFriendRequest } from "./dto/SendRequest.dto";
import { FriendsService } from "./friends.service";

@Controller("friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get("search") // wyszukiwanie znajomego
  @UseGuards(JwtGuard)
  async searchForFriend(
    @Query("name") name: string,
  ): Promise<FriendSearchResponse[]> {
    /* search/?name="wartosc" */
    const searchForFriend = await this.friendsService.searchForFriend(name);
    return searchForFriend;
  }

  @Get("@me/pending") // zaproszenia oczekujace zatwierdzenia
  @UseGuards(JwtGuard)
  async findPendingRequests(@User() user: JWTUser): Promise<FriendsResponse[]> {
    const findPendingRequests = await this.friendsService.findPendingRequests(
      user.id,
    );
    return findPendingRequests;
  }

  @Get("@me") // znajomi
  @UseGuards(JwtGuard)
  async findUserFriends(@User() user: JWTUser): Promise<FriendsResponse[]> {
    const myFriends = await this.friendsService.findUserFriends(user.id);
    return myFriends;
  }

  @Post("@me/invitation") // zaproszenie znajomego
  @UseGuards(JwtGuard)
  async sendFriendRequest(
    @User() user: JWTUser,
    @Body() body: SendFriendRequest,
  ): Promise<FriendsResponse> {
    const inviteFriend = await this.friendsService.sendFriendRequest(
      user.id,
      body.friendId,
    );
    return inviteFriend;
  }

  @Post("@me/accept") // zaakceptowanie zaproszenia do znajomych
  @UseGuards(JwtGuard)
  async acceptFriendRequest(
    @User() user: JWTUser,
    @Body() body: AcceptFriendRequest,
  ): Promise<FriendAcceptResponse> {
    console.log(user.id);
    console.log(body.senderId);
    const acceptFriend = await this.friendsService.acceptFriendRequest(
      body.senderId,
      user.id,
    );
    return acceptFriend;
  }

  @Delete("@me") // usun znajomego
  @UseGuards(JwtGuard)
  async deleteFriend(
    @User() user: JWTUser,
    @Body() body: DeleteFriend,
  ): Promise<FriendDeleteResponse> {
    const deleteFriend = await this.friendsService.deleteFriend(
      user.id,
      body.friendId,
    );
    return deleteFriend;
  }
}
