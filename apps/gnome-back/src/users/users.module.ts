import { Module } from "@nestjs/common";
import { MinioModule } from "@/minio/minio.module";
import { UsersController } from "@/users/users.controller";
import { UsersConverter } from "@/users/users.converter";
import { UsersService } from "@/users/users.service";

@Module({
  imports: [MinioModule],
  exports: [UsersService],
  providers: [UsersService, UsersConverter],
  controllers: [UsersController],
})
export class UsersModule {}
