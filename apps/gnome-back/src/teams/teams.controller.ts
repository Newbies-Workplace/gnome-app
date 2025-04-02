import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { JWTUser } from "@/auth/jwt/jwtuser";
import { User } from "@/auth/jwt/jwtuser.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse, TeamResponse } from "@repo/shared/responses";
import { NotFoundError } from "rxjs";
import { TeamsService } from "./teams.service";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get("@me") // GET /teams/@me
  @UseGuards(JwtGuard)
  async getMyTeam(@User() user: JWTUser): Promise<ApiResponse<TeamResponse>> {
    const getTeam = await this.teamsService.getTeamWithMemberId(user.id);
    if (!getTeam) {
      throw new NotFoundException("Nie znaleziono zespołu");
    }
    return {
      success: true,
      data: getTeam,
    };
  }

  @Get(":id") // GET /teams/:id
  @UseGuards(JwtGuard)
  async findOne(@Param("id") id: string): Promise<ApiResponse<TeamResponse>> {
    const getTeamById = await this.teamsService.getTeam(id);
    if (!getTeamById) {
      throw new NotFoundException("Nie znaleziono zespołu");
    }
    return {
      success: true,
      data: getTeamById,
    };
  }

  @Post() // POST /teams
  @UseGuards(JwtGuard)
  async create(
    @Body() team: { members: string[] },
    @User() user: JWTUser,
  ): Promise<ApiResponse<TeamResponse>> {
    const leaderId = user.id;
    const createTeam = await this.teamsService.createTeam(
      leaderId,
      team.members,
    );
    return {
      success: true,
      data: createTeam,
    };
  }

  @Delete(":id") // DELETE /teams/:id
  @UseGuards(JwtGuard)
  async deleteTeam(@Param("id") teamId: string) {
    await this.teamsService.deleteTeam(teamId);
    return { message: "Team usunięty" };
  }

  @Put(":id") // PUT /teams/:id
  @UseGuards(JwtGuard)
  async updateTeam(
    @Param("id") teamId: string,
    @Body() body: { newLeaderId?: string; newMemberIds?: string[] },
  ) {
    await this.teamsService.updateTeam(
      teamId,
      body.newLeaderId,
      body.newMemberIds,
    );
    return { message: "Team zaktualizowany" };
  }
}
