import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, CredentialsDto } from './dtos';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: RegisterDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: CredentialsDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetUser() user: Omit<RegisterDto, 'password'>) {
    return this.authService.getCurrentUser(user);
  }
}
