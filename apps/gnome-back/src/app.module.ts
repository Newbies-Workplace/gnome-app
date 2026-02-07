import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AchievementsModule } from "@/achievements/achievements.module";
import { AuthModule } from "@/auth/auth.module";
import { BuildingsModule } from "@/buildings/buildings.module";
import { SeedRemoteCommand } from "@/commands/seedRemoteCommand";
import { PrismaModule } from "@/db/prisma.module";
import { DistrictsModule } from "@/districts/districts.module";
import { FriendsModule } from "@/friends/friends.module";
import { GnomesModule } from "@/gnomes/gnomes.module";
import { MetricsModule } from "@/metrics/metrics.module";
import { StorageModule } from "@/storage/storage.module";
import { UsersModule } from "@/users/users.module";

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
    StorageModule,
    DistrictsModule,
    BuildingsModule,
    MetricsModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000,
          limit: 50,
        },
      ],
    }),
    AchievementsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    SeedRemoteCommand,
  ],
})
export class AppModule {}
