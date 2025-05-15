import { Module } from '@nestjs/common';
import { HashManager } from './HashManager.service';

@Module({
  providers: [HashManager],
  exports: [HashManager],
})
export class CryptModule {}
