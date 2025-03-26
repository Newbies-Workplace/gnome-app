import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioModule } from "@/minio/minio.module";
import { MinioService } from "@/minio/minio.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [MinioModule],
  providers: [GnomesService],
  controllers: [GnomesController],
})
export class GnomesModule {}
