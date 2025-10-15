import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Friendship } from "@prisma/client";
import {
  AcceptFriendRequest,
  DeleteFriend,
  SendFriendRequest,
} from "@repo/shared/requests";
import {
  FriendSearchResponse,
  FriendsResponse,
  UserResponse,
} from "@repo/shared/responses";
import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
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
    if (searchForFriend.length === 0) {
      throw new NotFoundException("Nie znaleziono znajomego");
    }
    return searchForFriend;
  }

  @Get("@me/pending") // zaproszenia oczekujace zatwierdzenia
  @UseGuards(JwtGuard)
  async findPendingRequests(@User() user: JWTUser): Promise<FriendsResponse[]> {
    const findPendingRequests = await this.friendsService.findPendingRequests(
      user.id,
    );
    if (findPendingRequests.length === 0) {
      throw new NotFoundException("Brak zaproszeń");
    }
    return findPendingRequests;
  }

  @Get("@me") // znajomi + ich interakcje
  @UseGuards(JwtGuard)
  async findUserFriends(@User() user: JWTUser): Promise<FriendsResponse[]> {
    const myFriends = await this.friendsService.findUserFriends(user.id);
    if (myFriends.length === 0) {
      throw new NotFoundException("Nie masz jeszcze znajomych");
    }
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
    if (!inviteFriend) {
      throw new NotFoundException("Nie można wysłać zaproszenia");
    }

    return inviteFriend;
  }

  @Post("@me/accept") // zaakceptowanie zaproszenia do znajomych
  @UseGuards(JwtGuard)
  async acceptFriendRequest(
    @User() user: JWTUser,
    @Body() body: AcceptFriendRequest,
  ) {
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
  async deleteFriend(@User() user: JWTUser, @Body() body: DeleteFriend) {
    const deleteFriend = await this.friendsService.deleteFriend(
      user.id,
      body.friendId,
    );
    return deleteFriend;
  }
  @Delete("@me/invitation") // odrzucenie zaproszenia
  @UseGuards(JwtGuard)
  async deleteFriendRequest(@User() user: JWTUser, @Body() body: DeleteFriend) {
    const deleteFriendRequest = await this.friendsService.cancelInvitaion(
      user.id,
      body.friendId,
    );
    return deleteFriendRequest;
  }
}
