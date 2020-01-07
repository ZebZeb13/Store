import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UserRO {
  id: number;
  email: string;
  registeredAt: number;
  updatedAt: number;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  token?: string;
}
