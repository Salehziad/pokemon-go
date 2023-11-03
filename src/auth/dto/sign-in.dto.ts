import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'admin@pokemon.go',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'admin-pokemongo',
    description: 'User password',
  })
  @IsString()
  password: string;
}
