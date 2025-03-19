import { AuthModule } from "@/auth/auth.module";
import { PrismaModule } from "@/db/prisma.module";
import { GnomesModule } from "@/gnomes/gnomes.module";
import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TeamsModule } from "./teams/teams.module";
import { FriendsModule } from "./friends/friends.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    GnomesModule,
    TeamsModule,
    FriendsModule,
  ],
})
export class AppModule {}
