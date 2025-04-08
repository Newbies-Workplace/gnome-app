import { PrismaService } from "@/db/prisma.service";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma, TeamMembership } from "@prisma/client";
@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeam(id: string) {
    const getTeam = await this.prisma.team.findUnique({
      include: {
        members: {
          select: {
            userId: true,
          },
        },
      },
      where: {
        id: id,
      },
    });
    if (!getTeam) {
      throw new NotFoundException("Nie ma takiego zespołu");
    }
    return getTeam;
  }

  async getTeamWithMemberId(userId: string): Promise<{
    id: string;
    members: { userId: string }[];
    leader: string;
  } | null> {
    const team = await this.prisma.team.findFirst({
      include: {
        members: {
          select: {
            userId: true,
            id: true,
            teamId: true,
          },
        },
      },
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    });
    if (!team) {
      return null;
    }

    const members = team.members.map((member) => ({
      userId: member.userId,
    }));

    return {
      id: team.id,
      leader: team.leader,
      members: members,
    };
  }
  async createTeam(leaderId: string, members: string[]) {
    const existingTeam = await this.prisma.team.findFirst({
      where: {
        OR: [{ leader: leaderId }, { members: { some: { userId: leaderId } } }],
      },
    });

    if (existingTeam) {
      throw new BadRequestException("Nie można stworzyć drużyny");
    }
    const createTeam = await this.prisma.team.create({
      data: {
        leader: leaderId,
        members: {
          create: members.map((userId) => ({
            user: {
              connect: { id: userId },
            },
          })),
        },
      },
      include: {
        members: {
          select: { userId: true },
        },
      },
    });

    return createTeam;
  }

  async deleteTeam(user: string, teamId: string) {
    if ((await this.getTeam(teamId)).leader !== user) {
      throw new BadRequestException("Nie możesz usunąć tej drużyny");
    }
    return this.prisma.$transaction([
      this.prisma.teamMembership.deleteMany({
        where: { teamId },
      }),
      this.prisma.team.delete({
        where: { id: teamId },
      }),
    ]);
  }
  async updateTeam(
    userId: string,
    teamId: string,
    newLeaderId?: string,
    newMemberIds?: string[],
  ) {
    const allTeams = await this.prisma.team.findMany();
    if (!allTeams.length) {
      return null;
    }
    const team = allTeams.find((team) => team.id === teamId);
    if (!team) {
      throw new NotFoundException("Nie ma takiego zespołu");
    }

    if (team.leader !== userId) {
      throw new BadRequestException("Nie jesteś liderem zespołu");
    }
    return this.prisma.$transaction(async (prisma) => {
      if (newMemberIds) {
        const allUsersWithTeam = await this.prisma.teamMembership.findMany({
          where: {
            userId: {
              in: newMemberIds,
            },
          },
        });
        // Dodajemy nowych członków
        if (
          allUsersWithTeam.some((membership) =>
            newMemberIds.includes(membership.userId),
          )
        ) {
          throw new BadRequestException("Użytkownik jest już w drużynie");
        }
        await this.prisma.teamMembership.createMany({
          data: newMemberIds.map((userId) => ({
            teamId,
            userId,
          })),
        });
      }

      // Aktualizujemy lidera, jeśli podano nowy
      if (newLeaderId) {
        await this.prisma.team.update({
          where: { id: teamId },
          data: { leader: newLeaderId },
        });
      }
    });
  }
}
