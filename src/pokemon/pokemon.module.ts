import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { JwtService } from '@nestjs/jwt';
import { RequestService } from '../request.service';
import { PrismaService } from '../prisma.service';


@Module({
  controllers: [PokemonController],
  providers: [PokemonService,PrismaService,JwtService,RequestService]
})
export class PokemonModule {}
