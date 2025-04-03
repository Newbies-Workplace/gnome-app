import { MinioModule } from "@/minio/minio.module";
import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [MinioModule],
})
export class ReportsModule {}
