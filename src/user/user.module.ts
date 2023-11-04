import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';

import { JwtService } from '@nestjs/jwt';
import { RequestService } from '../request.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[SharedModule]
})
export class UserModule {}
