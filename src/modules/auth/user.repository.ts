import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, USER_MODEL } from 'src/schemas/user';
import { User } from '../users/entities/user.entity';
import { Repository } from './interface/repository.interface';

@Injectable()
export default class UsersRepository implements Repository<User> {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
  ) {}

  public async create(user: User): Promise<User | null> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  public async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne(
      {
        email,
      },
      { password: false },
    );
  }
}
