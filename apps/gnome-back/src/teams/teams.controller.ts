import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { JWTUser } from "@/auth/jwt/jwtuser";
import { User } from "@/auth/jwt/jwtuser.decorator";
import {
  BadRequestException,
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
import { TeamResponse } from "@repo/shared/responses";
import { TeamsService } from "./teams.service";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get("@me") // GET /teams/@me
  @UseGuards(JwtGuard)
  async getMyTeam(@User() user: JWTUser): Promise<TeamResponse> {
    const getTeam = await this.teamsService.getTeamWithMemberId(user.id);
    if (!getTeam) {
      throw new NotFoundException("Nie znaleziono zespołu");
    }
    return getTeam;
  }

  @Get(":id") // GET /teams/:id
  @UseGuards(JwtGuard)
  async findOne(@Param("id") id: string): Promise<TeamResponse> {
    const getTeamById = await this.teamsService.getTeam(id);
    if (!getTeamById) {
      throw new NotFoundException("Nie znaleziono zespołu");
    }
    return getTeamById;
  }

  @Post() // POST /teams
  @UseGuards(JwtGuard)
  async create(
    @Body() team: { members: string[] },
    @User() user: JWTUser,
  ): Promise<TeamResponse> {
    const leaderId = user.id;
    const createTeam = await this.teamsService.createTeam(
      leaderId,
      team.members,
    );

    return createTeam;
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
