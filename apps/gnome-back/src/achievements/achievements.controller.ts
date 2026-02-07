import {
  ConflictException,
  Controller,
  Get,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import {
  AchievementResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { AchievementsConverter } from "@/achievements/achievements.converter";
import { AchievementsService } from "@/achievements/achievements.service";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { FriendsService } from "@/friends/friends.service";

@ApiBearerAuth()
@Controller("/v1/achievements")
export class AchievementsController {
  constructor(
    private readonly achievementsService: AchievementsService,
    private readonly friendsService: FriendsService,
    private readonly converter: AchievementsConverter,
  ) {}

  @Get("@me")
  @UseGuards(JwtGuard)
  async getMyAchievements(
    @User() user: JwtUser,
  ): Promise<UserAchievementResponse[]> {
    const achievements = await this.achievementsService.getUserAchievements(
      user.id,
    );

    return Promise.all(
      achievements.map((a) => this.converter.toUserAchievementResponse(a)),
    );
  }

  @Get("")
  async getAllAchievements(): Promise<AchievementResponse[]> {
    const allAchievements = await this.achievementsService.getAllAchievements();

    return Promise.all(
      allAchievements.map((a) => this.converter.toAchievementResponse(a)),
    );
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

    return Promise.all(
      achievements.map((a) => this.converter.toUserAchievementResponse(a)),
    );
  }
}
