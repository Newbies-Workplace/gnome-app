import { Module } from "@nestjs/common";
import { DistrictsController } from "@/districts/districts.controller";
import { DistrictsService } from "@/districts/districts.service";

@Module({
  controllers: [DistrictsController],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
