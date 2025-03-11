import { GnomesController } from "@/gnomes/gnomes.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [GnomesController],
})
export class GnomesModule {}
