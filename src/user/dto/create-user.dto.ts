import { IsEmail, IsString, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.enum';

// Define the Role enum with valid values
enum Role {
  READ = "READ",
  WRITE = "WRITE",
  ADMIN = "ADMIN",
}

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
    example: Role.READ,
    enum: Role,
    description: 'The role of the user (READ, WRITE, or ADMIN)',
  })
  @IsEnum(UserRole)
  readonly role: UserRole;

  @ApiProperty({
    example: 'Password123', 
    description: 'The new user password (optional, min length: 6)',
  })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
