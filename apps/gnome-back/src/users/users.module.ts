import { Module } from "@nestjs/common";
import { StorageModule } from "@/storage/storage.module";
import { UsersController } from "@/users/users.controller";
import { UsersConverter } from "@/users/users.converter";
import { UsersService } from "@/users/users.service";

@Module({
  imports: [StorageModule],
  exports: [UsersService],
  providers: [UsersService, UsersConverter],
  controllers: [UsersController],
})
export class UsersModule {}
