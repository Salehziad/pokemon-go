import { Controller, Get, Param, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonFilterDto } from './dto/get-pokemon.dto';
// import {  NumberValidationPipe } from 'src/shared/pipes/number-validation.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get('insert')
  upload() {
    return this.pokemonService.insertDateFromExcel('./Pokemon Go.xlsx');
  }

  @Get()
  async findAll(@Query() filter: PokemonFilterDto) {
    let { page, perPage, ...filters } = filter;
    page = page && !isNaN(page) ? Number(page) : 1;
    perPage = perPage && !isNaN(perPage) ? Number(perPage) : 10;    
    const pokemons = await this.pokemonService.findAllWithFilters(filters, page, perPage);
    return pokemons;
  }

}
