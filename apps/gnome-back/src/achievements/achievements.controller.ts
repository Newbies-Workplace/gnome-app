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
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { CreateUserAchievementRequest } from "@repo/shared/requests";
import { UserAchievementResponse } from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { Role } from "@/auth/decorators/role.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { FriendsService } from "@/friends/friends.service";
import { AchievementsService } from "./achievements.service";

@ApiBearerAuth()
@Controller("achievements")
export class AchievementsController {
  constructor(
    private readonly achievementsService: AchievementsService,
    private readonly friendsService: FriendsService,
  ) {}

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

  @Get("friend/:id")
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

  @Get("@me/:id")
  @UseGuards(JwtGuard)
  async getAchievementData(
    @Param("id") achievementId: string,
    @User() user: JwtUser,
  ): Promise<UserAchievementResponse> {
    const userAchievement = await this.achievementsService.getAchievementData(
      user.id,
      achievementId,
    );

    return userAchievement;
  }

  @ApiBody({
    schema: {
      example: {
        achievementId: "0c2793ea-0636-46d5-8181-ab51ab949d6f",
      },
    },
  })
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
