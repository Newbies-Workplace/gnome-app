import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "@/auth/auth.module";
import { PrismaModule } from "@/db/prisma.module";
import { GnomesModule } from "@/gnomes/gnomes.module";
import { UsersModule } from "@/users/users.module";
import { FriendsModule } from "./friends/friends.module";
import { MinioModule } from "./minio/minio.module";
import { ReportsModule } from "./reports/reports.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    GnomesModule,
    FriendsModule,
    ReportsModule,
    MinioModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000,
          limit: 5,
        },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
