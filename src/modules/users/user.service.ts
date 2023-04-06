import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, USER_MODEL } from 'src/schemas/user';
import sendResponse from 'src/utils/sendresponse';
import { IResponse } from '../shared/interfaces/response.interface';
import { User } from './entities/user.entity';
import { IUserService } from './interface/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async findAll(): Promise<IResponse<string>> {
    try {
      const users = await this.userModel.find();
      return sendResponse({
        status: true,
        data: users,
        message: 'Records retrieved successfully.',
      });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
