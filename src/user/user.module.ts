import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[SharedModule]
})
export class UserModule {}
