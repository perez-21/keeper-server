import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CryptModule } from '../crypt/crypt.module';
@Module({
  imports: [PrismaModule, CryptModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
