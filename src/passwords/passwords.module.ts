import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsController } from './passwords.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  imports: [PrismaModule, CryptModule],
  controllers: [PasswordsController],
  providers: [PasswordsService],
})
export class PasswordsModule {}
