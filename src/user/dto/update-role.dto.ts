import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.enum';

export class UpdatePasswordDto {
  @ApiProperty({
    example: UserRole.ADMIN,
    enum: UserRole,
    description: 'The new role of the user (READ, WRITE, or ADMIN) (optional)',
  })
  @IsEnum(UserRole)
  readonly role: UserRole;
}
