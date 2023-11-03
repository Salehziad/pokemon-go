import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly customData: any) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This will contain the decoded user information from the AuthJwtGuard
    
    if (user.role === 'ADMIN') {
      // If the required role is "ADMIN," allow access for all users with any role.
      return true;
    }

    if (user.role !== this.customData.role) {
      // If the user's role doesn't match the required role, deny access and throw an UnauthorizedException.
      throw new UnauthorizedException('You do not have access to this API. Please ensure you have the necessary permissions or a valid API key to make requests.');
    }

    // If the user's role matches the required role, allow access.
    return true;
  }
}
