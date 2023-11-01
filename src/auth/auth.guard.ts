import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { RequestService } from 'src/request.service';
  
  @Injectable()
  export class AuthJwtGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private readonly RequestService: RequestService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.replace('Bearer ', '');
      try {
        const decoded = this.jwtService.verify(token, {
          secret: 'your-access-token-secret', // Provide your access token secret key here
        });
        request.user = decoded; // Attach the decoded user to the request object
        return true;
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          const refreshToken = request.cookies.refreshToken; // Retrieve the refresh token from the cookies or request body, etc
          if (!refreshToken) {
            throw new UnauthorizedException(
              'Access token expired. Refresh token is missing.',
            );
          }
          try {
            const newAccessToken = await this.refreshAccessToken(refreshToken);
            request.headers.authorization = `Bearer ${newAccessToken}`; // Update the authorization header with the new access token
            return true;
          } catch (refreshError) {
            throw new UnauthorizedException(
              'Access token expired. Failed to refresh access token.',
            );
          }
        }
        throw new UnauthorizedException(
          'You are not authorized to access this resource.',
        );
      }
    }
  
    async refreshAccessToken(refreshToken: string): Promise<string> {
      try {
        const decoded = await this.jwtService.verify(refreshToken, {
          secret: 'your-refresh-token-secret', // Provide your refresh token secret key here
        });
        const newAccessToken = await this.jwtService.signAsync(
          { userId: decoded.userId },
          {
            secret: 'your-access-token-secret', // Provide your access token secret key here
            expiresIn: '60d', // Set the expiration time for the new access token
          },
        );
        return newAccessToken;
      } catch (error) {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }
  }