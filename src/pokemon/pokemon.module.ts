import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { SharedModule } from 'src/shared/shared.module';


@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[SharedModule]
})
export class PokemonModule {}
