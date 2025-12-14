import { Module } from "@nestjs/common";
import { MinioModule } from "@/minio/minio.module";
import { ReportsController } from "@/reports/reports.controller";
import { ReportsService } from "@/reports/reports.service";

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [MinioModule],
})
export class ReportsModule {}
