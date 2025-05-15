import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, CredentialsDto } from './dtos';
// import { User } from '@prisma/client';
// import { GetUser } from './decorators/get-user.decorator';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @Post('logout')
  logout(@Body() body: any) {
    return this.authService.logout(body);
  }

  // @Get('oauth/google')
  // async googleAuth() {
  //   return this.authService.googleAuth();
  // }

  // @Get('oauth/google/callback')
  // async googleAuthRedirect(@Query() query: any) {
  //   return this.authService.googleAuthRedirect(query);
  // }

  // @Get('me')
  // me(@GetUser() user: User) {
  //   return await this.authService.getCurrentUser(user);
  // }
}
