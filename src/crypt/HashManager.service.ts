import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashManager {
  saltRounds: number = 10;

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
