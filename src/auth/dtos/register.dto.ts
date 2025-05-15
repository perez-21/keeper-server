import { CredentialsDto } from './credentials.dto';

export class RegisterDto extends CredentialsDto {
  firstName: string;
  lastName: string;
}
