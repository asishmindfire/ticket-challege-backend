import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/modules/users/entities/user.entity';
import { UserService } from 'src/modules/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (user == undefined)
      throw new HttpException(
        'Please provide a valid user.',
        HttpStatus.BAD_REQUEST,
      );
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
