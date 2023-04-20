import { User } from '.././entities/user.entity';

export interface IUserService {
  getUserByEmail(email: string): Promise<User>;
}
