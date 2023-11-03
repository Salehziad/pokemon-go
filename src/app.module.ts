import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [UserModule, AuthModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
