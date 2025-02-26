import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/utils/mail.service';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private userRepository: Repository<Auth>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(userData: Partial<Auth>): Promise<{ message: string }> {
    if (!userData.password) {
      throw new Error('Password is required');
    }
  
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
  
    await this.mailService.sendVerificationEmail(user.email).then(() => {
      console.log('Mail sent successfully...`')
    })
    .catch((error) => {
      console.log('Error occurred while sending email: ====> ', error)
    });
  
    return { message: 'User registered. Please check your email for verification.' };
  }
  
  async getAllUsers() {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'role'], 
    });
  }
  
  async verifyUser(email: string): Promise<Auth | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) return null;
    if (user.isVerified) return null;

    user.isVerified = true;
    await this.userRepository.save(user);
    
    return user;
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      if (user.role !== 'admin') {
        throw new UnauthorizedException('You are not allowed to login from here');
      }

      if (!user.isVerified) {
        throw new UnauthorizedException('Email not verified');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = this.jwtService.sign({ id: user.id, role: user.role });
      return { token, message: 'Login successful' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
        throw error; // Keep the specific error codes
      }
      throw new InternalServerErrorException(error.message || 'Login failed');
    }
  }
}
