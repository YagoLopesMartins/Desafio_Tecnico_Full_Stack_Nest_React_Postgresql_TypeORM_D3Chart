import { UserRole, UserStatus } from '../user.entity';
export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}
