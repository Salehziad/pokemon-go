import { IsEmail, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.enum';

// Define a DTO for updating user data with a PUT request
export class UpdateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The new email address of the user (optional)',
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The new name of the user (optional)',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    example: UserRole.Member,
    enum: UserRole,
    description: 'The new role of the user (READ, WRITE, or ADMIN) (optional)',
  })
  @IsEnum(UserRole)
  @IsOptional()
  readonly role?: UserRole;

  @ApiProperty({
    example: 'OldPassword123',
    description: 'The old password (required when updating the password)',
  })
  @IsString()
  @IsOptional()
  readonly oldPassword?: string;

  @ApiProperty({
    example: 'NewPassword456',
    description: 'The new password (required when updating the password)',
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  readonly newPassword?: string;
}
