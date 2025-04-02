import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { TeamsService } from "@/teams/teams.service";
import { Module } from "@nestjs/common";
import { MinioService } from "./minio.service";
@Module({
  controllers: [GnomesController],
  providers: [MinioService, GnomesService, TeamsService],
  exports: [MinioService],
})
export class MinioModule {}
