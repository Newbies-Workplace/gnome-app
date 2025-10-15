import { Module } from "@nestjs/common";
import { PrismaService } from "@/db/prisma.service";
import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";
@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService],
  exports: [TeamsService],
})
export class TeamsModule {}
