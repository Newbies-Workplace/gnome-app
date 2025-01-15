import { PrismaService } from "@/db/prisma.service";
import { Module } from "@nestjs/common";
import { Global } from "@nestjs/common/decorators";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
