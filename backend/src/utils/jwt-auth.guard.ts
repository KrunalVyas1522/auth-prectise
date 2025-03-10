import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    const token = authHeader.split(' ')[1]; // Extract token
    try {
      const decoded = this.jwtService.verify(token); // Verify token
      request.user = decoded; // Attach user info to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
