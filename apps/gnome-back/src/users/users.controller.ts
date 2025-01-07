import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { User } from 'src/auth/jwt/jwtuser.decorator.js';
import { JWTUser } from 'src/auth/jwt/JWTUser.js';
import { User as PrismaUser } from '@prisma/client';
import { JwtGuard } from 'src/auth/jwt/jwt.guard.js';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get('@me')
    @UseGuards(JwtGuard)
    async getMe(@User() user: JWTUser): Promise<PrismaUser> {
        return this.usersService.findUserById(user.id);
    }
}
