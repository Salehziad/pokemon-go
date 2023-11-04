import { IsEmail, IsString, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Create a Data Transfer Object (DTO) for creating a user
export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Password123', 
    description: 'The new user password (optional, min length: 6)',
  })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
