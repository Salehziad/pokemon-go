import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserRole } from './user.enum';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    // Mock the PrismaService to return a list of users
    const users: User[] = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'User 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: UserRole.ADMIN,
        password: 'hashed_password',
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'User 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: UserRole.MEMBER,
        password: 'hashed_password',
      },
    ];

    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
  });

  it('should find a user by ID', async () => {
    const userId = '1';
    const user: User = {
      id: userId,
      email: 'user1@example.com',
      name: 'User 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.ADMIN,
      password: 'hashed_password',
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

    const result = await service.findOne(userId);
    expect(result).toEqual(user);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'new_password',
    };

    const createdUser: User = {
      id: '3',
      email: createUserDto.email,
      name: createUserDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.MEMBER,
      password: 'hashed_password',
    };

    jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual(createdUser);
  });

  it('should update a user', async () => {
    const userId = '1';
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    };

    const updatedUser: User = {
      id: userId,
      email: 'user1@example.com',
      name: 'Updated User',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.MEMBER,
      password: 'hashed_password',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(updatedUser);
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

    const result = await service.updateUser(userId, updateUserDto);
    expect(result).toEqual(updatedUser);
  });

  it('should update a user password', async () => {
    const userId = '1';
    const updatePasswordDto: UpdatePasswordDto = {
      oldPassword: 'incorrect_password', // Provide an incorrect old password
      newPassword: 'new_hashed_password',
    };

    const user: User = {
      id: userId,
      email: 'user1@example.com',
      name: 'User 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.MEMBER,
      password: 'hashed_password',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(user);

    await expect(service.updatePassword(userId, updatePasswordDto)).rejects.toThrowError(
      'Old password is incorrect'
    );
  });

  it('should update a user role', async () => {
    const userId = '1';
    const updateRoleDto: UpdateRoleDto = { role: UserRole.ADMIN };

    const user: User = {
      id: userId,
      email: 'user1@example.com',
      name: 'User 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.ADMIN,
      password: 'hashed_password',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(user);
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(user);

    const result = await service.updateUserRole(userId, updateRoleDto);
    expect(result.role).toEqual(updateRoleDto.role);
  });

  it('should find a user by email', async () => {
    const userEmail = 'user1@example.com';
    const user: User = {
      id: '1',
      email: userEmail,
      name: 'User 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.MEMBER,
      password: 'hashed_password',
    };

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

    const result = await service.findOneByEmail(userEmail);
    expect(result).toEqual(user);
  });

  it('should check if an admin user exists', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    const result = await service.checkAdminUserExists();
    expect(result).toBe(false);
  });

});
