import { Injectable } from '@nestjs/common';
import { CreatePasswordDto, UpdatePasswordDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';
import { HashManager } from '../crypt/HashManager.service';
@Injectable()
export class PasswordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashManager: HashManager,
  ) {}
  async create(createPasswordDto: CreatePasswordDto) {
    // createPasswordDto.password = await this.hashManager.hashPassword(
    //   createPasswordDto.password,
    // );
    return this.prisma.password.create({
      data: createPasswordDto,
    });
  }

  findAll(userId: string) {
    return this.prisma.password.findMany({ where: { userId } });
  }

  findOne(id: string, userId: string) {
    return this.prisma.password.findUnique({
      where: { id, userId },
    });
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto, userId: string) {
    return this.prisma.password.update({
      where: { id, userId },
      data: updatePasswordDto,
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.password.delete({
      where: { id, userId },
    });
  }
}
