import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service.js";
import { UsersService } from "./users.service.js";
import { UsersController } from './users.controller.js';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
