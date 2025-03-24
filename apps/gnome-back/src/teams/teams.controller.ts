import { JwtGuard } from "@/auth/jwt/jwt.guard";
import type { JWTUser } from "@/auth/jwt/jwtuser";
import { User } from "@/auth/jwt/jwtuser.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import type { TeamsService } from "./teams.service";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get("@me") // GET /teams/@me
  @UseGuards(JwtGuard)
  async getMyTeam(@User() user: JWTUser) {
    console.log(user.id);
    return this.teamsService.getTeamWithMemberId(user.id);
  }

  @Get(":id") // GET /teams/:id
  @UseGuards(JwtGuard)
  findOne(@Param("id") id: string) {
    return this.teamsService.getTeam(id);
  }

  @Post() // POST /teams
  @UseGuards(JwtGuard)
  async create(@Body() team: { members: string[] }, @User() user: JWTUser) {
    const leaderId = user.id;
    return this.teamsService.createTeam(leaderId, team.members);
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
