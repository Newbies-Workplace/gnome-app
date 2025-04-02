import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioModule } from "@/minio/minio.module";
import { MinioService } from "@/minio/minio.service";
import { TeamsModule } from "@/teams/teams.module";
import { TeamsService } from "@/teams/teams.service";
import { Module } from "@nestjs/common";
@Module({
  imports: [MinioModule, TeamsModule],
  providers: [GnomesService],
  controllers: [GnomesController],
})
export class GnomesModule {}
