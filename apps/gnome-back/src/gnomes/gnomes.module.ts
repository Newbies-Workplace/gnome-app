import { Module } from "@nestjs/common";
import { DistrictsModule } from "@/districts/districts.module";
import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioModule } from "@/minio/minio.module";
import { TeamsModule } from "@/teams/teams.module";

@Module({
  imports: [MinioModule, TeamsModule, DistrictsModule],
  providers: [GnomesService],
  controllers: [GnomesController],
})
export class GnomesModule {}
