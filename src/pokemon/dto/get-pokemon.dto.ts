import { IsString, IsInt, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class PokemonFilterDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        example: 1,
        description: 'Page number',
        required: false, // Set required to false
    })
    page?: number; // Make the field optional in the DTO

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        example: 10,
        description: 'Items per page',
        required: false, // Set required to false
    })
    perPage?: number; // Make the field optional in the DTO
  
    @ApiProperty({
        // example: 'Charizard',
        description: 'Name of the Pokémon',
        required: false,
    })
    name: string;

    @Transform(({ value }) => parseInt(value, 10))
    generation: number;

    @ApiProperty({
        // example: '3',
        description: 'Evolution stage of the Pokémon',
        required: false,
    })
    evolutionStage: string;
}
