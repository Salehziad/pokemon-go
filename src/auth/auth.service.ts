import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    // private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid ? user : null;
  }

  async signin(signInDto: SignInDto, request) {
    const { email, password } = signInDto;
    let user = await this.userService.findOneByEmail(email);
    console.log(user);
    
    const isMatch = await this.comparePassword({
      password,
      hash: user.password,
    });

    if (!isMatch)
      throw new Error(`Wrong password please try again`,);

    const { accessToken, refreshToken } = this.generateTokens(user);

    request.res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; HttpOnly; Path=/;`,
    );

    return { accessToken };
  }

  private async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  private generateTokens(userData:User): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = sign({ userData }, 'your-access-token-secret', {
      expiresIn: '5d',
    });
    const refreshToken = sign({ userData }, 'your-refresh-token-secret', {
      expiresIn: '60d',
    });
    return { accessToken, refreshToken };
  }


}
