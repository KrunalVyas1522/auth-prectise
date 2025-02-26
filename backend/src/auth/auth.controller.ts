import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException, BadRequestException, Query, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard) 
  @Get('users')
  async getAllUsers(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('You are not authorized to access this resource.');
    }

    return this.authService.getAllUsers(); 
  }

  @Get('verify')
  async verifyEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const updatedUser = await this.authService.verifyUser(email);
    if (!updatedUser) {
      throw new NotFoundException('User not found or already verified');
    }

    return { message: 'Email verified successfully' };
  }

}
