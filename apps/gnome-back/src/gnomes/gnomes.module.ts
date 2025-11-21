import { Module } from "@nestjs/common";
import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioModule } from "@/minio/minio.module";

@Module({
  imports: [MinioModule],
  providers: [GnomesService],
  controllers: [GnomesController],
})
export class GnomesModule {}
