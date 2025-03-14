import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [GnomesService],
  controllers: [GnomesController],
})
export class GnomesModule {}
