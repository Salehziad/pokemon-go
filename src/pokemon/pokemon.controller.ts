import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonFilterDto } from './dto/get-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { pokemon } from '@prisma/client';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { AuthJwtGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('pokemon')
@ApiBearerAuth()
@UseGuards(AuthJwtGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get('insert')
  @UseGuards(new RoleGuard({ role: 'ADMIN' }))
  upload() {
    return this.pokemonService.insertDateFromExcel('./Pokemon Go.xlsx');
  }

  @Get()
  async findAllPokemons(@Query() pokemonFilterDto: PokemonFilterDto) {
    let { page, perPage, ...filters } = pokemonFilterDto;
    page = page && !isNaN(page) ? Number(page) : 1;
    perPage = perPage && !isNaN(perPage) ? Number(perPage) : 10;
    const pokemons = await this.pokemonService.findAllWithFilters(filters, page, perPage);
    return pokemons;
  }

  @Get(':id')
  async findOnePokemon(@Param('id') id: string): Promise<pokemon> {
    const pokemon = await this.pokemonService.findOne(id);
    return pokemon;
  }

  @Post()
  async createPokemon(@Body() createPokemonDto: CreatePokemonDto): Promise<pokemon>{
    return this.pokemonService.create(createPokemonDto);
  }

  @Put(':id')
  async updatePokemon(
    @Param('id') id: string,
    @Body() updateData: UpdatePokemonDto,
  ): Promise<pokemon> {
    const updatedPokemon = await this.pokemonService.update(id, updateData);
    return updatedPokemon;
  }

  @Delete(':id')
  @UseGuards(new RoleGuard({ role: 'ADMIN' }))
  async deletePokemon(@Param('id') id: string): Promise<void> {
    await this.pokemonService.delete(id);
  }

}
