import { PrismaService } from "@/db/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
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
      return null;
    }
    return getTeam;
  }

  async getTeamWithMemberId(userId: string) {
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

  async deleteTeam(teamId: string) {
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
    teamId: string,
    newLeaderId?: string,
    newMemberIds?: string[],
  ) {
    return this.prisma.$transaction(async (prisma) => {
      if (newMemberIds) {
        // Usuwamy starych członków
        await prisma.teamMembership.deleteMany({
          where: { teamId },
        });

        // Dodajemy nowych członków
        await prisma.teamMembership.createMany({
          data: newMemberIds.map((userId) => ({
            teamId,
            userId,
          })),
        });
      }

      // Aktualizujemy lidera, jeśli podano nowy
      if (newLeaderId) {
        await prisma.team.update({
          where: { id: teamId },
          data: { leader: newLeaderId },
        });
      }
    });
  }
}
