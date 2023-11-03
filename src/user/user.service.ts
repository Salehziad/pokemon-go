// userService.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user.enum';
import { UpdateUserDto } from './dto/update.user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(private readonly prismaService: PrismaService) { }

    async onModuleInit() {
        // Check if an admin user with the specified email and name exists
        const adminUserExists = await this.checkAdminUserExists();

        // If no admin user exists, create one
        if (!adminUserExists) {
            const adminUserDto: CreateUserDto = {
                email: 'admin@pokemon.go',
                name: 'admin',
                role: UserRole.ADMIN,
                password: 'admin-pokemongo',
            };

            // Create the admin user
            await this.create(adminUserDto);
        }
    }

    async findAll() {
        const result = await this.prismaService.user.findMany()        
        return result;
    }

    async findOne(userId: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { id: userId },
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...userData } = createUserDto;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prismaService.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        return user;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        const { oldPassword, newPassword, ...userData } = updateUserDto;

        // Check if both oldPassword and newPassword are provided
        if (oldPassword && newPassword) {
            // Validate the old password
            const user = await this.findOne(userId)

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordValid) {
                throw new Error('Old password is incorrect');
            }

            // Check if the old password is the same as the new password
            const isNewPasswordSameAsOld = await bcrypt.compare(newPassword, user.password);

            if (isNewPasswordSameAsOld) {
                throw new Error('New password cannot be the same as the old password');
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password with the new hashed password
            await this.prismaService.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });
        }

        // Continue with updating other user data
        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: userData,
        });

        return updatedUser;
    }

    async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
        const { oldPassword, newPassword } = updatePasswordDto;
    
        // Retrieve the user
        const user = await this.findOne(userId)
    
        if (!user) {
          throw new Error('User not found');
        }
    
        // Validate the old password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    
        if (!isPasswordValid) {
          throw new Error('Old password is incorrect');
        }
    
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        // Update the user's password with the new hashed password
        await this.prismaService.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
    }

    async delete(userId: string): Promise<void> {
        await this.prismaService.user.delete({
            where: { id: userId },
        });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { email },
        });
    }

    async checkAdminUserExists(): Promise<boolean> {
        // Implement a function to check if an admin user already exists
        const adminUser = await this.prismaService.user.findUnique({
            where: { email: 'admin@pokemon.go' },
        });

        return !!adminUser;
    }

}
