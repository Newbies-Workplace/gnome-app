import {
  Body,
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
import { Role } from "@/role/role.decorator";
import { AchievementsService } from "./achievements.service";

@Controller("achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get("@me/achievements")
  @UseGuards(JwtGuard)
  async getMyAchievements(
    @User() user: JwtUser,
  ): Promise<UserAchievementResponse[]> {
    const achievements = await this.achievementsService.getUserAchievements(
      user.id,
    );

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
