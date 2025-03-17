import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { UsersService } from "@/users/users.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User as PrismaUser } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("") // wszyscy uztkownicy
  findAll() {
    return this.usersService.findAll();
  }
  @Get("@me") // moj profil
  @UseGuards(JwtGuard)
  async getMe(@User() user: JWTUser): Promise<PrismaUser> {
    return this.usersService.findUserById(user.id);
  }

  @Get("@me/gnomes") // wyswietlanie swojej interakcji z gnomem
  @UseGuards(JwtGuard)
  async getMyGnomes(@User() user: JWTUser) {
    return this.usersService.getMyGnomes(user.id);
  }

  @Patch("@me") // zaaktualizuj profil
  @UseGuards(JwtGuard)
  async changeUserData(
    @User() user: JWTUser,
    @Body() body: { name: string; pictureUrl: string },
  ) {
    const { name, pictureUrl } = body;
    return this.usersService.changeUserData(user.id, name, pictureUrl);
  }

  @Get("@me/friends/search") // wyszukiwanie znajomego
  @UseGuards(JwtGuard)
  async searchForFriend(@Query("name") name: string) {
    /* search/?name="wartosc" */
    return this.usersService.searchForFriend(name);
  }

  @Get("@me/friends/pending") // zaproszenia oczekujace zatwierdzenia
  @UseGuards(JwtGuard)
  findPendingRequests(@User() user: JWTUser) {
    return this.usersService.findPendingRequests(user.id);
  }

  @Get(":id") // znajdz uzytkownika
  findUserById(@Param("id") id: string) {
    return this.usersService.findUserById(id);
  }
  @Get("@me/friends") // znajomi
  @UseGuards(JwtGuard)
  findUserFriends(@User() user: JWTUser) {
    return this.usersService.findUserFriends(user.id);
  }

  @Post("@me/friends/:id/invite") // zaproszenie znajomego
  @UseGuards(JwtGuard)
  sendFriendRequest(@User() user: JWTUser, @Param("id") friendId: string) {
    return this.usersService.sendFriendRequest(user.id, friendId);
  }

  @Post("@me/friends/:id/accept") // zaakceptowanie zaproszenia do znajomych
  @UseGuards(JwtGuard)
  acceptFriendRequest(@User() user: JWTUser, @Param("id") senderId: string) {
    return this.usersService.acceptFriendRequest(senderId, user.id);
  }

  @Delete("@me/friends/:id") // usun znajomego
  @UseGuards(JwtGuard)
  deleteFriend(@User() user: JWTUser, @Param("id") friendId: string) {
    return this.usersService.deleteFriend(user.id, friendId);
  }
}
