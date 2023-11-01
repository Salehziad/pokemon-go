import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiBody({ type: SignInDto })
  async signin(
    @Body() signInDto: SignInDto,
    @Req() request: Request,
  ) { 
    return await this.authService.signin(signInDto, request);
  }
}
