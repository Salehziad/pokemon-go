import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RequestService } from 'src/request.service';

@Module({
  providers: [UserService,PrismaService,JwtService,RequestService],
  controllers: [UserController]
})
export class UserModule {}
