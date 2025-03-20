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
import { AcceptFriendRequest } from "./dto/AcceptRequest.dto";
import { DeleteFriend } from "./dto/DeleteFriend.dto";
import { SendFriendRequest } from "./dto/SendRequest.dto";
import { FriendsService } from "./friends.service";

@Controller("friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get("search") // wyszukiwanie znajomego
  @UseGuards(JwtGuard)
  async searchForFriend(@Query("name") name: string) {
    /* search/?name="wartosc" */
    return this.friendsService.searchForFriend(name);
  }

  @Get("@me/pending") // zaproszenia oczekujace zatwierdzenia
  @UseGuards(JwtGuard)
  findPendingRequests(@User() user: JWTUser) {
    return this.friendsService.findPendingRequests(user.id);
  }

  @Get("@me") // znajomi
  @UseGuards(JwtGuard)
  findUserFriends(@User() user: JWTUser) {
    return this.friendsService.findUserFriends(user.id);
  }

  @Post("@me/invitation") // zaproszenie znajomego
  @UseGuards(JwtGuard)
  sendFriendRequest(@User() user: JWTUser, @Body() body: SendFriendRequest) {
    return this.friendsService.sendFriendRequest(user.id, body.friendId);
  }

  @Post("@me/accept") // zaakceptowanie zaproszenia do znajomych
  @UseGuards(JwtGuard)
  acceptFriendRequest(
    @User() user: JWTUser,
    @Body() body: AcceptFriendRequest,
  ) {
    console.log(user.id);
    console.log(body.senderId);
    return this.friendsService.acceptFriendRequest(body.senderId, user.id);
  }

  @Delete("@me") // usun znajomego
  @UseGuards(JwtGuard)
  deleteFriend(@User() user: JWTUser, @Body() body: DeleteFriend) {
    return this.friendsService.deleteFriend(user.id, body.friendId);
  }
}
