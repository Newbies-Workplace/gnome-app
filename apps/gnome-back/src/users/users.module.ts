import { Module } from "@nestjs/common";
import { MinioModule } from "@/minio/minio.module";
import { UsersController } from "@/users/users.controller";
import { UsersService } from "@/users/users.service";

@Module({
  imports: [MinioModule],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
