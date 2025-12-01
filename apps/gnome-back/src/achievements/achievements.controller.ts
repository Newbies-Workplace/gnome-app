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
import { AchievementsService } from "./achievements.service";

@Controller("achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  // Endpointy niżej

  @Get(":id")
  @UseGuards()
  async getAchievementData(
    @Param("id") achievementId: string,
  ): Promise<AchievementDataResponse> {
    const achievement =
      await this.achievementsService.getAchievementData(achievementId);
    if (!achievement) {
      throw new NotFoundException("Achievement not found");
    }
    return achievement;
  }

  @Get("user/:id/achievements")
  @UseGuards()
  async getUserAchievements(
    @Param("id") userId: string,
  ): Promise<UserAchievementResponse[]> {
    const achievements =
      await this.achievementsService.getUserAchievements(userId);

    return achievements;
  }

  @Post()
  @UseGuards(JwtGuard)
  async giveAchievement(
    @User() user: JwtUser,
    @Body() body: CreateUserAchievementRequest,
  ): Promise<UserAchievementResponse> {
    const achievement = await this.achievementsService.getAchievementData(
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
