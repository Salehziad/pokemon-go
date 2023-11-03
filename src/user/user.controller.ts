import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthJwtGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Controller('user')
@UseGuards(AuthJwtGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') userId: string) {
      const user = this.userService.findOne(userId);
      return user;
    }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
      const updatedUser = await this.userService.updateUser(userId, updateUserDto);
      return updatedUser;
    }

    @Patch(':id/password')
    async updatePassword(@Param('id') userId: string, @Body() updatePasswordDto: UpdatePasswordDto) {
      await this.userService.updatePassword(userId, updatePasswordDto);
      return { message: 'Password updated successfully' };
    }

    @Delete(':id')
    @UseGuards(new RoleGuard({ role: 'ADMIN' }))
    delete(@Param('id') userId: string) {
      this.userService.delete(userId);
      return { message: 'User deleted successfully' };
    }
}
