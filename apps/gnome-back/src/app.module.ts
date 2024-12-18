import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import AdminJS, { AdminJSOptions } from 'adminjs';
import { Database, Resource, getModelByName } from '@adminjs/prisma';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import provider from './admin/auth-provider.js';
import componentLoader from './admin/component-loader.js';
import { PrismaService } from './prisma.service.js';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        const prisma = new PrismaService();

        const options: AdminJSOptions = {
          componentLoader,
          rootPath: '/admin',
          branding: {
            companyName: 'Krasnale apka',
          },
          resources: [
            {
              // todo https://docs.adminjs.co/basics/features/upload
              resource: { model: getModelByName('Gnome'), client: prisma },
              options: {},
            },
          ],
          databases: [],
        };

        return {
          adminJsOptions: options,
          auth: {
            provider,
            cookiePassword: process.env.COOKIE_SECRET,
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
