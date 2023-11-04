// update-pokemon.dto.ts
import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePokemonDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Updated Name',
    description: 'Updated name of the Pokémon',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 5,
    description: 'Updated generation of the Pokémon',
    required: false,
  })
  generation?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Updated Evolution Stage',
    description: 'Updated evolution stage of the Pokémon',
    required: false,
  })
  evolutionStage?: string;
}
