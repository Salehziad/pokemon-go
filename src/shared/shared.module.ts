import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RequestService } from 'src/request.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [
    PrismaService,
    UserService,
    JwtService,
    RequestService,
  ], // Include the Object as a global provider
  exports: [
    PrismaService,
    UserService,
    JwtService,
    RequestService,
  ], // Export the Object provider to make it available globally
})
export class SharedModule {}
