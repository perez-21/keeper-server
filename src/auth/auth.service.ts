import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CredentialsDto, RegisterDto } from './dtos';
import { HashManager } from '../crypt/HashManager.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashManager: HashManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: RegisterDto) {
    // check if user exists
    if (
      await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      })
    ) {
      throw new BadRequestException('User already exists');
    }

    // hash password
    createUserDto.password = await this.hashManager.hashPassword(
      createUserDto.password,
    );

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return await this.signToken(user.id, user.email);
  }

  async login(loginDto: CredentialsDto) {
    // check if user exists

    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    // check if password is correct

    const isPasswordCorrect = await this.hashManager.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid credentials');
    }

    // generate token
    return await this.signToken(user.id, user.email);
  }

  async signToken(userId: string, email: string) {
    const access_token = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        expiresIn: '3h',
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return { access_token };
  }

  getCurrentUser(user: Omit<RegisterDto, 'password'>) {
    return user;
  }
}
