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
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateUserAchievementRequest } from "@repo/shared/requests";
import {
  AchievementResponse,
  UserAchievementGiveResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { AchievementsService } from "@/achievements/achievements.service";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { Role } from "@/auth/decorators/role.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { FriendsService } from "@/friends/friends.service";

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

  @Get("")
  async getAllAchievements(): Promise<AchievementResponse[]> {
    const achievements = await this.achievementsService.getAllAchievements();

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

  @Post("")
  @UseGuards(JwtGuard)
  @Role(["ADMIN"])
  async giveAchievement(
    @User() user: JwtUser,
    @Body() body: CreateUserAchievementRequest,
  ): Promise<UserAchievementGiveResponse> {
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
