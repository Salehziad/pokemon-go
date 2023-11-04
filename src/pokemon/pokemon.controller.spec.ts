import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { pokemon } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('PokemonController', () => {
  let controller: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService,PrismaService,JwtService],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new Pokemon', async () => {
    const createPokemonDto: CreatePokemonDto = {
      name: 'Pikachu',
      pokedexNumber: 25,
      imgName:"2"
    };

    const createdPokemon: pokemon = {
      id: '1',
      name: 'Pikachu',
      pokedexNumber: 25,
      imgName: '2', 
      generation: 1, 
      evolutionStage: 'Stage 1',
      evolved: 1,
      familyId: 123,
      crossGen: 1,
      type1: 'Electric',
      type2: 'None',
      weather1: 'Clear',
      weather2: 'None',
      statTotal: 500,
      atk: 100,
      def: 50,
      sta: 350,
      legendary: 0,
      aquireable: 1,
      spawns: 1,
      regional: 0,
      raidable: 1,
      hatchable: 1,
      shiny: 1,
      nest: 0,
      new: 0,
      notGettable: 0,
      futureEvolve: 2,
      cp40: 1000,
      cp39: 900
    };    

    jest.spyOn(pokemonService, 'create').mockResolvedValue(createdPokemon);

    const result = await controller.createPokemon(createPokemonDto);
    expect(result).toBe(createdPokemon);
  });

  it('should update a Pokemon', async () => {
    const pokemonId = '1';
    const updatePokemonDto: UpdatePokemonDto = {
      name: 'Pikachu',
    };

    const updatedPokemon: pokemon = {
      id: '1',
      name: 'Pikachu',
      pokedexNumber: 25,
      imgName: '2', 
      generation: 1, 
      evolutionStage: 'Stage 1',
      evolved: 1,
      familyId: 123,
      crossGen: 1,
      type1: 'Electric',
      type2: 'None',
      weather1: 'Clear',
      weather2: 'None',
      statTotal: 500,
      atk: 100,
      def: 50,
      sta: 350,
      legendary: 0,
      aquireable: 1,
      spawns: 1,
      regional: 0,
      raidable: 1,
      hatchable: 1,
      shiny: 1,
      nest: 0,
      new: 0,
      notGettable: 0,
      futureEvolve: 2,
      cp40: 1000,
      cp39: 1000
    };

    jest.spyOn(pokemonService, 'update').mockResolvedValue(updatedPokemon);

    const result = await controller.updatePokemon(pokemonId, updatePokemonDto);
    expect(result).toBe(updatedPokemon);
  });

  it('should delete a Pokemon', async () => {
    const pokemonId = '1';

    await jest.spyOn(pokemonService, 'delete').mockResolvedValue();

    const result = await controller.deletePokemon(pokemonId);
    expect(result).toEqual(undefined);
  });
});
