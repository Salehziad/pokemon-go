// pokemon.dto.ts
import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the Pokémon',
    example: 'Pikachu',
  })
  name: string;

  @IsInt()
  @ApiProperty({
    description: 'Pokedex number of the Pokémon',
    example: 25,
  })
  pokedexNumber: number;

  @IsString()
  @ApiProperty({
    description: 'Image name of the Pokémon',
    example: 'pikachu.png',
  })
  imgName: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Generation of the Pokémon',
    example: 1,
  })
  generation?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Evolution stage of the Pokémon',
    example: 'Final Evolution',
  })
  evolutionStage?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Evolved Pokémon ID',
    example: 26,
  })
  evolved?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Family ID',
    example: 1001,
  })
  familyId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Cross Generation',
    example: 1,
  })
  crossGen?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Type 1',
    example: 'Electric',
  })
  type1?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Type 2',
    example: 'None',
  })
  type2?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Weather 1',
    example: 'Clear',
  })
  weather1?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Weather 2',
    example: 'Fog',
  })
  weather2?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Total stats',
    example: 500,
  })
  statTotal?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Attack stat',
    example: 100,
  })
  atk?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Defense stat',
    example: 50,
  })
  def?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Stamina stat',
    example: 150,
  })
  sta?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Legendary status',
    example: 0,
  })
  legendary?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Aquireable status',
    example: 1,
  })
  aquireable?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Spawns status',
    example: 1,
  })
  spawns?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Regional status',
    example: 0,
  })
  regional?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Raidable status',
    example: 1,
  })
  raidable?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Hatchable status',
    example: 1,
  })
  hatchable?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Shiny status',
    example: 1,
  })
  shiny?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Nest status',
    example: 1,
  })
  nest?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'New status',
    example: 1,
  })
  new?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Not Gettable status',
    example: 0,
  })
  notGettable?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Future Evolution status',
    example: 0,
  })
  futureEvolve?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'CP at level 40',
    example: 1000,
  })
  cp40?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'CP at level 39',
    example: 900,
  })
  cp39?: number;
}
