import { CredentialsDto } from './credentials.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CredentialsDto) {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
