import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Achievement } from "@prisma/client";
import { CreateUserAchievementRequest } from "@repo/shared/requests";
import {
  AchievementDataResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { NotFoundError } from "rxjs";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { FriendsService } from "@/friends/friends.service";
import { Role } from "@/role/role.decorator";
import { AchievementsService } from "./achievements.service";

@Controller("achievements")
export class AchievementsController {
  constructor(
    private readonly achievementsService: AchievementsService,
    private readonly friendsService: FriendsService,
  ) {}

  // Wyszukiwanie swoich achievementów

  @Get("@me")
  @UseGuards(JwtGuard)
  async getMyAchievements(
    @User() user: JwtUser,
  ): Promise<UserAchievementResponse[]> {
    const achievements = await this.achievementsService.getUserAchievements(
      user.id,
    );

    return achievements;
  }

  @Get(":id")
  @UseGuards(JwtGuard)
  async getFriendAchievements(
    @Param("id") friendId: string,
    @User() user: JwtUser,
  ): Promise<UserAchievementResponse[]> {
    const friends = await this.friendsService.findFriendship(user.id, friendId);

    if (!friends) {
      throw new ConflictException(
        "No friendship found - cannot check achievements",
      );
    }

    const achievements =
      await this.achievementsService.getUserAchievements(friendId);

    return achievements;
  }

  // Wyszukiwanie daty zdobycia danego achievementu

  @Get("@me/:id")
  @UseGuards(JwtGuard)
  async getAchievementData(
    @Param("id") achievementId: string,
    @User() user: JwtUser,
    // @xd // DODAC SPRAWDZANIE ZNAJOMEGO + , OPROCZ TEGO WYJEBAC ZE SCHEMY ID Z USERACHIEVEMETNS +  I ZMIENIC W ENDPOINCIE PARAMETR WYSZUKIWANIA + (ZROBIONE WSZYSKTO)
  ): Promise<UserAchievementResponse> {
    const userAchievement = await this.achievementsService.getAchievementData(
      user.id,
      achievementId,
    );

    return userAchievement;
  }

  @Post("")
  @UseGuards(JwtGuard)
  @Role(["ADMIN"])
  async giveAchievement(
    @User() user: JwtUser,
    @Body() body: CreateUserAchievementRequest,
  ): Promise<UserAchievementResponse> {
    const achievement = await this.achievementsService.getAchievement(
      body.achievementId,
    );

    if (!achievement) {
      throw new NotFoundException("Achievement not found");
    }
    const give = await this.achievementsService.giveAchievement(
      user.id,
      body.achievementId,
    );

    return give;
  }
}
