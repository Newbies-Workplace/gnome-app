import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  AcceptFriendRequest,
  DeleteFriend,
  SendFriendRequest,
} from "@repo/shared/requests";
import { FriendSearchResponse, FriendsResponse } from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
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
  async findPendingRequests(@User() user: JwtUser): Promise<FriendsResponse[]> {
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
  async findUserFriends(@User() user: JwtUser): Promise<FriendsResponse[]> {
    const myFriends = await this.friendsService.findUserFriends(user.id);
    if (myFriends.length === 0) {
      throw new NotFoundException("Nie masz jeszcze znajomych");
    }
    return myFriends;
  }

  @Post("@me/invitation") // zaproszenie znajomego
  @UseGuards(JwtGuard)
  async sendFriendRequest(
    @User() user: JwtUser,
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
    @User() user: JwtUser,
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
  async deleteFriend(@User() user: JwtUser, @Body() body: DeleteFriend) {
    const deleteFriend = await this.friendsService.deleteFriend(
      user.id,
      body.friendId,
    );
    return deleteFriend;
  }
  @Delete("@me/invitation") // odrzucenie zaproszenia
  @UseGuards(JwtGuard)
  async deleteFriendRequest(@User() user: JwtUser, @Body() body: DeleteFriend) {
    const deleteFriendRequest = await this.friendsService.cancelInvitaion(
      user.id,
      body.friendId,
    );
    return deleteFriendRequest;
  }
}
