import { UserRole } from '../../user/entities/user.entity';

export interface JwtPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
}
