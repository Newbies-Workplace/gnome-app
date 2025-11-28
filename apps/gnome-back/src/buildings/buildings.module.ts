import { Module } from "@nestjs/common";
import { BuildingsController } from "./buildings.controller";
import { BuildingsService } from "./buildings.service";

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
