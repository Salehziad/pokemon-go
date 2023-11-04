import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { CommonModule } from 'src/common/common.module';
import { JwtService } from '@nestjs/jwt';
import { RequestService } from 'src/request.service';
import { PrismaService } from '../prisma.service';


@Module({
  controllers: [PokemonController],
  providers: [PokemonService,PrismaService,JwtService,RequestService]
})
export class PokemonModule {}
