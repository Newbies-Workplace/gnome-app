import { Module } from "@nestjs/common";
import { Global } from "@nestjs/common/decorators";
import { PrismaService } from "@/db/prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
