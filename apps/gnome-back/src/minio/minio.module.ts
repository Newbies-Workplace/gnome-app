import { Module } from "@nestjs/common";
import { DistrictsService } from "@/districts/districts.service";
import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";

import { MinioService } from "./minio.service";
@Module({
  controllers: [GnomesController],
  providers: [MinioService, GnomesService, DistrictsService],
  exports: [MinioService],
})
export class MinioModule {}
