import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserRole } from './user.enum';


describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,PrismaService,JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'testpassword',
    };
  
    const createdUser: User = {
      id: '1',
      email: createUserDto.email,
      name: createUserDto.name,
      createdAt: new Date(), 
      updatedAt: new Date(),
      role: "ADMIN", 
      password: 'hashed_password',
    };
  
    jest.spyOn(userService, 'create').mockResolvedValue(createdUser);
  
    const result = await controller.signup(createUserDto);
    expect(result).toBe(createdUser);
  });

  it('should update a user', async () => {
    const userId = '1';
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    };
  
    const updatedUser: User = {
      id: userId,
      email: 'test@example.com',
      name: 'Updated User',
      createdAt: new Date(), 
      updatedAt: new Date(),
      role: 'ADMIN', 
      password: 'hashed_password', 
    };
  
    jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);
  
    const result = await controller.updateUser(userId, updateUserDto);
    expect(result).toBe(updatedUser);
  });

  it('should update the user role', async () => {
    const userId = '1';
    const updateRoleDto: UpdateRoleDto = { role:UserRole.MEMBER }; 

    const updatedUser: User = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.MEMBER, 
      password: 'hashed_password',
    };

    jest.spyOn(userService, 'updateUserRole').mockResolvedValue(updatedUser);

    const result = await controller.updateUserRole(userId, updateRoleDto);

    expect(result).toEqual(updatedUser); 
  });

  it('should update a user password', async () => {
    const userId = '1';
    const updatePasswordDto: UpdatePasswordDto = {
      oldPassword: 'oldpassword',
      newPassword: 'newpassword',
    };

    const message = { message: 'Password updated successfully' };

    await jest.spyOn(userService, 'updatePassword').mockResolvedValue();

    const result = await controller.updatePassword(userId, updatePasswordDto);
    expect(result).toEqual(message);
  });

  it('should delete a user', async () => {
    const userId = '1';
    const message = { message: 'User deleted successfully' };

    await jest.spyOn(userService, 'delete').mockResolvedValue();

    const result = await controller.delete(userId);
    expect(result).toEqual(message);
  });
});

