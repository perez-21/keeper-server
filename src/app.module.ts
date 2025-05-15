import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordsModule } from './passwords/passwords.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CryptModule } from './crypt/crypt.module';

@Module({
  imports: [
    AuthModule,
    PasswordsModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    CryptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
