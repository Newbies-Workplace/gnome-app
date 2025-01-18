import { UsersController } from "@/users/users.controller";
import { UsersService } from "@/users/users.service";
import { Module } from "@nestjs/common";

@Module({
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
