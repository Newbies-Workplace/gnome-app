import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { TeamMembership } from "@prisma/client";
@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTeam(id: string) {
    return this.prisma.teams.findUnique({
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
  }

  async getTeamWithMemberId(userId: string) {
    return this.prisma.teams.findMany({
      include: {
        members: {
          select: {
            userId: true,
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
  }
  async createTeam(leaderId: string, memberIds: string[]) {
    return this.prisma.teams.create({
      data: {
        leader: leaderId, // Lider zespołu, ustawiany jako pierwszy członek
        members: {
          create: memberIds.map((userId) => ({
            user: {
              connect: { id: userId }, // Przypisujemy członków przez ich id
            },
          })),
        },
      },
    });
  }

  async deleteTeam(teamId: string) {
    return this.prisma.$transaction([
      this.prisma.teamMembership.deleteMany({
        where: { teamId },
      }),
      this.prisma.teams.delete({
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
        await prisma.teams.update({
          where: { id: teamId },
          data: { leader: newLeaderId },
        });
      }
    });
  }
}
