import { User } from 'src/schemas/user';

export interface IUserService {
  getUserByEmail(email: string): Promise<User>;
}
