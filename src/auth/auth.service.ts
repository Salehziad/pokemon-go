import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid ? user : null;
  }

  async signin(signInDto: SignInDto, response): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    
    try {
      const user = await this.userService.findOneByEmail(email);

      const isMatch = await this.comparePassword(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Wrong password. Please try again.');
      }

      const { accessToken, refreshToken } = this.generateTokens(user);
      
      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/',
      });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Authentication failed. Please try again.');
    }
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private generateTokens(userData: User): { accessToken: string; refreshToken: string } {
    const accessToken = sign({ userData }, 'your-access-token-secret', {
      expiresIn: '5d',
    });

    const refreshToken = sign({ userData }, 'your-refresh-token-secret', {
      expiresIn: '60d',
    });

    return { accessToken, refreshToken };
  }
}
