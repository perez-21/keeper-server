import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CredentialsDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { HashManager } from '../crypt/HashManager.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashManager: HashManager,
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

    return await this.prisma.user.create({
      data: createUserDto,
    });
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

    // authenticate user
    return { message: 'logged in' };
  }

  logout(body: any) {
    return { message: 'logged out' };
  }

  async getCurrentUser(user: any) {
    return { status: 'successful', id: 'userid1234', name: 'John Doe' };
  }
}
